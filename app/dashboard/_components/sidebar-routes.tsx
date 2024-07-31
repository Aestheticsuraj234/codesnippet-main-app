"use client";
import {
  BriefcaseBusiness,
  Brush,
  Cable,
  CircleDollarSign,
  Code2Icon,
  Computer,
  FigmaIcon,
  FolderGit2,
  Home,
  LineChart,
  Notebook,
  NotebookPen,
  PencilRuler,
  PencilRulerIcon,
  Rss,
  Settings,
  Sheet,
  SquareCode,
  User,
} from "lucide-react";

import { SidebarItem } from "./sidebar-items";

const Routes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon:Rss,
    label: "Blog",
    href: "/blog",
  },
  {
    icon:PencilRulerIcon,
    label: "Workshops",
    href: "/workshops",
  },
  {
    icon:Sheet,
    label: "DSA",
    href: "/dashboard/dsa",
  },
  {
    icon:FigmaIcon,
    label:"System Design",
    href:"/dashboard/system-design"
  },
  {
    icon:NotebookPen,
    label: "Notebooks",
    href: "/notebooks",
  },
  {
    icon:Computer,
    label: "Cs Subjects",
    href: "/cs-subjects",
  },
  {
    icon:Code2Icon,
    label: "Projects",
    href: "/projects",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
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
