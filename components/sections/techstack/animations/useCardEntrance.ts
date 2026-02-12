"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardEntranceType } from "../types";

gsap.registerPlugin(ScrollTrigger);

export function useCardEntrance(
  gridRef: RefObject<HTMLDivElement | null>,
  sectionRef: RefObject<HTMLDivElement | null>,
  variant: CardEntranceType,
  isMobile: boolean,
) {
  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      gridRef.current.querySelectorAll(".skill-card"),
    );
    if (cards.length === 0) return;

    if (isMobile) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          },
        );
      }, gridRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      const baseTrigger = {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reset" as const,
      };

      switch (variant) {
        case "compiler-scan": {
          const tl = gsap.timeline({ scrollTrigger: baseTrigger });
          cards.forEach((card, index) => {
            // Card fades in from top
            tl.fromTo(
              card,
              { opacity: 0, y: -15 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
              index * 0.15,
            );
            // Left border flashes bright yellow then settles
            tl.fromTo(
              card,
              { borderLeftColor: "rgba(234,179,8,0.6)", borderLeftWidth: "3px" },
              { borderLeftColor: "rgba(234,179,8,0.15)", duration: 0.6, ease: "power2.out" },
              index * 0.15 + 0.1,
            );
          });
          break;
        }

        case "spring-bounce":
          gsap.fromTo(
            cards,
            { scale: 0.7, opacity: 0, y: 40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1.0,
              stagger: 0.12,
              ease: "elastic.out(1, 0.4)",
              scrollTrigger: baseTrigger,
            },
          );
          break;

        case "swipe-alternate":
          cards.forEach((card, index) => {
            const fromLeft = index % 2 === 0;
            gsap.fromTo(
              card,
              {
                x: fromLeft ? -120 : 120,
                opacity: 0,
                rotateY: fromLeft ? -8 : 8,
              },
              {
                x: 0,
                opacity: 1,
                rotateY: 0,
                duration: 0.7,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  toggleActions: "play none none reset",
                },
              },
            );
          });
          break;

        case "sequential-shimmer": {
          const tl = gsap.timeline({ scrollTrigger: baseTrigger });
          cards.forEach((card, index) => {
            tl.fromTo(
              card,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
              index * 0.2,
            );
            const shimmer = card.querySelector(".shimmer-overlay");
            if (shimmer) {
              tl.fromTo(
                shimmer,
                { x: "-100%" },
                { x: "100%", duration: 0.6, ease: "power1.inOut" },
                index * 0.2 + 0.2,
              );
            }
          });
          break;
        }

        case "pipeline-stage": {
          const tl = gsap.timeline({ scrollTrigger: baseTrigger });
          cards.forEach((card, index) => {
            tl.fromTo(
              card,
              { x: -60, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
              index * 0.25,
            );
            const statusEl = card.querySelector(".deploy-status") as HTMLElement | null;
            if (statusEl) {
              tl.call(
                () => {
                  statusEl.textContent = "deploying...";
                  statusEl.classList.add("text-purple-400/70");
                },
                [],
                index * 0.25 + 0.3,
              );
              tl.call(
                () => {
                  statusEl.textContent = "deployed \u2713";
                  statusEl.classList.remove("text-purple-400/70");
                  statusEl.classList.add("text-green-400/80");
                },
                [],
                index * 0.25 + 1.1,
              );
            }
          });
          break;
        }

        case "terminal-print":
          cards.forEach((card, index) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: -10, scaleY: 0.95, transformOrigin: "top" },
              {
                opacity: 1,
                y: 0,
                scaleY: 1,
                duration: 0.3,
                delay: index * 0.18,
                ease: "power1.out",
                scrollTrigger: baseTrigger,
              },
            );
          });
          break;
      }
    }, gridRef);

    return () => ctx.revert();
  }, [gridRef, sectionRef, variant, isMobile]);
}
