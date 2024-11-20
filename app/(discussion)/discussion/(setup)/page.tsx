import { InitialCommunityModal } from "@/components/modal/initial-community-modal";
import { InviteModal } from "@/components/modal/initial-invite-modal";

import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const user = await currentUser();

  // Check if the user is part of any community
  const community = await db.community.findFirst({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  if(!community){
    return redirect("/dashboard")
  }


  if (community) {
    return redirect(`/discussion/community/${community.id}`);
  }

  // If user role is ADMIN and no community exists, show InitialCommunityModal
  if (!community && user?.role === "ADMIN") {
    return <InitialCommunityModal />;
  }

  // Check for an existing community with a "general" channel
  const existingCommunity = await db.community.findFirst({
    where: {
      channels: {
        some: {
          name: "general",
        },
      },
    },
  });

  // If no existing community and no user role is applicable, redirect to /dashboard
  if (!existingCommunity) {
    return redirect("/dashboard");
  }

  // If an existing community exists, show InviteModal
  return <InviteModal community={existingCommunity!} />;
};

export default SetupPage;
