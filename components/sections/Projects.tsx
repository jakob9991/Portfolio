'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Code2, GraduationCap, Layout, Lock, Smartphone, Terminal, Workflow, Tv, Bot, Gamepad2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- 1. FEATURED (Commercial & Startups) ---
const featuredProjects = [
  {
    id: "01",
    title: "Cenra.ai",
    subtitle: "AI Corporate Website",
    description: "Entwicklung einer Website für DSGVO-konforme KI-Sprachmodelle. Fokus auf modernes Frontend-Design, SEO-Optimierung und Responsive Architektur.",
    stats: [
      { label: "Role", value: "Fullstack Dev" },
      { label: "Year", value: "2025" },
      { label: "Stack", value: "React / TS" },
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
    links: { demo: "https://ai.madebyjakob.de", repo: "private" },
    color: "from-blue-500 to-indigo-600",
    type: "web",
    image: "/images/cenraAI.png" 
  },
  {
    id: "02",
    title: "Vibon App",
    subtitle: "Social Interaction Platform",
    description: "Eigenständige Entwicklung einer Cross-Platform Mobile App für Echtzeit-Interaktionen und Event-Management. Implementierung komplexer Location-Based Features.",
    stats: [
      { label: "Role", value: "Lead Developer" },
      { label: "Status", value: "Released" },
      { label: "Platform", value: "iOS / Android" },
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
    subtitle: "Business Process Logic",
    description: "Design und Implementierung komplexer Automatisierungsstrecken für Geschäftskunden. Integration von RAG-Datenbanken und API-Schnittstellen zur Prozessoptimierung.",
    stats: [
      { label: "Focus", value: "Backend Logic" },
      { label: "Tech", value: "Low-Code / API" },
      { label: "Client", value: "B2B" },
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
    role: "Frontend & Architecture",
    description: "Eine moderne Webanwendung zur interaktiven Darstellung und Filterung von universitären Modulhandbüchern. Löst das Problem unübersichtlicher PDF-Dokumente durch eine durchsuchbare Datenbank-UI.",
    tags: ["JavaScript", "GSAP", "TailwindCSS", "Git", "Scrum"],
    year: "2024",
    icon: <Layout className="w-6 h-6" />,
    link: "https://hosting.iem.thm.de/mpm-projects/mpm2025-1", 
    hasDemo: true
  },
  {
    title: "Java Snake",
    role: "Desktop Application",
    description: "Objektorientierte Neuinterpretation des Klassikers 'Snake'. Fokus auf saubere OOP-Prinzipien, Event-Handling und Performance-Optimierung in einer Desktop-Umgebung.",
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
    category: "Assistive Technology",
    description: "Automatisierte Steuerung für Nutzer mit kognitiven Einschränkungen. Brücke zwischen Smart-Home und Accessibility.",
    tech: ["JavaScript", "ADB Shell", "Network"],
    icon: <Tv className="w-8 h-8 text-purple-400" />,
    visual: "code",
    codeSnippet: "> adb connect 192.168.1.5\n> adb shell input keyevent 26\n> Starting app: Netflix..."
  },
  {
    title: "Data Mining Bot",
    category: "Web Scraping",
    description: "Intelligente Crawler für strukturierte Datenerfassung und Prozessautomatisierung via Headless Browsers.",
    tech: ["Python", "Selenium", "Pandas", "Beautiful Soup"],
    icon: <Bot className="w-8 h-8 text-green-400" />,
    visual: "terminal",
    codeSnippet: "def scrape_data(url):\n  driver.get(url)\n  elements = driver.find_all()\n  return process(elements)"
  },
  {
    title: "Python Arcade",
    category: "Game Dev",
    description: "Entwicklung diverser Spielprototypen (Runner, Sudoku) zur Vertiefung von Algorithmen-Logik.",
    tech: ["Python", "Pygame", "Logic"],
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General Stagger for sections
      gsap.fromTo(".section-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Featured Cards
      gsap.utils.toArray(".project-card-featured").forEach((card: any) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          }
        );
      });

      // Lab Cards
      gsap.fromTo(".lab-card",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".lab-grid",
            start: "top 85%",
          }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-32 relative bg-transparent">
      <div className="container mx-auto px-4">

        {/* Main Heading */}
        <div className="section-header text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Selected <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ein tieferer Einblick in meine kommerziellen Projekte, akademischen Arbeiten und technischen Experimente.
          </p>
        </div>

        {/* --- 1. FEATURED PROJECTS --- */}
        <div className="space-y-32 mb-40">
          {featuredProjects.map((project: any, index) => (
            <div
              key={index}
              className={`project-card-featured flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center`}
            >
              {/* Visual Side */}
              <div className="w-full lg:w-1/2 relative group perspective-1000">
                <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-30 transition duration-700`}></div>
                <div className="relative rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] group-hover:-rotate-1">

                  {/* Window Header */}
                  <div className="h-8 bg-[#1a1a1a] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    <div className="ml-auto text-xs text-gray-600 font-mono hidden sm:block">
                      {project.type === 'web' ? 'chrome://cenra.ai' : project.type === 'mobile' ? 'iPhone 15 Pro - Simulator' : 'n8n Workflow Editor'}
                    </div>
                  </div>

                  {/* Content (Image, Gallery, or CSS Mockup) */}
                  <div className={`aspect-video w-full bg-gradient-to-br ${project.color} bg-opacity-10 flex items-center justify-center relative overflow-hidden bg-[#111]`}>
                    
                    {/* Background Grid Pattern (Always visible as base) */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                    {/* CASE 1: MULTIPLE MOBILE IMAGES (Gallery) */}
                    {project.images ? (
                        <div className="flex justify-center items-center gap-2 sm:gap-4 h-full w-full p-4 sm:p-8">
                            {project.images.map((img: string, i: number) => (
                                <div key={i} className={`relative h-full w-auto aspect-[9/19.5] rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden border-[3px] sm:border-[6px] border-[#1a1a1a] shadow-xl bg-black transform transition-all duration-500 group-hover:scale-105 ${i === 1 ? 'z-10 scale-105' : 'scale-95 opacity-80'}`}>
                                    {/* Phone Bezel/Mockup Styling */}
                                    <img 
                                        src={img} 
                                        alt={`App Screen ${i}`} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                           e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : project.image ? (
                       // CASE 2: SINGLE IMAGE
                       <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to showing the icon if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                       />
                    ) : null}

                    {/* CASE 3: FALLBACK ICON / MOCKUP (Visible if no image provided OR image error) */}
                    <div className={`transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 ${project.image || project.images ? 'hidden' : ''}`}>
                      {project.type === 'mobile' ? <Smartphone className="w-20 h-20 text-white/40" /> :
                        project.type === 'automation' ? <Workflow className="w-20 h-20 text-white/40" /> :
                          <Layout className="w-20 h-20 text-white/40" />}
                    </div>

                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/70">
                      {project.type}
                    </span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
                  <p className={`text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r ${project.color}`}>
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>

                <div className="grid grid-cols-3 gap-6 py-4 border-y border-white/5">
                  {project.stats.map((stat: any, i: number) => (
                    <div key={i}>
                      <p className="text-xs text-gray-500 uppercase font-mono mb-1">{stat.label}</p>
                      <p className="text-sm font-semibold text-gray-200">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {project.links.repo === 'private' ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 opacity-60 cursor-not-allowed">
                      <Lock className="w-4 h-4" /> <span className="text-sm">Private Repo</span>
                    </div>
                  ) : (
                    <a href="#" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
                      <Github className="w-5 h-5" /> <span className="text-sm font-medium">Source Code</span>
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* --- 2. ACADEMIC EXCELLENCE --- */}
        <div className="mb-32">
          <div className="section-header flex items-end justify-between mb-12 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-3xl font-bold flex items-center gap-3 text-white">
                <GraduationCap className="text-blue-500 w-8 h-8" />
                Academic Projects
              </h3>
              <p className="text-muted-foreground mt-2">Hochschulprojekte mit Fokus auf Software-Architektur und Informatik-Grundlagen.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {academicProjects.map((project, index) => (
              <div key={index} className="group relative bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-colors duration-300">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <span className="font-mono text-xs text-gray-500 border border-white/10 px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-blue-400 text-sm font-mono mb-4">{project.role}</p>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.hasDemo && (
                    <a href={project.link} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-400 transition-colors">
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* --- 3. THE LAB (Technical Experiments) --- */}
        <div>
          <div className="section-header flex items-end justify-between mb-12 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-3xl font-bold flex items-center gap-3 text-white">
                <Terminal className="text-green-500 w-8 h-8" />
                The Lab
              </h3>
              <p className="text-muted-foreground mt-2">Engineering, Hardware-Hacks & Automatisierungs-Skripte.</p>
            </div>
          </div>

          <div className="lab-grid grid md:grid-cols-3 gap-6">
            {labProjects.map((project, index) => (
              <div key={index} className="lab-card bg-[#050505] rounded-xl border border-white/10 overflow-hidden hover:border-green-500/20 transition-all duration-300 group">

                {/* Visual Header (CSS Mockups) */}
                <div className="h-40 bg-[#0a0a0a] border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                  {/* Background Grid */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]"></div>

                  {/* Content */}
                  {project.visual === 'code' && (
                    <div className="w-3/4 bg-[#111] rounded-lg border border-white/10 p-3 shadow-2xl transform group-hover:-translate-y-1 transition-transform">
                      <div className="flex gap-1.5 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-1/3 bg-purple-500/30 rounded"></div>
                        <div className="h-1.5 w-2/3 bg-gray-700 rounded"></div>
                        <div className="h-1.5 w-1/2 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  )}
                  {project.visual === 'terminal' && (
                    <div className="w-3/4 bg-black rounded-lg border border-green-500/20 p-3 shadow-2xl font-mono text-[8px] text-green-500/70 leading-tight">
                      <span className="text-green-400">$</span> run scraper.py<br />
                      <span className="opacity-50">Connecting...</span><br />
                      <span className="opacity-70">Found 142 items</span><br />
                      <span className="animate-pulse">_</span>
                    </div>
                  )}
                  {project.visual === 'grid' && (
                    <div className="grid grid-cols-6 gap-1 p-4">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-sm ${i === 4 || i === 5 ? 'bg-blue-500' : 'bg-white/5'}`}></div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-green-400 uppercase tracking-widest">{project.category}</span>
                    {project.icon}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                  {project.codeSnippet && (
                    <div className="bg-[#111] p-3 rounded border border-white/5 font-mono text-xs text-gray-500 overflow-hidden">
                      {project.codeSnippet.split('\n').map((line, i) => (
                        <div key={i} className="truncate">{line}</div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] text-gray-500 border border-white/5 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
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