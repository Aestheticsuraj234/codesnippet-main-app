import { Header } from "@/components/Global/header";
import { db } from "@/lib/db/db";
import React from "react";
import WorkshopInforCard from "./_components/WorkshopInfoCard";
import { Calendar, VideoIcon } from "lucide-react";
import { WorkshopCards } from "@/components/workshop/WorkshopCard";

const WorkshopMainPage = async () => {
  const [upComingLiveWorkshops, recordedWorkshops] = await Promise.all([
    db.workshop.count({
      where: {
        status: "PUBLISHED",
        isRecorded: false,
      },
    }),
    db.workshop.count({
      where: {
        status: "PUBLISHED",
        isRecorded: true,
      },
    }),
  ]);


  const workshops = await db.workshop.findMany({
    where:{
      status:"PUBLISHED"
    },
    orderBy:{
      createdAt:"asc"
    },
    select:{
      id:true,
      title:true,
      description:true,
      techStack:true,
      isRecorded:true,
      startDate:true,
      endDate:true,
      image:true,
    }
  })

  return (
    <main className="px-4 py-4 flex flex-col ">
      <Header
        title="Workshops"
        description="Learn Workshop from the best live and recorded workshops"
      />

      <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2 mt-10 mx-10">

      <WorkshopInforCard
        Icon={Calendar}
        Title="Upcoming Live Workshops"
        TotalLength={upComingLiveWorkshops}
        backgroundColor="#1ee868"
      />

      <WorkshopInforCard
        Icon={VideoIcon}
        Title="Recorded Workshops"
        TotalLength={recordedWorkshops}
        backgroundColor="#f03737"
      />
      </div>


<div className="flex flex-col justify-start items-start space-y-4 mt-8 text-[#1A1818] dark:text-[#ffffff]">
  <h2 className="text-2xl font-bold">Upcoming Workshops</h2>
 
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
  
  {
    workshops.map((workshop) => (
      <WorkshopCards
        key={workshop.id}
        id={workshop.id}
        date={workshop.startDate}
        techStack={workshop.techStack}
        imageSrc={workshop.image}
        Title={workshop.title}
        Description={workshop.description}
        isRecorded={workshop.isRecorded}
      />
    ))
  }


  </div>
</div>



    </main>
  );
};

export default WorkshopMainPage;
