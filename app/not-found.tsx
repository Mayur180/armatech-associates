import Link from "next/link"
import { ArrowRight } from "lucide-react"

const quickLinks = [
  { label: "Machine catalogue", href: "/products" },
  { label: "Service & support", href: "/service-support" },
  { label: "Pricing guide", href: "/pricing-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact and quotations", href: "/contact" },
]

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-background">
      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid border border-border md:grid-cols-[1.2fr_0.8fr]">
          <div className="border-b border-border p-8 md:border-b-0 md:border-r lg:p-12">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              404 / Not found
            </p>
            <h1 className="mt-4 max-w-xl font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
              This page is not in
              <br />
              the catalogue.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              The link may be out of date, or the page may have moved. The machine
              catalogue, service pages and enquiry form are all still here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View the catalogue <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
              >
                Ask our team
              </Link>
            </div>
          </div>

          <div className="bg-secondary p-8 lg:p-12">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Quick links
            </p>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-4 py-3 text-sm font-bold transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-6 text-muted-foreground">
              If a model code brought you here, search it in the catalogue or call
              the Pune office.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
