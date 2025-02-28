"use client";

import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CollapseMenuButton } from "./collapse-menu-button";
import { Loader } from "../Global/loader";
import { useMenu } from "@/zustand/use-menu";
import { getMenuList } from "@/lib/tutorial/menu-list";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const params = useParams();
  const { menuList, setMenuList, isSubDone, setIsDone } = useMenu(); // Get Zustand state and actions
  const [isLoading, setIsLoading] = useState(true);

  // Fetch menu data initially
  useEffect(() => {
    async function fetchMenu() {
      setIsLoading(true);
      const menu = await getMenuList(pathname!, params?.technologyId);
      setMenuList(menu);
      setIsLoading(false);
    }

    if (params?.technologyId) {
      fetchMenu();
    }
  }, [params?.technologyId]); // Added setMenuList to dependency array

  // Memoize menuList and dynamically compute 'active' state based on 'pathname' and 'done' status
  const memoizedMenuList = useMemo(() => {
    return menuList.map((group) => ({
      ...group,
      menus: group.menus.map((menu) => ({
        ...menu,
        active: pathname?.includes(menu.href), // Dynamically update active state
        submenus: menu.submenus.map((submenu) => ({
          ...submenu,
          active: pathname === submenu.href, // Dynamically update active state
          done: submenu.done, // Use the current submenu 'done' status
        })),
      })),
    }));
  }, [menuList, pathname]); // Include 'menuList' and 'pathname' as dependencies

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader />
          </div>
        ) : (
          <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
            {memoizedMenuList.map(({ groupLabel, menus }, index) => (
              <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
                {(isOpen && groupLabel) || isOpen === undefined ? (
                  <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                    {groupLabel}
                  </p>
                ) : !isOpen && isOpen !== undefined && groupLabel ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="w-full flex justify-center items-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{groupLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="pb-2"></p>
                )}
                {menus.map(
                  ({ href, label, icon: Icon, active, submenus }, index) =>
                    submenus.length > 0 ? (
                      <CollapseMenuButton
                        key={index}
                        icon={Icon}
                        label={label}
                        active={active!}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    ) : (
                      <Button
                        variant={active ? "secondary" : "ghost"}
                        className="w-full justify-start h-10 mb-1 mr-2"
                        asChild
                        key={index}
                      >
                        <Link href={href}>
                          <div className="w-full items-center flex">
                            <span className={cn(isOpen === false ? "" : "mr-4")}>
                              <Icon size={18} />
                            </span>
                            <p
                              className={cn(
                                "max-w-[248px] truncate",
                                isOpen
                                  ? "translate-x-0 opacity-100"
                                  : "-translate-x-96 opacity-0"
                              )}
                            >
                              {label}
                            </p>
                          </div>
                        </Link>
                      </Button>
                    )
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </ScrollArea>
  );
}
