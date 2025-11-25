import { NextResponse } from 'next/server';
import { getApplication, updateApplication } from '@/lib/store';
import { calculateRiskScore, getLoanRecommendation } from '@/lib/scoring';

export async function POST(request) {
  try {
    const { applicationId } = await request.json();

    if (!applicationId) {
      return NextResponse.json({
        success: false,
        error: 'Application ID required'
      }, { status: 400 });
    }

    const application = getApplication(applicationId);
    if (!application || !application.ocr || !application.kyc) {
      return NextResponse.json({
        success: false,
        error: 'Missing required data for risk calculation'
      }, { status: 404 });
    }

    // Calculate risk score
    const riskScore = calculateRiskScore(
      application.ocr,
      application.kyc,
      application.kyc.fraud
    );

    // Get loan recommendation
    const recommendation = getLoanRecommendation(riskScore);

    const riskData = {
      ...riskScore,
      recommendation
    };

    // Update application
    updateApplication(applicationId, {
      riskScore: riskData,
      status: 'risk_calculated'
    });

    return NextResponse.json({
      success: true,
      data: riskData
    });

  } catch (error) {
    console.error('Risk calculation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Risk calculation failed'
    }, { status: 500 });
  }
}
