"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const DevOpsBackground = ({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLDivElement | null>;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !sectionRef.current) return;

    const lines = svgRef.current.querySelectorAll(".pipeline-line");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { strokeDashoffset: 300 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        },
      );
    }, svgRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <defs>
        <marker
          id="pipeline-arrow"
          markerWidth="6"
          markerHeight="4"
          refX="6"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 6 2, 0 4" fill="rgba(168,85,247,0.35)" />
        </marker>
      </defs>
      {[20, 40, 60, 80].map((y, i) => (
        <line
          key={i}
          className="pipeline-line"
          x1="5%"
          y1={`${y}%`}
          x2="95%"
          y2={`${y}%`}
          stroke="rgba(168,85,247,0.1)"
          strokeWidth="1.5"
          strokeDasharray="6 3"
          markerEnd="url(#pipeline-arrow)"
        />
      ))}
    </svg>
  );
};
