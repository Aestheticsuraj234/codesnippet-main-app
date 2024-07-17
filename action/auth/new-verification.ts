"use server";

import { db } from "@/lib/db/db";
import { getUserByEmail } from "@/lib/auth/data/user";
import { getVerificationTokenByToken } from "@/lib/auth/tokens/verification-token";

/**
 * Verify a user's email using a verification token.
 *
 * @param {string} token - The email verification token.
 * @returns {Promise<{ success?: string, error?: string }>} - The result of the email verification process.
 */
export const newVerification = async (token: string): Promise<{ success?: string; error?: string; }> => {
  // Fetch the verification token from the database
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid Token",
    };
  }

  // Check if the token has expired
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  // Fetch the user associated with the token
  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Email not found",
    };
  }

  try {
    // Update the user's email verification status
    await db.user.update({
      where: { email: existingToken.email }, // Update user by email
      data: {
        emailVerified: new Date(),
      },
    });

    // Delete the used verification token
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Email verified successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to verify email" };
  }
};
