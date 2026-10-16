import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  MessageSquare,
} from "lucide-react"

import { getProduct, products } from "@/lib/catalog"
import ProductViewer from "@/components/ProductViewer"
import ModelSelector from "@/components/ModelSelector"

type ProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

/* -------------------------------------------------------------------------- */
/* Static product pages                                                       */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

/* -------------------------------------------------------------------------- */
/* Dynamic SEO                                                                */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    return {
      title: "Product Not Found | ArmaTech Associates",
      description:
        "The requested precision measurement product was not found.",
    }
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,

    keywords: [
      product.name,
      product.family,
      product.category,
      "Video Measuring Machine",
      "VMM",
      "Vision Measuring Machine",
      "precision measurement",
      "dimensional inspection",
      "industrial inspection",
      ...product.variants.map((variant) => variant.model),
    ],

    alternates: {
      canonical: `/products/${product.slug}`,
    },

    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      type: "website",
      images: [
        {
          url: product.image,
          alt: product.imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.seoDescription,
      images: [product.image],
    },

    robots: {
      index: true,
      follow: true,
    },
  }
}

/* -------------------------------------------------------------------------- */
/* Product Page                                                               */
/* -------------------------------------------------------------------------- */

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 pt-[70px]">

      {/* ================================================================== */}
      {/* BREADCRUMB                                                         */}
      {/* ================================================================== */}

      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">

          <div className="flex min-h-[58px] items-center justify-between">

            <Link
              href="/products"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-neutral-600
                transition-colors
                hover:text-red-600
              "
            >
              <ArrowLeft
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:-translate-x-1
                "
              />

              Back to Product Catalogue
            </Link>

            <span
              className="
                hidden
                font-mono
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-neutral-400
                sm:block
              "
            >
              Precision Measurement Systems
            </span>

          </div>

        </div>
      </section>

      {/* ================================================================== */}
      {/* MAIN PRODUCT SECTION                                               */}
      {/* ================================================================== */}

      <section className="relative w-full overflow-hidden">

        {/* Subtle top technical line */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"
        />

        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:py-16">

          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-10
              lg:grid-cols-[minmax(0,1.15fr)_minmax(350px,0.85fr)]
              lg:gap-14
            "
          >

            {/* ============================================================ */}
            {/* LEFT COLUMN                                                   */}
            {/* ============================================================ */}

            <div className="min-w-0">

              {/* PRODUCT CATEGORY */}

              <div className="flex flex-wrap items-center gap-3">

                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-red-200
                    bg-red-50
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-red-600
                  "
                >
                  {product.badge}
                </span>

                <span className="h-1 w-1 rounded-full bg-neutral-300" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-neutral-500
                  "
                >
                  {product.category}
                </span>

              </div>

              {/* PRODUCT TITLE */}

              <h1
                className="
                  mt-5
                  max-w-4xl
                  text-3xl
                  font-semibold
                  leading-[1.1]
                  tracking-tight
                  text-neutral-950
                  sm:text-4xl
                  lg:text-[48px]
                  lg:leading-[1.08]
                "
              >
                {product.name}
              </h1>

              {/* PRODUCT FAMILY */}

              <p
                className="
                  mt-4
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-red-600
                "
              >
                {product.family}
              </p>

              {/* SUMMARY */}

              <p
                className="
                  mt-5
                  max-w-3xl
                  text-sm
                  leading-7
                  text-neutral-600
                  sm:text-base
                  sm:leading-7
                "
              >
                {product.summary}
              </p>

              {/* PRODUCT VIEWER */}

              <div className="mt-8 min-w-0">

                <ProductViewer
                  image={product.image}
                  name={product.name}
                  badge={product.badge}
                />

              </div>

              {/* IMAGE FOOTER INFORMATION */}

              <div
                className="
                  mt-3
                  flex
                  flex-col
                  gap-2
                  border-t
                  border-neutral-200
                  pt-3
                  text-[9px]
                  font-mono
                  uppercase
                  tracking-[0.14em]
                  text-neutral-400
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <span>
                  {product.category} Measurement System
                </span>

                <span>
                  Precision Inspection Equipment
                </span>
              </div>

            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN                                                  */}
            {/* ============================================================ */}

            <aside
              className="
                min-w-0
                lg:sticky
                lg:top-[94px]
                lg:self-start
              "
            >

              {/* CONFIGURATION CARD */}

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-white
                  shadow-[0_12px_40px_rgba(0,0,0,0.05)]
                "
              >

                {/* CARD HEADER */}

                <div className="border-b border-neutral-200 p-5 sm:p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-red-600
                        "
                      >
                        Product Configuration
                      </p>

                      <h2
                        className="
                          mt-2
                          text-xl
                          font-semibold
                          tracking-tight
                          text-neutral-950
                          sm:text-2xl
                        "
                      >
                        Select Your Model
                      </h2>

                    </div>

                    <div
                      className="
                        hidden
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-neutral-950
                        text-white
                        sm:flex
                      "
                    >
                      <span className="font-mono text-[10px] font-bold">
                        VMM
                      </span>
                    </div>

                  </div>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-neutral-600
                    "
                  >
                    Compare available measuring ranges and technical
                    configurations for this product family.
                  </p>

                </div>

                {/* MODEL SELECTOR */}

                <div className="p-5 sm:p-6">
                  <ModelSelector product={product} />
                </div>

              </div>

              {/* QUICK ENQUIRY CARD */}

              <div
                className="
                  relative
                  mt-5
                  overflow-hidden
                  rounded-2xl
                  bg-neutral-950
                  p-6
                  text-white
                "
              >

                {/* Decorative element */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-32
                    w-32
                    rounded-full
                    border
                    border-red-600/20
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-4
                    -top-4
                    h-20
                    w-20
                    rounded-full
                    border
                    border-red-600/20
                  "
                />

                <div className="relative">

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-red-400
                    "
                  >
                    Need Assistance?
                  </p>

                  <h3
                    className="
                      mt-2
                      max-w-sm
                      text-xl
                      font-semibold
                      leading-tight
                    "
                  >
                    Discuss your measurement requirements
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-neutral-300
                    "
                  >
                    Contact ArmaTech Associates for product information,
                    configuration guidance and quotation requirements.
                  </p>

                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="
                      group
                      mt-5
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-neutral-950
                      transition-all
                      hover:bg-red-600
                      hover:text-white
                    "
                  >
                    <MessageSquare className="h-4 w-4" />

                    Send Enquiry

                    <ArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </Link>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* ================================================================== */}
      {/* TECHNICAL HIGHLIGHTS                                               */}
      {/* ================================================================== */}

      <section className="border-y border-neutral-200 bg-neutral-50">

        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">

          <div className="max-w-2xl">

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-red-600
              "
            >
              Product Highlights
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-semibold
                tracking-tight
                text-neutral-950
                sm:text-3xl
              "
            >
              Built for precision inspection
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-neutral-600
                sm:text-base
              "
            >
              Explore the key features and capabilities available across the{" "}
              {product.family} range.
            </p>

          </div>

          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {product.highlights.map((highlight, index) => (

              <div
                key={highlight}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-white
                  p-5
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-red-200
                  hover:shadow-md
                "
              >

                {/* Number */}

                <span
                  className="
                    absolute
                    right-4
                    top-4
                    font-mono
                    text-[9px]
                    font-bold
                    tracking-widest
                    text-neutral-300
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-50
                    text-red-600
                  "
                >
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <p
                  className="
                    mt-4
                    pr-7
                    text-sm
                    font-medium
                    leading-6
                    text-neutral-800
                  "
                >
                  {highlight}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================================== */}
      {/* APPLICATIONS                                                       */}
      {/* ================================================================== */}

      <section className="w-full overflow-hidden">

        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">

          <div
            className="
              grid
              min-w-0
              gap-10
              lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]
              lg:items-start
            "
          >

            {/* APPLICATION INTRO */}

            <div className="min-w-0">

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-red-600
                "
              >
                Applications
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-neutral-950
                  sm:text-3xl
                "
              >
                Suitable for industrial inspection
              </h2>

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-neutral-600
                "
              >
                The {product.family} range can be considered for dimensional
                measurement and inspection requirements across different
                industrial applications.
              </p>

            </div>

            {/* APPLICATION LIST */}

            <div
              className="
                grid
                min-w-0
                gap-3
                sm:grid-cols-2
              "
            >

              {product.applications.map((application, index) => (

                <div
                  key={application}
                  className="
                    group
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-neutral-200
                    bg-neutral-50
                    px-4
                    py-4
                    transition-colors
                    hover:border-red-200
                    hover:bg-red-50/40
                  "
                >

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-red-600
                      shadow-sm
                    "
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </span>

                  <span
                    className="
                      min-w-0
                      flex-1
                      text-sm
                      font-medium
                      text-neutral-800
                    "
                  >
                    {application}
                  </span>

                  <span
                    className="
                      hidden
                      font-mono
                      text-[8px]
                      text-neutral-300
                      sm:block
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ================================================================== */}
      {/* MODEL RANGE                                                        */}
      {/* ================================================================== */}

      <section
        className="
          w-full
          overflow-hidden
          border-y
          border-neutral-800
          bg-neutral-950
          text-white
        "
      >

        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">

          <div
            className="
              flex
              min-w-0
              flex-col
              gap-5
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >

            <div className="min-w-0">

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-red-400
                "
              >
                Model Range
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  tracking-tight
                  sm:text-3xl
                "
              >
                Available configurations
              </h2>

            </div>

            <p
              className="
                max-w-xl
                text-sm
                leading-6
                text-neutral-400
              "
            >
              Choose the model that matches your required measuring range.
              Detailed specifications are available through the model
              selector.
            </p>

          </div>

          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
          "
          >

            {product.variants.map((variant, index) => (

              <div
                key={variant.model}
                className="
                  group
                  relative
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-5
                  transition-all
                  hover:border-red-500/30
                  hover:bg-white/[0.07]
                "
              >

                {/* Configuration number */}

                <span
                  className="
                    absolute
                    right-5
                    top-5
                    font-mono
                    text-[9px]
                    font-bold
                    tracking-widest
                    text-neutral-600
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-neutral-500
                  "
                >
                  Model
                </p>

                <p
                  className="
                    mt-2
                    break-words
                    text-xl
                    font-semibold
                    tracking-tight
                  "
                >
                  {variant.model}
                </p>

                <div className="mt-5 border-t border-white/10 pt-4">

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-neutral-500
                    "
                  >
                    Measuring Range
                  </p>

                  <p
                    className="
                      mt-1
                      break-words
                      text-sm
                      font-medium
                      leading-6
                      text-neutral-200
                    "
                  >
                    {variant.travel}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================================== */}
      {/* BROCHURE                                                           */}
      {/* ================================================================== */}

      <section className="w-full overflow-hidden">

        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-neutral-200
              bg-neutral-50
            "
          >

            <div
              className="
                grid
                min-w-0
                lg:grid-cols-[minmax(0,1fr)_auto]
                lg:items-center
              "
            >

              <div className="min-w-0 p-7 sm:p-9">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-50
                    text-red-600
                  "
                >
                  <FileText className="h-5 w-5" />
                </div>

                <p
                  className="
                    mt-5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-red-600
                  "
                >
                  Technical Documentation
                </p>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-neutral-950
                  "
                >
                  Product Brochure
                </h2>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-6
                    text-neutral-600
                  "
                >
                  Download the product brochure for additional product
                  information, configurations and technical details.
                </p>

              </div>

              <div className="px-7 pb-7 sm:px-9 sm:pb-9 lg:p-9">

                <a
                  href={product.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="
                    group
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-neutral-950
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-red-600
                    sm:w-auto
                  "
                >
                  <Download
                    className="
                      h-4
                      w-4
                      transition-transform
                      group-hover:translate-y-0.5
                    "
                  />

                  Download Brochure

                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================================== */}
      {/* FINAL CTA                                                          */}
      {/* ================================================================== */}

      <section className="border-t border-neutral-200 bg-white">

        <div
          className="
            mx-auto
            max-w-5xl
            px-5
            py-14
            text-center
            sm:px-8
            lg:py-20
          "
        >

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-red-600
            "
          >
            ArmaTech Associates
          </p>

          <h2
            className="
              mx-auto
              mt-3
              max-w-3xl
              text-3xl
              font-semibold
              leading-tight
              tracking-tight
              text-neutral-950
              sm:text-4xl
            "
          >
            Looking for the right precision measurement system?
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-neutral-600
              sm:text-base
            "
          >
            Share your inspection and measurement requirements with our team
            and request product information or a quotation.
          </p>

          <div
            className="
              mt-8
              flex
              flex-col
              justify-center
              gap-3
              sm:flex-row
            "
          >

            <Link
              href={`/contact?product=${product.slug}`}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                transition-all
                hover:bg-red-700
              "
            >
              <MessageSquare className="h-4 w-4" />

              Request a Quote

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="/products"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-neutral-300
                bg-white
                px-6
                py-3.5
                text-sm
                font-semibold
                text-neutral-800
                transition-all
                hover:border-neutral-400
                hover:bg-neutral-50
              "
            >
              <ArrowLeft className="h-4 w-4" />

              View All Products

            </Link>

          </div>

        </div>

      </section>

    </main>
  )
}