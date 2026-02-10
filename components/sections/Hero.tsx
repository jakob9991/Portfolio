'use client'
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, Terminal } from "lucide-react";
import { useMobile } from "@/hooks/useMobile";
import { useInView } from "@/hooks/useInView";

const codeSnippets = [
  { text: "const dev = new Developer('Jakob');", top: 19.64, left: 44.47, rotate: -0.15 },
  { text: "import { Future } from '@tech/now';", top: 88.53, left: 64.64, rotate: 3.07 },
  { text: "while(alive) { code(); }", top: 14.72, left: 88.85, rotate: 1.70 },
  { text: "git commit -m 'feat: next-level';", top: 49.54, left: 71.64, rotate: -2.34 },
  { text: "sudo apt-get install skills", top: 87.23, left: 43.76, rotate: 1.11 },
  { text: "<Button variant='ghost' />", top: 87.82, left: 57.89, rotate: 4.96 },
  { text: "SELECT * FROM ideas WHERE status='new';", top: 87.71, left: 27.04, rotate: -2.80 },
  { text: "npm run build:dream", top: 61.12, left: 89.97, rotate: -1.26 }
];

export const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Ref to store the specific timeline for floating elements so we can pause/play it
  const floatingTlRef = useRef<gsap.core.Timeline | null>(null);

  const [typedText, setTypedText] = useState("");
  const fullText = "Full-Stack Entwickler";
  
  const isMobile = useMobile();
  // Performance: Detect if component is on screen. Threshold 0 means "as soon as 1 pixel is visible"
  const isInView = useInView(heroRef, { threshold: 0 });

  // Typing Effect Logic with Loop
  useEffect(() => {
    // Don't run typing logic if off-screen
    if (!isInView) return;

    let index = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const typeStep = () => {
      if (!isDeleting) {
        // Typing forward
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
          timeout = setTimeout(typeStep, isMobile ? 80 : 100);
        } else {
          // Finished typing, wait before deleting
          timeout = setTimeout(() => {
            isDeleting = true;
            typeStep();
          }, 2000); // Wait 2 seconds before deleting
        }
      } else {
        // Deleting backward
        if (index > 0) {
          index--;
          setTypedText(fullText.slice(0, index));
          timeout = setTimeout(typeStep, isMobile ? 50 : 60);
        } else {
          // Finished deleting, wait before typing again
          timeout = setTimeout(() => {
            isDeleting = false;
            typeStep();
          }, 500); // Wait 500ms before typing again
        }
      }
    };

    // Start the animation
    setTypedText("");
    typeStep();

    return () => clearTimeout(timeout);
  }, [isMobile, isInView]);

  // Main GSAP Animation Setup
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {

      // 1. Floating Code Background - Only created if NOT mobile
      // We store this in a ref to control playback later based on view state
      if (!isMobile) {
        const snippets = gsap.utils.toArray(".code-snippet");
        
        // Create a timeline or simple tweens. A timeline is easier to control.
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        
        snippets.forEach((snippet: any) => {
          // Add to timeline with offset (position parameter 0 to start all at once)
          tl.to(snippet, {
            y: "random(-50, 50)",
            x: "random(-20, 20)",
            opacity: "random(0.3, 0.6)",
            duration: "random(3, 6)",
            ease: "sine.inOut"
          }, 0);
        });
        
        floatingTlRef.current = tl;
      }

      // 2. Entrance Animation (Runs once)
      const tlEntry = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlEntry.from(containerRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        y: 30
      })
      .from(".terminal-line", {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.8
      }, "-=0.6");

      // 3. 3D Tilt Effect - STRICTLY DESKTOP ONLY
      // Moving event listeners inside the condition ensures mobile doesn't attach them
      if (!isMobile) {
        const handleMouseMove = (e: MouseEvent) => {
          // Performance: If we are not looking at the hero, don't calculate math
          if (!cardRef.current || !isInView) return;
          
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          
          const xPct = (clientX / innerWidth - 0.5);
          const yPct = (clientY / innerHeight - 0.5);
          
          const rotateY = xPct * 10; 
          const rotateX = -yPct * 10;

          gsap.to(cardRef.current, {
            rotateY: rotateY,
            rotateX: rotateX,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto" // Prevent conflict with reset animation
          });

          gsap.to(".code-layer", {
            x: xPct * -40,
            y: yPct * -40,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto"
          });
        };

        const handleMouseLeave = () => {
           gsap.to(cardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            overwrite: true
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        // Using heroRef for leave is safer than window to reset when cursor leaves the section
        heroRef.current?.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup function specifically for these listeners within the context scope
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          heroRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        };
      }

    }, heroRef);

    return () => ctx.revert();
  }, [isMobile, isInView]); // Re-run if mobile state or view state changes

  // Play/Pause Effect based on Viewport Visibility
  useEffect(() => {
    if (!floatingTlRef.current) return;

    if (isInView) {
      floatingTlRef.current.play();
    } else {
      floatingTlRef.current.pause();
    }
  }, [isInView]);

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-[#0a0d14] text-slate-200"
    >
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Grid Pattern - Uses hardware acceleration via CSS if possible, low cost */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

      {/* 2. Floating Code Snippets (Parallax Layer) */}
      {/* Optimization: Hide DOM elements entirely on mobile to reduce DOM size */}
      {!isMobile && (
        <div className="code-layer absolute inset-0 overflow-hidden pointer-events-none will-change-transform">
          {codeSnippets.map((snippet, i) => (
            <div
              key={i}
              className="code-snippet absolute font-mono text-xs md:text-sm text-sky-500/20 whitespace-nowrap select-none blur-[1px] will-change-transform"
              style={{
                top: `${snippet.top}%`,
                left: `${snippet.left}%`,
                transform: `rotate(${snippet.rotate}deg)`
              }}
            >
              {snippet.text}
            </div>
          ))}
        </div>
      )}

      {/* 3. Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-500/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none will-change-transform"></div>


      {/* --- MAIN CONTENT (3D Perspective Container) --- */}
      <div 
        ref={containerRef}
        className="container mx-auto px-4 relative z-10 perspective-[2000px]"
      >
        {/* Floating Glass Terminal */}
        <div 
          ref={cardRef}
          className="max-w-4xl mx-auto bg-[#0f1219]/80 md:bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden relative group transform-style-3d will-change-transform"
        >
          {/* Border Glow on Hover - Disable hover effects on mobile via media query/logic if needed, but CSS handles it okay */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>

          {/* Terminal Header */}
          <div className="h-10 bg-[#151921] border-b border-white/5 flex items-center px-4 justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
               <Terminal className="w-3 h-3" />
               ~/home
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-12 font-mono text-left">
            
            {/* Line 1: Greeting */}
            <div className="terminal-line mb-6">
              <span className="text-gray-400 text-sm">Hey, ich bin Jakob.</span>
            </div>

            {/* Line 2: Main Headline Output */}
            <div className="terminal-line mb-8">
               <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight">
                 Entwickle digitale <br className="hidden md:block" />
                 <span className="text-sky-400">Erlebnisse</span> mit Tiefe.
               </h1>
            </div>

            {/* Line 3: Typing Subtitle */}
            <div className="terminal-line flex items-center gap-2 text-base md:text-xl text-cyan-400/90 mb-10 h-8">
               <span className="text-gray-500">{'>'}</span>
               <span>{typedText}</span>
               <span className="w-2.5 h-5 bg-cyan-400 animate-pulse"></span>
            </div>

            {/* Line 4: Status & CTA */}
            <div className="terminal-line flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 border-t border-white/5 pt-8">
               
               {/* Status Indicator */}
               <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/5 border border-green-500/10">
                 <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                 </span>
                 <span className="text-xs font-bold text-green-400 tracking-wider">VERFÜGBAR</span>
               </div>

               {/* CTA Button */}
               <button 
                 onClick={scrollToProjects}
                 className="group flex items-center gap-3 text-sky-400 hover:text-sky-300 transition-colors"
               >
                 <span className="font-bold border-b border-sky-400/30 group-hover:border-sky-300 pb-0.5">Projekte ansehen</span>
                 <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
               </button>

            </div>

          </div>
          

        </div>
      </div>
    </section>
  );
};