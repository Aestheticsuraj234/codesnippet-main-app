"use client";
import {
  Bell,
  CircleDollarSign,
  Feather,
  GraduationCap,
  Handshake,
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
    label: "My Dashboard",
    href: "/dashboard",
  },
  {
    icon:GraduationCap ,
    label: "Recorded Tutorials",
    href: "/dashboard/tutorials",
  },
  {
    icon:PencilRulerIcon,
    label: "Workshops",
    href: "/dashboard/workshops",
  },
  {
    icon:School,
    label: "Live Courses",
    href: "/dashboard/courses",
  },
  {
    icon:CircleDollarSign,
    label:"Campus Ambassador",
    href: "/dashboard/campus-ambassador",
  },
  {
    icon:Handshake,
    label:"1:1 Mentorship",
    href: "/dashboard/mentorship",

  },
  {
    icon:Trophy,
    label: "Leaderboard",
    href: "/dashboard/leaderboard",
  },
  {
    icon:User,
    label: "Profile",
    href: "/dashboard/profile",
  },
 {
  icon:Feather,
  label:"Feedback",
  href: "/dashboard/feedback",
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
