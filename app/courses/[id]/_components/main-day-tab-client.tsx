"use client";

import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  TentTree,
  Video,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import VideoTabClient from "@/components/courses/VideoTabClient";
import SourceCodeTabClient from "@/components/courses/SourceCodeTabClient";
import NotesTabClient from "@/components/courses/NotesTabClient";
import ActionTabMenu from "@/components/courses/ActionTabMenu";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

interface MainDayTabClientProps {
  dayData: {
    id: string;
    dayNumber: number;
    title: string;
    createdAt: Date;
    sourceCodeLink: string | null;
    videoLink: string | null;
    notes: string | null;
    userProgress: [
      {
        markedAsDone: boolean;
      }
    ]
  };
  isMarkasDone: boolean;
}

const MainDayTabClient = ({ dayData  , isMarkasDone}: MainDayTabClientProps) => {
  const [tab, setActiveTab] = useState("video");
  const user = useCurrentUser();
  return (
    <Tabs defaultValue={tab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger
          value="notes"
          className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121]  "
        >
          <FileText
            size={20}
            className=" group-data-[state=active]:text-yellow-500"
          />
          <span className="hidden sm:inline">Notes</span>
        </TabsTrigger>
        <TabsTrigger
          value="video"
          className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121] "
        >
          <Video
            size={20}
            className=" group-data-[state=active]:text-yellow-500"
          />
          <span className="hidden sm:inline ">Video</span>
        </TabsTrigger>
        <TabsTrigger
          value="sourceCode"
          className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121] "
        >
          <FaGithub
            size={20}
            className=" group-data-[state=active]:text-yellow-500"
          />
          <span className="hidden sm:inline">Source Code</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="notes"
        className="mt-4"
        forceMount={true}
        hidden={"notes" !== tab}
      >
        <div className="rounded-lg border p-6 flex flex-col justify-start items-start ">
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              {/* @ts-ignore */}
              <h1 className="text-2xl font-bold mb-2">{dayData.title}</h1>
              <Badge variant="secondary" className="text-yellow-500 ">
                <TentTree className="h-4 w-4 fill-current mr-1" />
                <span className="text-xs ">Day-</span>
                {dayData.dayNumber}
              </Badge>
            </div>
            <ActionTabMenu 
              isMarkAsDone={isMarkasDone
              }
              userId={user?.id!}
              dayId={dayData.id}
            />
          </div>
          <Separator className="my-4" />
          <NotesTabClient notes={dayData?.notes} />
        </div>
      </TabsContent>

      <TabsContent
        value="video"
        className="mt-4"
        forceMount={true}
        hidden={"video" !== tab}
      >
        <div className="rounded-lg border p-6 flex flex-col justify-start items-start ">
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              {/* @ts-ignore */}
              <h1 className="text-2xl font-bold mb-2">{dayData.title}</h1>
              <Badge variant="secondary" className="text-yellow-500 ">
                <TentTree className="h-4 w-4 fill-current mr-1" />
                <span className="text-xs ">Day-</span>
                {dayData.dayNumber}
              </Badge>
            </div>
            <ActionTabMenu 
              isMarkAsDone={isMarkasDone}
              userId={user?.id!}
              dayId={dayData.id}
            />
          </div>
          <Separator className="my-4" />
          <VideoTabClient videoLink={dayData?.videoLink} />
        </div>
      </TabsContent>

      <TabsContent
        value="sourceCode"
        className="mt-4"
        forceMount={true}
        hidden={"sourceCode" !== tab}
      >
        <div className="rounded-lg border p-6 flex flex-col justify-start items-start ">
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">{dayData.title}</h1>
              <Badge variant="secondary" className="text-yellow-500 ">
                <TentTree className="h-4 w-4 fill-current mr-1" />
                <span className="text-xs ">Day-</span>
                {dayData.dayNumber}
              </Badge>
            </div>
            <ActionTabMenu 
              isMarkAsDone={isMarkasDone}
              userId={user?.id!}
              dayId={dayData.id}
            />
          </div>
          <Separator className="my-4" />

          <SourceCodeTabClient sourceCodeUrl={dayData?.sourceCodeLink} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MainDayTabClient;
