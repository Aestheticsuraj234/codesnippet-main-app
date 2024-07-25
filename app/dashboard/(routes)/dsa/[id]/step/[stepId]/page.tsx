import { Header } from "@/components/Global/header";
import { Hint } from "@/components/Global/hint";
import { StepsAccordian } from "@/components/Global/steps-accordian";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { ArrowLeftIcon, ShuffleIcon } from "lucide-react";
import React from "react";
import { DsaProblemClient } from "./_components/client";
import Link from "next/link";

const StepPageId = async ({ params }: { params: { stepId: string; id: string } }) => {
  const user = await currentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const sheet = await db.dsa.findUnique({
    where: {
      id: params.id,
    },
  });

  const step = await db.dsaStep.findUnique({
    where: {
      id: params.stepId,
    },
    select: {
      stepTitle: true,
      dsaChapters: {
        select: {
          id: true,
          chapterTitle: true,
          chapterNumber: true,
          problems: {
            select: {
              id: true,
              problemTitle: true,
              difficultyLevel: true,
              problemLink: true,
              articleLink: true,
              youtubeLink: true,
              markedBy: {
                select: {
                  id: true,
                },
              },
              solvedBy: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!sheet || !step) {
    return <div>Sheet or Step Not Found</div>;
  }

  const totalProblems = step.dsaChapters.flatMap(chapter => chapter.problems).length;

  const problemsSolvedByCurrentUser = step.dsaChapters
    .flatMap(chapter => chapter.problems)
    .filter(problem => problem.solvedBy && problem.solvedBy.id === user.id).length;


  const progressPercentage = totalProblems > 0 ? (problemsSolvedByCurrentUser / totalProblems) * 100 : 0;

  const dsaStepProblemData = step.dsaChapters.flatMap(chapter =>
    chapter.problems.map(problem => ({
      id: problem.id,
      problemTitle: problem.problemTitle,
      difficultyLevel: problem.difficultyLevel,
      problemLink: problem.problemLink,
      articleLink: problem.articleLink,
      youtubeLink: problem.youtubeLink,
      markedForRevision:  problem.markedBy?.id === user.id,
      isSolved: problem.solvedBy?.id === user.id,
    }))
  );

  return (
    <main className="px-10 flex flex-col items-start justify-start w-full h-screen overflow-auto py-10">

<Link href={`/dashboard/dsa/${params.id}`} className="mb-5">
<Button  variant={"outline"}  size={"icon"}>
    <ArrowLeftIcon size={24} className="text-yellow-500" />
</Button>
</Link>

      <Header
        title={sheet?.dsaTitle}
        description={`Get all the problems of ${sheet?.dsaTitle} in one place`}
      />

      <section className="mt-6 flex flex-col items-start justify-start w-full gap-y-7">
        <div className="flex w-full justify-between items-center">
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
          <h1 className="text-2xl font-extrabold text-zinc-700 leading-3 dark:text-zinc-300 ">
            {step.stepTitle}
          </h1>
          {step.dsaChapters.map(chapter => {
            const chapterProblems = chapter.problems;
            const totalProblemsInChapter = chapterProblems.length;
            const problemsSolvedByUserInChapter = chapterProblems.filter(problem =>
              problem.solvedBy?.id === user.id
            ).length;
            const chapterProgress = totalProblemsInChapter > 0
              ? (problemsSolvedByUserInChapter / totalProblemsInChapter) * 100
              : 0;

            return (
              <StepsAccordian
                key={chapter.id}
                title={`Ch-${chapter.chapterNumber}: ${chapter.chapterTitle}`}
                progressLabel={`${chapterProgress.toFixed(2)}%`}
                progressValue={chapterProgress}
                showProgressButton
                totalNumberOfProblem={totalProblemsInChapter}
                totalNumberOfProblemSolvedByUser={problemsSolvedByUserInChapter}
              >
                {chapter.problems.map(problem => (
                  <div key={problem.id} className="flex-col">
                    <div className="flex-1 space-y-4 p-2 pt-4">
                      <DsaProblemClient data={dsaStepProblemData} />
                    </div>
                  </div>
                ))}
              </StepsAccordian>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default StepPageId;
