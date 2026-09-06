import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { notFound } from "next/navigation"

import ProductViewer from "@/components/ProductViewer"
import ModelSelector from "@/components/ModelSelector"

import {
  getProduct,
  products,
} from "@/lib/catalog"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetail({
  params,
}: PageProps) {
  const { slug } = await params

  const product = getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* ========================================================
          PRODUCT PAGE
      ======================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10 lg:py-10">

          {/* ====================================================
              BACK
          ==================================================== */}

          <Link
            href="/products"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-medium
              text-zinc-500
              transition
              hover:text-red-600
            "
          >
            <ArrowLeft size={15} />
            Back to catalogue
          </Link>

          {/* ====================================================
              TWO COLUMN AREA
          ==================================================== */}

          <div className="mt-7 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">

            {/* ==================================================
                LEFT SIDE
                PRODUCT TITLE + IMAGE
            ================================================== */}

            <div className="min-w-0">

              {/* PRODUCT TITLE ABOVE IMAGE */}

              <div className="mb-5 border-l-4 border-red-600 pl-4">

                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-600">
                  {product.badge}
                </p>

                <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                  {product.summary}
                </p>

              </div>

              {/* ==================================================
                  PRODUCT IMAGE
              ================================================== */}

              <div className="relative">

                {/* CORNERS */}

                <div className="absolute left-0 top-0 z-20 h-7 w-7 border-l-2 border-t-2 border-red-600" />

                <div className="absolute right-0 top-0 z-20 h-7 w-7 border-r-2 border-t-2 border-red-600" />

                <div className="absolute bottom-0 left-0 z-20 h-7 w-7 border-b-2 border-l-2 border-red-600" />

                <div className="absolute bottom-0 right-0 z-20 h-7 w-7 border-b-2 border-r-2 border-red-600" />

                <div className="relative overflow-hidden border border-zinc-200 bg-zinc-50">

                  <ProductViewer
                    image={product.image}
                    name={product.name}
                    badge={product.badge}
                    model={product.variants[0]?.model}
                  />

                  {/* ==================================================
                      PRODUCT FEATURE OVERLAYS
                  ================================================== */}

                  {/* CAMERA */}

                  <div className="absolute left-5 top-7 z-30 hidden items-center gap-2 sm:flex">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500 bg-white text-red-600 shadow-sm">
                      <span className="text-sm">◉</span>
                    </div>

                    <div className="border border-zinc-100 bg-white px-2 py-1 shadow-sm">

                      <p className="text-[8px] font-bold uppercase leading-3 tracking-wide text-zinc-900">
                        Industrial
                        <br />
                        CCD Camera
                      </p>

                    </div>

                  </div>

                  {/* LED */}

                  <div className="absolute right-5 top-7 z-30 hidden items-center gap-2 sm:flex">

                    <div className="border border-zinc-100 bg-white px-2 py-1 text-right shadow-sm">

                      <p className="text-[8px] font-bold uppercase leading-3 tracking-wide text-zinc-900">
                        LED Ring
                        <br />
                        Illumination
                      </p>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500 bg-white text-red-600 shadow-sm">
                      <span className="text-sm">♧</span>
                    </div>

                  </div>

                  {/* PRECISION */}

                  <div className="absolute bottom-7 left-5 z-30 hidden items-center gap-2 sm:flex">


                  </div>

                  {/* GRANITE BASE */}

                  <div className="absolute bottom-7 right-5 z-30 hidden items-center gap-2 sm:flex">

                    <div className="border border-zinc-100 bg-white px-2 py-1 text-right shadow-sm">

                      <p className="text-[8px] font-bold uppercase leading-3 tracking-wide text-zinc-900">
                        Heavy Duty
                        <br />
                        Granite Base
                      </p>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500 bg-white text-red-600 shadow-sm">
                      <span className="text-sm">◇</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ==================================================
                RIGHT SIDE
                MODEL SELECTOR
            ================================================== */}

            <div className="min-w-0 lg:border-l lg:border-zinc-200 lg:pl-10">

              <ModelSelector product={product} />

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          TECHNICAL HIGHLIGHTS
      ======================================================== */}

      {product.highlights.length > 0 && (
        <section className="border-y border-zinc-200 bg-zinc-50">

          <div className="mx-auto max-w-[1500px] px-6 py-9 lg:px-10">

            <div className="grid gap-7 lg:grid-cols-[280px_1fr] lg:items-center">

              {/* TITLE */}

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-600">
                  Technical Highlights
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-zinc-950">
                  System Architecture
                </h2>

                <div className="mt-3 h-1 w-14 bg-red-600" />

              </div>

              {/* FEATURES */}

              <div className="grid grid-cols-2 border-l border-zinc-200 sm:grid-cols-3 lg:grid-cols-6">

                {product.highlights
                  .slice(0, 6)
                  .map((highlight, index) => (

                    <div
                      key={`${highlight}-${index}`}
                      className="
                        flex
                        min-h-[60px]
                        items-center
                        gap-2
                        border-b
                        border-r
                        border-zinc-200
                        px-4
                        py-3
                        last:border-b-0
                        lg:border-b-0
                      "
                    >

                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                        ✓
                      </div>

                      <span className="text-[10px] font-semibold leading-4 text-zinc-700">
                        {highlight}
                      </span>

                    </div>

                  ))}

              </div>

            </div>

          </div>

        </section>
      )}

      {/* ========================================================
          BROCHURE
      ======================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10">

          <div className="flex flex-col justify-between gap-5 border border-zinc-200 bg-zinc-50 p-6 sm:flex-row sm:items-center">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-600">
                Technical Catalogue
              </p>

              <h2 className="mt-1 text-xl font-black text-zinc-950">
                Complete {product.name} specifications
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Download the complete technical documentation.
              </p>

            </div>

            <a
              href={product.brochure}
              download
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                bg-zinc-950
                px-6
                py-3.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-white
                transition
                hover:bg-red-600
              "
            >
              <Download size={15} />
              Download PDF
            </a>

          </div>

        </div>

      </section>

    </main>
  )
}