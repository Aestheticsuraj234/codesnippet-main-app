"use client";



import { ModeToggle } from "./theme-toggle";

import { UserButton } from "@/components/Auth/UserButton";

export const NavbarRoutes = () => {

  return (
    <>
     
      <div className="flex gap-x-2 ml-auto justify-center items-center">
        {/* toggle dark mode button */}
        <ModeToggle />
        {/* login Button */}
        <UserButton />
      </div>
    </>
  );
};