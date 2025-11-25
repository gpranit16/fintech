/**
 * In-Memory Application Store
 * No database required - all data stored in memory
 * Resets on server restart (perfect for demo)
 */

export const applications = {};
let applicationCounter = 1;

export const createApplication = (data) => {
  const id = `APP${String(applicationCounter++).padStart(5, '0')}`;
  applications[id] = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
    status: 'processing'
  };
  return applications[id];
};

export const updateApplication = (id, data) => {
  if (applications[id]) {
    applications[id] = { ...applications[id], ...data };
    return applications[id];
  }
  return null;
};

export const getApplication = (id) => {
  return applications[id] || null;
};

export const getAllApplications = () => {
  return Object.values(applications).sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const getApplicationStats = () => {
  const apps = Object.values(applications);
  return {
    total: apps.length,
    approved: apps.filter(a => a.decision?.result === 'approved').length,
    rejected: apps.filter(a => a.decision?.result === 'rejected').length,
    pending: apps.filter(a => a.decision?.result === 'need_documents').length,
    avgRiskScore: apps.length > 0 
      ? Math.round(apps.reduce((sum, a) => sum + (a.riskScore?.score || 0), 0) / apps.length)
      : 0
  };
};
