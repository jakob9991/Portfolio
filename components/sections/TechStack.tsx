'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Package, Cpu } from "lucide-react";
import { TerminalHeader, SectionHeader, InstallProgress } from "@/components/ui/terminal";

gsap.registerPlugin(ScrollTrigger);

export const TechStack = () => {
  // Tech Stack Data mit Package Manager Style
  const techStack = {
    frontend: [
      { name: "React", icon: "⚛️", level: 95, status: "Expert", version: "^18.3.1" },
      { name: "Next.js", icon: "▲", level: 85, status: "Advanced", version: "^14.0.0" },
      { name: "TypeScript", icon: "🔷", level: 85, status: "Advanced", version: "^5.3.0" },
      { name: "Tailwind CSS", icon: "🎨", level: 85, status: "Advanced", version: "^3.4.0" },
      { name: "GSAP", icon: "🎬", level: 75, status: "Advanced", version: "^3.12.0" },
      { name: "Figma", icon: "🖌️", level: 65, status: "Intermediate", version: "latest" },
    ],
    backend: [
      { name: "Node.js", icon: "🟢", level: 85, status: "Advanced", version: "^20.0.0" },
      { name: "Python", icon: "🐍", level: 70, status: "Intermediate", version: "^3.12" },
      { name: "Java", icon: "☕", level: 60, status: "Intermediate", version: "^17" },
      { name: "Firebase", icon: "🔥", level: 90, status: "Expert", version: "^10.7.0" },
      { name: "PostgreSQL", icon: "🐘", level: 60, status: "Intermediate", version: "^16" },
      { name: "Docker", icon: "🐳", level: 75, status: "Advanced", version: "^24.0" },
      { name: "Git", icon: "📦", level: 90, status: "Expert", version: "^2.43" },
      { name: "n8n", icon: "🔄", level: 85, status: "Advanced", version: "^1.0" },
    ],
    mobile: [
      { name: "Kotlin", icon: "🤖", level: 60, status: "Intermediate", version: "^1.9" },
      { name: "React Native", icon: "⚛️", level: 100, status: "Expert", version: "^0.73.0" },
    ],
  };

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Main Header Animation
      gsap.fromTo(".techstack-header",
        { y: 50, opacity: 0, scale: 0.95, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".techstack-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Frontend Section
      gsap.fromTo(".frontend-section",
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".frontend-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Frontend Package Cards
      gsap.utils.toArray(".frontend-package").forEach((card: any, index: number) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Progress bar
        const progressBar = card.querySelector(".package-progress");
        if (progressBar) {
          gsap.fromTo(progressBar,
            { width: "0%" },
            {
              width: progressBar.dataset.level + "%",
              duration: 1,
              delay: index * 0.1 + 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });

      // 3. Backend Section
      gsap.fromTo(".backend-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".backend-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Backend Install Lines
      gsap.utils.toArray(".install-line").forEach((line: any, index: number) => {
        gsap.fromTo(line,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".backend-section",
              start: "top 75%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // 4. Mobile Section
      gsap.fromTo(".mobile-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mobile-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Mobile Cards
      gsap.utils.toArray(".mobile-package").forEach((card: any, index: number) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0, rotateX: -10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-32 relative bg-[#0a0d14] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Main Heading - SectionHeader Component */}
        <div className="techstack-header max-w-4xl mx-auto mb-20">
          <SectionHeader
            terminalTitle={
              <>
                <Terminal className="w-3 h-3" />
                ~/skills — package.json
              </>
            }
            command="npm"
            args={["list", "--depth=0"]}
            title={<>Tech <span className="text-purple-400">Stack</span></>}
            subtitle="Ein Überblick über mein technologisches Portfolio und meine Erfahrungswerte."
          />
        </div>

        {/* 1. FRONTEND - Package Cards */}
        <div className="frontend-section mb-24">
          {/* Section Header */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Package className="w-3 h-3" />
                  npm install @frontend/* --save
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">Frontend</span> & Design
              </h3>
              <p className="text-gray-500 text-xs mt-2"># User Interface & Experience</p>
            </div>
          </div>

          {/* Frontend Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.frontend.map((tech, index) => (
              <div key={index} className="frontend-package bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                <TerminalHeader dots="small" title={<span className="text-[9px] text-gray-600">{tech.version}</span>} />

                {/* Package Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform">
                      {tech.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-mono font-bold text-white text-lg">{tech.name}</h4>
                      <p className={`text-xs font-mono ${
                        tech.level >= 90 ? 'text-purple-400' :
                        tech.level >= 75 ? 'text-blue-400' :
                        'text-cyan-400'
                      }`}>
                        {tech.status}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-gray-500">
                      <span>Experience</span>
                      <span>{tech.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="package-progress h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        data-level={tech.level}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. BACKEND - Terminal Install Log with InstallProgress Component */}
        <div className="backend-section mb-24">
          {/* Section Header */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Cpu className="w-3 h-3" />
                  npm install @backend/* @database/* @devops/*
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-green-400">Backend</span> & Tools
              </h3>
              <p className="text-gray-500 text-xs mt-2"># Server, Database & DevOps</p>
            </div>
          </div>

          {/* Terminal Install Output */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden">
            <TerminalHeader
              dots="small"
              title={<span className="text-[9px] text-gray-600">install.log — {techStack.backend.length} packages</span>}
            />

            <div className="p-6 font-mono text-sm">
              <InstallProgress items={techStack.backend} />
            </div>
          </div>
        </div>

        {/* 3. MOBILE - Featured Cards */}
        <div className="mobile-section max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Terminal className="w-3 h-3" />
                  npm install @mobile/*
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">Mobile</span> Development
              </h3>
              <p className="text-gray-500 text-xs mt-2"># Cross-Platform Applications</p>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.mobile.map((tech, index) => (
              <div key={index} className="mobile-package bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
                <TerminalHeader
                  dots="small"
                  title={<span className="text-[10px] text-gray-500">v{tech.version}</span>}
                />

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl transform group-hover:scale-110 transition-transform">
                      {tech.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-mono font-bold text-white text-2xl mb-1">{tech.name}</h4>
                      <p className="text-sm font-mono text-emerald-400">{tech.status}</p>
                    </div>
                  </div>

                  {/* Proficiency */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-500">Proficiency</span>
                      <span className="text-emerald-400 font-bold">{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
