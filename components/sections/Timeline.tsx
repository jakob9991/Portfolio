
'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Code, Rocket, BrainCircuit, Terminal, HeartHandshake, GitCommit, Clock } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { useMobile } from "@/hooks/useMobile";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "2025 - Heute",
    title: "AI & Automation",
    subtitle: "Workflows & Prozessoptimierung",
    description: "Aktuell spezialisiere ich mich auf KI-gestützte Automatisierung mit n8n und entwickle Webprojekte wie Cenra.ai. Der Fokus liegt auf praktischen Lösungen für echte Business-Probleme.",
    icon: <BrainCircuit className="w-6 h-6 text-white" />,
    color: "purple",
    terminalCommand: "git log --oneline --since='2025'",
    processStatus: "RUNNING"
  },
  {
    year: "2023 - Heute",
    title: "B.Sc. Medieninformatik",
    subtitle: "Frankfurt University of Applied Sciences",
    description: "Studium mit Schwerpunkt Web & Mobile Development. Parallel dazu Mitgründer von SJP Connect und Lead Dev für die Vibon App. Hier versuche ich, Uni-Wissen direkt in echten Projekten anzuwenden.",
    icon: <Code className="w-6 h-6 text-white" />,
    color: "cyan",
    terminalCommand: "cat ~/education/medieninformatik.log",
    processStatus: "ACTIVE"
  },
  {
    year: "2019 - 2023",
    title: "B.A. Soziale Arbeit",
    subtitle: "Abschluss mit 1.8",
    description: "Mag auf den ersten Blick ungewöhnlich wirken, aber genau hier habe ich gelernt, wirklich nutzerzentriert zu denken. Psychologie, Kommunikation und Empathie sind das Fundament für Software, die Menschen gerne nutzen – nicht nur technisch funktioniert.",
    icon: <HeartHandshake className="w-6 h-6 text-white" />,
    color: "rose",
    terminalCommand: "ls ~/skills/soft_skills/",
    processStatus: "COMPLETED"
  },
  {
    year: "2018 - 2021",
    title: "Der Anfang",
    subtitle: "E-Commerce & erste Code-Zeilen",
    description: "Hier hat alles angefangen: Erste Gehversuche mit Python (hauptsächlich kleine Games) und parallel ein eigenes Amazon FBA Business aufgebaut. Hat mir wirtschaftliches Denken und den Mut zum Ausprobieren gegeben.",
    icon: <Rocket className="w-6 h-6 text-white" />,
    color: "orange",
    terminalCommand: "git show --stat origin/master",
    processStatus: "ARCHIVED"
  }
];

