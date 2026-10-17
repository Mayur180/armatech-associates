'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Mail, Phone, CheckCircle2 } from 'lucide-react'
import { products } from '@/lib/catalog'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    product: 'Manual VMM',
    model: 'AA-9011M'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedProduct = products.find(p => p.name === formData.product) || products[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productSlug: selectedProduct.slug
        })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      
      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset model if product changes
      ...(name === 'product' ? { model: products.find(p => p.name === value)?.variants[0]?.model || '' } : {})
    }))
  }

  return (
    <main className="min-h-screen bg-background">
      
      {/* HEADER & INFO CARDS */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* LEFT SIDE - TEXT */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-red-600">
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
            <p className="mt-8 font-mono text-xs font-bold uppercase tracking-widest text-red-600">
              Contact Armatech
            </p>
            <h1 className="mt-4 font-mono text-4xl font-bold uppercase leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Let's find <br />
              <span className="text-red-600">the right</span> <br />
              solution.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600">
              Tell us about your measurement requirement, select the system you are interested in, and our team will help you with the right precision measurement solution.
            </p>
          </div>

          {/* RIGHT SIDE - 3 INFO CARDS */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="border border-neutral-200 bg-white p-6 shadow-sm">
              <MapPin className="size-6 text-red-600" />
              <h3 className="mt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Location</h3>
              <p className="mt-2 text-sm font-bold text-neutral-900">Armatech Associates</p>
              <p className="mt-1 text-sm text-neutral-600">W-174 A, 'S' Block, M.I.D.C., Bhosari Industrial Estate, Pune - 411 026, Maharashtra, India</p>
            </div>
            
            <div className="border border-neutral-200 bg-white p-6 shadow-sm">
              <Clock className="size-6 text-red-600" />
              <h3 className="mt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Working Hours</h3>
              <p className="mt-2 text-sm font-bold text-neutral-900">Business Hours</p>
              <p className="mt-1 text-sm text-neutral-600">Monday - Sunday: 9:00 - 18:00</p>
              <p className="mt-1 text-sm font-bold text-red-600">Thursday: Closed</p>
            </div>

            <div className="border border-neutral-200 bg-white p-6 shadow-sm">
              <Mail className="size-6 text-red-600" />
              <h3 className="mt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Enquiry</h3>
              <p className="mt-2 text-sm font-bold text-neutral-900">Request a Quotation</p>
              <p className="mt-1 text-sm text-neutral-600">Use the form below to tell us about your product, model, and measurement requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="aspect-square w-full sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.6207955716104!2d73.83344350903444!3d18.636118282406887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b873ffffffff%3A0x84ade136cd0a8c34!2sArmatech%20Associates!5e0!3m2!1sen!2sin!4v1792228720320!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Armatech Associates Location"
            />
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="mx-auto max-w-4xl px-5 pb-20 lg:px-8">
        <div className="border border-neutral-200 bg-white shadow-sm">
          
          <div className="border-b border-neutral-200 p-8 text-center sm:p-12">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-600">Step 01</p>
            <h2 className="mt-3 font-mono text-3xl font-bold uppercase tracking-tight text-neutral-900">Tell us what you need.</h2>
            <p className="mt-4 text-sm text-neutral-500">Select the measurement system and model you are interested in, then provide your contact information.</p>
          </div>

          {isSubmitted ? (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-neutral-900">Enquiry Submitted!</h3>
              <p className="mt-2 text-neutral-600">Thank you for contacting Armatech Associates. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 sm:p-12">
              {error && (
                <div className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Product Range</label>
                  <select 
                    name="product" 
                    value={formData.product} 
                    onChange={handleChange}
                    className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-red-600 focus:outline-none"
                  >
                    {products.map(p => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Model</label>
                  <select 
                    name="model" 
                    value={formData.model} 
                    onChange={handleChange}
                    className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-red-600 focus:outline-none"
                  >
                    {selectedProduct?.variants.map(v => (
                      <option key={v.model} value={v.model}>{v.model} ({v.travel} mm)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-red-600 focus:outline-none" />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Company</label>
                  <input required type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-red-600 focus:outline-none" />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-red-600 focus:outline-none" />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Phone</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-red-600 focus:outline-none" />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us about your measurement requirement..." className="w-full border border-neutral-300 px-4 py-3 text-sm focus:border-red-600 focus:outline-none resize-none" />
              </div>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-[11px] text-neutral-500 max-w-xs">
                  By submitting this form you agree to our terms and privacy policy.
                </p>
                <button type="submit" disabled={isLoading} className="bg-red-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-red-700 disabled:opacity-50">
                  {isLoading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </main>
  )
}
