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
import { UpgradeButton } from "../upgrade-button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import toast from "react-hot-toast";

export const NavbarRoutes = () => {
  const { theme } = useTheme();
  const [imagePath, setImagePath] = useState("/code-snippet2ss.svg");
  const { status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (theme === "dark") {
      setImagePath("/code-snippet-dark2.svg");
    } else {
      setImagePath("/code-snippet2.svg");
    }
  }, [theme]);

  const handleCopySVG = async () => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      navigator.clipboard.writeText(base64data).then(() => {
        toast.success("SVG copied to clipboard");
      });
    };
    reader.readAsDataURL(blob);
  };

  return (
    <div className="flex justify-between items-center w-full">
      {!pathname?.includes("/dashboard") && !pathname?.includes("/campus-ambassador")  && !pathname?.includes("/live-course") && (
        <div className="flex justify-center items-end p-3 hover:cursor-pointer">
          <ContextMenu>
            <Link href="/" className="flex items-center gap-2 mt-4">
              <ContextMenuTrigger className="flex-shrink-0">
                <Image
                  src={imagePath}
                  alt="logo"
                  width={240}
                  height={240}
                  className="
                    w-32 h-32  
                    sm:w-36 sm:h-36  
                    md:w-40 md:h-40 
                    lg:w-48 lg:h-48  
                    xl:w-56 xl:h-56  
                    object-contain
                  "
                />
              </ContextMenuTrigger>
            </Link>
            <ContextMenuContent className="w-64">
              <ContextMenuItem onClick={handleCopySVG}>
                Copy SVG
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
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
