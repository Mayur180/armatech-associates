import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle2, MapPin, Factory, Award, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Metrology Equipment Supplier in Pune",
  description:
    "ArmaTech Associates is a metrology equipment supplier and VMM dealer based in Bhosari MIDC, Pune, serving manufacturers across Maharashtra and India.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pb-24 text-neutral-900">
      
      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 mb-20">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 mb-4">
            About Armatech Associates
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-950 mb-6 leading-[1.1]">
            Engineering clarity into every measurement.
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
            Armatech Associates brings precision measurement and quality control equipment into sharper focus for industrial teams. As a leading <strong>Metrology equipment supplier in Bhosari MIDC</strong> and a trusted <strong>VMM machine dealer in Maharashtra</strong>, we empower manufacturers to achieve absolute accuracy.
          </p>
        </div>
      </section>

      {/* APPROACH SECTION */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 mb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 mb-3">
                Our Approach
              </p>
              <h2 className="text-3xl font-bold text-neutral-950 mb-6">
                The right instrument is the beginning.
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Every manufacturing process has its own language of tolerance, repeatability, and assurance. We help teams navigate the equipment and technical decisions behind dependable quality control.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Our catalogue is structured around practical industrial needs: surface analysis, coordinate measurement, and vision-based inspection. Whether you are looking for a <strong>High precision VMM machine Pune</strong> or <strong>Precision measurement tools in pune</strong>, we have the solution.
              </p>
            </div>
            
            {/* 3 PILLARS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                <CheckCircle2 className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="font-bold text-neutral-950 mb-2">Precision-Led</h3>
                <p className="text-sm text-neutral-600">Clear information and considered guidance for better measurement decisions.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                <Factory className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="font-bold text-neutral-950 mb-2">Process-Aware</h3>
                <p className="text-sm text-neutral-600">We understand the manufacturing floor and deliver <strong>Optical measurement equipment for manufacturing</strong>.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm sm:col-span-2">
                <Users className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="font-bold text-neutral-950 mb-2">Built to Support</h3>
                <p className="text-sm text-neutral-600">Our team provides complete calibration, training, and <strong>VMM manufacturing in pune</strong> support to keep your quality lab running.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & LOCATION SECTION */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
             <h2 className="text-3xl font-bold text-neutral-950 mb-6">Serving Indian Manufacturing Since 1980</h2>
             <p className="text-neutral-600 leading-relaxed mb-6">
               For over four decades, Armatech Associates has been the premier <strong>VMM Supplier Near Chakan MIDC</strong> and across India. We partner with top global manufacturers to bring the best <strong>Video measuring machine for quality inspection</strong> to your facility.
             </p>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-neutral-700"><CheckCircle2 className="h-5 w-5 text-red-600" /> Authorized dealer for top metrology brands.</li>
               <li className="flex items-center gap-3 text-neutral-700"><CheckCircle2 className="h-5 w-5 text-red-600" /> Local service team in Pune for rapid response.</li>
               <li className="flex items-center gap-3 text-neutral-700"><CheckCircle2 className="h-5 w-5 text-red-600" /> Expert consultation on <strong>Measuring VMM for automotive connectors</strong>.</li>
             </ul>
          </div>
          <div className="bg-neutral-950 p-8 rounded-2xl text-white">
            <MapPin className="h-10 w-10 text-red-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Visit Our Facility</h3>
            <p className="text-neutral-400 mb-6">
              Our demonstration center and calibration lab are located in the heart of Pune's industrial belt.
            </p>
            <p className="font-mono text-sm leading-relaxed text-neutral-300 mb-8">
              W-174 A, 'S' Block, M.I.D.C.,<br/>
              Bhosari Industrial Estate,<br/>
              Pune - 411 026 (India)
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-colors">
              Get Directions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}