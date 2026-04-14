"use client";

import { useState } from 'react';

type FAQ = {
  q: string;
  a: string;
};

export default function ServiceFAQ({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default to first open

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-primary">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-4 md:p-6 flex justify-between items-center focus:outline-none"
            >
              <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.q}</h3>
              <span className="text-secondary shrink-0">
                {openIndex === index ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>
            </button>
            
            <div 
              className={`px-4 md:px-6 pb-4 md:pb-6 text-gray-600 ${openIndex === index ? 'block' : 'hidden'}`}
            >
              <p className="leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
