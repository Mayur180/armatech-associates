import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Download } from "lucide-react"
import { notFound } from "next/navigation"

import ProductViewer from "@/components/ProductViewer"
import { getProduct, products } from "@/lib/catalog"

// ============================================================
// TYPES
// ============================================================

type Specification = {
  label: string
  values: string[]
}

// ============================================================
// STATIC PRODUCT PAGES
// ============================================================

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const rawProduct = getProduct(slug)

  if (!rawProduct) {
    notFound()
  }

  const product = rawProduct as typeof rawProduct & {
    specifications?: Specification[]
  }

  const specifications = product.specifications ?? []
  const modelCount = product.variants.length

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-background">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">

        {/* BACK */}

        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to catalogue
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">

          {/* ==================================================
              PRODUCT VIEWER
          ================================================== */}

          <ProductViewer
            image={product.image}
            name={product.name}
            badge={product.badge}
            model={product.variants[0]?.model}
          />

          {/* ==================================================
              PRODUCT INFORMATION
          ================================================== */}

          <div className="flex flex-col justify-center">

            <p className="font-mono text-xs font-bold uppercase tracking-[.22em] text-primary">
              {product.family}
            </p>

            <h1 className="mt-5 max-w-2xl font-mono text-4xl font-bold uppercase tracking-[-.05em] sm:text-6xl lg:text-7xl">
              {product.name}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">
              {product.summary}
            </p>

            {/* ==================================================
                AVAILABLE MODELS
            ================================================== */}

            <div className="mt-9">

              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                Available model series
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">

                {product.variants.map((variant, index) => (
                  <Link
                    key={variant.model}
                    href={`/contact?product=${encodeURIComponent(
                      product.slug
                    )}&model=${encodeURIComponent(
                      variant.model
                    )}`}
                    className={`group flex items-center justify-between border px-4 py-3 transition ${
                      index === 0
                        ? "border-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs font-bold tracking-widest">
                        {variant.model}
                      </span>

                      <span className="ml-2 text-xs text-muted-foreground">
                        {variant.travel} mm
                      </span>
                    </div>

                    <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}

              </div>

            </div>

            {/* ==================================================
                QUICK INFORMATION
            ================================================== */}

            <div className="mt-9 grid border-y border-border sm:grid-cols-2">

              <div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:pr-6">

                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Travel range
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {product.travel}
                </p>

              </div>

              <div className="py-5 sm:pl-6">

                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Configurations
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {modelCount} models
                </p>

              </div>

            </div>

            {/* ==================================================
                BUTTONS
            ================================================== */}

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                href={`/contact?product=${encodeURIComponent(
                  product.slug
                )}&model=${encodeURIComponent(
                  product.variants[0]?.model ?? ""
                )}`}
                className="inline-flex items-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
              >
                Request a quote

                <ArrowRight className="size-4" />
              </Link>

              <a
                href={product.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-border px-6 py-4 text-xs font-bold uppercase tracking-widest transition hover:border-primary hover:text-primary"
              >
                <Download className="size-4" />

                Download PDF
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          HIGHLIGHTS
      ====================================================== */}

      <section className="border-y border-border bg-secondary">

        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">

            <div>

              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                System architecture
              </p>

              <h2 className="mt-4 font-mono text-3xl font-bold uppercase tracking-[-.04em]">
                What is inside.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Designed around optical precision, repeatability and dependable
                dimensional inspection.
              </p>

            </div>

            <div className="grid border border-border bg-background sm:grid-cols-2">

              {product.highlights.map((highlight, index) => {

                const isLastRow =
                  index >=
                  product.highlights.length -
                    (product.highlights.length % 2 === 0 ? 2 : 1)

                return (
                  <div
                    key={highlight}
                    className={`flex gap-4 p-6 ${
                      !isLastRow
                        ? "border-b border-border"
                        : ""
                    } ${
                      index % 2 === 0
                        ? "sm:border-r sm:border-border"
                        : ""
                    }`}
                  >

                    <div className="flex size-8 shrink-0 items-center justify-center border border-primary/40">

                      <Check className="size-4 text-primary" />

                    </div>

                    <p className="text-sm font-semibold leading-6">
                      {highlight}
                    </p>

                  </div>
                )
              })}

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          COMPLETE TECHNICAL SPECIFICATIONS
      ====================================================== */}

      {specifications.length > 0 && (

        <section className="border-y border-border bg-secondary">

          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

            {/* ==================================================
                SECTION HEADER
            ================================================== */}

            <div className="mb-10">

              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                Technical specifications
              </p>

              <h2 className="mt-4 font-mono text-3xl font-bold uppercase tracking-[-.04em] sm:text-4xl">
                Complete specifications.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Technical information for every available model configuration.
              </p>

            </div>

            {/* ==================================================
                SPECIFICATION TABLE
            ================================================== */}

            <div className="overflow-x-auto border border-border bg-background">

              <table className="w-full min-w-[950px] border-collapse text-left">

                {/* ==================================================
                    TABLE HEADER
                ================================================== */}

                <thead>

                  <tr className="bg-foreground text-background">

                    <th className="w-[28%] px-5 py-4 text-left font-mono text-[11px] font-bold uppercase tracking-widest">
                      Item
                    </th>

                    {product.variants.map((variant) => (

                      <th
                        key={variant.model}
                        className="min-w-[180px] px-5 py-4 text-center font-mono text-[11px] font-bold uppercase tracking-widest"
                      >
                        {variant.model}
                      </th>

                    ))}

                  </tr>

                </thead>

                {/* ==================================================
                    TABLE BODY
                ================================================== */}

                <tbody>

                  {specifications.map(
                    (specification, specificationIndex) => (

                      <tr
                        key={specification.label}
                        className="border-t border-border align-top"
                      >

                        {/* ==================================================
                            SPECIFICATION NAME
                        ================================================== */}

                        <td className="bg-secondary px-5 py-4 font-semibold text-foreground">
                          {specification.label}
                        </td>

                        {/* ==================================================
                            MODEL VALUES
                        ================================================== */}

                        {product.variants.map(
                          (variant, variantIndex) => {

                            /*
                             * IMPORTANT:
                             *
                             * Each specification row contains
                             * one value for each model.
                             *
                             * Example:
                             *
                             * values: [
                             *   "200 × 100 × 150",
                             *   "300 × 200 × 200",
                             *   "400 × 300 × 200"
                             * ]
                             *
                             * index 0 → first model
                             * index 1 → second model
                             * index 2 → third model
                             */

                            const value =
                              specification.values[
                                variantIndex
                              ]

                            return (
                              <td
                                key={`${specification.label}-${variant.model}`}
                                className={`px-5 py-4 text-center text-sm leading-6 text-muted-foreground ${
                                  variantIndex <
                                  product.variants.length - 1
                                    ? "border-r border-border"
                                    : ""
                                }`}
                              >
                                {value || "—"}
                              </td>
                            )
                          }
                        )}

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      )}

      {/* ======================================================
          FINAL DOWNLOAD CTA
      ====================================================== */}

      <section className="bg-primary px-5 py-14 text-primary-foreground lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="font-mono text-xs font-bold uppercase tracking-widest">
              Technical catalogue
            </p>

            <h2 className="mt-3 max-w-2xl font-mono text-2xl font-bold uppercase">
              Download complete {product.name} specifications.
            </h2>

          </div>

          <a
            href={product.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-3 bg-foreground px-5 py-4 text-xs font-bold uppercase tracking-widest text-background transition hover:opacity-90"
          >
            <Download className="size-4" />

            Download PDF
          </a>

        </div>

      </section>

    </main>
  )
}