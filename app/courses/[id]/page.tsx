import { currentUser } from '@/lib/auth/data/auth';
import { db } from '@/lib/db/db'
import { redirect } from 'next/navigation';
import React from 'react'

const CourseIdPage = async({
  params
}:{
  params:{id:string}
}) => {

  const workshop = await db.workshop.findUnique({
    where:{
      id:params.id
    },
    include:{
      days:{
       orderBy:{
        dayNumber:'asc'
       }
      }
    }
  });

  if(!workshop){
    return redirect("/dashboard")
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


  if(!isPremiumActiveUser){
    return redirect("/dashboard")
  }

  return redirect(`/courses/${params.id}/days/${workshop.days[0].id}`);
}

export default CourseIdPage