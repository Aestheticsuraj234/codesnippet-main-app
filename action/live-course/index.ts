"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { ContentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";



export const getAllCourses = async ()=>{
    const user = await currentUser()

    if(!user){
        throw new Error("User Not Found")
    }

    const course = await db.courses.findMany({
        where:{
            status:ContentStatus.PUBLISHED,
        },
        select:{
            chapters:true,
             id:true,
             courseVideoPitchLink:true,
             description:true,
             title: true  ,
             image:true,
             startDate:true,
             price:true,
             discount:true,
             purchaseByUser:{
                    where:{
                        userId:user?.id!
                    },
                    select:{
                        isPurchase:true
                    }
             }
        }
    })

    return course
}


export const getCourseById = async (id:string)=>{

    const course = await db.courses.findUnique({
        where:{
            id
        },
        select:{
            chapters:true,
             id:true,
             courseVideoPitchLink:true,
             description:true,
             title: true  ,
             image:true,
             startDate:true,
             price:true,
             discount:true,
        }
    })

    return course
}

export const getChapterWiseDataWithCourseId = async (courseId:string,chapterId:string)=>{
 
    const user = await currentUser();

    const liveCourse = await db.courses.findUnique({
        where:{
            id:courseId
        },
        include:{
            chapters:{
                where:{
                    id:chapterId
                },
                select:{
                    id:true,
                    createdAt:true,
                    title:true,
                    description:true,
                    chapterNotes:true,
                    chapterVideoLink:true,
                    sourceCodeLink:true,
                    chapterProgression:{
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




    return liveCourse?.chapters[0]

}




export const toggleMarkAsDone = async (chapterId: string, userId: string, isCompleted: boolean) => {
    const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.id !== userId) {
    throw new Error("User not authorized");
  }

  if(isCompleted){
await db.chapterProgress.create({
    data:{
        chapterId,
        userId,
        markedAsDone:true
    }
})
  }
  else{
    await db.chapterProgress.delete({
        where:{
            userId_chapterId:{
                chapterId,
                userId
            }
        }
    })
  }

}