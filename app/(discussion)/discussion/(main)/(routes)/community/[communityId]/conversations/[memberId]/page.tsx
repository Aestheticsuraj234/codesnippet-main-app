import ChatHeader from "@/components/discussion/chat/chat-header";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { getOrCreateConversation } from "@/lib/discussion/conversation";
import { redirect } from "next/navigation";
import React from "react";

interface MemberIdPageProps {
  params: {
    communityId: string;
    memberId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
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
    </div>
  );
};

export default MemberIdPage;
