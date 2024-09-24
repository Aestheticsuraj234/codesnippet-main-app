import { Header } from "@/components/Global/header";
import TechnologyCard from "@/components/Global/technology-card";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";

import React from "react";
import TechnologyDashboardCard from "./_components/technology-dashboard-card";
import {
  getProgressForAllCourses,
  getProgressForAllTechnologies,
  getProgressForAllWorkshops,
} from "@/action/dashboard";
import WorkshopCalendar from "./_components/workshop-calender";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/action/live-course";
import CourseCardDashboard from "./_components/course-card-dashboard";

const Home = async () => {
  const user = await currentUser();

  const technologies = await db.technology.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      image: true,
      name: true,
      description: true,
      topics: {
        select: {
          subTopics: true,
        },
      },
    },
  });

  const subscription = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      subscribedTo: {
        select: {
          endDate: true,
          status: true,
          plan: true,
        },
      },
    },
  });

  const progress = await getProgressForAllTechnologies();
  const workshopProgress = await getProgressForAllWorkshops();
  const courseProgress = await getProgressForAllCourses();

  const isPremiumActiveUser =
    (subscription?.subscribedTo?.status === "ACTIVE" &&
      subscription?.subscribedTo?.plan === "PREMIUM" &&
      user?.role === "PREMIUM_USER") ||
    user?.role === "ADMIN";

  const workshop = await db.workshop.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      image: true,
      description: true,
      isRecorded: true,
      startDate: true,
    },
    take: 3,
  });

  const newWorkshop = workshop.map((workshop) => {
    return {
      id: workshop.id,
      title: workshop.title,
      image: workshop.image,
      description: workshop.description,
      isPurchased:isPremiumActiveUser,
      startDate: workshop.startDate,
      isRecorded: workshop.isRecorded,
      progress: workshopProgress.find((p) => p.workshopId === workshop.id)
        ?.progress!,
    };
  });


  const courses = await getAllCourses();


  return (
    <section className="px-4 py-4 flex flex-col flex-1">
      <Header
        title={`Hi ${user?.name}👋`}
        description="This is your dashboard, you can see all progress and activities here"
      />
      {/* tutorial progress section where we are wanted to show the course section here! */}
      <div className="flex flex-col flex-1 justify-start items-start mt-10 container">
        <div className="flex flex-row w-full justify-between items-center">
          <h1 className="text-3xl font-bold text-primary text-[#1A1818] dark:text-[#ffffff] mb-6">
            Technologies
          </h1>
          <Link href={"/dashboard/tutorials"} className="">
            <Button variant={"link"} className="text-lg font-semibold ">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {technologies.map((technology) => (
            <TechnologyDashboardCard
              key={technology.id}
              imageUrl={technology.image}
              id={technology.id}
              name={technology.name}
              description={technology.description}
              numberOfTopics={technology.topics.length}
              isPremiumUser={isPremiumActiveUser}
              progress={
                progress.find((p) => p.technologyId === technology.id)
                  ?.progress!
              }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-start items-start mt-10">
        <WorkshopCalendar workshops={newWorkshop} />
      </div>

      <div className="flex flex-col flex-1 justify-start items-start mt-10 container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courses.map((course) => {
              const isPurchased =
                course.purchaseByUser.length > 0
                  ? course.purchaseByUser[0].isPurchase
                  : false;
              return (
                <CourseCardDashboard
                id={course.id}
                  date={course.startDate}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  discountedPrice={course.discount!}
                  imageSrc={course.image}
                  isPurchased={isPurchased}
                  key={course.id}
                  progress={
                    courseProgress.find((p) => p.courseId === course.id)
                      ?.progress!
                  }
                />
              );
            })}
        </div>
      </div>
      
      
    </section>
  );
};

export default Home;
