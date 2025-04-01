import React from "react";
import ProfileComponent from "./_components/profile-client";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import NotesClient from "./_components/notes-client";
import ContributionGraph from "./_components/contribution-graph";
import { subDays, startOfDay } from "date-fns";
import { getChapterProgressData, getNotes, getUserDataWithAmbassador, getworkshopProgressData } from "@/action/profile";

const Profile = async () => {
  // Fetch current user
  const currentUserData = await currentUser();

  
const user = await getUserDataWithAmbassador()



  // Normalize campusAmbassador to ensure it's always an array
  const normalizedUser = user
    ? {
        ...user,
        campusAmbassador: Array.isArray(user.campusAmbassador) ? user.campusAmbassador : [],
      }
    : null;

 const notes = await getNotes()

  // Define date range for activity (last 365 days)
  const endDate = new Date();
 

  // Fetch workshop progress data
  const workshopProgressData = await getworkshopProgressData() 
  // Fetch chapter progress data
  const chapterProgressData = await getChapterProgressData()

  // Prepare contribution data for the past 365 days
  const contributionData = Array.from({ length: 365 }, (_, i) => {
    const date = startOfDay(subDays(endDate, i));
    // @ts-ignore
    const workshopProgress = workshopProgressData.filter(
      // @ts-ignore
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