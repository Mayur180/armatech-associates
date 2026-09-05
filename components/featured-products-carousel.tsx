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
      <div className="relative">

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
            z-20
            hidden
            size-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-border
            bg-white
            text-foreground
            shadow-sm
            transition-all
            duration-300
            hover:border-primary
            hover:bg-primary
            hover:text-white
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-25
            lg:flex
          "
        >
          <ChevronLeft className="size-6" />
        </button>


        {/* ===================================================
            PRODUCTS
        =================================================== */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {visibleProducts.map((product) => (

            <Link
              href={`/products/${product.slug}`}
              key={product.slug}
              className="
                group
                block
                overflow-hidden
                border
                border-border
                bg-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-xl
              "
            >

              {/* =================================================
                  IMAGE AREA
              ================================================= */}
              <div
                className="
                  relative
                  flex
                  aspect-[4/3]
                  items-center
                  justify-center
                  overflow-hidden
                  bg-[#f7f7f7]
                "
              >

                {/* Small technical label */}
                <div
                  className="
                    absolute
                    left-4
                    top-4
                    z-10
                    border
                    border-border
                    bg-white/90
                    px-3
                    py-1.5
                    font-mono
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-muted-foreground
                  "
                >
                  ArmaTech
                </div>


                {/* Image */}
                <img
                  src={product.image}
                  alt={`${product.name} catalogue reference`}
                  className="
                    size-full
                    object-contain
                    mix-blend-multiply
                    px-8
                    py-6
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.07]
                  "
                />


                {/* Red corner marker */}
                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    size-7
                    border-b-2
                    border-r-2
                    border-primary
                    opacity-60
                    transition-all
                    duration-300
                    group-hover:size-9
                    group-hover:opacity-100
                  "
                />

              </div>


              {/* =================================================
                  PRODUCT DETAILS
              ================================================= */}
              <div className="border-t border-border px-5 py-6">

                {/* Category */}
                <p
                  className="
                    font-mono
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-primary
                  "
                >
                  {product.category}
                </p>


                {/* Product name */}
                <h3
                  className="
                    mt-2
                    font-mono
                    text-xl
                    font-bold
                    uppercase
                    leading-tight
                    tracking-[-0.02em]
                    text-foreground
                  "
                >
                  {product.name}
                </h3>


                {/* Model number */}
                <p
                  className="
                    mt-2
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    tracking-widest
                    text-muted-foreground
                  "
                >
                  {product.code}
                </p>


                {/* Description */}
                <p
                  className="
                    mt-4
                    max-w-[240px]
                    text-sm
                    leading-6
                    text-muted-foreground
                  "
                >
                  Precision Video Measuring Machine
                </p>


                {/* Divider */}
                <div className="my-5 h-px w-full bg-border" />


                {/* View Product */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-foreground
                    transition-colors
                    group-hover:text-primary
                  "
                >
                  <span>
                    View Product
                  </span>

                  <span
                    className="
                      flex
                      size-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border
                      transition-all
                      duration-300
                      group-hover:border-primary
                      group-hover:bg-primary
                      group-hover:text-white
                    "
                  >
                    <ArrowRight
                      className="
                        size-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                    />
                  </span>
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
            z-20
            hidden
            size-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-border
            bg-white
            text-foreground
            shadow-sm
            transition-all
            duration-300
            hover:border-primary
            hover:bg-primary
            hover:text-white
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-25
            lg:flex
          "
        >
          <ChevronRight className="size-6" />
        </button>

      </div>


      {/* =====================================================
          MOBILE CONTROLS
      ===================================================== */}
      {products.length > 3 && (
        <div className="mt-8 flex items-center justify-center gap-5 lg:hidden">

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
              rounded-full
              border
              border-border
              bg-white
              transition-all
              hover:border-primary
              hover:bg-primary
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ChevronLeft className="size-5" />
          </button>


          {/* Counter */}
          <div className="text-center">

            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Products
            </p>

            <p className="mt-1 font-mono text-xs font-bold">
              {currentIndex + 1} —{' '}
              {Math.min(currentIndex + 3, products.length)}
              {' / '}
              {products.length}
            </p>

          </div>


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
              rounded-full
              border
              border-border
              bg-white
              transition-all
              hover:border-primary
              hover:bg-primary
              hover:text-white
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
        <div className="mt-7 hidden items-center justify-center gap-3 lg:flex">

          {/* Progress indicator */}
          <div className="flex items-center gap-1.5">

            {products.map((_, index) => (
              <span
                key={index}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    index >= currentIndex &&
                    index < currentIndex + 3
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-border'
                  }
                `}
              />
            ))}

          </div>

        </div>
      )}

    </div>
  )
}