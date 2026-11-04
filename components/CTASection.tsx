import React from 'react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to upgrade your Quality Control?
            <span className="block text-red-500 mt-2">Book a Free Part Inspection Today.</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-gray-300">
            Bring your complex parts to our dust-free, temperature-controlled facility in Bhosari MIDC. Our engineers will provide a detailed dimensional report at zero cost.
          </p>
        </div>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          {/* Reverted back to standard contact link */}
          <Link href="/contact" className="rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Book Free Inspection
          </Link>
          <Link href="/products" className="text-lg font-semibold leading-6 text-white hover:text-gray-300">
            View Machines <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
