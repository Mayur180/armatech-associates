import { NextResponse } from "next/server"
import { Resend } from "resend"
import clientPromise from "@/lib/mongodb"

// ============================================================
// TYPES
// ============================================================

type EnquiryBody = {
  name?: string
  company?: string
  email?: string
  phone?: string
  message?: string
  product?: string
  model?: string
}

// ============================================================
// HELPERS
// ============================================================

function clean(value: unknown): string {
  if (typeof value !== "string") {
    return ""
  }

  return value.trim()
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ============================================================
// POST
// SUBMIT ENQUIRY
// ============================================================

export async function POST(request: Request) {
  try {
    // ========================================================
    // 1. ENVIRONMENT VARIABLES
    // ========================================================

    const adminEmail = process.env.ADMIN_EMAIL
    const resendApiKey = process.env.RESEND_API_KEY

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Crystal VMM <onboarding@resend.dev>"

    if (!adminEmail) {
      console.error("ADMIN_EMAIL is missing.")

      return NextResponse.json(
        {
          success: false,
          error: "Company email configuration is missing.",
        },
        { status: 500 }
      )
    }

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing.")

      return NextResponse.json(
        {
          success: false,
          error: "Email service configuration is missing.",
        },
        { status: 500 }
      )
    }

    // ========================================================
    // 2. READ REQUEST BODY
    // ========================================================

    const body = (await request.json()) as EnquiryBody

    const name = clean(body.name)
    const company = clean(body.company)
    const email = clean(body.email)
    const phone = clean(body.phone)
    const message = clean(body.message)
    const product = clean(body.product)
    const model = clean(body.model)

    // ========================================================
    // 3. VALIDATION
    // ========================================================

    if (!name || !email || !phone || !product || !model) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Name, email, phone, product and model are required.",
        },
        { status: 400 }
      )
    }

    // ========================================================
    // 4. EMAIL VALIDATION
    // ========================================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      )
    }

    // ========================================================
    // 5. CONNECT TO MONGODB
    // ========================================================

    const client = await clientPromise

    // IMPORTANT:
    // Explicitly use crystal_vmm database.
    // This prevents the enquiry from being saved in "test".

    const db = client.db("crystal_vmm")

    // ========================================================
    // 6. CREATE ENQUIRY
    // ========================================================

    const enquiry = {
      name,
      company,
      email,
      phone,
      message,
      product,
      model,
      status: "new",
      createdAt: new Date(),
    }

    // ========================================================
    // 7. SAVE TO MONGODB
    // ========================================================

    const result = await db
      .collection("enquiries")
      .insertOne(enquiry)

    console.log(
      "Enquiry saved to crystal_vmm:",
      result.insertedId.toString()
    )

    // ========================================================
    // 8. ESCAPE VALUES FOR EMAIL HTML
    // ========================================================

    const safeName = escapeHtml(name)

    const safeCompany = escapeHtml(
      company || "Not provided"
    )

    const safeEmail = escapeHtml(email)

    const safePhone = escapeHtml(phone)

    const safeMessage = escapeHtml(
      message || "No message provided."
    )

    const safeProduct = escapeHtml(product)

    const safeModel = escapeHtml(model)

    // ========================================================
    // 9. RESEND
    // ========================================================

    const resend = new Resend(resendApiKey)

    // ========================================================
    // 10. SEND EMAIL TO COMPANY
    // ========================================================

    const companyEmail = await resend.emails.send({
      from: fromEmail,

      to: [adminEmail],

      // When company clicks Reply,
      // it replies directly to the customer.
      replyTo: email,

      subject: `New Enquiry - ${product} - ${model}`,

      html: `
        <!DOCTYPE html>

        <html>
          <body
            style="
              margin:0;
              padding:0;
              background:#f5f5f5;
              font-family:Arial,Helvetica,sans-serif;
              color:#222222;
            "
          >

            <div
              style="
                max-width:700px;
                margin:30px auto;
                background:#ffffff;
                border:1px solid #dddddd;
              "
            >

              <!-- HEADER -->

              <div
                style="
                  background:#d90000;
                  padding:25px;
                  text-align:center;
                "
              >

                <h1
                  style="
                    margin:0;
                    color:#ffffff;
                    font-size:28px;
                  "
                >
                  Crystal VMM
                </h1>

                <p
                  style="
                    margin:8px 0 0;
                    color:#ffffff;
                    font-size:14px;
                  "
                >
                  New Customer Enquiry
                </p>

              </div>

              <!-- CONTENT -->

              <div style="padding:30px;">

                <h2
                  style="
                    margin-top:0;
                    color:#d90000;
                  "
                >
                  New Enquiry Received
                </h2>

                <p
                  style="
                    font-size:15px;
                    line-height:1.6;
                  "
                >
                  A new enquiry has been submitted through
                  the Crystal VMM website.
                </p>

                <!-- CUSTOMER DETAILS -->

                <h3
                  style="
                    color:#d90000;
                    border-bottom:2px solid #d90000;
                    padding-bottom:8px;
                    margin-top:30px;
                  "
                >
                  Customer Details
                </h3>

                <table
                  style="
                    width:100%;
                    border-collapse:collapse;
                  "
                >

                  <tr>
                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                        font-weight:bold;
                        width:35%;
                      "
                    >
                      Name
                    </td>

                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                      "
                    >
                      ${safeName}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                        font-weight:bold;
                      "
                    >
                      Company
                    </td>

                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                      "
                    >
                      ${safeCompany}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                        font-weight:bold;
                      "
                    >
                      Email
                    </td>

                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                      "
                    >
                      ${safeEmail}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                        font-weight:bold;
                      "
                    >
                      Phone
                    </td>

                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                      "
                    >
                      ${safePhone}
                    </td>
                  </tr>

                </table>

                <!-- PRODUCT DETAILS -->

                <h3
                  style="
                    color:#d90000;
                    border-bottom:2px solid #d90000;
                    padding-bottom:8px;
                    margin-top:30px;
                  "
                >
                  Product Details
                </h3>

                <table
                  style="
                    width:100%;
                    border-collapse:collapse;
                  "
                >

                  <tr>
                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                        font-weight:bold;
                        width:35%;
                      "
                    >
                      Product
                    </td>

                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                      "
                    >
                      ${safeProduct}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                        font-weight:bold;
                      "
                    >
                      Model
                    </td>

                    <td
                      style="
                        padding:10px;
                        border:1px solid #dddddd;
                      "
                    >
                      ${safeModel}
                    </td>
                  </tr>

                </table>

                <!-- MESSAGE -->

                <h3
                  style="
                    color:#d90000;
                    border-bottom:2px solid #d90000;
                    padding-bottom:8px;
                    margin-top:30px;
                  "
                >
                  Customer Message
                </h3>

                <div
                  style="
                    background:#f7f7f7;
                    border-left:4px solid #d90000;
                    padding:15px;
                    line-height:1.7;
                  "
                >
                  ${safeMessage}
                </div>

                <!-- FOOTER MESSAGE -->

                <p
                  style="
                    margin-top:30px;
                    font-size:13px;
                    color:#777777;
                  "
                >
                  This enquiry has been saved in the
                  Crystal VMM Admin Dashboard.
                </p>

              </div>

              <!-- FOOTER -->

              <div
                style="
                  background:#f5f5f5;
                  padding:18px;
                  text-align:center;
                  color:#777777;
                  font-size:12px;
                "
              >
                Crystal VMM | ArmaTech Associates
              </div>

            </div>

          </body>
        </html>
      `,
    })

    // ========================================================
    // 11. CHECK COMPANY EMAIL
    // ========================================================

    if (companyEmail.error) {
      console.error(
        "Company email error:",
        companyEmail.error
      )

      // Database was successfully saved,
      // so don't pretend the enquiry was lost.

      return NextResponse.json(
        {
          success: true,
          saved: true,
          emailSent: false,
          customerEmailSent: false,
          enquiryId: result.insertedId.toString(),
          message:
            "Your enquiry was received successfully. Our team will get back to you shortly.",
        },
        { status: 201 }
      )
    }

    console.log("Company email sent successfully.")

    // ========================================================
    // 12. SEND THANK-YOU EMAIL TO CUSTOMER
    // ========================================================

    const customerEmail = await resend.emails.send({
      from: fromEmail,

      to: [email],

      subject:
        "Thank You for Your Enquiry - Crystal VMM",

      html: `
        <!DOCTYPE html>

        <html>
          <body
            style="
              margin:0;
              padding:0;
              background:#f5f5f5;
              font-family:Arial,Helvetica,sans-serif;
              color:#222222;
            "
          >

            <div
              style="
                max-width:650px;
                margin:30px auto;
                background:#ffffff;
                border:1px solid #dddddd;
              "
            >

              <!-- HEADER -->

              <div
                style="
                  background:#d90000;
                  padding:28px;
                  text-align:center;
                "
              >

                <h1
                  style="
                    margin:0;
                    color:#ffffff;
                    font-size:28px;
                  "
                >
                  Crystal VMM
                </h1>

                <p
                  style="
                    margin:8px 0 0;
                    color:#ffffff;
                    font-size:14px;
                  "
                >
                  ArmaTech Associates
                </p>

              </div>

              <!-- CONTENT -->

              <div style="padding:35px;">

                <h2
                  style="
                    margin-top:0;
                    color:#d90000;
                    font-size:24px;
                  "
                >
                  Thank You, ${safeName}!
                </h2>

                <p
                  style="
                    font-size:16px;
                    line-height:1.7;
                  "
                >
                  Thank you for submitting your enquiry
                  to <strong>Crystal VMM</strong>.
                </p>

                <p
                  style="
                    font-size:16px;
                    line-height:1.7;
                  "
                >
                  We have successfully received your
                  request. Our team will review your
                  requirements and get back to you shortly.
                </p>

                <!-- PRODUCT DETAILS -->

                <div
                  style="
                    margin-top:30px;
                    border:1px solid #dddddd;
                  "
                >

                  <div
                    style="
                      background:#f3f3f3;
                      padding:15px 20px;
                      border-bottom:1px solid #dddddd;
                    "
                  >

                    <h3
                      style="
                        margin:0;
                        color:#d90000;
                        font-size:18px;
                      "
                    >
                      Product Details
                    </h3>

                  </div>

                  <div style="padding:20px;">

                    <table
                      style="
                        width:100%;
                        border-collapse:collapse;
                      "
                    >

                      <tr>
                        <td
                          style="
                            padding:10px 0;
                            font-weight:bold;
                            width:35%;
                          "
                        >
                          Product
                        </td>

                        <td style="padding:10px 0;">
                          ${safeProduct}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:10px 0;
                            font-weight:bold;
                          "
                        >
                          Model
                        </td>

                        <td style="padding:10px 0;">
                          ${safeModel}
                        </td>
                      </tr>

                    </table>

                  </div>

                </div>

                <!-- ADDITIONAL MESSAGE -->

                <p
                  style="
                    margin-top:30px;
                    font-size:15px;
                    line-height:1.7;
                  "
                >
                  Our team will contact you using the
                  contact information provided in your
                  enquiry.
                </p>

                <p
                  style="
                    margin-top:30px;
                    font-size:15px;
                    line-height:1.7;
                  "
                >
                  Regards,<br />

                  <strong>
                    Crystal VMM Team
                  </strong>

                  <br />

                  ArmaTech Associates
                </p>

              </div>

              <!-- FOOTER -->

              <div
                style="
                  background:#f5f5f5;
                  padding:18px;
                  text-align:center;
                  color:#777777;
                  font-size:12px;
                "
              >
                Thank you for choosing Crystal VMM.
              </div>

            </div>

          </body>
        </html>
      `,
    })

    // ========================================================
    // 13. CUSTOMER EMAIL ERROR
    // ========================================================

    if (customerEmail.error) {
      console.error(
        "Customer email error:",
        customerEmail.error
      )

      return NextResponse.json(
        {
          success: true,
          saved: true,
          emailSent: true,
          customerEmailSent: false,
          enquiryId: result.insertedId.toString(),
          message:
            "Thank you for submitting your enquiry. Our team will get back to you shortly.",
        },
        { status: 201 }
      )
    }

    console.log(
      "Customer thank-you email sent successfully."
    )

    // ========================================================
    // 14. SUCCESS
    // ========================================================

    return NextResponse.json(
      {
        success: true,
        saved: true,
        emailSent: true,
        customerEmailSent: true,
        enquiryId: result.insertedId.toString(),
        message:
          "Thank you for submitting your enquiry. Our team will get back to you shortly.",
      },
      { status: 201 }
    )
  } catch (error) {
    // ========================================================
    // 15. ERROR HANDLING
    // ========================================================

    console.error(
      "Enquiry submission error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to process your enquiry at this time. Please try again later.",
      },
      { status: 500 }
    )
  }
}

// ============================================================
// GET
// FETCH ENQUIRIES
// ============================================================

export async function GET() {
  try {
    const client = await clientPromise

    // IMPORTANT:
    // Explicitly use crystal_vmm database.

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
    console.error(
      "Get enquiries error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch enquiries.",
      },
      { status: 500 }
    )
  }
}