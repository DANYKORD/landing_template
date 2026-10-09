import React from 'react';
import config from '../config';
import Media from './Media';

export default function Footer() {
  return (
    <div className="bg-gray-50 text-gray-700 pt-10 pb-12 flex flex-col items-center border-t border-gray-200">
      <Media media={config.footerImage} alt={config.company.name} className="w-full mix-blend-multiply" lazy />
      <div className="text-xs text-gray-400 whitespace-pre-line text-center">
        {config.company.copyright}
      </div>
    </div>
  );
}
