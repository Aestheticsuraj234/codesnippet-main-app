import { Header } from "@/components/Global/header";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";
import React from "react";
import { DsaStepCard } from "./step/_components/dsa-step-card";

const DsaSheetIdPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  const subscription = await db.subscription.findUnique({
    where: {
      userId: user?.id,
    },
    select: {
      status: true,
      plan: true,
      endDate: true,
    },
  });

  const { plan, endDate, status } = subscription || {};

  const isPremiumActiveUser =
    plan === "PREMIUM" && status === "ACTIVE" && user?.role === "PREMIUM_USER";

  if (!isPremiumActiveUser) {
    redirect("/dashboard/dsa");
  }

  const dsaSheetById = await db.dsa.findUnique({
    where: {
      id: params.id,
    },
    select: {
      dsaTitle: true,
      dsaSteps: {
        include: {
          dsaChapters: {
            include: {
              problems: {
                include: {
                  solvedBy: {
                    where: {
                      id: user?.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!dsaSheetById) {
    redirect("/dashboard/dsa");
  }

  const steps = dsaSheetById.dsaSteps.map(step => {
    const totalProblemsInStep = step.dsaChapters.flatMap(chapter => chapter.problems).length;
    const solvedProblemsInStep = step.dsaChapters.flatMap(chapter => 
      chapter.problems.filter(problem => problem?.solvedBy?.id === user.id)
    ).length;

    const stepProgress = totalProblemsInStep === 0 ? 0 : (solvedProblemsInStep / totalProblemsInStep) * 100;

    const chapters = step.dsaChapters.map(chapter => {
      const totalProblemsInChapter = chapter.problems.length;
      const solvedProblemsInChapter = chapter.problems.filter(problem => 
        problem?.solvedBy?.id === user.id
      ).length;

      const chapterProgress = totalProblemsInChapter === 0 ? 0 : (solvedProblemsInChapter / totalProblemsInChapter) * 100;

      return {
        ...chapter,
        chapterProgress,
        problemProgress: chapterProgress,
      };
    });

    return {
      ...step,
      stepProgress,
      chapterProgress: stepProgress,
      problemProgress: stepProgress,
      dsaChapters: chapters,
    };
  });

  const sheetProgress = steps.reduce((acc, step) => acc + step.stepProgress, 0) / steps.length;

  return (
    <main className="px-4 py-4 flex flex-col">
      <Header
        title={`DSA Sheet: ${dsaSheetById.dsaTitle}`}
        description={`Overall Progress: ${sheetProgress.toFixed(2)}%`}
      />

      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 mt-10 mx-10">
        {steps.map((step, index) => (
          <DsaStepCard
            key={index}
            id={step.id}
            stepNumber={index + 1}
            stepTitle={step.stepTitle}
            NumbersOfChapters={step.dsaChapters.length}
            problemNumbers={step.dsaChapters.flatMap(chapter => chapter.problems).length}
            stepProgress={step.stepProgress}
            chapterProgress={step.chapterProgress}
            problemProgress={step.problemProgress}
          />
        ))}
      </div>
    </main>
  );
};

export default DsaSheetIdPage;
