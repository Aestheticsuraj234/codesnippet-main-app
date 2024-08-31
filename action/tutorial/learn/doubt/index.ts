"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export const PostDoubt = async (doubt: string, subTopicId: string) => {
    const user = await currentUser();
    
    const doubtPost = await db.doubt.create({
        // @ts-ignore
     data:{
        content: doubt,
        subTopicId: subTopicId,
        userId: user?.id
     }
    })
    
    revalidatePath(`/tutorial`  , "page")
    
    return doubtPost;
}



interface Doubt {
  id: string;
  content: string;
  createdAt: Date;
  likes: Array<{ userId: string }>;
  unlikes: Array<{ userId: string }>;
  _count: { likes: number };
  user: {
    id: string;
    name: string;
    image: string;
  };
  isLikedByCurrentUser?: boolean;
  isUnLikedByCurrentUser?: boolean;
}

export const GetDoubtsBySubTopicId = async (subTopicId: string) => {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("User not found");
  }

  // Fetch doubts along with likes/unlikes and user information
  const doubts = await db.doubt.findMany({
    where: {
      subTopicId: subTopicId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      likes: {
        select: {
          userId: true,
        },
      },
      unlikes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: { likes: true }, // Count the number of likes
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy:{
      createdAt: 'desc'
    }
  });

  // Calculate `isLikedByCurrentUser` and `isUnLikedByCurrentUser` for each doubt
  const doubtsWithUserLikeStatus: Doubt[] = doubts.map((doubt) => {
    const isLikedByCurrentUser = doubt.likes.some((like) => like.userId === user.id);
    const isUnLikedByCurrentUser = doubt.unlikes.some((unlike) => unlike.userId === user.id);

    return {
      ...doubt,
      isLikedByCurrentUser, // Add the new field
      isUnLikedByCurrentUser, // Add the new field
    };
  });

  return {
    doubts: doubtsWithUserLikeStatus,
  };
};

  



  export const toggleLike = async (userId: string, isLiked: boolean, doubtId: string) => {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
  
    if (user.id !== userId) {
      throw new Error("User not authorized");
    }
  
    try {
      if (isLiked) {
        // Find and delete any existing "unlike" before liking
        const existingUnlike = await db.doubtUnlike.findUnique({
          where: {
            userId_doubtId: {
              userId,
              doubtId,
            }
          }
        });
  
        if (existingUnlike) {
          await db.doubtUnlike.delete({
            where: {
              userId_doubtId: {
                userId,
                doubtId,
              }
            }
          });
        }
  
        // Check if "like" already exists to prevent duplicate entries
        const existingLike = await db.doubtLike.findUnique({
          where: {
            userId_doubtId: {
              userId,
              doubtId,
            }
          }
        });
  
        if (!existingLike) {
          await db.doubtLike.create({
            data: {
              doubtId,
              userId,
            }
          });
        }
      } else {
        // Check if the "like" exists before attempting to delete it
        const likeToDelete = await db.doubtLike.findUnique({
          where: {
            userId_doubtId: {
              userId,
              doubtId,
            }
          }
        });
  
        if (likeToDelete) {
          await db.doubtLike.delete({
            where: {
              userId_doubtId: {
                userId,
                doubtId,
              }
            }
          });
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw new Error("Failed to toggle like status.");
    }
  
    // Revalidate the cache or path after the operation
    revalidatePath(`/tutorial`, "page");
  
    return { success: true, isLiked };
  };
  
  

  export const toggleUnlike = async (userId: string, isUnLiked: boolean, doubtId: string) => {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
  
    if (user.id !== userId) {
      throw new Error("User not authorized");
    }
  
    try {
      if (isUnLiked) {
        // Find and delete any existing "like" before unliking
        const existingLike = await db.doubtLike.findUnique({
          where: {
            userId_doubtId: {
              userId,
              doubtId,
            }
          }
        });
  
        if (existingLike) {
          await db.doubtLike.delete({
            where: {
              userId_doubtId: {
                userId,
                doubtId,
              }
            }
          });
        }
  
        // Check if "unlike" already exists to prevent duplicate entries
        const existingUnlike = await db.doubtUnlike.findUnique({
          where: {
            userId_doubtId: {
              userId,
              doubtId,
            }
          }
        });
  
        if (!existingUnlike) {
          await db.doubtUnlike.create({
            data: {
              doubtId,
              userId,
            }
          });
        }
      } else {
        // Check if the "unlike" exists before attempting to delete it
        const unlikeToDelete = await db.doubtUnlike.findUnique({
          where: {
            userId_doubtId: {
              userId,
              doubtId,
            }
          }
        });
  
        if (unlikeToDelete) {
          await db.doubtUnlike.delete({
            where: {
              userId_doubtId: {
                userId,
                doubtId,
              }
            }
          });
        }
      }
    } catch (error) {
      console.error('Error toggling unlike:', error);
      throw new Error("Failed to toggle unlike status.");
    }
  
    // Revalidate the cache or path after the operation
    revalidatePath(`/tutorial`, "page");
  
    return { success: true, isUnLiked };
  };
  