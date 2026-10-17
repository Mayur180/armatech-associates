'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

type ModelVariant = {
  model: string
  travel: string
}

type Product = {
  name: string
  slug: string
  variants: ModelVariant[]
}

export default function ModelSelector({ product }: { product: Product }) {
  const [selectedModel, setSelectedModel] = useState<ModelVariant | null>(product.variants[0] || null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModel = (variant: ModelVariant) => {
    setSelectedModel(variant)
    setIsModalOpen(true)
  }

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-red-600">
          Configure Your System
        </p>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          {product.variants.length} Options
        </span>
      </div>

      <h3 className="mb-6 text-3xl font-black uppercase tracking-tight text-neutral-950">
        Select Model
      </h3>

      {/* MODEL CARDS (ANIMATED) */}
      <div className="space-y-4">
        {product.variants.map((variant, index) => (
          <motion.button
            key={variant.model}
            onClick={() => openModel(variant)}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group block w-full text-left"
          >
            <div
              className={`
                relative overflow-hidden border transition-all duration-300 hover:border-red-500 hover:shadow-lg
                ${index === 0 ? "border-red-200 bg-red-50/20" : "border-neutral-200 bg-white"}
              `}
            >
              {/* LEFT RED LINE */}
              <div className={`absolute left-0 top-0 h-full w-1 transition-colors ${index === 0 ? "bg-red-600" : "bg-transparent group-hover:bg-red-600"}`} />

              <div className="flex items-center justify-between p-5">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center font-mono text-xs font-bold ${index === 0 ? "bg-red-600 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                      0{index + 1}
                    </span>
                    <h4 className="font-mono text-lg font-bold text-neutral-950">
                      {variant.model}
                    </h4>
                    {index === 0 && (
                      <span className="rounded-full bg-red-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-red-600">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="mt-2 pl-11 text-xs text-neutral-500">
                    Travel: <span className="font-bold text-neutral-900">{variant.travel} mm</span>
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400 transition-colors group-hover:border-red-200 group-hover:text-red-600">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              <div className="border-t border-neutral-100 bg-neutral-50/50 px-5 py-3">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  <span>Precision Configuration</span>
                  <span className="group-hover:text-red-600">Select →</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

    </div>
  )
}
