import { getAllCourses } from "@/action/live-course";
import { Header } from "@/components/Global/header";
import React from "react";

import CourseCard from "@/components/live-course/course-card";

import { EmptyStateComponent } from "@/components/Global/empty-state";

const CoursesMainPage = async () => {


  const courses = await getAllCourses();

 

  return (
    <section className="px-4 py-4 flex flex-col h-screen">
      <Header
        title="Courses"
        description="Courses are a great way to learn new skills and advance your career. Find the right course for you and start learning today."
      />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12 grid gap-8">
        {
          courses?.length > 0 ? (  <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1A1818] dark:text-[#ffffff]">
                Upcoming Courses
              </h2>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {courses.map((course) => {
                const isPurchased =
                  course.purchaseByUser.length > 0
                    ? course.purchaseByUser[0].isPurchase
                    : false;
                return (
                  <CourseCard
                  id={course.id}
                    date={course.startDate}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    discountedPrice={course.discount!}
                    imageSrc={course.image}
                    isPurchased={isPurchased}
                    key={course.id}
                  />
                );
              })}
            </div>
          </section>) : (
            <EmptyStateComponent
            title="No Courses "
            description="No Courses Available yet Coming soon."
            imageUrl="/empty-course.svg"
            />
          )
        }
      
      </main>
    </section>
  );
};

export default CoursesMainPage;
