import React from "react";
import { Poppins } from "next/font/google";
import { ContentLayout } from "@/components/tutorial/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, HelpCircle, Notebook, Star, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import ContentClient from "./_components/content/content-client";
import { getSubTopicById, likeCount } from "@/action/tutorial/learn/content";
import ActionMenu from "./_components/content/action-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/auth/data/auth";
import VideoClient from "./_components/video/video-client";
import { getVideoBySubTopicId } from "@/action/tutorial/learn/video";
import { getNotesBySubTopicId } from "@/action/tutorial/learn/notes";
import NotesClient from "./_components/notes/notes-client";
import MainTabClient from "./_components/MainTabClient";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LearnMainPage = async ({
  params,
}: {
  params: { technologyId: string; subTopicId: string };
}) => {
  const user = await currentUser();

  const subTopic = await getSubTopicById(params.subTopicId);
  //@ts-ignore
  const isMarkAsDone = !!subTopic?.markAsDone.length;
  //@ts-ignore
  const isLiked = !!subTopic?.likedBy.length;
  //@ts-ignore
  const isUnliked = !!subTopic?.unlikeBy.length;
  // @ts-ignore
  const isSaved = !!subTopic?.savedBy.length;

  const count = await likeCount(params.subTopicId);

const videoTopic = await getVideoBySubTopicId(params.subTopicId);

const notes = await getNotesBySubTopicId(params.subTopicId);

  return (
    <ContentLayout>
      <section className={cn("w-auto", poppins.className)}>
      <MainTabClient
        subTopic={subTopic}
        isMarkAsDone={isMarkAsDone}
        isLiked={isLiked}
        isUnliked={isUnliked}
        isSaved={isSaved}
        count={count}
        videoTopic={videoTopic}
        notes={notes}
        user={user}
      />
      </section>
    </ContentLayout>
  );
};

export default LearnMainPage;
