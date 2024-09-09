"use client";

import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useModal } from "@/zustand/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { CommunityWithMemberWithUser } from "@/types";
import { Community } from "@prisma/client";
import Link from "next/link";

interface Props {
  community: Community | null;
}

export const InviteModal = ({
    community
}:Props) => {
  const origin = useOrigin();

  console.log(community);

  const [isMounted, setIsMounted] = useState(false);
 

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/discussion/invite/${community?.inviteCode}`;


  useEffect(() => {
    setIsMounted(true);
  }, []);





  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Members
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label
            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
          >
            Community invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Link href={inviteUrl}>
            <Button disabled={isLoading}  size="default" variant={'link'}>
                Join
            </Button>
            </Link>
          </div>
        
        
        </div>
      </DialogContent>
    </Dialog>
  )
}