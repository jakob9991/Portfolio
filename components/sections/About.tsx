"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AboutBioCard,
  AboutProfileCard,
  AboutResumeCard,
  AboutStatsGrid,
  defaultAboutProfile,
  defaultAboutResume,
  defaultAboutStats,
  AboutProfile,
  AboutResume,
  AboutStat,
} from "@/components/sections/about";

gsap.registerPlugin(ScrollTrigger);

type AboutProps = {
  profile: AboutProfile | null;
  stats: AboutStat[];
  resume: AboutResume | null;
};

export const About = ({ profile, stats, resume }: AboutProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const aboutProfile = profile ?? defaultAboutProfile;
  const aboutResume = resume ?? defaultAboutResume;
  const aboutStats = (stats.length > 0 ? stats : defaultAboutStats)
    .filter((item) => item.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.set(imageRef.current, { autoAlpha: 0, y: 16, scale: 0.94 });
      }
      if (textRef.current) {
        gsap.set(textRef.current, { autoAlpha: 0, y: 20 });
      }

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 92%",
          toggleActions: "play none none reset",
        },
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 92%",
          toggleActions: "play none none reset",
        },
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        delay: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 bg-[#0a0d14] text-slate-200"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(45deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <div className="about-container-glow absolute left-1/2 -translate-x-1/2 top-10 w-[540px] h-[320px] rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[400px_1fr] gap-6 items-start">
            <div ref={imageRef}>
              <AboutProfileCard profile={aboutProfile} />
            </div>

            <div ref={textRef} className="space-y-6">
              <AboutBioCard profile={aboutProfile} />
              <AboutStatsGrid stats={aboutStats} />
              <AboutResumeCard resume={aboutResume} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

