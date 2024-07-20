"use client";
import { Crown, LockKeyhole, ShieldEllipsis } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { db } from "@/lib/db/db";
import { currentUser } from "@/lib/auth/data/auth";
import { ZodString } from "zod";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { UserRole } from "@prisma/client";

export const UpgradeButton =  () => {
 
  const currentUser = useCurrentUser();

  const ButtonText = currentUser?.role === UserRole.PREMIUM_USER ? "Premium User" : "Upgrade to Pro";
  const ButtonIcon = currentUser?.role === UserRole.PREMIUM_USER ?( <Crown size={20} />) :( <LockKeyhole size={20}/>);
  const ButtonVariant = currentUser?.role === UserRole.PREMIUM_USER ? "premium" : "outline";

 

  if(currentUser?.role === UserRole.ADMIN){
    return (
      <Link href={"#"} passHref>
        <Button
          variant={"destructive"}
          size={"default"}
          className="flex flex-1 justify-center items-center gap-2"
        >
            <ShieldEllipsis size={20}/>
          <span className="font-bold">
            Admin Dashboard
          </span>
        </Button>
      </Link>
    )
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
