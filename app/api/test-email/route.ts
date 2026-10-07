import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.ADMIN_EMAIL

    if (!apiKey || !adminEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY or ADMIN_EMAIL is missing.",
        },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: "Crystal VMM <onboarding@resend.dev>",
      to: [adminEmail],
      subject: "Crystal VMM - Test Email",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #e30613;">
            Crystal VMM Email Test
          </h2>

          <p>
            This is a test email from your Crystal VMM website.
          </p>

          <p>
            If you received this email, your Resend integration
            is working correctly.
          </p>

          <hr />

          <p>
            <strong>Status:</strong> Email system working
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully.",
      id: data?.id,
    })
  } catch (error) {
    console.error("Test email error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Unable to send test email.",
      },
      { status: 500 }
    )
  }
}