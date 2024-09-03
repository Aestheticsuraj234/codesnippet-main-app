import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db/db";
import { currentUser } from "@/lib/auth/data/auth";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const community = await db.community.create({
      data: {
        userId: user.id!,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              userId: user.id!,
            },
          ],
        },
        members: {
          create: [
            {
              userId: user.id!,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });


    return NextResponse.json(community);
  } catch (error) {
    console.log("[COMMUNITY_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
