"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProgressBarVariant } from "../types";

gsap.registerPlugin(ScrollTrigger);

export function useProgressBarAnimation(
  gridRef: RefObject<HTMLDivElement | null>,
  sectionRef: RefObject<HTMLDivElement | null>,
  variant: ProgressBarVariant,
  isMobile: boolean,
) {
  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const bars = gsap.utils.toArray<HTMLElement>(
      gridRef.current.querySelectorAll(".progress-bar"),
    );
    if (bars.length === 0) return;

    const ctx = gsap.context(() => {
      // Set all bars to full width but scale them to 0 on x-axis
      // scaleX is GPU-composited (no layout reflow)
      bars.forEach((bar) => {
        const target = bar.dataset.proficiency || "0";
        bar.style.width = `${target}%`;
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

        const baseTween = {
          scaleX: 1,
          duration: isMobile ? 0.6 : 1.0,
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reset" as const,
          },
        };

        switch (variant) {
          case "stepped":
            gsap.to(bar, { ...baseTween, ease: "linear" });
            break;

          case "glitch":
            gsap.to(bar, {
              ...baseTween,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(bar, {
                  opacity: gsap.utils.random(0.7, 1),
                  duration: 0.05,
                  repeat: 4,
                  yoyo: true,
                  ease: "none",
                });
              },
            });
            break;

          case "terminal":
            gsap.to(bar, { ...baseTween, ease: "power1.out" });
            break;

          default:
            gsap.to(bar, { ...baseTween, ease: "power2.out" });
            break;
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, [gridRef, sectionRef, variant, isMobile]);
}
