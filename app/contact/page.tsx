"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Send,
  Phone,
} from "lucide-react"

import { products } from "@/lib/catalog"

export default function ContactPage() {
  /* =========================================================
     DEFAULT PRODUCT
  ========================================================= */

  const defaultProduct = products[0]

  const [productSlug, setProductSlug] = useState(
    defaultProduct?.slug ?? ""
  )

  const [model, setModel] = useState(
    defaultProduct?.variants[0]?.model ?? ""
  )

  /* =========================================================
     CUSTOMER FORM
  ========================================================= */

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  /* =========================================================
     PAGE STATE
  ========================================================= */

  const [showReview, setShowReview] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  /* =========================================================
     READ PRODUCT + MODEL FROM URL
  ========================================================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const requestedProduct = params.get("product")
    const requestedModel = params.get("model")

    const requested = products.find(
      (product) => product.slug === requestedProduct
    )

    if (!requested) {
      return
    }

    setProductSlug(requested.slug)

    const requestedVariant = requested.variants.find(
      (variant) => variant.model === requestedModel
    )

    if (requestedVariant) {
      setModel(requestedVariant.model)
    } else {
      setModel(requested.variants[0]?.model ?? "")
    }
  }, [])

  /* =========================================================
     CURRENT PRODUCT
  ========================================================= */

  const product = useMemo(() => {
    return (
      products.find(
        (item) => item.slug === productSlug
      ) ?? defaultProduct
    )
  }, [productSlug, defaultProduct])

  /* =========================================================
     CURRENT VARIANT
  ========================================================= */

  const variant = useMemo(() => {
    if (!product) {
      return undefined
    }

    return (
      product.variants.find(
        (item) => item.model === model
      ) ?? product.variants[0]
    )
  }, [product, model])

  /* =========================================================
     PRODUCT CHANGE
  ========================================================= */

  function handleProductChange(newProductSlug: string) {
    const selectedProduct = products.find(
      (item) => item.slug === newProductSlug
    )

    if (!selectedProduct) {
      return
    }

    setProductSlug(selectedProduct.slug)

    setModel(
      selectedProduct.variants[0]?.model ?? ""
    )
  }

  /* =========================================================
     MODEL CHANGE
  ========================================================= */

  function handleModelChange(newModel: string) {
    setModel(newModel)
  }

  /* =========================================================
     FORM VALIDATION
  ========================================================= */

  function handleContinue(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (!name.trim()) {
      alert("Please enter your name.")
      return
    }

    if (!email.trim()) {
      alert("Please enter your email.")
      return
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address.")
      return
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.")
      return
    }

    if (!product || !variant) {
      alert("Please select a valid product and model.")
      return
    }

    setShowReview(true)
  }

  /* =========================================================
     FINAL SUBMIT
     
     Backend/API can be connected here later.
  ========================================================= */

  async function handleSubmit() {
  if (submitting) {
    return
  }

  setSubmitting(true)
  setSubmitError("")

  try {
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),

        product: product?.name ?? "",
        productSlug: product?.slug ?? "",
        model: variant?.model ?? "",
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "Unable to submit your enquiry."
      )
    }

    console.log("Enquiry submitted successfully:", data)

    setSubmitted(true)
  } catch (error) {
    console.error("Enquiry submission error:", error)

    setSubmitError(
      error instanceof Error
        ? error.message
        : "Unable to submit your enquiry. Please try again."
    )
  } finally {
    setSubmitting(false)
  }
}

  /* =========================================================
     SUCCESS PAGE
  ========================================================= */

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">

        {/* Technical grid */}
        <div
          className="pointer-events-none fixed inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(17,17,17,.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17,17,17,.045) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
        />

        <section className="relative mx-auto flex min-h-[80vh] max-w-4xl items-center px-5 py-16 lg:px-8">

          <div className="w-full border border-border bg-background p-8 text-center shadow-sm sm:p-14">

            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-9" />
            </div>

            <p className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Request received
            </p>

            <h1 className="mt-4 font-mono text-3xl font-black uppercase tracking-[-0.04em] sm:text-5xl">
              Thank you, {name}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Your quotation request for{" "}
              <span className="font-semibold text-foreground">
                {product?.name}
              </span>{" "}
              —{" "}
              <span className="font-semibold text-foreground">
                {variant?.model}
              </span>{" "}
              has been recorded.
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              Our team will contact you using the information provided.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 text-xs font-bold uppercase tracking-widest transition hover:border-primary hover:text-primary"
              >
                View products
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
              >
                Back to home
                <ArrowRight className="size-4" />
              </Link>

            </div>

          </div>

        </section>
      </main>
    )
  }

  /* =========================================================
     REVIEW PAGE
  ========================================================= */

  if (showReview) {
    return (
      <main className="min-h-screen bg-background">

        {/* Header */}
        <section className="border-b border-border bg-background">

          <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">

            <button
              type="button"
              onClick={() => setShowReview(false)}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              Edit request
            </button>

          </div>

        </section>


        {/* Review */}
        <section className="relative overflow-hidden">

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(rgba(17,17,17,.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(17,17,17,.04) 1px, transparent 1px)
              `,
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-5 py-16 lg:px-8">

            <div className="mb-12">

              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Step 02
              </p>

              <h1 className="mt-4 font-mono text-4xl font-black uppercase tracking-[-0.04em] sm:text-5xl">
                Review your request
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
                Please check the information below before sending
                your quotation request.
              </p>

            </div>


            {/* Product */}
            <div className="border border-border bg-background">

              <div className="border-b border-border bg-secondary px-6 py-5">

                <p className="font-mono text-xs font-bold uppercase tracking-widest">
                  01 — Selected product
                </p>

              </div>

              <div className="grid gap-7 p-6 sm:grid-cols-2">

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Product
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {product?.name}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Model
                  </p>

                  <p className="mt-2 font-mono text-sm font-bold text-primary">
                    {variant?.model}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Category
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {product?.category}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Travel
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {variant?.travel}
                  </p>
                </div>

              </div>

            </div>


            {/* Customer */}
            <div className="mt-6 border border-border bg-background">

              <div className="border-b border-border bg-secondary px-6 py-5">

                <p className="font-mono text-xs font-bold uppercase tracking-widest">
                  02 — Contact information
                </p>

              </div>

              <div className="grid gap-7 p-6 sm:grid-cols-2">

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Name
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {name}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Company
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {company || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {email}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Phone
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {phone}
                  </p>
                </div>

                <div className="sm:col-span-2">

                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Message
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-7">
                    {message || "No additional message"}
                  </p>

                </div>

              </div>

            </div>


            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => setShowReview(false)}
                className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest transition hover:border-primary hover:text-primary"
              >
                Edit
              </button>

              <button
  type="button"
  onClick={handleSubmit}
  disabled={submitting}
  className="inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
>
  {submitting ? "Sending..." : "Send request"}

  {!submitting && <Send className="size-4" />}
</button>
{submitError && (
  <div className="mt-6 border border-red-500/30 bg-red-500/5 px-6 py-4">
    <p className="font-mono text-xs font-bold uppercase tracking-widest text-red-600">
      Submission failed
    </p>

    <p className="mt-2 text-sm leading-6 text-red-600">
      {submitError}
    </p>

    <p className="mt-2 text-xs text-muted-foreground">
      Please check your internet connection and try again.
    </p>
  </div>
)}

{/* Actions */}
<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end"></div>
            </div>

          </div>

        </section>

      </main>
    )
  }

  /* =========================================================
     MAIN CONTACT PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-background">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-border">

        {/* Technical grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(rgba(17,17,17,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17,17,17,.05) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Red glow */}
        <div className="pointer-events-none absolute right-[5%] top-[10%] size-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

          <Link
            href="/products"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to products
          </Link>


          <div className="max-w-5xl">

            <div className="flex items-center gap-4">

              <span className="h-px w-12 bg-primary" />

              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-primary">
                Contact ArmaTech
              </p>

            </div>

            <h1 className="mt-7 font-mono text-4xl font-black uppercase leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">

              Let&apos;s find the
              <span className="block text-primary">
                right solution.
              </span>

            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              Tell us about your measurement requirement, select the
              system you are interested in, and our team will help
              you with the right precision measurement solution.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}
      <section className="border-b border-border">

        <div className="mx-auto grid max-w-7xl border-x border-border lg:grid-cols-3">

          {/* Address */}
          <div className="group border-b border-border p-7 transition-colors hover:bg-secondary lg:border-b-0 lg:border-r">

            <MapPin className="size-6 text-primary" />

            <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Location
            </p>

            <h2 className="mt-3 font-mono text-lg font-bold uppercase">
              ArmaTech Associates
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              W-17 A, &apos;S&apos; Block, M.I.D.C.,
              <br />
              Bhosari Industrial Estate,
              <br />
              Pune - 411 026,
              <br />
              Maharashtra, India
            </p>

          </div>


          {/* Working hours */}
          <div className="group border-b border-border p-7 transition-colors hover:bg-secondary lg:border-b-0 lg:border-r">

            <Clock3 className="size-6 text-primary" />

            <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Working hours
            </p>

            <h2 className="mt-3 font-mono text-lg font-bold uppercase">
              Business hours
            </h2>

            <div className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">

              <p>
                <span className="font-semibold text-foreground">
                  Monday - Sunday:
                </span>{" "}
                9:00 - 18:00
              </p>

              <p>
                <span className="font-semibold text-primary">
                  Thursday:
                </span>{" "}
                Closed
              </p>

            </div>

          </div>


          {/* Direct contact */}
          <div className="group p-7 transition-colors hover:bg-secondary">

            <Mail className="size-6 text-primary" />

            <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Enquiry
            </p>

            <h2 className="mt-3 font-mono text-lg font-bold uppercase">
              Request a quotation
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Use the form below to tell us about your product,
              model, and measurement requirements.
            </p>

            <div className="mt-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              <Phone className="size-4" />
              Technical assistance available
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FORM AREA
      ===================================================== */}
      <section className="relative overflow-hidden">

        {/* Technical grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(17,17,17,.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17,17,17,.04) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">

          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">


            {/* LEFT */}
            <div>

              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Step 01
              </p>

              <h2 className="mt-5 font-mono text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
                Tell us what you need.
              </h2>

              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                Select the measurement system and model you are
                interested in, then provide your contact information.
              </p>


              {/* Technical info */}
              <div className="mt-10 border-t border-border">

                <div className="flex justify-between gap-5 border-b border-border py-5">

                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Response
                  </span>

                  <span className="text-right text-xs font-semibold">
                    Technical quotation
                  </span>

                </div>

                <div className="flex justify-between gap-5 border-b border-border py-5">

                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Product range
                  </span>

                  <span className="text-right text-xs font-semibold">
                    VMM / VMS
                  </span>

                </div>

                <div className="flex justify-between gap-5 border-b border-border py-5">

                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Location
                  </span>

                  <span className="text-right text-xs font-semibold">
                    Pune, India
                  </span>

                </div>

              </div>

            </div>


            {/* RIGHT FORM */}
            <form
              onSubmit={handleContinue}
              className="space-y-7"
            >

              {/* Product */}
              <div className="border border-border bg-background">

                <div className="border-b border-border bg-secondary px-6 py-5">

                  <p className="font-mono text-xs font-bold uppercase tracking-widest">
                    Product selection
                  </p>

                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="product"
                      className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest"
                    >
                      Product
                    </label>

                    <select
                      id="product"
                      value={productSlug}
                      onChange={(event) =>
                        handleProductChange(event.target.value)
                      }
                      className="h-13 w-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                    >

                      {products.map((item) => (
                        <option
                          key={item.slug}
                          value={item.slug}
                        >
                          {item.name}
                        </option>
                      ))}

                    </select>

                  </div>


                  <div>

                    <label
                      htmlFor="model"
                      className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest"
                    >
                      Model
                    </label>

                    <select
                      id="model"
                      value={model}
                      onChange={(event) =>
                        handleModelChange(event.target.value)
                      }
                      className="h-13 w-full border border-border bg-background px-4 font-mono text-sm outline-none transition focus:border-primary"
                    >

                      {product?.variants.map((item) => (
                        <option
                          key={item.model}
                          value={item.model}
                        >
                          {item.model}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>


                {/* Selected configuration */}
                {product && variant && (
                  <div className="border-t border-border bg-secondary/50 p-6">

                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                      <div>

                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Selected configuration
                        </p>

                        <h3 className="mt-2 font-mono text-base font-bold uppercase">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-xs text-muted-foreground">
                          Model:{" "}
                          <span className="font-mono font-bold text-primary">
                            {variant.model}
                          </span>
                        </p>

                      </div>

                      <div className="sm:text-right">

                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Travel
                        </p>

                        <p className="mt-2 text-sm font-bold">
                          {variant.travel}
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              </div>


              {/* Contact information */}
              <div className="border border-border bg-background">

                <div className="border-b border-border bg-secondary px-6 py-5">

                  <p className="font-mono text-xs font-bold uppercase tracking-widest">
                    Contact information
                  </p>

                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-2">

                  {/* Name */}
                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest"
                    >
                      Full name *
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Enter your name"
                      className="h-13 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />

                  </div>


                  {/* Company */}
                  <div>

                    <label
                      htmlFor="company"
                      className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest"
                    >
                      Company
                    </label>

                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(event) =>
                        setCompany(event.target.value)
                      }
                      placeholder="Company name"
                      className="h-13 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />

                  </div>


                  {/* Email */}
                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest"
                    >
                      Email *
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@company.com"
                      className="h-13 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />

                  </div>


                  {/* Phone */}
                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest"
                    >
                      Phone *
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="h-13 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />

                  </div>


                  {/* Message */}
                  <div className="sm:col-span-2">

                    <label
                      htmlFor="message"
                      className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      value={message}
                      onChange={(event) =>
                        setMessage(event.target.value)
                      }
                      placeholder="Tell us about your measurement requirement..."
                      rows={6}
                      className="w-full resize-none border border-border bg-background px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />

                  </div>

                </div>

              </div>


              {/* Submit */}
              <div className="flex flex-col items-start justify-between gap-5 border-t border-border pt-7 sm:flex-row sm:items-center">

                <p className="max-w-lg text-xs leading-6 text-muted-foreground">
                  You will have an opportunity to review your
                  quotation request before submitting it.
                </p>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
                >
                  Review request
                  <ArrowRight className="size-4" />
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CONTACT CTA
      ===================================================== */}
      <section className="bg-primary px-5 py-16 text-primary-foreground lg:px-8 lg:py-20">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">

          <div>

            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em]">
              ArmaTech Associates
            </p>

            <h2 className="mt-4 max-w-2xl font-mono text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
              Precision measurement starts with the right conversation.
            </h2>

          </div>

          <Link
            href="/products"
            className="inline-flex shrink-0 items-center justify-center gap-3 bg-foreground px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-background transition hover:opacity-90"
          >
            Explore products
            <ArrowRight className="size-4" />
          </Link>

        </div>

      </section>

    </main>
  )
}