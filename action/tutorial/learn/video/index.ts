"use server";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";


export const getVideoBySubTopicId = async (subTopicId: string) => {

    const video = await db.subTopic.findUnique({
        where:{
            id:subTopicId
        },
        select:{
            title:true,
            videoLink:true,
            videoDescription:true,
            createdAt:true,
        }
    })

    revalidatePath(`/tutorial`)
    return video;

}
