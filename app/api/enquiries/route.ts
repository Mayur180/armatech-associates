import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { Resend } from "resend"

import clientPromise from "@/lib/mongodb"

// ============================================================
// CONFIGURATION
// ============================================================

const DB_NAME = "crystal_vmm"
const COLLECTION_NAME = "enquiries"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const RESEND_API_KEY = process.env.RESEND_API_KEY

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Crystal VMM <onboarding@resend.dev>"

// ============================================================
// TYPES
// ============================================================

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

// ============================================================
// HELPERS
// ============================================================

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidIndianPhone(phone: string) {
  const cleaned = phone.replace(/[\s-]/g, "")

  return /^(?:\+91)?[6-9]\d{9}$/.test(cleaned)
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

// ============================================================
// POST
// Submit a new enquiry
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // ----------------------------------------------------------
    // Read request body
    // ----------------------------------------------------------

    const body = await request.json()

    const name = clean(body.name)
    const company = clean(body.company)
    const email = clean(body.email).toLowerCase()
    const phone = clean(body.phone)
    const message = clean(body.message)

    const product = clean(body.product)
    const productSlug = clean(body.productSlug)
    const model = clean(body.model)

    // ----------------------------------------------------------
    // Validate required fields
    // ----------------------------------------------------------

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required.",
        },
        { status: 400 }
      )
    }

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: "Company name is required.",
        },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required.",
        },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      )
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number is required.",
        },
        { status: 400 }
      )
    }

    if (!isValidIndianPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid Indian mobile number.",
        },
        { status: 400 }
      )
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required.",
        },
        { status: 400 }
      )
    }

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product information is missing.",
        },
        { status: 400 }
      )
    }

    if (!model) {
      return NextResponse.json(
        {
          success: false,
          error: "Model information is missing.",
        },
        { status: 400 }
      )
    }

    // ----------------------------------------------------------
    // Connect to MongoDB
    // ----------------------------------------------------------

    const client = await clientPromise

    const db = client.db(DB_NAME)

    const enquiries = db.collection<Enquiry>(COLLECTION_NAME)

    // ----------------------------------------------------------
    // Create enquiry
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // Save enquiry
    // ----------------------------------------------------------

    const result = await enquiries.insertOne(enquiry)

    console.log("ENQUIRY SAVED TO MONGODB:", result.insertedId.toString())

    // ==========================================================
    // SEND EMAILS
    // ==========================================================

    let adminEmailSent = false
    let customerEmailSent = false

    // ----------------------------------------------------------
    // Only attempt email if Resend is configured
    // ----------------------------------------------------------

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY)

      // ========================================================
      // ADMIN EMAIL
      // ========================================================

      if (ADMIN_EMAIL) {
        try {
          const adminResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,

            subject: `New Enquiry - ${product} - ${model}`,

            replyTo: email,

            html: `
              <div style="
                font-family: Arial, Helvetica, sans-serif;
                max-width: 700px;
                margin: 0 auto;
                padding: 30px;
                background: #ffffff;
                color: #222222;
              ">

                <div style="
                  border-bottom: 4px solid #b91c1c;
                  padding-bottom: 15px;
                  margin-bottom: 25px;
                ">
                  <h1 style="
                    margin: 0;
                    color: #b91c1c;
                    font-size: 26px;
                  ">
                    New Website Enquiry
                  </h1>
                </div>

                <p style="
                  font-size: 16px;
                  line-height: 1.6;
                ">
                  A new enquiry has been submitted through the
                  Crystal VMM website.
                </p>

                <div style="
                  background: #f8f8f8;
                  border: 1px solid #dddddd;
                  border-radius: 8px;
                  padding: 20px;
                  margin: 25px 0;
                ">

                  <h2 style="
                    margin-top: 0;
                    color: #b91c1c;
                    font-size: 20px;
                  ">
                    Customer Details
                  </h2>

                  <p>
                    <strong>Name:</strong>
                    ${escapeHtml(name)}
                  </p>

                  <p>
                    <strong>Company:</strong>
                    ${escapeHtml(company)}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    ${escapeHtml(email)}
                  </p>

                  <p>
                    <strong>Phone:</strong>
                    ${escapeHtml(phone)}
                  </p>

                </div>

                <div style="
                  background: #fff7f7;
                  border-left: 5px solid #b91c1c;
                  padding: 18px;
                  margin: 25px 0;
                ">

                  <h2 style="
                    margin-top: 0;
                    color: #b91c1c;
                    font-size: 20px;
                  ">
                    Product Enquiry
                  </h2>

                  <p>
                    <strong>Product:</strong>
                    ${escapeHtml(product)}
                  </p>

                  <p>
                    <strong>Model:</strong>
                    ${escapeHtml(model)}
                  </p>

                </div>

                <div style="
                  border-top: 1px solid #dddddd;
                  padding-top: 20px;
                ">

                  <h2 style="
                    font-size: 20px;
                    color: #333333;
                  ">
                    Customer Message
                  </h2>

                  <p style="
                    white-space: pre-line;
                    line-height: 1.7;
                    font-size: 15px;
                  ">
                    ${escapeHtml(message)}
                  </p>

                </div>

                <div style="
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #dddddd;
                  color: #777777;
                  font-size: 13px;
                ">
                  <p>
                    This enquiry was submitted from the
                    Crystal VMM website.
                  </p>
                </div>

              </div>
            `,
          })

          if (!adminResult.error) {
            adminEmailSent = true
            console.log("ADMIN EMAIL SENT")
          } else {
            console.error(
              "ADMIN EMAIL ERROR:",
              adminResult.error
            )
          }
        } catch (error) {
          console.error(
            "ADMIN EMAIL FAILED:",
            error
          )
        }
      }

      // ========================================================
      // CUSTOMER THANK-YOU EMAIL
      // ========================================================

      try {
        const customerResult = await resend.emails.send({
          from: FROM_EMAIL,

          to: email,

          subject: "Thank You for Your Enquiry - Crystal VMM",

          html: `
            <div style="
              font-family: Arial, Helvetica, sans-serif;
              max-width: 700px;
              margin: 0 auto;
              padding: 30px;
              background: #ffffff;
              color: #222222;
            ">

              <div style="
                border-bottom: 4px solid #b91c1c;
                padding-bottom: 15px;
                margin-bottom: 25px;
              ">

                <h1 style="
                  margin: 0;
                  color: #b91c1c;
                  font-size: 28px;
                ">
                  Thank You for Contacting Crystal
                </h1>

              </div>

              <p style="
                font-size: 17px;
                line-height: 1.7;
              ">
                Dear ${escapeHtml(name)},
              </p>

              <p style="
                font-size: 16px;
                line-height: 1.7;
              ">
                Thank you for your enquiry regarding our
                Video Measuring Machines.
              </p>

              <div style="
                background: #f8f8f8;
                border: 1px solid #dddddd;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
              ">

                <p>
                  <strong>Product:</strong>
                  ${escapeHtml(product)}
                </p>

                <p>
                  <strong>Model:</strong>
                  ${escapeHtml(model)}
                </p>

              </div>

              <p style="
                font-size: 16px;
                line-height: 1.7;
              ">
                Our team has received your enquiry and will
                get in touch with you shortly.
              </p>

              <p style="
                font-size: 16px;
                line-height: 1.7;
              ">
                If you have any additional requirements,
                specifications, or questions, please feel
                free to reply to this email.
              </p>

              <div style="
                margin-top: 35px;
                padding: 20px;
                background: #fff7f7;
                border-left: 5px solid #b91c1c;
              ">

                <p style="
                  margin: 0;
                  font-weight: bold;
                  color: #b91c1c;
                ">
                  Crystal VMM
                </p>

                <p style="
                  margin-bottom: 0;
                  color: #555555;
                ">
                  Precision Measurement Solutions
                </p>

              </div>

              <div style="
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dddddd;
                color: #777777;
                font-size: 13px;
              ">

                <p>
                  This is an automated confirmation email.
                  Please reply to this email if you need
                  further assistance.
                </p>

              </div>

            </div>
          `,
        })

        if (!customerResult.error) {
          customerEmailSent = true
          console.log("CUSTOMER THANK-YOU EMAIL SENT")
        } else {
          console.error(
            "CUSTOMER EMAIL ERROR:",
            customerResult.error
          )
        }
      } catch (error) {
        console.error(
          "CUSTOMER EMAIL FAILED:",
          error
        )
      }
    } else {
      console.warn(
        "RESEND_API_KEY is not configured. Emails were skipped."
      )
    }

    // ==========================================================
    // RESPONSE
    // ==========================================================

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        enquiryId: result.insertedId.toString(),

        email: {
          adminSent: adminEmailSent,
          customerSent: customerEmailSent,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("ENQUIRY API ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit your enquiry. Please try again.",
      },
      { status: 500 }
    )
  }
}

