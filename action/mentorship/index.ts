"use server";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export const getAllMentorshipSession = async () => {
  const mentorshipSessions = await db.meeting.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      discountedPrice: true,
      availableSlots: true, // Available slots fetched but not used for now
    },
  });

  revalidatePath("/dashboard/mentorship");

  return mentorshipSessions;
};
