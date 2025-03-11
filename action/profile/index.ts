"use server";

import { db } from "@/lib/db/db";
import { ProfileUpdateFormSchema } from "@/schema";
import { z } from "zod";

export const updateUserProfileById = async (
    userId: string,
    data: z.infer<typeof ProfileUpdateFormSchema>,
    campusAmbassadorId: string
) => {
    try {
        // Validate user ID
        if (!userId) {
            return { error: "Invalid User ID" };
        }

        // Validate profile data
        if (!data || typeof data !== "object") {
            return { error: "Invalid profile data" };
        }

        // Parse and validate the data against the schema
        const parsedData = ProfileUpdateFormSchema.safeParse(data);
        if (!parsedData.success) {
            return { error: "Validation failed", issues: parsedData.error.issues };
        }

        // Check if the user exists
        const existingUser = await db.user.findUnique({ where: { id: userId } });
        if (!existingUser) {
            return { error: "User not found" };
        }

        

        // Update the user's profile
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                name:data.name,
                email:data.email,
                campusAmbassador: {
                    update: {
                        where: { id: campusAmbassadorId }, // Ensure the campusAmbassador ID matches
                        data: {
                            campusName: data.campusName,
                            fullName: data.fullName,
                            mobileNumber: data.mobileNumber,
                            upiId: data.upiId,
                        },
                    },
                },
            },
            include: {
                campusAmbassador: true, // Include the updated campusAmbassador details in the response
            },
        });

        return { success: true, data: updatedUser };
    } catch (error) {
        console.error("Profile Update Error:", error);
        return { error: "Failed to update user profile" };
    }
};