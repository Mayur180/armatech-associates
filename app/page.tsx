import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { products as catalogueProducts } from '@/lib/catalog'
import { FeaturedProductsCarousel } from '@/components/featured-products-carousel'
//import { HelpChoose } from '@/components/help-choose'

const products = catalogueProducts.map((product) => ({
  name: product.name,
  category: product.family,
  code: product.variants[0].model,
  image: product.image,
  slug: product.slug,
}))

const capabilities = [
  'Metrology equipment',
  'Precision instruments',
  'Quality control systems',
  'Technical support',
]

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-background">

        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(rgba(17,17,17,.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17,17,17,.055) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="pointer-events-none absolute right-[10%] top-[15%] size-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-24">

          {/* LEFT SIDE */}
          <div className="relative z-10">

            <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Precision Measurement Technology
            </p>

            <h1 className="max-w-3xl font-mono text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl">

              <span className="block text-foreground">
                Advanced
              </span>

              <span className="block text-primary">
                Video Measuring
              </span>

              <span className="block text-foreground">
                Systems
              </span>

            </h1>

            <div className="mt-7 h-1 w-20 bg-primary" />

            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              High-precision optical measurement solutions for modern
              manufacturing and quality inspection.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="
                  inline-flex
                  items-center
                  gap-3
                  bg-primary
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-primary-foreground
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                Explore Products
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contact?intent=help-choose"
                className="
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-foreground/30
                  bg-background
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-foreground
                  transition-all
                  duration-300
                  hover:border-primary
                  hover:text-primary
                "
              >
                Request Quote
                <ArrowRight className="size-4" />
              </Link>

            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-border pt-6">

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Technology
                </p>

                <p className="mt-2 font-mono text-xs font-bold uppercase sm:text-sm">
                  Optical Measurement
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Application
                </p>

                <p className="mt-2 font-mono text-xs font-bold uppercase sm:text-sm">
                  Quality Inspection
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE — MACHINE + TECHNICAL GRAPHICS */}
          <div className="relative min-h-[390px] sm:min-h-[500px]">

            <div
              className="
                absolute
                left-1/2
                top-1/2
                size-[280px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-primary/15
                sm:size-[410px]
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                size-[190px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-primary/20
                sm:size-[300px]
              "
            />

            <div className="absolute left-0 right-0 top-1/2 h-px bg-primary/30" />

            <div className="absolute bottom-6 left-1/2 top-6 w-px bg-primary/15" />

            <div className="absolute left-1/2 top-1/2 z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_5px_rgba(200,16,46,0.08)]" />

            <div className="relative z-10 flex h-full min-h-[390px] items-center justify-center sm:min-h-[500px]">

              {products[0]?.image ? (
                <img
                  src={products[0].image}
                  alt={`${products[0].name} - Video Measuring Machine`}
                  className="
                    h-auto
                    max-h-[340px]
                    w-[82%]
                    object-contain
                    mix-blend-multiply
                    drop-shadow-[0_25px_35px_rgba(0,0,0,0.16)]
                    transition-transform
                    duration-700
                    hover:scale-[1.03]
                    sm:max-h-[450px]
                  "
                />
              ) : (
                <div className="flex h-72 w-72 items-center justify-center border border-border bg-secondary">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Machine Image
                  </span>
                </div>
              )}

            </div>

            {/* COORDINATE LABELS */}

            <div className="absolute bottom-2 left-0 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              X — 000.000 mm
            </div>

            <div className="absolute right-0 top-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Y + 000.000 mm
            </div>

            <div className="absolute bottom-14 right-0 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              Z — 000.000 mm
            </div>

            {/* MEASUREMENT MARKERS */}

            <span className="absolute left-[12%] top-[27%] size-2 bg-primary" />

            <span className="absolute right-[15%] top-[33%] size-2 bg-primary" />

            <span className="absolute bottom-[24%] left-[20%] size-1.5 bg-primary" />

            <span className="absolute bottom-[20%] right-[27%] size-1.5 bg-primary" />

            {/* CORNER MARKERS */}

            <div className="absolute left-[8%] top-[12%] h-8 w-8 border-l border-t border-primary/30" />

            <div className="absolute right-[8%] top-[12%] h-8 w-8 border-r border-t border-primary/30" />

            <div className="absolute bottom-[12%] left-[8%] h-8 w-8 border-b border-l border-primary/30" />

            <div className="absolute bottom-[12%] right-[8%] h-8 w-8 border-b border-r border-primary/30" />

          </div>

        </div>
      </section>


      {/* =========================================================
          CAPABILITIES
      ========================================================= */}
      <section className="border-b border-border">

        <div className="mx-auto grid max-w-7xl divide-y border-x border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

          <div className="p-7">
            <p className="font-mono text-3xl font-bold">
              01
            </p>

            <p className="mt-4 text-sm font-bold uppercase tracking-widest">
              Precision first
            </p>
          </div>

          {capabilities.slice(1).map((item, i) => (
            <div
              key={item}
              className="p-7"
            >
              <p className="font-mono text-3xl font-bold text-primary">
                0{i + 2}
              </p>

              <p className="mt-4 text-sm font-bold uppercase tracking-widest">
                {item}
              </p>
            </div>
          ))}

        </div>

      </section>


      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

        <div className="flex items-end justify-between gap-6">

          <div>

            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Featured systems
            </p>

            <h2 className="mt-4 max-w-xl font-mono text-3xl font-bold uppercase tracking-[-0.04em] sm:text-5xl">
              Tools for a tighter tolerance.
            </h2>

          </div>

          <Link
            href="/products"
            className="hidden text-xs font-bold uppercase tracking-widest underline decoration-primary underline-offset-8 transition-colors hover:text-primary sm:block"
          >
            View all products
            <ArrowRight className="ml-2 inline size-4" />
          </Link>

        </div>

        <div className="mt-12">
          <FeaturedProductsCarousel products={products} />
        </div>

      </section>


      {/* =========================================================
          WHY ARMATECH
      ========================================================= */}
      <section
        id="why-armatech"
        className="relative overflow-hidden border-t border-border bg-background"
      >

        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(rgba(17,17,17,.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17,17,17,.045) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

          <div className="max-w-3xl">

            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Why ArmaTech
            </p>

            <h2 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-[-0.04em] sm:text-3xl">
              Precision you can build your process around.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              ArmaTech Associates delivers precision measurement and quality
              inspection solutions designed to support accurate, reliable,
              and efficient manufacturing operations.
            </p>

          </div>

          <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">

            {/* 01 */}
            <div className="group relative border-b border-r border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary">

              <div className="flex items-start justify-between">

                <span className="font-mono text-3xl font-bold text-primary">
                  01
                </span>

                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Accuracy
                </span>

              </div>

              <div className="mt-10 h-px w-10 bg-primary transition-all duration-300 group-hover:w-20" />

              <h3 className="mt-6 font-mono text-lg font-bold uppercase">
                Precision Focused
              </h3>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Measurement solutions designed to help manufacturers maintain
                accuracy, consistency, and tighter inspection standards.
              </p>

            </div>


            {/* 02 */}
            <div className="group relative border-b border-r border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary">

              <div className="flex items-start justify-between">

                <span className="font-mono text-3xl font-bold text-primary">
                  02
                </span>

                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Reliability
                </span>

              </div>

              <div className="mt-10 h-px w-10 bg-primary transition-all duration-300 group-hover:w-20" />

              <h3 className="mt-6 font-mono text-lg font-bold uppercase">
                Reliable Equipment
              </h3>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Carefully selected inspection and metrology equipment for
                demanding production and quality-control environments.
              </p>

            </div>


            {/* 03 */}
            <div className="group relative border-b border-r border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary">

              <div className="flex items-start justify-between">

                <span className="font-mono text-3xl font-bold text-primary">
                  03
                </span>

                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Solutions
                </span>

              </div>

              <div className="mt-10 h-px w-10 bg-primary transition-all duration-300 group-hover:w-20" />

              <h3 className="mt-6 font-mono text-lg font-bold uppercase">
                Application Driven
              </h3>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Solutions selected around your components, tolerances,
                inspection requirements, and manufacturing workflow.
              </p>

            </div>


            {/* 04 */}
            <div className="group relative border-b border-r border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary">

              <div className="flex items-start justify-between">

                <span className="font-mono text-3xl font-bold text-primary">
                  04
                </span>

                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Support
                </span>

              </div>

              <div className="mt-10 h-px w-10 bg-primary transition-all duration-300 group-hover:w-20" />

              <h3 className="mt-6 font-mono text-lg font-bold uppercase">
                Technical Support
              </h3>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Support from product selection through technical discussions,
                helping you identify the right measurement solution.
              </p>

            </div>

          </div>


          {/* Bottom technical strip */}
          <div className="mt-8 flex flex-col justify-between gap-5 border border-border bg-secondary p-5 sm:flex-row sm:items-center">

            <div className="flex items-center gap-4">

              <span className="flex size-10 items-center justify-center border border-primary/30 bg-background font-mono text-xs font-bold text-primary">
                AT
              </span>

              <div>

                <p className="font-mono text-xs font-bold uppercase tracking-widest">
                  ArmaTech Associates
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Precision measurement. Practical solutions.
                </p>

              </div>

            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary"
            >
              Talk to our team
              <ArrowRight className="size-4 text-primary" />
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          ARMATECH STANDARD
      ========================================================= */}
       
      <section
        id="armatech-standard"
        className="bg-secondary"
      >

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">

          <div>

            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">
              The ArmaTech standard
            </p>

            <h2 className="mt-5 font-mono text-3xl font-bold uppercase tracking-[-0.04em] sm:text-5xl">
              Built around your process.
            </h2>

          </div>


          <div className="grid gap-8 sm:grid-cols-2">

            <div>

              <Search className="size-6 text-primary" />

              <h3 className="mt-5 font-mono text-lg font-bold uppercase">
                Specify with confidence
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A considered catalogue of measurement equipment, selected for
                demanding production environments.
              </p>

            </div>


            <div>

              <ArrowRight className="size-6 text-primary" />

              <h3 className="mt-5 font-mono text-lg font-bold uppercase">
                Support that responds
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                From product selection to technical conversations, our team
                helps you move from requirement to resolution.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}