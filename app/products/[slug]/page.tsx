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

const familyNotes: Record<string, { range: string; choice: string }> = {
  "manual-vmm": {
    range:
      "The three manual models share one optical package and one scale specification; the difference is working envelope and mass. AA-9011M measures 200 × 100 × 150 mm, AA-9012M 300 × 200 × 200 mm and AA-9013M 400 × 300 × 200 mm. All three are stated at 2.5 + L/100 µm accuracy with 2.5 µm repeatability and 0.5 µm linear scales (0.1 µm optional).",
    choice:
      "Choose the smallest envelope that takes your largest part plus fixture clearance; moving up a size changes capacity, not measurement quality. Hand-driven axes suit one-off parts, tool-room checks and mixed batches where writing a program would take longer than the inspection. If height or step measurement repeats through a shift, the powered Z axis of the semi-automatic family is the next step.",
  },
  "semi-automatic-vmm": {
    range:
      "Semi-automatic models keep X and Y manual and put the Z axis under computer control. The three envelopes are 200 × 100 × 150 mm, 300 × 200 × 200 mm and 400 × 300 × 200 mm. AA-9021SA and AA-9022SA are stated at 2.5 + L/100 µm with ±2.5 µm repeatability; AA-9023SA at 2.6 + L/100 µm with ±3 µm.",
    choice:
      "Choose this family when operators measure height, steps and contours repeatedly but parts still need hand positioning. Powered focus gives every operator the same starting point and removes the slowest manual step, while two-axis software records results against nominal dimensions. It is the usual step between a fully manual bench and a programmed automatic routine.",
  },
  "fully-automatic-vmm": {
    range:
      "All three axes are servo-driven and zoom is automatic, so a stored routine can change magnification and lighting as it measures. Travel starts at 200 × 200 × 200 mm on AA-9031A and rises to 400 × 300 × 200 mm on AA-9033A; all three carry 2.5 + L/100 µm accuracy and 2.5 µm repeatability.",
    choice:
      "This is the family for repeat inspection: the same part, measured by different operators and shifts, follows the same program. Parts are positioned on the stage by hand at the start of a run and the axes execute the routine. Where dust, draughts or production-floor conditions threaten the optics, the cabinet-integrated range puts the same automatic platform inside an enclosure.",
  },
  "automatic-vmm-cabinet": {
    range:
      "Four travels run from 300 × 200 × 200 mm to 600 × 500 × 200 mm. The 1–10X automatic zoom and 1.3 MP camera give 18–195X magnification, and 0.5 µm linear scales are standard (0.1 µm optional). The 300 mm and 400 mm stages are stated at 2 + L/100 µm with 2 µm repeatability; the 500 mm and 600 mm stages at 2.5 + L/100 µm with 2.5 µm repeatability.",
    choice:
      "The enclosure protects the stage and optics from dust and draughts and defines the working area on a production floor. Plan the delivery route and floor loading early: the largest model measures 890 × 1370 × 1780 mm and weighs 715 kg. If parts fit a smaller stage, the unenclosed automatic family offers the same servo control in a lighter frame.",
  },
  "vms-manual": {
    range:
      "The VMS range uses a finer linear scale than the VMM models — 0.001 mm — and a longer 108 mm working distance. Envelopes are 200 × 100 × 150 mm, 300 × 200 × 200 mm and 400 × 300 × 200 mm; all three are stated at 2.5 + L/100 µm accuracy with 2.5 µm repeatability. The 0.7–4.5X manual zoom covers 18–188X magnification.",
    choice:
      "Choose the VMS where fine scale reading and working clearance matter on manual inspection work. Every axis is adjusted by hand, so it suits one-off parts and tool-room checks. Where a powered Z axis or stored routines would remove more time than the finer scale saves, the semi-automatic and automatic families are the better fit.",
  },
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    notFound()
  }

  const notes = familyNotes[product.slug]

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

      {/* APPLICATIONS */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Applications
          </p>
          <h2 className="mt-3 font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
            Where the {product.name} is used
          </h2>

          <div className="mt-7 grid border border-border sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((application, index) => (
              <div
                key={application}
                className="border-b border-r border-border p-5"
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm leading-6">{application}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RANGE NOTES */}
      {notes && (
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-16">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Range notes
              </p>
              <h2 className="mt-4 font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
                Choosing within the {product.name} range.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Each model has its own specification table. These notes explain how
                the sizes differ before you open one.
              </p>
            </div>
            <div className="space-y-5 text-sm leading-7 text-muted-foreground">
              <p>{notes.range}</p>
              <p>{notes.choice}</p>
            </div>
          </div>
        </section>
      )}

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
