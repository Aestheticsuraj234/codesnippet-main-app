import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  protectedRoutes,
  authRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// Function to check if a route matches any public route patterns
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((pattern) => pattern.test(pathname));
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If it's an API auth route, no redirection is needed
  if (isApiAuthRoute) {
    return null;
  }

  // If it's an authentication route and the user is logged in, redirect to the default login redirect
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null; // Allow access if not logged in
  }

  // Check if the user is not logged in and the route is not public
  if (!isLoggedIn && !isPublicRoute(nextUrl.pathname)) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Default to allowing the request
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
