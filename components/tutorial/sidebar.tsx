import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStore } from "@/zustand/use-store";
import { useSidebarToggle } from "@/zustand/use-sidebarToggle";
import { SidebarToggle } from "./sidebar-toggle";
import { Menu } from "./menu";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Sidebar() {
  const {theme} = useTheme()
  const [imagePath , setImagePath] = useState("/code-snippet2ss.svg") 
  const sidebar = useStore(useSidebarToggle, (state) => state);

  useEffect(() => {
    if(theme === "dark"){
      setImagePath("/code-snippet-dark2.svg")
    }else{
      setImagePath("/code-snippet2.svg")
    }
  }  , [theme])
  
  if(!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 dark:border-[#3F3F46] border-[#E5E7EB] bg-[#fff] dark:bg-[#27272A] ",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2 mt-4">
            <Image src={imagePath} alt="logo" width={240} height={240} className="flex-shrink-0" /> 
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
