'use client'

import { motion } from 'framer-motion'

const services = [
  {
    id: '01',
    title: 'Product selection',
    desc: 'Translate a measurement requirement into a clear, considered equipment shortlist.'
  },
  {
    id: '02',
    title: 'Technical guidance',
    desc: 'Get practical context on applications, workflows and the questions that matter.'
  },
  {
    id: '03',
    title: 'After-sales support',
    desc: 'Keep your measurement process moving with a responsive technical partner.'
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      
      {/* HEADER SECTION */}
      <section className="bg-white px-5 pt-20 pb-10 text-neutral-900 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[.22em] text-red-600"
          >
            Services
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-4xl font-mono text-5xl font-bold uppercase tracking-[-.06em] sm:text-7xl"
          >
            Support for the<br />decisions behind<br />the data.
          </motion.h1>
        </div>
      </section>

      {/* LIST SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="border-t border-border">
          {services.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="grid grid-cols-1 gap-6 border-b border-border py-8 md:grid-cols-[80px_1fr_1.5fr] md:items-center md:gap-10"
            >
              <div className="font-mono text-2xl font-bold text-red-600">
                {item.id}
              </div>
              <div className="font-mono text-xl font-bold uppercase tracking-widest">
                {item.title}
              </div>
              <div className="text-sm leading-7 text-neutral-600">
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  )
}
