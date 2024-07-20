"use client";
import {
  LucideIcon,
  Mail,
  PlusCircle,
  UserPlus,
  MessageSquare,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

interface NestedLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarNestedItemProps {
  icon: LucideIcon;
  label: string;
  nestedLink: NestedLink[];
}

const SidebarNestedItem = ({
  icon: Icon,
  label,
  nestedLink,
}: SidebarNestedItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <DropdownMenu>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex items-center gap-x-2 text-slate-500 dark:text-slate-100 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive &&
                  "text-zinc-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-zinc-700"
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
                  "ml-auto opacity-0 border-2 border-black dark:border-white  h-full transition-all",
                  isActive && "opacity-100"
                )}
              />
            </button>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {nestedLink.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  onClick={() => onClick(link.href)}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  <span>{link.label}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarNestedItem;
