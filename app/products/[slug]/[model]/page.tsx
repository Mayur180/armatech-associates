import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowLeft, CheckCircle2, Download, Settings, ShieldCheck, Ruler, Box, Layers } from "lucide-react"
import { getProduct } from "@/lib/catalog"
import { notFound } from "next/navigation"

type ModelPageProps = {
  params: Promise<{ slug: string; model: string }>
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { slug, model } = await params
  const product = getProduct(slug)
  const variant = product?.variants.find((item) => item.model === model)

  if (!product || !variant) {
    return { title: "Model Not Found" }
  }

  return {
    title: `${variant.model} Specifications | ${product.name}`,
    description: `Technical specifications, ${variant.travel} mm travel range and configuration options for the CRYSTAL ${variant.model} ${product.name}.`,
    alternates: {
      canonical: `/products/${product.slug}/${variant.model}`,
    },
  }
}

export default async function ModelSpecsPage({ params }: ModelPageProps) {
  const { slug, model } = await params
  const product = getProduct(slug)
  
  if (!product) notFound()
  
  const variant = product.variants.find((v) => v.model === model)
  if (!variant) notFound()

  return (
    <main className="min-h-screen bg-white pb-24 px-5">
      <div className="max-w-5xl mx-auto">
        
        {/* BREADCRUMB */}
        <Link href={`/products/${slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-red-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to {product.name}
        </Link>
        
        {/* HEADER */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 mb-2">{product.family}</p>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4 text-neutral-950">{variant.model} Specifications</h1>
          <p className="text-lg text-neutral-600 max-w-3xl">
            Detailed technical data, configuration options, and inspection capabilities for the {variant.model}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: DETAILED SPECS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* CORE SPECS CARD */}
            <div className="border border-neutral-200 rounded-2xl bg-white overflow-hidden shadow-sm">
              <div className="bg-neutral-50 border-b border-neutral-200 px-6 py-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-neutral-900">Core Technical Specifications</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-6 border-b sm:border-b-0 sm:border-r border-neutral-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Travel Range (X x Y x Z)</p>
                  <p className="text-2xl font-bold text-neutral-950">{variant.travel} mm</p>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Machine Category</p>
                  <p className="text-2xl font-bold text-neutral-950">{product.category}</p>
                </div>
                <div className="p-6 border-t border-neutral-100 sm:border-r">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Product Family</p>
                  <p className="text-lg font-semibold text-neutral-900">{product.family}</p>
                </div>
                <div className="p-6 border-t border-neutral-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Status</p>
                  <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Available
                  </p>
                </div>
              </div>
            </div>

            {/* FEATURES / HIGHLIGHTS */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="border border-neutral-200 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-600" /> Key Features & Capabilities
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700 text-sm leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ADDITIONAL INFO (Placeholder for future data) */}
            <div className="border border-neutral-200 rounded-2xl bg-white p-6 shadow-sm">
               <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-red-600" /> Configuration Options
               </h2>
               <p className="text-sm text-neutral-600 mb-4">
                 The {variant.model} can be customized with various lens options, probes, and software modules depending on your specific measurement requirements.
               </p>
               <ul className="space-y-3 text-sm text-neutral-700">
                  <li className="flex items-center gap-2"><Ruler className="w-4 h-4 text-neutral-400" /> Optional High-Precision Renishaw Probes</li>
                  <li className="flex items-center gap-2"><Box className="w-4 h-4 text-neutral-400" /> Custom Fixturing for Complex Parts</li>
                  <li className="flex items-center gap-2"><Download className="w-4 h-4 text-neutral-400" /> Advanced CAD Comparison Software</li>
               </ul>
            </div>

          </div>

          {/* RIGHT COLUMN: CTA CARD */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-neutral-200 rounded-2xl bg-neutral-50 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-950 mb-2">Interested in the {variant.model}?</h3>
              <p className="text-sm text-neutral-600 mb-6">
                Contact our engineering team to discuss your specific application, request a formal quotation, or schedule a demonstration.
              </p>
              
              <Link 
                href={`/contact?product=${slug}&model=${variant.model}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <div className="mt-6 pt-6 border-t border-neutral-200 text-xs text-neutral-500">
                <p className="mb-2"><strong>Need help?</strong></p>
                <p>
                  Call us:{" "}
                  <a href="tel:+912027122385" className="hover:text-red-600">
                    +91 20 2712 2385
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:armatechsales@gmail.com" className="hover:text-red-600">
                    armatechsales@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
