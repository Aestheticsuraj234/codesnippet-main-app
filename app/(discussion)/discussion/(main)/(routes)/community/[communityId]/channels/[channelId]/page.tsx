import ChatHeader from "@/components/discussion/chat/chat-header";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
      communityId: string;
      channelId: string;
    }
  }
  



const ChannelIdPage = async({params}:ChannelIdPageProps)=>{

    const user = await currentUser();

    if(!user){
        return redirect("/")
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
        }
      });

      if (!channel || !member) {
        redirect("/discussion");
      }
    
    
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
               <ChatHeader
        name={channel.name}
        communityId={channel.communityId}
        type="channel"
      />
        </div>
    )
}

export default ChannelIdPage;