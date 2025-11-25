/**
 * Mock KYC Service
 * Simulates identity verification, face matching, and fraud detection
 * No actual API calls - all logic is mocked for demo purposes
 */

export const performKYC = async (extractedData, files) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const faceMatchScore = 0.7 + Math.random() * 0.3; // 0.7 - 1.0
  const livenessPass = Math.random() > 0.15; // 85% success rate
  const idVerified = Math.random() > 0.1; // 90% success rate

  return {
    success: true,
    kycStatus: idVerified && faceMatchScore > 0.75 ? 'verified' : 'needs_review',
    checks: {
      identityVerification: {
        passed: idVerified,
        confidence: 0.8 + Math.random() * 0.2,
        method: 'document_analysis'
      },
      faceMatch: {
        passed: faceMatchScore > 0.75,
        score: faceMatchScore,
        confidence: faceMatchScore
      },
      liveness: {
        passed: livenessPass,
        score: livenessPass ? 0.9 + Math.random() * 0.1 : 0.4 + Math.random() * 0.3,
        method: 'motion_detection'
      }
    },
    verifiedData: {
      nameMatch: Math.random() > 0.1,
      dobMatch: Math.random() > 0.15,
      addressVerified: Math.random() > 0.2
    }
  };
};

export const detectFraud = async (extractedData, kycResults) => {
  // Simulate fraud detection delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const fraudProbability = Math.random();
  const flags = [];

  // Generate realistic fraud flags (low probability)
  if (fraudProbability < 0.05) {
    flags.push('metadata_anomaly');
  }
  if (fraudProbability < 0.03) {
    flags.push('document_template_mismatch');
  }
  if (fraudProbability < 0.02) {
    flags.push('suspicious_editing_patterns');
  }
  if (kycResults.checks.faceMatch.score < 0.6) {
    flags.push('low_face_match_score');
  }
  if (!kycResults.checks.liveness.passed) {
    flags.push('liveness_check_failed');
  }

  const riskLevel = flags.length === 0 ? 'low' : flags.length <= 2 ? 'medium' : 'high';

  return {
    fraudDetected: flags.length > 2,
    riskLevel,
    flags,
    confidence: 0.85 + Math.random() * 0.15,
    analysis: {
      documentAuthenticity: flags.length === 0 ? 0.95 : 0.6 - (flags.length * 0.1),
      behaviorScore: 0.8 + Math.random() * 0.2,
      deviceTrust: 0.9 + Math.random() * 0.1
    }
  };
};

export const performTamperDetection = (files) => {
  // Mock tamper detection on uploaded files
  const tampered = Math.random() < 0.05; // 5% tamper detection rate

  return {
    tampered,
    confidence: tampered ? 0.7 + Math.random() * 0.2 : 0.9 + Math.random() * 0.1,
    indicators: tampered ? [
      'noise_pattern_mismatch',
      'compression_artifacts',
      'metadata_inconsistency'
    ] : []
  };
};
