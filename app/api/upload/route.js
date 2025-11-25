import { NextResponse } from 'next/server';
import { createApplication } from '@/lib/store';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const files = {
      idDocument: formData.get('idDocument'),
      salarySlip: formData.get('salarySlip'),
      bankStatement: formData.get('bankStatement'),
      selfie: formData.get('selfie')
    };

    // Basic validation
    const missingDocs = [];
    Object.entries(files).forEach(([key, file]) => {
      if (!file) missingDocs.push(key);
    });

    if (missingDocs.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing documents: ${missingDocs.join(', ')}`
      }, { status: 400 });
    }

    // Create application in store
    const application = createApplication({
      userInput: {
        name: formData.get('name') || 'Anonymous',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        loanAmount: parseInt(formData.get('loanAmount')) || 0
      },
      documents: {
        idDocument: files.idDocument.name,
        salarySlip: files.salarySlip.name,
        bankStatement: files.bankStatement.name,
        selfie: files.selfie.name
      }
    });

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: 'Documents uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process upload'
    }, { status: 500 });
  }
}
