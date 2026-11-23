import { NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongodb"
import { isAdminAuthenticated } from "@/lib/auth"

export async function GET(request: Request) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    )
  }

  try {
    const client = await getMongoClient()

    await client.db("admin").command({ ping: 1 })

    return NextResponse.json({
      success: true,
      message: "MongoDB connection successful!",
    })
  } catch (error) {
    console.error("MongoDB connection error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed.",
      },
      { status: 500 }
    )
  }
}
