import { UserRole } from "@prisma/client";
import NextAuth , {type DefaultSession} from "next-auth";

// from here we are going to extend the user object to include the role and other properties 
export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
}

declare module "next-auth"{
    interface Session {
        user: ExtendedUser;
    }
}

import {JWT} from "next-auth/jwt";

declare module "next-auth/jwt"{
    interface JWT{
        role: UserRole;
    }
}