import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { communityId: string } }
  ) {
    try {
      const user = await currentUser();
      const { name, imageUrl } = await req.json();
  
      if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const server = await db.community.update({
        where: {
          id: params.communityId,
          userId: user.id,
        },
        data: {
          name,
          imageUrl,
        }
      });
  
      return NextResponse.json(server);
    } catch (error) {
      console.log("[COMMUNITY_ID_PATCH]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }


  export async function DELETE(
    req: Request,
    { params }: { params: { communityId: string } }
  ) {
    try {
      const user = await currentUser();
  
      if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const server = await db.community.delete({
        where: {
          id: params.communityId,
          userId: user.id,
        }
      });
  
      return NextResponse.json(server);
    } catch (error) {
      console.log("[COMMUNITY_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }