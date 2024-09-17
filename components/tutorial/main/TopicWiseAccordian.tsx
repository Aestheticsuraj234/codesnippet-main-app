"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Hint } from "@/components/Global/hint";
import { useModal } from "@/zustand/use-modal";

interface TopicWiseAccordionProps {
  children: React.ReactNode;
  title: string;
  topicId: string;
  dayAssigned: number;
  startDate: Date;
  endDate: Date;
}

export default function TopicWiseAccordion({
  children,
  title,
  topicId,
  dayAssigned,
  startDate,
  endDate,
}: TopicWiseAccordionProps) {
  // Function to format dates into "date-Month" format
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day}-${month}`;
  };

  const { onOpen } = useModal();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen("ADD_DAY", {topicId});
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen("REMOVE_DAY", {topicId});
  };

  return (
    <div className="px-4 py-2 flex flex-col w-full items-center justify-center bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB]  shadow-lg rounded-md  overflow-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex flex-1 w-full justify-between items-center px-2">
              <h2 className="text-lg font-semibold">{title}</h2>
              <div className="flex justify-center items-center gap-4">
                <p className="dark:text-zinc-500 text-gray-600 text-sm">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </p>
                <div className="flex justify-center items-center gap-2">
                  <Hint
                    label="Remove Days"
                    align="center"
                    side="top"
                    alignOffset={20}
                    sideOffset={20}
                  >
                    <Button variant={"outline"} size={"icon"} onClick={handleRemove}>
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                  </Hint>

                  <Hint
                    label="Add Days"
                    align="center"
                    side="top"
                    alignOffset={20}
                    sideOffset={20}
                  >
                    <Button variant={"outline"} size={"icon"} onClick={handleAdd}>
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-5 ">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
