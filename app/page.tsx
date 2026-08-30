'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { products as catalogueProducts } from '@/lib/catalog'

const products = catalogueProducts.slice(0, 3).map((product) => ({ name: product.name, category: product.family, code: product.variants[0].model, image: product.image, slug: product.slug }))

const capabilities = ['Metrology equipment', 'Precision instruments', 'Quality control systems', 'Technical support']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary px-4 py-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-foreground">Precision measurement systems for modern manufacturing</div>
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="ArmaTech Associates home">
            <span className="flex size-10 items-center justify-center bg-primary font-mono text-lg font-black text-primary-foreground">AT</span>
            <span className="font-mono text-sm font-bold uppercase tracking-[0.16em]">ArmaTech <span className="text-muted-foreground">Associates</span></span>
          </Link>
          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.16em] lg:flex">
            <Link className="hover:text-primary" href="/about">About</Link><Link className="hover:text-primary" href="/products">Products</Link><Link className="hover:text-primary" href="/services">Services</Link><Link className="hover:text-primary" href="/contact">Contact</Link>
            <Link href="/contact" className="bg-primary px-5 py-3 text-primary-foreground transition hover:bg-primary/90">Request a quote <ArrowRight className="ml-2 inline size-3" /></Link>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 border-t border-border px-5 py-6 text-sm font-semibold uppercase tracking-widest lg:hidden"><Link href="/about">About</Link><Link href="/products">Products</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link></nav>}
      </header>

      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl items-end gap-12 px-5 pb-16 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24 lg:pt-28">
          <div><p className="mb-7 font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">ArmaTech Associates / India</p><h1 className="max-w-3xl text-balance font-mono text-4xl font-bold uppercase leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">Measure what<br /><span className="text-primary">matters.</span></h1><p className="mt-8 max-w-xl text-pretty text-base leading-7 text-background/70">Precision measurement and quality control solutions for the teams building what comes next.</p><div className="mt-10 flex flex-wrap gap-4"><Link href="/products" className="bg-primary px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90">Explore products <ArrowRight className="ml-3 inline size-4" /></Link><Link href="/about" className="border border-background/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-background hover:border-primary">Our approach</Link></div></div>
          <div className="relative min-h-[270px] overflow-hidden border border-background/15 bg-[#222] p-5 sm:min-h-[360px]"><div className="absolute inset-0 opacity-30" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize:'42px 42px'}} /><div className="absolute bottom-6 left-6 right-6 flex items-end justify-between"><div><p className="font-mono text-xs text-primary">INSTRUMENT // 001</p><p className="mt-2 font-mono text-sm font-bold text-background">SURFACE ANALYSIS</p></div><span className="font-mono text-5xl font-bold text-background/20">01</span></div><div className="absolute left-[42%] top-[27%] size-28 border-2 border-primary/70 sm:size-40"><div className="absolute -left-3 top-1/2 h-px w-48 bg-primary/50" /><div className="absolute left-1/2 -top-3 h-48 w-px bg-primary/50" /></div></div>
        </div>
      </section>

      <section className="border-b border-border"><div className="mx-auto grid max-w-7xl divide-y border-x border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"><div className="p-7"><p className="font-mono text-3xl font-bold">01</p><p className="mt-4 text-sm font-bold uppercase tracking-widest">Precision first</p></div>{capabilities.slice(1).map((item, i) => <div key={item} className="p-7"><p className="font-mono text-3xl font-bold text-primary">0{i+2}</p><p className="mt-4 text-sm font-bold uppercase tracking-widest">{item}</p></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="flex items-end justify-between gap-6"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">Featured systems</p><h2 className="mt-4 max-w-xl font-mono text-3xl font-bold uppercase tracking-[-0.04em] sm:text-5xl">Tools for a tighter tolerance.</h2></div><Link href="/products" className="hidden text-xs font-bold uppercase tracking-widest underline decoration-primary underline-offset-8 sm:block">View all products <ArrowRight className="ml-2 inline size-4" /></Link></div><div className="mt-12 grid gap-px bg-border md:grid-cols-3">{products.map((product) => <Link href={`/products/${product.slug}`} key={product.name} className="group bg-background p-5"><div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-secondary"><img src={product.image} alt={`${product.name} catalogue reference`} className="size-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-[1.03]" /></div><div className="flex items-start justify-between py-5"><div><p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">{product.category}</p><h3 className="mt-2 font-mono text-lg font-bold uppercase">{product.name}</h3><p className="mt-2 text-xs text-muted-foreground">{product.code}</p></div><ChevronRight className="mt-1 size-5 transition group-hover:translate-x-1" /></div></Link>)}</div></section>

      <section className="bg-secondary"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">The ArmaTech standard</p><h2 className="mt-5 font-mono text-3xl font-bold uppercase tracking-[-0.04em] sm:text-5xl">Built around your process.</h2></div><div className="grid gap-8 sm:grid-cols-2"><div><Search className="size-6 text-primary" /><h3 className="mt-5 font-mono text-lg font-bold uppercase">Specify with confidence</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">A considered catalogue of measurement equipment, selected for demanding production environments.</p></div><div><ArrowRight className="size-6 text-primary" /><h3 className="mt-5 font-mono text-lg font-bold uppercase">Support that responds</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">From product selection to technical conversations, our team helps you move from requirement to resolution.</p></div></div></div></section>

      <section className="bg-primary px-5 py-16 text-primary-foreground lg:px-8 lg:py-20"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">Start a conversation</p><h2 className="mt-4 max-w-2xl font-mono text-3xl font-bold uppercase tracking-[-0.04em] sm:text-4xl">Looking for the right precision measurement solution?</h2></div><Link href="/contact" className="shrink-0 bg-foreground px-6 py-4 text-xs font-bold uppercase tracking-widest text-background hover:bg-foreground/90">Request a quote <ArrowRight className="ml-3 inline size-4" /></Link></div></section>

      <footer className="bg-foreground px-5 py-12 text-background lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row"><div><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center bg-primary font-mono text-sm font-black text-primary-foreground">AT</span><span className="font-mono text-sm font-bold uppercase tracking-widest">ArmaTech Associates</span></div><p className="mt-5 max-w-xs text-sm leading-6 text-background/60">Precision measurement and quality control solutions for modern manufacturing.</p></div><div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs font-bold uppercase tracking-widest text-background/70"><Link href="/about">About</Link><Link href="/products">Products</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link></div></div><div className="mx-auto mt-12 max-w-7xl border-t border-background/15 pt-5 font-mono text-[10px] uppercase tracking-widest text-background/40">© {new Date().getFullYear()} ArmaTech Associates. Product information available on request.</div></footer>
    </main>
  )
}
