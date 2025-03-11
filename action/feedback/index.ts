"use server";

import { AddFeedbackSchema } from "@/app/dashboard/(routes)/feedback/_components/add-feedback-form";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { z } from "zod";



export const AddFeeback = async (data:z.infer<typeof AddFeedbackSchema>) => {
    try {
        const user = await currentUser();
        const {category , description , email , priority} = data;
        const feeback = await db.feedback.create({
            data:{
                userId:user?.id!,
                category,
                description,
                email,
                priority,
                status:"PENDING"
            }
        });

        return feeback
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add feedback");
    }
    
}