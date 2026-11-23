import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "VMM Price Guide | What Determines the Cost",
  description:
    "What determines the price of a video measuring machine: travel size, drive system, optics, software, probes, enclosure and installation. Understand the cost before you compare quotations.",
  alternates: { canonical: "/pricing-guide" },
}

const drivers = [
  {
    title: "Measuring travel",
    body: "The stage size is the first cost driver. A 200 × 100 mm manual machine and a 600 × 500 mm enclosed machine are different classes of equipment: the larger the travel, the larger the structure, the scales and the motors. Choose travel from your biggest part plus fixture clearance, not from the price list.",
  },
  {
    title: "Drive system",
    body: "Manual axes cost less than powered axes. A semi-automatic machine powers only Z; a fully automatic machine drives all three axes with servo motors, adding motors, drives and control electronics. The price step between manual and automatic buys repeatability across operators and shifts, not just convenience.",
  },
  {
    title: "Optics and camera",
    body: "A manual 0.7–4.5X zoom with an industrial colour CCD is the baseline. Automatic zoom, a 1–10X lens and a digital camera add cost, and a finer scale resolution — 0.1 µm instead of 0.5 µm — is a paid option on the manual range.",
  },
  {
    title: "Software",
    body: "Two-axis measurement software, 2D and 3D software with programmed routines, and optional CAD comparison modules are priced differently. Software is licensed per machine, so check what is included rather than assuming every package is the same.",
  },
  {
    title: "Probes and fixturing",
    body: "Touch probes, rotary stages and custom fixtures are quoted as options. They are often necessary for specific features, and they can add a meaningful share of the total. Decide early which features need contact measurement.",
  },
  {
    title: "Enclosure",
    body: "The cabinet-integrated models add a physical enclosure around the machine. That protects the optics and stage from dust and draughts and is reflected in the price. It also changes the installation footprint and weight, which affects transport and site preparation.",
  },
  {
    title: "Installation and training",
    body: "Installation, levelling, accuracy verification and operator training are part of the delivery scope. Confirm exactly what is included in each quotation — a lower machine price with installation charged separately is not necessarily cheaper.",
  },
  {
    title: "Transport, taxes and site readiness",
    body: "Freight, insurance, GST and any site work — power, compressed air, flooring, temperature control — sit outside the machine price. A heavy enclosed machine needs access for delivery and a stable floor; planning this early avoids surprises.",
  },
]

const compareRows = [
  ["Measuring travel (X × Y × Z)", "Largest part plus fixture clearance"],
  ["Accuracy figure", "Compare the formula, e.g. 2.5 + L/100 µm"],
  ["Scale resolution", "0.5 µm standard, 0.1 µm optional"],
  ["Camera and zoom", "CCD or digital, manual or automatic zoom"],
  ["Software", "Included modules and licence terms"],
  ["Installation and training", "Included in scope or charged separately"],
  ["Calibration", "Certificate supplied at handover"],
  ["Warranty", "Duration and what it covers"],
  ["Delivery", "Confirmed date, not an estimate"],
]

export default function PricingGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Pricing guide
          </p>
          <h1 className="mt-4 max-w-4xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            What actually moves
            <br />
            a VMM price.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Video measuring machines are quoted against a specification, not sold
            from a list price. These are the factors that change the number — and
            the ones to check when you compare two quotations.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl border-x border-border md:grid-cols-2">
          {drivers.map((driver, index) => (
            <div key={driver.title} className="border-b border-r border-border p-7">
              <div className="flex items-start justify-between">
                <h2 className="font-mono text-base font-bold uppercase tracking-[-0.01em]">
                  {driver.title}
                </h2>
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {driver.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Comparing quotations
          </p>
          <h2 className="mt-4 font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
            Nine lines to check, side by side.
          </h2>

          <div className="mt-8 border border-border">
            {compareRows.map(([label, note], index) => (
              <div
                key={label}
                className={`grid gap-2 px-5 py-4 sm:grid-cols-[1fr_1.4fr] ${
                  index !== compareRows.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-foreground">
                  {label}
                </p>
                <p className="text-sm text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
            We do not publish a list price because two machines with the same
            travel can differ in optics, software and options. Send your part
            details and measurement requirements, and the quotation will show the
            configuration and the price for that configuration.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-sm text-muted-foreground">
            Not sure which configuration fits your parts? Start with the machine
            comparison.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:text-primary"
            >
              Compare machines <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request a quotation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
