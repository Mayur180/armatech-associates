'use client'

import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { categories, products } from '@/lib/catalog'

export default function ProductsPage() {
  const [category, setCategory] = useState('All systems')
  const [query, setQuery] = useState('')

  // Filter products by category and search query
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

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="bg-foreground px-5 py-20 text-background lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <p className="font-mono text-xs uppercase tracking-[.22em] text-primary">
            ArmaTech / Crystal VMM Series
          </p>

          <h1 className="mt-5 max-w-4xl font-mono text-5xl font-bold uppercase tracking-[-.06em] sm:text-7xl">
            The complete
            <br />
            <span className="text-primary">
              VMM catalogue.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-background/70">
            Five machine families. Eighteen configurations.
            Compare the exact travel range, optics and controls
            behind every model.
          </p>

        </div>
      </section>


      {/* =====================================================
          PRODUCTS SECTION
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">

        {/* FILTER + SEARCH */}
        <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-center lg:justify-between">

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap gap-2">

            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={
                  category === item
                    ? 'bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground'
                    : 'border border-border px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary'
                }
              >
                {item}
              </button>
            ))}

          </div>


          {/* SEARCH BAR */}
          <label className="flex items-center gap-3 border border-border px-4 py-3 lg:w-72">

            <Search className="size-4 text-muted-foreground" />

            <span className="sr-only">
              Search catalogue
            </span>

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search model or series"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />

          </label>

        </div>


        {/* =====================================================
            PRODUCT GRID
        ===================================================== */}
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">

          {filtered.map((product) => (

            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group bg-background p-5"
            >

              {/* PRODUCT IMAGE */}
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-secondary">

                <img
                  src={product.image}
                  alt={`${product.name} catalogue reference`}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-[1.03]"
                />

                {/* PRODUCT BADGE */}
                <span className="absolute left-4 top-4 bg-foreground px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-background">
                  {product.badge}
                </span>

              </div>


              {/* PRODUCT INFORMATION */}
              <div className="flex items-start justify-between gap-4 py-6">

                <div>

                  {/* PRODUCT FAMILY */}
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    {product.family}
                  </p>

                  {/* PRODUCT NAME */}
                  <h2 className="mt-2 font-mono text-xl font-bold uppercase">
                    {product.name}
                  </h2>

                  {/* PRODUCT DESCRIPTION */}
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {product.summary}
                  </p>

                </div>


                {/* ARROW */}
                <ArrowRight className="mt-1 size-5 shrink-0 transition group-hover:translate-x-1" />

              </div>


              {/* =================================================
                  PRODUCT DETAILS
              ================================================= */}
              <div className="flex items-center justify-between border-t border-border pt-4 text-[10px] font-bold uppercase tracking-widest">

                <span>
                  {product.variants.length} Models
                </span>

                <span className="text-muted-foreground">
                  {product.travel}
                </span>

              </div>


              {/* =================================================
                  MODEL NUMBERS
              ================================================= */}
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


        {/* =====================================================
            NO PRODUCTS FOUND
        ===================================================== */}
        {filtered.length === 0 && (

          <p className="py-20 text-center font-mono text-sm uppercase tracking-widest text-muted-foreground">
            No matching systems found.
          </p>

        )}

      </section>

    </main>
  )
}