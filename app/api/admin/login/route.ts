import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const password = body?.password

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          error: "Password is required.",
        },
        { status: 400 }
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    const sessionToken = process.env.ADMIN_SESSION_TOKEN

    if (!adminPassword || !sessionToken) {
      console.error("Admin environment variables are missing.")

      return NextResponse.json(
        {
          success: false,
          error: "Admin authentication is not configured.",
        },
        { status: 500 }
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid password.",
        },
        { status: 401 }
      )
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    })

    response.cookies.set("crystal_admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    console.error("Admin login error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process login.",
      },
      { status: 500 }
    )
  }
}