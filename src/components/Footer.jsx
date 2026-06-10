import React from 'react';
import config from '../config';

export default function Footer() {
  return (
    <div className="bg-gray-50 text-gray-700 pt-10 pb-12 flex flex-col items-center border-t border-gray-200">
      <img src={config.footerImage} alt={config.uiText.footer.altText} className="w-full mix-blend-multiply" />
      <div className="text-xs text-gray-400">
        {config.company.copyright}
      </div>
    </div>
  );
}
