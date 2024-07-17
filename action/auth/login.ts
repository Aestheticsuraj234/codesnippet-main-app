"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/auth/data/user";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/auth/tokens/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail/mail";
import { getTwoFactorTokenByEmail } from "@/lib/auth/tokens/two-factor-token";
import { db } from "@/lib/db/db";
import { getTwoFactorConfirmationByUserId } from "@/lib/auth/two-factor-confirmation";

/**
 * Log in a user with email, password, and optional two-factor authentication code.
 *
 * @param {z.infer<typeof LoginSchema>} values - The login form values.
 * @returns {Promise<{ success?: string, error?: string, twoFactor?: boolean }>} - The result of the login process.
 * @throws {Error} - If the login fields are invalid.
 */
export const login = async (values: z.infer<typeof LoginSchema>): Promise<{ success?: string; error?: string; twoFactor?: boolean; }> => {
  // Validate the input fields against the schema
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { email, password, code } = validatedFields.data;

  // Fetch the user by email
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Email Doesn't Exist!" };
  }

  // Check if the user's email is verified
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(existingUser.email, verificationToken.token);
    return { success: "Confirmation email sent!" };
  }

  // Handle two-factor authentication if enabled
  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      // Validate the provided two-factor authentication code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid Token" };
      }

      // Check if the two-factor token has expired
      if (new Date(twoFactorToken.expires) < new Date()) {
        return { error: "Token Expired" };
      }

      // Delete the used two-factor token
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      });

      // Remove existing two-factor confirmation if present
      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        });
      }

      // Create a new two-factor confirmation
      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id }
      });

    } else {
      // Generate and send a new two-factor authentication token
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  // Attempt to sign in the user
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something Went Wrong" };
      }
    }

    throw error;
  }

  return { success: "Logged in successfully!" };
};
