'use client';

export const shouldSkipMotion = () => {
  if (typeof window === "undefined") return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return reduceMotion || isSmallScreen || isTouch;
};
