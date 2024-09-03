import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { CommunitySidebar } from "@/components/discussion/community/community-sidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { communityId: string };
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/")
  }

  const server = await db.community.findUnique({
    where: {
      id: params.communityId,
      members: {
        some: {
          userId: user.id!
        }
      }
    }
  });

  if (!server) {
    return redirect("/tutorial");
  }

  return ( 
    <div className="h-full">
      <div 
      className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <CommunitySidebar communityId={params.communityId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
   );
}
 
export default ServerIdLayout;