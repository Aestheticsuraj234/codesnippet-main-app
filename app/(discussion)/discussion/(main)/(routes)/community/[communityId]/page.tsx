import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";


interface CommunityIdPageProps {
  params: {
    communityId: string;
  };
}
 const CommunityIdPage = async ({ params }: CommunityIdPageProps) => {
    const user = await currentUser();

    if(!user){
        return redirect("/")
    }


    const community = await db.community.findUnique({
        where:{
            id:params.communityId,
            members:{
                some:{
                    userId:user.id
                }
            }
        },
        include:{
            channels:{
                where:{
                    name:"general"
                },
                orderBy:{
                    createdAt:"asc"
                }
            },
            
        }
    })


    const initialChannel =  community?.channels[0]

    if(initialChannel?.name !== "general"){
        return null;
    }




  return redirect(`/discussion/community/${params.communityId}/channels/${initialChannel?.id}`)
};



export default CommunityIdPage;