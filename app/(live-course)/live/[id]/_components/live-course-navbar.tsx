import { ModeToggle } from "@/components/Global/Navbar/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Courses,
  Chapter,
  ChapterProgress,
} from "@prisma/client";

import { LogOut } from "lucide-react";
import React from "react";
import LiveCourseMobileSidebar from "./livecourse-mobile-sidebar";
import Link from "next/link";

interface LiveCourseNavbarProps {
  liveCourse: Courses & {
    chapters: (Chapter & {
      chapterProgression: ChapterProgress[] | null;
    })[];
  };
  progressCount: number;
}

const LiveCourseNavbar = ({ liveCourse, progressCount }: LiveCourseNavbarProps) => {
  return (
    <div className="p-4 border dark:border-[#3F3F46] border-[#E5E7EB] h-full flex items-center shadow-sm bg-[#fff] dark:bg-[#27272A]">
      <LiveCourseMobileSidebar liveCourse={liveCourse} progressCount={progressCount} />

      <div className="flex gap-x-2 ml-auto">
        <ModeToggle />
        <Link href={"/dashboard/courses"}>
          <Button variant={"destructive"} size={"sm"}>
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LiveCourseNavbar;
