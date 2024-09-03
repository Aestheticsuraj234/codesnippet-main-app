import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { CommunityHeader } from "./community-header";

interface CommunitySidebarProps {
  communityId: string;
}

export const CommunitySidebar = async ({
  communityId,
}: CommunitySidebarProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const community = await db.community.findUnique({
    where: {
      id: communityId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const TEXT_CHANNELS = community?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const members = community?.members.filter(
    (member) => member.user.id !== user.id
  );

  if (!community) {
    return redirect("/tutorial");
  }

  const role = community.members.find(
    (member) => member.userId === user.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <CommunityHeader
      community={community}
      role={role}
      />
    </div>
  );
};
