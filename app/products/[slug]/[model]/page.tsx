import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, FileText } from "lucide-react"
import { getProduct } from "@/lib/catalog"
import { getModelCopy } from "@/lib/model-copy"
import { CONTACT, SITE_URL, mailtoHref, telHref } from "@/lib/site"
import { notFound } from "next/navigation"

type ModelPageProps = {
  params: Promise<{ slug: string; model: string }>
}

function SpecLabel({ label }: { label: string }) {
  const suffix = "(µm)"

  if (!label.endsWith(suffix)) {
    return <>{label}</>
  }

  return (
    <>
      {label.slice(0, -suffix.length).trimEnd()}{" "}
      <span className="normal-case">(µm)</span>
    </>
  )
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { slug, model } = await params
  const product = getProduct(slug)
  const variant = product?.variants.find((item) => item.model === model)
  const copy = getModelCopy(model)

  if (!product || !variant) {
    return { title: "Model Not Found" }
  }

  const description =
    copy?.paragraphs[0] ??
    `Technical specifications, ${variant.travel} mm travel range and configuration options for the CRYSTAL ${variant.model} ${product.name}.`

  return {
    title: `${variant.model} | ${product.name} Specifications`,
    description,
    alternates: {
      canonical: `/products/${product.slug}/${variant.model}`,
    },
    openGraph: {
      title: `${variant.model} | ${product.name}`,
      description,
      url: `${SITE_URL}/products/${product.slug}/${variant.model}`,
      type: "website",
      images: [{ url: product.image, alt: product.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${variant.model} | ${product.name}`,
      description,
      images: [product.image],
    },
  }
}

export default async function ModelSpecsPage({ params }: ModelPageProps) {
  const { slug, model } = await params
  const product = getProduct(slug)

  if (!product) notFound()

  const variantIndex = product.variants.findIndex((v) => v.model === model)
  const variant = product.variants[variantIndex]
  if (!variant) notFound()

  const copy = getModelCopy(variant.model)
  const accuracySpec = product.specifications.find((spec) =>
    spec.label.startsWith("Measuring Accuracy")
  )
  const repeatabilitySpec = product.specifications.find((spec) =>
    spec.label.startsWith("Repeatability")
  )
  const lensSpec = product.specifications.find((spec) => spec.label === "Lens")
  const accuracy = accuracySpec?.values[variantIndex]
  const repeatability = repeatabilitySpec?.values[variantIndex]
  const lens = lensSpec?.values[variantIndex]
  const intro =
    accuracy && repeatability
      ? `The ${variant.model} is the ${variant.travel} mm X × Y × Z configuration in the ${product.name} range. Stated accuracy is ${accuracy} µm with ${repeatability} µm repeatability.${lens ? ` Optics: ${lens}.` : ""}`
      : product.summary
  const pageUrl = `${SITE_URL}/products/${product.slug}/${variant.model}`

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `CRYSTAL ${variant.model} ${product.name}`,
    sku: variant.model,
    description:
      copy?.paragraphs.join(" ") ?? product.summary,
    image: `${SITE_URL}${product.image}`,
    category: "Video Measuring Machine",
    brand: { "@type": "Brand", name: "CRYSTAL" },
    url: pageUrl,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: `${SITE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: `${SITE_URL}/products/${product.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: variant.model,
        item: pageUrl,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HEADER */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
          <Link
            href={`/products/${slug}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {product.name}
          </Link>

          <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            {variant.model} / {product.category}
          </p>

          <h1 className="mt-4 max-w-4xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            {copy?.headline ?? `${variant.model} specifications`}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-border pt-5">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
              Travel <span className="ml-2 text-primary">{variant.travel} mm</span>
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
              Category <span className="ml-2 text-primary">{product.category}</span>
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
              Brand <span className="ml-2 text-primary">CRYSTAL</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14 lg:px-8 lg:py-14">
        {/* MAIN COLUMN */}
        <div>
          <section className="border-b border-border pb-8">
            <div className="relative overflow-hidden border border-border bg-secondary">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="mx-auto h-[260px] w-full object-contain p-4 mix-blend-multiply sm:h-[320px]"
              />
              <span className="absolute left-0 top-0 bg-foreground px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-background">
                {variant.model}
              </span>
            </div>

            {copy?.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-sm leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>

          {/* SPECIFICATIONS */}
          <section className="mt-8">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Specifications
            </p>
            <h2 className="mt-3 font-mono text-xl font-bold uppercase tracking-[-0.02em]">
              {variant.model} technical data
            </h2>

            <div className="mt-5 border border-border">
              {product.specifications.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`grid gap-1 px-4 py-3 sm:grid-cols-[1.1fr_1fr] ${
                    index !== product.specifications.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    <SpecLabel label={spec.label} />
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {spec.values[variantIndex]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* BEST FOR */}
          {copy && (
            <section className="mt-8">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Best for
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {copy.bestFor.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* HIGHLIGHTS */}
          <section className="mt-8">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Features
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          {/* RANGE */}
          <section className="mt-8">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Range
            </p>
            <h2 className="mt-3 font-mono text-xl font-bold uppercase tracking-[-0.02em]">
              Other sizes in this range
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Each row opens the full specification for that size.
            </p>

            <div className="mt-4 border border-border">
              {product.variants.map((item, index) => {
                const isCurrent = item.model === variant.model
                const rowClass = `flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                  index !== product.variants.length - 1
                    ? "border-b border-border"
                    : ""
                }`
                const rowContent = (
                  <>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                      <span className="font-mono text-sm font-bold">{item.model}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.travel} mm travel
                      </span>
                      {accuracySpec && (
                        <span className="text-xs text-muted-foreground">
                          {accuracySpec.values[index]} µm accuracy
                        </span>
                      )}
                    </div>
                    {isCurrent ? (
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                        This model
                      </span>
                    ) : (
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </>
                )

                return isCurrent ? (
                  <div key={item.model} className={`${rowClass} bg-secondary`}>
                    {rowContent}
                  </div>
                ) : (
                  <Link
                    key={item.model}
                    href={`/products/${product.slug}/${item.model}`}
                    className={`${rowClass} transition-colors hover:bg-secondary`}
                  >
                    {rowContent}
                  </Link>
                )
              })}
            </div>
          </section>

          {/* SCOPE */}
          {copy && (
            <section className="mt-8 border-t border-border pt-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Delivery scope
              </p>
              <ul className="mt-4 space-y-2">
                {copy.scope.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* SIDEBAR */}
        <aside>
          <div className="sticky top-24 border border-border">
            <div className="border-b border-border bg-secondary p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Enquire about this model
              </p>
              <p className="mt-2 font-mono text-lg font-bold uppercase">
                {variant.model}
              </p>
            </div>

            <div className="p-5">
              <Link
                href={`/contact?product=${slug}&model=${variant.model}`}
                className="flex w-full items-center justify-center gap-2 bg-primary px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={product.brochure}
                download
                className="mt-3 flex w-full items-center justify-center gap-2 border border-border px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
              >
                <FileText className="h-4 w-4" /> {product.name} brochure
              </a>

              <div className="mt-5 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
                  Talk to us
                </p>
                <p className="mt-2">
                  <a href={telHref(CONTACT.landlines[0])} className="font-semibold transition-colors hover:text-primary">
                    {CONTACT.landlines[0]}
                  </a>
                  <br />
                  <a href={mailtoHref()} className="break-all font-semibold transition-colors hover:text-primary">
                    {CONTACT.email}
                  </a>
                </p>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Before you ask
                </p>
                <div className="mt-2 grid gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
                  <Link href="/faq" className="transition-colors hover:text-primary">
                    Accuracy, software, lead time
                  </Link>
                  <Link href="/pricing-guide" className="transition-colors hover:text-primary">
                    What drives the price
                  </Link>
                  <Link href="/service-support" className="transition-colors hover:text-primary">
                    Installation & calibration
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
