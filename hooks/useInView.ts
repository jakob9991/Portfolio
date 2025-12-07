import { useEffect, useState, RefObject } from 'react';

export function useInView(ref: RefObject<HTMLElement | null>, options: IntersectionObserverInit = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.root, options.rootMargin]);

  return isInView;
}