'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

type ModelVariant = { model: string; travel: string }
type Product = { name: string; slug: string; variants: ModelVariant[] }

export default function ModelSelector({ product }: { product: Product }) {
  const router = useRouter()

  const handleSelect = (variant: ModelVariant) => {
    router.push(`/products/${product.slug}/${variant.model}`)
  }

  return (
    <div className="w-full">
      <div className="space-y-3">
        {product.variants.map((variant, index) => (
          <motion.button key={variant.model} onClick={() => handleSelect(variant)} className="group block w-full text-left cursor-pointer">
            <div className={`relative overflow-hidden border transition-all duration-300 hover:border-primary ${index === 0 ? "border-primary/40 bg-primary-light" : "border-neutral-200 bg-white"}`}>
              <div className="flex items-center justify-between p-5">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center font-mono text-xs font-bold ${index === 0 ? "bg-primary text-white" : "bg-neutral-100 text-neutral-500"}`}>0{index + 1}</span>
                    <h4 className="font-mono text-lg font-bold text-neutral-950">{variant.model}</h4>
                  </div>
                  <p className="mt-2 pl-11 text-xs text-neutral-500">Travel: <span className="font-bold text-neutral-900">{variant.travel} mm</span></p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center border border-neutral-300 bg-white text-neutral-400 transition-colors group-hover:border-primary/40 group-hover:text-primary">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <div className="border-t border-neutral-100 bg-neutral-50/50 px-5 py-3 flex justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                <span>View Specifications</span>
                <span className="group-hover:text-primary">Select →</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
