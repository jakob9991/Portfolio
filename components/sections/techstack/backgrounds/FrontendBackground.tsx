"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FrontendBackground = ({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLDivElement | null>;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 opacity-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px",
      }}
    />
  );
};
