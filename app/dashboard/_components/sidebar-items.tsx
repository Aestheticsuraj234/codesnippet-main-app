"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";



interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;

};

export const SidebarItem = ({
  icon: Icon,
  label,
  href
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    if (href) {
      router.push(href);
    }
  }

  return (
    <>
          <button
            onClick={onClick}
            type="button"
            className={cn(
              "flex items-center gap-x-2 text-slate-500 dark:text-slate-100 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
              isActive && "text-zinc-800 bg-green-200/20 hover:bg-green-200/20 hover:text-zinc-900"
            )}
          >
            <div className="flex items-center gap-x-2 py-4">
              <Icon
                size={22}
                className={cn(
                  "text-slate-500 dark:text-slate-100 transition-all",
                  isActive && "text-zinc-900"
                )}
              />
              {label}
            </div>
            <div
              className={cn(
                "ml-auto opacity-0 border-2 border-[#08BD80] dark:border-[#08BD80]/80  h-full transition-all",
                isActive && "opacity-100"
              )}
            />
          </button>
   
    </>
  )
}
