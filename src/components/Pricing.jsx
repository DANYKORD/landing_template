import React from 'react';
import config from '../config';

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-md mx-auto px-4 text-center bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-gray-100 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
          {config.product.badge}
        </div>
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{config.product.title}</h2>
        <p className="text-gray-500 mb-8">{config.product.tagline}</p>
        
        <div className="flex justify-center items-end gap-3 mb-8 bg-gray-50 p-4 rounded-2xl">
          <div className="text-gray-400 line-through text-2xl font-semibold mb-1">
            {config.product.originalPrice} {config.product.currency}
          </div>
          <div className="text-brand-600 text-5xl font-extrabold">
            {config.product.price} <span className="text-2xl font-bold text-brand-600">{config.product.currency}</span>
          </div>
        </div>
        
        <button className="w-full bg-brand-600 hover:bg-brand-500 text-white py-4 sm:py-5 rounded-2xl font-bold text-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all transform hover:scale-105 min-h-[56px] touch-manipulation">
          Замовити зараз
        </button>
        <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Оплата при отриманні
        </p>
      </div>
    </section>
  );
}
