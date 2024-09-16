"use client";

import { cn } from "@/lib/utils";
import { ModeToggle } from "./theme-toggle";
import { UserButton } from "@/components/Auth/UserButton";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { usePathname } from "next/navigation";
import { LockKeyhole, Star } from "lucide-react";
import { UpgradeButton } from "../upgrade-button";

export const NavbarRoutes = () => {
  const { status } = useSession();
  const pathname = usePathname();



  return (
    <div className="flex justify-between items-center w-full">
      {pathname.includes("/dashboard") ? null : (
        <div className="flex justify-center items-center gap-3 hover:cursor-pointer">
          <Image
            src={"/logo-new.svg"}
            alt="Logo_image"
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-xl font-bold text-zinc-700 dark:text-white">
            SigmaCoders
          </span>
        </div>
      )}

      <div className="flex gap-x-2 ml-auto justify-center items-center">
        {/* toggle dark mode button */}
        <ModeToggle />
        {/* login Button */}
        {status === "authenticated" ? (
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
  );
};
