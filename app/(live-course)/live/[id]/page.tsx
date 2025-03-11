import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";
import React from "react";

const LiveIdPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const user = await currentUser();

  const liveCourse = await db.courses.findUnique({
    where: {
      id: params.id,
    },
    include: {
      chapters: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!liveCourse) {
    return redirect("/dashboard/courses");
  }
  const isPurchased = await db.coursePurchase.findUnique({
    where: {
      userId_courseId: {
        userId: user?.id!,
        courseId: params.id,
      },
    },
    select:{
        isPurchase:true
    }
  });

  if (!isPurchased?.isPurchase) {
      return redirect("/dashboard/courses");
  }

  // Now here check that is there any chapter in the course or not if not then findThe COMMUNITY GROUP and redirect to that page ELSE redirect to the first chapter of the course

  if(liveCourse.chapters.length === 0 ){
    
// redirect to the community group https://discord.gg/YN4QMk6  into the new tab


    return redirect(`https://discord.gg/z3fWhFQrKR`);
    


  }
  else{
      return redirect(`/live/${params.id}/chapters/${liveCourse.chapters[0].id}`);
  }
};

export default LiveIdPage;
