
"use client";
import Link from "next/link";
import { UserButton } from "../Auth/UserButton";
import { ModeToggle } from "../Global/Navbar/theme-toggle";
import { UpgradeButton } from "../Global/upgrade-button";
import { SheetMenu } from "./sheet-menu";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";




export function Navbar() {
    const { status } = useSession();
  return (
    <header className="sticky top-0 z-10 w-full dark:border-[#3F3F46] border-[#E5E7EB] bg-[#fff] dark:bg-[#27272A]">
      <div className="mx-4 sm:mx-8 flex h-[80px] items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
        </div>
        <div className="flex gap-x-2 ml-auto justify-center items-center">
        {/* toggle dark mode button */}
        <ModeToggle />
        {/* login Button */}
        {status === "authenticated"  ? (
          <div className="flex flex-1 justify-center items-center gap-4">
            <UserButton />
            <UpgradeButton /> 
          </div>
        ) : (
          <Link href={"/auth/login"}>
            <Button variant={"auth"} size={"lg"}>
              Login
            </Button>
          </Link>
        )}
      </div>
      </div>
    </header>
  );
}
