import {Menu, MenuIcon} from "lucide-react";
import { WorkshopDay , workshop , WorkshopDayProgress } from "@prisma/client";

import {
Sheet,
SheetContent,
SheetTrigger
} from "@/components/ui/sheet"

import CourseSidebar from "./course-sidebar"

interface CourseMobileSidebarProps {
  course: workshop & {
    days: (WorkshopDay & {
      userProgress: WorkshopDayProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({course , progressCount}:CourseMobileSidebarProps) => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75">
            <MenuIcon className="h-6 w-6 text-slate-500"/>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
            <CourseSidebar
            course={course}
            progressCount={progressCount}
            />
        </SheetContent>
    </Sheet>
  )
}

export default CourseMobileSidebar