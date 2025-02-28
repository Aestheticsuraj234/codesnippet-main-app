import { NextResponse } from "next/server";
import { db } from '@/lib/db/db';

export async function GET() {
  try {
    const now = new Date();

    await db.subscription.updateMany({
      where: {
        endDate: {
          lt: now,
        },
        status: 'ACTIVE',
      },
      data: {
        status: 'INACTIVE',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating subscription statuses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Add this to ensure only cron jobs can access this route
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes timeout