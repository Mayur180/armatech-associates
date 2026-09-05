import Link from "next/link"
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

const productLinks = [
  "Manual VMM",
  "Semi-Auto VMM",
  "Fully Automatic VMM",
  "Cabinet Integrated VMM",
  "VMS Manual",
]

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#why-armatech" },
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/#armatech-standard" },
  { label: "Contact Us", href: "/contact" },
]

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-white text-[#111111]">

      {/* ============================================================
          CTA
      ============================================================ */}

      <section className="relative overflow-hidden bg-[#c8102e] text-white">

        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-14">

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">
              Precision Measurement Solutions
            </p>

            <h2 className="max-w-3xl text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Need help choosing
              <br />
              the right machine?
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80">
              Talk to our technical team about your component,
              measurement requirements and inspection process.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex w-fit shrink-0 items-center gap-3 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#111111] transition hover:bg-[#111111] hover:text-white"
          >
            Request a Quote

            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

        </div>
      </section>

      {/* ============================================================
          MAIN FOOTER
      ============================================================ */}

      <section className="relative border-b border-[#e2e2e2]">

        {/* Technical grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17,17,17,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.035) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">

          <div className="grid gap-12 lg:grid-cols-[1.35fr_.8fr_.8fr_1.2fr]">

            {/* ======================================================
                BRAND
            ====================================================== */}

            <div>

              <Link href="/" className="inline-block">
                <div className="text-3xl font-black tracking-[-0.06em] text-[#111111]">
                  ARMA<span className="text-[#c8102e]">TECH</span>
                </div>

                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#666666]">
                  Associates
                </div>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#555555]">
                Precision measurement and quality control solutions
                for modern manufacturing.
              </p>

              <div className="mt-7 flex items-center gap-4 border border-[#dcdcdc] bg-white px-4 py-3">

                <span className="text-xl font-black text-[#c8102e]">
                  AT
                </span>

                <span className="h-7 w-px bg-[#dddddd]" />

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#777777]">
                    Precision Engineering
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111111]">
                    Quality • Reliability • Support
                  </p>
                </div>

              </div>

            </div>

            {/* ======================================================
                PRODUCTS
            ====================================================== */}

            <div>

              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#c8102e]">
                Products
              </h3>

              <ul className="mt-6 space-y-3">

                {productLinks.map((product) => (
                  <li key={product}>

                    <Link
                      href="/products"
                      className="group flex items-center gap-2 text-sm font-medium text-[#444444] transition hover:text-[#c8102e]"
                    >
                      <span className="h-px w-0 bg-[#c8102e] transition-all duration-200 group-hover:w-4" />

                      {product}
                    </Link>

                  </li>
                ))}

              </ul>

            </div>

            {/* ======================================================
                COMPANY
            ====================================================== */}

            <div>

              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#c8102e]">
                Company
              </h3>

              <ul className="mt-6 space-y-3">

                {companyLinks.map((item) => (
                  <li key={item.label}>

                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-sm font-medium text-[#444444] transition hover:text-[#c8102e]"
                    >
                      <span className="h-px w-0 bg-[#c8102e] transition-all duration-200 group-hover:w-4" />

                      {item.label}
                    </Link>

                  </li>
                ))}

              </ul>

            </div>

            {/* ======================================================
                CONTACT
            ====================================================== */}

            <div>

              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#c8102e]">
                Contact Us
              </h3>

              <div className="mt-6 space-y-5">

                {/* Address */}

                <div className="flex gap-3">

                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#c8102e]" />

                  <div>

                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#111111]">
                      Address
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#555555]">
                      W-17 A, &apos;S&apos; Block, M.I.D.C.
                      <br />
                      Bhosari Industrial Estate
                      <br />
                      Pune - 411 026
                      <br />
                      Maharashtra, India
                    </p>

                  </div>

                </div>

                {/* Phone */}

                <div className="flex gap-3">

                  <Phone className="mt-1 h-5 w-5 shrink-0 text-[#c8102e]" />

                  <div>

                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#111111]">
                      Phone
                    </p>

                    <p className="mt-2 text-sm text-[#555555]">
                      Contact our technical team
                    </p>

                  </div>

                </div>

                {/* Email */}

                <div className="flex gap-3">

                  <Mail className="mt-1 h-5 w-5 shrink-0 text-[#c8102e]" />

                  <div>

                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#111111]">
                      Enquiries
                    </p>

                    <Link
                      href="/contact"
                      className="mt-2 inline-block text-sm font-semibold text-[#555555] transition hover:text-[#c8102e]"
                    >
                      Send an enquiry
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ============================================================
          BOTTOM BAR
      ============================================================ */}

      <section className="bg-[#111111] text-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

          <p className="text-[10px] font-medium text-white/70">
            © {new Date().getFullYear()} ArmaTech Associates.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">

            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/55">
              Precision Measurement Systems
            </span>

            <span className="h-1 w-1 rounded-full bg-[#c8102e]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/55">
              Pune, India
            </span>

          </div>

        </div>

      </section>

    </footer>
  )
}