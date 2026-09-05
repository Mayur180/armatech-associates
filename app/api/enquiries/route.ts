
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      company,
      message,
      product,
      productSlug,
      model,
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and email are required.",
        },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const client = await clientPromise

    // Select database
    const db = client.db("crystal_vmm")

    // Create enquiry document
    const enquiry = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      company: company?.trim() || "",
      message: message?.trim() || "",

      // Product information
      product: product || "",
      productSlug: productSlug || "",
      model: model || "",

      // Timestamp
      createdAt: new Date(),
    }

    // Save enquiry
    const result = await db
      .collection("enquiries")
      .insertOne(enquiry)

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        enquiryId: result.insertedId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Enquiry submission error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit enquiry.",
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()

    const session = cookieStore.get(
      "crystal_admin_session"
    )?.value

    const adminSessionToken =
      process.env.ADMIN_SESSION_TOKEN

    if (
      !session ||
      !adminSessionToken ||
      session !== adminSessionToken
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        { status: 401 }
      )
    }

    const client = await clientPromise

    const db = client.db("crystal_vmm")

    const enquiries = await db
      .collection("enquiries")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      items: enquiries,
    })
  } catch (error) {
    console.error("Error fetching enquiries:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch enquiries.",
      },
      { status: 500 }
    )
  }
}