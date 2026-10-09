import { useState, useEffect } from 'react';
import config from '../config';

// Приймає дату як "2026-12-31 23:59", "2026-12-31T23:59" або просто "2026-12-31" (= кінець дня)
function parseEndDate(value) {
  const raw = String(value || '').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return new Date(`${raw}T23:59:59`).getTime();
  return new Date(raw.replace(' ', 'T')).getTime();
}

function calcTimeLeft(endTime) {
  const distance = endTime - Date.now();
  if (!(distance > 0)) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    isExpired: false
  };
}

export function useCountdown() {
  const endTime = parseEndDate(config.promo.timer.endDate);
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(endTime));

  useEffect(() => {
    if (!config.promo.timer.enabled) return;

    const interval = setInterval(() => {
      const next = calcTimeLeft(endTime);
      setTimeLeft(next);
      if (next.isExpired) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}
