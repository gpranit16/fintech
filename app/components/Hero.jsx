'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animated particles (cyan/emerald theme)
  const particles = mounted ? Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: (i * 43) % 100,
    y: (i * 67) % 100,
    duration: 15 + (i % 10) * 2,
    delay: (i % 8) * 0.5,
    size: 3 + (i % 4) * 2,
  })) : [];

  const processSteps = [
    {
      step: '01',
      title: 'Smart Application Intake',
      description: 'Upload Aadhaar, PAN, Salary Slip, Bank Statement',
      icon: '📄',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      step: '02',
      title: 'Document Understanding',
      description: 'AI + OCR extracts data, detects inconsistencies',
      icon: '🤖',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      step: '03',
      title: 'Risk Scoring Engine',
      description: 'Automated 0-100 score classification',
      icon: '📊',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      step: '04',
      title: 'AI Loan Officer Bot',
      description: 'Talks, explains, requests documents, guides',
      icon: '💬',
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '05',
      title: 'Lending Decision',
      description: 'Instant Approval/Rejection in < 2 minutes',
      icon: '✅',
      color: 'from-pink-500 to-rose-500'
    },
    {
      step: '06',
      title: 'Admin Dashboard',
      description: 'View applications, fraud flags, override decisions',
      icon: '📈',
      color: 'from-rose-500 to-cyan-500'
    },
  ];

  const stats = [
    { icon: '⚡', label: 'Approval Time', value: '< 2 mins', subtext: 'Avg processing', gradient: 'from-cyan-500 to-emerald-500' },
    { icon: '📊', label: 'Success Rate', value: '94.5%', subtext: 'Auto decisions', gradient: 'from-blue-500 to-cyan-500' },
    { icon: '🎯', label: 'Risk Accuracy', value: '98.2%', subtext: 'AI-powered', gradient: 'from-purple-500 to-pink-500' },
    { icon: '💰', label: 'Total Disbursed', value: '₹125Cr+', subtext: 'Loans processed', gradient: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated particle background */}
      <div className="absolute inset-0">
        {mounted && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x + '%',
              top: particle.y + '%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(16,185,129,0.3) 100%)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Gradient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              FINTECH
            </h1>
          </div>
          <p className="text-2xl text-gray-400 mb-3">Fast Automated Lending Platform</p>
          <p className="text-cyan-400 font-mono text-sm">AI-powered forecasting and analytics</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative bg-gray-900/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-xs">{stat.subtext}</div>
                </div>

                {/* Animated border glow */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100`}
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)`,
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-lg p-4 inline-flex items-center gap-3 mb-8">
            <span className="text-orange-400 text-lg">⚠️</span>
            <span className="text-orange-300 font-medium">Run the application process to generate live decisions!</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/apply">
              <motion.button
                className="relative px-12 py-5 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-full text-white text-xl font-bold shadow-lg shadow-cyan-500/30 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-3">
                  Start Loan Application
                  <span className="text-2xl">→</span>
                </span>
              </motion.button>
            </Link>

            <Link href="/admin">
              <motion.button
                className="px-8 py-5 bg-gray-900 border-2 border-cyan-500/30 rounded-full text-cyan-400 text-lg font-semibold hover:bg-gray-800 hover:border-cyan-500/60 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Admin Dashboard
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Process Flow */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Automated Lending Process
          </h2>
          <p className="text-center text-gray-400 mb-12">6-Step intelligent loan processing pipeline</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative group"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <div className="relative bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 h-full">
                  {/* Step number badge */}
                  <div className={`absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center font-bold text-white shadow-lg`}>
                    {step.step}
                  </div>

                  <div className="text-5xl mb-4 mt-2">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>

                  {/* Arrow for flow indication */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-cyan-500/50 text-3xl">
                      →
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-gray-900/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Powered OCR</h3>
            <p className="text-gray-400">Intelligent document extraction using computer vision + NLP to understand Aadhaar, PAN, bank statements</p>
          </motion.div>

          <motion.div
            className="bg-gray-900/60 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-white mb-3">Fraud Detection</h3>
            <p className="text-gray-400">Real-time KYC verification, anomaly detection, and risk pattern identification</p>
          </motion.div>

          <motion.div
            className="bg-gray-900/60 backdrop-blur-md border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Decisions</h3>
            <p className="text-gray-400">Automated lending decisions in under 2 minutes with transparent AI reasoning</p>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.div
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <p>Powered by Next.js 14 • AI/ML • Real-time Processing</p>
        </motion.div>
      </div>
    </div>
  );
}
