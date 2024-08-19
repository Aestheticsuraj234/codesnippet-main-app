"use server";

import { format } from "date-fns"; 
import { db } from "@/lib/db/db";
import { ContentStatus, ContentType, DifficultyLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const toggleSolver = async (Probid: string, userId: string | undefined, isChecked: boolean) => {
   
   if(!userId){
    throw new Error("User Id is Required");
   }

   try {

    if(isChecked){
      await db.systemDesignSolved.create({
        data: {
          userId,
          problemId: Probid,
        },
      });
    }
    else{
      await db.systemDesignSolved.delete({
        where: {
          userId_problemId: {
            userId,
            problemId: Probid,
          },
        },
      });

    }

    revalidatePath(`/system-design` , "page");

    return { success: true, isSolved: isChecked };



   } catch (error) {
      console.error("Error updating problem:", error);
      return { success: false, error: "Failed to update problem" };
   }
  
};



export const toggleMarked = async (Probid: string, userId: string | undefined, isChecked: boolean) => {

  if(!userId){
    throw new Error("User Id is Required");
  }

  try {

    if(isChecked){
      await db.systemDesignMarked.create({
        data: {
          userId,
          problemId: Probid,
        },
      });
    }
    else{
      await db.systemDesignMarked.delete({
        where: {
          userId_problemId: {
            userId,
            problemId: Probid,
          },
        },
      });

    }

    revalidatePath(`/system-design` , "page");

    return { success: true, isSolved: isChecked };

  } catch (error) {
    console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update problem" };
  }
  
}