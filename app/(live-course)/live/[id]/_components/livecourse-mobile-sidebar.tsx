import { MenuIcon} from "lucide-react";
import { Courses, Chapter, ChapterProgress } from "@prisma/client";

import {
Sheet,
SheetContent,
SheetTrigger
} from "@/components/ui/sheet"
import LiveCourseSidebar from "./live-course-sidebar";



interface LiveCourseMobileSidebarProps {
    liveCourse: Courses & {
      chapters: (Chapter & {
        chapterProgression: ChapterProgress[] | null;
      })[];
    };
    progressCount: number;
  }

const LiveCourseMobileSidebar = ({liveCourse , progressCount}:LiveCourseMobileSidebarProps) => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75">
            <MenuIcon className="h-6 w-6 text-slate-500"/>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
            <LiveCourseSidebar
            liveCourse={liveCourse}
            progressCount={progressCount}
            />
        </SheetContent>
    </Sheet>
  )
}

export default LiveCourseMobileSidebar