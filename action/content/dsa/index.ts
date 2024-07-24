"use server";

import { format } from "date-fns"; 
import { db } from "@/lib/db/db";
import { ContentStatus, ContentType, DifficultyLevel } from "@prisma/client";

export const getDSAContentStatistics = async () => {
  // Find the content with type DSA
  const content = await db.content.findFirst({
    where: {
      type: ContentType.DSA,
    },
  });

  if (!content) {
    return {
      totalDSASheets: 0,
      totalSteps: 0,
      totalChapters: 0,
      totalProblems: 0,
    };
  }

  // Count the total number of DSA sheets
  const totalDSASheets = await db.dsa.count({
    where: {
      contentId: content.id,
      AND:{
        status:ContentStatus.PUBLISHED
      }
    },
  });

  // Count the total number of DSA steps
  const totalSteps = await db.dsaStep.count({
    where: {
      dsa: {
        contentId: content.id,
        status:ContentStatus.PUBLISHED
      },
    },
  });

  // Count the total number of DSA chapters
  const totalChapters = await db.dsaChapter.count({
    where: {
      dsaStep: {
        dsa: {
          contentId: content.id,
          status:ContentStatus.PUBLISHED
        },
      },
    },
  });

  // Count the total number of problems
  const totalProblems = await db.problem.count({
    where: {
      dsaChapter: {
        dsaStep: {
          dsa: {
            contentId: content.id,
            status:ContentStatus.PUBLISHED
          },
        },
      },
    },
  });


  return {
    totalDSASheets,
    totalSteps,
    totalChapters,
    totalProblems,
  };
};



export const getRecentDSAActivity = async () => {
    const recentActivity = await db.dsa.findMany({
      where: {
        content: {
          type: ContentType.DSA,
        },
        AND:{
            status:ContentStatus.PUBLISHED
        }
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 10, // Fetch the 10 most recent activities
      select: {
        dsaTitle: true,
        updatedAt: true,
      },
    });
  
    return recentActivity;
  };


  


  export const getDsaSheets = async () => {
    try {
      // Fetch DSA sheets with counts for steps, chapters, and problems
      const dsaSheets = await db.dsa.findMany({
        where: {
          content: {
            type: ContentType.DSA,
          },
            AND:{
                status:ContentStatus.PUBLISHED
            }
        },
        select: {
          id: true,
          dsaTitle: true,
          updatedAt: true,
          status:true,
          dsaSteps: {
            select: {
              _count: {
                select: {
                  dsaChapters: true,
                },
              },
              dsaChapters: {
                select: {
                  _count: {
                    select: {
                      problems: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
  
      // Transform data to get the required counts
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
          status:sheet.status
        };
      });
  
      return transformedDsaSheets;
    } catch (error) {
      console.error("Error fetching DSA sheets: ", error);
      throw new Error("Could not fetch DSA sheets");
    }
  };
