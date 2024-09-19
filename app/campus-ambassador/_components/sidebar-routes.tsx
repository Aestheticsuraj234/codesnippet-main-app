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
  Sparkles,
  SquareMousePointer,
  Trophy,
  User,
} from "lucide-react";
import { SidebarItem } from "./sidebar-items";
import { useParams } from "next/navigation";





export const SidebarRoutes = () => {
  const params = useParams();
  const Routes = [
    {
      icon: Home,
      label: "Overview",
      href: `/campus-ambassador/${params?.id}`,
    },
    {
      icon:Sparkles,
      label: "Referrals Management",
      href: `/campus-ambassador/${params?.id}/referrals`,
    },
    {
      icon:SquareMousePointer ,
      label: "Points & Earnings",
      href: `/campus-ambassador/${params?.id}/points`,
    },
    
    {
      icon:Settings,
      label: "Settings",
      href: `/campus-ambassador/${params?.id}/settings`,
    },
  
  ];
  
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
