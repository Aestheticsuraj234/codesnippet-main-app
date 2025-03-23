import React from 'react'
import LiveCourseLandingPage from './_components/landing-page'
import { getCourseById } from '@/action/live-course'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db/db'


interface Props {
  params: Promise<{
    id: string
  }>
}

const LiveCourseIdPage = async (props:Props) => {
  const params = await props.params;

  const course = await getCourseById(params.id);


  if(!course) {
   return redirect("/dashboard/courses");
  }
  const couponCode = await db.coupon.findFirst({
    where:{
      type:"LIVE_COURSE"
    },
    select:{
      id:true,
      code:true,
      discountPercentage:true,
      type:true,
      endDate:true,
      
    }
   
  })




  return (
    <LiveCourseLandingPage
    // @ts-ignore
      course={course}
      couponCode={couponCode!}
    />
  )
}

export default LiveCourseIdPage