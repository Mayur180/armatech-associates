"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

type Product = {
  name: string
  category: string
  code: string
  image: string
  slug: string
}

const products: Product[] = [
  {
    name: "MANUAL VMM",
    category: "VIDEO MEASURING MACHINE",
    code: "AA-9011M",
    image:
      "image/maunal.png",
    slug: "manual-vmm",
  },
  {
    name: "SEMI-AUTO VMM",
    category: "VIDEO MEASURING MACHINE",
    code: "AA-9021SA",
    image:
      "image/semi.png",
    slug: "semi-automatic-vmm",
  },
  {
    name: "FULLY AUTOMATIC VMM",
    category: "VIDEO MEASURING MACHINE",
    code: "AA-9031A",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/automatic-bPz5STarFfXkj1fNgBOz2KFbBnrSIY.png",
    slug: "cnc-auto-vmm",
  },
  {
    name: "AUTOMATIC VMM WITH CABINET",
    category: "VIDEO MEASURING MACHINE",
    code: "AA-9041AC",
    image:
      "image/automatic with cabinet.png",
    slug: "automatic-vmm-cabinet",
  },
  {
    name: "VMS MANUAL",
    category: "VISION MEASURING SYSTEM",
    code: "AA-9051V",
    image:
      "image/vms.png",
    slug: "vms-manual",
  },
]

export default function FeaturedProductsCarousel() {
  const [paused, setPaused] = useState(false)

  /*
   * Keep the product order fixed.
   * This guarantees the carousel always runs:
   *
   * Manual
   * ↓
   * Semi-Auto
   * ↓
   * Fully Automatic
   * ↓
   * Automatic with Cabinet
   * ↓
   * VMS Manual
   * ↓
   * Manual again...
   */

  const orderedProducts = [
    "manual-vmm",
    "semi-automatic-vmm",
    "cnc-auto-vmm",
    "automatic-vmm-cabinet",
    "vms-manual",
  ]
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean) as Product[]

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

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-red-600">
              Our Products
            </p>

            <h2 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              Precision Measurement Systems
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
              Explore our range of precision video measuring and vision
              measurement systems designed for accurate industrial inspection.
            </p>
          </div>
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
            className="flex w-max gap-6"
            style={{
              animation: `featured-products-scroll ${
                orderedProducts.length * 8
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

            {/* =================================================
                SECOND PRODUCT SET
            ================================================== */}

            <div className="flex shrink-0 gap-6">
              {orderedProducts.map((product) => (
                <ProductCard
                  key={`second-${product.slug}`}
                  product={product}
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
          .featured-products-reduced-motion {
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

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
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

        <div className="absolute bottom-5 right-5 z-20 h-9 w-9 border-b-2 border-r-2 border-zinc-200 transition-colors duration-300 group-hover/card:border-red-600" />

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

        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">
          {product.category}
        </p>

        {/* Product Name */}

        <h3 className="mt-3 font-mono text-xl font-black tracking-tight text-zinc-950">
          {product.name}
        </h3>

        {/* Model */}

        <p className="mt-3 font-mono text-xs font-bold tracking-[0.16em] text-zinc-500">
          {product.code}
        </p>

        {/* Description */}

        <p className="mt-6 text-sm text-zinc-500">
          Precision Video Measuring Machine
        </p>

        {/* Divider */}

        <div className="my-6 h-px bg-zinc-200" />

        {/* View Product */}

        <div className="flex items-center justify-between">

          <span className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-900 transition-colors duration-300 group-hover/card:text-red-600">
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
              group-hover/card:border-red-600
              group-hover/card:bg-red-600
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