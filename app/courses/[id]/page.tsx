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




  return redirect(`/courses/${params.id}/days/${workshop.days[0].id}`);
}

export default CourseIdPage