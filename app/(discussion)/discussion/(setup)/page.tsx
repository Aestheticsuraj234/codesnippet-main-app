import { InitialCommunityModal } from "@/components/modal/initial-community-modal";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const user = await currentUser();

  const community = await db.community.findFirst({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });


  if(community){
    return redirect(`/discussion/community/${community.id}`);
  }


// if user role is admin then show the create server page else show the join server page

if(!community && user?.role === 'ADMIN'){
    return( <InitialCommunityModal />)
}

return (
    <div>
        <h1>Join a community</h1>
    </div>
)

  
};

export default SetupPage;
