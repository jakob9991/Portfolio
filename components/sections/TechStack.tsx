'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Utility classes for styling


const textGradient = "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500";

// Helper to determine color based on level
const getSkillColor = (level: number) => {
  if (level >= 90) return "from-blue-400 via-purple-500 to-blue-400"; // Expert
  if (level >= 75) return "from-blue-500 to-cyan-400"; // Advanced
  return "from-blue-600/50 to-slate-400/50"; // Intermediate
};

export const TechStack = () => {
  // Enhanced data structure with skill levels
  const techStack = {
  frontend: [
    { name: "React", icon: "⚛️", level: 95, status: "Expert" },
    { name: "Next.js", icon: "▲", level: 85, status: "Advanced" },
    { name: "TypeScript", icon: "🔷", level: 85, status: "Advanced" },
    { name: "Tailwind CSS", icon: "🎨", level: 85, status: "Advanced" },
    { name: "GSAP", icon: "🎬", level: 75, status: "Advanced" },
    { name: "Figma", icon: "🖌️", level: 65, status: "Intermediate" },
  ],
  backend: [
    { name: "Node.js", icon: "🟢", level: 85, status: "Advanced" },
    { name: "Python", icon: "🐍", level: 70, status: "Intermediate" },
    { name: "Java", icon: "☕", level: 60, status: "Intermediate" },
    { name: "Firebase", icon: "🔥", level: 90, status: "Expert" },
    { name: "PostgreSQL", icon: "🐘", level: 60, status: "Intermediate" },
    { name: "Docker", icon: "🐳", level: 75, status: "Advanced" },
    { name: "Git", icon: "📦", level: 90, status: "Expert" },
    { name: "n8n", icon: "🔄", level: 85, status: "Advanced" },
  ],
  mobile: [
    { name: "Kotlin", icon: "🤖", level: 60, status: "Intermediate" },
    { name: "React Native", icon: "⚛️", level: 100, status: "Expert" },
  ],
};

  // Duplicate for seamless loop
  const duplicatedFrontend = [...techStack.frontend, ...techStack.frontend];

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const backendGridRef = useRef<HTMLDivElement>(null);
  const mobileStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Heading Animation
      gsap.fromTo(headingRef.current,
        { 
          y: 50, 
          opacity: 0, 
          autoAlpha: 0 
        },
        {
          y: 0,
          opacity: 1,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Infinite Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }

      // 3. Backend Grid Cards
      if (backendGridRef.current) {
        // Main Card Animation
        gsap.fromTo(".backend-card", 
          { 
            y: 40, 
            opacity: 0, 
            scale: 0.9,
            autoAlpha: 0 
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: backendGridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Progress Bar Animation
        gsap.fromTo(".skill-bar-fill", 
          { width: "0%" },
          {
            width: (index, target) => target.dataset.width,
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: backendGridRef.current,
              start: "top 70%",
            }
          }
        );
      }

      // 4. Mobile Stack
      if (mobileStackRef.current) {
        gsap.fromTo(".mobile-card",
          { 
            y: 40,
            opacity: 0,
            autoAlpha: 0 
          },
          {
            y: 0,
            opacity: 1,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileStackRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
        
        // Mobile Progress Bars
        gsap.fromTo(".mobile-skill-bar", 
          { width: "0%" },
          {
            width: (index, target) => target.dataset.width,
            duration: 1.2,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mobileStackRef.current,
              start: "top 75%",
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Shared Card Component for consistent look
  const TechCard = ({ tech, className = "", isAnimated = false, barClass = "skill-bar-fill" }: any) => (
    <div className={`flex flex-col items-center justify-between gap-4 p-5 rounded-2xl glass-effect hover-glow ${className} min-h-[160px] w-full relative overflow-hidden group`}>
      
      {/* Icon & Name */}
      <div className="flex flex-col items-center gap-2 z-10 w-full">
        <div className="text-4xl filter drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-1 mb-1">
          {tech.icon}
        </div>
        <p className="font-mono font-bold text-lg text-white tracking-wide">
          {tech.name}
        </p>
        <p className={`text-xs font-medium uppercase tracking-wider ${
          tech.level >= 90 ? 'text-purple-300' : 'text-blue-300/80'
        }`}>
          {tech.status}
        </p>
      </div>

      {/* Unified Progress Bar */}
      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-auto">
        <div 
          className={`${barClass} h-full rounded-full bg-gradient-to-r ${getSkillColor(tech.level)}`}
          data-width={`${tech.level}%`}
          style={{ 
            width: isAnimated ? '0%' : `${tech.level}%`, // Static width for marquee, 0 for scroll triggers
          }} 
        />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-24 opacity-0 invisible">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Tech <span className={textGradient}>Stack</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ein Überblick über mein technologisches Portfolio und meine Erfahrungswerte.
          </p>
        </div>

        {/* 1. Frontend & Design - Horizontal Slider */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-10 text-center flex items-center justify-center gap-3">
            <span className="text-blue-500">Frontend</span> & Design
          </h3>
          
          <div className="relative group">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden py-4">
              <div ref={marqueeRef} className="flex gap-6 w-max">
                {duplicatedFrontend.map((tech, index) => (
                  <div key={index} className="w-[220px] flex-shrink-0">
                    {/* Marquee items don't use GSAP width animation to avoid scroll-trigger issues on moving elements */}
                    <TechCard tech={tech} isAnimated={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Backend & Tools - Grid Layout */}
        <div ref={backendGridRef} className="mb-24 min-h-[200px]">
          <h3 className="text-2xl font-bold mb-10 text-center">
            <span className="text-blue-500">Backend</span> & Tools
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {techStack.backend.map((tech, index) => (
              <div key={index} className="backend-card opacity-0 invisible">
                <TechCard tech={tech} isAnimated={true} barClass="skill-bar-fill" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Mobile Development - Cards */}
        <div ref={mobileStackRef} className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-10 text-center">
            <span className="text-blue-500">Mobile</span> Development
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.mobile.map((tech, index) => (
              <div key={index} className="mobile-card opacity-0 invisible">
                <TechCard tech={tech} isAnimated={true} barClass="mobile-skill-bar" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
