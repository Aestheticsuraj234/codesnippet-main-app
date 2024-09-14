import { getAllCourses } from "@/action/live-course";
import { Header } from "@/components/Global/header";
import React from "react";
import { UpcomingWorkshops } from "../../_components/home/upcoming-workshops";
import Link from "next/link";
import CourseCard from "@/components/live-course/course-card";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";

const CoursesMainPage = async () => {
  const user = await currentUser();

  const courses = await getAllCourses();

  console.log(JSON.stringify(courses, null, 2));

  return (
    <section className="px-4 py-4 flex flex-col">
      <Header
        title="Courses"
        description="Courses are a great way to learn new skills and advance your career. Find the right course for you and start learning today."
      />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12 grid gap-8">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-600 dark:text-zinc-100">
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
        </section>
      </main>
    </section>
  );
};

export default CoursesMainPage;
