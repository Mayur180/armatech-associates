'use client'

import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { products } from '@/lib/catalog'

const groups = [
  { label: 'Manual', category: 'Manual' },
  { label: 'Semi-Automatic', category: 'Semi-auto' },
  { label: 'Automatic', category: 'CNC auto' },
  { label: 'Cabinet Integrated', category: 'Cabinet integrated' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  return <header className="site-nav sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <Link href="/" onClick={() => setOpen(false)} className="font-mono text-lg font-bold uppercase tracking-[-.06em]">Arma<span className="text-primary">Tech</span><span className="ml-2 text-[10px] font-normal tracking-[.16em] text-muted-foreground">/ INDIA</span></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
        <Link href="/" className="nav-link">Home</Link><Link href="/about" className="nav-link">About</Link>
        <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}><button type="button" className="nav-link flex items-center gap-1" aria-expanded={mega} onClick={() => setMega(!mega)}>Products <ChevronDown className="size-3" /></button>{mega && <div className="mega-menu absolute right-0 top-full grid w-[min(760px,calc(100vw-2rem))] grid-cols-2 gap-6 border border-border bg-background p-6 shadow-xl lg:grid-cols-4">{groups.map((group) => <div key={group.category}><p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">{group.label}</p><div className="mt-3 flex flex-col gap-2">{products.filter((p) => p.category === group.category).map((p) => <Link key={p.slug} href={`/products/${p.slug}`} onClick={() => setMega(false)} className="text-xs font-semibold text-foreground hover:text-primary">{p.name}</Link>)}</div></div>)}</div>}</div>
        <Link href="/services" className="nav-link">Quality & Services</Link><Link href="/contact" className="nav-link">Contact</Link><Link href="/contact" className="quote-nav">Request a Quote</Link>
      </nav>
      <button type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="border border-border p-2 md:hidden">{open ? <X className="size-4" /> : <Menu className="size-4" />}</button>
    </div>
    {open && <nav aria-label="Mobile navigation" className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden"><Link href="/" className="mobile-link">Home</Link><Link href="/about" className="mobile-link">About</Link><details className="border-y border-border py-2"><summary className="mobile-link cursor-pointer list-none">Products</summary><div className="grid gap-3 px-3 pb-2 pt-3">{products.map((p) => <Link key={p.slug} href={`/products/${p.slug}`} onClick={() => setOpen(false)} className="text-xs font-semibold text-muted-foreground">{p.name} <span className="text-primary">· {p.variants.map(v => v.model).join(', ')}</span></Link>)}</div></details><Link href="/services" className="mobile-link">Quality & Services</Link><Link href="/contact" className="mobile-link">Contact</Link><Link href="/contact" className="quote-nav my-2 text-center">Request a Quote</Link></nav>}
  </header>
}

// Product imagery remains source-faithful; mix-blend-mode removes white catalogue backgrounds visually.
export function ProductImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) { return <img src={src} alt={alt} loading="lazy" decoding="async" className={`mix-blend-multiply object-contain transition-transform duration-500 hover:scale-[1.04] ${className}`} /> }

export const navProducts = products

export default SiteNav
