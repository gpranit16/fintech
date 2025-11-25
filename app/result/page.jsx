'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProcessingCard } from '../components/MotionCard';
import RiskGauge from '../components/RiskGauge';
import KycStatus from '../components/KycStatus';
import DecisionCard from '../components/DecisionCard';
import Link from 'next/link';
import { Home, Download } from 'lucide-react';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicationId = searchParams.get('id');

  const [processing, setProcessing] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);

  const steps = [
    { id: 'upload', title: 'Document Upload', description: 'Files received successfully' },
    { id: 'ocr', title: 'OCR Processing', description: 'Extracting information from documents' },
    { id: 'kyc', title: 'KYC Verification', description: 'Verifying identity and fraud checks' },
    { id: 'risk', title: 'Risk Assessment', description: 'Calculating risk score' },
    { id: 'decision', title: 'Final Decision', description: 'Generating loan decision' }
  ];

  useEffect(() => {
    if (!applicationId) {
      router.push('/apply');
      return;
    }

    processApplication();
  }, [applicationId]);

  const processApplication = async () => {
    try {
      // Step 1: OCR
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const ocrResponse = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId })
      });
      if (!ocrResponse.ok) throw new Error('OCR failed');

      // Step 2: KYC
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const kycResponse = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId })
      });
      if (!kycResponse.ok) throw new Error('KYC failed');

      // Step 3: Risk
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const riskResponse = await fetch('/api/risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId })
      });
      if (!riskResponse.ok) throw new Error('Risk calculation failed');

      // Step 4: Decision
      setCurrentStep(4);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const decisionResponse = await fetch('/api/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId })
      });
      if (!decisionResponse.ok) throw new Error('Decision failed');

      // Fetch final application data
      const appResponse = await fetch(`/api/apps?id=${applicationId}`);
      const appData = await appResponse.json();
      
      if (appData.success) {
        setApplication(appData.data);
        setProcessing(false);
      }

    } catch (error) {
      console.error('Processing error:', error);
      setError(error.message);
      setProcessing(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md text-center"
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/apply">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
              Try Again
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (processing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Processing Your Application
            </h1>
            <p className="text-purple-200">
              Application ID: <span className="font-mono font-bold">{applicationId}</span>
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
            {steps.map((step, idx) => (
              <ProcessingCard
                key={step.id}
                step={idx + 1}
                title={step.title}
                description={step.description}
                status={
                  idx < currentStep ? 'completed' :
                  idx === currentStep ? 'processing' :
                  'pending'
                }
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-purple-200"
          >
            <p>Please wait while we analyze your application...</p>
            <p className="text-sm mt-2">This usually takes less than 2 minutes</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Application Results
          </h1>
          <p className="text-purple-200">
            Application ID: <span className="font-mono font-bold">{applicationId}</span>
          </p>
        </motion.div>

        {/* Decision */}
        <div className="mb-8">
          <DecisionCard decision={application.decision} applicationId={applicationId} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Score */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk Assessment</h2>
            <RiskGauge
              score={application.riskScore.score}
              category={application.riskScore.category}
              animated={true}
            />
            
            {/* Risk Factors */}
            <div className="mt-8">
              <h3 className="font-bold text-gray-900 mb-4">Key Factors</h3>
              <div className="space-y-2">
                {application.riskScore.factors.slice(0, 5).map((factor, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-sm ${
                      factor.type === 'positive'
                        ? 'bg-green-50 text-green-700'
                        : factor.type === 'negative'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {factor.type === 'positive' ? '✓' : factor.type === 'negative' ? '✗' : '•'}{' '}
                    {factor.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* KYC Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">KYC Verification</h2>
            <KycStatus kycData={application.kyc} />
          </motion.div>
        </div>

        {/* Extracted Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Extracted Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(application.ocr.extractedData).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="font-semibold text-gray-900">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Link href="/">
            <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700">
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