const colorMap: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  purple: { text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10", glow: "shadow-[0_0_25px_rgba(168,85,247,0.3)]" },
  cyan: { text: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10", glow: "shadow-[0_0_25px_rgba(6,182,212,0.3)]" },
  rose: { text: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10", glow: "shadow-[0_0_25px_rgba(244,63,94,0.3)]" },
  orange: { text: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10", glow: "shadow-[0_0_25px_rgba(249,115,22,0.3)]" }
};

export const Timeline = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const isInView = useInView(containerRef, { threshold: 0.1 });

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const ctx = gsap.context(() => {

      // 1. Line Drawing Animation - ONLY on desktop
      if (lineRef.current && !isMobile) {
        gsap.fromTo(lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            }
          }
        );
      } else if (lineRef.current && isMobile) {
        // On mobile: just show the line without animation
        gsap.set(lineRef.current, { height: "100%" });
      }

      // 2. Card Animations - Simplified on mobile
      const cards = gsap.utils.toArray(".timeline-card");
      cards.forEach((card: any, i) => {
        if (isMobile) {
          // Mobile: Simple fade in only
          gsap.fromTo(card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
              }
            }
          );
        } else {
          // Desktop: Full animation
          const isLeft = i % 2 === 0;
          gsap.fromTo(card,
            {
              opacity: 0,
              x: isLeft ? -80 : 80,
              scale: 0.9,
              rotateY: isLeft ? -15 : 15
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotateY: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // 3. Dot Animations - Simplified on mobile
      gsap.utils.toArray(".timeline-dot").forEach((dot: any, i) => {
        if (isMobile) {
          // Mobile: Just fade in
          gsap.fromTo(dot,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.4,
              scrollTrigger: {
                trigger: dot,
                start: "top 80%",
              }
            }
          );
        } else {
          // Desktop: Full animation
          gsap.fromTo(dot,
            { scale: 0, opacity: 0, rotation: -180 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: dot,
                start: "top 70%",
              }
            }
          );
        }
      });

      // 4. Terminal Header Animations - SKIP on mobile
      if (!isMobile) {
        gsap.utils.toArray(".terminal-header").forEach((header: any) => {
          gsap.from(header, {
            opacity: 0,
            y: -10,
            duration: 0.4,
            scrollTrigger: {
              trigger: header,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        });
      }

      // 5. Content Stagger - SKIP on mobile
      if (!isMobile) {
        gsap.utils.toArray(".timeline-content").forEach((content: any) => {
          gsap.from(content.children, {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.3,
            scrollTrigger: {
              trigger: content,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isInView, isMobile]);

  return (
    <section ref={containerRef} id="career" className="py-32 relative overflow-hidden bg-[#0a0d14] text-slate-200">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Ambient Glows - Reduced on mobile */}
      <div className="hidden md:block absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="hidden md:block absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#0f1219]/60 backdrop-blur-sm md:backdrop-blur-xl border border-white/5 mb-6">
            <GitCommit className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-sm text-gray-400">git log --all --graph</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-mono text-sm">
            <span className="text-green-400">❯</span> Vom unternehmerischen Start über soziale Kompetenz zur technischen Expertise.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[3px] bg-[#151921] md:-translate-x-1/2 rounded-full overflow-hidden">
            <div ref={lineRef} className="w-full bg-gradient-to-b from-purple-500 via-cyan-500 via-rose-500 to-orange-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] rounded-full"></div>
          </div>

          <div className="space-y-16 md:space-y-32">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const colors = colorMap[item.color];

              return (
                <div key={index} className={`relative flex items-center md:justify-between ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                  {/* Timeline Dot (Center) */}
                  <div className={`timeline-dot absolute left-[20px] md:left-1/2 w-12 h-12 -translate-x-1/2 flex items-center justify-center rounded-full z-30 bg-[#0a0d14] border-2 ${colors.border} md:${colors.glow}`}>
                     <div className={`w-4 h-4 rounded-full ${colors.bg} ${colors.border} border-2 md:animate-pulse`}></div>
                  </div>

                  {/* Terminal Card */}
                  <div className="timeline-card pl-16 md:pl-0 w-full md:w-[47%] relative z-20">
                     <div className="bg-[#0f1219]/60 backdrop-blur-sm md:backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden group hover:border-white/10 transition-all">

                        {/* Glow Effect on Hover - Desktop only */}
                        <div className={`hidden md:block absolute -inset-[1px] bg-gradient-to-br ${colors.border.replace('border-', 'from-').replace('/30', '/20')} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none`}></div>

                        {/* Terminal Header */}
                        <TerminalHeader
                          className="terminal-header"
                          title={
                            <>
                              <Terminal className="w-3 h-3" />
                              jakob@timeline ~ {item.year.replace(' ', '_')}
                            </>
                          }
                        />

                        {/* Terminal Content */}
                        <div className="timeline-content p-6 font-mono">

                          {/* Command Line */}
                          <div className="flex items-center gap-2 mb-4 text-xs">
                            <span className="text-green-400">❯</span>
                            <span className={colors.text}>{item.terminalCommand}</span>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-md text-xs font-bold ${colors.bg} border ${colors.border} ${colors.text} flex items-center gap-2`}>
                              <Clock className="w-3 h-3" />
                              {item.year}
                            </span>
                            <div className={`px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400`}>
                              {item.processStatus}
                            </div>
                          </div>

                          {/* Divider */}
                          <div className={`h-[1px] ${colors.bg} mb-4`}></div>

                          {/* Icon + Title */}
                          <div className="flex items-start gap-4 mb-3">
                            <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border} ${colors.text} mt-1`}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                              <p className={`text-xs ${colors.text} font-semibold`}>
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Description as Terminal Output */}
                          <div className="pl-4 border-l-2 border-white/10 mt-4">
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Footer Metadata */}
                          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`}></div>
                              milestone
                            </span>
                            <span>•</span>
                            <span className="font-mono">
                              {index === 0 ? 'HEAD' : `HEAD~${index}`}
                            </span>
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
    </section>
  );
};