// ============================================================
// GET
// Admin enquiries list
// ============================================================

export async function GET() {
  try {
    const client = await clientPromise

    const db = client.db(DB_NAME)

    const enquiries = db.collection<Enquiry>(COLLECTION_NAME)

    const results = await enquiries
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      {
        success: true,
        enquiries: results.map((item) => ({
          _id: item._id?.toString(),

          name: item.name,
          company: item.company,
          email: item.email,
          phone: item.phone,
          message: item.message,

          product: item.product,
          productSlug: item.productSlug,
          model: item.model,

          createdAt: item.createdAt,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("GET ENQUIRIES ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch enquiries.",
      },
      { status: 500 }
    )
  }
}

// ============================================================
// DELETE
//
// Supports:
//
// DELETE /api/enquiries?id=ENQUIRY_ID
//
// Deletes one enquiry.
//
// DELETE /api/enquiries?all=true
//
// Deletes all enquiries.
// ============================================================

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get("id")
    const deleteAll = searchParams.get("all")

    const client = await clientPromise

    const db = client.db(DB_NAME)

    const enquiries = db.collection<Enquiry>(COLLECTION_NAME)

    // ========================================================
    // DELETE ALL
    // ========================================================

    if (deleteAll === "true") {
      const result = await enquiries.deleteMany({})

      console.log(
        `DELETED ${result.deletedCount} ENQUIRIES`
      )

      return NextResponse.json(
        {
          success: true,
          message: `${result.deletedCount} enquiries deleted successfully.`,
          deletedCount: result.deletedCount,
        },
        { status: 200 }
      )
    }

    // ========================================================
    // DELETE ONE
    // ========================================================

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Enquiry ID is required.",
        },
        { status: 400 }
      )
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid enquiry ID.",
        },
        { status: 400 }
      )
    }

    const result = await enquiries.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Enquiry not found.",
        },
        { status: 404 }
      )
    }

    console.log(
      `DELETED ENQUIRY: ${id}`
    )

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry deleted successfully.",
        deletedId: id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("DELETE ENQUIRY ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Unable to delete enquiry.",
      },
      { status: 500 }
    )
  }
}

// ============================================================
// HTML ESCAPE
// Prevents customer-entered data from being interpreted
// as HTML inside emails.
// ============================================================

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}