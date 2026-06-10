import React from 'react';
import config from '../config';

export default function TopHeading() {
  return (
    <div className="bg-white py-5 px-4 text-center border-b border-gray-100">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight uppercase tracking-wide">
        {config.product.title}
      </h1>
    </div>
  );
}
