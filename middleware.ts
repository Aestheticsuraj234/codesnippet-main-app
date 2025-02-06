import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// Function to check if a route matches any public route patterns
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((pattern) => pattern.test(pathname));
}

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublic = isPublicRoute(nextUrl.pathname);

  // Allow API authentication routes without redirection
  if (isApiAuthRoute) return null;

  // Redirect logged-in users away from auth routes (e.g., login/signup)
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Redirect non-logged-in users trying to access protected routes
  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // Allow request to proceed
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
