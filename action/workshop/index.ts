"use server"

import { currentUser } from "@/lib/auth/data/auth"
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";



export const getDayWiseDataWithWorkshopId = async (workshopId: string , dayId:string) => {

    const user = await currentUser();

    const workshop = await db.workshop.findUnique({
        where:{
            id:workshopId
        },
        include:{
            days:{
                where:{
                    id:dayId
                },
                select:{
                    id:true,
                    dayNumber:true,
                    title:true,
                    createdAt:true,
                    sourceCodeLink:true,
                    videoLink:true,
                    notes:true,
                    userProgress:{
                        where:{
                            userId:user?.id
                        },
                        select:{
                            markedAsDone:true
                        }
                    }
                }
            }
        }
    })


    revalidatePath(`courses/${workshopId}/days/${dayId}`)

    return workshop?.days[0];


}


export const toggleMarkAsDone = async (dayId: string, userId: string, isCompleted: boolean) => {
    const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.id !== userId) {
    throw new Error("User not authorized");
  }

  if(isCompleted){
await db.workshopDayProgress.create({
    data:{
        dayId,
        userId,
        markedAsDone:true
    }
})
  }
  else{
    await db.workshopDayProgress.delete({
        where:{
            userId_dayId:{
                dayId,
                userId
            }
        }
    })
  }

    revalidatePath(`/courses`)
}