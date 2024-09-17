"use client";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/zustand/use-sidebarToggle";
import { useStore } from "@/zustand/use-store";
import { Sidebar } from "./sidebar";

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode,
 
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh)] bg-[#F5F5F5] dark:bg-[#141413] transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}
