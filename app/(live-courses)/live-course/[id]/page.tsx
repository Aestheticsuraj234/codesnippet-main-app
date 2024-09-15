import React from 'react'
import LiveCourseLandingPage from './_components/landing-page'
import { getCourseById } from '@/action/live-course'
import { redirect } from 'next/navigation'


interface Props {
  params: {
    id: string
  }
}

const LiveCourseIdPage = async({params}:Props) => {

  const course = await getCourseById(params.id);


 if(!course) {
  return redirect("/dashboard/courses");
 }



  return (
    <LiveCourseLandingPage
      course={course}
    />
  )
}

export default LiveCourseIdPage