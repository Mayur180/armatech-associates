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
    <div className="relative flex h-full min-h-[360px] w-full items-center justify-center overflow-hidden bg-white">

      {/* ========================================================
          TECHNICAL BACKGROUND
      ======================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* CENTER VERTICAL */}

        <div className="absolute left-1/2 top-0 h-full w-px bg-red-50" />

        {/* CENTER HORIZONTAL */}

        <div className="absolute left-0 top-1/2 h-px w-full bg-red-50" />

        {/* CIRCLES */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-red-50
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-48
            w-48
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-red-50
          "
        />

      </div>

      {/* ========================================================
          CORNER MARKERS
      ======================================================== */}

      <div className="absolute left-3 top-3 h-7 w-7 border-l-2 border-t-2 border-red-500" />

      <div className="absolute right-3 top-3 h-7 w-7 border-r-2 border-t-2 border-red-500" />

      <div className="absolute bottom-3 left-3 h-7 w-7 border-b-2 border-l-2 border-red-500" />

      <div className="absolute bottom-3 right-3 h-7 w-7 border-b-2 border-r-2 border-red-500" />

      {/* ========================================================
          PRODUCT IMAGE
      ======================================================== */}

      <img
        src={image}
        alt={model ? `${name} ${model}` : name}
        className="
          relative
          z-10
          max-h-[360px]
          w-full
          object-contain
        "
      />

      {/* ========================================================
          PRODUCT LABEL
      ======================================================== */}

      <div className="absolute bottom-4 left-4 z-20">

        {badge && (
          <div
            className="
              mb-1
              inline-block
              bg-red-600
              px-2
              py-1
              text-[8px]
              font-bold
              uppercase
              tracking-widest
              text-white
            "
          >
            {badge}
          </div>
        )}

        {model && (
          <div
            className="
              bg-white/95
              px-2
              py-1
              text-[9px]
              font-black
              tracking-widest
              text-zinc-900
              shadow-sm
            "
          >
            {model}
          </div>
        )}

      </div>

    </div>
  )
}