'use client';
import { motion } from 'framer-motion';

export default function MotionCard({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function ProcessingCard({ step, title, status, description }) {
  const getStatusColor = () => {
    switch (status) {
      case 'processing': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing': return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full"
        />
      );
      case 'completed': return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      );
      case 'error': return (
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
      default: return (
        <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
    >
      <div className="flex-shrink-0 mt-1">
        {getStatusIcon()}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-500">Step {step}</span>
          <span className={`text-sm font-semibold ${getStatusColor()}`}>
            {status === 'processing' ? 'Processing...' : status === 'completed' ? 'Completed' : 'Pending'}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    </motion.div>
  );
}
