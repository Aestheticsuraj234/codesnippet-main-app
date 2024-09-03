"use client";
import { Crown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import LogoutButton from "./LogoutButton";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { getSubscription } from "@/action/subscription";

export const UserButton = () => {
  const [subscribedTo, setSubscribedTo] = useState();
  const user = useCurrentUser();

  useEffect(() => {
    async function fetchSubscription() {
      if (user) {
        const res = await getSubscription();
        setSubscribedTo(res?.subscribedTo);
      }
    }

    if (user) {
      fetchSubscription();
    }

    
  }, [user]); // Only run when `user` changes

  // Memoize the check to avoid unnecessary re-calculations
  const isPremiumActiveUser = useMemo(
    () =>
      subscribedTo?.status === "ACTIVE" &&
      subscribedTo?.plan === "PREMIUM" &&
      user?.role === "PREMIUM_USER",
    [subscribedTo, user]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={cn(
            "relative rounded-full ",
            isPremiumActiveUser ? "border-2 p-1 border-indigo-500" : ""
          )}
        >
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-green-500">
              <User className="text-white" />
            </AvatarFallback>
          </Avatar>
          {isPremiumActiveUser && (
            <span className="absolute top-0 left-0 bg-[#4169e1] rounded-full p-1 transform -translate-x-1/2 -translate-y-1/2">
              <Crown className="text-white" size={16} />
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
