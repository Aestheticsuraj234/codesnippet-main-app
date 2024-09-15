import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";
import React from "react";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LiveCourseSidebar from "./_components/live-course-sidebar";
import LiveCourseNavbar from "./_components/live-course-navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LiveCourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const liveCourse = await db.courses.findUnique({
    where: {
      id: params.id,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      chapters: {
        select: {
          title: true,
          id: true,
          chapterNotes: true,
          chapterVideoLink: true,
          sourceCodeLink: true,
          createdAt: true,
          description: true,
          chapterProgression: {
            where: {
              userId: user.id,
            },
            select: {
              markedAsDone: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });


  if (!liveCourse) {
    return redirect("/dashboard/courses");
  }

    const progressCount = await db.chapterProgress.count({
        where: {
        userId: user.id,
        chapter: {
            courseId: liveCourse.id,
        },
        },
    });


    return(
        <div className={cn("h-full", poppins.className)}>
        <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
          <LiveCourseNavbar liveCourse={liveCourse} progressCount={progressCount} />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <LiveCourseSidebar liveCourse={liveCourse} progressCount={progressCount} />
        </div>
        <main className="md:pl-80 pt-[80px]  h-full">{children}</main>
      </div>
    )

};


export default LiveCourseLayout;