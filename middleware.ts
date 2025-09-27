import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract the path from the request URL
  const url = new URL(request.url);
  const pathname = url.pathname; // Full path of the request
  const requiredRight = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  // Get cookies from the request
  // const rightsCookie = request.cookies.get("rights");
  const tokenCookie = request.cookies.get("token");
  console.log("tokenCookie", tokenCookie);
  // Redirect to login if token is missing
  if (!tokenCookie) {
    console.log("Token missing. Redirecting to /login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // let rights: string[] = [];
  // try {
  //   // Parse the "rights" cookie if it exists
  //   rights = rightsCookie ? JSON.parse(rightsCookie.value || "[]") : [];
  // } catch (error) {
  //   console.error("Failed to parse rights cookie:", error);
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // console.log("User rights:", rights);
  // console.log("Required right:", requiredRight);
  // console.log("Current pathname:", pathname);

  // const hasRequiredRight = rights.some((right) =>
  //   requiredRight.startsWith(right)
  // );

  // if (!hasRequiredRight) {
  //   const redirectPath =
  //     rights.length > 0 ? `/${rights[0]}` : "/not-authorized";

  //   // Avoid infinite redirection
  //   if (pathname === redirectPath) {
  //     console.warn("Redirection loop detected. Allowing request.");
  //     return NextResponse.next();
  //   }

  //   console.log(`User lacks required right. Redirecting to ${redirectPath}`);
  //   return NextResponse.redirect(new URL(redirectPath, request.url));
  // }

  // Log success and allow access
  console.log(`Access granted for ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
