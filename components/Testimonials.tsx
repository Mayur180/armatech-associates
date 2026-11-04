import React from 'react';

const testimonials = [
  {
    quote: "Armatech's VMM drastically reduced our inspection time. Their team in Bhosari provided excellent on-site training and support.",
    author: "Quality Head",
    company: "Leading Auto Parts Manufacturer, Chakan",
  },
  {
    quote: "The accuracy of their optical measurement systems is unmatched. We've been using their machines for our precision tool room for over 3 years without a single major issue.",
    author: "Plant Manager",
    company: "Precision Engineering Firm, Pune",
  },
  {
    quote: "We needed a custom solution for measuring complex plastic components. Armatech understood our GD&T requirements perfectly.",
    author: "Metrology Engineer",
    company: "Injection Molding Company, Bhosari MIDC",
  }
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Industry Leaders in Pune
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See what quality and metrology professionals say about our VMM machines.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
              <blockquote className="text-gray-700">
                <p className="text-base leading-7">"{testimonial.quote}"</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-gray-200 pt-4">
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.company}</div>
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}