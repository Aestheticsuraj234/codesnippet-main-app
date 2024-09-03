import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";


export async function POST(
  req: Request
) {
  try {
    const user = await currentUser();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const communityId = searchParams.get("communityId");

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!communityId) {
      return new NextResponse("community ID missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const community = await db.community.update({
      where: {
        id: communityId,
        members: {
          some: {
            userId: user.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            userId: user.id!,
            name,
            type,
          }
        }
      }
    });

    return NextResponse.json(community);
  } catch (error) {
    console.log("CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}