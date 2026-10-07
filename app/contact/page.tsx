"use client"

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import Link from "next/link"

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react"

import { products } from "@/lib/catalog"

export default function ContactPage() {
  // ============================================================
  // DEFAULT PRODUCT
  // ============================================================

  const defaultProduct = products[0]

  const [productSlug, setProductSlug] = useState(
    defaultProduct?.slug ?? ""
  )

  const [model, setModel] = useState(
    defaultProduct?.variants[0]?.model ?? ""
  )

  // ============================================================
  // CUSTOMER FORM
  // ============================================================

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  // ============================================================
  // PAGE STATE
  // ============================================================

  const [showReview, setShowReview] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // ============================================================
  // SUBMISSION STATE
  // ============================================================

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // ============================================================
  // FORM REF
  // ============================================================

  const quoteFormRef = useRef<HTMLElement | null>(null)

  // ============================================================
  // READ PRODUCT + MODEL FROM URL
  //
  // Example:
  // /contact?product=manual-vmm&model=AA-9011M
  // ============================================================

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

    // ------------------------------------------------------------
    // SELECT PRODUCT
    // ------------------------------------------------------------

    setProductSlug(requested.slug)

    // ------------------------------------------------------------
    // SELECT MODEL
    // ------------------------------------------------------------

    const requestedVariant = requested.variants.find(
      (variant) => variant.model === requestedModel
    )

    if (requestedVariant) {
      setModel(requestedVariant.model)
    } else {
      setModel(
        requested.variants[0]?.model ?? ""
      )
    }

    // ------------------------------------------------------------
    // SCROLL TO QUOTATION FORM
    // ------------------------------------------------------------

    requestAnimationFrame(() => {
      setTimeout(() => {
        quoteFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 150)
    })
  }, [])

  // ============================================================
  // RESET SCROLL WHEN OPENING REVIEW / SUCCESS
  // ============================================================

  useEffect(() => {
    if (showReview || submitted) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        })
      })
    }
  }, [showReview, submitted])

  // ============================================================
  // CURRENT PRODUCT
  // ============================================================

  const product = useMemo(() => {
    return (
      products.find(
        (item) => item.slug === productSlug
      ) ?? defaultProduct
    )
  }, [productSlug, defaultProduct])

  // ============================================================
  // CURRENT VARIANT
  // ============================================================

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

  // ============================================================
  // PRODUCT CHANGE
  // ============================================================

  function handleProductChange(
    newProductSlug: string
  ) {
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

  // ============================================================
  // MODEL CHANGE
  // ============================================================

  function handleModelChange(newModel: string) {
    setModel(newModel)
  }

  // ============================================================
  // PHONE INPUT
  //
  // Allows:
  // 9876543210
  // 98765 43210
  // 98765-43210
  // +91 9876543210
  // +919876543210
  //
  // Prevents letters and unsupported characters.
  // ============================================================

  function handlePhoneChange(value: string) {
    const cleaned = value.replace(/[^\d+\s-]/g, "")

    // Only allow + at the beginning
    const formatted = cleaned.replace(
      /(\+.*)\+/g,
      "$1"
    )

    setPhone(formatted.slice(0, 16))
  }

  // ============================================================
  // PHONE VALIDATION
  // ============================================================

  function isValidPhoneNumber(value: string) {
    const normalizedPhone = value
      .replace(/[\s-]/g, "")
      .trim()

    /*
     * Valid formats:
     *
     * 9876543210
     * +919876543210
     *
     * Indian mobile numbers:
     * 6XXXXXXXXX
     * 7XXXXXXXXX
     * 8XXXXXXXXX
     * 9XXXXXXXXX
     */

    const phoneRegex =
      /^(?:\+91)?[6-9]\d{9}$/

    return phoneRegex.test(normalizedPhone)
  }

  // ============================================================
  // FORM SUBMIT / VALIDATION
  //
  // Opens review screen only after all validation passes.
  // ============================================================

  function handleContinue(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setSubmitError("")

    // ------------------------------------------------------------
    // NAME
    // ------------------------------------------------------------

    if (!name.trim()) {
      alert("Please enter your name.")
      return
    }

    // ------------------------------------------------------------
    // COMPANY
    // ------------------------------------------------------------

    if (!company.trim()) {
      alert("Please enter your company name.")
      return
    }

    // ------------------------------------------------------------
    // EMAIL
    // ------------------------------------------------------------

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

    // ------------------------------------------------------------
    // PHONE
    // ------------------------------------------------------------

    if (!phone.trim()) {
      alert("Please enter your phone number.")
      return
    }

    if (!isValidPhoneNumber(phone)) {
      alert(
        "Please enter a valid 10-digit Indian mobile number."
      )
      return
    }

    // ------------------------------------------------------------
    // PRODUCT + MODEL
    // ------------------------------------------------------------

    if (!product || !variant) {
      alert(
        "Please select a valid product and model."
      )
      return
    }

    // ------------------------------------------------------------
    // OPEN REVIEW
    // ------------------------------------------------------------

    setShowReview(true)

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      })
    })
  }

  // ============================================================
  // FINAL SUBMIT
  //
  // Sends enquiry to:
  // POST /api/enquiries
  // ============================================================

  async function handleSubmit() {
    if (submitting) {
      return
    }

    if (!product || !variant) {
      setSubmitError(
        "Please select a valid product and model."
      )
      return
    }

    // Extra protection before sending to backend
    if (!isValidPhoneNumber(phone)) {
      setSubmitError(
        "Please enter a valid 10-digit Indian mobile number."
      )
      return
    }

    setSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch(
        "/api/enquiries",
        {
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

            product: product.name,
            productSlug: product.slug,
            model: variant.model,
          }),
        }
      )

      let data: {
        success?: boolean
        error?: string
        message?: string
        enquiryId?: string
      } = {}

      try {
        data = await response.json()
      } catch {
        throw new Error(
          "The server returned an invalid response."
        )
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to submit your enquiry."
        )
      }

      console.log(
        "Enquiry submitted successfully:",
        data
      )

      setSubmitted(true)

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        })
      })
    } catch (error) {
      console.error(
        "Enquiry submission error:",
        error
      )

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit your enquiry. Please try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  // ============================================================
  // SUCCESS PAGE
  // ============================================================

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto flex min-h-[80vh] max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full border border-border bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-8" />
            </div>

            <p className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Request received
            </p>

            <h1 className="mt-3 font-mono text-3xl font-bold uppercase tracking-tight">
              Thank you, {name}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
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
              Our team will contact you using the
              information provided.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-xs font-bold uppercase tracking-widest transition hover:border-primary hover:text-primary"
              >
                View products
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  // ============================================================
  // REVIEW PAGE
  // ============================================================

  if (showReview) {
    return (
      <main className="min-h-screen bg-background">

        {/* REVIEW HEADER */}

        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => {
                setShowReview(false)
                requestAnimationFrame(() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto",
                  })
                })
              }}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              Edit request
            </button>
          </div>
        </section>

        {/* REVIEW CONTENT */}

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="mb-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Step 02
            </p>

            <h1 className="mt-2 font-mono text-3xl font-bold uppercase tracking-tight">
              Review your request
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Please check the information below
              before sending your quotation request.
            </p>
          </div>

          {/* SELECTED PRODUCT */}

          <div className="border border-border bg-white">
            <div className="border-b border-border bg-muted/20 px-5 py-4">
              <p className="font-mono text-xs font-bold uppercase tracking-widest">
                Selected product
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2">

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Product
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {product?.name}
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Model
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {variant?.model}
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Category
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {product?.category}
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Travel
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {variant?.travel}
                </p>
              </div>

            </div>
          </div>

          {/* CUSTOMER INFORMATION */}

          <div className="mt-6 border border-border bg-white">
            <div className="border-b border-border bg-muted/20 px-5 py-4">
              <p className="font-mono text-xs font-bold uppercase tracking-widest">
                Contact information
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2">

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Name
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {name}
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Company
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {company || "Not provided"}
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-semibold">
                  {email}
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Phone
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {phone}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Message
                </p>

                <p className="mt-1 whitespace-pre-wrap text-sm font-semibold">
                  {message || "No additional message"}
                </p>
              </div>

            </div>
          </div>

          {/* ERROR */}

          {submitError && (
            <div className="mt-6 border border-red-500/30 bg-red-50 px-5 py-4">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-red-600">
                Submission failed
              </p>

              <p className="mt-2 text-sm leading-6 text-red-600">
                {submitError}
              </p>

              <p className="mt-2 text-xs text-red-500">
                Your enquiry has not been marked as
                successfully submitted. Please try again.
              </p>
            </div>
          )}

          {/* ACTIONS */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              disabled={submitting}
              onClick={() => {
                setShowReview(false)
                setSubmitError("")

                requestAnimationFrame(() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto",
                  })
                })
              }}
              className="inline-flex items-center justify-center gap-2 border border-border px-6 py-4 text-xs font-bold uppercase tracking-widest transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Sending..."
                : "Send request"}

              {!submitting && (
                <Send className="size-4" />
              )}
            </button>

          </div>

        </section>
      </main>
    )
  }

  // ============================================================
  // MAIN CONTACT PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-background">

      {/* ========================================================
          SECTION 01 — NORMAL CONTACT INFORMATION
      ======================================================== */}

      <section className="relative overflow-hidden border-b border-border bg-white">

        {/* TECHNICAL GRID */}

        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(rgba(17,17,17,.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17,17,17,.035) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="grid gap-10 lg:grid-cols-[.9fr_1.6fr] lg:items-center">

            {/* HERO TEXT */}

            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  Contact ArmaTech
                </p>
              </div>

              <h1 className="mt-6 max-w-xl font-mono text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
                Let's find the{" "}
                <span className="text-primary">
                  right solution.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                Tell us about your measurement
                requirement, select the system you are
                interested in, and our team will help you
                with the right precision measurement
                solution.
              </p>

            </div>

            {/* CONTACT CARDS */}

            <div className="grid gap-4 md:grid-cols-3">

              {/* LOCATION */}

              <div className="border border-border bg-white p-6">
                <MapPin className="size-6 text-primary" />

                <p className="mt-5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Location
                </p>

                <h2 className="mt-3 font-mono text-sm font-bold uppercase">
                  ArmaTech Associates
                </h2>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  W-174 A, 'S' Block, M.I.D.C.,
                  <br />
                  Bhosari Industrial Estate,
                  <br />
                  Pune - 411 026,
                  <br />
                  Maharashtra, India
                </p>
              </div>

              {/* WORKING HOURS */}

              <div className="border border-border bg-white p-6">
                <Clock3 className="size-6 text-primary" />

                <p className="mt-5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Working hours
                </p>

                <h2 className="mt-3 font-mono text-sm font-bold uppercase">
                  Business hours
                </h2>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Monday - Sunday:
                  </span>{" "}
                  9:00 - 18:00
                </p>

                <p className="mt-2 text-sm font-semibold text-primary">
                  Thursday: Closed
                </p>
              </div>

              {/* ENQUIRY */}

              <div className="border border-border bg-white p-6">
                <Mail className="size-6 text-primary" />

                <p className="mt-5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Enquiry
                </p>

                <h2 className="mt-3 font-mono text-sm font-bold uppercase">
                  Request a quotation
                </h2>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Use the form below to tell us about
                  your product, model, and measurement
                  requirements.
                </p>

                <div className="mt-5 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-primary">
                  <Phone className="size-3" />
                  Technical assistance available
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 02 — PRODUCT QUOTATION FORM
      ======================================================== */}

      <section
        id="quote-form"
        ref={quoteFormRef}
        className="relative scroll-mt-24 overflow-hidden border-b border-border bg-background"
      >

        {/* TECHNICAL GRID */}

        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(rgba(17,17,17,.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17,17,17,.035) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">

          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">

            {/* ==================================================
                LEFT INFORMATION PANEL
            ================================================== */}

            <div className="border border-border bg-white p-7 sm:p-9">

              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Step 01
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />

                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary">
                  Enquiry
                </span>
              </div>

              <h2 className="mt-7 font-mono text-3xl font-black uppercase leading-[1] tracking-[-0.04em] sm:text-4xl">
                Tell us what you need.
              </h2>

              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                Select the measurement system and model
                you are interested in, then provide your
                contact information.
              </p>

              <div className="mt-10 border border-border">

                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    Response
                  </span>

                  <span className="text-sm font-semibold">
                    Technical quotation
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    Product range
                  </span>

                  <span className="text-sm font-semibold">
                    VMM / VMS
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    Location
                  </span>

                  <span className="text-sm font-semibold">
                    Pune, India
                  </span>
                </div>

              </div>

              <div className="mt-8 border-t border-border pt-6">

                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  Selected product
                </p>

                <p className="mt-2 font-mono text-sm font-bold uppercase">
                  {product?.name}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Model:{" "}
                  <span className="font-semibold text-primary">
                    {variant?.model}
                  </span>
                </p>

              </div>

            </div>

            {/* ==================================================
                RIGHT FORM
            ================================================== */}

            <form
              onSubmit={handleContinue}
              className="space-y-5"
            >

              {/* PRODUCT SELECTION */}

              <div className="border border-border bg-white">

                <div className="border-b border-border bg-muted/20 px-5 py-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest">
                    Product selection
                  </p>
                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-2">

                  {/* PRODUCT */}

                  <div>
                    <label
                      htmlFor="product"
                      className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-widest"
                    >
                      Product
                    </label>

                    <select
                      id="product"
                      value={productSlug}
                      onChange={(event) =>
                        handleProductChange(
                          event.target.value
                        )
                      }
                      className="h-12 w-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
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

                  {/* MODEL */}

                  <div>
                    <label
                      htmlFor="model"
                      className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-widest"
                    >
                      Model
                    </label>

                    <select
                      id="model"
                      value={model}
                      onChange={(event) =>
                        handleModelChange(
                          event.target.value
                        )
                      }
                      className="h-12 w-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
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

                {/* SELECTED CONFIGURATION */}

                {product && variant && (
                  <div className="border-t border-border bg-muted/10 p-5">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                          Selected configuration
                        </p>

                        <h2 className="mt-1 font-mono text-base font-bold uppercase">
                          {product.name}
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Model:{" "}
                          <span className="font-semibold text-primary">
                            {variant.model}
                          </span>
                        </p>

                      </div>

                      <div className="text-left sm:text-right">

                        <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                          Travel
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {variant.travel}
                        </p>

                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* CONTACT INFORMATION */}

              <div className="border border-border bg-white">

                <div className="border-b border-border bg-muted/20 px-5 py-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest">
                    Contact information
                  </p>
                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-2">

                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-widest"
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
                      className="h-12 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>

                  {/* COMPANY */}

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-widest"
                    >
                      Company *
                    </label>

                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(event) =>
                        setCompany(event.target.value)
                      }
                      placeholder="Company name"
                      className="h-12 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-widest"
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
                      className="h-12 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-widest"
                    >
                      Phone *
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) =>
                        handlePhoneChange(
                          event.target.value
                        )
                      }
                      placeholder="+91 XXXXX XXXXX"
                      maxLength={16}
                      className="h-12 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />

                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Enter a valid 10-digit Indian mobile number.
                    </p>
                  </div>

                  {/* MESSAGE */}

                  <div className="sm:col-span-2">

                    <label
                      htmlFor="message"
                      className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-widest"
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
                      className="w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />

                  </div>

                </div>
              </div>

              {/* SUBMIT */}

              <div className="border border-border bg-white p-5">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <p className="max-w-xl text-xs leading-5 text-muted-foreground">
                    By continuing, you can review your
                    quotation request before it is
                    submitted.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:-translate-y-0.5 hover:opacity-90"
                  >
                    Review request
                    <ArrowRight className="size-4" />
                  </button>

                </div>

              </div>

            </form>
          </div>
        </div>
      </section>
    </main>
  )
}