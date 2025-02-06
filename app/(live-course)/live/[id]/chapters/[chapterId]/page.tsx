import { getChapterWiseDataWithCourseId } from "@/action/live-course";
import React from "react";
import MainChapterTabClient from "../../_components/main-chapter-tab-client";

const ChapterIdPage = async (
  props: {
    params: Promise<{ id: string; chapterId: string }>;
  }
) => {
  const params = await props.params;
  const CourseChapterData = await getChapterWiseDataWithCourseId(
    params.id,
    params.chapterId
  );

  if (!CourseChapterData) {
    return <div>Chapter not found</div>;
  }

  const isMarkasDone =
    CourseChapterData?.chapterProgression.length > 0
      ? CourseChapterData?.chapterProgression[0].markedAsDone
      : false;

  return (
    <div className="container pt-8 pb-8 px-4 sm:px-8 dark:bg-[#141413] ">
      <MainChapterTabClient
      // @ts-ignore
        chapterData={CourseChapterData}
        isMarkasDone={isMarkasDone}
      />
    </div>
  );
};

export default ChapterIdPage;
