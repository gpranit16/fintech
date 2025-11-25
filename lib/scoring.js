/**
 * Risk Scoring Engine
 * Calculates loan risk score (0-100) based on multiple factors
 * Higher score = Lower risk = Better applicant
 */

export const calculateRiskScore = (ocrData, kycData, fraudData) => {
  // Income-based score (40% weight)
  const incomeScore = calculateIncomeScore(ocrData.extractedData.monthlySalary);
  
  // Stability score (30% weight)
  const stabilityScore = calculateStabilityScore(ocrData.extractedData);
  
  // KYC confidence (20% weight)
  const kycConfidence = calculateKYCScore(kycData);
  
  // Fraud penalty (10% weight)
  const fraudPenalty = calculateFraudPenalty(fraudData);

  // Calculate final score
  const rawScore = (
    incomeScore * 0.4 +
    stabilityScore * 0.3 +
    kycConfidence * 0.2 -
    fraudPenalty * 0.1
  );

  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Determine risk category
  let category = 'high_risk';
  let categoryLabel = 'High Risk';
  if (score >= 70) {
    category = 'low_risk';
    categoryLabel = 'Low Risk';
  } else if (score >= 40) {
    category = 'medium_risk';
    categoryLabel = 'Medium Risk';
  }

  return {
    score,
    category,
    categoryLabel,
    breakdown: {
      incomeScore: Math.round(incomeScore),
      stabilityScore: Math.round(stabilityScore),
      kycConfidence: Math.round(kycConfidence),
      fraudPenalty: Math.round(fraudPenalty)
    },
    factors: generateRiskFactors(score, ocrData, kycData, fraudData)
  };
};

const calculateIncomeScore = (monthlySalary) => {
  // Income scoring logic
  if (monthlySalary >= 80000) return 95;
  if (monthlySalary >= 60000) return 85;
  if (monthlySalary >= 45000) return 70;
  if (monthlySalary >= 30000) return 55;
  return 35;
};

const calculateStabilityScore = (data) => {
  let score = 50;
  
  // Bank balance impact
  if (data.averageBalance > 100000) score += 25;
  else if (data.averageBalance > 50000) score += 15;
  else if (data.averageBalance > 20000) score += 5;
  
  // Transaction activity
  if (data.recentTransactions > 30) score += 15;
  else if (data.recentTransactions > 15) score += 10;
  
  // Employer reputation (mock)
  const topEmployers = ['TCS', 'Infosys', 'Wipro', 'Accenture'];
  if (topEmployers.includes(data.employer)) score += 10;
  
  return Math.min(100, score);
};

const calculateKYCScore = (kycData) => {
  let score = 0;
  
  if (kycData.checks.identityVerification.passed) score += 35;
  if (kycData.checks.faceMatch.passed) score += 35;
  if (kycData.checks.liveness.passed) score += 30;
  
  // Add confidence bonus
  const avgConfidence = (
    kycData.checks.identityVerification.confidence +
    kycData.checks.faceMatch.confidence +
    kycData.checks.liveness.score
  ) / 3;
  
  score = score * avgConfidence;
  
  return Math.min(100, score);
};

const calculateFraudPenalty = (fraudData) => {
  let penalty = 0;
  
  if (fraudData.fraudDetected) penalty += 50;
  
  // Penalty based on risk level
  if (fraudData.riskLevel === 'high') penalty += 30;
  else if (fraudData.riskLevel === 'medium') penalty += 15;
  
  // Flag-based penalties
  penalty += fraudData.flags.length * 5;
  
  return Math.min(100, penalty);
};

const generateRiskFactors = (score, ocrData, kycData, fraudData) => {
  const factors = [];
  const data = ocrData.extractedData;

  // Positive factors
  if (data.monthlySalary >= 60000) {
    factors.push({ type: 'positive', text: 'Strong income profile', weight: 'high' });
  }
  if (data.averageBalance > 80000) {
    factors.push({ type: 'positive', text: 'Healthy bank balance', weight: 'medium' });
  }
  if (kycData.checks.faceMatch.score > 0.9) {
    factors.push({ type: 'positive', text: 'Excellent identity verification', weight: 'high' });
  }
  if (fraudData.flags.length === 0) {
    factors.push({ type: 'positive', text: 'No fraud indicators detected', weight: 'medium' });
  }

  // Negative factors
  if (data.monthlySalary < 40000) {
    factors.push({ type: 'negative', text: 'Below minimum income threshold', weight: 'high' });
  }
  if (data.averageBalance < 30000) {
    factors.push({ type: 'negative', text: 'Low savings balance', weight: 'medium' });
  }
  if (!kycData.checks.liveness.passed) {
    factors.push({ type: 'negative', text: 'Liveness check concerns', weight: 'high' });
  }
  if (fraudData.flags.length > 0) {
    factors.push({ type: 'negative', text: `${fraudData.flags.length} fraud flag(s) detected`, weight: 'high' });
  }

  // Neutral factors
  factors.push({ type: 'neutral', text: `Employer: ${data.employer}`, weight: 'low' });
  factors.push({ type: 'neutral', text: `Bank: ${data.bankName}`, weight: 'low' });

  return factors;
};

export const getLoanRecommendation = (riskScore) => {
  const score = riskScore.score;
  
  if (score >= 70) {
    return {
      maxLoanAmount: Math.floor(riskScore.breakdown.incomeScore * 1000 * 10),
      interestRate: 10.5,
      tenure: 60,
      emi: null // Calculate based on amount
    };
  } else if (score >= 40) {
    return {
      maxLoanAmount: Math.floor(riskScore.breakdown.incomeScore * 1000 * 5),
      interestRate: 13.5,
      tenure: 36,
      emi: null
    };
  } else {
    return {
      maxLoanAmount: 0,
      interestRate: 0,
      tenure: 0,
      emi: 0
    };
  }
};
