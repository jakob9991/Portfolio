"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { x1: "10%", y1: "15%", x2: "45%", y2: "30%" },
  { x1: "55%", y1: "20%", x2: "90%", y2: "40%" },
  { x1: "20%", y1: "50%", x2: "50%", y2: "65%" },
  { x1: "50%", y1: "55%", x2: "85%", y2: "75%" },
  { x1: "15%", y1: "80%", x2: "60%", y2: "90%" },
];

export const BackendBackground = ({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLDivElement | null>;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !sectionRef.current) return;

    const dots = svgRef.current.querySelectorAll(".backend-dot");
    const paths = svgRef.current.querySelectorAll(".backend-line");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        paths,
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        },
      );

      dots.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            delay: i * 0.3 + 0.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          },
        );

        gsap.to(dot, {
          attr: {
            cx: lines[i]?.x2 ?? "50%",
            cy: lines[i]?.y2 ?? "50%",
          },
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.4,
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      {lines.map((line, i) => (
        <line
          key={`line-${i}`}
          className="backend-line"
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(16,185,129,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {lines.map((line, i) => (
        <circle
          key={`dot-${i}`}
          className="backend-dot"
          cx={line.x1}
          cy={line.y1}
          r="3"
          fill="rgba(16,185,129,0.5)"
          opacity="0"
        />
      ))}
    </svg>
  );
};
