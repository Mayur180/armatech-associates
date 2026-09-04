'use client'

import Link from 'next/link'
import {
  ChevronDown,
  Menu,
  X,
  MapPin,
  Clock,
} from 'lucide-react'
import { useState } from 'react'
import { products } from '@/lib/catalog'

const groups = [
  { label: 'Manual', category: 'Manual' },
  { label: 'Semi-Automatic', category: 'Semi-auto' },
  { label: 'Automatic', category: 'CNC auto' },
  { label: 'Cabinet Integrated', category: 'Cabinet integrated' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">

      {/* =========================================================
          TOP COMPANY INFORMATION HEADER
          ========================================================= */}

      <div className="border-t-[5px] border-red-700 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 lg:px-8">

          {/* =====================================================
              CRYSTAL LOGO
              ===================================================== */}

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center"
          >
            <img
              src="/logo.png"
              alt="Crystal"
              className="h-[85px] w-auto object-contain"
            />
          </Link>

          {/* =====================================================
              COMPANY INFORMATION
              ===================================================== */}

          <div className="hidden items-center gap-10 lg:flex">

            {/* ADDRESS */}

            <div className="flex items-start gap-3">
              <MapPin
                className="mt-1 h-6 w-6 shrink-0 text-red-600"
              />

              <div>
                <p className="text-[19px] font-bold leading-tight text-black">
                  ARMATECH ASSOCIATES
                </p>

                <p className="mt-1 text-[14px] leading-5 text-black">
                  W-174 A, 'S' Block, M.I.D.C., Bhosari
                  <br />
                  Industrial Estate, Pune - 411 026 (India)
                </p>
              </div>
            </div>

            {/* TIMING */}

            <div className="flex items-start gap-3">
              <Clock
                className="mt-1 h-6 w-6 shrink-0 text-red-600"
              />

              <div>
                <p className="text-[19px] font-bold leading-tight text-black">
                  TIMING
                </p>

                <p className="mt-1 text-[14px] leading-5 text-black">
                  Mon - Sun 9:00 - 18:00
                  <br />
                  Thursday CLOSED
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================
          RED NAVIGATION BAR
          ========================================================= */}

      <div className="bg-red-600">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* =====================================================
              DESKTOP NAVIGATION
              ===================================================== */}

          <nav
            aria-label="Primary navigation"
            className="hidden items-stretch md:flex"
          >

            {/* HOME */}

            <Link
              href="/"
              className="flex h-[52px] w-[110px] items-center justify-center text-[15px] font-semibold text-white transition-colors hover:bg-red-700"
            >
              Home
            </Link>

            {/* ABOUT US */}

            <Link
              href="/about"
              className="flex h-[52px] w-[125px] items-center justify-center text-[15px] font-semibold text-white transition-colors hover:bg-red-700"
            >
              About Us
            </Link>

            {/* =================================================
                PRODUCTS
                ================================================= */}

            <div
              className="relative"
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
            >
              <button
                type="button"
                aria-expanded={mega}
                onClick={() => setMega(!mega)}
                className="flex h-[52px] w-[145px] items-center justify-center gap-1 text-[15px] font-semibold text-white transition-colors hover:bg-red-700"
              >
                Products

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mega ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* PRODUCTS MEGA MENU */}

              {mega && (
                <div className="absolute left-0 top-full z-50 grid w-[760px] grid-cols-4 gap-6 border border-gray-200 bg-white p-6 text-black shadow-2xl">

                  {groups.map((group) => (
                    <div key={group.category}>

                      <p className="border-b border-red-200 pb-2 text-xs font-bold uppercase tracking-widest text-red-600">
                        {group.label}
                      </p>

                      <div className="mt-3 flex flex-col gap-3">

                        {products
                          .filter(
                            (p) => p.category === group.category
                          )
                          .map((p) => (
                            <Link
                              key={p.slug}
                              href={`/products/${p.slug}`}
                              onClick={() => setMega(false)}
                              className="text-sm font-semibold text-gray-800 transition-colors hover:text-red-600"
                            >
                              {p.name}
                            </Link>
                          ))}

                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>

          

            {/* QUALITY */}

            <Link
              href="/services"
              className="flex h-[52px] w-[110px] items-center justify-center text-[15px] font-semibold text-white transition-colors hover:bg-red-700"
            >
              Quality
            </Link>

            {/* CONTACT US */}

            <Link
              href="/contact"
              className="flex h-[52px] w-[135px] items-center justify-center text-[15px] font-semibold text-white transition-colors hover:bg-red-700"
            >
              Contact Us
            </Link>

          </nav>

          {/* =====================================================
              GET A FREE QUOTE
              ===================================================== */}

          <Link
            href="/contact"
            className="hidden h-[52px] items-center justify-center bg-amber-400 px-[26px] text-[15px] font-bold text-black transition-colors hover:bg-amber-300 md:flex"
          >
            Get A Free Quote
          </Link>

          {/* =====================================================
              MOBILE MENU BUTTON
              ===================================================== */}

          <button
            type="button"
            aria-label={
              open
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="my-3 border border-white p-2 text-white transition-colors hover:bg-white hover:text-red-600 md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>

        {/* =========================================================
            MOBILE NAVIGATION
            ========================================================= */}

        {open && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-red-500 bg-red-600 px-5 pb-4 md:hidden"
          >

            {/* HOME */}

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block border-b border-red-500 py-4 font-bold text-white"
            >
              Home
            </Link>

            {/* ABOUT US */}

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="block border-b border-red-500 py-4 font-bold text-white"
            >
              About Us
            </Link>

            {/* PRODUCTS */}

            <details className="border-b border-red-500">
              <summary className="cursor-pointer list-none py-4 font-bold text-white">
                Products
              </summary>

              <div className="grid gap-3 pb-4 pl-4">

                {products.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-white/90 transition-colors hover:text-white"
                  >
                    {p.name}
                  </Link>
                ))}

              </div>
            </details>

           


            {/* QUALITY */}

            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="block border-b border-red-500 py-4 font-bold text-white"
            >
              Quality
            </Link>

            {/* CONTACT US */}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block border-b border-red-500 py-4 font-bold text-white"
            >
              Contact Us
            </Link>

            {/* GET A FREE QUOTE */}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 block bg-amber-400 px-5 py-4 text-center font-bold text-black transition-colors hover:bg-amber-300"
            >
              Get A Free Quote
            </Link>

          </nav>
        )}

      </div>
    </header>
  )
}


// ============================================================
// PRODUCT IMAGE
// ============================================================

export function ProductImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`mix-blend-multiply object-contain transition-transform duration-500 hover:scale-[1.04] ${className}`}
    />
  )
}


// ============================================================
// NAV PRODUCTS
// ============================================================

export const navProducts = products


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default SiteNav