import React from 'react'
import LiveCourseLandingPage from './_components/landing-page'
import { getCourseById } from '@/action/live-course'
import { redirect } from 'next/navigation'


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



  return (
    <LiveCourseLandingPage
    // @ts-ignore
      course={course}
    />
  )
}

export default LiveCourseIdPage