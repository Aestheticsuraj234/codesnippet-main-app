import React from "react";
import LeaderboardClient from "./_components/leaderboard-client";
import { Header } from "@/components/Global/header";
import { getLeaderboardData } from "@/action/leaderboard";

const Leaderboard = async () => {
  const { liveCourses, tutorial, workshops } = await getLeaderboardData();

  console.log(liveCourses, tutorial, workshops);

  return (
    <main className="px-4 py-4 flex flex-col flex-1">
      <Header
        title="Leaderboard"
        description="See how you stack up against other learners on the platform."
      />
      <LeaderboardClient
        liveCourses={liveCourses}
        tutorial={tutorial}
        workshops={workshops}
      />
    </main>
  );
};

export default Leaderboard;
