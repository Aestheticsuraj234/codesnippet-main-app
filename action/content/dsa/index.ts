"use server";

import { db } from "@/lib/db/db";
import { ContentStatus, ContentType } from "@prisma/client";

// Get statistics for DSA content
export const getDSAContentStatistics = async () => {
  const content = await db.content.findFirst({
    where: { type: ContentType.DSA },
  });

  if (!content) {
    return {
      totalDSASheets: 0,
      totalSteps: 0,
      totalChapters: 0,
      totalProblems: 0,
    };
  }

  const totalDSASheets = await db.dsa.count({
    where: { contentId: content.id, status: ContentStatus.PUBLISHED },
  });

  const totalSteps = await db.dsaStep.count({
    where: { dsa: { contentId: content.id, status: ContentStatus.PUBLISHED } },
  });

  const totalChapters = await db.dsaChapter.count({
    where: { dsaStep: { dsa: { contentId: content.id, status: ContentStatus.PUBLISHED } } },
  });

  const totalProblems = await db.problem.count({
    where: { dsaChapter: { dsaStep: { dsa: { contentId: content.id, status: ContentStatus.PUBLISHED } } } },
  });

  return {
    totalDSASheets,
    totalSteps,
    totalChapters,
    totalProblems,
  };
};

// Get recent DSA activity
export const getRecentDSAActivity = async () => {
  const recentActivity = await db.dsa.findMany({
    where: {
      content: { type: ContentType.DSA },
      status: ContentStatus.PUBLISHED,
    },
    orderBy: { updatedAt: "desc" },
    take: 10,
    select: { dsaTitle: true, updatedAt: true },
  });

  return recentActivity;
};

// Get DSA sheets with counts for steps, chapters, and problems
export const getDsaSheets = async () => {
  try {
    const dsaSheets = await db.dsa.findMany({
      where: { content: { type: ContentType.DSA }, status: ContentStatus.PUBLISHED },
      select: {
        id: true,
        dsaTitle: true,
        updatedAt: true,
        status: true,
        dsaSteps: {
          select: {
            _count: { select: { dsaChapters: true } },
            dsaChapters: {
              select: { _count: { select: { problems: true } } },
            },
          },
        },
      },
    });

    const transformedDsaSheets = dsaSheets.map((sheet) => {
      const stepsCount = sheet.dsaSteps.length;
      const chaptersCount = sheet.dsaSteps.reduce(
        (totalChapters, step) => totalChapters + step._count.dsaChapters,
        0
      );
      const problemsCount = sheet.dsaSteps.reduce(
        (totalProblems, step) =>
          totalProblems +
          step.dsaChapters.reduce(
            (chapterProblems, chapter) => chapterProblems + chapter._count.problems,
            0
          ),
        0
      );

      return {
        id: sheet.id,
        title: sheet.dsaTitle,
        stepsCount,
        chaptersCount,
        problemsCount,
        updatedAt: sheet.updatedAt,
        status: sheet.status,
      };
    });

    return transformedDsaSheets;
  } catch (error) {
    console.error("Error fetching DSA sheets:", error);
    throw new Error("Could not fetch DSA sheets");
  }
};

// Toggle solver for a problem
export const toggleSolver = async (Probid: string, userId: string | undefined, isChecked: boolean) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    if (isChecked) {
      await db.problemSolved.create({
        data: {
          userId,
          problemId: Probid,
        },
      });
    } else {
      await db.problemSolved.delete({
        where: {
          userId_problemId: {
            userId,
            problemId: Probid,
          },
        },
      });
    }

    
    return { success: true, isSolved: isChecked };
  } catch (error) {
    console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update problem" };
  }
};

// Toggle marked status for a problem
export const toggleMarked = async (Probid: string, userId: string | undefined, isChecked: boolean) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    if (isChecked) {
      await db.problemMarked.create({
        data: {
          userId,
          problemId: Probid,
        },
      });
    } else {
      await db.problemMarked.delete({
        where: {
          userId_problemId: {
            userId,
            problemId: Probid,
          },
        },
      });
    }

    
    return { success: true, isMarked: isChecked };
  } catch (error) {
    console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update problem" };
  }
};
