'use client'
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Full-Stack Developer", 
    "Media Informatics Student", 
    "AI Enthusiast"
  ];
  
  const heroRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Typewriter Effect Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Initial Entrance Animation
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(kickerRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
      })
      .from(headlineRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
      }, "-=0.6")
      .from(roleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
      }, "-=0.8")
      .from(buttonRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
      }, "-=0.6");

      // Floating Orbs Animation
      gsap.to(".gradient-orb-1", {
        y: -40,
        x: 30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".gradient-orb-2", {
        y: 40,
        x: -30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Role Switch Animation
  useEffect(() => {
    if (!roleRef.current) return;

    // Animate the text change
    const ctx = gsap.context(() => {
      gsap.fromTo(
        roleRef.current,
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out" 
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [currentRole]);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="start"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
         {/* Subtle Grid Pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none"></div>
         {/* Radial Gradient overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-background pointer-events-none" />
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="gradient-orb-1 absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="gradient-orb-2 absolute bottom-20 right-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Kicker */}
          <div ref={kickerRef} className="flex items-center justify-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-blue-500/50 inline-block"></span>
            <p className="text-blue-400 font-mono text-sm tracking-[0.2em] uppercase">
              Jakob Dickhardt
            </p>
            <span className="h-[1px] w-12 bg-blue-500/50 inline-block"></span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-7xl font-bold mb-10 leading-[1.1] tracking-tight"
          >
            Digitale Erlebnisse
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-pulse-slow">
              erschaffen.
            </span>
          </h1>

          {/* Typewriter Role */}
          <div className="h-16 mb-12 flex items-center justify-center">
            <div
              ref={roleRef}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <p className="text-lg md:text-xl text-gray-300 font-mono">
                 {roles[currentRole]}
               </p>
            </div>
          </div>

          {/* CTA Button */}
          <div ref={buttonRef}>
            <button
              onClick={scrollToProjects}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Projekte entdecken
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
