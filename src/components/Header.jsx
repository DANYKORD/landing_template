import React from 'react';
import config from '../config';

export default function Header() {
  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl tracking-tight text-gray-900 truncate max-w-[60%]">
          {config.company.name}
        </div>
        <button 
          onClick={scrollToPricing}
          className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors touch-manipulation min-h-[44px]"
        >
          Замовити
        </button>
      </div>
    </header>
  );
}
