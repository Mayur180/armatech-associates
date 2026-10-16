"use client"

type ProductViewerProps = {
  image: string
  name: string
  badge?: string
  model?: string
}

export default function ProductViewer({
  image,
  name,
  badge,
  model,
}: ProductViewerProps) {
  return (
    <div className="relative isolate w-full overflow-hidden border border-neutral-200 bg-neutral-50">

      {/* ============================================================
          TECHNICAL GRID BACKGROUND
          Decorative only — NO PRODUCT IMAGE
      ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(17,17,17,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,17,17,.045) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ============================================================
          RED TECHNICAL CORNER MARKERS
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-5 z-20 h-8 w-8 border-l-2 border-t-2 border-red-600"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 z-20 h-8 w-8 border-r-2 border-t-2 border-red-600"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-5 z-20 h-8 w-8 border-b-2 border-l-2 border-red-600"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-5 z-20 h-8 w-8 border-b-2 border-r-2 border-red-600"
      />

      {/* ============================================================
          CENTER CROSSHAIR
          Decorative only — NO PRODUCT IMAGE
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative flex size-24 items-center justify-center">

          <div className="absolute h-px w-24 bg-red-600/20" />

          <div className="absolute h-24 w-px bg-red-600/20" />

          <div className="absolute size-12 rounded-full border border-red-600/15" />

          <div className="absolute size-2 rounded-full bg-red-600/30" />

        </div>
      </div>

      {/* ============================================================
          PRODUCT IMAGE
          EXACTLY ONE IMAGE
      ============================================================ */}

      <div className="relative z-10 flex aspect-[4/3] w-full items-center justify-center p-8 sm:p-10 lg:p-12">

        <img
          src={image}
          alt={model ? `${name} ${model}` : name}
          loading="eager"
          decoding="async"
          draggable={false}
          className="
            block
            h-full
            w-full
            select-none
            object-contain
            object-center
            mix-blend-multiply
          "
        />

      </div>

      {/* ============================================================
          PRODUCT BADGE
      ============================================================ */}

      {badge && (
        <div className="absolute bottom-5 left-5 z-30">

          <span
            className="
              inline-flex
              border
              border-red-600
              bg-red-600
              px-4
              py-2
              font-mono
              text-[9px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
            "
          >
            {badge}
          </span>

        </div>
      )}

      {/* ============================================================
          MODEL LABEL
      ============================================================ */}

      {model && (
        <div className="absolute right-5 top-5 z-30">

          <span
            className="
              border
              border-neutral-300
              bg-white/95
              px-3
              py-2
              font-mono
              text-[9px]
              font-bold
              uppercase
              tracking-widest
              text-neutral-800
              backdrop-blur-sm
            "
          >
            {model}
          </span>

        </div>
      )}

      {/* ============================================================
          TECHNICAL COORDINATE LABEL
      ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-5
          right-5
          z-20
          hidden
          font-mono
          text-[8px]
          uppercase
          leading-5
          tracking-widest
          text-neutral-400
          sm:block
        "
      >
        <div>X — 000.000 MM</div>
        <div>Y — 000.000 MM</div>
        <div>Z — 000.000 MM</div>
      </div>

    </div>
  )
}