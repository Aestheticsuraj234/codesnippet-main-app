import React from 'react';
import LiveCourseLandingPage from './_components/landing-page';
import { getCourseById } from '@/action/live-course';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/db';
import { currentUser } from '@/lib/auth/data/auth';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const LiveCourseIdPage = async ({ params }: Props) => {
  const id = await (params as any).id;
  const user = await currentUser();
  const course = await getCourseById(id);

  if (!course) {
    return redirect('/dashboard/courses');
  }

  // Check if user exists and has already purchased the course
  if (user) {
    const isAlreadyPurchased = course.purchaseByUser?.some(
      (purchase) => purchase.userId === user.id
    );

    if (isAlreadyPurchased) {
      return redirect('/dashboard/courses');
    }
  }

  const couponCode = await db.coupon.findFirst({
    where: { type: 'LIVE_COURSE' },
    select: {
      id: true,
      code: true,
      discountPercentage: true,
      type: true,
      endDate: true,
    },
  });

  // @ts-ignore
  return <LiveCourseLandingPage course={course} couponCode={couponCode!} />;
};

export default LiveCourseIdPage;
