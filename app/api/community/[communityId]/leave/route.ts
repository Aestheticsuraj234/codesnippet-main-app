import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";



export async function PATCH(
  req: Request,
  { params }: { params: { communityId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.communityId) {
      return new NextResponse("community ID missing", { status: 400 });
    }

    const community = await db.community.update({
      where: {
        id: params.communityId,
        userId: {
          not: user.id
        },
        members: {
          some: {
            userId: user.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            userId: user.id
          }
        }
      }
    });

    return NextResponse.json(community);
  } catch (error) {
    console.log("[COMMUNITY_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}