"use client"

import Link from "next/link"
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react"
import { useMemo, useState } from "react"
import { categories, products } from "@/lib/catalog"


export default function ProductsPage() {
  const [category, setCategory] = useState("All systems")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All systems" ||
        product.category === category

      const searchText = `
        ${product.name}
        ${product.family}
        ${product.badge}
        ${product.variants
          .map((variant) => variant.model)
          .join(" ")}
      `.toLowerCase()

      const matchesQuery = searchText.includes(
        query.toLowerCase().trim()
      )

      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <main className="min-h-screen bg-background">

      {/* ======================================================
          CATALOGUE HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-border bg-foreground text-background">

        {/* TECHNICAL GRID */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* RED ACCENT */}

        <div className="absolute right-0 top-0 h-full w-1 bg-primary" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">

          {/* TOP LABEL */}

          <div className="flex items-center gap-3">

            <span className="size-2 rounded-full bg-primary" />

            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-background/70">
              ArmaTech / Precision Measurement
            </p>

          </div>

          {/* HEADING */}

          <h1
            className="
              mt-6
              max-w-5xl
              font-mono
              text-5xl
              font-black
              uppercase
              leading-[0.92]
              tracking-[-0.065em]
              sm:text-6xl
              lg:text-8xl
            "
          >
            Precision
            <br />
            <span className="text-primary">
              catalogue.
            </span>
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">

            <p className="max-w-2xl text-sm leading-7 text-background/65 sm:text-base">
              Explore the complete range of ArmaTech video and vision
              measuring systems. Compare machine families, configurations,
              travel ranges and available models.
            </p>

            {/* CATALOGUE COUNT */}

            <div className="border-l border-background/20 pl-5">

              <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-background/50">
                Systems available
              </p>

              <p className="mt-2 font-mono text-4xl font-black">
                {products.length}
              </p>

            </div>

          </div>

          {/* TECHNICAL FOOTER */}

          <div className="mt-12 grid border-t border-background/15 pt-5 sm:grid-cols-3">

            <div className="border-b border-background/15 pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">

              <p className="font-mono text-[9px] uppercase tracking-widest text-background/45">
                Classification
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-wider">
                VMM / VMS
              </p>

            </div>

            <div className="border-b border-background/15 py-4 sm:border-b-0 sm:border-r sm:px-6 sm:py-0">

              <p className="font-mono text-[9px] uppercase tracking-widest text-background/45">
                Inspection
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-wider">
                Dimensional
              </p>

            </div>

            <div className="pt-4 sm:pl-6 sm:pt-0">

              <p className="font-mono text-[9px] uppercase tracking-widest text-background/45">
                Application
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-wider">
                Industrial
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          CATALOGUE CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">

        {/* ====================================================
            FILTER HEADER
        ==================================================== */}

        <div className="border-b border-border pb-7">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            {/* CATEGORY */}

            <div>

              <div className="mb-4 flex items-center gap-2">

                <SlidersHorizontal className="size-4 text-primary" />

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                  Filter systems
                </p>

              </div>

              <div className="flex flex-wrap gap-2">

                {categories.map((item) => (

                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`
                      relative
                      border
                      px-4
                      py-3
                      font-mono
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      transition-all
                      duration-300
                      ${
                        category === item
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
                      }
                    `}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            {/* SEARCH */}

            <label
              className="
                flex
                w-full
                items-center
                gap-3
                border
                border-border
                bg-background
                px-4
                py-3
                transition-colors
                focus-within:border-primary
                lg:w-80
              "
            >

              <Search className="size-4 shrink-0 text-muted-foreground" />

              <span className="sr-only">
                Search catalogue
              </span>

              <input
                type="text"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search model or series"
                className="
                  w-full
                  bg-transparent
                  font-mono
                  text-xs
                  outline-none
                  placeholder:text-muted-foreground
                "
              />

            </label>

          </div>

          {/* RESULT COUNT */}

          <div className="mt-7 flex items-center justify-between">

            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Showing{" "}
              <span className="text-foreground">
                {filtered.length}
              </span>{" "}
              systems
            </p>

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
              >
                Clear search
              </button>
            )}

          </div>

        </div>

        {/* ====================================================
            PRODUCT GRID
        ==================================================== */}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {filtered.map((product, productIndex) => (

            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="
                group
                relative
                overflow-hidden
                border
                border-border
                bg-background
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-primary
                hover:shadow-xl
              "
            >

              {/* ==================================================
                  PRODUCT NUMBER
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  z-20
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  bg-foreground
                  px-3
                  font-mono
                  text-[9px]
                  font-bold
                  tracking-widest
                  text-background
                "
              >
                {String(productIndex + 1).padStart(2, "0")}
              </div>

              {/* ==================================================
                  RED CORNER
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-0
                  top-0
                  z-20
                  h-8
                  w-8
                  border-r-2
                  border-t-2
                  border-primary
                "
              />

              {/* ==================================================
                  PRODUCT IMAGE
              ================================================== */}

              <div
                className="
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  bg-secondary
                "
              >

                {/* GRID */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-0
                    opacity-70
                  "
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(17,17,17,.045) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(17,17,17,.045) 1px, transparent 1px)
                    `,
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* PRODUCT IMAGE */}

                <div className="relative z-10 flex size-full items-center justify-center p-7">

                  <img
                    src={product.image}
                    alt={`${product.name} catalogue reference`}
                    loading="lazy"
                    decoding="async"
                    className="
                      size-full
                      object-contain
                      mix-blend-multiply
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.06]
                    "
                  />

                </div>

                {/* BADGE */}

                <span
                  className="
                    absolute
                    bottom-4
                    left-4
                    z-20
                    border
                    border-border
                    bg-white/95
                    px-3
                    py-2
                    font-mono
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-widest
                    backdrop-blur-sm
                  "
                >
                  {product.badge}
                </span>

                {/* VIEW INDICATOR */}

                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    z-20
                    flex
                    size-9
                    items-center
                    justify-center
                    border
                    border-border
                    bg-white/95
                    transition-all
                    duration-300
                    group-hover:border-primary
                    group-hover:bg-primary
                  "
                >

                  <ArrowRight
                    className="
                      size-4
                      text-foreground
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:text-primary-foreground
                    "
                  />

                </div>

              </div>

              {/* ==================================================
                  PRODUCT INFORMATION
              ================================================== */}

              <div className="p-5">

                {/* FAMILY */}

                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary">
                  {product.family}
                </p>

                {/* NAME */}

                <h2
                  className="
                    mt-3
                    font-mono
                    text-xl
                    font-black
                    uppercase
                    leading-tight
                    tracking-[-.03em]
                  "
                >
                  {product.name}
                </h2>

                {/* SUMMARY */}

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">
                  {product.summary}
                </p>

                {/* ==================================================
                    PRODUCT DATA
                ================================================== */}

                <div className="mt-5 grid grid-cols-2 border-y border-border">

                  <div className="border-r border-border py-4 pr-4">

                    <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                      Configurations
                    </p>

                    <p className="mt-2 font-mono text-sm font-black">
                      {product.variants.length}
                    </p>

                  </div>

                  <div className="py-4 pl-4">

                    <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                      System
                    </p>

                    <p className="mt-2 font-mono text-[10px] font-black uppercase">
                      {product.category}
                    </p>

                  </div>

                </div>

                {/* ==================================================
                    TRAVEL RANGE
                ================================================== */}

                <div className="mt-4">

                  <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                    Measuring travel
                  </p>

                  <p className="mt-2 text-xs font-bold leading-5">
                    {product.travel}
                  </p>

                </div>

                {/* ==================================================
                    MODEL NUMBERS
                ================================================== */}

                <div className="mt-5">

                  <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                    Available models
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">

                    {product.variants.map((variant) => (

                      <span
                        key={variant.model}
                        className="
                          border
                          border-border
                          bg-secondary
                          px-2
                          py-1.5
                          font-mono
                          text-[9px]
                          font-bold
                          tracking-wider
                          transition-colors
                          group-hover:border-primary/30
                        "
                      >
                        {variant.model}
                      </span>

                    ))}

                  </div>

                </div>

                {/* ==================================================
                    VIEW PRODUCT
                ================================================== */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-t
                    border-border
                    pt-5
                  "
                >

                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground">
                    View product
                  </span>

                  <span
                    className="
                      font-mono
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-primary
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    Explore →
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* ====================================================
            NO RESULTS
        ==================================================== */}

        {filtered.length === 0 && (

          <div className="border border-border py-24 text-center">

            <div className="mx-auto flex size-12 items-center justify-center border border-primary">

              <Search className="size-5 text-primary" />

            </div>

            <p className="mt-5 font-mono text-sm font-bold uppercase tracking-widest">
              No matching systems found
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Try another model number, family or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("")
                setCategory("All systems")
              }}
              className="
                mt-6
                bg-primary
                px-5
                py-3
                font-mono
                text-[10px]
                font-bold
                uppercase
                tracking-widest
                text-primary-foreground
                transition-opacity
                hover:opacity-90
              "
            >
              Reset filters
            </button>

          </div>

        )}

      </section>

      {/* ======================================================
          CATALOGUE CTA
      ====================================================== */}

      <section className="border-t border-border bg-secondary">

        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

          <div className="grid gap-8 border border-border bg-background p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">

            <div>

              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Need help selecting a system?
              </p>

              <h2
                className="
                  mt-3
                  max-w-3xl
                  font-mono
                  text-2xl
                  font-black
                  uppercase
                  tracking-[-.04em]
                  sm:text-3xl
                "
              >
                Let our team recommend the right configuration.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Tell us your component size, inspection requirements and
                accuracy needs. We can help identify the appropriate
                measurement system.
              </p>

            </div>

            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                bg-primary
                px-6
                py-4
                font-mono
                text-[10px]
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
              Request consultation

              <ArrowRight className="size-4" />
            </Link>

          </div>

        </div>

      </section>

    </main>
  )
}