"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal } from "lucide-react";
import { SectionHeader } from "@/components/ui/terminal";
import { useMobile } from "@/hooks/useMobile";
import {
  BackendDataSection,
  DevOpsSection,
  FrontendSection,
  LanguageSection,
  MobileSection,
  Skill,
  ToolsSection,
} from "@/components/sections/techstack/index";

gsap.registerPlugin(ScrollTrigger);

export const TechStack = ({ skills }: { skills: Skill[] }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".techstack-header",
        isMobile ? { y: 30, opacity: 0 } : { y: 50, opacity: 0, scale: 0.95, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: isMobile ? 0.6 : 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".techstack-header",
            start: "top 85%",
            toggleActions: "play reset play reset",
          },
        },
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="skills" className="py-32 relative bg-[#0a0d14] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="techstack-header max-w-4xl mx-auto mb-20">
          <SectionHeader
            terminalTitle={
              <>
                <Terminal className="w-3 h-3" />
                ~/skills
              </>
            }
            title={
              <>
                Tech-<span className="text-purple-400">Stack</span>
              </>
            }
          />
        </div>

        <LanguageSection skills={skills} />
        <FrontendSection skills={skills} />
        <MobileSection skills={skills} />
        <BackendDataSection skills={skills} />
        <DevOpsSection skills={skills} />
        <ToolsSection skills={skills} />
      </div>
    </section>
  );
};

