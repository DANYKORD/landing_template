import React from 'react';
import config from '../config';

export default function ContentBlocks() {
  return (
    <div className="flex flex-col bg-white">
      {config.contentBlocks.map((block, idx) => (
        <div key={idx} className="flex flex-col mb-0 border-b border-gray-100">
          {block.title && (
            <div className="px-4 py-4 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 text-center leading-tight">{block.title}</h2>
            </div>
          )}
          {block.image && (
            <img src={block.image} alt={block.title} className="w-full h-auto object-cover" loading="lazy" />
          )}
          {block.text && (
            <div className="px-5 py-6 text-gray-800 leading-relaxed whitespace-pre-line text-[17px] font-medium">
              {block.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
