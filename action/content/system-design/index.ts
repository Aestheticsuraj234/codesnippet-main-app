"use server";

import { format } from "date-fns"; 
import { db } from "@/lib/db/db";
import { ContentStatus, ContentType, DifficultyLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const toggleSolver = async (Probid: string, userId: string | undefined, isChecked: boolean) => {
   
    const data = await db.systemDesignProblem.update({
      where: { id: Probid },
      data: {
        solvedBy: isChecked
          ? { connect: { id: userId } }
          : { disconnect: true },
      },
    });
   
    revalidatePath(`/system-design` , "page");
    return { success: true, data, isSolved: isChecked };
  
};



export const toggleMarked = async (Probid: string, userId: string | undefined, isChecked: boolean) => {
         
    const data = await db.systemDesignProblem.update({
      where: { id: Probid },
      data: {
        markedBy: isChecked
          ? { connect: { id: userId } }
          : { disconnect: true },
      },
    });
    
   
    revalidatePath(`/system-design` , "page");
    return { success: true, data, isMarked: isChecked };
}