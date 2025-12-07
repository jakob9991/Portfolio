
'use client'
import { useEffect, useRef } from "react";
import profilePhoto from "../../public/images/profileImage.jpg"
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Download } from "lucide-react";
import { TerminalHeader, TerminalPrompt, GlassCard } from "@/components/ui/terminal";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);
export const About = () => {

    const sectionRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(sectionRef, { threshold: 0.1 });

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Container fade-in
            gsap.from(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play reset play reset",
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power3.out",
            });

            // Image animation
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                    toggleActions: "play reset play reset",
                },
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                delay: 0.2,
                ease: "power3.out",
            });

            // Text animation
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    toggleActions: "play reset play reset",
                },
                opacity: 0,
                x: 30,
                duration: 0.6,
                delay: 0.3,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 bg-[#0a0d14] text-slate-200"
        >
           

            {/* Diagonal Grid Pattern - anders als Hero */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(45deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

            {/* --- MAIN CONTENT --- */}
            <div
                ref={containerRef}
                className="container mx-auto px-4 relative z-10"
            >
                <div className="max-w-6xl mx-auto">

                    {/* Split Card Design - Links: Bild, Rechts: Info */}
                    <div className="grid md:grid-cols-[400px_1fr] gap-6 items-start">

                        {/* LEFT: Profile Card mit Terminal-Window */}
                        <div ref={imageRef} className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden group">
                            {/* Border Glow */}
                            <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>

                            {/* Terminal Header */}
                            <TerminalHeader
                                title={
                                    <>
                                        <Terminal className="w-3 h-3" />
                                        profile.png
                                    </>
                                }
                            />

                            {/* Image */}
                            <div className="relative aspect-square">
                                <Image
                                    src={profilePhoto}
                                    alt="Jakob Dickhardt"
                                    fill
                                    className="object-cover"
                                    sizes="400px"
                                    priority
                                />
                                {/* Scan-line Effekt beim Hover */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(14,165,233,0.03)_50%)] bg-[size:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                {/* Bottom Gradient */}
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f1219] via-[#0f1219]/50 to-transparent"></div>
                            </div>

                            {/* Status Footer */}
                            <div className="p-4 bg-[#0a0d14]/80 border-t border-white/5 font-mono text-xs">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400">STATUS:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-green-400 font-bold">ONLINE</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-gray-500">
                                    <span>LOCATION:</span>
                                    <span className="text-cyan-400">Frankfurt, DE</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Info Cards Stack */}
                        <div ref={textRef} className="space-y-6">

                            {/* Card 1: Bio Terminal */}
                            <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden group relative">
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>

                                <TerminalHeader
                                    title={
                                        <>
                                            <Terminal className="w-3 h-3" />
                                            jakob@portfolio ~ whoami
                                        </>
                                    }
                                />

                                {/* Content */}
                                <div className="p-6 font-mono">
                                    <TerminalPrompt command="cat" args={["bio.json"]} className="mb-4" />

                                    <div className="pl-4 border-l-2 border-sky-500/30 space-y-3 text-sm">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                                Hi, ich bin <span className="text-sky-400">Jakob</span>
                                            </h2>
                                        </div>

                                        <p className="text-gray-300 leading-relaxed">
                                            Ich baue digitale Lösungen, die funktionieren und Spaß machen. Aktuell studiere ich{" "}
                                            <span className="text-cyan-400 font-semibold">Medieninformatik</span> in Frankfurt
                                            mit Fokus auf Web & Mobile Development.
                                        </p>

                                        <p className="text-gray-400 leading-relaxed">
                                            Was mich antreibt? Probleme zu lösen und Ideen Leben einzuhauchen. Von kompletten
                                            Web-Apps über Mobile-Lösungen bis hin zu Automation – wenn's technisch interessant
                                            ist und echten Mehrwert bringt, bin ich dabei.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Quick Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <GlassCard hoverEffect className="hover:border-cyan-500/30">
                                    <div className="text-3xl font-bold text-cyan-400 mb-1 font-mono">10+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Projekte</div>
                                </GlassCard>

                                <GlassCard hoverEffect className="hover:border-emerald-500/30">
                                    <div className="text-3xl font-bold text-emerald-400 mb-1 font-mono">6+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Jahre Code</div>
                                </GlassCard>

                                <GlassCard hoverEffect className="hover:border-purple-500/30">
                                    <div className="text-3xl font-bold text-purple-400 mb-1 font-mono">∞</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Motivation</div>
                                </GlassCard>
                            </div>

                            {/* Card 3: Download CV */}
                            <GlassCard hoverEffect className="hover:border-sky-500/30 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="font-mono">
                                        <div className="text-xs text-gray-500 mb-1">DOWNLOAD</div>
                                        <div className="text-sm text-gray-300">Lebenslauf_JakobDickhardt.pdf</div>
                                        <div className="text-xs text-gray-600 mt-1">248 KB • PDF</div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = "/data/Lebenslauf_JakobDickhardt.pdf"
                                            link.download = "Jakob-Dickhardt-Lebenslauf.pdf"
                                            link.click()
                                        }}
                                        className="flex items-center justify-center w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:scale-110 transition-all group"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </GlassCard>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};