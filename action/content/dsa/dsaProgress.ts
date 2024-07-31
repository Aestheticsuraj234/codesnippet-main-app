"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";

export const DsaSheetById = async (sheetId: string) => {
  return await db.dsa.findUnique({
    where: { id: sheetId },
    select: {
      dsaTitle: true,
      dsaSteps: {
        include: {
          dsaChapters: {
            include: {
              problems: {
                include: {
                  solvedBy: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const AllProgress = async (sheetId: string) => {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
    // return null;
  }

  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
    select: {
      status: true,
      plan: true,
      endDate: true,
    },
  });

  const { plan, status } = subscription || {};
  const isPremiumActiveUser =
    plan === "PREMIUM" && status === "ACTIVE" && user.role === "PREMIUM_USER";

  if (!isPremiumActiveUser) {
    redirect("/dashboard/dsa");
    return null;
  }

  const dsaSheet = await DsaSheetById(sheetId);

  if (!dsaSheet) {
    redirect("/dashboard/dsa");
    return null;
  }

  // Calculate problem progress
  const problems = dsaSheet.dsaSteps.flatMap((step) => step.dsaChapters).flatMap((chapter) => chapter.problems);
  const totalProblems = problems.length;
  const solvedProblems = problems.filter((problem) => problem.solvedBy.some((solver) => solver.userId === user.id)).length;
  const problemProgress = totalProblems === 0 ? 0 : (solvedProblems / totalProblems) * 100;

  // Calculate step progress
  const stepsProgress = dsaSheet.dsaSteps.map((step) => {
    const totalProblemsInStep = step.dsaChapters.flatMap((chapter) => chapter.problems).length;
    const solvedProblemsInStep = step.dsaChapters.flatMap((chapter) =>
      chapter.problems.filter((problem) => problem.solvedBy.some((solver) => solver.userId === user.id))
    ).length;

    return totalProblemsInStep === 0 ? 0 : (solvedProblemsInStep / totalProblemsInStep) * 100;
  });

  // Calculate chapter progress
  const chaptersProgress = dsaSheet.dsaSteps.flatMap((step) => step.dsaChapters).map((chapter) => {
    const totalProblemsInChapter = chapter.problems.length;
    const solvedProblemsInChapter = chapter.problems.filter((problem) =>
      problem.solvedBy.some((solver) => solver.userId === user.id)
    ).length;

    return totalProblemsInChapter === 0 ? 0 : (solvedProblemsInChapter / totalProblemsInChapter) * 100;
  });

  // Calculate average progress
  const sheetProgress = totalProblems === 0 ? 0 : (solvedProblems / totalProblems) * 100;
  const chapterProgress = chaptersProgress.length === 0
    ? 0
    : chaptersProgress.reduce((acc, progress) => acc + progress, 0) / chaptersProgress.length;

  const stepProgress = stepsProgress.length === 0
    ? 0
    : stepsProgress.reduce((acc, progress) => acc + progress, 0) / stepsProgress.length;

  return {
    sheetProgress,
    chapterProgress,
    stepProgress,
    problemProgress,
  };
};
