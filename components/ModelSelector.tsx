"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  Ruler,
  Target,
} from "lucide-react"

import type { Product } from "@/lib/catalog"

type ModelSelectorProps = {
  product: Product
}

export default function ModelSelector({
  product,
}: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState<
    Product["variants"][number] | null
  >(null)

  /* ============================================================
     PREVENT BACKGROUND SCROLL
  ============================================================ */

  useEffect(() => {
    if (selectedModel) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedModel])

  /* ============================================================
     ESC TO CLOSE
  ============================================================ */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedModel(null)
      }
    }

    if (selectedModel) {
      window.addEventListener(
        "keydown",
        handleEscape
      )
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      )
    }
  }, [selectedModel])

  /* ============================================================
     SELECTED MODEL INDEX
  ============================================================ */

  const selectedIndex = selectedModel
    ? product.variants.findIndex(
        (variant) =>
          variant.model === selectedModel.model
      )
    : -1

  /* ============================================================
     MODEL SPECIFICATIONS
  ============================================================ */

  const selectedSpecifications =
    selectedModel && selectedIndex >= 0
      ? product.specifications.map(
          (specification) => ({
            label: specification.label,
            value:
              specification.values[selectedIndex] ??
              specification.values[0] ??
              "—",
          })
        )
      : []

  /* ============================================================
     SPEC HELPER
  ============================================================ */

  const getSpec = (keyword: string) => {
    return (
      selectedSpecifications.find((item) =>
        item.label
          .toLowerCase()
          .includes(keyword.toLowerCase())
      )?.value ?? "—"
    )
  }

  const accuracy = getSpec("accuracy")
  const resolution = getSpec("resolution")
  const weight = getSpec("weight")
  const dimension = getSpec("dimension")

  /* ============================================================
     CLOSE
  ============================================================ */

  const closeModal = () => {
    setSelectedModel(null)
  }

  return (
    <>
      {/* ========================================================
          MODEL HEADER
      ======================================================== */}

      <div>

        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-600">
          Configure Your System
        </p>

        <div className="mt-2 flex items-end justify-between">

          <div>

            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-4xl">
              Select Model
            </h2>

            <div className="mt-3 h-1 w-14 bg-red-600" />

          </div>

          <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {product.variants.length} Options
          </span>

        </div>

      </div>

      {/* ========================================================
          MODELS
      ======================================================== */}

      <div className="mt-7 space-y-4">

        {product.variants.map(
          (variant, index) => (

            <button
              key={variant.model}
              type="button"
              onClick={() =>
                setSelectedModel(variant)
              }
              className="group block w-full text-left"
            >

              <div
                className={`
                  relative
                  overflow-hidden
                  border
                  bg-white
                  transition-all
                  duration-300
                  hover:border-red-500
                  hover:shadow-lg
                  ${
                    index === 0
                      ? "border-red-200 bg-red-50/20"
                      : "border-zinc-200"
                  }
                `}
              >

                {/* LEFT RED LINE */}

                <div
                  className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-1
                    ${
                      index === 0
                        ? "bg-red-600"
                        : "bg-transparent group-hover:bg-red-600"
                    }
                  `}
                />

                {/* MAIN */}

                <div className="flex items-center gap-4 px-5 py-5 sm:px-6">

                  {/* NUMBER */}

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      border
                      text-[10px]
                      font-bold
                      ${
                        index === 0
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-zinc-200 text-zinc-500 group-hover:border-red-600 group-hover:text-red-600"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* INFO */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-base font-black tracking-[0.08em] text-zinc-950 sm:text-lg">
                        {variant.model}
                      </h3>

                      {index === 0 && (
                        <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-red-600">
                          Recommended
                        </span>
                      )}

                    </div>

                    <div className="mt-1.5 flex items-center gap-2">

                      <span className="text-xs text-zinc-500">
                        Travel
                      </span>

                      <span className="text-xs font-bold text-zinc-900">
                        {variant.travel}
                      </span>

                      <span className="text-[9px] text-zinc-400">
                        mm
                      </span>

                    </div>

                  </div>

                  {/* ARROW */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      border
                      border-zinc-200
                      transition
                      group-hover:border-red-600
                      group-hover:bg-red-600
                    "
                  >

                    <ArrowRight
                      size={17}
                      className="
                        text-red-600
                        transition
                        group-hover:translate-x-1
                        group-hover:text-white
                      "
                    />

                  </div>

                </div>

                {/* FOOTER */}

                <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-5 py-2.5 sm:px-6">

                  <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Precision Configuration
                  </span>

                  <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-700 transition group-hover:text-red-600">
                    Select →
                  </span>

                </div>

              </div>

            </button>

          )
        )}

      </div>

      {/* ========================================================
          MODEL OVERLAY
      ======================================================== */}

      {selectedModel && (

        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/70
            px-4
            py-6
            backdrop-blur-sm
          "
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal()
            }
          }}
        >

          {/* MODAL */}

          <div
            className="
              relative
              w-full
              max-w-6xl
              overflow-hidden
              bg-white
              shadow-2xl
            "
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            {/* RED TOP */}

            <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />

            {/* CLOSE */}

            <button
              type="button"
              onClick={closeModal}
              className="
                absolute
                right-4
                top-4
                z-50
                flex
                h-10
                w-10
                items-center
                justify-center
                border
                border-zinc-200
                bg-white
                text-zinc-700
                transition
                hover:border-red-600
                hover:bg-red-600
                hover:text-white
              "
            >
              <X size={18} />
            </button>

            {/* SCROLL */}

            <div className="max-h-[90vh] overflow-y-auto">

              {/* HEADER */}

              <div className="border-b border-zinc-200 px-6 pb-6 pt-9 sm:px-9">

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-600">
                  {product.name}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3">

                  <h2 className="text-3xl font-black tracking-[0.08em] text-zinc-950">
                    {selectedModel.model}
                  </h2>

                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                    Selected Configuration
                  </span>

                </div>

              </div>

              {/* ==================================================
                  MODAL CONTENT
              ================================================== */}

              <div className="grid lg:grid-cols-2">

                {/* IMAGE */}

                <div className="border-b border-zinc-200 bg-zinc-50 p-6 lg:border-b-0 lg:border-r">

                  <div className="flex min-h-[350px] items-center justify-center bg-white p-7">

                    <img
                      src={product.image}
                      alt={`${product.name} ${selectedModel.model}`}
                      className="max-h-[330px] w-full object-contain"
                    />

                  </div>

                  {/* RANGE / ACCURACY */}

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    <div className="border border-zinc-200 bg-white p-4">

                      <div className="flex items-center gap-2 text-red-600">

                        <Ruler size={14} />

                        <span className="text-[8px] font-bold uppercase tracking-widest">
                          Measuring Range
                        </span>

                      </div>

                      <p className="mt-2 text-sm font-black text-zinc-950">
                        {selectedModel.travel}
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-widest text-zinc-400">
                        X × Y × Z mm
                      </p>

                    </div>

                    <div className="border border-zinc-200 bg-white p-4">

                      <div className="flex items-center gap-2 text-red-600">

                        <Target size={14} />

                        <span className="text-[8px] font-bold uppercase tracking-widest">
                          Accuracy
                        </span>

                      </div>

                      <p className="mt-2 text-sm font-black text-zinc-950">
                        {accuracy}
                      </p>

                    </div>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="p-6 sm:p-8">

                  {/* FEATURES */}

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="h-4 w-1 bg-red-600" />

                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Key Features
                      </h3>

                    </div>

                    <div className="mt-4 space-y-2">

                      {product.highlights.map(
                        (highlight, index) => (

                          <div
                            key={`${highlight}-${index}`}
                            className="flex items-start gap-3"
                          >

                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">

                              <Check
                                size={11}
                                strokeWidth={3}
                              />

                            </div>

                            <p className="text-xs leading-5 text-zinc-700">
                              {highlight}
                            </p>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                  {/* SPECIFICATIONS */}

                  <div className="mt-7">

                    <div className="flex items-center gap-2">

                      <div className="h-4 w-1 bg-red-600" />

                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Technical Specifications
                      </h3>

                    </div>

                    <div className="mt-4 overflow-hidden border border-zinc-200">

                      {selectedSpecifications.map(
                        (specification, index) => (

                          <div
                            key={`${specification.label}-${index}`}
                            className={`
                              grid
                              grid-cols-[42%_58%]
                              ${
                                index <
                                selectedSpecifications.length - 1
                                  ? "border-b border-zinc-200"
                                  : ""
                              }
                            `}
                          >

                            <div className="bg-zinc-50 px-3 py-2 text-[9px] font-bold text-zinc-600">
                              {specification.label}
                            </div>

                            <div className="px-3 py-2 text-[9px] text-zinc-700">
                              {specification.value}
                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                  {/* EXTRA */}

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    <div className="border border-zinc-200 p-3">

                      <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400">
                        Resolution
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {resolution}
                      </p>

                    </div>

                    <div className="border border-zinc-200 p-3">

                      <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400">
                        Weight
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {weight}
                      </p>

                    </div>

                    <div className="col-span-2 border border-zinc-200 p-3">

                      <p className="text-[7px] font-bold uppercase tracking-widest text-zinc-400">
                        Machine Dimension
                      </p>

                      <p className="mt-1 text-xs font-black">
                        {dimension}
                      </p>

                    </div>

                  </div>

                  {/* REQUEST QUOTE ONLY INSIDE OVERLAY */}

                  <Link
                    href={`/contact?product=${encodeURIComponent(
                      product.slug
                    )}&model=${encodeURIComponent(
                      selectedModel.model
                    )}`}
                    onClick={closeModal}
                    className="
                      mt-5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      bg-red-600
                      px-6
                      py-3.5
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-white
                      transition
                      hover:bg-red-700
                    "
                  >
                    Request a Quote
                    <ArrowRight size={15} />
                  </Link>

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-6 py-4 sm:px-9">

                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">
                  ArmaTech Associates • Precision Measurement
                </span>

                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-zinc-500
                    transition
                    hover:text-red-600
                  "
                >
                  <ArrowLeft size={13} />
                  Back to Models
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  )
}