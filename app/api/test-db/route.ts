import { NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongodb"

export async function GET() {
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
