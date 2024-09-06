import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/lib/auth/data/user";
import { getTwoFactorConfirmationByUserId } from "@/lib/auth/two-factor-confirmation";
import { getAccountByUserId } from "@/lib/auth/data/account";

export const {
  handlers: { GET, POST },
  
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    /**
     * Event triggered when an account is linked.
     * 
     * @param {Object} param0 - The event payload.
     * @param {Object} param0.user - The user object.
     */
    async linkAccount({ user }: { user: any; }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    /**
     * Callback to handle sign-in logic.
     * 
     * @param {Object} param0 - The sign-in payload.
     * @param {Object} param0.user - The user object.
     * @param {Object} param0.account - The account object.
     * @returns {Promise<boolean>} - Returns true if sign-in is allowed, otherwise false.
     */
    async signIn({ user, account }: { user: any; account: any; }): Promise<boolean> {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;
      
      const existingUser = await getUserById(user.id!);

      // Prevent login if email is not verified
      if (!existingUser?.emailVerified) return false;

      // Handle two-factor authentication check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id!);
        if (!twoFactorConfirmation) return false;

        // Delete the two-factor confirmation for next sign-in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    /**
     * Callback to handle session creation/updating.
     * 
     * @param {Object} param0 - The session payload.
     * @param {Object} param0.token - The token object.
     * @param {Object} param0.session - The session object.
     * @returns {Promise<Object>} - Returns the session object.
     */
    async session({ token, session }: { token: any; session: any; }): Promise<any> {
   
      
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.sub && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.email = token.email!;
        session.user.name = token.name;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    /**
     * Callback to handle JWT token creation/updating.
     * 
     * @param {Object} param0 - The JWT payload.
     * @param {Object} param0.token - The token object.
     * @returns {Promise<Object>} - Returns the token object.
     */
    async jwt({ token }) {
 

      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id!);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});