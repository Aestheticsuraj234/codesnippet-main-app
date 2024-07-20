"use client";

import { db } from "@/lib/db/db";


export const get_all_content = async () => {
    try {
        const content = await db.content.findMany({
            where: {
                status: 'PUBLISHED'
            }
        });

        return content;
        
    } catch (error) {
        
    }
}