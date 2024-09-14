import React from 'react'
import LiveCourseLandingPage from './_components/landing-page'
import { getCourseById } from '@/action/live-course'


interface Props {
  params: {
    id: string
  }
}

const LiveCourseIdPage = async({params}:Props) => {

  const course = await getCourseById(params.id);


  console.log(JSON.stringify(course , null , 2))

  return (
    <LiveCourseLandingPage
      course={course}
    />
  )
}

export default LiveCourseIdPage