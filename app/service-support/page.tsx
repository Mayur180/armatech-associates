import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Wrench,
  GraduationCap,
  CalendarCheck,
  Gauge,
  PackageSearch,
  Clock,
} from "lucide-react"

import { ADDRESS, CONTACT } from "@/lib/site"

export const metadata: Metadata = {
  title: "Service & Support | Installation, Training & AMC",
  description:
    "Installation, operator training, annual maintenance, calibration and spares for CRYSTAL video measuring machines, supported from Bhosari MIDC, Pune.",
  alternates: { canonical: "/service-support" },
}

const services = [
  {
    icon: Wrench,
    title: "Installation & commissioning",
    body: "The machine is installed, levelled and set up at your site, then verified against its stated accuracy before handover. We agree the location and site requirements with your team in advance so the machine is not left waiting for power, lighting or floor space.",
  },
  {
    icon: GraduationCap,
    title: "Operator training",
    body: "Training covers axis operation, lighting, magnification, feature measurement and routine creation, delivered on your parts wherever possible. The aim is that your operators can run the machine themselves from the first week, not depend on a specialist.",
  },
  {
    icon: CalendarCheck,
    title: "Preventive maintenance & AMC",
    body: "Scheduled maintenance covers the mechanical stage, scales, optics and illumination. Annual maintenance contracts can be agreed after installation, with visit frequency set by how hard the machine is used.",
  },
  {
    icon: Gauge,
    title: "Calibration & accuracy verification",
    body: "Periodic accuracy checks keep measurements traceable for audits. Verification is carried out against calibration artefacts, and the results are documented for your quality records.",
  },
  {
    icon: PackageSearch,
    title: "Spares & software support",
    body: "Wear parts, lamps, lens components and scale spares are supplied for the CRYSTAL range. Software reinstallation, routine support and update assistance are handled by the same team that commissions the machines.",
  },
  {
    icon: Clock,
    title: "Response & coverage",
    body: "Support is coordinated from Bhosari MIDC, Pune. Machines in and around Pune are attended on site; customers across Maharashtra and the rest of India are supported remotely first, with site visits arranged where the issue requires one.",
  },
]

export default function ServiceSupportPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HEADER */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Service / After-sales
          </p>
          <h1 className="mt-4 max-w-4xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            The machine is the start.
            <br />
            Support keeps it measuring.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Installation, training, maintenance and calibration for CRYSTAL video
            measuring machines, handled by the same team that supplies them.
            Service requests are coordinated from our Bhosari MIDC facility.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl border-x border-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <div
                key={service.title}
                className="border-b border-r border-border p-7 last:border-b-0 lg:[&:nth-child(3n)]:border-r-0"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="font-mono text-xs font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-8 font-mono text-base font-bold uppercase tracking-[-0.01em]">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.body}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* SERVICE REQUEST */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Service request
            </p>
            <h2 className="mt-4 font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
              Tell us the model and the symptom.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              Include the model code (for example AA-9032A), what the machine is
              doing, and any error message from the software. A photograph of the
              screen or the stage saves a round of questions. If the machine is
              under an AMC, mention the contract so we can check the visit history.
            </p>
            <Link
              href="/contact?intent=service"
              className="mt-8 inline-flex items-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request a Service Visit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border border-border bg-background p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Direct contact
            </p>
            <div className="mt-5 space-y-4 text-sm">
              <p>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Phone
                </span>
                <a
                  href={`tel:${CONTACT.landlines[0].replace(/[^\d+]/g, "")}`}
                  className="mt-1 block font-semibold transition-colors hover:text-primary"
                >
                  {CONTACT.landlines[0]}
                </a>
                <a
                  href={`tel:${CONTACT.mobile.replace(/[^\d+]/g, "")}`}
                  className="block font-semibold transition-colors hover:text-primary"
                >
                  {CONTACT.mobile}
                </a>
              </p>
              <p>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Email
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-1 block break-all font-semibold transition-colors hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Facility
                </span>
                <span className="mt-1 block leading-6 text-muted-foreground">
                  {ADDRESS.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <p className="border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
                Working hours: {CONTACT.hours[0]}. {CONTACT.hours[1]}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-muted-foreground">
            Not sure which machine needs service? Have the model code ready — it is
            printed on the machine plate.
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
            <Link href="/faq" className="text-muted-foreground transition-colors hover:text-primary">
              FAQ
            </Link>
            <Link href="/services" className="text-muted-foreground transition-colors hover:text-primary">
              Quality
            </Link>
            <Link href="/products" className="text-muted-foreground transition-colors hover:text-primary">
              Machines
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
