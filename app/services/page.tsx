import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Ruler, Wrench, Settings, ShieldCheck, MapPin, FileText, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VMM Services | Installation, Calibration & Support',
  description:
    'Product selection, installation, calibration and technical support for video measuring machines and metrology equipment in Pune and across India.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pb-24 text-neutral-900">
      
      {/* HEADER SECTION */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 mb-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 mb-4">
            Our Services
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-950 mb-6 leading-[1.1]">
            Support for the decisions behind the data.
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
            At Armatech Associates, we don't just supply precision measurement equipment. We provide end-to-end metrology solutions—from machine selection and installation to calibration and technical support across Pune and India.
          </p>
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="border border-neutral-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 mb-6">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 mb-3">Product Selection & Consultation</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We analyze your part dimensions, tolerances, and throughput requirements to recommend the perfect Video Measuring Machine (VMM) for your specific application.
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 mb-6">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 mb-3">Installation & Commissioning</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Our engineers handle the physical installation, software setup, and initial calibration of your metrology equipment right at your factory floor.
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 mb-3">Calibration & Certification</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Ensure compliance with ISO and quality standards. We provide scheduled calibration, preventative maintenance, and accuracy certification for all our machines.
            </p>
          </div>

        </div>
      </section>

      {/* DETAILED PROCESS / WHY CHOOSE US */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 mb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-3xl font-bold text-neutral-950 mb-6">Why choose Armatech Associates?</h2>
              <div className="space-y-4">
                {[
                  "Over 40 years of experience in the Indian metrology industry.",
                  "Direct partnership with top global measuring equipment manufacturers.",
                  "Local support team based in Bhosari MIDC, Pune.",
                  "Comprehensive training for your quality control operators.",
                  "Fast turnaround for spare parts and software updates."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-neutral-950 mb-4">Need a machine inspected or serviced?</h3>
              <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                Our service technicians are available for on-site support. Whether you need a routine calibration or have an urgent technical issue with your VMM, we are here to help.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">
                  Book a Service Visit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mt-2">
                  <MapPin className="h-4 w-4" /> Serving Pune, Maharashtra & Pan-India
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO KEYWORDS SECTION */}
      <section className="mx-auto max-w-4xl px-5 text-center">
         <p className="text-xs text-neutral-400 leading-relaxed">
           Armatech Associates is a leading provider of <strong>VMM machine dealer in maharashtra</strong> services and <strong>Metrology equipment supplier in Bhosari MIDC</strong>. We offer expert <strong>High precision VMM machine Pune</strong> calibration, repair, and <strong>Optical measurement equipment for manufacturing</strong> setup. If you are looking for <strong>Precision measurement tools in pune</strong> or need a trusted <strong>VMM manufacturing in pune</strong> partner, our service team is ready to assist you.
         </p>
      </section>

    </main>
  )
}