'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <Link href="/" onClick={() => setOpen(false)} className="font-mono text-lg font-bold uppercase tracking-[-.06em]">Arma<span className="text-primary">Tech</span><span className="ml-2 text-[10px] font-normal tracking-[.16em] text-muted-foreground">/ INDIA</span></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
        {links.map((link) => <Link key={link.href} href={link.href} className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">{link.label}</Link>)}
      </nav>
      <button type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="border border-border p-2 md:hidden">{open ? <X className="size-4" /> : <Menu className="size-4" />}</button>
    </div>
    {open && <nav aria-label="Mobile navigation" className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-3 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">{link.label}</Link>)}</nav>}
  </header>
}
