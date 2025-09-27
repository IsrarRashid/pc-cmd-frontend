import { NextResponse } from "next/server";

export async function POST() {
  const cookieNames = ["token", "email", "userName"];

  const response = NextResponse.json({ message: "Logged out successfully" });

  cookieNames.forEach((name) => {
    response.cookies.delete(name);
  });

  return response;
}
