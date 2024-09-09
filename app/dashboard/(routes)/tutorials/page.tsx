import { Header } from '@/components/Global/header'
import TechnologyCard from '@/components/Global/technology-card'
import { currentUser } from '@/lib/auth/data/auth'
import { db } from '@/lib/db/db'
import React from 'react'

const TutorialPage = async () => {

  const technologies = await db.technology.findMany({
    where:{
      status:'PUBLISHED'
    },
    select:{
      id:true,
      image:true,
      name:true,
      description:true,
      topics:{
        select:{
          subTopics:true
        }
      }
    }
  })

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

  const isPremiumActiveUser = (subscription?.subscribedTo?.status === "ACTIVE" && subscription?.subscribedTo?.plan === "PREMIUM" && user?.role === "PREMIUM_USER") || (user?.role === "ADMIN");

  return (
    <main className="px-4 py-4 flex flex-col ">
    <Header
      title="Tutorial Page"
      description="Learn Tutorial from the best" 
    />

<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10 mx-10">
  {
    technologies.map((technology)=>(
      <TechnologyCard
        key={technology.id}
        imageUrl={technology.image}
        id={technology.id}
        name={technology.name}
        description={technology.description}
        numberOfTopics={technology.topics.length}
        isPremiumUser={isPremiumActiveUser}
      />
    ))
  }
</div>

    </main>
  )
}

export default TutorialPage