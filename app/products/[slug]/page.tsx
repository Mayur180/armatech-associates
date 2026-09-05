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

  return (
    <main className="min-h-screen bg-background">

      {/* ======================================================
          PRODUCT HERO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:py-10 lg:px-8 lg:py-14">

        {/* BACK TO PRODUCTS */}

        <Link
          href="/products"
          className="
            group
            inline-flex
            items-center
            gap-2
            font-mono
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-muted-foreground
            transition-colors
            hover:text-primary
          "
        >
          <ArrowLeft
            className="
              size-4
              transition-transform
              duration-300
              group-hover:-translate-x-1
            "
          />

          Back to catalogue
        </Link>

        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">

          {/* ==================================================
              PREMIUM PRODUCT IMAGE AREA
          ================================================== */}

          <div
            className="
              group
              relative
              overflow-hidden
              border
              border-border
              bg-white
            "
          >

            {/* TECHNICAL GRID */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                opacity-60
              "
              style={{
                backgroundImage: `
                  linear-gradient(rgba(17,17,17,.045) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(17,17,17,.045) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* CORNER MARKERS */}

            <div className="pointer-events-none absolute left-5 top-5 z-30 h-8 w-8 border-l-2 border-t-2 border-primary" />

            <div className="pointer-events-none absolute right-5 top-5 z-30 h-8 w-8 border-r-2 border-t-2 border-primary" />

            <div className="pointer-events-none absolute bottom-5 left-5 z-30 h-8 w-8 border-b-2 border-l-2 border-primary" />

            <div className="pointer-events-none absolute bottom-5 right-5 z-30 h-8 w-8 border-b-2 border-r-2 border-primary" />

            {/* TOP LEFT LABEL */}

            <div
              className="
                pointer-events-none
                absolute
                left-6
                top-6
                z-40
                flex
                items-center
                gap-3
                border
                border-border
                bg-white/95
                px-3
                py-2
                backdrop-blur-sm
              "
            >
              <span className="size-2 rounded-full bg-primary" />

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]">
                {product.badge || "ARMATECH"}
              </span>
            </div>

            {/* TOP RIGHT LABEL */}

            <div
              className="
                pointer-events-none
                absolute
                right-6
                top-6
                z-40
                border
                border-border
                bg-white/95
                px-3
                py-2
                font-mono
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-muted-foreground
                backdrop-blur-sm
              "
            >
              VMM / SYSTEM
            </div>

            {/* CENTER CROSSHAIR */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-10
                -translate-x-1/2
                -translate-y-1/2
              "
            >
              <div className="relative size-24 sm:size-32">

                <div className="absolute left-0 top-1/2 h-px w-full bg-primary/20" />

                <div className="absolute left-1/2 top-0 h-full w-px bg-primary/20" />

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    size-8
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-primary/40
                  "
                />

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    size-3
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-primary
                    bg-white
                  "
                />

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    size-1.5
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-primary
                  "
                />

              </div>
            </div>

            {/* MEASUREMENT POINTS */}

            <div className="pointer-events-none absolute left-[18%] top-[30%] z-20">
              <div className="relative size-5">
                <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-primary/70" />
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-primary/70" />
                <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              </div>
            </div>

            <div className="pointer-events-none absolute right-[18%] top-[42%] z-20">
              <div className="relative size-5">
                <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-primary/70" />
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-primary/70" />
                <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-[27%] left-[30%] z-20">
              <div className="relative size-5">
                <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-primary/70" />
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-primary/70" />
                <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              </div>
            </div>

            {/* PRODUCT VIEWER */}

            <div
              className="
                relative
                z-20
                p-5
                pt-20
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.01]
                sm:p-8
                sm:pt-24
                lg:p-10
                lg:pt-28
              "
            >
              <ProductViewer
                image={product.image}
                name={product.name}
                badge={product.badge}
                model={product.variants[0]?.model}
              />
            </div>

            {/* Y AXIS */}

            <div
              className="
                pointer-events-none
                absolute
                left-5
                top-1/2
                z-30
                -translate-y-1/2
              "
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-mono text-[9px] font-bold text-primary">
                  Y
                </span>

                <div className="h-16 w-px bg-primary/30" />

                <span className="font-mono text-[8px] text-muted-foreground">
                  AXIS
                </span>
              </div>
            </div>

          </div>

          {/* ==================================================
              PRODUCT INFORMATION
          ================================================== */}

          <div className="flex flex-col justify-center">

            {/* FAMILY */}

            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              {product.family}
            </p>

            {/* PRODUCT NAME */}

            <h1
              className="
                mt-4
                max-w-2xl
                font-mono
                text-4xl
                font-black
                uppercase
                leading-[0.95]
                tracking-[-0.055em]
                text-foreground
                sm:text-5xl
                lg:text-6xl
              "
            >
              {product.name}
            </h1>

            <div className="mt-6 h-1 w-16 bg-primary" />

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              {product.summary}
            </p>

            {/* ==================================================
                MODEL SELECTOR
            ================================================== */}

            <div className="mt-9">

              {/* HEADER */}

              <div className="flex items-end justify-between">

                <div>

                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    Configure your system
                  </p>

                  <h2 className="mt-2 font-mono text-lg font-bold uppercase tracking-[-0.02em]">
                    Select model
                  </h2>

                </div>

                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {modelCount} options
                </span>

              </div>

              {/* MODEL CARDS */}

              <div className="mt-4 grid gap-3">

                {product.variants.map((variant, index) => (

                  <Link
                    key={variant.model}
                    href={`/contact?product=${encodeURIComponent(
                      product.slug
                    )}&model=${encodeURIComponent(
                      variant.model
                    )}`}
                    className={`
                      group
                      relative
                      overflow-hidden
                      border
                      transition-all
                      duration-300
                      ${
                        index === 0
                          ? "border-primary bg-primary/[0.035]"
                          : "border-border bg-white hover:border-primary hover:bg-primary/[0.02]"
                      }
                    `}
                  >

                    {/* ACTIVE RED BAR */}

                    {index === 0 && (
                      <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                    )}

                    <div className="flex items-center justify-between gap-4 px-5 py-4">

                      {/* LEFT */}

                      <div className="flex items-center gap-4">

                        {/* NUMBER */}

                        <div
                          className={`
                            flex
                            size-9
                            shrink-0
                            items-center
                            justify-center
                            border
                            font-mono
                            text-[10px]
                            font-bold
                            ${
                              index === 0
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* MODEL INFO */}

                        <div>

                          <p className="font-mono text-sm font-black uppercase tracking-widest text-foreground">
                            {variant.model}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-2">

                            <span className="text-[11px] text-muted-foreground">
                              Travel
                            </span>

                            <span className="font-mono text-[11px] font-bold text-foreground">
                              {variant.travel} mm
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <div className="flex items-center gap-3">

                        {index === 0 && (
                          <span
                            className="
                              hidden
                              font-mono
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-widest
                              text-primary
                              sm:block
                            "
                          >
                            Recommended
                          </span>
                        )}

                        <div
                          className="
                            flex
                            size-9
                            items-center
                            justify-center
                            border
                            border-border
                            transition-all
                            duration-300
                            group-hover:border-primary
                            group-hover:bg-primary
                          "
                        >

                          <ArrowRight
                            className="
                              size-4
                              text-primary
                              transition-all
                              duration-300
                              group-hover:translate-x-0.5
                              group-hover:text-primary-foreground
                            "
                          />

                        </div>

                      </div>

                    </div>

                    {/* BOTTOM MICRO LABEL */}

                    <div
                      className={`
                        flex
                        items-center
                        justify-between
                        border-t
                        px-5
                        py-2
                        ${
                          index === 0
                            ? "border-primary/20 bg-primary/[0.025]"
                            : "border-border bg-secondary/40"
                        }
                      `}
                    >

                      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                        Precision configuration
                      </span>

                      <span
                        className={`
                          font-mono
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-widest
                          ${
                            index === 0
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        `}
                      >
                        Select →
                      </span>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

            {/* ==================================================
                QUICK INFORMATION
            ================================================== */}

            <div className="mt-8 grid border-y border-border sm:grid-cols-2">

              <div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:pr-6">

                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Travel range
                </p>

                <p className="mt-2 text-sm font-bold">
                  {product.travel}
                </p>

              </div>

              <div className="py-5 sm:pl-6">

                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Configurations
                </p>

                <p className="mt-2 text-sm font-bold">
                  {modelCount} models
                </p>

              </div>

            </div>

            {/* ==================================================
                BUTTONS
            ================================================== */}

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                href={`/contact?product=${encodeURIComponent(
                  product.slug
                )}&model=${encodeURIComponent(
                  product.variants[0]?.model ?? ""
                )}`}
                className="
                  inline-flex
                  items-center
                  gap-3
                  bg-primary
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-widest
                  text-primary-foreground
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                Request a quote

                <ArrowRight className="size-4" />
              </Link>

              <a
                href={product.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-border
                  bg-white
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-widest
                  text-foreground
                  transition-all
                  duration-300
                  hover:border-primary
                  hover:text-primary
                "
              >
                <Download className="size-4" />

                Download PDF
              </a>

            </div>

            <p className="mt-5 font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              Precision measurement • Industrial inspection • ArmaTech Associates
            </p>

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
                    className={`
                      flex
                      gap-4
                      p-6
                      ${
                        !isLastRow
                          ? "border-b border-border"
                          : ""
                      }
                      ${
                        index % 2 === 0
                          ? "sm:border-r sm:border-border"
                          : ""
                      }
                    `}
                  >

                    <div
                      className="
                        flex
                        size-8
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-primary/40
                      "
                    >
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

            <div className="mb-10">

              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                Technical specifications
              </p>

              <h2
                className="
                  mt-4
                  font-mono
                  text-3xl
                  font-bold
                  uppercase
                  tracking-[-.04em]
                  sm:text-4xl
                "
              >
                Complete specifications.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Technical information for every available model configuration.
              </p>

            </div>

            <div className="overflow-x-auto border border-border bg-background">

              <table className="w-full min-w-[950px] border-collapse text-left">

                <thead>

                  <tr className="bg-foreground text-background">

                    <th
                      className="
                        w-[28%]
                        px-5
                        py-4
                        text-left
                        font-mono
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-widest
                      "
                    >
                      Item
                    </th>

                    {product.variants.map((variant) => (

                      <th
                        key={variant.model}
                        className="
                          min-w-[180px]
                          px-5
                          py-4
                          text-center
                          font-mono
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-widest
                        "
                      >
                        {variant.model}
                      </th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {specifications.map((specification) => (

                    <tr
                      key={specification.label}
                      className="border-t border-border align-top"
                    >

                      <td
                        className="
                          bg-secondary
                          px-5
                          py-4
                          font-semibold
                          text-foreground
                        "
                      >
                        {specification.label}
                      </td>

                      {product.variants.map(
                        (variant, variantIndex) => {

                          const value =
                            specification.values[
                              variantIndex
                            ]

                          return (
                            <td
                              key={`${specification.label}-${variant.model}`}
                              className={`
                                px-5
                                py-4
                                text-center
                                text-sm
                                leading-6
                                text-muted-foreground
                                ${
                                  variantIndex <
                                  product.variants.length - 1
                                    ? "border-r border-border"
                                    : ""
                                }
                              `}
                            >
                              {value || "—"}
                            </td>
                          )
                        }
                      )}

                    </tr>

                  ))}

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

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

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
            className="
              inline-flex
              shrink-0
              items-center
              gap-3
              bg-foreground
              px-5
              py-4
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-background
              transition
              hover:opacity-90
            "
          >
            <Download className="size-4" />

            Download PDF
          </a>

        </div>

      </section>

    </main>
  )
}