'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function RiskGauge({ score, category, animated = true }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (animated) {
      let current = 0;
      const increment = score / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getColor = () => {
    if (score >= 70) return '#10b981'; // green
    if (score >= 40) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const getCategoryLabel = () => {
    if (score >= 70) return 'Low Risk';
    if (score >= 40) return 'Medium Risk';
    return 'High Risk';
  };

  const rotation = (displayScore / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <div className="flex flex-col items-center">
      {/* Gauge */}
      <div className="relative w-64 h-32 mb-4">
        {/* Background arc */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {/* Red zone (0-40) */}
          <path
            d="M 10 90 A 80 80 0 0 1 56 18"
            fill="none"
            stroke="#fee2e2"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Yellow zone (40-70) */}
          <path
            d="M 56 18 A 80 80 0 0 1 144 18"
            fill="none"
            stroke="#fef3c7"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Green zone (70-100) */}
          <path
            d="M 144 18 A 80 80 0 0 1 190 90"
            fill="none"
            stroke="#d1fae5"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Active arc */}
          <motion.path
            d={`M 10 90 A 80 80 0 ${displayScore > 50 ? '1' : '0'} 1 ${
              100 + 80 * Math.cos((displayScore / 100 * 180 - 90) * Math.PI / 180)
            } ${
              90 - 80 * Math.sin((displayScore / 100 * 180 - 90) * Math.PI / 180)
            }`}
            fill="none"
            stroke={getColor()}
            strokeWidth="20"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: animated ? 1 : 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Needle */}
          <motion.line
            x1="100"
            y1="90"
            x2="100"
            y2="20"
            stroke="#1f2937"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: '100px 90px' }}
          />

          {/* Center dot */}
          <circle cx="100" cy="90" r="6" fill="#1f2937" />
        </svg>

        {/* Score labels */}
        <div className="absolute bottom-0 left-0 text-xs text-gray-500 font-medium">0</div>
        <div className="absolute bottom-0 right-0 text-xs text-gray-500 font-medium">100</div>
      </div>

      {/* Score display */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="text-center"
      >
        <div className="text-5xl font-bold mb-2" style={{ color: getColor() }}>
          {displayScore}
        </div>
        <div className="text-lg font-semibold text-gray-700 mb-1">
          {getCategoryLabel()}
        </div>
        <div className="text-sm text-gray-500">
          Risk Score
        </div>
      </motion.div>

      {/* Score ranges */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span className="text-xs text-gray-600">0-39: High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="text-xs text-gray-600">40-69: Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="text-xs text-gray-600">70-100: Low</span>
        </div>
      </div>
    </div>
  );
}
