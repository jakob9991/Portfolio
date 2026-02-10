'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Package, Cpu, Code2, Wrench } from "lucide-react";
import { TerminalHeader, SectionHeader } from "@/components/ui/terminal";
import { useMobile } from "@/hooks/useMobile";

gsap.registerPlugin(ScrollTrigger);

export const TechStack = () => {
  // Tech Stack Data - Neue Struktur
  const techStack = {
    languages: [
      { name: "TypeScript", icon: "🔷", level: 90, version: "v5.3" },
      { name: "JavaScript", icon: "🟨", level: 98, version: "ES2024" },
      { name: "Kotlin", icon: "🤖", level: 60, version: "1.9" },
        { name: "Java", icon: "☕", level: 60, version: "17" },
              { name: "Dart", icon: "🎯", level: 25, version: "3.0" },
      { name: "Python", icon: "🐍", level: 70, version: "3.12" },

    
    ],

    frameworks: [
      { name: "React Native", icon: "⚛️", level: 100, status: "Experte", desc: "Cross-Platform Mobile Apps" },
      { name: "Flutter", icon: "💙", level: 20, status: "Lernend", desc: "UI-Toolkit (im Umstieg)" },
      { name: "React / Next.js", icon: "▲", level: 95, status: "Experte", desc: "Web & Server Components" },
         { name: "Vue.js", icon: "💚", level: 80, status: "Fortgeschritten", desc: "Progressives Web-Framework" }, 
      { name: "Tailwind CSS", icon: "🎨", level: 90, status: "Experte", desc: "Utility-First Styling" },

    ],

    infrastructure: [
      { name: "Firebase / Firestore", icon: "🔥", level: 90, status: "Experte" },
      { name: "Node.js", icon: "🟢", level: 85, status: "Fortgeschritten" },
      { name: "Docker", icon: "🐳", level: 75, status: "Fortgeschritten" },
      { name: "PostgreSQL", icon: "🐘", level: 60, status: "Solide" },
    ],

    tools: [
      { name: "n8n (AI Auto)", icon: "🔄", desc: "Workflow-Automatisierung" },
      { name: "Git / GitHub", icon: "📦", desc: "Versionsverwaltung" },
      { name: "Figma", icon: "🖌️", desc: "UI/UX-Design" },
      { name: "GSAP", icon: "🎬", desc: "High-Performance Animationen" },
    ]
  };

  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      // 1. Main Header Animation - Reduced complexity on mobile
      gsap.fromTo(".techstack-header",
        isMobile ? { y: 30, opacity: 0 } : { y: 50, opacity: 0, scale: 0.95, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: isMobile ? 0.6 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".techstack-header",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // 2. Languages Section - Simplified on mobile
      gsap.fromTo(".languages-section",
        isMobile ? { opacity: 0 } : { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".languages-section",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // Language Cards - Only animate on desktop, or reduce complexity on mobile
      if (!isMobile) {
        gsap.utils.toArray(".language-card").forEach((card: any, index: number) => {
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
                end: "bottom 20%",
                toggleActions: "play reset play reset",
              }
            }
          );

          // Circular Progress Animation
          const progressCircle = card.querySelector(".language-progress");
          if (progressCircle) {
            const level = parseInt(progressCircle.dataset.level || "0");
            const circumference = 2 * Math.PI * 28; // radius = 28
            const offset = circumference * (1 - level / 100);

            gsap.fromTo(progressCircle,
              {
                strokeDashoffset: circumference
              },
              {
                strokeDashoffset: offset,
                duration: 1.2,
                delay: index * 0.1 + 0.3,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play reset play reset",
                }
              }
            );
          }
        });
      } else {
        // Mobile: Simpler fade in without individual card animations
        gsap.fromTo(".language-card",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            scrollTrigger: {
              trigger: ".languages-section",
              start: "top 75%",
              end: "bottom 20%",
              toggleActions: "play reset play reset",
            }
          }
        );

        // Circular Progress on Mobile - Still animate but simpler
        gsap.utils.toArray(".language-progress").forEach((progressCircle: any, index: number) => {
          const level = parseInt(progressCircle.dataset.level || "0");
          const circumference = 2 * Math.PI * 28;
          const offset = circumference * (1 - level / 100);

          gsap.fromTo(progressCircle,
            { strokeDashoffset: circumference },
            {
              strokeDashoffset: offset,
              duration: 0.8,
              delay: index * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".languages-section",
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play reset play reset",
              }
            }
          );
        });
      }

      // 3. Frameworks Section - Simplified on mobile
      gsap.fromTo(".frameworks-section",
        isMobile ? { opacity: 0 } : { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".frameworks-section",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // Framework Cards - Reduce complexity on mobile
      gsap.utils.toArray(".framework-card").forEach((card: any, index: number) => {
        gsap.fromTo(card,
          isMobile ? { opacity: 0 } : { y: 40, opacity: 0, rotateX: -10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: isMobile ? 0.4 : 0.7,
            delay: isMobile ? index * 0.1 : index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play reset play reset",
            }
          }
        );
      });

      // 4. Infrastructure Section - Simplified on mobile
      gsap.fromTo(".infrastructure-section",
        isMobile ? { opacity: 0 } : { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".infrastructure-section",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // Infrastructure Lines - Only on desktop or simpler on mobile
      if (!isMobile) {
        gsap.utils.toArray(".infrastructure-line").forEach((line: any, index: number) => {
          gsap.fromTo(line,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              delay: index * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".infrastructure-section",
                start: "top 75%",
                end: "bottom 20%",
                toggleActions: "play reset play reset",
              }
            }
          );
        });
      } else {
        // Mobile: Simple fade in
        gsap.fromTo(".infrastructure-line",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            scrollTrigger: {
              trigger: ".infrastructure-section",
              start: "top 75%",
              end: "bottom 20%",
              toggleActions: "play reset play reset",
            }
          }
        );
      }

      // 5. Tools Section - Simplified on mobile
      gsap.fromTo(".tools-section",
        isMobile ? { opacity: 0 } : { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tools-section",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // Tool Cards - Simplified on mobile
      gsap.utils.toArray(".tool-card").forEach((card: any, index: number) => {
        gsap.fromTo(card,
          isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.3 : 0.5,
            delay: isMobile ? index * 0.05 : index * 0.1,
            ease: isMobile ? "power2.out" : "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play reset play reset",
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="skills" className="py-32 relative bg-[#0a0d14] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Main Heading */}
        <div className="techstack-header max-w-4xl mx-auto mb-20">
          <SectionHeader
            terminalTitle={
              <>
                <Terminal className="w-3 h-3" />
                ~/skills
              </>
            }
            title={<>Tech-<span className="text-purple-400">Stack</span></>}
          />
        </div>

        {/* 1. LANGUAGES - Compiler Output Style */}
        <div className="languages-section mb-24">
          {/* Section Header */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Code2 className="w-3 h-3" />
                  ~/languages
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-yellow-400">Programmiersprachen</span>
              </h3>
            </div>
          </div>

          {/* Languages Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.languages.map((lang, index) => {
              return (
                <div key={index} className="language-card bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden group hover:border-yellow-500/30 transition-all duration-300">
                  {/* Header */}
                  <div className="h-8 bg-[#151921] border-b border-white/5 flex items-center px-3">
                    <div className="text-[9px] font-mono text-gray-600">{lang.version}</div>
                  </div>

                  {/* Content */}
                  <div className="p-4 text-center">
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                      {lang.icon}
                    </div>
                    <h4 className="font-mono font-bold text-white text-sm mb-2">{lang.name}</h4>

                    {/* Circular Progress */}
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <svg className="transform -rotate-90 w-16 h-16">
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            {lang.level >= 90 && (
                              <>
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                              </>
                            )}
                            {lang.level >= 70 && lang.level < 90 && (
                              <>
                                <stop offset="0%" stopColor="#eab308" />
                                <stop offset="100%" stopColor="#f97316" />
                              </>
                            )}
                            {lang.level >= 50 && lang.level < 70 && (
                              <>
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                              </>
                            )}
                            {lang.level < 50 && (
                              <>
                                <stop offset="0%" stopColor="#6b7280" />
                                <stop offset="100%" stopColor="#4b5563" />
                              </>
                            )}
                          </linearGradient>
                        </defs>
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-white/5"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke={`url(#gradient-${index})`}
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28}`}
                          className="language-progress"
                          data-level={lang.level}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-mono font-bold text-white">{lang.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. FRAMEWORKS - Feature Cards */}
        <div className="frameworks-section mb-24">
          {/* Section Header */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Package className="w-3 h-3" />
                  ~/frameworks
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">Frameworks</span> & Bibliotheken
              </h3>
            </div>
          </div>

          {/* Frameworks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.frameworks.map((framework, index) => (
              <div key={index} className="framework-card bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                <TerminalHeader
                  dots="small"
                  title={<span className="text-[10px] text-gray-500">{framework.status}</span>}
                />

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl transform group-hover:scale-110 transition-transform">
                      {framework.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-mono font-bold text-white text-xl">{framework.name}</h4>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-500">Kenntnisstand</span>
                      <span className="text-blue-400 font-bold">{framework.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
                        style={{ width: `${framework.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. INFRASTRUCTURE - System Monitor Style */}
        <div className="infrastructure-section mb-24">
          {/* Section Header */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Cpu className="w-3 h-3" />
                  ~/infrastructure
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-green-400">Infrastruktur</span>
                <span className="hidden sm:inline">&</span>
                <span className="sm:inline">Backend</span>
              </h3>
            </div>
          </div>

          {/* System Monitor Display */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 font-mono text-sm">

              {/* Process List */}
              <div className="space-y-3 md:space-y-3">
                {techStack.infrastructure.map((tech, index) => {
                  const getSkillColor = (level: number) => {
                    if (level >= 90) return { text: 'text-purple-400', bg: 'bg-purple-500', border: 'border-purple-500/30', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' };
                    if (level >= 75) return { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/30', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' };
                    if (level >= 60) return { text: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500/30', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' };
                    return { text: 'text-cyan-400', bg: 'bg-cyan-500', border: 'border-cyan-500/30', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' };
                  };

                  const colors = getSkillColor(tech.level);

                  return (
                    <div key={index} className="infrastructure-line group hover:bg-white/[0.02] p-3 md:p-2 rounded-lg transition-all border border-white/5 md:border-0">
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-3">
                        {/* Header: Icon + Name */}
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{tech.icon}</span>
                          <div className="flex-1">
                            <div className={`font-bold text-base ${colors.text}`}>{tech.name}</div>
                            <div className="text-[10px] text-gray-600">{tech.status}</div>
                          </div>
                        </div>

                        {/* Skill Level Bar - Mobile */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Kenntnisstand</span>
                            <span className={`font-bold ${colors.text}`}>{tech.level}%</span>
                          </div>
                          <div className="h-2.5 bg-[#0a0a0a] rounded-full overflow-hidden border border-white/5">
                            <div
                              className={`h-full rounded-full ${colors.bg} transition-all duration-1000`}
                              style={{ width: `${tech.level}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5 flex items-center gap-2">
                          <span className="text-2xl">{tech.icon}</span>
                          <div>
                            <div className={`font-bold ${colors.text}`}>{tech.name}</div>
                            <div className="text-[10px] text-gray-500">{tech.status}</div>
                          </div>
                        </div>

                        {/* Skill Level Bar */}
                        <div className="col-span-7">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Kenntnisstand</span>
                              <span className={`font-bold ${colors.text}`}>{tech.level}%</span>
                            </div>
                            <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-white/5">
                              <div
                                className={`h-full rounded-full ${colors.bg} transition-all duration-1000`}
                                style={{ width: `${tech.level}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* 4. TOOLS - Simple Badge Grid */}
        <div className="tools-section max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Wrench className="w-3 h-3" />
                  ~/tools
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-orange-400">Tools</span> & Workflows
              </h3>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techStack.tools.map((tool, index) => (
              <div key={index} className="tool-card bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-lg p-6 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="text-4xl transform group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-mono font-bold text-white text-lg">{tool.name}</h4>
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
