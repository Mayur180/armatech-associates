import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { ADDRESS, COMPANY, CONTACT, PARENT_SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Us | VMM Division of Armatech Associates, Pune",
  description:
    "Armatech Associates has supplied measurement equipment to Indian manufacturing since 1980. This is the dedicated VMM division: CRYSTAL video measuring machines, installed and supported from Bhosari MIDC, Pune.",
  alternates: { canonical: "/about" },
}

const facts = [
  { label: "Established", value: "1980" },
  { label: "Machine families", value: "05" },
  { label: "Model configurations", value: "16" },
  { label: "Base", value: "Pune" },
]

const sectors = [
  "Automotive components",
  "Tool rooms and dies",
  "Sheet-metal stamping",
  "Plastic mouldings",
  "Electronics and connectors",
  "General engineering",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HEADER */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            About / {COMPANY.division}
          </p>
          <h1 className="mt-4 max-w-4xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            A metrology house since 1980.
            <br />
            A division focused on vision.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Armatech Associates has supplied measurement and quality-control
            equipment to Indian manufacturing for over four decades. This site is
            the company&apos;s VMM division: the CRYSTAL range of video measuring
            machines, from manual benchtop systems to enclosed automatic machines,
            supplied and supported from Bhosari MIDC, Pune.
          </p>
        </div>
      </section>

      {/* FACTS STRIP */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 border-x border-border lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-b border-r border-border p-6 last:border-b-0 lg:border-b-0">
              <p className="font-mono text-3xl font-black tracking-[-0.04em] text-foreground">
                {fact.value}
              </p>
              <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              What the division does
            </p>
            <h2 className="mt-4 font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
              Supply, specify, install, support.
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              <p>
                Video measuring machines are specified around the part, not the
                other way round. We start from the features you need to measure,
                the tolerances on the drawing and the number of parts per shift,
                then match that against travel, optics, control system and
                software.
              </p>
              <p>
                The CRYSTAL range covers five families and sixteen model
                configurations. Manual models keep the operator in direct control;
                semi-automatic models power the Z axis; automatic and enclosed
                models run stored routines on servo-driven axes. The catalogue on
                this site carries the travel, accuracy and repeatability figures
                for every model, so a shortlist can be made before you speak to
                anyone.
              </p>
              <p>
                After supply, the same team installs the machine, verifies it
                against its stated accuracy, trains your operators and supports it
                through maintenance and calibration.
              </p>
            </div>
          </div>

          <div className="border border-border">
            <div className="border-b border-border p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Typical sectors
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {sectors.map((sector) => (
                  <li
                    key={sector}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="h-1.5 w-1.5 bg-primary" />
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Part of
              </p>
              <a
                href={PARENT_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary"
              >
                Armatech Associates — main website
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                The main site covers the company&apos;s wider metrology and
                quality-control range. This division covers video measuring
                machines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITY */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Facility
            </p>
            <h2 className="mt-4 font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
              Bhosari MIDC, Pune.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              The demonstration room and service base are in the Bhosari
              industrial belt, within reach of Chakan, Pimpri-Chinchwad and the
              wider Pune manufacturing cluster. Machines can be seen and discussed
              at the facility before an order is placed.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a visit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/service-support"
                className="inline-flex items-center gap-3 border border-foreground/25 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
              >
                Service & support
              </Link>
            </div>
          </div>

          <div className="border border-border bg-background p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Address
            </p>
            <p className="mt-3 text-sm leading-6">
              {ADDRESS.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Hours
            </p>
            <p className="mt-3 text-sm leading-6">
              {CONTACT.hours[0]}
              <br />
              {CONTACT.hours[1]}
            </p>
            <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Phone
            </p>
            <p className="mt-3 text-sm leading-6">
              <a
                href={`tel:${CONTACT.landlines[0].replace(/[^\d+]/g, "")}`}
                className="block transition-colors hover:text-primary"
              >
                {CONTACT.landlines[0]}
              </a>
              <a
                href={`tel:${CONTACT.mobile.replace(/[^\d+]/g, "")}`}
                className="block transition-colors hover:text-primary"
              >
                {CONTACT.mobile}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
