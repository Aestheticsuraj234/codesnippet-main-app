"use client";
import { Hint } from "@/components/Global/hint";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressBar } from "@/components/ui/circular-progress";
import { Progress } from "@/components/ui/progress";
import { List, Notebook } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface DsaStepCardInterface {
  id: string;

  stepNumber: number;
  stepTitle: string;
  NumbersOfChapters: number;
  problemNumbers: number;
  stepProgress: number;
  chapterProgress: number;
  problemProgress: number;
}

export const DsaStepCard = ({
  id,
  stepNumber,
  stepTitle,
  NumbersOfChapters,
  problemNumbers,
  stepProgress,
  chapterProgress,
  problemProgress,
}: DsaStepCardInterface) => {
  const Params = useParams();

  return (
    <Link href={`/dashboard/dsa/${Params.id}/step/${id}`}>
      <Card className="cursor-pointer">
        <Hint
          label={`Step Progress: ${stepProgress.toFixed(2)}%`}
          align="start"
          side="top"
          alignOffset={8}
          sideOffset={8}
        >
          <Progress value={stepProgress} />
        </Hint>

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold text-zinc-600 dark:text-zinc-400 mb-3">
            Step {stepNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-y-3">
          <Hint
            label={stepTitle}
            align="start"
            side="top"
            alignOffset={10}
            sideOffset={10}
          >
            <div className="text-lg font-bold border px-4 py-2 rounded-md shadow-md hover:shadow-xl truncate">
              {stepTitle.slice(0, 20)}...
            </div>
          </Hint>
        </CardContent>
        <div className="flex justify-between w-full items-center px-2 py-2">
          <div className="flex flex-col justify-start items-center gap-3">
            <CircularProgressBar value={chapterProgress} size={40} color="#818cf8">
              <Hint
                label={`${chapterProgress.toFixed(2)}%`}
                align="center"
                side="right"
                alignOffset={8}
                sideOffset={12}
              >
                <Notebook size={20} className="text-indigo-400" />
              </Hint>
            </CircularProgressBar>

            <span className="inline-flex font-semibold text-sm">
              {NumbersOfChapters} Chapters
            </span>
          </div>
          <div className="flex flex-col justify-start items-center gap-3">
            <CircularProgressBar value={problemProgress} size={40} color="#f472b6">
              <Hint
                label={`${problemProgress.toFixed(2)}%`}
                align="center"
                side="right"
                alignOffset={8}
                sideOffset={12}
              >
                <List size={20} className="text-pink-400" />
              </Hint>
            </CircularProgressBar>

            <span className="inline-flex font-semibold text-sm">
              {problemNumbers} Problems
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
