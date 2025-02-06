import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";


export async function PATCH(req: Request, props: { params: Promise<{ communityId: string }> }) {
  const params = await props.params;
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.communityId) {
      return new NextResponse("Community ID Missing", { status: 400 });
    }

    const community = await db.community.update({
      where: {
        id: params.communityId,
        userId: user.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(community);
  } catch (error) {
    console.log("[INVITE_CODE_COMMUNITY_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}