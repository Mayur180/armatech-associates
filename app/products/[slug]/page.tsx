import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, FileText } from "lucide-react"

import { getProduct, products } from "@/lib/catalog"
import ProductViewer from "@/components/ProductViewer"
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
    <main className="min-h-screen bg-background text-foreground">
      {/* BREADCRUMB */}
      <section className="border-b border-border">
        <div className="mx-auto flex min-h-[52px] w-full max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Catalogue
          </Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            CRYSTAL / {product.category}
          </span>
        </div>
      </section>

      {/* MAIN */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-8 lg:py-14">
          {/* LEFT */}
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              {product.badge} / {product.category}
            </p>

            <h1 className="mt-4 max-w-3xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {product.summary}
            </p>

            <div className="mt-7">
              <ProductViewer
                image={product.image}
                name={product.name}
                badge={product.badge}
                travel={product.travel}
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>CRYSTAL Video Measuring Machine</span>
              <span>Travel range {product.travel}</span>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="min-w-0 lg:sticky lg:top-[92px] lg:self-start">
            <div className="border border-border">
              <div className="border-b border-border bg-secondary p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  Configuration
                </p>
                <p className="mt-2 font-mono text-lg font-bold uppercase">
                  {product.variants.length} models
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Open a model for its full specification table and application
                  notes.
                </p>
              </div>

              <div className="p-5">
                <ModelSelector product={product} />

                <a
                  href={product.brochure}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-border px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
                >
                  <FileText className="h-4 w-4" />
                  {product.name} brochure
                </a>
              </div>
            </div>

            <div className="mt-5 border border-border bg-foreground p-6 text-background">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Quotation
              </p>
              <p className="mt-3 font-mono text-lg font-bold uppercase leading-snug">
                Discuss the part, not just the model.
              </p>
              <p className="mt-3 text-sm leading-6 text-background/70">
                Send the features and tolerances you need to measure and we will
                confirm travel, optics and software for the application.
              </p>
              <Link
                href={`/contact?product=${product.slug}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Features
          </p>
          <h2 className="mt-3 font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
            Common across the {product.name} range
          </h2>

          <div className="mt-7 grid border border-border sm:grid-cols-2 lg:grid-cols-3">
            {product.highlights.map((highlight, index) => (
              <div
                key={highlight}
                className="border-b border-r border-border p-5 last:border-b-0"
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-sm leading-6">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER LINKS */}
      <section>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex flex-wrap gap-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
            <Link href="/pricing-guide" className="text-muted-foreground transition-colors hover:text-primary">
              Pricing guide
            </Link>
            <Link href="/faq" className="text-muted-foreground transition-colors hover:text-primary">
              FAQ
            </Link>
            <Link href="/service-support" className="text-muted-foreground transition-colors hover:text-primary">
              Service &amp; support
            </Link>
          </div>
          <Link
            href={`/contact?product=${product.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:text-primary"
          >
            Request a quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
