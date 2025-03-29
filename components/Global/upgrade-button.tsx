import React from "react";
import { Crown, LockKeyhole, ShieldEllipsis } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { UserRole } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { getSubscription } from "@/action/subscription";
import { cn } from "@/lib/utils";

type SubscriptionData = {
  endDate: string;
  status: string;
  plan: string;
};

export const UpgradeButton = React.memo(() => {
  const [subscribedTo, setSubscribedTo] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    let isMounted = true;

    async function fetchSubscription() {
      // Only fetch if there's a valid currentUser and no existing subscription data
      if (!currentUser || subscribedTo) return;

      setIsLoading(true);
      try {
        const res = await getSubscription();
        if (isMounted && res?.subscribedTo) {
          setSubscribedTo({
            ...res.subscribedTo,
            endDate: res.subscribedTo.endDate ? res.subscribedTo.endDate.toString() : "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    // Fetch subscription only if currentUser is available and no subscription data exists
    if (currentUser && !subscribedTo) {
      fetchSubscription();
    }

    return () => {
      isMounted = false;
    };
  }, [currentUser, subscribedTo]); // Add `subscribedTo` to prevent unnecessary re-fetching

  const isPremiumActiveUser = useMemo(
    () =>
      subscribedTo?.status === "ACTIVE" &&
      subscribedTo?.plan === "PREMIUM" &&
      currentUser?.role === "PREMIUM_USER",
    [subscribedTo, currentUser]
  );

  const isAdmin = useMemo(() => currentUser?.role === UserRole.ADMIN, [currentUser]);
  const isProUser = useMemo(() => currentUser?.role === UserRole.PREMIUM_USER, [currentUser]);
  const isFreeUser = useMemo(() => currentUser?.role === UserRole.USER, [currentUser]);

  const buttonConfig = useMemo(() => {
    if (isAdmin) {
      return {
        href: "https://admin.codesnipet.dev",
        variant: "destructive",
        icon: <ShieldEllipsis size={20} />,
        text: "Admin Dashboard",
        external: true,
      };
    }

    if (isProUser) {
      return {
        href: "/pricing",
        variant: isPremiumActiveUser ? "premium" : "brand",
        icon: <Crown size={20} />,
        text: "Premium User",
        external: false,
      };
    }

    return {
      href: "/pricing",
      variant: "brand",
      icon: <LockKeyhole size={20} />,
      text: "Upgrade to Pro",
      external: false,
    };
  }, [isAdmin, isProUser, isPremiumActiveUser]);

  if (isLoading) {
    return (
      <Button
        variant="outline"
        size="default"
        className="flex flex-1 justify-center items-center gap-2 animate-pulse"
        disabled
      >
        <span className="h-5 w-5 rounded-full bg-muted"></span>
        <span className="h-4 w-20 rounded bg-muted sm:inline-block hidden"></span>
      </Button>
    );
  }

  return (
    <Link href={buttonConfig.href} passHref target={buttonConfig.external ? "_blank" : undefined} className="flex-1">
      <Button
        variant={buttonConfig.variant as any}
        size="default"
        className={cn(
          "flex justify-center items-center gap-2 w-full transition-all duration-300 hover:shadow-md",
          "group overflow-hidden"
        )}
      >
        <span className={cn("transition-transform duration-300 group-hover:scale-110")}>
          {buttonConfig.icon}
        </span>
        <span
          className={cn(
            "font-bold transition-opacity duration-300",
            "hidden sm:inline-block" // Hide text on small screens, show on sm and above
          )}
        >
          {buttonConfig.text}
        </span>
      </Button>
    </Link>
  );
});

// Add display name for better debugging
UpgradeButton.displayName = "UpgradeButton";