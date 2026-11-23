import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { Resend } from "resend"

import { isAdminAuthenticated } from "@/lib/auth"
import { getMongoClient } from "@/lib/mongodb"
import { CONTACT } from "@/lib/site"

const DB_NAME = "crystal_vmm"
const COLLECTION_NAME = "enquiries"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const RESEND_API_KEY = process.env.RESEND_API_KEY

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Crystal VMM <onboarding@resend.dev>"

type Enquiry = {
  _id?: ObjectId
  name: string
  company: string
  email: string
  phone: string
  message: string
  product: string
  productSlug: string
  model: string
  createdAt: Date
}

function clean(value: unknown, max = 5000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "")
  return digits.length >= 7 && digits.length <= 15
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function emailShell(title: string, body: string) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;background:#ffffff;color:#222222;border:1px solid #e5e5e5">
      <div style="background:#c8102e;padding:24px 30px">
        <h1 style="margin:0;color:#ffffff;font-size:24px">Crystal VMM</h1>
        <p style="margin:6px 0 0;color:#ffffff;font-size:13px">Armatech Associates</p>
      </div>
      <div style="padding:30px">
        <h2 style="margin-top:0;color:#c8102e;font-size:20px">${title}</h2>
        ${body}
      </div>
      <div style="background:#f5f5f5;padding:16px 30px;color:#777777;font-size:12px">
        Crystal VMM &middot; ${escapeHtml(CONTACT.email)} &middot; ${escapeHtml(CONTACT.mobile)}
      </div>
    </div>
  `
}

function detailRow(label: string, value: string) {
  return `<p style="margin:8px 0"><strong>${label}:</strong> ${escapeHtml(value || "Not specified")}</p>`
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 }
    )
  }

  // Honeypot: real users never fill this field.
  if (clean(body.hp_field)) {
    return NextResponse.json({ success: true, message: "Thank you." })
  }

  const name = clean(body.name, 120)
  const company = clean(body.company, 160)
  const email = clean(body.email, 200).toLowerCase()
  const phone = clean(body.phone, 40)
  const message = clean(body.message)
  const product = clean(body.product, 160) || "General enquiry"
  const productSlug = clean(body.productSlug, 160)
  const model = clean(body.model, 160)

  if (!name) {
    return NextResponse.json(
      { success: false, error: "Please enter your name." },
      { status: 400 }
    )
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    )
  }

  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid phone number." },
      { status: 400 }
    )
  }

  if (!message) {
    return NextResponse.json(
      { success: false, error: "Please tell us what you need." },
      { status: 400 }
    )
  }

  const enquiry: Enquiry = {
    name,
    company,
    email,
    phone,
    message,
    product,
    productSlug,
    model,
    createdAt: new Date(),
  }

  let saved = false
  let enquiryId: string | undefined
  let dbError: string | undefined

  try {
    const client = await getMongoClient()
    const result = await client
      .db(DB_NAME)
      .collection<Enquiry>(COLLECTION_NAME)
      .insertOne(enquiry)

    saved = true
    enquiryId = result.insertedId.toString()
    console.log("ENQUIRY SAVED TO MONGODB:", enquiryId)
  } catch (error) {
    dbError = error instanceof Error ? error.message : String(error)
    console.error("ENQUIRY DATABASE ERROR:", error)
  }

  let adminEmailSent = false
  let customerEmailSent = false

  if (RESEND_API_KEY) {
    const resend = new Resend(RESEND_API_KEY)

    const summary = `
      <div style="background:#f8f8f8;border:1px solid #dddddd;padding:18px;margin:20px 0">
        ${detailRow("Name", name)}
        ${detailRow("Company", company)}
        ${detailRow("Email", email)}
        ${detailRow("Phone", phone)}
      </div>
      <div style="background:#fff7f7;border-left:4px solid #c8102e;padding:18px;margin:20px 0">
        ${detailRow("Product", product)}
        ${detailRow("Model", model)}
      </div>
      <h3 style="font-size:16px;margin-bottom:8px">Customer message</h3>
      <p style="white-space:pre-line;line-height:1.7">${escapeHtml(message)}</p>
    `

    const adminTo = ADMIN_EMAIL || CONTACT.email

    try {
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: adminTo,
        replyTo: email,
        subject: `New Enquiry - ${product}${model ? ` - ${model}` : ""}`,
        html: emailShell("New Website Enquiry", summary),
      })

      if (result.error) {
        console.error("ADMIN EMAIL ERROR:", result.error)
      } else {
        adminEmailSent = true
      }
    } catch (error) {
      console.error("ADMIN EMAIL FAILED:", error)
    }

    try {
      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Thank You for Your Enquiry - Crystal VMM",
        html: emailShell(
          `Thank you, ${escapeHtml(name)}`,
          `
            <p style="font-size:15px;line-height:1.7">
              We have received your enquiry and our team will get back to you shortly.
            </p>
            <div style="background:#f8f8f8;border:1px solid #dddddd;padding:18px;margin:20px 0">
              ${detailRow("Product", product)}
              ${detailRow("Model", model)}
            </div>
            <p style="font-size:15px;line-height:1.7">
              If you have any additional requirements or questions, simply reply to this email.
            </p>
            <p style="font-size:15px;line-height:1.7;margin-bottom:0">
              Regards,<br /><strong>Crystal VMM Team</strong><br />Armatech Associates
            </p>
          `
        ),
      })

      if (result.error) {
        console.error("CUSTOMER EMAIL ERROR:", result.error)
      } else {
        customerEmailSent = true
      }
    } catch (error) {
      console.error("CUSTOMER EMAIL FAILED:", error)
    }
  } else {
    console.warn("RESEND_API_KEY is not configured. Emails were skipped.")
  }

  if (!saved) {
    return NextResponse.json(
      {
        success: false,
        error:
          "We could not store your enquiry right now. Please call us on " +
          CONTACT.mobile +
          " or email " +
          CONTACT.email +
          ".",
        saved: false,
        dbError,
      },
      { status: 503 }
    )
  }

  return NextResponse.json(
    {
      success: true,
      message: "Your enquiry has been submitted successfully.",
      saved: true,
      enquiryId,
      email: {
        adminSent: adminEmailSent,
        customerSent: customerEmailSent,
      },
    },
    { status: 201 }
  )
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    )
  }

  try {
    const client = await getMongoClient()
    const results = await client
      .db(DB_NAME)
      .collection<Enquiry>(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      enquiries: results.map((item) => ({
        ...item,
        _id: item._id?.toString(),
      })),
    })
  } catch (error) {
    console.error("GET ENQUIRIES ERROR:", error)

    return NextResponse.json(
      { success: false, error: "Unable to fetch enquiries." },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const deleteAll = searchParams.get("all") === "true"

  if (!deleteAll && !id) {
    return NextResponse.json(
      { success: false, error: "Enquiry ID is required." },
      { status: 400 }
    )
  }

  if (id && !ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid enquiry ID." },
      { status: 400 }
    )
  }

  try {
    const client = await getMongoClient()
    const enquiries = client
      .db(DB_NAME)
      .collection<Enquiry>(COLLECTION_NAME)

    if (deleteAll) {
      const result = await enquiries.deleteMany({})
      return NextResponse.json({
        success: true,
        message: `${result.deletedCount} enquiries deleted successfully.`,
        deletedCount: result.deletedCount,
      })
    }

    const result = await enquiries.deleteOne({ _id: new ObjectId(id!) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully.",
      deletedId: id,
    })
  } catch (error) {
    console.error("DELETE ENQUIRY ERROR:", error)
    return NextResponse.json(
      { success: false, error: "Unable to delete enquiry." },
      { status: 500 }
    )
  }
}
