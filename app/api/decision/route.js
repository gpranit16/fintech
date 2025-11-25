import { NextResponse } from 'next/server';
import { getApplication, updateApplication } from '@/lib/store';

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
    if (!application || !application.riskScore) {
      return NextResponse.json({
        success: false,
        error: 'Missing required data for decision'
      }, { status: 404 });
    }

    const score = application.riskScore.score;
    let decision = {};

    // Automated decision logic
    if (score >= 70) {
      // Low Risk - Instant Approval
      decision = {
        result: 'approved',
        resultLabel: 'Application Approved',
        message: 'Congratulations! Your loan application has been approved.',
        color: 'success',
        icon: 'check-circle',
        loanAmount: application.riskScore.recommendation.maxLoanAmount,
        interestRate: application.riskScore.recommendation.interestRate,
        tenure: application.riskScore.recommendation.tenure,
        nextSteps: [
          'E-sign the loan agreement',
          'Complete bank verification',
          'Funds will be disbursed in 24 hours'
        ]
      };
    } else if (score >= 40) {
      // Medium Risk - Need More Documents
      decision = {
        result: 'need_documents',
        resultLabel: 'Additional Documents Required',
        message: 'We need more information to process your application.',
        color: 'warning',
        icon: 'alert-circle',
        requiredDocuments: [
          'Last 6 months bank statement',
          'Employment verification letter',
          'Additional income proof (if any)'
        ],
        nextSteps: [
          'Upload requested documents',
          'Application will be reviewed within 24 hours'
        ]
      };
    } else {
      // High Risk - Rejection
      decision = {
        result: 'rejected',
        resultLabel: 'Application Not Approved',
        message: 'Unfortunately, we cannot approve your application at this time.',
        color: 'danger',
        icon: 'x-circle',
        reasons: application.riskScore.factors
          .filter(f => f.type === 'negative')
          .map(f => f.text),
        nextSteps: [
          'Improve your credit score',
          'Increase your income stability',
          'Reapply after 3 months'
        ]
      };
    }

    decision.decidedAt = new Date().toISOString();
    decision.automated = true;

    // Update application
    updateApplication(applicationId, {
      decision,
      status: 'completed'
    });

    return NextResponse.json({
      success: true,
      data: decision
    });

  } catch (error) {
    console.error('Decision error:', error);
    return NextResponse.json({
      success: false,
      error: 'Decision processing failed'
    }, { status: 500 });
  }
}

// Override decision (Admin function)
export async function PATCH(request) {
  try {
    const { applicationId, overrideDecision, reason } = await request.json();

    const application = getApplication(applicationId);
    if (!application) {
      return NextResponse.json({
        success: false,
        error: 'Application not found'
      }, { status: 404 });
    }

    const updatedDecision = {
      ...application.decision,
      result: overrideDecision,
      automated: false,
      overridden: true,
      overrideReason: reason,
      overriddenAt: new Date().toISOString()
    };

    updateApplication(applicationId, {
      decision: updatedDecision
    });

    return NextResponse.json({
      success: true,
      data: updatedDecision
    });

  } catch (error) {
    console.error('Override error:', error);
    return NextResponse.json({
      success: false,
      error: 'Override failed'
    }, { status: 500 });
  }
}
