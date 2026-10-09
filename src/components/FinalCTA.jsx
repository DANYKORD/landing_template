import React from 'react';
import config from '../config';
import CheckoutForm from './CheckoutForm';

export default function FinalCTA() {
  return (
    <div className="px-4 py-8 bg-white border-t border-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 uppercase leading-tight whitespace-pre-line">{config.uiText.finalCta.title}</h2>
      
      <div className="flex items-end justify-between w-full max-w-[480px] bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs uppercase font-bold mb-1 tracking-wider">{config.uiText.finalCta.oldPrice}</span>
          <span className="text-gray-400 line-through text-2xl font-bold">
            {config.product.originalPrice} {config.product.currency}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-red-600 text-xs uppercase font-bold mb-1 tracking-wider animate-pulse">{config.uiText.finalCta.newPrice}</span>
          <span className="text-red-600 text-4xl font-black">
            {config.product.price} <span className="text-xl font-bold">{config.product.currency}</span>
          </span>
        </div>
      </div>

      <div className="w-full max-w-[480px] mt-4">
        <CheckoutForm />
      </div>
      
      <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-500 font-semibold">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
        {config.uiText.finalCta.securePayment}
      </div>
    </div>
  );
}
