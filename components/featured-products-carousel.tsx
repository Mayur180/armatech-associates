'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

type Product = {
  name: string
  category: string
  code: string
  image: string
  slug: string
}

type Props = {
  products: Product[]
}

export function FeaturedProductsCarousel({
  products,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + 3
  )

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex + 3 < products.length

  const goPrevious = () => {
    if (canGoPrevious) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const goNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="relative">

      {/* =====================================================
          PRODUCT CAROUSEL
      ===================================================== */}
      <div className="relative flex items-start">

        {/* ===================================================
            LEFT ARROW
        =================================================== */}
        <button
          type="button"
          onClick={goPrevious}
          disabled={!canGoPrevious}
          aria-label="Previous products"
          className="
            absolute
            -left-16
            top-[38%]
            z-10
            hidden
            size-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-border
            bg-background
            text-foreground
            transition-all
            hover:border-primary
            hover:bg-primary
            hover:text-primary-foreground
            disabled:cursor-not-allowed
            disabled:opacity-30
            lg:flex
          "
        >
          <ChevronLeft className="size-6" />
        </button>


        {/* ===================================================
            PRODUCTS
        =================================================== */}
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {visibleProducts.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product.slug}
              className="group bg-background"
            >

              {/* PRODUCT IMAGE */}
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-secondary">

                <img
                  src={product.image}
                  alt={`${product.name} catalogue reference`}
                  className="
                    size-full
                    object-contain
                    mix-blend-multiply
                    transition
                    duration-500
                    group-hover:scale-[1.04]
                  "
                />

              </div>


              {/* PRODUCT DETAILS */}
              <div className="px-1 py-5">

                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                  {product.category}
                </p>

                <h3 className="mt-2 font-mono text-lg font-bold uppercase text-foreground">
                  {product.name}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground">
                  {product.code}
                </p>

                <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-widest text-foreground">
                  View details

                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </div>

              </div>

            </Link>
          ))}

        </div>


        {/* ===================================================
            RIGHT ARROW
        =================================================== */}
        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Next products"
          className="
            absolute
            -right-16
            top-[38%]
            z-10
            hidden
            size-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-border
            bg-background
            text-foreground
            transition-all
            hover:border-primary
            hover:bg-primary
            hover:text-primary-foreground
            disabled:cursor-not-allowed
            disabled:opacity-30
            lg:flex
          "
        >
          <ChevronRight className="size-6" />
        </button>

      </div>


      {/* =====================================================
          MOBILE ARROWS
          Shows below products on smaller screens
      ===================================================== */}
      {products.length > 3 && (
        <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">

          <button
            type="button"
            onClick={goPrevious}
            disabled={!canGoPrevious}
            aria-label="Previous products"
            className="
              flex
              size-11
              items-center
              justify-center
              border
              border-border
              bg-background
              text-foreground
              transition-colors
              hover:border-primary
              hover:bg-primary
              hover:text-primary-foreground
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ChevronLeft className="size-5" />
          </button>

          <span className="min-w-[100px] text-center font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {currentIndex + 1} —{' '}
            {Math.min(currentIndex + 3, products.length)} /{' '}
            {products.length}
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next products"
            className="
              flex
              size-11
              items-center
              justify-center
              border
              border-border
              bg-background
              text-foreground
              transition-colors
              hover:border-primary
              hover:bg-primary
              hover:text-primary-foreground
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ChevronRight className="size-5" />
          </button>

        </div>
      )}


      {/* =====================================================
          DESKTOP PRODUCT COUNTER
      ===================================================== */}
      {products.length > 3 && (
        <div className="mt-8 hidden justify-center lg:flex">

          <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {currentIndex + 1} —{' '}
            {Math.min(currentIndex + 3, products.length)} /{' '}
            {products.length}
          </div>

        </div>
      )}

    </div>
  )
}