"use server";

import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export const getNotesBySubTopicId = async (subTopicId: string) => {
  const subTopicNotes = await db.subTopic.findUnique({
    where: {
      id: subTopicId,
    },
    select: {
      id: true,
      notes: {
        select: {
          id: true,
          note: true,
          createdAt: true,
        },
      },
    },
  });

  const formattedNotes = {
    id: subTopicNotes?.id,
    notes: subTopicNotes?.notes.map((note) => ({
      id: note.id,
      note: JSON.parse(note.note),
      createdAt: note.createdAt,
    })),
  };

  revalidatePath(`/tutorial`);
  return formattedNotes;
};




export const CreateNotes = async (subTopicId: string, note: string) => {
const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  
  const notes = await db.note.create({
    // @ts-ignore
    data: {
      note,
      subTopicId,
      userId: user.id,
    },
  })
  
  revalidatePath(`/tutorial`);

  return notes;
}


export const updateNotes = async (noteId: string, note: string) => {

  const existingNote = await db.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      id: true,
      note: true,
      createdAt: true,
      subTopicId: true,
    },
    

  });

  if (!existingNote) {
    throw new Error("Note not found")
  }

  const notes = await db.note.update({
    where: {
      id: noteId,
    },
    data: {
      note,
    },
  });

  revalidatePath(`/tutorial`);
  return notes;
}