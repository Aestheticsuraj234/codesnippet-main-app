"use server";
import * as z from "zod";

import { ResetSchema } from "@/schema";
import { getUserByEmail } from "@/lib/auth/data/user";
import { sendPasswordResetEmail } from "@/lib/mail/mail";
import { generatePasswordResetToken } from "@/lib/auth/tokens/tokens";

/**
 * Initiate a password reset process by generating a reset token and sending a reset email.
 *
 * @param {z.infer<typeof ResetSchema>} values - The password reset form values.
 * @returns {Promise<{ success?: string, error?: string }>} - The result of the password reset initiation.
 */
export const reset = async (values: z.infer<typeof ResetSchema>): Promise<{ success?: string; error?: string; }> => {
    // Validate the input fields against the schema
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {    
            error: "Invalid Email",
        };
    }

    const { email } = validatedFields.data;

    // Check if the user exists
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "Email not found",
        };
    }

    // Generate a password reset token and send it via email
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email, 
        passwordResetToken.token
    );

    return {
        success: "Email sent",
    };
};
