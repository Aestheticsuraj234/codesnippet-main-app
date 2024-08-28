import { Header } from '@/components/Global/header';
import React from 'react';
import SystemDesignStatistic from './_components/SystemDesignStatistic';
import { Brain, NotebookPen, ShuffleIcon } from 'lucide-react';
import { db } from '@/lib/db/db';
import { Hint } from '@/components/Global/hint';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/auth/data/auth';
import { StepsAccordian } from '@/components/Global/steps-accordian';
import { SystemDesignProblemClient } from './_components/client';

const SystemDesignPage = async () => {
  const [totalChapters, totalProblems] = await Promise.all([
    db.systemDesignChapter.count(),
    db.systemDesignProblem.count(),
  ]);

  const user = await currentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const problemsSolvedByCurrentUser = await db.systemDesignSolved.count({
    where: {
      userId: user.id,
    },
  });

  const progressPercentage = totalProblems > 0 ? (problemsSolvedByCurrentUser / totalProblems) * 100 : 0;

  const systemDesignChapters = await db.systemDesignChapter.findMany({
    include: {
      problems: {
        include: {
          markedBy: true,
          solvedBy: true,
        },
      },
    },
  });

  // Flatten and format the data into a single array
  const formattedData = systemDesignChapters.flatMap((chapter) =>
    chapter.problems.map((problem) => ({
      id: problem.id,
      problemTitle: problem.problemTitle,
      articleLink: problem.articleLink,
      youtubeLink: problem.youtubeLink,
      markedForRevision: problem?.markedBy?.length > 0,
      isSolved: problem?.solvedBy?.length > 0,
      chapterTitle: `Ch-${chapter.chapterNumber}: ${chapter.title}`, // Added chapter title for better context
      chapterNumber: chapter.chapterNumber,
      totalProblemsInChapter: chapter.problems.length,
    }))
  );

  return (
    <main className="px-4 py-4 flex flex-col">
      <Header title="System Design" description="Learn how to design large scale systems" />
      <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2 mt-10 mx-10">
        <SystemDesignStatistic
          Title="Total Chapters"
          TotalLength={totalChapters}
          Icon={NotebookPen}
          backgroundColor="#FFD700"
        />
        <SystemDesignStatistic
          Title="Total Problems"
          TotalLength={totalProblems}
          Icon={Brain}
          backgroundColor="#f22e76"
        />
      </div>

      <section className="container mt-10 flex flex-col items-start justify-start w-full gap-y-7">
        <div className="flex w-full justify-between items-center mt-10">
          <div className="flex flex-col items-start justify-center px-3 py-1.5 border rounded-lg">
            <div className="flex justify-between items-center w-full gap-10">
              <h1 className="text-md font-extrabold text-zinc-700 dark:text-zinc-200 flex flex-row justify-center items-center">
                Your Progress:
                <span className="text-md font-normal text-zinc-500 dark:text-zinc-400 ml-2">
                  {problemsSolvedByCurrentUser} / {totalProblems}
                </span>
              </h1>
              <h1 className="text-xl font-bold text-yellow-500">
                {progressPercentage.toFixed(2)}%
              </h1>
            </div>
            <div className="w-full h-2 bg-zinc-200 rounded-lg mt-2">
              <div
                className="h-2 bg-yellow-500 rounded-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Hint
              label="Choose a random problem to solve"
              side="left"
              align="center"
              alignOffset={10}
              sideOffset={10}
            >
              <Button variant={"outline"} size={"icon"}>
                <ShuffleIcon size={24} className="text-yellow-500" />
              </Button>
            </Hint>
            <Button variant={"brand"} size={"default"} className="font-bold">
              Show Revision
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-y-5 mt-6 w-full border rounded-lg px-4 py-4 shadow-md">
          {systemDesignChapters.map((chapter) => {
            const totalNumberOfProblemsInChapter = chapter.problems.length;
            const totalProblemsSolvedByUserInChapter = chapter.problems.filter(
              (problem) => problem.solvedBy?.some((solver) => solver.userId === user.id)
            ).length;

            const chapterProgress = totalNumberOfProblemsInChapter > 0
              ? (totalProblemsSolvedByUserInChapter / totalNumberOfProblemsInChapter) * 100
              : 0;

            // Filter problems related to the current chapter
            const chapterProblems = formattedData.filter(
              (problem) => problem.chapterNumber === chapter.chapterNumber
            );

            return (
              <StepsAccordian
                key={chapter.id}
                title={`Ch-${chapter.chapterNumber}: ${chapter.title}`}
                showProgressButton
                totalNumberOfProblem={totalNumberOfProblemsInChapter}
                progressLabel={`${chapterProgress.toFixed(2)}%`}
                progressValue={chapterProgress}
                totalNumberOfProblemSolvedByUser={totalProblemsSolvedByUserInChapter}
              >
                {/* Pass the filtered data for this chapter directly to the client component */}
                <SystemDesignProblemClient data={chapterProblems} />
              </StepsAccordian>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default SystemDesignPage;
