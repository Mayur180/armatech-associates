"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
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

  /* =========================================================
     READ PRODUCT + MODEL FROM URL
     
     Example:
     /contact?product=cnc-auto-vmm&model=AA-9031A
  ========================================================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const requestedProduct = params.get("product")
    const requestedModel = params.get("model")

    /*
     * Find product using its slug.
     */
    const requested = products.find(
      (product) => product.slug === requestedProduct
    )

    if (!requested) {
      return
    }

    /*
     * Set selected product.
     */
    setProductSlug(requested.slug)

    /*
     * Find exact requested model.
     */
    const requestedVariant = requested.variants.find(
      (variant) => variant.model === requestedModel
    )

    if (requestedVariant) {
      /*
       * Exact model selected from product page.
       */
      setModel(requestedVariant.model)
    } else {
      /*
       * Product exists but no valid model was supplied.
       * Select first model of that product.
       */
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
     CURRENT VARIANT / MODEL
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

    /*
     * Automatically select first model
     * when product changes.
     */
    setModel(
      selectedProduct.variants[0]?.model ?? ""
    )
  }

  /* =========================================================
     MODEL CHANGE
  ========================================================= */

  function handleModelChange(
    newModel: string
  ) {
    setModel(newModel)
  }

  /* =========================================================
     FORM SUBMIT / VALIDATION
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

  function handleSubmit() {
    setSubmitted(true)
  }

  /* =========================================================
     SUCCESS PAGE
  ========================================================= */

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto flex min-h-[80vh] max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full border border-border p-8 text-center sm:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-8" />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Request received
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
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
              Our team will contact you using the information
              provided.
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

  /* =========================================================
     REVIEW PAGE
  ========================================================= */

  if (showReview) {
    return (
      <main className="min-h-screen bg-background">
        {/* HEADER */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setShowReview(false)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Edit request
            </button>
          </div>
        </section>

        {/* REVIEW */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Step 2
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Review your request
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Please check the information below before sending
              your quotation request.
            </p>
          </div>

          {/* PRODUCT */}
          <div className="border border-border">
            <div className="border-b border-border bg-muted/20 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-widest">
                Selected product
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Product
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {product?.name}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Model
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {variant?.model}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Category
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {product?.category}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Travel
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {variant?.travel}
                </p>
              </div>
            </div>
          </div>

          {/* CUSTOMER */}
          <div className="mt-6 border border-border">
            <div className="border-b border-border bg-muted/20 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-widest">
                Contact information
              </p>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Name
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {name}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Company
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {company || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Email
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {email}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Phone
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {phone}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Message
                </p>

                <p className="mt-1 whitespace-pre-wrap text-sm font-semibold">
                  {message || "No additional message"}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setShowReview(false)}
              className="inline-flex items-center justify-center gap-2 border border-border px-6 py-4 text-xs font-bold uppercase tracking-widest transition hover:border-primary hover:text-primary"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
            >
              Send request
              <Send className="size-4" />
            </button>
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
          HEADER
      ====================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to products
          </Link>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Request a quotation
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us what you need
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Select your required product and model, then provide
            your contact information. Our team will get back to
            you with pricing and technical details.
          </p>
        </div>
      </section>

      {/* =====================================================
          FORM
      ====================================================== */}

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <form
          onSubmit={handleContinue}
          className="space-y-8"
        >
          {/* =================================================
              PRODUCT SELECTION
          ================================================== */}

          <div className="border border-border">
            <div className="border-b border-border bg-muted/20 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-widest">
                01 — Product selection
              </p>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-2">
              {/* PRODUCT */}
              <div>
                <label
                  htmlFor="product"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
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
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Selected configuration
                    </p>

                    <h2 className="mt-1 text-lg font-bold">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Model:{" "}
                      <span className="font-semibold text-foreground">
                        {variant.model}
                      </span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
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

          {/* =================================================
              CONTACT INFORMATION
          ================================================== */}

          <div className="border border-border">
            <div className="border-b border-border bg-muted/20 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-widest">
                02 — Contact information
              </p>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-2">
              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
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
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
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
                  className="h-12 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
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
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
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
                  className="h-12 w-full border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              {/* MESSAGE */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="Tell us about your requirement..."
                  rows={6}
                  className="w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              SUBMIT
          ================================================== */}

          <div className="flex flex-col items-start justify-between gap-5 border-t border-border pt-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-xs leading-5 text-muted-foreground">
              By continuing, you can review your quotation request
              before it is submitted.
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
            >
              Review request
              <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}