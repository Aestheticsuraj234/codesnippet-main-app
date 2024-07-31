import { Header } from "@/components/Global/header";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";
import React from "react";
import { DsaStepCard } from "./step/_components/dsa-step-card";
import { DsaSheetById, AllProgress } from "@/action/content/dsa/dsaProgress";

const DsaSheetIdPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
    return null;
  }

  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
    select: { status: true, plan: true, endDate: true },
  });

  const { plan, status } = subscription || {};

  const isPremiumActiveUser =
    plan === "PREMIUM" && status === "ACTIVE" && user.role === "PREMIUM_USER";

  if (!isPremiumActiveUser) {
    redirect("/dashboard/dsa");
    return null;
  }

  const dsaSheetById = await DsaSheetById(params.id);

  if (!dsaSheetById) {
    redirect("/dashboard/dsa");
    return null;
  }

  // @ts-ignore
  const { sheetProgress, chapterProgress, stepProgress, problemProgress } =
    await AllProgress(params.id);

  return (
    <main className="px-4 py-4 flex flex-col">
      <Header
        title={`DSA Sheet: ${dsaSheetById.dsaTitle}`}
        description={`Overall Progress: ${sheetProgress.toFixed(2)}%`}
      />

      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 mt-10 mx-10">
        {dsaSheetById.dsaSteps.map((step, index) => {
          const totalProblemsInStep = step.dsaChapters.flatMap(
            (chapter) => chapter.problems
          ).length;

          return (
            <DsaStepCard
              key={step.id}
              id={step.id}
              stepNumber={index + 1}
              stepTitle={step.stepTitle}
              NumbersOfChapters={step.dsaChapters.length}
              problemNumbers={totalProblemsInStep}
              stepProgress={stepProgress}
              chapterProgress={chapterProgress}
              problemProgress={problemProgress} // Use stepProgress or problemProgress as needed
            />
          );
        })}
      </div>
    </main>
  );
};

export default DsaSheetIdPage;
