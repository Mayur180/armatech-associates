'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { products } from '@/lib/catalog'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const intent = searchParams.get('intent')

  const [selectedMachine, setSelectedMachine] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [message, setMessage] = useState('')

  // Auto-fill logic for Free Inspection
  useEffect(() => {
    if (intent === 'free-inspection') {
      setSelectedMachine('Free Part Inspection')
      setMessage("Hi Armatech Team,\n\nI am interested in the Diwali Special Free Part Inspection offer. I would like to schedule an appointment to bring my parts to your Bhosari facility.\n\nPlease let me know the next available slot.\n\nThank you.")
    }
  }, [intent])

  // Find the currently selected machine to get its models
  // We use `name` here instead of `family` to avoid duplicate "Video Measuring Machine" names
  const currentMachine = products.find((p) => p.name === selectedMachine)
  const availableModels = currentMachine ? currentMachine.variants : []

  return (
    <main className="min-h-screen bg-background py-20 px-5">
      <div className="mx-auto max-w-3xl">
        
        <h1 className="text-4xl font-bold font-mono uppercase tracking-[-0.04em] mb-10">
          Contact Us
        </h1>

        <form className="flex flex-col gap-6">
          
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Name</label>
              <input type="text" className="w-full border border-border p-3 outline-none focus:border-primary" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Email</label>
              <input type="email" className="w-full border border-border p-3 outline-none focus:border-primary" placeholder="Your Email" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2">Phone</label>
            <input type="tel" className="w-full border border-border p-3 outline-none focus:border-primary" placeholder="Your Phone Number" />
          </div>

          {/* MACHINE SELECTION (Pulls from catalog.ts) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            {/* Machine Name Dropdown */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">
                Machine Series
              </label>
              <select 
                value={selectedMachine}
                onChange={(e) => {
                  setSelectedMachine(e.target.value)
                  setSelectedModel('') // Reset model when series changes
                }}
                className="w-full border border-border bg-background p-3 outline-none focus:border-primary"
              >
                <option value="" disabled>Select a machine...</option>
                <option value="Free Part Inspection">Free Part Inspection (Diwali Offer)</option>
                {/* MAP THROUGH THE UNIQUE MACHINE NAMES */}
                {products.map((product) => (
                  <option key={product.name} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Specific Model Dropdown */}
            {selectedMachine && selectedMachine !== 'Free Part Inspection' && (
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">
                  Specific Model
                </label>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full border border-border bg-background p-3 outline-none focus:border-primary"
                >
                  <option value="" disabled>Select a model...</option>
                  {availableModels.map((variant) => (
                    <option key={variant.model} value={variant.model}>
                      {variant.model}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Note for Free Inspection */}
          {selectedMachine === 'Free Part Inspection' && (
            <p className="text-sm text-primary font-bold border-l-4 border-primary pl-4 py-2 bg-primary/5">
              Note: Free inspections must be done at our dust-free Bhosari facility.
            </p>
          )}

          {/* Message */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2">Message</label>
            <textarea 
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-border p-3 outline-none focus:border-primary"
              placeholder="How can we help you? Please include part dimensions if requesting an inspection."
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary/90 transition-colors"
          >
            Send Request
          </button>
        </form>

      </div>
    </main>
  )
}
