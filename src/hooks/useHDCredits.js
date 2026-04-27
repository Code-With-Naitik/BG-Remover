import { useState, useEffect } from 'react';

const WEEKLY_LIMIT = 5;
const STORAGE_KEY = 'bgremover_hd_credits_v1';

export const useHDCredits = () => {
  const [credits, setCredits] = useState(WEEKLY_LIMIT);
  const [lastReset, setLastReset] = useState(Date.now());
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const proStatus = localStorage.getItem('bgremover_is_pro') === 'true';
    setIsPro(proStatus);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { count, resetAt } = JSON.parse(saved);
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        if (Date.now() - resetAt > oneWeek) {
          // Reset weekly
          const newData = { count: WEEKLY_LIMIT, resetAt: Date.now() };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
          setCredits(WEEKLY_LIMIT);
          setLastReset(newData.resetAt);
        } else {
          setCredits(count);
          setLastReset(resetAt);
        }
      } catch (e) {
        // Fallback
        initCredits();
      }
    } else {
      initCredits();
    }
  }, []);

  const initCredits = () => {
    const data = { count: WEEKLY_LIMIT, resetAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setCredits(WEEKLY_LIMIT);
    setLastReset(data.resetAt);
  };

  const useCredit = () => {
    if (isPro) return true;
    if (credits > 0) {
      const newCount = credits - 1;
      setCredits(newCount);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, resetAt: lastReset }));
      return true;
    }
    return false;
  };

  return { credits: isPro ? 'Unlimited' : credits, useCredit, resetAt: lastReset, isPro };
};
