import { MutableRefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMobile } from "@/hooks/useMobile";

gsap.registerPlugin(ScrollTrigger);

export const useProjectsChapterAnimations = (sectionRef: MutableRefObject<HTMLElement | null>) => {
  const isMobile = useMobile();

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const baseDuration = isMobile ? 0.45 : 0.7;

      gsap.fromTo(
        ".projects-section-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: baseDuration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-section-header",
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".project-chapter").forEach((chapter, chapterIndex) => {
        gsap.fromTo(
          chapter,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: baseDuration,
            delay: chapterIndex * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 82%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          prefersReducedMotion
            ? { opacity: 0 }
            : isMobile
              ? { opacity: 0, y: 20 }
              : { opacity: 0, y: 28, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: baseDuration,
            delay: Math.min(index * 0.04, 0.16),
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".web-hero").forEach((element) => {
        gsap.fromTo(
          element,
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(20% 0% 20% 0%)" },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: isMobile ? 0.45 : 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".mobile-story-panel, .mobile-journey-panel").forEach((element, index) => {
        gsap.fromTo(
          element,
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: index % 2 === 0 ? -14 : 14 },
          {
            opacity: 1,
            x: 0,
            duration: isMobile ? 0.35 : 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".automation-control-panel").forEach((element) => {
        gsap.fromTo(
          element,
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 16 },
          {
            opacity: 1,
            x: 0,
            duration: isMobile ? 0.4 : 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".project-visual").forEach((visual) => {
        gsap.fromTo(
          visual,
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: baseDuration,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visual,
              start: "top 86%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".project-kpi, .project-tag").forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.25 : 0.32,
            delay: Math.min(index * 0.015, 0.15),
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".mobile-screen").forEach((screen, index) => {
        gsap.fromTo(
          screen,
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.35 : 0.5,
            delay: 0.1 + index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: screen,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".workflow-step").forEach((step, index) => {
        gsap.fromTo(
          step,
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 },
          {
            opacity: 1,
            x: 0,
            duration: isMobile ? 0.25 : 0.35,
            delay: 0.08 + index * 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 92%",
              toggleActions: "play none none reset",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, sectionRef]);
};
