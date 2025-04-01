import React from "react";
import ProfileComponent from "./_components/profile-client";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import NotesClient from "./_components/notes-client";
import ContributionGraph from "./_components/contribution-graph";
import { subDays, startOfDay, endOfDay } from "date-fns";

const Profile = async () => {
  // Fetch current user
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
    throw new Error("User data not found");
  }

  // Normalize campusAmbassador to ensure it's always an array
  const normalizedUser = {
    ...user,
    campusAmbassador: Array.isArray(user.campusAmbassador) ? user.campusAmbassador : [],
  };

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

  // Define date range for activity (last 365 days)
  const endDate = new Date();
  const startDate = subDays(endDate, 364);

  // Fetch workshop progress data
  const workshopProgressData = await db.workshopDayProgress.findMany({
    where: {
      userId: currentUserData?.id,
      createdAt: { gte: startDate, lte: endDate },
      markedAsDone: true,
    },
    select: { createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  // Fetch chapter progress data
  const chapterProgressData = await db.chapterProgress.findMany({
    where: {
      userId: currentUserData?.id,
      createdAt: { gte: startDate, lte: endDate },
      markedAsDone: true,
    },
    select: { createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  // Prepare contribution data for the past 365 days
  const contributionData = Array.from({ length: 365 }, (_, i) => {
    const date = startOfDay(subDays(endDate, i));
    const workshopProgress = workshopProgressData.filter(
      (progress) =>
        startOfDay(progress.createdAt).getTime() === date.getTime()
    ).length;
    const chapterProgress = chapterProgressData.filter(
      (progress) =>
        startOfDay(progress.createdAt).getTime() === date.getTime()
    ).length;

    return {
      date,
      count: workshopProgress + chapterProgress,
      details: { workshopProgress, chapterProgress },
    };
  });

  return (
    <main className="flex flex-1 flex-col px-4 py-4">
      {/* @ts-ignore */}
      <ProfileComponent user={normalizedUser} />
      <NotesClient notes={notes} />
      <ContributionGraph contributions={contributionData} />
    </main>
  );
};

export default Profile;