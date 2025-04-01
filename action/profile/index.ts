"use server";

import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { ProfileUpdateFormSchema } from "@/schema";
import { subDays } from "date-fns";
import { z } from "zod";

export const updateUserProfileById = async (
  userId: string,
  data: z.infer<typeof ProfileUpdateFormSchema>
) => {
  try {
    // Validate user ID
    if (!userId) {
      return { error: "Invalid User ID" };
    }

    // Validate profile data
    if (!data || typeof data !== "object") {
      return { error: "Invalid profile data" };
    }

    // Parse and validate the data against the schema
    const parsedData = ProfileUpdateFormSchema.safeParse(data);
    if (!parsedData.success) {
      return { error: "Validation failed", issues: parsedData.error.issues };
    }

    // Check if the user exists
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      include: {
        campusAmbassador: true, // Include campusAmbassador to check if it exists
      },
    });

    if (!existingUser) {
      return { error: "User not found" };
    }

    // Determine if campusAmbassador data is provided
    const hasCampusAmbassadorData =
      data.campusName || data.fullName || data.mobileNumber || data.upiId;

    // Prepare the update payload
    const updatePayload = {
      name: data.name,
      email: data.email,
      campusAmbassador: hasCampusAmbassadorData
        ? existingUser.campusAmbassador
          ? {
              update: {
                // @ts-ignore
                where: { id: existingUser.campusAmbassador.id },
                data: {
                  campusName: data.campusName,
                  fullName: data.fullName,
                  mobileNumber: data.mobileNumber,
                  upiId: data.upiId,
                },
              },
            }
          : {
              create: {
                campusName: data.campusName,
                fullName: data.fullName,
                mobileNumber: data.mobileNumber,
                upiId: data.upiId,
              },
            }
        : undefined, // Skip campusAmbassador update if no data is provided
    };

    // Update the user's profile
    const updatedUser = await db.user.update({
      where: { id: userId },
      // @ts-ignore
      data: updatePayload,
      include: {
        campusAmbassador: true, // Include the updated/created campusAmbassador details
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Profile Update Error:", error);
    return { error: "Failed to update user profile" };
  }
};

export const getUserDataWithAmbassador = async () => {
  const currentUserData = await currentUser();

  // Fetch user profile data
  const user = await db.user.findUnique({
    where: { id: currentUserData?.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      image: true,
      campusAmbassador: {
        select: {
          id: true,
          campusName: true,
          mobileNumber: true,
          points: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const getNotes = async () => {
  const currentUserData = await currentUser();
  // Fetch user notes
  const notes = await db.note.findMany({
    where: { userId: currentUserData?.id },
    select: {
      note: true,
      createdAt: true,
      subTopic: {
        select: {
          id: true,
          topic: {
            select: {
              technologyId: true,
              id: true,
            },
          },
          title: true,
        },
      },
    },
  });

  return notes;
};

export const getworkshopProgressData = async () => {
    const currentUserData = await currentUser();
    if (!currentUserData?.id) return []; // Ensure it returns an empty array if user is missing
    
    const endDate = new Date();
    const startDate = subDays(endDate, 364);
  
    const progress = await db.workshopDayProgress.findMany({
      where: {
        userId: currentUserData.id,
        createdAt: { gte: startDate, lte: endDate },
        markedAsDone: true,
      },
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  
    return progress ?? []; // Ensure it always returns an array
  };
  

  export const getChapterProgressData = async () => {
    const currentUserData = await currentUser();
    if (!currentUserData?.id) return []; // Ensure it returns an empty array if the user is missing
  
    const endDate = new Date();
    const startDate = subDays(endDate, 364);
  
    const chapterProgressData = await db.chapterProgress.findMany({
      where: {
        userId: currentUserData.id,
        createdAt: { gte: startDate, lte: endDate },
        markedAsDone: true,
      },
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  
    return chapterProgressData ?? []; // Ensure it always returns an array
  };
  