"use client"

import { useRef, useState } from "react"
import { Move3D, RotateCcw } from "lucide-react"

type ProductViewerProps = {
  image: string
  name: string
  badge: string
  model?: string
}

export default function ProductViewer({
  image,
  name,
  badge: _badge,
  model,
}: ProductViewerProps) {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const startX = useRef(0)
  const startRotation = useRef(0)

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    setIsDragging(true)

    startX.current = event.clientX
    startRotation.current = rotation

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return

    const difference = event.clientX - startX.current

    const newRotation =
      startRotation.current + difference * 0.35

    const limitedRotation = Math.max(
      -28,
      Math.min(28, newRotation)
    )

    setRotation(limitedRotation)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const resetRotation = () => {
    setRotation(0)
  }

  return (
    <div className="w-full">
      {/* =====================================================
          PRODUCT STAGE
      ====================================================== */}

      <div
        className={`product-view-wrapper group relative flex aspect-[4/3] select-none items-center justify-center overflow-hidden border border-border bg-secondary ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          perspective: "1400px",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (isDragging) {
            setIsDragging(false)
          }
        }}
      >
        {/* =====================================================
            TECHNICAL GRID
        ====================================================== */}

        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                hsl(var(--border)) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                hsl(var(--border)) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "38px 38px",
          }}
        />

        {/* =====================================================
            CENTER CROSSHAIR
        ====================================================== */}

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 sm:size-56"
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20" />

          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary/20" />
        </div>

        {/* =====================================================
            TECHNICAL LINES
        ====================================================== */}

        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] h-px bg-primary/40"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-[1] w-px bg-primary/20"
          aria-hidden="true"
        />

        {/* =====================================================
            CORNER MARKERS
        ====================================================== */}

        <div className="pointer-events-none absolute left-5 top-5 z-20 h-5 w-5 border-l-2 border-t-2 border-primary" />

        <div className="pointer-events-none absolute right-5 top-5 z-20 h-5 w-5 border-r-2 border-t-2 border-primary" />

        <div className="pointer-events-none absolute bottom-5 left-5 z-20 h-5 w-5 border-b-2 border-l-2 border-primary" />

        <div className="pointer-events-none absolute bottom-5 right-5 z-20 h-5 w-5 border-b-2 border-r-2 border-primary" />

        {/* =====================================================
            3D PRODUCT
            PRODUCT IMAGE IS UNCHANGED
        ====================================================== */}

        <div
          className="relative z-10 flex h-full w-full items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `
              rotateY(${rotation}deg)
              rotateX(${rotation * -0.08}deg)
              scale(${1 + Math.abs(rotation) * 0.0015})
            `,
            transition: isDragging
              ? "none"
              : "transform 300ms ease-out",
          }}
        >
          {/* Product shadow */}

          <div
            className="pointer-events-none absolute bottom-[13%] left-1/2 h-[12%] w-[58%] -translate-x-1/2 rounded-[50%] bg-black/20 blur-2xl"
            style={{
              transform: "rotateX(70deg) translateZ(-30px)",
            }}
          />

          {/* Actual product image */}

          <img
            src={image}
            alt={`${name} product`}
            draggable={false}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="relative z-10 h-[88%] w-[88%] object-contain mix-blend-multiply drop-shadow-[0_30px_30px_rgba(0,0,0,0.18)]"
          />
        </div>

        {/* =====================================================
            DRAG INSTRUCTION
            MOVED TO TOP-RIGHT
        ====================================================== */}

        <div
          className={`pointer-events-none absolute right-5 top-6 z-30 transition-all duration-500 ${
            isDragging
              ? "translate-y-[-4px] opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <div className="flex items-center gap-2 border border-primary/40 bg-background/90 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Move3D className="size-4 text-primary" />

            <span className="whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-[0.18em]">
              Drag left / right
            </span>
          </div>
        </div>

        {/* =====================================================
            ROTATION VALUE
        ====================================================== */}

        <div className="pointer-events-none absolute bottom-5 left-5 z-30 border border-border bg-background/85 px-3 py-2 backdrop-blur-sm">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            VIEW
          </span>

          <span className="ml-2 font-mono text-[9px] font-bold text-primary">
            {rotation > 0 ? "+" : ""}
            {Math.round(rotation)}°
          </span>
        </div>

        {/* =====================================================
            MODEL
        ====================================================== */}

        <span className="absolute bottom-5 right-5 z-30 font-mono text-[9px] uppercase tracking-widest text-foreground/55">
          MODEL / {model ?? "N/A"}
        </span>
      </div>

      {/* =====================================================
          CONTROLS
      ====================================================== */}

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />

          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Interactive 3D View
          </span>
        </div>

        <button
          type="button"
          onClick={resetRotation}
          className="inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-widest transition hover:border-primary hover:text-primary"
        >
          <RotateCcw className="size-3" />

          Reset View
        </button>
      </div>
    </div>
  )
}