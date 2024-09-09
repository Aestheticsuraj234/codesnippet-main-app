import { ModeToggle } from "@/components/Global/Navbar/theme-toggle";
import { Button } from "@/components/ui/button";
import { workshop, WorkshopDay, WorkshopDayProgress } from "@prisma/client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import CourseMobileSidebar from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: workshop & {
    days: (WorkshopDay & {
      userProgress: WorkshopDayProgress[] | null;
    })[];
  };
  progressCount: number;
}
const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm">

    <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
    />

      <div className="flex gap-x-2 ml-auto">
        <ModeToggle />
        <Link href={"/dashboard/workshops"}>
          <Button variant={"outline"} size={"sm"}>
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseNavbar;
