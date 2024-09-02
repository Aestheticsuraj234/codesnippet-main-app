"use client";
import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, HelpCircle, Notebook, Star, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ActionMenu from "./content/action-menu";
import ContentClient from "./content/content-client";
import VideoClient from "./video/video-client";
import NotesClient from "./notes/notes-client";
import MainDoubtSection from "./doubt/main-doubt-section";



interface MainTabClientProps {
    subTopic: any;
    isMarkAsDone: boolean;
    isLiked: boolean;
    isUnliked: boolean;
    isSaved: boolean;
    count: number;
    videoTopic: {
      title: string;
      videoLink: string | null;
      videoDescription: string | null;
      createdAt: Date;
    };
    notes: {
      id:string;
      note: {
        note: string;
        id: string;
        createdAt: Date;
      }
    };
    user: any;
    doubt:{
      id:string;
      content: string;
      likes:[],
      _count:{likes:number},
      isLikedByCurrentUser:boolean,
      createdAt: Date;
      user:{
        id:string;
        name:string;
        image:string
      }

    }[];
  
}


const MainTabClient = ({
    subTopic,
    isMarkAsDone,
    isLiked,
    isUnliked,
    isSaved,
    count,
    videoTopic,
    notes,
    user,
    doubt,
}:MainTabClientProps) => {

    const [tab, setActiveTab] = useState("content");

  return (
    <Tabs defaultValue={tab} onValueChange={setActiveTab} className="w-full">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger
        value="content"
        className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121]  "
      >
        <FileText
          size={20}
          className=" group-data-[state=active]:text-yellow-500"
        />
        <span className="hidden sm:inline">Content</span>
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
        value="doubt"
        className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121] "
      >
        <HelpCircle
          size={20}
          className=" group-data-[state=active]:text-yellow-500"
        />
        <span className="hidden sm:inline">Doubt</span>
      </TabsTrigger>
      <TabsTrigger
        value="notes"
        className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121] "
      >
        <Notebook
          size={20}
          className=" group-data-[state=active]:text-yellow-500"
        />
        <span className="hidden sm:inline">Notes</span>
      </TabsTrigger>
    </TabsList>
    <TabsContent value="content" className="mt-4" forceMount={true} hidden={"content" !== tab} >
      <div className="rounded-lg border p-6 flex flex-col justify-start items-start ">
        <div className="w-full flex flex-row justify-between items-center">
          <div>
            {/* @ts-ignore */}
            <h1 className="text-2xl font-bold mb-2">{subTopic?.title}</h1>
            <Badge variant="secondary" className="text-yellow-500 ">
              <Star className="h-4 w-4 fill-current mr-1" />
              150 points
            </Badge>
          </div>
          <ActionMenu
            isMarkAsDone={isMarkAsDone}
            // @ts-ignore
            subTopicId={subTopic?.id}
            // @ts-ignore
            userId={user?.id}
            isLiked={isLiked}
            likeCount={count}
            isUnliked={isUnliked}
            isSaved={isSaved}
          />
        </div>
        <Separator className="my-4" />
        <ContentClient data={subTopic} />
      </div>
    </TabsContent>
    <TabsContent value="video" className="mt-4" forceMount={true} hidden={"video" !== tab} >
      <div className="rounded-lg border p-6 flex flex-col justify-start items-start ">
        <div className="w-full flex flex-row justify-between items-center">
          <div>
            {/* @ts-ignore */}
            <h1 className="text-2xl font-bold mb-2">{subTopic?.title}</h1>
            <Badge variant="secondary" className="text-yellow-500 ">
              <Star className="h-4 w-4 fill-current mr-1" />
              150 points
            </Badge>
          </div>
          <ActionMenu
            isMarkAsDone={isMarkAsDone}
            // @ts-ignore
            subTopicId={subTopic?.id}
            // @ts-ignore
            userId={user?.id}
            isLiked={isLiked}
            likeCount={count}
            isUnliked={isUnliked}
            isSaved={isSaved}
          />
        </div>
        <Separator className="my-4" />
        {/* @ts-ignore */}
        <VideoClient data={videoTopic} />
      </div>
    </TabsContent>
    <TabsContent value="doubt" className="mt-4" forceMount={true} hidden={"doubt" !== tab}>
      <div className=" p-6 flex flex-col justify-start items-start ">
        <MainDoubtSection 
          doubt={doubt}
          userId={user?.id}
        />
      </div>
    </TabsContent>
    <TabsContent value="notes" className="mt-4" forceMount={true} hidden={"notes" !== tab}>
      <div className="rounded-lg border p-3 flex flex-col justify-start items-start">
      {/*  @ts-ignore */}
      <NotesClient content={subTopic} video={videoTopic} notes={notes} />
      </div>
    </TabsContent>
  </Tabs>
  )
}

export default MainTabClient