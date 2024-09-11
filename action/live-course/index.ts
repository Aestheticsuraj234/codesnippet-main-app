"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { ContentStatus } from "@prisma/client";



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