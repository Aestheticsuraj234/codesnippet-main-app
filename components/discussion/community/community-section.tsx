"use client";

import { Hint } from "@/components/Global/hint";
import { CommunityWithMemberWithUser } from "@/types";
import { useModal } from "@/zustand/use-modal-store";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";



interface CommunitySectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  community?: CommunityWithMemberWithUser;
};

export const CommunitySection = ({
  label,
  role,
  sectionType,
  channelType,
  community,
}: CommunitySectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <Hint label="Create Channel" side="top" align="center"  sideOffset={13} alignOffset={13}>
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </Hint>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <Hint label="Manage Members" side="top" sideOffset={13} alignOffset={13}>
          <button
            onClick={() => onOpen("members", { community })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </Hint>
      )}
    </div>
  )
}