"use server";
import { db } from "@/lib/db/db";
import { TechnologyStatus } from "@prisma/client";

export const GetAllTopicsByTechnologyId = async (technologyId: string) => {
    const topics = await db.topic.findMany({
        where:{
            technologyId:technologyId,
            status:TechnologyStatus.PUBLISHED
        },
        orderBy:{
            createdAt:"asc"
        },
        select:{
            id:true,
            title:true,
            subTopics:{
                select:{
                    id:true,
                    title:true,
                    markAsDone:true
                }
            }

        }
    })

    return topics
}