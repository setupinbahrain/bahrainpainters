'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/97335416863?text=Hi,%20I%E2%80%99d%20like%20a%20free%20painting%20quote."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#1EBE5D] transition-transform hover:scale-105 motion-reduce:transition-none group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute rtl:left-full rtl:right-auto rtl:ml-4 ltr:right-full ltr:mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md text-sm font-semibold pointer-events-none">
        Get a Free Quote!
      </span>
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
    </a>
  );
}
