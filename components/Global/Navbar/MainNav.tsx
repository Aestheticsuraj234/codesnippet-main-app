"use client";
import Link from "next/link";

import { cn } from "@/lib/utils/utils";
import {  usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const MainNavroutes = [
    {
      href: `#features`,
      label: "Features",
      active: pathname === `#features`,
    },
    {
      href: `#pricing`,
      label: "Pricing",
      active: pathname === `#pricing`,
    },
    {
      href: `/demo`,
      label: "Demo",
      active: pathname === `/demo`,
    },
    {
      href: `/leaderboard`,
      label: "Leaderboard",
      active: pathname === `/leaderboard`,
    },
    {
      href:"#faq",
      label:"Faq",
      active:pathname==="#faq"
    }
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 z-50", className)}
      {...props}
    >
      {MainNavroutes.map((route) => (
        <Link key={route.href} href={route.href} passHref>
          <span
            className={cn(
              "text-md font-medium transition-colors hover:text-primary",
              route.active ? "text-primary-foreground" : "text-[#E5ECEA]"
            )}
          >
            {route.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
