"use client";
import { Crown, LockKeyhole, ShieldEllipsis } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { UserRole } from "@prisma/client";
import { useEffect, useState } from "react";
import { getSubscription } from "@/action/subscription";

type SubscriptionData = {
  endDate: string;
  status: string;
  plan: string;
};

export const UpgradeButton = () => {
  const [subscribedTo, setSubscribedTo] = useState();
  const currentUser = useCurrentUser();

  useEffect(() => {
    async function fetchSubscription() {
      if (currentUser) {
        let res = await getSubscription();
        setSubscribedTo(res?.subscribedTo);
      }
    }

    fetchSubscription();
  }, [currentUser , currentUser?.role]);

  const isPremiumActiveUser =
    subscribedTo?.status === "ACTIVE" &&
    subscribedTo?.plan === "PREMIUM" &&
    currentUser?.role === "PREMIUM_USER";

  const ButtonText = isPremiumActiveUser ? "Premium User" : "Upgrade to Pro";
  const ButtonIcon = isPremiumActiveUser ? <Crown size={20} /> : <LockKeyhole size={20} />;
  const ButtonVariant = isPremiumActiveUser ? "premium" : "outline";

  if (currentUser?.role === UserRole.ADMIN) {
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
