/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {RegExp[]}
 */

export const publicRoutes: RegExp[] = [
    /^\/$/, // Matches root
    /^\/auth\/new-verification$/, // Matches exact route
    /^\/live-course\/[^/]+$/, // Matches dynamic route /live-course/[id] where [id] is any non-empty segment
  ];
  
  /**
   * An Array of routes that are protected
   * These routes require authentication
   * @type {RegExp[]}
   */
  
  export const protectedRoutes: RegExp[] = [
    /^\/settings$/, // Matches /settings
  ];
  
  /**
   * An Array of routes that are accessible to the public
   * Routes that start with this (/api/auth) prefix do not require authentication
   * @type {string[]}
   */
  
  export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
  ];
  
  /**
   * Prefix for API authentication routes that do not require authentication
   * @type {string}
   */
  export const apiAuthPrefix: string = "/api/auth";
  
  export const DEFAULT_LOGIN_REDIRECT = "/"; // Redirect to the home page after login
  