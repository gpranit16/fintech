import { NextResponse } from 'next/server';
import { getApplication, updateApplication } from '@/lib/store';
import { performKYC, detectFraud, performTamperDetection } from '@/lib/kycMock';

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
    if (!application || !application.ocr) {
      return NextResponse.json({
        success: false,
        error: 'Application or OCR data not found'
      }, { status: 404 });
    }

    // Perform KYC checks
    const kycResult = await performKYC(
      application.ocr.extractedData,
      application.documents
    );

    // Perform fraud detection
    const fraudResult = await detectFraud(
      application.ocr.extractedData,
      kycResult
    );

    // Perform tamper detection
    const tamperResult = performTamperDetection(application.documents);

    // Combine results
    const kycData = {
      ...kycResult,
      fraud: fraudResult,
      tamper: tamperResult
    };

    // Update application
    updateApplication(applicationId, {
      kyc: kycData,
      status: 'kyc_completed'
    });

    return NextResponse.json({
      success: true,
      data: kycData
    });

  } catch (error) {
    console.error('KYC error:', error);
    return NextResponse.json({
      success: false,
      error: 'KYC processing failed'
    }, { status: 500 });
  }
}
