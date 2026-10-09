import React from 'react';
import config from '../config';
import Media from './Media';

export default function Hero({ openCheckout }) {
  return (
    <div className="w-full relative bg-white pb-8">
      {config.product.mainImage && (
        <div className="relative">
          <Media media={config.product.mainImage} alt={config.product.title} className="w-full h-auto object-cover min-h-[300px]" />
          {config.product.badge && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 w-20 h-20 rounded-full flex items-center justify-center text-center font-black text-lg leading-tight shadow-lg transform rotate-12 border-4 border-white whitespace-pre-line">
              {config.product.badge}
            </div>
          )}
        </div>
      )}
      
      <div className="px-4 mt-6">
        <div className="flex items-end justify-between bg-gray-50 p-4 rounded-2xl mb-4 border border-gray-200 shadow-sm">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs uppercase font-bold mb-1 tracking-wider">{config.uiText.hero.oldPrice}</span>
            <span className="text-gray-400 line-through text-2xl font-bold">
              {config.product.originalPrice} {config.product.currency}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-red-600 text-xs uppercase font-bold mb-1 tracking-wider animate-pulse">{config.uiText.hero.newPrice}</span>
            <span className="text-red-600 text-4xl font-black">
              {config.product.price} <span className="text-xl font-bold">{config.product.currency}</span>
            </span>
          </div>
        </div>
        
        <button onClick={openCheckout} className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black text-xl uppercase shadow-[0_5px_15px_rgba(220,38,38,0.4)] transform transition active:scale-[0.98]">
          {config.uiText.hero.orderButton}
        </button>
      </div>
    </div>
  );
}
