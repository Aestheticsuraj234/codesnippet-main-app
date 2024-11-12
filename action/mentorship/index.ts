"use server";
import { currentUser } from "@/lib/auth/data/auth";
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

export const getBookingDataForCurrentUser = async () => {
  const user = await currentUser();

  const bookingData = await db.booking.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      paymentStatus: true,
      confirmationDate: true,
      meetingStatus:true,
      meeting: {
        select: {
          id: true,
          title: true,
        },
      },
      slot: {
        select: {
          id: true,
          isBooked: true,
          date: true, // Add this field to get the date of the slot
          time: true, // Add this field to get the time of the slot
        },
      },
    },
  });

  revalidatePath("/dashboard/mentorship");
  return bookingData;
};
