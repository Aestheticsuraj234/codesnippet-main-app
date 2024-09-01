import React from "react";
import { Poppins } from "next/font/google";
import { ContentLayout } from "@/components/tutorial/content-layout";
import { cn } from "@/lib/utils";
import { getSubTopicById, likeCount } from "@/action/tutorial/learn/content";
import { currentUser } from "@/lib/auth/data/auth";
import { getVideoBySubTopicId } from "@/action/tutorial/learn/video";
import { getNotesBySubTopicId } from "@/action/tutorial/learn/notes";
import MainTabClient from "./_components/MainTabClient";
import { GetDoubtsBySubTopicId, LikeCountOfDoubtByDoubtId } from "@/action/tutorial/learn/doubt";

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

const {doubts} = await GetDoubtsBySubTopicId(params.subTopicId);

console.log(JSON.stringify(doubts));


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
        doubt={doubts}
      />
      </section>
    </ContentLayout>
  );
};

export default LearnMainPage;
