import React, { useState } from 'react';
import config from '../config';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Часті запитання</h2>
          <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-4">
          {config.faq.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 transition-all">
              <button 
                onClick={() => toggle(idx)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none min-h-[44px] touch-manipulation"
              >
                <span className="font-bold text-lg text-gray-900 pr-4">{item.question}</span>
                <span className={`text-brand-500 font-bold text-2xl transition-transform ${openIdx === idx ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              {openIdx === idx && (
                <div className="px-6 pb-4 text-gray-600">
                  <div className="pt-4 border-t border-gray-200">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
