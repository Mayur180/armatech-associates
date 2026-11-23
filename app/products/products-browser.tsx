'use client'

import Link from 'next/link'
import { ArrowRight, Download, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { categories, products } from '@/lib/catalog'

const totalModels = products.reduce(
  (count, product) => count + product.variants.length,
  0
)

export default function ProductsBrowser() {
  const [category, setCategory] = useState('All systems')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === 'All systems' ||
        product.category === category

      const matchesQuery =
        `${product.name} ${product.family} ${product.variants
          .map((variant) => variant.model)
          .join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase())

      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <main className="min-h-screen bg-background">
      {/* ================================
          HERO SECTION
      ================================= */}

      <section className="bg-white px-5 py-10 text-neutral-900 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[.22em] text-primary">
            ArmaTech / Crystal VMM Series
          </p>
          <h1 className="mt-4 max-w-4xl font-mono text-3xl font-black uppercase tracking-[-.05em] sm:text-5xl">
            The complete
            <br />
            <span className="text-primary">VMM catalogue.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            Five machine families. {totalModels} configurations.
            Compare the exact travel range, optics and controls
            behind every model.
          </p>
        </div>
      </section>

      {/* ================================
          PRODUCTS SECTION
      ================================= */}

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        {/* FILTER + SEARCH */}
        <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={
                  category === item
                    ? 'bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground'
                    : 'border border-border px-4 py-3 text-xs font-bold uppercase tracking-widest hover:border-primary'
                }
              >
                {item}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 border border-border px-4 py-3 lg:w-72">
            <Search className="size-4 text-muted-foreground" />
            <span className="sr-only">Search catalogue</span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search model or series"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        {/* ================================
            PRODUCT GRID
        ================================= */}

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group border border-border bg-background p-5 transition-colors hover:border-primary"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 bg-foreground px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-background">
                  {product.badge}
                </span>
              </div>

              {/* PRODUCT INFORMATION */}
              <div className="flex items-start justify-between gap-4 py-5">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    {product.family}
                  </p>
                  <h2 className="mt-2 font-mono text-xl font-bold uppercase">
                    {product.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {product.summary}
                  </p>
                </div>
                <ArrowRight className="mt-1 size-5 shrink-0 transition group-hover:translate-x-1" />
              </div>

              {/* PRODUCT DETAILS */}
              <div className="flex items-center justify-between border-t border-border pt-4 text-[10px] font-bold uppercase tracking-widest">
                <span>{product.variants.length} Models</span>
                <span className="text-muted-foreground">
                  {product.travel}
                </span>
              </div>

              {/* MODEL NUMBERS */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <span
                    key={variant.model}
                    className="border border-border px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-muted-foreground"
                  >
                    {variant.model}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* NO PRODUCTS FOUND */}
        {filtered.length === 0 && (
          <p className="py-16 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            No matching systems found.
          </p>
        )}
      </section>

      {/* ================================
          DOWNLOAD CATALOGUE SECTION
      ================================= */}

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-8 lg:py-12">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Downloads
            </p>
            <h2 className="mt-3 font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
              All VMM specifications, one file.
            </h2>
            <p className="mt-3 max-w-xl text-xs leading-6 text-background/60">
              Five family brochures and the full comparison set, as published
              PDFs.
            </p>

            <div className="mt-6 grid gap-px bg-background/15 sm:grid-cols-2">
              {products.map((product) => (
                <a
                  key={product.slug}
                  href={product.brochure}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 bg-foreground px-4 py-3 transition-colors hover:bg-neutral-900"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
                    {product.name}
                  </span>
                  <Download className="size-3.5 shrink-0 text-primary" />
                </a>
              ))}

              <a
                href="/Pdf/Comparison_vmm.pdf"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 bg-foreground px-4 py-3 transition-colors hover:bg-neutral-900"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
                  Comparison sheet
                </span>
                <Download className="size-3.5 shrink-0 text-primary" />
              </a>
            </div>
          </div>

          <div className="border border-background/20 p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/60">
              Complete catalogue
            </p>
            <p className="mt-3 text-xs leading-6 text-background/60">
              All five families merged into a single PDF, for sending to a
              colleague or attaching to an enquiry.
            </p>
            <a
              href="/Pdf/VMM_merged.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="size-4" /> Download catalogue
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
