// app/api/login/route.ts
import { LOGIN_API } from "@/app/APIs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { isSuccess: false, message: "email and password required" },
        { status: 400 }
      );
    }

    // Forward request to backend API
    const response = await fetch(`${process.env.BACKEND_URL}${LOGIN_API}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Prepare response
    const res = NextResponse.json(data, { status: response.status });

    // If login is successful, set cookies in response
    if (data?.responseCode === 200 && data?.data?.token) {
      const userData = data.data.userData;

      res.cookies.set("token", data.data.token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      res.cookies.set("userName", userData?.userName || "", {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      res.cookies.set("email", userData?.email || "", {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }

    return res;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { isSuccess: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
