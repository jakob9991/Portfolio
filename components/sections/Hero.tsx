// components/sections/Hero.tsx
'use client'
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/Button";
import { ArrowDown } from "@/components/ui/Icons";

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Full-Stack Entwickler", 
    "Medieninformatik Student", 
    "KI-Enthusiast"
  ];
  
  const heroRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false); // ✅ Verhindert doppelte Animation

  // Typewriter Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000); // ✅ Langsamer: 4 Sekunden statt 3
    return () => clearInterval(interval);
  }, [roles.length]);

  // GSAP Entrance Animation - NUR EINMAL beim Mount
  useEffect(() => {
    if (hasAnimated.current) return; // ✅ Verhindert doppeltes Ausführen
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(kickerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8, // ✅ Langsamer
      })
      .from(headlineRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.0, // ✅ Langsamer
      }, "-=0.5")
      .from(roleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8, // ✅ Langsamer
      }, "-=0.4")
      .from(buttonRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6, // ✅ Langsamer
      }, "-=0.3");

      // Schwebende Animation für Gradient-Kreise
      gsap.to(".gradient-orb-1", {
        y: -30,
        x: 20,
        duration: 6, // ✅ Langsamer
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".gradient-orb-2", {
        y: 30,
        x: -20,
        duration: 7, // ✅ Langsamer
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []); // ✅ Leeres Dependency Array = nur beim Mount

  // Rollen-Wechsel Animation - NUR für Text-Wechsel
  useEffect(() => {
    if (!roleRef.current || currentRole === 0) return; // ✅ Beim ersten Render überspringen

    const ctx = gsap.context(() => {
      gsap.fromTo(
        roleRef.current,
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, // ✅ Langsamer
          ease: "power2.out" 
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [currentRole]); // ✅ Nur bei currentRole-Änderung

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
      {/* Gradient Glow Hintergrund */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Kicker */}
          <p
            ref={kickerRef}
            className="text-primary font-mono text-sm md:text-base mb-6 tracking-wider uppercase"
          >
            Jakob Dickhardt
          </p>

          {/* Hauptüberschrift */}
          <h1
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            Digitale Erlebnisse
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              erschaffen
            </span>
          </h1>

          {/* Typewriter Effekt */}
          <div className="h-12 md:h-16 mb-12">
            <p
              ref={roleRef}
              className="text-xl md:text-2xl text-muted-foreground font-mono"
            >
              {roles[currentRole]}
            </p>
          </div>

          {/* CTA Button */}
          <div ref={buttonRef}>
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl group shadow-lg hover:shadow-primary/50 transition-all"
            >
              Projekte entdecken
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Animierte Hintergrund-Kreise */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="gradient-orb-1 absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="gradient-orb-2 absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};