import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { CommunityHeader } from "./community-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, ShieldAlert, ShieldCheck } from "lucide-react";
import { CommunitySearch } from "./community-search";
import { Separator } from "@/components/ui/separator";
import { CommunitySection } from "./community-section";
import { CommunityChannel } from "./community-channel";
import { CommunityMember } from "./community-member";

interface CommunitySidebarProps {
  communityId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
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
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <CommunitySearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: TEXT_CHANNELS?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
             
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.user.name!,
                  icon: roleIconMap[member.role],
                }))
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!TEXT_CHANNELS?.length && (
          <div className="mb-2">
            <CommunitySection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {TEXT_CHANNELS.map((channel) => (
                <CommunityChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  community={community}
                />
              ))}
            </div>
          </div>
        )}

        {
          !!members?.length && (
            <div className="mb-2">
              <CommunitySection
                sectionType="members"
                role={role}
                label="Members"
                community={community}
              />
              <div className="space-y-[2px]">
                {members.map((member) => (
                  <CommunityMember
                  key={member.id}
                  member={member}
                  community={community}
                />
                ))}
              </div>
            </div>
          )
        }

      </ScrollArea>
    </div>
  );
};
