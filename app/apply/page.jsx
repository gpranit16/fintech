'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import UploadCard from '../components/UploadCard';
import DecisionCard from '../components/DecisionCard';
import LiveSelfieVerification from '../components/LiveSelfieVerification';

export default function ApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [liveVerificationData, setLiveVerificationData] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hello! I\'m your AI loan officer. I\'ll guide you through the application. Let\'s start!' }
  ]);
  const [userMessage, setUserMessage] = useState('');

  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    loanAmount: '',
    purpose: '',
    aadhaar: null,
    pan: null,
    salarySlip: null,
    bankStatement: null,
    selfie: null,
  });

  const [results, setResults] = useState({
    ocr: null,
    kyc: null,
    risk: null,
    decision: null,
  });

  const steps = [
    { num: 1, title: 'Intake', icon: '📄' },
    { num: 2, title: 'Processing', icon: '🤖' },
    { num: 3, title: 'Risk Check', icon: '📊' },
    { num: 4, title: 'Decision', icon: '✅' },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (docType, file) => {
    setFormData({ ...formData, [docType]: file });
  };

  const handleLiveVerification = (verificationData) => {
    setLiveVerificationData(verificationData);
    // Use the first photo as the selfie
    if (verificationData.photos && verificationData.photos.length > 0) {
      setFormData({ ...formData, selfie: verificationData.photos[0].file });
    }
    setChatMessages(prev => [...prev, 
      { role: 'bot', text: `🎉 Live verification complete! Score: ${verificationData.verificationScore}%. Your identity has been confirmed.` }
    ]);
  };

  const sendChatMessage = () => {
    if (!userMessage.trim()) return;
    setChatMessages([...chatMessages, 
      { role: 'user', text: userMessage },
      { role: 'bot', text: `I understand. ${userMessage.includes('help') ? 'I\'m here to assist you with the application process.' : 'Let me know if you need anything else!'}` }
    ]);
    setUserMessage('');
  };

  const processApplication = async () => {
    setProcessing(true);
    setCurrentStep(2);

    try {
      // Step 1: Upload
      const uploadFormData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) uploadFormData.append(key, formData[key]);
      });

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      const uploadData = await uploadRes.json();
      setApplicationId(uploadData.applicationId);

      setChatMessages(prev => [...prev, 
        { role: 'bot', text: `Application ${uploadData.applicationId} received! Processing documents...` }
      ]);

      // Step 2: OCR
      await new Promise(resolve => setTimeout(resolve, 1500));
      const ocrRes = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: uploadData.applicationId }),
      });
      const ocrData = await ocrRes.json();
      setResults(prev => ({ ...prev, ocr: ocrData }));

      setChatMessages(prev => [...prev, 
        { role: 'bot', text: `✅ Extracted: ${ocrData.extractedData.name}, PAN: ${ocrData.extractedData.pan}` }
      ]);

      // Step 3: KYC
      await new Promise(resolve => setTimeout(resolve, 1500));
      const kycRes = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: uploadData.applicationId }),
      });
      const kycData = await kycRes.json();
      setResults(prev => ({ ...prev, kyc: kycData }));

      // Step 4: Risk
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(3);
      const riskRes = await fetch('/api/risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: uploadData.applicationId }),
      });
      const riskData = await riskRes.json();
      setResults(prev => ({ ...prev, risk: riskData }));

      setChatMessages(prev => [...prev, 
        { role: 'bot', text: `📊 Risk Score: ${riskData.riskScore}/100 (${riskData.riskCategory})` }
      ]);

      // Step 5: Decision
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(4);
      const decisionRes = await fetch('/api/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: uploadData.applicationId }),
      });
      const decisionData = await decisionRes.json();
      setResults(prev => ({ ...prev, decision: decisionData }));

      setChatMessages(prev => [...prev, 
        { role: 'bot', text: `${decisionData.approved ? '🎉 APPROVED!' : '❌ Not approved'} ${decisionData.approved ? 'Amount: ₹' + decisionData.approvedAmount : ''}` }
      ]);

      setProcessing(false);
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: 'bot', text: '❌ Error occurred' }]);
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-500/20 rounded-full"
            style={{ left: `${(i * 47) % 100}%`, top: `${(i * 73) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 10 + i, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loan Application
        </motion.h1>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step, index) => (
            <div key={step.num} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                currentStep >= step.num ? 'bg-gradient-to-br from-cyan-500 to-emerald-500' : 'bg-gray-800'
              }`}>
                {step.icon}
              </div>
              <div className="ml-2 text-xs text-gray-400">{step.title}</div>
              {index < steps.length - 1 && <div className={`w-8 h-1 mx-2 ${currentStep > step.num ? 'bg-cyan-500' : 'bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-900/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Application Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <input
                      type="text"
                      name="applicantName"
                      value={formData.applicantName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      placeholder="Loan Amount (₹)"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    placeholder="Loan Purpose"
                    rows="3"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none mb-6"
                  />

                  <h3 className="text-xl font-bold text-white mb-4">Upload Documents</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <UploadCard title="Aadhaar" icon="🪪" docType="aadhaar" onFileSelect={handleFileChange} file={formData.aadhaar} />
                    <UploadCard title="PAN Card" icon="💳" docType="pan" onFileSelect={handleFileChange} file={formData.pan} />
                    <UploadCard title="Salary Slip" icon="💰" docType="salarySlip" onFileSelect={handleFileChange} file={formData.salarySlip} />
                    <UploadCard title="Bank Statement" icon="🏦" docType="bankStatement" onFileSelect={handleFileChange} file={formData.bankStatement} />
                  </div>

                  {/* Live Selfie Verification */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span>Identity Verification</span>
                      {liveVerificationData && <span className="text-green-400 text-sm">✓ Verified</span>}
                    </h3>
                    <LiveSelfieVerification onVerificationComplete={handleLiveVerification} />
                    {liveVerificationData && (
                      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">Verification Status:</span>
                          <span className="text-green-400 font-bold">✓ Complete</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-2">
                          <span className="text-gray-300">Confidence Score:</span>
                          <span className="text-green-400 font-bold">{liveVerificationData.verificationScore}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-2">
                          <span className="text-gray-300">Liveness Check:</span>
                          <span className="text-green-400 font-bold">Passed</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={processApplication}
                    disabled={processing || !formData.applicantName || !formData.aadhaar || !liveVerificationData}
                    className="mt-8 w-full bg-gradient-to-r from-cyan-600 to-emerald-600 text-white py-4 rounded-full font-bold disabled:opacity-50"
                  >
                    {processing ? '⏳ Processing...' : 'Submit Application'}
                  </button>
                  
                  {!liveVerificationData && (
                    <p className="text-center text-yellow-400 text-sm mt-4">
                      ⚠️ Please complete live selfie verification to continue
                    </p>
                  )}
                </motion.div>
              )}

              {currentStep >= 2 && currentStep < 4 && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gray-900/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-12 text-center"
                >
                  <motion.div
                    className="inline-block w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <h2 className="text-2xl font-bold text-white mb-2">Processing...</h2>
                  <p className="text-gray-400">Analyzing your application</p>
                </motion.div>
              )}

              {currentStep === 4 && results.decision && (
                <DecisionCard decision={results.decision} applicationId={applicationId} />
              )}
            </AnimatePresence>
          </div>

          {/* Chat */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center">💬</div>
              <div>
                <h3 className="font-bold text-white">AI Officer</h3>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>

            <div className="h-96 overflow-y-auto mb-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-200'
                  }`}>{msg.text}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Ask anything..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none"
              />
              <button onClick={sendChatMessage} className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white rounded-full px-4 py-2 text-sm font-semibold">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
