import ChatHeader from "@/components/discussion/chat/chat-header";
import { ChatInput } from "@/components/discussion/chat/chat-input";
import { ChatMessages } from "@/components/discussion/chat/chat-messages";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    communityId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      communityId: params.communityId,
      userId: user.id,
    },
  });

  if (!channel || !member) {
    redirect("/discussion");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      {/* Chat Header */}
      <ChatHeader
        name={channel.name}
        communityId={channel.communityId}
        type="channel"
      />
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <ChatMessages
          member={member}
          name={channel.name}
          chatId={channel.id}
          type="channel"
          apiUrl="/api/messages"
          socketUrl="/api/socket/messages"
          socketQuery={{
            channelId: channel.id,
            communityId: channel.communityId,
          }}
          paramKey="channelId"
          paramValue={channel.id}
        />
      </div>
      
      {/* Chat Input */}
      {channel.type === ChannelType.TEXT && (
        <ChatInput
          name={channel.name}
          type="channel"
          apiUrl="/api/socket/messages"
          query={{
            channelId: channel.id,
            communityId: channel.communityId,
          }}
          // @ts-ignore
          user={user}
        />
      )}
    </div>
  );
};

export default ChannelIdPage;
