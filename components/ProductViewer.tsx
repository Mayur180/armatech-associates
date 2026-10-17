'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'

export default function ProductViewer({
  image,
  name,
  badge,
}: {
  image: string
  name: string
  badge?: string
}) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full overflow-hidden border border-neutral-200 bg-white"
    >
      {/* TECHNICAL GRID BACKGROUND */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(17,17,17,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,17,17,.055) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* CORNER MARKERS */}
      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-neutral-300" />
      <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-neutral-300" />
      <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-neutral-300" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-neutral-300" />

      {/* IMAGE */}
      <div className="relative z-10 flex aspect-square items-center justify-center p-8 sm:p-12">
        <img
          src={image}
          alt={name}
          className={`max-h-full w-full object-contain transition-transform duration-500 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      </div>

      {/* ZOOM BUTTON */}
      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-red-600"
        aria-label="Zoom image"
      >
        <Maximize2 className="h-4 w-4" />
      </button>

      {/* BADGE */}
      {badge && (
        <div className="absolute bottom-5 left-5 z-30">
          <span className="inline-flex border border-red-600 bg-red-600 px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white">
            {badge}
          </span>
        </div>
      )}

      {/* MEASUREMENT LABELS (Optional decorative) */}
      <div className="absolute bottom-5 right-5 z-20 font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400">
        X — 000.000 MM
        <br />
        Y — 000.000 MM
        <br />
        <span className="text-red-600">Z — 000.000 MM</span>
      </div>
    </motion.div>
  )
}
