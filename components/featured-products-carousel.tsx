"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { getProduct, type Product } from "@/lib/catalog"

/*
 * Keep the product order fixed so the carousel always runs:
 * Manual -> Semi-Auto -> Fully Automatic -> Cabinet -> VMS -> Manual...
 */

const carouselSlugs = [
  "manual-vmm",
  "semi-automatic-vmm",
  "fully-automatic-vmm",
  "automatic-vmm-cabinet",
  "vms-manual",
]

export default function FeaturedProductsCarousel() {
  const [paused, setPaused] = useState(false)

  const orderedProducts = carouselSlugs
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product))

  /*
   * Duplicate the complete product set.
   *
   * This creates:
   *
   * [1 2 3 4 5] [1 2 3 4 5]
   *
   * When the first set finishes moving,
   * the second set is already visible.
   *
   * The animation then starts again seamlessly.
   */
  const carouselProducts = [...orderedProducts, ...orderedProducts]

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Featured systems
            </p>

            <h2 className="font-mono text-3xl font-black uppercase tracking-[-0.04em] text-zinc-950 sm:text-4xl">
              Tools for a tighter tolerance.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
              Five families, sixteen models — manual benchtop to enclosed servo.
              Open a family for its full specification table and delivery scope.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden shrink-0 text-xs font-bold uppercase tracking-widest underline decoration-primary underline-offset-8 transition-colors hover:text-primary sm:block"
          >
            View all products <ArrowRight className="ml-2 inline size-4" />
          </Link>
        </div>

        {/* =====================================================
            CAROUSEL VIEWPORT
        ====================================================== */}

        <div
          className="group relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* =================================================
              MOVING TRACK
          ================================================== */}

          <div
            className="featured-products-track flex w-max gap-6"
            style={{
              animation: `featured-products-scroll ${
                orderedProducts.length * 2
              }s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {/* =================================================
                FIRST PRODUCT SET
            ================================================== */}

            <div className="flex shrink-0 gap-6">
              {orderedProducts.map((product) => (
                <ProductCard
                  key={`first-${product.slug}`}
                  product={product}
                />
              ))}
            </div>

            {/* Duplicate set for the seamless loop. Hidden from
                screen readers and keyboard navigation. */}

            <div className="flex shrink-0 gap-6" aria-hidden="true">
              {orderedProducts.map((product) => (
                <ProductCard
                  key={`second-${product.slug}`}
                  product={product}
                  focusable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          INFINITE CAROUSEL ANIMATION
      ======================================================== */}

      <style jsx global>{`
        @keyframes featured-products-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-products-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

/* =============================================================
   PRODUCT CARD
============================================================= */

function ProductCard({
  product,
  focusable = true,
}: {
  product: Product
  focusable?: boolean
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      tabIndex={focusable ? undefined : -1}
      className="
        group/card
        block
        w-[82vw]
        max-w-[380px]
        shrink-0
        overflow-hidden
        border
        border-zinc-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-zinc-300
        hover:shadow-xl
        sm:w-[360px]
        lg:w-[380px]
      "
    >
      {/* =======================================================
          IMAGE AREA
      ======================================================== */}

      <div className="relative h-[340px] overflow-hidden border-b border-zinc-200 bg-zinc-50 sm:h-[350px]">

        {/* ArmaTech Label */}

        <div className="absolute left-5 top-0 z-20 border-x border-b border-zinc-200 bg-white px-4 py-3">
          <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-zinc-500">
            ARMATECH
          </span>
        </div>

        {/* Red corner */}

        <div className="absolute bottom-5 right-5 z-20 h-9 w-9 border-b-2 border-r-2 border-zinc-200 transition-colors duration-300 group-hover/card:border-primary" />

        {/* Product Image */}

        <div className="flex h-full items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="
              h-full
              w-full
              object-contain
              transition-transform
              duration-700
              ease-out
              group-hover/card:scale-105
            "
          />
        </div>
      </div>

      {/* =======================================================
          PRODUCT INFORMATION
      ======================================================== */}

      <div className="p-6">

        {/* Category */}

        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          {product.family}
        </p>

        {/* Product Name */}

        <h3 className="mt-3 font-mono text-xl font-black uppercase tracking-tight text-zinc-950">
          {product.name}
        </h3>

        {/* Model */}

        <p className="mt-3 font-mono text-xs font-bold tracking-[0.16em] text-zinc-500">
          {product.variants[0]?.model}
        </p>

        {/* Description */}

        <p className="mt-6 text-sm leading-6 text-zinc-500">
          {product.summary}
        </p>

        {/* Divider */}

        <div className="my-6 h-px bg-zinc-200" />

        {/* View Product */}

        <div className="flex items-center justify-between">

          <span className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-900 transition-colors duration-300 group-hover/card:text-primary">
            View Product
          </span>

          <span
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-zinc-200
              text-zinc-900
              transition-all
              duration-300
              group-hover/card:border-primary
              group-hover/card:bg-primary
              group-hover/card:text-white
            "
          >
            <ArrowRight size={18} />
          </span>

        </div>
      </div>
    </Link>
  )
}
