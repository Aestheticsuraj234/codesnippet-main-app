import { currentUser } from '@/lib/auth/data/auth';
import { db } from '@/lib/db/db';
import { redirect } from 'next/navigation';

const CourseIdPage = async (
  props: {
    params: Promise<{ id: string }>
  }
) => {
  const params = await props.params;

  const workshop = await db.workshop.findUnique({
    where: {
      id: params.id
    },
    include: {
      days: {
        orderBy: {
          dayNumber: 'asc'
        }
      }
    }
  });

  if (!workshop) {
    return redirect("/dashboard");
  }

  const user = await currentUser();
  const subscription = await db.user.findUnique({
    where: {
      id: user?.id
    },
    select: {
      subscribedTo: {
        select: {
          endDate: true,
          status: true,
          plan: true
        }
      }
    }
  });

  const isPremiumActiveUser = (subscription?.subscribedTo?.status === "ACTIVE" && subscription?.subscribedTo?.plan === "PREMIUM" && user?.role === "PREMIUM_USER") || user?.role === "ADMIN";

  if (!isPremiumActiveUser) {
    return redirect("/dashboard");
  }

  // Check if there are no days in the workshop
  if (workshop.days.length === 0) {
    return redirect(`/dashboard/workshops/${params.id}`);
  } else {
    return redirect(`/courses/${params.id}/days/${workshop.days[0]?.id}`);
  }
}

export default CourseIdPage;
