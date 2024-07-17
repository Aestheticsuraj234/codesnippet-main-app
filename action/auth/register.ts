"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db/db";
import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "@/lib/auth/data/user";
import { generateVerificationToken } from "@/lib/auth/tokens/tokens";
import { sendVerificationEmail } from "@/lib/mail/mail";

/**
 * Register a new user, hash their password, and send a verification email.
 *
 * @param {z.infer<typeof RegisterSchema>} values - The registration form values.
 * @returns {Promise<{ success?: string, error?: string }>} - The result of the registration process.
 * @throws {Error} - If the registration fields are invalid.
 */
export const register = async (values: z.infer<typeof RegisterSchema>): Promise<{ success?: string; error?: string; }> => {
  // Validate the input fields against the schema
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { email, password, name } = validatedFields.data;

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the user already exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Create the new user in the database
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate a verification token for the user
  const verificationToken = await generateVerificationToken(email);

  // Send the verification token via email
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );

  return { success: "Confirmation email sent!" };
};
