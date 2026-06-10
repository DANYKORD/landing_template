import React from 'react';
import config from '../config';

export default function Gallery() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Галерея</h2>
          <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {config.product.gallery.map((src, idx) => (
            <div key={idx} className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${idx === 0 ? 'col-span-2 md:col-span-2 row-span-2' : ''}`}>
              <img 
                src={src} 
                alt={`${config.product.title} ${idx + 1}`} 
                className="w-full h-full object-cover min-h-[150px] sm:min-h-[200px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
