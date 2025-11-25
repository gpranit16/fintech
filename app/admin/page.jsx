'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, approved, rejected, pending
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    avgProcessingTime: '1.8 mins',
    totalDisbursed: '₹125Cr',
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/apps');
      const data = await res.json();
      setApplications(data.applications || []);
      
      // Calculate stats
      const approved = data.applications.filter(app => app.decision?.approved).length;
      const rejected = data.applications.filter(app => app.decision && !app.decision.approved).length;
      const pending = data.applications.filter(app => !app.decision).length;
      
      setStats({
        ...stats,
        total: data.applications.length,
        approved,
        rejected,
        pending,
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const getRiskBadge = (score) => {
    if (score >= 70) return { text: 'LOW', color: 'from-green-500 to-emerald-500' };
    if (score >= 40) return { text: 'MEDIUM', color: 'from-yellow-500 to-orange-500' };
    return { text: 'HIGH', color: 'from-red-500 to-pink-500' };
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'approved') return app.decision?.approved;
    if (filter === 'rejected') return app.decision && !app.decision.approved;
    if (filter === 'pending') return !app.decision;
    return true;
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-500/20 rounded-full"
            style={{ left: `${(i * 47) % 100}%`, top: `${(i * 73) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 12 + i, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Gradient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Admin Dashboard
            </motion.h1>
            <p className="text-gray-400">Lender view - Manage all loan applications</p>
          </div>
          <Link href="/">
            <button className="px-6 py-3 bg-gray-900 border-2 border-cyan-500/30 rounded-full text-cyan-400 font-semibold hover:bg-gray-800">
              ← Back to Home
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="bg-gray-900/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-4xl mb-3">📊</div>
            <div className="text-gray-400 text-sm mb-1">Total Applications</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {stats.total}
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/60 backdrop-blur-md border border-green-500/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-4xl mb-3">✅</div>
            <div className="text-gray-400 text-sm mb-1">Approved</div>
            <div className="text-3xl font-bold text-green-400">{stats.approved}</div>
          </motion.div>

          <motion.div
            className="bg-gray-900/60 backdrop-blur-md border border-red-500/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-4xl mb-3">❌</div>
            <div className="text-gray-400 text-sm mb-1">Rejected</div>
            <div className="text-3xl font-bold text-red-400">{stats.rejected}</div>
          </motion.div>

          <motion.div
            className="bg-gray-900/60 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-4xl mb-3">⏳</div>
            <div className="text-gray-400 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          {['all', 'approved', 'rejected', 'pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                filter === tab
                  ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications Table */}
        <motion.div
          className="bg-gray-900/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {loading ? (
            <div className="p-12 text-center">
              <motion.div
                className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-400 mt-4">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              No applications found. <Link href="/apply" className="text-cyan-400 hover:underline">Create one?</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-gray-400 font-semibold">ID</th>
                    <th className="px-6 py-4 text-gray-400 font-semibold">Applicant</th>
                    <th className="px-6 py-4 text-gray-400 font-semibold">Amount</th>
                    <th className="px-6 py-4 text-gray-400 font-semibold">Risk Score</th>
                    <th className="px-6 py-4 text-gray-400 font-semibold">Status</th>
                    <th className="px-6 py-4 text-gray-400 font-semibold">Fraud Flags</th>
                    <th className="px-6 py-4 text-gray-400 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app, index) => {
                    const riskBadge = app.riskScore ? getRiskBadge(app.riskScore) : null;
                    return (
                      <motion.tr
                        key={app.id}
                        className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4 text-gray-300 font-mono text-sm">{app.id.slice(0, 8)}</td>
                        <td className="px-6 py-4">
                          <div className="text-white font-semibold">{app.applicantName || 'N/A'}</div>
                          <div className="text-gray-400 text-sm">{app.email || ''}</div>
                        </td>
                        <td className="px-6 py-4 text-cyan-400 font-semibold">
                          ₹{app.loanAmount ? parseInt(app.loanAmount).toLocaleString('en-IN') : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          {riskBadge ? (
                            <div>
                              <div className="text-white font-bold">{app.riskScore}/100</div>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${riskBadge.color} text-white`}>
                                {riskBadge.text}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-500">Pending</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {app.decision ? (
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                              app.decision.approved
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {app.decision.approved ? '✅ Approved' : '❌ Rejected'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold">
                              ⏳ Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {app.fraudFlags && app.fraudFlags.length > 0 ? (
                            <div className="flex flex-col gap-1">
                              {app.fraudFlags.map((flag, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">
                                  ⚠️ {flag}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-green-400 text-sm">✓ Clean</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold transition-colors">
                              View Details
                            </button>
                            {!app.decision && (
                              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-colors">
                                Override
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={fetchApplications}
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            🔄 Refresh Data
          </button>
          <Link href="/apply">
            <button className="px-8 py-4 bg-gray-900 border-2 border-cyan-500/30 text-cyan-400 rounded-full font-bold hover:bg-gray-800 transition-colors">
              ➕ New Application
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
