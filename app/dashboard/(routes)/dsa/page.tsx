import {
  getDSAContentStatistics,
  getDsaSheets,
  getRecentDSAActivity,
} from "@/action/content/dsa";
import { Header } from "@/components/Global/header";
import React from "react";
import { DsaStaticticsCard } from "./_components/dsa-statictics-card";
import {
  ActivityIcon,
  BoxIcon,
  Calendar,
  Footprints,
  GitPullRequest,
  Notebook,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { EmptyStateComponent } from "@/components/Global/empty-state";
import { DsaSheetGrid } from "./_components/dsa-sheet-grid";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";

const DsaMainPage = async () => {
  const user = await currentUser();

  const subscription = await db.subscription.findUnique({
    where:{
      userId:user?.id
    },
    select:{
      status:true,
      plan:true,
      endDate:true
    }
  })

  
const {plan , endDate , status} = subscription || {};

const isPremiumActiveUser = plan === "PREMIUM" && status === "ACTIVE" && user?.role === "PREMIUM_USER";


  const { totalChapters, totalDSASheets, totalProblems, totalSteps } =
    await getDSAContentStatistics();
  const recentActivity = await getRecentDSAActivity();

  const dsaSheet = await getDsaSheets();
  return (
    <main className="px-4 py-4 flex flex-col ">
      <Header
        title="DSA Sheets"
        description="Learn Data Structure and Algorithm"
      />

      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 mt-10 mx-10">
        <DsaStaticticsCard
          Title="Total DSA Sheets"
          TotalLength={totalDSASheets}
          Icon={BoxIcon}
          backgroundColor="#81edf0"
        />
        <DsaStaticticsCard
          Title="Total Steps"
          TotalLength={totalSteps}
          Icon={Footprints}
          backgroundColor="#7bedb6"
        />
        <DsaStaticticsCard
          Title="Total Chapters"
          TotalLength={totalChapters}
          Icon={Notebook}
          backgroundColor="#f7a881"
        />
        <DsaStaticticsCard
          Title="Total Problems"
          TotalLength={totalProblems}
          Icon={GitPullRequest}
          backgroundColor="#f27eb2"
        />
      </div>

      <div className="mt-10 mx-10">
        <h2 className="text-2xl font-semibold mb-4 flex justify-start items-center">
          <ActivityIcon
            size={40}
            className="mr-2 border rounded-full px-2 py-2"
          />
          Recent Activity
        </h2>
        {recentActivity.length === 0 && (
          <EmptyStateComponent
            title="No Recent Activity"
            description="There is no recent activity to show."
            imageUrl="/empty-activity.svg"
          />
        )}
        <ul className="space-y-2">
          {recentActivity.map((activity, index) => (
            <li
              key={index}
              className="flex justify-between items-center border shadow p-4 rounded"
            >
              <span className="text-sm font-semibold truncate text-zinc-700 dark:text-zinc-100">
                {activity.dsaTitle.toLocaleUpperCase()}
              </span>
              <div className="flex justify-center items-center gap-2">
                <Calendar size={20} className="mr-2" />
                <Badge variant={"outline"} className="px-2 py-2">
                  {formatDateTime(new Date(activity.updatedAt))}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 mx-10">
        <h2 className="text-2xl font-semibold mb-4">DSA Sheets</h2>
        <div
          className="grid gap-5 md:grid-cols-1
         lg:grid-cols-2 mt-10 mx-10"
        >
          {dsaSheet.map((dsaSheet) => (
            <DsaSheetGrid
              chaptersCount={dsaSheet.chaptersCount}
              updatedAt={dsaSheet.updatedAt}
              isPremiumActiveUser={isPremiumActiveUser}
              id={dsaSheet.id}
              problemsCount={dsaSheet.problemsCount}
              stepsCount={dsaSheet.stepsCount}
              title={dsaSheet.title}
              key={dsaSheet.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default DsaMainPage;
