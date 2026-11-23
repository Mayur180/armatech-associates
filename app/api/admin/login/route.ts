import { NextResponse } from "next/server"

import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isAdminAuthenticated,
  verifyPassword,
} from "@/lib/auth"

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD is not configured.")

    return NextResponse.json(
      {
        success: false,
        error: "Admin login is not configured on the server.",
      },
      { status: 500 }
    )
  }

  let password = ""

  try {
    const body = await request.json()
    password = typeof body?.password === "string" ? body.password : ""
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 }
    )
  }

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { success: false, error: "Invalid password." },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set({
    name: ADMIN_COOKIE,
    value: createSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })

  return response
}

export async function GET(request: Request) {
  return NextResponse.json({
    authenticated: isAdminAuthenticated(request),
  })
}
