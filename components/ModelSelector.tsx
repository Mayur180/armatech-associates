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
    if (!selectedModel) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedModel(null)
      }
    }

    window.addEventListener("keydown", handleEscape)

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
          MODEL HEADER
      ======================================================== */}

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-600">
          Configure Your System
        </p>

        <div className="mt-2 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-4xl">
              Select Model
            </h2>

            <div className="mt-3 h-1 w-14 bg-red-600" />
          </div>

          <span className="mb-1 shrink-0 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
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

              <div className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
                {/* NUMBER */}

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    border
                    text-[10px]
                    font-bold
                    sm:h-11
                    sm:w-11
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
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="break-words text-sm font-black tracking-[0.06em] text-zinc-950 sm:text-lg sm:tracking-[0.08em]">
                      {variant.model}
                    </h3>

                    {index === 0 && (
                      <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-red-600">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[11px] text-zinc-500 sm:text-xs">
                      Travel
                    </span>

                    <span className="text-[11px] font-bold text-zinc-900 sm:text-xs">
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
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    border
                    border-zinc-200
                    transition
                    group-hover:border-red-600
                    group-hover:bg-red-600
                    sm:h-10
                    sm:w-10
                  "
                >
                  <ArrowRight
                    size={16}
                    className="
                      text-red-600
                      transition
                      group-hover:translate-x-1
                      group-hover:text-white
                      sm:h-[17px]
                      sm:w-[17px]
                    "
                  />
                </div>
              </div>

              {/* CARD FOOTER */}

              <div className="flex min-h-[36px] items-center justify-between gap-3 border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 sm:px-6">
                <span className="min-w-0 truncate text-[8px] font-semibold uppercase tracking-[0.12em] text-zinc-500 sm:tracking-[0.16em]">
                  Precision Configuration
                </span>

                <span className="shrink-0 text-[8px] font-bold uppercase tracking-[0.12em] text-zinc-700 transition group-hover:text-red-600 sm:tracking-[0.16em]">
                  Select →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ========================================================
          MODEL MODAL
      ======================================================== */}

      {selectedModel && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-start
            justify-center
            overflow-y-auto
            bg-black/70
            px-2
            py-2
            backdrop-blur-sm
            sm:items-center
            sm:px-4
            sm:py-6
          "
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
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
              my-auto
              w-full
              max-w-[1450px]
              overflow-hidden
              bg-white
              shadow-2xl
              sm:max-h-[94vh]
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
              aria-label="Close model details"
              className="
                absolute
                right-2
                top-2
                z-50
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-zinc-200
                bg-white
                text-zinc-700
                shadow-sm
                transition
                hover:border-red-600
                hover:bg-red-600
                hover:text-white
                sm:right-4
                sm:top-4
                sm:h-10
                sm:w-10
              "
            >
              <X size={17} />
            </button>

            {/* ==================================================
                SCROLL AREA
            ================================================== */}

            <div className="max-h-[96vh] overflow-y-auto overscroll-contain sm:max-h-[94vh]">

              {/* =================================================
                  INNER HEADER
              ================================================= */}

              <div className="border-b border-zinc-200 px-4 pb-5 pt-8 pr-14 sm:px-9 sm:pb-6 sm:pt-9 sm:pr-20">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600 sm:tracking-[0.25em]">
                  {product.name}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h2 className="break-words font-serif text-2xl font-black tracking-[0.06em] text-zinc-950 sm:text-4xl sm:tracking-[0.08em]">
                    {selectedModel.model}
                  </h2>

                  <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-400 sm:text-[9px] sm:tracking-widest">
                    Selected Configuration
                  </span>
                </div>
              </div>

              {/* =================================================
                  INNER CONTENT
              ================================================= */}

              <div className="grid lg:grid-cols-2">

                {/* =================================================
                    LEFT COLUMN
                ================================================= */}

                <div className="border-b border-zinc-200 p-3 sm:p-7 lg:border-b-0 lg:border-r">

                  {/* ===============================================
                      MACHINE IMAGE
                  =============================================== */}

                  <div className="flex min-h-[230px] items-center justify-center bg-white sm:min-h-[390px]">
                    <img
                      src={product.image}
                      alt={`${product.name} ${selectedModel.model}`}
                      className="
                        max-h-[240px]
                        w-full
                        object-contain
                        p-3
                        sm:max-h-[390px]
                        sm:p-6
                      "
                    />
                  </div>

                  {/* ===============================================
                      RANGE + ACCURACY
                  =============================================== */}

                  <div className="mt-3 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:mt-4">

                    {/* MEASURING RANGE */}

                    <div className="border border-zinc-200 bg-white p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-red-600">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50">
                          <Ruler size={14} />
                        </div>

                        <span className="text-[8px] font-bold uppercase tracking-[0.12em] sm:text-[9px] sm:tracking-widest">
                          Measuring Range
                        </span>
                      </div>

                      <p className="mt-4 break-words font-serif text-lg font-black text-zinc-950 sm:text-xl">
                        {selectedModel.travel}
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-widest text-zinc-400">
                        X × Y × Z mm
                      </p>
                    </div>

                    {/* ACCURACY */}

                    <div className="border border-zinc-200 bg-white p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-red-600">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50">
                          <Target size={14} />
                        </div>

                        <span className="text-[8px] font-bold uppercase tracking-[0.12em] sm:text-[9px] sm:tracking-widest">
                          Accuracy
                        </span>
                      </div>

                      <p className="mt-4 break-words font-serif text-lg font-black text-zinc-950 sm:text-xl">
                        {accuracy}
                      </p>
                    </div>

                  </div>

                  {/* ===============================================
                      KEY FEATURES
                  =============================================== */}

                  <section className="mt-6 sm:mt-7">

                    <div className="flex items-center gap-3">
                      <div className="h-7 w-1 shrink-0 bg-red-600" />

                      <h3 className="font-serif text-base font-black uppercase tracking-[0.12em] text-zinc-900 sm:text-lg sm:tracking-[0.18em]">
                        Key Features
                      </h3>
                    </div>

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

                            <p className="min-w-0 text-[13px] leading-6 text-zinc-700 sm:text-sm">
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
                ================================================= */}

                <div className="p-3 sm:p-7">

                  {/* ===============================================
                      TECHNICAL SPECIFICATIONS
                  =============================================== */}

                  <section>
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-1 shrink-0 bg-red-600" />

                      <h3 className="font-serif text-base font-black uppercase tracking-[0.12em] text-zinc-900 sm:text-lg sm:tracking-[0.18em]">
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
                              grid-cols-[40%_60%]
                              sm:grid-cols-[42%_58%]
                              ${
                                index <
                                selectedSpecifications.length - 1
                                  ? "border-b border-zinc-200"
                                  : ""
                              }
                            `}
                          >
                            {/* LABEL */}

                            <div className="min-w-0 bg-zinc-50 px-3 py-3 sm:px-5 sm:py-4">
                              <p className="break-words font-serif text-[11px] font-bold leading-5 text-zinc-700 sm:text-sm">
                                {specification.label}
                              </p>
                            </div>

                            {/* VALUE */}

                            <div className="min-w-0 bg-white px-3 py-3 sm:px-5 sm:py-4">
                              <p className="break-words text-[11px] leading-5 text-zinc-700 sm:text-sm">
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

                  <div className="mt-5 border border-zinc-200 bg-zinc-50 p-4 sm:mt-7 sm:p-5">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Selected Model
                    </p>

                    <p className="mt-2 break-words font-serif text-xl font-black tracking-wide text-zinc-950 sm:text-2xl">
                      {selectedModel.model}
                    </p>

                    <p className="mt-2 text-[13px] leading-5 text-zinc-600 sm:text-sm">
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
                    <div className="mt-6 sm:mt-7">
                      <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        Other Configurations
                      </p>

                      <div className="grid grid-cols-2 gap-2 min-[480px]:flex min-[480px]:flex-wrap">
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
                                  min-h-[40px]
                                  border
                                  px-3
                                  py-2
                                  text-[9px]
                                  font-bold
                                  transition
                                  sm:px-4
                                  sm:text-[10px]
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
                      mt-6
                      flex
                      min-h-[48px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      bg-red-600
                      px-5
                      py-3.5
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-white
                      transition
                      hover:bg-red-700
                      sm:mt-7
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

              <div className="flex flex-col gap-3 border-t border-zinc-200 bg-zinc-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-9">

                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">
                  Precision Measurement
                </span>

                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    inline-flex
                    min-h-[36px]
                    items-center
                    gap-2
                    self-start
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-zinc-500
                    transition
                    hover:text-red-600
                    sm:self-auto
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