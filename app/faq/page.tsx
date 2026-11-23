import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "VMM FAQ | Accuracy, Travel, Software and Service",
  description:
    "Answers to common questions about CRYSTAL video measuring machines: manual vs automatic, travel size, accuracy and resolution, software, installation and calibration.",
  alternates: { canonical: "/faq" },
}

const faqs = [
  {
    q: "What is the difference between manual, semi-automatic and fully automatic VMMs?",
    a: "On a manual VMM the operator moves X, Y and Z by hand. On a semi-automatic model, X and Y stay manual and the Z axis is powered by computer control, which makes focusing and step measurement more consistent. On a fully automatic VMM all three axes are servo-driven under computer control, and the zoom and lighting can change inside a stored routine so the same part is measured the same way every time. The enclosed cabinet models add a physical enclosure around the automatic system.",
  },
  {
    q: "How do I choose the travel size?",
    a: "Start with the largest part you expect to measure and add fixture clearance. Travel sizes in this range run from 200 × 100 × 150 mm on the smallest manual models to 600 × 500 × 200 mm on the largest enclosed machine. Repositioning a part mid-measurement adds error, so it is usually better to have travel to spare than to measure in two setups.",
  },
  {
    q: "What does an accuracy of 2.5 + L/100 µm mean?",
    a: "It means the stated accuracy is 2.5 µm plus 2.5 µm for every 100 mm of measured length. A 100 mm measurement therefore has a stated accuracy of about 5 µm, and a 200 mm measurement about 7.5 µm. The formula reflects the way length-dependent errors accumulate on a real machine, and it is the figure to compare when you evaluate quotations.",
  },
  {
    q: "What is the difference between accuracy and resolution?",
    a: "Resolution is the smallest change the scale or software can display — 0.5 µm on most models in this catalogue, 0.001 mm on the VMS range, with 0.1 µm available as an option. Accuracy is how close the displayed measurement is to the true value. A machine can display very fine numbers and still have a larger accuracy figure; accuracy is the number that matters for acceptance.",
  },
  {
    q: "What software is included?",
    a: "Semi-automatic models include two-axis measurement software. Fully automatic models include 2D and 3D measurement software with programmed routines and reporting. The enclosed cabinet models are computer-controlled and supplied with measurement software. The exact version and any optional modules are confirmed in your quotation.",
  },
  {
    q: "Can the machine measure 3D features or use a touch probe?",
    a: "The optical system measures in three axes and the automatic software supports 2D and 3D measurement. Optional touch probes and custom fixturing can be added to the configuration for features that are better reached by contact. Discuss the features you need to measure and we will confirm what the configuration can cover.",
  },
  {
    q: "Is installation and training included?",
    a: "Yes. The machine is installed, levelled and verified against its stated accuracy at your site, and operators are trained on your parts wherever possible. The scope of installation, training and warranty is written into the quotation so there is no ambiguity at handover.",
  },
  {
    q: "What maintenance and calibration does a VMM need?",
    a: "Keep the stage, lens and scales clean, and have the accuracy verified at a schedule that suits your audit requirements. Preventive maintenance covers the mechanical stage, optics and illumination, and annual maintenance contracts can be agreed after installation. Verification results are documented for your quality records.",
  },
  {
    q: "What is the delivery lead time?",
    a: "Lead time depends on the model, the options and the current production schedule. It is confirmed in your quotation rather than advertised as a fixed number, so the date you plan around is the date that applies to your order.",
  },
  {
    q: "Do you support machines outside Pune?",
    a: "Support is coordinated from our Bhosari MIDC facility in Pune. Machines in and around Pune are attended on site, and customers across Maharashtra and the rest of India are supported remotely first, with site visits arranged where the issue requires one.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            FAQ
          </p>
          <h1 className="mt-4 max-w-4xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            Questions buyers ask
            <br />
            before they specify.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Straight answers on machine types, travel, accuracy, software and
            service. If your question is not here, call or send it through the
            enquiry form.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-4 lg:px-8">
          {faqs.map((item, index) => (
            <details
              key={item.q}
              className="group border-b border-border py-5 last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <span className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-bold leading-6">{item.q}</span>
                </span>
                <Plus className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="mt-4 pl-8 text-sm leading-7 text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-sm text-muted-foreground">
            Want to understand what drives the price? See the cost factors, then ask
            for a quote on your parts.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/pricing-guide"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:text-primary"
            >
              Pricing guide <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ask a question <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
