'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function DecisionCard({ decision, applicationId }) {
  useEffect(() => {
    if (decision.result === 'approved') {
      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [decision.result]);

  const getConfig = () => {
    switch (decision.result) {
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'green',
          gradient: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-700',
          animation: 'bounce-slow'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'red',
          gradient: 'from-red-500 to-rose-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-700',
          animation: 'pulse-slow'
        };
      case 'need_documents':
        return {
          icon: AlertTriangle,
          color: 'yellow',
          gradient: 'from-yellow-500 to-orange-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-700',
          animation: 'pulse-slow'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'gray',
          gradient: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500',
          textColor: 'text-gray-700',
          animation: ''
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Main Decision Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`${config.bgColor} border-4 ${config.borderColor} rounded-2xl p-8 mb-6 ${
          decision.result === 'rejected' ? 'animate-pulse-slow' : ''
        }`}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className={`bg-gradient-to-br ${config.gradient} rounded-full p-6 ${config.animation}`}>
            <Icon className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center mb-3 text-gray-900"
        >
          {decision.resultLabel}
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-center text-lg ${config.textColor} mb-6`}
        >
          {decision.message}
        </motion.p>

        {/* Application ID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-600"
        >
          Application ID: <span className="font-mono font-bold">{applicationId}</span>
        </motion.div>
      </motion.div>

      {/* Loan Details (if approved) */}
      {decision.result === 'approved' && decision.loanAmount && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Loan Offer Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Approved Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{decision.loanAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {decision.interestRate}% p.a.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Tenure</p>
              <p className="text-2xl font-bold text-purple-600">
                {decision.tenure} months
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Processing Time</p>
              <p className="text-2xl font-bold text-orange-600">
                24 hours
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Required Documents (if pending) */}
      {decision.result === 'need_documents' && decision.requiredDocuments && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
          <ul className="space-y-2">
            {decision.requiredDocuments.map((doc, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
              >
                <ArrowRight className="w-5 h-5 text-yellow-600" />
                <span className="text-gray-700">{doc}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Rejection Reasons (if rejected) */}
      {decision.result === 'rejected' && decision.reasons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reasons</h2>
          <ul className="space-y-2">
            {decision.reasons.map((reason, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{reason}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Next Steps */}
      {decision.nextSteps && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h2>
          <ol className="space-y-3">
            {decision.nextSteps.map((step, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white text-sm font-bold`}>
                  {idx + 1}
                </div>
                <span className="text-gray-700 mt-0.5">{step}</span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      )}
    </div>
  );
}
