'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Code, Rocket, BrainCircuit, Terminal, HeartHandshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "2025 - Heute",
    title: "AI & Automation Engineer",
    subtitle: "Focus: Business Logic & Workflow Design",
    description: "Spezialisierung auf KI-gestützte Prozessautomatisierung. Entwicklung von RAG-Systemen und n8n-Workflows für Geschäftskunden. Umsetzung komplexer Web-Projekte wie Cenra.ai.",
    icon: <BrainCircuit className="w-6 h-6 text-white" />,
    color: "bg-purple-500",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]"
  },
  {
    year: "2023 - Heute",
    title: "B.Sc. Medieninformatik",
    subtitle: "University of Applied Sciences Frankfurt",
    description: "Vertiefung in Web & Mobile Development. Parallel dazu Mitgründer von SJP Connect und Lead Developer für die 'Vibon' App (React Native). Verbindung von Theorie und Praxis.",
    icon: <Code className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]"
  },
  {
    year: "2019 - 2023",
    title: "B.A. Soziale Arbeit",
    subtitle: "Human-Centric Foundation (Grade: 1.8)",
    description: "Abschluss mit Auszeichnung. Dieses Studium bildet mein Fundament für User Experience (UX). Es lehrte mich Psychologie, Kommunikation und Empathie – essenziell, um Software zu bauen, die Menschen intuitiv verstehen und gerne nutzen.",
    icon: <HeartHandshake className="w-6 h-6 text-white" />,
    color: "bg-rose-500",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)]"
  },
  {
    year: "2018 - 2021",
    title: "Entrepreneurship & Origins",
    subtitle: "Amazon FBA & Python",
    description: "Der Startschuss: Erste Schritte in der Programmierung mit Python (Game Dev). Gleichzeitig Aufbau eines eigenen E-Commerce Business (Amazon FBA), was mein unternehmerisches Denken und Verständnis für Wirtschaftskreisläufe prägte.",
    icon: <Rocket className="w-6 h-6 text-white" />,
    color: "bg-orange-500",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]"
  }
];

export const Timeline = () => {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Line Drawing Animation
      // The line grows vertically as the user scrolls through the section
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1, // Smooth scrubbing matches scroll position
            }
          }
        );
      }

      // 2. Card Animations
      // Cards slide in from left/right
      const cards = gsap.utils.toArray(".timeline-card");
      cards.forEach((card: any, i) => {
        const isLeft = i % 2 === 0;
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            x: isLeft ? -50 : 50,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Start animation when card top is at 85% of viewport height
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 3. Dot Animations
      // Dots pop in when scrolled to
      gsap.utils.toArray(".timeline-dot").forEach((dot: any) => {
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)", // Bouncy effect
            scrollTrigger: {
              trigger: dot,
              start: "top 70%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="career" className="py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vom unternehmerischen Start über soziale Kompetenz zur technischen Expertise.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line Container */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2">
            {/* The Animated Line (Progress) - Uses gradient to match the cards */}
            <div ref={lineRef} className="w-full bg-gradient-to-b from-purple-500 via-rose-500 to-orange-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          </div>

          <div className="space-y-16 md:space-y-32">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot (Absolute Center) */}
                  <div className={`timeline-dot absolute left-[20px] md:left-1/2 w-10 h-10 -translate-x-1/2 flex items-center justify-center rounded-full z-10 bg-[#0a0a0a] border-2 border-white/10 ${item.glow}`}>
                     <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  </div>

                  {/* Spacer for the other side (Desktop only) to push card to correct side */}
                  <div className="hidden md:block md:w-5/12"></div>

                  {/* Content Card */}
                  <div className="timeline-card pl-16 md:pl-0 w-full md:w-5/12">
                     <div className="glass-effect p-8 rounded-2xl border-t border-white/10 hover:border-white/20 transition-colors relative group">
                        
                        {/* Background Gradient for Hover - subtle colored tint based on item color */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${item.color.replace('bg-', 'from-').replace('500', '400')} to-transparent rounded-2xl pointer-events-none`}></div>

                        <div className="flex items-center justify-between mb-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 ${item.color.replace('bg-', 'text-')}`}>
                             {item.year}
                           </span>
                           <div className={`p-2 rounded-lg bg-white/5 ${item.color.replace('bg-', 'text-')}`}>
                              {item.icon}
                           </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                        <p className={`text-sm font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r ${item.color.replace('bg-', 'from-').replace('500', '400')} to-white`}>
                          {item.subtitle}
                        </p>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                     </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
