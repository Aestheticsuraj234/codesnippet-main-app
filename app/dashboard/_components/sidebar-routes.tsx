"use client";
import {
  Bell,
  CircleDollarSign,
  GraduationCap,
  Home,
  NotebookPen,
  PencilRulerIcon,
  School,
  Settings,
  Trophy,
  User,
} from "lucide-react";

import { SidebarItem } from "./sidebar-items";

const Routes = [
  {
    icon: Home,
    label: "Home",
    href: "/dashboard",
  },
  {
    icon:Bell,
    label: "Notifications",
    href: "/dashboard/notifications",
  },
  {
    icon:GraduationCap ,
    label: "Tutorials",
    href: "/dashboard/tutorials",
  },
  {
    icon:PencilRulerIcon,
    label: "Workshops",
    href: "/dashboard/workshops",
  },
  {
    icon:School,
    label: "Courses",
    href: "/dashboard/courses",
  },

  {
    icon:Trophy,
    label: "Leaderboard",
    href: "/dashboard/leaderboard",
  },
  {
    icon:CircleDollarSign,
    label:"Campus Ambassador",
    href: "/dashboard/campus-ambassador",
  },
  {
    icon:User,
    label: "Profile",
    href: "/dashboard/profile",
  },

];

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {Routes.map((route) => (
        <SidebarItem
          key={route.href || route.label}
          icon={route.icon}
          label={route.label}
          href={route.href}
   
        />
      ))}
    </div>
  );
};
