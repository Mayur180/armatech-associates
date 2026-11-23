"use client"

import Link from "next/link"
import { ArrowRight, RotateCcw } from "lucide-react"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-[70vh] items-center bg-background">
      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <div className="max-w-3xl border border-border p-8 lg:p-12">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Error / Interrupted
          </p>
          <h1 className="mt-4 font-mono text-3xl font-black uppercase leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            This page did not
            <br />
            finish loading.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Something interrupted the request. Try again, or go back to the
            machine catalogue. If it happens again, call the Pune office and tell
            us which page you were on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Try again
            </button>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
            >
              Machine catalogue <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-2 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
