import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Hint } from "./hint";
import { Progress } from "../ui/progress";

interface StepsAccordianProps {
  children: React.ReactNode;
  title: string;
  showProgressButton?: boolean;
  totalNumberOfProblemSolvedByUser?: number;
  totalNumberOfProblem?: number;
  progressValue?: number;
  progressLabel?: string;
}

export function StepsAccordian({
  children,
  title,
  showProgressButton = false,
  totalNumberOfProblemSolvedByUser,
  totalNumberOfProblem,
  progressValue = 0,
  progressLabel = "0%"
}: StepsAccordianProps) {
  return (
    <div className="px-4 py-2 flex flex-col w-full items-center justify-center bg-white dark:bg-zinc-900 shadow-lg rounded-md border overflow-auto">
      <Hint
        label={progressLabel}
        align="start"
        side="top"
        alignOffset={8}
        sideOffset={8}
      >
        <Progress value={progressValue} />
      </Hint>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger
            showProgressButton={showProgressButton}
            totalNumberOfProblemSolvedByUser={totalNumberOfProblemSolvedByUser}
            totalNumberOfProblem={totalNumberOfProblem}
          >
            {title}
          </AccordionTrigger>
          <AccordionContent className="mt-5">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
