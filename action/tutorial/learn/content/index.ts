"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


// TODO: ADD POINTS FEATURE LATER
export const getSubTopicById = async (subTopicId: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const subTopic = await db.subTopic.findUnique({
    where: {
      id: subTopicId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      markAsDone: {
        where: {
          userId: user.id,
        },
      },
      likedBy:{
       where:{
          userId:user.id
       }
      },
      unlikeBy:{
          where:{
              userId:user.id
          }
      },
      savedBy:{
          where:{
              userId:user.id
          }
      }

    },
  });

  if (!subTopic) {
    return {
      error: "Subtopic not found",
    };
  }


  return subTopic;
};

export const likeCount = async (subTopicId: string) => {
  const likes = await db.subTopicLikedBy.count({
    where: {
      subTopicId,
    },
  });


  return likes;
}


export const toggleDone = async (
  subTopicId: string,
  userId: string,
  isCompleted: boolean
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.id !== userId) {
    throw new Error("User not authorized");
  }

  if (isCompleted) {
    await db.markAsDone.create({
      data: {
        subTopicId,
        userId,
      },
   
    });

    await db.point.create({
      data: {
        userId,
        subTopicId,
        point: 100,
      },
    })
  } else {
    await db.markAsDone.delete({
      where: {
        userId_subTopicId: {
          userId,
          subTopicId,
        },
      },
    });

    await db.point.delete({
      where: {
        userId_subTopicId: {
          userId,
          subTopicId,
        },
  }
    });
  }



  return { success: true, isDone: isCompleted };
};

export const toggleLike = async ( 
  subTopicId: string,
  userId: string,
  isLiked: boolean
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.id !== userId) {
    throw new Error("User not authorized");
  }

  if (isLiked) {
    await db.subTopicLikedBy.create({
      data: {
        subTopicId,
        userId,
      },
    });
  } else {
    await db.subTopicLikedBy.delete({
      where: {
        userId_subTopicId: {
          userId,
          subTopicId,
        },
      },
    });
  }



  return { success: true, isLiked: isLiked };
}

export const toggleUnLike = async (
  subTopicId: string,
  userId: string,
  isUnliked: boolean
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.id !== userId) {
    throw new Error("User not authorized");
  }

  if (isUnliked) {
    await db.subTopicUnlikedBy.create({
      data: {
        subTopicId,
        userId,
      },
    });
  } else {
    await db.subTopicUnlikedBy.delete({
      where: {
        userId_subTopicId: {
          userId,
          subTopicId,
        },
      },
    });
  }



  return { success: true, isUnliked: isUnliked };
}


export const toggleSave = async (
  subTopicId: string,
  userId: string,
  isSaved: boolean
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.id !== userId) {
    throw new Error("User not authorized");
  }

  if (isSaved) {
    await db.subTopicSavedBy.create({
      data: {
        subTopicId,
        userId,
      },
    });
  } else {
    await db.subTopicSavedBy.delete({
      where: {
        userId_subTopicId: {
          userId,
          subTopicId,
        },
      },
    });
  }



  return { success: true, isSaved: isSaved };
}