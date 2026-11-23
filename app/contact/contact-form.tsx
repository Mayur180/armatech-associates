"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { products } from "@/lib/catalog"
import { CONTACT, ADDRESS, mailtoHref, telHref } from "@/lib/site"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const fieldClass =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
const labelClass =
  "mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground"

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

    if (intent === "service") {
      setMessage(
        "Service request:\n\nMachine model:\nSerial number (if known):\nWhat is happening:\n\nPlease call back to discuss the next step."
      )
    }

    if (intent === "help-choose") {
      setMessage(
        "I need help choosing a machine.\n\nParts to measure:\nSmallest feature and tolerance:\nParts per shift:\n\nPlease suggest a configuration."
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
      hp_field: formData.get("website"),
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
      <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
        <div className="w-full max-w-md border border-border bg-background p-8">
          <div className="flex h-10 w-10 items-center justify-center border border-border bg-secondary text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            Enquiry received
          </p>
          <h1 className="mt-3 font-mono text-2xl font-bold uppercase tracking-[-0.03em]">
            Request received.
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Thank you for contacting Armatech Associates. Our engineering team
            will review your enquiry and respond within one working day. If it is
            urgent, call the office directly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Return home
            </Link>
            <a
              href={telHref(CONTACT.landlines[0])}
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
            >
              {CONTACT.landlines[0]}
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* HEADER */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Contact / Quotation
          </p>
          <h1 className="mt-4 max-w-3xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            Send the part.
            <br />
            Get the right machine.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Send the features and tolerances you need to measure, or ask for a
            demonstration at the Bhosari facility. Enquiries reach the Pune office
            directly.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl border-x border-b border-border lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT: OFFICE DETAILS */}
          <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Office &amp; facility
            </p>

            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Address
                  </p>
                  <p className="mt-1.5 text-sm leading-6">
                    Armatech Associates
                    {ADDRESS.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Phone
                  </p>
                  <p className="mt-1.5 text-sm leading-6">
                    <a href={telHref(CONTACT.landlines[0])} className="block transition-colors hover:text-primary">
                      {CONTACT.landlines[0]}
                    </a>
                    <a href={telHref(CONTACT.landlines[1])} className="block transition-colors hover:text-primary">
                      {CONTACT.landlines[1]}
                    </a>
                    <a href={telHref(CONTACT.mobile)} className="block transition-colors hover:text-primary">
                      {CONTACT.mobile} (Mobile)
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Email
                  </p>
                  <a
                    href={mailtoHref()}
                    className="mt-1.5 block break-all text-sm transition-colors hover:text-primary"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Hours
                  </p>
                  <p className="mt-1.5 text-sm leading-6">
                    {CONTACT.hours[0]}
                    <br />
                    <span className="text-primary">{CONTACT.hours[1]}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.264810296517!2d73.83344887465486!3d18.636123365635218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b873ffffffff%3A0x84ade136cd0a8c34!2sArmatech%20Associates!5e1!3m2!1sen!2sin!4v1794047985648!5m2!1sen!2sin"
                className="block h-[240px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Armatech Associates location on Google Maps"
              />
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="p-6 lg:p-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Enquiry form
              </p>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                * Required
              </span>
            </div>

            <div className="mt-5 border border-border bg-secondary p-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                What to send
              </p>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">
                {[
                  "Largest part envelope and material",
                  "Features and tolerances to measure",
                  "Parts per shift or per month",
                  "Probe, fixture or CAD comparison requirements",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                A drawing reference helps; we will ask for the file by email.
              </p>
            </div>

            {errorMsg && (
              <div className="mt-5 border-l-2 border-primary bg-primary/5 p-3 text-xs leading-5 text-foreground">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name *
                  </label>
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    className={fieldClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Business email *
                  </label>
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className={fieldClass}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone number *
                  </label>
                  <input
                    required
                    id="phone"
                    name="phone"
                    type="tel"
                    className={fieldClass}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className={fieldClass}
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="machine" className={labelClass}>
                    Machine series
                  </label>
                  <select
                    id="machine"
                    name="machine"
                    value={selectedMachine}
                    onChange={(event) => {
                      setSelectedMachine(event.target.value)
                      setSelectedModel("")
                    }}
                    className={fieldClass}
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
                    <label htmlFor="model" className={labelClass}>
                      Specific model
                    </label>
                    <select
                      id="model"
                      name="model"
                      value={selectedModel}
                      onChange={(event) => setSelectedModel(event.target.value)}
                      className={fieldClass}
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
                <label htmlFor="message" className={labelClass}>
                  Your message *
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={fieldClass}
                  placeholder="How can we help? Include part dimensions and tolerances if you are asking for an inspection."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
