"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schema";
import { getPasswordResetTokenByToken } from "@/lib/auth/tokens/password-reset-token";
import { getUserByEmail } from "@/lib/auth/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db/db";

/**
 * Update a user's password using a password reset token.
 *
 * @param {z.infer<typeof NewPasswordSchema>} values - The new password form values.
 * @param {string | null} token - The password reset token.
 * @returns {Promise<{ success?: string, error?: string }>} - The result of the password update process.
 */
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
): Promise<{ success?: string; error?: string; }> => {
  // Check if the token is provided
  if (!token) {
    return { error: "Missing Token!" };
  }

  // Validate the input fields against the schema
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { password } = validatedFields.data;

  // Fetch the password reset token from the database
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token!" };
  }

  // Check if the token has expired
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // Fetch the user associated with the token
  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password in the database
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  // Delete the used password reset token
  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password Updated!" };
};
