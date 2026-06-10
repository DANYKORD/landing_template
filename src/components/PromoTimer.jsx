import React from 'react';
import config from '../config';
import { useCountdown } from '../hooks/useCountdown';

export default function PromoTimer() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  if (!config.promo.enabled || !config.promo.timer.enabled) return null;

  return (
    <div className="bg-red-50 px-4 py-3 flex items-center justify-between border-b border-red-100">
      <div className="flex items-center gap-2 text-red-600">
        <svg className="w-6 h-6 animate-pulse flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-semibold text-sm leading-tight max-w-[130px]">
          {isExpired ? config.uiText.timer.expired : config.promo.timer.text}
        </span>
      </div>
      
      {!isExpired && (
        <div className="flex gap-1 flex-shrink-0">
          <TimeBlock value={days} />
          <span className="text-red-500 font-bold self-center">:</span>
          <TimeBlock value={hours} />
          <span className="text-red-500 font-bold self-center">:</span>
          <TimeBlock value={minutes} />
          <span className="text-red-500 font-bold self-center">:</span>
          <TimeBlock value={seconds} />
        </div>
      )}
    </div>
  );
}

function TimeBlock({ value }) {
  return (
    <div className="bg-red-600 text-white w-8 h-10 flex items-center justify-center rounded font-bold text-lg shadow-sm">
      {String(value).padStart(2, '0')}
    </div>
  );
}
