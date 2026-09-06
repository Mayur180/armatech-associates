"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Ruler,
  Target,
  X,
} from "lucide-react"

import type { Product } from "@/lib/catalog"

// ============================================================
// TYPES
// ============================================================

type ModelSelectorProps = {
  product: Product
}

// ============================================================
// COMPONENT
// ============================================================

export default function ModelSelector({
  product,
}: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] =
    useState<Product["variants"][number] | null>(null)

  // ============================================================
  // SELECTED MODEL INDEX
  // ============================================================

  const selectedIndex = useMemo(() => {
    if (!selectedModel) return -1

    return product.variants.findIndex(
      (variant) => variant.model === selectedModel.model
    )
  }, [selectedModel, product.variants])

  // ============================================================
  // SELECTED SPECIFICATIONS
  // ============================================================

  const selectedSpecifications = useMemo(() => {
    if (!selectedModel || selectedIndex < 0) {
      return []
    }

    return product.specifications.map((specification) => ({
      label: specification.label,
      value:
        specification.values[selectedIndex] ??
        specification.values[0] ??
        "—",
    }))
  }, [
    selectedModel,
    selectedIndex,
    product.specifications,
  ])

  // ============================================================
  // SPEC HELPER
  // ============================================================

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

  // ============================================================
  // PREVENT BACKGROUND SCROLL
  // ============================================================

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

  // ============================================================
  // ESC TO CLOSE
  // ============================================================

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedModel(null)
      }
    }

    if (selectedModel) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      )
    }
  }, [selectedModel])

  // ============================================================
  // CLOSE MODAL
  // ============================================================

  const closeModal = () => {
    setSelectedModel(null)
  }

  // ============================================================
  // OPEN MODEL
  // ============================================================

  const openModel = (
    model: Product["variants"][number]
  ) => {
    setSelectedModel(model)
  }

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <>
      {/* ========================================================
          OUTER DESIGN
          EXACTLY BASED ON YOUR REFERENCE CODE
      ======================================================== */}

      <div>
        {/* ======================================================
            MODEL HEADER
        ====================================================== */}

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
          MODEL CARDS
      ======================================================== */}

      <div className="mt-7 space-y-4">
        {product.variants.map((variant, index) => (
          <button
            key={variant.model}
            type="button"
            onClick={() => openModel(variant)}
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

              {/* MAIN MODEL ROW */}

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

                {/* MODEL INFORMATION */}

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

              {/* CARD FOOTER */}

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
        ))}
      </div>

      {/* ========================================================
          INNER MODEL MODAL
          BASED ON YOUR 3RD REFERENCE IMAGE
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
          {/* ====================================================
              INNER MODAL
          ==================================================== */}

          <div
            className="
              relative
              w-full
              max-w-[1450px]
              overflow-hidden
              bg-white
              shadow-2xl
            "
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* RED TOP LINE */}

            <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />

            {/* ==================================================
                CLOSE BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
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

            {/* ==================================================
                SCROLL AREA
            ================================================== */}

            <div className="max-h-[90vh] overflow-y-auto">

              {/* =================================================
                  INNER HEADER
              ================================================= */}

              <div className="border-b border-zinc-200 px-6 pb-6 pt-9 sm:px-9">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-600">
                  {product.name}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h2 className="font-serif text-3xl font-black tracking-[0.08em] text-zinc-950 sm:text-4xl">
                    {selectedModel.model}
                  </h2>

                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                    Selected Configuration
                  </span>
                </div>
              </div>

              {/* =================================================
                  INNER CONTENT

                  LEFT:
                  IMAGE
                  RANGE
                  ACCURACY
                  KEY FEATURES

                  RIGHT:
                  TECHNICAL SPECIFICATIONS
              ================================================= */}

              <div className="grid lg:grid-cols-2">

                {/* =================================================
                    LEFT COLUMN
                ================================================= */}

                <div className="border-b border-zinc-200 p-5 sm:p-7 lg:border-b-0 lg:border-r">

                  {/* ===============================================
                      MACHINE IMAGE
                  =============================================== */}

                  <div className="flex min-h-[350px] items-center justify-center bg-white sm:min-h-[390px]">
                    <img
                      src={product.image}
                      alt={`${product.name} ${selectedModel.model}`}
                      className="
                        max-h-[360px]
                        w-full
                        object-contain
                        p-6
                        sm:max-h-[390px]
                      "
                    />
                  </div>

                  {/* ===============================================
                      MEASURING RANGE + ACCURACY
                  =============================================== */}

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    {/* MEASURING RANGE */}

                    <div className="border border-zinc-200 bg-white p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-red-600">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
                          <Ruler size={14} />
                        </div>

                        <span className="text-[8px] font-bold uppercase tracking-widest sm:text-[9px]">
                          Measuring Range
                        </span>
                      </div>

                      <p className="mt-4 font-serif text-lg font-black text-zinc-950 sm:text-xl">
                        {selectedModel.travel}
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-widest text-zinc-400">
                        X × Y × Z mm
                      </p>
                    </div>

                    {/* ACCURACY */}

                    <div className="border border-zinc-200 bg-white p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-red-600">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
                          <Target size={14} />
                        </div>

                        <span className="text-[8px] font-bold uppercase tracking-widest sm:text-[9px]">
                          Accuracy
                        </span>
                      </div>

                      <p className="mt-4 font-serif text-lg font-black text-zinc-950 sm:text-xl">
                        {accuracy}
                      </p>
                    </div>

                  </div>

                  {/* ===============================================
                      KEY FEATURES
                      BELOW RANGE + ACCURACY
                  =============================================== */}

                  <section className="mt-7">

                    {/* HEADING */}

                    <div className="flex items-center gap-3">
                      <div className="h-7 w-1 bg-red-600" />

                      <h3 className="font-serif text-base font-black uppercase tracking-[0.18em] text-zinc-900 sm:text-lg">
                        Key Features
                      </h3>
                    </div>

                    {/* FEATURES */}

                    <div className="mt-5 space-y-3">

                      {product.highlights.map(
                        (highlight, index) => (
                          <div
                            key={`${highlight}-${index}`}
                            className="flex items-start gap-3"
                          >
                            <div
                              className="
                                mt-0.5
                                flex
                                h-6
                                w-6
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-red-50
                                text-red-600
                              "
                            >
                              <Check
                                size={12}
                                strokeWidth={3}
                              />
                            </div>

                            <p className="text-sm leading-6 text-zinc-700">
                              {highlight}
                            </p>
                          </div>
                        )
                      )}

                    </div>
                  </section>

                </div>

                {/* =================================================
                    RIGHT COLUMN
                    TECHNICAL SPECIFICATIONS
                ================================================= */}

                <div className="p-5 sm:p-7">

                  {/* ===============================================
                      TECHNICAL SPECIFICATIONS
                  =============================================== */}

                  <section>

                    {/* HEADING */}

                    <div className="flex items-center gap-3">
                      <div className="h-7 w-1 bg-red-600" />

                      <h3 className="font-serif text-base font-black uppercase tracking-[0.18em] text-zinc-900 sm:text-lg">
                        Technical Specifications
                      </h3>
                    </div>

                    {/* SPECIFICATION TABLE */}

                    <div className="mt-5 overflow-hidden border border-zinc-200">

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

                            {/* LABEL */}

                            <div className="bg-zinc-50 px-4 py-3 sm:px-5 sm:py-4">
                              <p className="font-serif text-xs font-bold leading-5 text-zinc-700 sm:text-sm">
                                {specification.label}
                              </p>
                            </div>

                            {/* VALUE */}

                            <div className="bg-white px-4 py-3 sm:px-5 sm:py-4">
                              <p className="text-xs leading-5 text-zinc-700 sm:text-sm">
                                {specification.value}
                              </p>
                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </section>

                  {/* ===============================================
                      SELECTED MODEL
                  =============================================== */}

                  <div className="mt-7 border border-zinc-200 bg-zinc-50 p-5">

                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Selected Model
                    </p>

                    <p className="mt-2 font-serif text-2xl font-black tracking-wide text-zinc-950">
                      {selectedModel.model}
                    </p>

                    <p className="mt-2 text-sm text-zinc-600">
                      Measuring range:{" "}
                      <span className="font-bold text-zinc-900">
                        {selectedModel.travel} mm
                      </span>
                    </p>

                  </div>

                  {/* ===============================================
                      OTHER CONFIGURATIONS
                  =============================================== */}

                  {product.variants.length > 1 && (
                    <div className="mt-7">

                      <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        Other Configurations
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {product.variants.map(
                          (variant) => {
                            const isSelected =
                              variant.model ===
                              selectedModel.model

                            return (
                              <button
                                key={variant.model}
                                type="button"
                                onClick={() =>
                                  openModel(variant)
                                }
                                className={`
                                  border
                                  px-4
                                  py-2
                                  text-[10px]
                                  font-bold
                                  transition
                                  ${
                                    isSelected
                                      ? "border-red-600 bg-red-600 text-white"
                                      : "border-zinc-300 bg-white text-zinc-700 hover:border-red-600 hover:text-red-600"
                                  }
                                `}
                              >
                                {variant.model}
                              </button>
                            )
                          }
                        )}

                      </div>
                    </div>
                  )}

                  {/* ===============================================
                      REQUEST QUOTE
                  =============================================== */}

                  <Link
                    href={`/contact?product=${encodeURIComponent(
                      product.slug
                    )}&model=${encodeURIComponent(
                      selectedModel.model
                    )}`}
                    onClick={closeModal}
                    className="
                      mt-7
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

              {/* =================================================
                  INNER FOOTER
              ================================================= */}

              <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-6 py-4 sm:px-9">

                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">
                  Precision Measurement
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