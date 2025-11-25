import { NextResponse } from 'next/server';
import { getAllApplications, getApplication, getApplicationStats } from '@/lib/store';

// Get all applications
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter'); // 'all', 'approved', 'rejected', 'pending'
    const id = searchParams.get('id');

    // Get single application
    if (id) {
      const application = getApplication(id);
      if (!application) {
        return NextResponse.json({
          success: false,
          error: 'Application not found'
        }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        data: application
      });
    }

    // Get all applications
    let applications = getAllApplications();

    // Apply filter
    if (filter && filter !== 'all') {
      applications = applications.filter(app => {
        if (!app.decision) return false;
        if (filter === 'approved') return app.decision.result === 'approved';
        if (filter === 'rejected') return app.decision.result === 'rejected';
        if (filter === 'pending') return app.decision.result === 'need_documents';
        return true;
      });
    }

    // Get stats
    const stats = getApplicationStats();

    return NextResponse.json({
      success: true,
      data: {
        applications,
        stats
      }
    });

  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch applications'
    }, { status: 500 });
  }
}
