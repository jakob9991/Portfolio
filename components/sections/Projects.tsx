'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Code2, GraduationCap, Layout, Lock, Smartphone, Terminal, Workflow, Tv, Bot, Gamepad2 } from "lucide-react";
import { TerminalHeader, SectionHeader } from "@/components/ui/terminal";
import { useMobile } from "@/hooks/useMobile";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

// --- 1. FEATURED (Commercial & Startups) ---
const featuredProjects = [
  {
    id: "01",
    title: "Cenra.ai",
    subtitle: "KI-Corporate-Website",
    description: "Entwicklung einer Website für DSGVO-konforme KI-Sprachmodelle. Fokus auf modernes Frontend-Design, SEO-Optimierung und Responsive Architektur.",
    stats: [
      { label: "Rolle", value: "Full-Stack Entwickler" },
      { label: "Jahr", value: "2025" },
      { label: "Stack", value: "React / TS" },
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
    links: { demo: "https://www.cenra.de", repo: "private" },
    color: "from-blue-500 to-indigo-600",
    type: "web",
    image: "/images/cenra.png" 
  },
  {
    id: "02",
    title: "Vibon App",
    subtitle: "Interaktionsplattform",
    description: "Eigenständige Entwicklung einer Cross-Platform-App für Echtzeit-Interaktionen und Event-Management. Implementierung komplexer standortbasierter Features.",
    stats: [
      { label: "Rolle", value: "Lead Developer" },
      { label: "Status", value: "Veröffentlicht" },
      { label: "Plattform", value: "iOS / Android" },
    ],
    tags: ["React Native", "Firebase", "Google Maps API", "JavaScript",],
    links: { repo: "private" },
    color: "from-emerald-400 to-cyan-500",
    type: "mobile",

    images: ["/images/vibon/image2.jpeg", "/images/vibon/image1.jpeg", "/images/vibon/image3.jpeg"]
  },
  {
    id: "03",
    title: "AI Automation",
    subtitle: "Business-Prozesslogik",
    description: "Design und Implementierung komplexer Automatisierungsstrecken für Geschäftskunden. Integration von RAG-Datenbanken und API-Schnittstellen zur Prozessoptimierung.",
    stats: [
      { label: "Fokus", value: "Backend-Logik" },
      { label: "Tech", value: "Low-Code / API" },
      { label: "Kunde", value: "B2B" },
    ],
    tags: ["n8n", "JavaScript", "Webhooks", "OpenAI API", "RAG"],
    links: { repo: "private" },
    color: "from-orange-400 to-red-500",
    type: "automation",
    image: "/images/workflow.png"
  }
];

// --- 2. ACADEMIC (University) ---
const academicProjects = [
  {
    title: "Modulhandbuch Webapp",
    role: "Frontend & Architektur",
    description: "Gemeinsam mit meiner Gruppe haben wir die neue Prüfungsordnung des Medieninformatik-Studiengangs grafisch aufbereitet. Statt durch endlose PDFs zu scrollen, können Studierende nun interaktiv durch Module navigieren und filtern.",
    tags: ["JavaScript", "GSAP", "TailwindCSS", "Git", "Scrum"],
    year: "2024",
    icon: <Layout className="w-6 h-6" />,
    link: "https://hosting.iem.thm.de/mpm-projects/mpm2025-1", 
    hasDemo: true
  },
  {
    title: "Java Snake",
    role: "Desktop-App",
    description: "Mein erstes Java-Projekt während der Einführung in die Programmierung. Der Klassiker Snake als Desktop-Anwendung – simpel, aber eine gute Übung für OOP-Grundlagen und Event-Handling.",
    tags: ["Java", "OOP Patterns"],
    year: "2023",
    icon: <Gamepad2 className="w-6 h-6" />,
    link: "https://github.com/yourusername/snake",
    hasDemo: false
  }
];

// --- 3. THE LAB (Scripts, Hardware, Automation) ---
const labProjects = [
  {
    title: "FireTV Automation",
    category: "Assistive Technologien",
    description: "Automatisierte Steuerung für Nutzer mit kognitiven Einschränkungen. Brücke zwischen Smart-Home und Barrierefreiheit.",
    tech: ["JavaScript", "ADB Shell", "Netzwerk"],
    icon: <Tv className="w-8 h-8 text-purple-400" />,
    visual: "code",
    codeSnippet: "> adb connect 192.168.1.5\n> adb shell input keyevent 26\n> Starting app: Netflix..."
  },
  {
    title: "Data Mining Bot",
    category: "Web-Scraping",
    description: "Intelligente Crawler für strukturierte Datenerfassung und Prozessautomatisierung via Headless Browsern.",
    tech: ["Python", "Selenium", "Pandas", "Beautiful Soup"],
    icon: <Bot className="w-8 h-8 text-green-400" />,
    visual: "terminal",
    codeSnippet: "def scrape_data(url):\n  driver.get(url)\n  elements = driver.find_all()\n  return process(elements)"
  },
  {
    title: "Python Arcade",
    category: "Spieleentwicklung",
    description: "Entwicklung diverser Spielprototypen (Runner, Sudoku) zur Vertiefung von Algorithmen-Logik.",
    tech: ["Python", "Pygame", "Logik"],
    icon: <Code2 className="w-8 h-8 text-blue-400" />,
    visual: "grid",
    codeSnippet: `class Player(arcade.Sprite):
    def update(self):
        self.center_x += self.change_x
        if self.collides_with_list():
            self.game_over()`
  }
];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      // 1. Main Section Header - Simplified on mobile
      gsap.fromTo(".section-header",
        isMobile ? { y: 30, opacity: 0 } : { y: 50, opacity: 0, scale: 0.95, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: isMobile ? 0.6 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 85%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // 2. Featured Projects - Git Commit Cards mit Stagger
      gsap.utils.toArray(".project-card-featured").forEach((card: any, index: number) => {
        // Terminal Header Animation - Simplified on mobile
        gsap.fromTo(card.querySelector(".git-commit-header"),
          { opacity: 0, x: isMobile ? -10 : -20 },
          {
            opacity: 1,
            x: 0,
            duration: isMobile ? 0.4 : 0.6,
            delay: isMobile ? 0.1 : 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play reset play reset",
            }
          }
        );

        // Commit Info (Left Side)
        gsap.fromTo(card.querySelector(".commit-info"),
          { opacity: 0, x: isMobile ? -15 : -30 },
          {
            opacity: 1,
            x: 0,
            duration: isMobile ? 0.5 : 0.7,
            delay: isMobile ? 0.15 : 0.3,
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play reset play reset",
            }
          }
        );

        // Visual Preview (Right Side) - No rotation on mobile
        gsap.fromTo(card.querySelector(".visual-preview"),
          isMobile ? { opacity: 0, scale: 0.95 } : { opacity: 0, scale: 0.9, rotateY: 10 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: isMobile ? 0.5 : 0.8,
            delay: isMobile ? 0.2 : 0.4,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play reset play reset",
            }
          }
        );

        // Tech Tags Stagger - Reduced on mobile
        gsap.fromTo(card.querySelectorAll(".tech-tag"),
          { opacity: 0, scale: 0.8, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: isMobile ? 0.3 : 0.4,
            stagger: isMobile ? 0.03 : 0.05,
            delay: isMobile ? 0.25 : 0.5,
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              toggleActions: "play reset play reset",
            }
          }
        );
      });

      // 3. Academic Section Header - Simplified on mobile
      gsap.fromTo(".academic-header",
        isMobile ? { y: 30, opacity: 0 } : { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".academic-header",
            start: "top 85%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // 4. Academic Cards - Lab Notebook Style
      gsap.utils.toArray(".academic-card").forEach((card: any, index: number) => {
        gsap.fromTo(card,
          isMobile ? { y: 30, opacity: 0 } : { y: 60, opacity: 0, rotateX: -10, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: isMobile ? 0.5 : 0.7,
            delay: isMobile ? index * 0.1 : index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play reset play reset",
            }
          }
        );

        // Icon Animation - No rotation on mobile
        gsap.fromTo(card.querySelector(".academic-icon"),
          isMobile ? { scale: 0, opacity: 0 } : { scale: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: isMobile ? 0.4 : 0.6,
            delay: isMobile ? index * 0.1 + 0.15 : index * 0.2 + 0.3,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play reset play reset",
            }
          }
        );
      });

      // 5. Lab Section Header - Simplified on mobile
      gsap.fromTo(".lab-header",
        isMobile ? { y: 30, opacity: 0 } : { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".lab-header",
            start: "top 85%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // 6. Process Monitor Table - Simplified on mobile
      gsap.fromTo(".process-monitor",
        isMobile ? { y: 30, opacity: 0 } : { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-monitor",
            start: "top 85%",
            toggleActions: "play reset play reset",
          }
        }
      );

      // 7. Lab Cards - Process Entries mit Stagger
      gsap.utils.toArray(".lab-card").forEach((card: any, index: number) => {
        // Process Icon pulsiert beim Erscheinen
        gsap.fromTo(card.querySelector(".process-icon"),
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: isMobile ? 0.4 : 0.6,
            delay: isMobile ? index * 0.08 : index * 0.15,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play reset play reset",
            }
          }
        );

        // Status Badge
        gsap.fromTo(card.querySelector(".status-badge"),
          {
            opacity: 0,
            x: isMobile ? -5 : -10
          },
          {
            opacity: 1,
            x: 0,
            duration: isMobile ? 0.3 : 0.5,
            delay: isMobile ? index * 0.08 + 0.1 : index * 0.15 + 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play reset play reset",
            }
          }
        );

        // Process Details
        gsap.fromTo(card.querySelector(".process-details"),
          {
            opacity: 0,
            x: isMobile ? 10 : 20
          },
          {
            opacity: 1,
            x: 0,
            duration: isMobile ? 0.4 : 0.6,
            delay: isMobile ? index * 0.08 + 0.15 : index * 0.15 + 0.3,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play reset play reset",
            }
          }
        );

        // Code Output Terminal
        const codeOutput = card.querySelector(".code-output");
        if (codeOutput) {
          gsap.fromTo(codeOutput,
            isMobile ? { opacity: 0, y: 5 } : { opacity: 0, y: 10, scaleY: 0.95 },
            {
              opacity: 1,
              y: 0,
              scaleY: 1,
              duration: isMobile ? 0.3 : 0.5,
              delay: isMobile ? index * 0.08 + 0.2 : index * 0.15 + 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play reset play reset",
              }
            }
          );

          // Code Lines einzeln erscheinen lassen - Skip on mobile for performance
          if (!isMobile) {
            gsap.fromTo(codeOutput.querySelectorAll(".code-line"),
              { opacity: 0, x: -10 },
              {
                opacity: 1,
                x: 0,
                duration: 0.3,
                stagger: 0.05,
                delay: index * 0.15 + 0.5,
                scrollTrigger: {
                  trigger: card,
                  start: "top 75%",
                  toggleActions: "play reset play reset",
                }
              }
            );
          } else {
            // On mobile, just fade in all code lines together
            gsap.fromTo(codeOutput.querySelectorAll(".code-line"),
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.3,
                delay: index * 0.08 + 0.25,
                scrollTrigger: {
                  trigger: card,
                  start: "top 75%",
                  toggleActions: "play reset play reset",
                }
              }
            );
          }
        }

        // Dependencies Tags
        gsap.fromTo(card.querySelectorAll(".dependency-tag"),
          { opacity: 0, scale: 0.8, y: 5 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: isMobile ? 0.2 : 0.3,
            stagger: isMobile ? 0.03 : 0.05,
            delay: isMobile ? index * 0.08 + 0.3 : index * 0.15 + 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play reset play reset",
            }
          }
        );
      });

      // 8. Footer Stats Animation - Simplified on mobile
      gsap.fromTo(".process-footer",
        {
          opacity: 0,
          y: isMobile ? 10 : 20
        },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.4 : 0.6,
          scrollTrigger: {
            trigger: ".process-footer",
            start: "top 90%",
            toggleActions: "play reset play reset",
          }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="projects" className="py-32 relative bg-[#0a0d14] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Main Heading - Terminal Style */}
        <div className="section-header max-w-4xl mx-auto mb-20">
          <SectionHeader
            terminalTitle={
              <>
                <Terminal className="w-3 h-3" />
                ~/projects
              </>
            }
            title={<>Ausgewählte <span className="text-sky-400">Projekte</span></>}
          />
        </div>

        {/* --- 1. FEATURED PROJECTS - Git Commit Style --- */}
        <div className="space-y-8 mb-32">
          {featuredProjects.map((project: any, index) => (
            <div
              key={index}
              className="project-card-featured bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden group hover:border-sky-500/30 transition-all duration-300"
            >
              {/* Project Header */}
              <div className="git-commit-header h-12 bg-[#151921] border-b border-white/5 flex items-center px-6 justify-between">
                <div className="flex items-center gap-3 font-mono text-xs text-gray-500">
                  <Terminal className="w-3 h-3" />
                  <span className="text-gray-400">{project.title.toLowerCase().replace(/[\s.]/g, '-')}</span>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${project.color} text-white`}>
                  {project.type === 'web' ? 'Web' : project.type === 'mobile' ? 'Mobile' : project.type === 'automation' ? 'Automation' : project.type}
                </span>
              </div>

              {/* Commit Content */}
              <div className="grid lg:grid-cols-2 gap-8 p-8">

                {/* Left: Commit Info */}
                <div className="commit-info font-mono space-y-6">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className={`text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r ${project.color} mb-4`}>
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    {project.stats.map((stat: any, i: number) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-gray-500">{stat.label}:</span>
                        <span className="text-gray-300">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="border-l-2 border-sky-500/30 pl-4 text-gray-400 leading-relaxed text-sm">
                    {project.description}
                  </div>

                  {/* Tech Stack Tags */}
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="tech-tag px-2 py-1 text-xs rounded bg-white/5 border border-white/10 text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                    {project.links.repo === 'private' ? (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 opacity-60 cursor-not-allowed text-sm">
                        <Lock className="w-4 h-4" />
                        <span>Privates Repo</span>
                      </div>
                    ) : (
                      <a href={project.links.repo} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-sky-500/30 text-white hover:text-sky-400 transition-all text-sm">
                        <Github className="w-4 h-4" />
                        <span>Code ansehen</span>
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 transition-all text-sm font-semibold">
                        <ExternalLink className="w-4 h-4" />
                        Live-Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Visual Preview */}
                <div className="visual-preview relative group/preview">
                  {/* Glow Effect */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-700`}></div>

                  {/* Preview Container */}
                  <div className="relative bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden">
                    {/* Window Controls */}
                    <TerminalHeader
                      dots="small"
                      className="!h-8"
                      title={
                        <span className="text-[10px] text-gray-600 font-mono hidden sm:block">
                          {project.type === 'web' ? 'Browser-Vorschau' : project.type === 'mobile' ? 'Mobile-Simulator' : 'Workflow-Editor'}
                        </span>
                      }
                    />

                    {/* Visual Content */}
                    <div className={`aspect-video w-full bg-gradient-to-br ${project.color} bg-opacity-10 flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]`}>
                      {/* Background Grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                      {/* Images */}
                      {project.images ? (
                        <div className="flex justify-center items-center gap-2 sm:gap-4 h-full w-full p-4 sm:p-8">
                          {project.images.map((img: string, i: number) => (
                            <div key={i} className={`relative h-full w-auto aspect-[9/19.5] rounded-xl overflow-hidden border-4 border-[#1a1a1a] shadow-2xl bg-black transform transition-all duration-500 group-hover/preview:scale-105 ${i === 1 ? 'z-10 scale-105' : 'scale-95 opacity-80'}`}>
                              <img
                                src={img}
                                alt={`${project.title} Screen ${i}`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}

                      {/* Fallback Icon */}
                      <div className={`transform transition-transform duration-700 group-hover/preview:scale-110 ${project.image || project.images ? 'hidden' : ''}`}>
                        {project.type === 'mobile' ? <Smartphone className="w-20 h-20 text-white/40" /> :
                          project.type === 'automation' ? <Workflow className="w-20 h-20 text-white/40" /> :
                            <Layout className="w-20 h-20 text-white/40" />}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>


        {/* --- 2. ACADEMIC PROJECTS - Lab Notebook Style --- */}
        <div className="mb-32">
          {/* Section Header */}
          <div className="academic-header bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <GraduationCap className="w-3 h-3" />
                  ~/academic
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-purple-400">Uni</span>Projekte
              </h3>
            </div>
          </div>

          {/* Academic Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {academicProjects.map((project, index) => (
              <div key={index} className="academic-card bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden group hover:border-purple-500/30 transition-all duration-300">

                {/* Header Bar */}
                <TerminalHeader
                  dots="small"
                  title={
                    <span className="font-mono text-[10px] text-purple-400">
                      {project.year}
                    </span>
                  }
                />

                {/* Content */}
                <div className="p-6 font-mono">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="academic-icon p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-1">{project.title}</h4>
                      <p className="text-purple-400 text-xs">{project.role}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-l-2 border-purple-500/30 pl-4 mb-4 text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-400 bg-white/5 border border-white/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Link */}
                  {project.hasDemo && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors border-b border-purple-500/30 pb-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Projekt ansehen</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* --- 3. THE LAB - System Process Monitor Style --- */}
        <div>
          {/* Section Header */}
          <div className="lab-header bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Terminal className="w-3 h-3" />
                  ~/lab
                </>
              }
            />
            <div className="p-6 font-mono">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-green-400">Weitere</span> Projekte
              </h3>
            </div>
          </div>

          {/* Project Cards */}
          <div className="process-monitor grid gap-6">
            {labProjects.map((project, index) => (
              <div
                key={index}
                className="lab-card bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden hover:border-green-500/30 transition-all duration-300 group"
              >
                <TerminalHeader
                  dots="small"
                  title={<span className="text-[10px] text-gray-500">{project.category}</span>}
                />

                <div className="p-6">
                  <div className="grid md:grid-cols-[auto_1fr] gap-6">

                    {/* Left: Icon */}
                    <div className="flex flex-col items-center">
                      <div className="process-icon relative p-4 bg-green-500/10 rounded-xl border border-green-500/20 group-hover:border-green-500/40 transition-all">
                        {project.icon}
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="process-details font-mono space-y-4">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Code Snippet */}
                      {project.codeSnippet && (
                        <div className="code-output bg-[#0a0a0a] rounded-lg border border-white/5 p-4 group-hover:border-green-500/20 transition-colors">
                          <div className="font-mono text-xs space-y-1">
                            {project.codeSnippet.split('\n').map((line, i) => (
                              <div key={i} className="code-line flex gap-2">
                                <span className="text-gray-700 select-none">{i + 1}</span>
                                <span className="text-gray-500">{line}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="dependency-tag text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
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
