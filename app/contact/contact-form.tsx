"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { products } from "@/lib/catalog"
import { CONTACT, ADDRESS, mailtoHref, telHref } from "@/lib/site"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ContactForm() {
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")
  const productParam = searchParams.get("product")
  const modelParam = searchParams.get("model")

  const [selectedMachine, setSelectedMachine] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [message, setMessage] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (intent === "free-inspection") {
      setSelectedMachine("Free Part Inspection")
      setMessage(
        "Hi Armatech Team,\n\nI am interested in the Free Part Inspection offer. I would like to schedule an appointment to bring my parts to your Bhosari facility.\n\nPlease let me know the next available slot."
      )
    }

    if (productParam) {
      const matchedProduct = products.find((p) => p.slug === productParam)

      if (matchedProduct) {
        setSelectedMachine(matchedProduct.name)
      }
    }

    if (modelParam) {
      setSelectedModel(modelParam)
    }
  }, [intent, productParam, modelParam])

  const currentMachine = products.find((p) => p.name === selectedMachine)
  const availableModels = currentMachine ? currentMachine.variants : []

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMsg("")

    const formData = new FormData(event.currentTarget)

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      product: selectedMachine || "General enquiry",
      productSlug: currentMachine?.slug ?? "",
      model: selectedModel,
      website: formData.get("website"),
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => ({}))
      if (result.message === "Thank you.") {
        setIsSuccess(true) // Treat honeypot hit as success so bots don't learn
        return
      }

      if (response.ok && result.success && result.saved === true) {
        setIsSuccess(true)
      } else {
        setErrorMsg(
          result.error ||
            result.message ||
            `Submission failed (HTTP ${response.status}). Please try again or call us.`
        )
      }
    } catch (err) {
      console.error("Enquiry submit failed:", err)
      setErrorMsg(
        "Could not reach the server. Please check your connection and try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-5 py-20">
        <div className="max-w-lg rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-neutral-950">
            Request Received
          </h1>
          <p className="mb-8 text-neutral-600">
            Thank you for contacting Armatech Associates. Our engineering team
            will review your inquiry and get back to you within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-50 pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Get in Touch
          </p>
          <h1 className="mb-4 text-4xl font-black uppercase tracking-tight text-neutral-950 sm:text-5xl">
            Contact Our Engineers
          </h1>
          <p className="text-lg text-neutral-600">
            Need a quotation, technical guidance, or want to schedule a machine
            demonstration? Send us a message and our Pune team will assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN: CONTACT INFO & MAP */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 border-b border-neutral-100 pb-4 text-lg font-bold text-neutral-950">
                Head Office
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Armatech Associates</p>
                    <p className="mt-1 text-sm text-neutral-600">
                      {ADDRESS.lines[0]}
                      <br />
                      {ADDRESS.lines[1]}
                      <br />
                      {ADDRESS.lines[2]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Phone</p>
                    <a
                      href={telHref(CONTACT.landlines[0])}
                      className="mt-1 block text-sm text-neutral-600 hover:text-red-600"
                    >
                      {CONTACT.landlines[0]}
                    </a>
                    <a
                      href={telHref(CONTACT.landlines[1])}
                      className="block text-sm text-neutral-600 hover:text-red-600"
                    >
                      {CONTACT.landlines[1]}
                    </a>
                    <a
                      href={telHref(CONTACT.mobile)}
                      className="block text-sm text-neutral-600 hover:text-red-600"
                    >
                      {CONTACT.mobile} (Mobile)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Email</p>
                    <a
                      href={mailtoHref()}
                      className="mt-1 block break-all text-sm text-neutral-600 hover:text-red-600"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Business Hours</p>
                    <p className="mt-1 text-sm text-neutral-600">
                      {CONTACT.hours[0]}
                      <br />
                      <span className="font-semibold text-red-600">
                        {CONTACT.hours[1]}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[300px] overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.264810296517!2d73.83344887465486!3d18.636123365635218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b873ffffffff%3A0x84ade136cd0a8c34!2sArmatech%20Associates!5e1!3m2!1sen!2sin!4v1794047985648!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "0.75rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Armatech Associates location on Google Maps"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-neutral-950">
                Send an Inquiry
              </h2>

              {errorMsg && (
                <div className="mb-6 rounded-r-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm font-medium text-red-800">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                    >
                      Full Name *
                    </label>
                    <input
                      required
                      id="name"
                      name="name"
                      type="text"
                      className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                    >
                      Business Email *
                    </label>
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                    >
                      Phone Number *
                    </label>
                    <input
                      required
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                    >
                      Company Name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="machine"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                    >
                      Machine Series
                    </label>
                    <select
                      id="machine"
                      name="machine"
                      value={selectedMachine}
                      onChange={(event) => {
                        setSelectedMachine(event.target.value)
                        setSelectedModel("")
                      }}
                      className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    >
                      <option value="" disabled>
                        Select a machine...
                      </option>
                      <option value="Free Part Inspection">Free Part Inspection</option>
                      {products.map((product) => (
                        <option key={product.slug} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {currentMachine && (
                    <div>
                      <label
                        htmlFor="model"
                        className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                      >
                        Specific Model
                      </label>
                      <select
                        id="model"
                        name="model"
                        value={selectedModel}
                        onChange={(event) => setSelectedModel(event.target.value)}
                        className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      >
                        <option value="" disabled>
                          Select a model...
                        </option>
                        {availableModels.map((variant) => (
                          <option key={variant.model} value={variant.model}>
                            {variant.model}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                  >
                    Your Message *
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={6}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    placeholder="How can we help you? Please include part dimensions if requesting an inspection."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
