import ChatHeader from "@/components/discussion/chat/chat-header";
import { ChatInput } from "@/components/discussion/chat/chat-input";
import { ChatMessages } from "@/components/discussion/chat/chat-messages";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { getOrCreateConversation } from "@/lib/discussion/conversation";
import { redirect } from "next/navigation";
import React from "react";

interface MemberIdPageProps {
  params: Promise<{
    communityId: string;
    memberId: string;
  }>;
}

const MemberIdPage = async (props: MemberIdPageProps) => {
  const params = await props.params;
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const currentMember = await db.member.findFirst({
    where: {
      communityId: params.communityId,
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  console.log(conversation);

  if (!conversation) {
    return redirect(`/community/${params.communityId}`);
  }

  const { memberOne, memberTwo } = conversation;

  console.log(memberOne, memberTwo);

  const otherMember =  memberOne.userId === user.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.user.image!}
        name={otherMember.user.name!}
        communityId={params.communityId}
        type="conversation"
      />
      <ChatMessages
            member={currentMember}
            name={otherMember.user.name!}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
            
          />
     
     <ChatInput
            name={otherMember.user.name!}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
            // @ts-ignore
            user={user}
          />
    </div>
  );
};

export default MemberIdPage;
