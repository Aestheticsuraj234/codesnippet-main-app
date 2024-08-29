"use server";

import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export const getNotesBySubTopicId = async (subTopicId: string) => {
  const subTopicNotes = await db.subTopic.findUnique({
    where: {
      id: subTopicId,
    },
    select: {
      notes: {
        select: {
          id: true,
          note: true,
          createdAt: true,
        },
      },
    },
  });

  revalidatePath(`/tutorial`);
  return subTopicNotes;
};
