"use server";
import * as z from "zod";

import { db } from "@/lib/db/db";
import { SettingSchema } from "@/schema";
import { getUserByEmail, getUserById } from "@/lib/auth/data/user";
import { currentUser } from "@/lib/auth/data/auth";
import { generateVerificationToken } from "@/lib/auth/tokens/tokens";
import { sendVerificationEmail } from "@/lib/mail/mail";
import bcrypt from "bcryptjs";

/**
 * Update user settings, including email and password, with optional email verification.
 *
 * @param {z.infer<typeof SettingSchema>} values - The user settings form values.
 * @returns {Promise<{ success?: string, error?: string }>} - The result of the settings update process.
 */
export const settings = async (values: z.infer<typeof SettingSchema>) => {
  // Fetch the current authenticated user
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Fetch the user from the database by ID
  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "User not found" };
  }

  // If the user is authenticated through OAuth, restrict certain settings updates
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // Handle email update and verification
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Email verification sent" };
  }

  // Handle password update
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // Update user settings in the database
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated" };
};
