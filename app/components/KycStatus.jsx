'use client';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Shield, User, Eye } from 'lucide-react';

export default function KycStatus({ kycData }) {
  if (!kycData) return null;

  const checks = [
    {
      icon: User,
      label: 'Identity Verification',
      passed: kycData.checks.identityVerification.passed,
      confidence: kycData.checks.identityVerification.confidence,
      description: 'Document authenticity and data validation'
    },
    {
      icon: Eye,
      label: 'Face Match',
      passed: kycData.checks.faceMatch.passed,
      confidence: kycData.checks.faceMatch.score,
      description: 'Selfie matches ID document photo'
    },
    {
      icon: Shield,
      label: 'Liveness Detection',
      passed: kycData.checks.liveness.passed,
      confidence: kycData.checks.liveness.score,
      description: 'Real person verification'
    }
  ];

  const StatusIcon = ({ passed }) => {
    if (passed) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    return <XCircle className="w-6 h-6 text-red-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Overall Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg border-2 ${
          kycData.kycStatus === 'verified'
            ? 'bg-green-50 border-green-500'
            : 'bg-yellow-50 border-yellow-500'
        }`}
      >
        <div className="flex items-center gap-3">
          {kycData.kycStatus === 'verified' ? (
            <CheckCircle className="w-8 h-8 text-green-500" />
          ) : (
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          )}
          <div>
            <h3 className="font-bold text-lg">
              {kycData.kycStatus === 'verified' ? 'KYC Verified' : 'Needs Review'}
            </h3>
            <p className="text-sm text-gray-600">
              {kycData.kycStatus === 'verified'
                ? 'All identity checks passed successfully'
                : 'Some checks require manual review'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Individual Checks */}
      <div className="space-y-3">
        {checks.map((check, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  <check.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{check.label}</h4>
                    <StatusIcon passed={check.passed} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{check.description}</p>
                  
                  {/* Confidence bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${check.confidence * 100}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                        className={`h-full ${
                          check.passed ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(check.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fraud Detection */}
      {kycData.fraud && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-4 rounded-lg border-2 ${
            kycData.fraud.fraudDetected
              ? 'bg-red-50 border-red-500'
              : 'bg-green-50 border-green-500'
          }`}
        >
          <div className="flex items-start gap-3">
            <Shield className={`w-6 h-6 ${
              kycData.fraud.fraudDetected ? 'text-red-500' : 'text-green-500'
            }`} />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-1">Fraud Detection</h4>
              <p className="text-sm text-gray-600 mb-2">
                Risk Level: <span className="font-semibold capitalize">{kycData.fraud.riskLevel}</span>
              </p>
              {kycData.fraud.flags.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Flags Detected:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {kycData.fraud.flags.map((flag, idx) => (
                      <li key={idx}>{flag.replace(/_/g, ' ')}</li>
                    ))}
                  </ul>
                </div>
              )}
              {kycData.fraud.flags.length === 0 && (
                <p className="text-sm text-green-700">No fraud indicators detected</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
