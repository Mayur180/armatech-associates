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
import { FadeIn } from "@/components/fade-in"
import ModelSelector from "@/components/ModelSelector"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    return {
      title: "Product Not Found | ArmaTech Associates",
      description: "The requested precision measurement product was not found.",
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
      images: [{ url: product.image, alt: product.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.seoDescription,
      images: [product.image],
    },
    robots: { index: true, follow: true },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 pt-12">
      {/* BREADCRUMB */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex min-h-[58px] items-center justify-between">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-red-600"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Product Catalogue
            </Link>
            <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 sm:block">
              Precision Measurement Systems
            </span>
          </div>
        </div>
      </section>

      {/* MAIN PRODUCT SECTION */}
      <section className="relative w-full overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:py-16">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(350px,0.85fr)] lg:gap-14">
            
            {/* LEFT COLUMN (ANIMATED) */}
            <div className=" min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
                  {product.badge}
                </span>
                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  {product.category}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl lg:text-[48px] lg:leading-[1.08]">
                {product.name}
              </h1>

              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">
                {product.family}
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-7">
                {product.summary}
              </p>

              <div className="mt-8 min-w-0">
                <ProductViewer
                  image={product.image}
                  name={product.name}
                  badge={product.badge}
                />
              </div>

              <div className="mt-3 flex flex-col gap-2 border-t border-neutral-200 pt-3 text-[9px] font-mono uppercase tracking-[0.14em] text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
                <span>{product.category} Measurement System</span>
                <span>Precision Inspection Equipment</span>
              </div>
            </div>

            {/* RIGHT COLUMN (ANIMATED) */}
            <aside className=" min-w-0 lg:sticky lg:top-[94px] lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
                <div className="border-b border-neutral-200 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">
                        Product Configuration
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                        Select Your Model
                      </h2>
                    </div>
                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-950 text-white sm:flex">
                      <span className="font-mono text-[10px] font-bold">VMM</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    Compare available measuring ranges and technical configurations for this product family.
                  </p>
                </div>
                
                {/* Model Selector with animation */}
                <div className=" p-5 sm:p-6 ">
                  <ModelSelector product={product} />
                </div>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-2xl bg-neutral-950 p-6 text-white">
                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-400">
                    Need Assistance?
                  </p>
                  <h3 className="mt-2 max-w-sm text-xl font-semibold leading-tight">
                    Discuss your measurement requirements
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    Contact ArmaTech Associates for product information, configuration guidance and quotation requirements.
                  </p>
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950 transition-all hover:bg-red-600 hover:text-white"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Send Enquiry
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* TECHNICAL HIGHLIGHTS */}
      <FadeIn>
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
              Product Highlights
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Built for precision inspection
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
              Explore the key features and capabilities available across the {product.family} range.
            </p>
          </div>

          <div className=" mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
            {product.highlights.map((highlight, index) => (
              <div
                key={highlight}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
              >
                <span className="absolute right-4 top-4 font-mono text-[9px] font-bold tracking-widest text-neutral-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="mt-4 pr-7 text-sm font-medium leading-6 text-neutral-800">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* FINAL CTA */}
      <FadeIn>
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 lg:py-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
            ArmaTech Associates
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
            Looking for the right precision measurement system?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            Share your inspection and measurement requirements with our team and request product information or a quotation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={`/contact?product=${product.slug}`}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700"
            >
              <MessageSquare className="h-4 w-4" />
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 transition-all hover:border-neutral-400 hover:bg-neutral-50"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Products
            </Link>
          </div>
        </div>
      </section>
      </FadeIn>
    </main>
  )
}
