import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Quality | Verification and Documentation",
  description:
    "How CRYSTAL video measuring machines are checked before dispatch, verified after installation and documented for quality audits. Supported from Bhosari MIDC, Pune.",
  alternates: { canonical: "/services" },
}

const steps = [
  {
    title: "Pre-dispatch check",
    body: "The machine is assembled, aligned and checked at the facility before it is packed. Axis movement, scale feedback, optics and illumination are confirmed against the build sheet so faults are found before the machine travels.",
  },
  {
    title: "Installation & levelling",
    body: "At your site the machine is positioned, levelled and connected to a stable supply. The environment around the machine — floor, lighting and temperature — is checked at the same time, because a machine that is level but in a draughty corner will not hold its figures.",
  },
  {
    title: "Accuracy verification",
    body: "After installation the machine is verified against its stated accuracy using calibration artefacts. The result is not a paper formality: it is the baseline record for every measurement you take afterwards, and the reference for later calibration checks.",
  },
  {
    title: "Documentation for audits",
    body: "Calibration results, configuration details and service records are documented so your quality team can produce them during customer or certification audits. If your process needs a specific format, tell us at the quotation stage.",
  },
]

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Quality
          </p>
          <h1 className="mt-4 max-w-4xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            Checked before it ships.
            <br />
            Verified after it is installed.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            A stated accuracy figure only means something if it is verified on
            your floor. This is the sequence every machine goes through, and the
            records your quality team receives at the end of it.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl border-x border-border md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step.title} className="border-b border-r border-border p-7">
              <div className="flex items-start justify-between">
                <h2 className="font-mono text-base font-bold uppercase tracking-[-0.01em]">
                  {step.title}
                </h2>
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <h2 className="font-mono text-2xl font-bold uppercase tracking-[-0.03em] sm:text-3xl">
              What the record contains.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              At handover you receive the machine configuration as installed, the
              accuracy verification result, and the calibration certificate for
              the stated figures. Service visits and later calibration checks are
              added to the same history, so the file stays complete rather than
              scattered across emails.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              Nothing here replaces your own incoming inspection. It gives you the
              reference data to run it against.
            </p>
          </div>

          <div className="border border-border bg-background p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Related
            </p>
            <div className="mt-4 grid gap-3">
              <Link
                href="/service-support"
                className="group flex items-center justify-between border-b border-border pb-3 text-sm font-bold transition-colors hover:text-primary"
              >
                Service & support
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
              <Link
                href="/faq"
                className="group flex items-center justify-between border-b border-border pb-3 text-sm font-bold transition-colors hover:text-primary"
              >
                FAQ — accuracy, calibration, lead time
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
              <Link
                href="/products"
                className="group flex items-center justify-between text-sm font-bold transition-colors hover:text-primary"
              >
                Machine catalogue
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
