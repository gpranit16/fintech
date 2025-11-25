import { NextResponse } from 'next/server';
import { getApplication, updateApplication } from '@/lib/store';
import { performOCR } from '@/lib/ocrMock';

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
    if (!application) {
      return NextResponse.json({
        success: false,
        error: 'Application not found'
      }, { status: 404 });
    }

    // Perform mock OCR
    const ocrResult = await performOCR(application.documents);

    // Update application with OCR data
    updateApplication(applicationId, {
      ocr: ocrResult,
      status: 'ocr_completed'
    });

    return NextResponse.json({
      success: true,
      data: ocrResult
    });

  } catch (error) {
    console.error('OCR error:', error);
    return NextResponse.json({
      success: false,
      error: 'OCR processing failed'
    }, { status: 500 });
  }
}
