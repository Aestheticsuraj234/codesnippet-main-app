import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { Courses, CoursePurchase, Chapter, ChapterProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import React from "react";

import { Progress } from "@/components/ui/progress";
import LiveCourseSidebarItem from "./live-course-sidebar-item";

interface LiveCourseSidebarProps {
  liveCourse: Courses & {
    chapters: (Chapter & {
      chapterProgression: ChapterProgress[] | null;
    })[];
  };
  progressCount: number;
}

const LiveCourseSidebar = async ({
  liveCourse,
  progressCount,
}: LiveCourseSidebarProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const coursePurchase = await db.coursePurchase.findUnique({
    where: {
      userId_courseId: {
        userId: user?.id!,
        courseId: liveCourse.id,
      },
    },
    select: {
      isPurchase: true,
    },
  });

  if (!coursePurchase?.isPurchase) {
    return redirect("/dashboard/courses");
  }

  const totalChapters = liveCourse.chapters.length;

  // Corrected calculation: Progress as a percentage
  const progressPercentage = (progressCount / totalChapters) * 100;

  return (
    <div className="h-full border-r dark:border-[#3F3F46] border-[#E5E7EB] flex flex-col overflow-y-auto shadow-sm bg-[#fff] dark:bg-[#27272A] ">
      <div className="p-8 flex flex-col border-b dark:border-[#3F3F46] border-[#E5E7EB] ">
        <h1 className="font-semibold">{liveCourse.title}</h1>
        <div className="mt-5">
          <Progress
            value={progressPercentage}
            className="h-2 mb-2"
          />
          <span className="text-xs text-emerald-500 font-semibold">
            {progressPercentage.toFixed(2)}% Completed
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full">
        {liveCourse.chapters.map((chapter) => {
          // Check if the chapter is completed for the current user
          const isCompleted = chapter.chapterProgression?.some(
            (progress) => progress.markedAsDone
          );
          return (
            <LiveCourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              title={chapter.title}
              isCompleted={isCompleted!}
              liveCourseId={liveCourse.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LiveCourseSidebar;
