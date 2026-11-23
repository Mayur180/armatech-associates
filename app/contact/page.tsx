import type { Metadata } from "next"
import { Suspense } from "react"

import ContactForm from "./contact-form"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Us | Request a VMM Quotation",
  description:
    "Contact Armatech Associates in Bhosari, Pune for video measuring machine quotations, technical guidance and free part inspection appointments.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Armatech Associates | Crystal VMM",
    description:
      "Request a quotation, technical guidance or a free part inspection from our Pune team.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-neutral-50">
          <p className="text-sm font-semibold text-neutral-500">Loading contact form...</p>
        </main>
      }
    >
      <ContactForm />
    </Suspense>
  )
}
