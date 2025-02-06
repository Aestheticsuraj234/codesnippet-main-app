import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, props: { params: Promise<{ memberId: string }> }) {
  const params = await props.params;
  try {
    const user = await currentUser();
    const { searchParams } = new URL(req.url);

    const communityId = searchParams.get("communityId");

    if (!user) {
      return new NextResponse("Unauthorized" ,{ status: 401 });
    }

    if (!communityId) {
      return new NextResponse("community ID missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const community = await db.community.update({
      where: {
        id: communityId,
        userId: user.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            userId: {
              not: user.id
            }
          }
        }
      },
      include: {
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc",
          }
        },
      },
    });

    return NextResponse.json(community);
  } catch (error) {
    console.log("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ memberId: string }> }) {
  const params = await props.params;
  try {
    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    const communityId = searchParams.get("communityId");

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!communityId) {
      return new NextResponse("community ID missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const community = await db.community.update({
      where: {
        id: communityId,
        userId: user.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              userId: {
                not: user.id
              }
            },
            data: {
              role
            }
          }
        }
      },
      include: {
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    });

    return NextResponse.json(community);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}