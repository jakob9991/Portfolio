
'use client'
import { useEffect, useRef } from "react";
import profilePhoto from "../../public/images/profileImage.jpg"
import Image from "next/image";
import { Button } from "../ui/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText } from "../ui/Icons";
gsap.registerPlugin(ScrollTrigger);
export const About = () => {

    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Container fade-in
            gsap.from(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
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
                    toggleActions: "play none none reverse",
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
                    toggleActions: "play none none reverse",
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
        <section ref={sectionRef} id="about" className="py-24 relative">
            <div className="container mx-auto px-4">
                <div ref={containerRef} className="max-w-5xl mx-auto">
                    <div className="glass-effect rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">

                        {/* Profile Photo */}
                        <div ref={imageRef} className="relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 overflow-hidden hover-glow">
                                <Image
                                    src={profilePhoto}
                                    alt="Jakob Dickhardt"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                            {/* Decorative glow */}
                            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
                        </div>

                        {/* About Text */}
                        <div ref={textRef} className="space-y-6">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-2">
                                    <span className="inline-block">
                                        Hi,
                                        <div className="w-full h-1 bg-primary rounded-full mt-1" />
                                    </span>
                                      &nbsp;ich bin <span className="text-primary">Jakob</span>
                                </h2>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Ich kombiniere technische Präzision mit kreativem Problemlösen. Aktuell studiere ich{" "}
                                <span className="text-foreground font-semibold">Medieninformatik</span> mit Fokus
                                auf Web & Mobile Development.
                            </p>

                            <p className="text-muted-foreground leading-relaxed">
                                Leidenschaftlich am Entwickeln moderner, nutzerzentrierter Anwendungen, die echte
                                Probleme lösen. Von Full-Stack Web-Apps bis zu Mobile-Lösungen – ich liebe es,
                                Ideen in die Realität umzusetzen.
                            </p>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = "/data//Lebenslauf_JakobDickhardt.pdf"
                                    link.download = "Jakob-Dickhardt-Lebenslauf.pdf"
                                    link.click()
                                }}
                            >
                                <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                Lebenslauf herunterladen
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};