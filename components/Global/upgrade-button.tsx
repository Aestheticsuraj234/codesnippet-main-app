"use client";
import { Crown, LockKeyhole, ShieldEllipsis } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { UserRole } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { getSubscription } from "@/action/subscription";

type SubscriptionData = {
  endDate: string;
  status: string;
  plan: string;
};

export const UpgradeButton = () => {
  const [subscribedTo, setSubscribedTo] = useState<SubscriptionData | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    async function fetchSubscription() {
      if (currentUser) {
        const res = await getSubscription();
        setSubscribedTo(res?.subscribedTo);
      }
    }

    if (currentUser) {
      fetchSubscription();
    }
  }, [currentUser]); // Only run when `currentUser` changes

  const isPremiumActiveUser = useMemo(
    () =>
      subscribedTo?.status === "ACTIVE" &&
      subscribedTo?.plan === "PREMIUM" &&
      currentUser?.role === "PREMIUM_USER",
    [subscribedTo, currentUser]
  );

  const ButtonText = isPremiumActiveUser ? "Premium User" : "Upgrade to Pro";
  const ButtonIcon = isPremiumActiveUser ? <Crown size={20} /> : <LockKeyhole size={20} />;
  const ButtonVariant = isPremiumActiveUser ? "premium" : "outline";

  // Memoize the admin check to prevent unnecessary calculations
  const isAdmin = useMemo(() => currentUser?.role === UserRole.ADMIN, [currentUser]);

  if (isAdmin) {
    return (
      <Link href={"#"} passHref>
        <Button
          variant={"destructive"}
          size={"default"}
          className="flex flex-1 justify-center items-center gap-2"
        >
          <ShieldEllipsis size={20} />
          <span className="font-bold">Admin Dashboard</span>
        </Button>
      </Link>
    );
  }

  return (
    <Link href={"/pricing"}>
      <Button
        variant={ButtonVariant}
        size={"default"}
        className="flex flex-1 justify-center items-center gap-2"
      >
        {ButtonIcon}
        <span className="font-bold">{ButtonText}</span>
      </Button>
    </Link>
  );
};
