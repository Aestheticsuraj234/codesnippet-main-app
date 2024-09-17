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

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import ActionTabMenu from "@/components/live-course/ActionTabMenu";
import SourceCodeTabClient from "@/components/courses/SourceCodeTabClient";
import VideoTabClient from "@/components/courses/VideoTabClient";
import NotesTabClient from "@/components/courses/NotesTabClient";

interface MainChapterTabClientProps {
  chapterData: {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    sourceCodeLink: string | null;
    chapterVideoLink: string | null;
    chapterNotes: string | null;
    chapterProgression: [
      {
        markedAsDone: boolean;
      }
    ]
  };
  isMarkasDone: boolean;
}

const MainChapterTabClient = ({ chapterData, isMarkasDone }: MainChapterTabClientProps) => {
  const [tab, setActiveTab] = useState("video");
  const user = useCurrentUser();

  return (
    <Tabs
      defaultValue={tab}
      onValueChange={setActiveTab}
      className="w-full dark:bg-[#27272A] bg-[#F3F4F6] border dark:border-[#3F3F46] border-[#E5E7EB] rounded-lg shadow-md"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger
          value="notes"
          className="flex items-center justify-center gap-2 data-[state=active]:text-[#08BD80] data-[state=active]:font-bold dark:data-[state=active]:border-[#3f3f46] dark:data-[state=active]:bg-[#18181B] data-[state=active]:bg-[#FFFFFF]"
        >
          <FileText size={20} className="group-data-[state=active]:text-[#08BD80]" />
          <span className="hidden sm:inline">Notes</span>
        </TabsTrigger>
        <TabsTrigger
          value="video"
          className="flex items-center justify-center gap-2 data-[state=active]:text-[#08BD80] data-[state=active]:font-bold dark:data-[state=active]:bg-[#18181B] data-[state=active]:bg-[#FFFFFF]"
        >
          <Video size={20} className="group-data-[state=active]:text-[#08BD80]" />
          <span className="hidden sm:inline ">Video</span>
        </TabsTrigger>
        <TabsTrigger
          value="sourceCode"
          className="flex items-center justify-center gap-2 data-[state=active]:text-[#08BD80] data-[state=active]:font-bold dark:data-[state=active]:bg-[#18181B] data-[state=active]:bg-[#FFFFFF]"
        >
          <FaGithub size={20} className="group-data-[state=active]:text-[#08BD80]" />
          <span className="hidden sm:inline">Source Code</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="notes"
        className="mt-4"
        forceMount={true}
        hidden={"notes" !== tab}
      >
        <div className="border dark:border-[#3F3F46] border-[#E5E7EB] p-6 flex flex-col justify-start items-start">
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              {/* @ts-ignore */}
              <h1 className="text-2xl font-bold mb-2">{chapterData.title}</h1>
            </div>
            <ActionTabMenu
              isMarkAsDone={isMarkasDone}
              userId={user?.id!}
              chapterId={chapterData.id}
            />
          </div>
          <Separator className="my-4" />
          <NotesTabClient notes={chapterData?.chapterNotes} />
        </div>
      </TabsContent>

      <TabsContent
        value="video"
        className="mt-4"
        forceMount={true}
        hidden={"video" !== tab}
      >
        <div className="rounded-lg border dark:border-[#3F3F46] border-[#E5E7EB] p-6 flex flex-col justify-start items-start">
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              {/* @ts-ignore */}
              <h1 className="text-2xl font-bold mb-2">{chapterData.title}</h1>
            </div>
            <ActionTabMenu
              isMarkAsDone={isMarkasDone}
              userId={user?.id!}
              chapterId={chapterData.id}
            />
          </div>
          <Separator className="my-4" />
          <VideoTabClient videoLink={chapterData?.chapterVideoLink} />
        </div>
      </TabsContent>

      <TabsContent
        value="sourceCode"
        className="mt-4"
        forceMount={true}
        hidden={"sourceCode" !== tab}
      >
        <div className="rounded-lg border dark:border-[#3F3F46] border-[#E5E7EB] p-6 flex flex-col justify-start items-start">
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">{chapterData.title}</h1>
            </div>
            <ActionTabMenu
              isMarkAsDone={isMarkasDone}
              userId={user?.id!}
              chapterId={chapterData.id}
            />
          </div>
          <Separator className="my-4" />
          <SourceCodeTabClient sourceCodeUrl={chapterData?.sourceCodeLink} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MainChapterTabClient;
