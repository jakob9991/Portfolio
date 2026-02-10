'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Smartphone, Terminal } from "lucide-react";
import { socialLinks } from "@/public/data/socialLinks";
import { TerminalHeader } from "@/components/ui/terminal";
import { useMobile } from "@/hooks/useMobile";
import { useInView } from "@/hooks/useInView";
gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();
  const isInView = useInView(footerRef, { threshold: 0.1 });

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {

      // Main Footer Container - Simplified on mobile
      gsap.fromTo(".footer-container",
        isMobile ? { y: 30, opacity: 0 } : { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.6 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play reset play reset"
          }
        }
      );

      // Logo Animation - Simplified rotation on mobile
      gsap.fromTo(".footer-logo",
        isMobile ? { scale: 0, opacity: 0 } : { scale: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: isMobile ? 0.5 : 0.8,
          delay: isMobile ? 0.2 : 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play reset play reset"
          }
        }
      );

      // Contact Cards Stagger - Reduced delays on mobile
      gsap.fromTo(".contact-card",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.4 : 0.6,
          stagger: isMobile ? 0.05 : 0.1,
          delay: isMobile ? 0.2 : 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 85%",
            toggleActions: "play reset play reset"
          }
        }
      );

      // Social Icons - Simplified on mobile (no rotation)
      gsap.fromTo(".social-icon",
        isMobile ? { scale: 0, opacity: 0 } : { scale: 0, opacity: 0, rotation: -90 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: isMobile ? 0.3 : 0.5,
          stagger: isMobile ? 0.04 : 0.08,
          delay: isMobile ? 0.3 : 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".social-icons",
            start: "top 85%",
            toggleActions: "play reset play reset"
          }
        }
      );

      // System Info Lines
      gsap.fromTo(".system-info-line",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: isMobile ? 0.3 : 0.4,
          stagger: isMobile ? 0.05 : 0.1,
          delay: isMobile ? 0.4 : 0.8,
          scrollTrigger: {
            trigger: ".system-info",
            start: "top 85%",
            toggleActions: "play reset play reset"
          }
        }
      );

      // Nav Links
      gsap.fromTo(".footer-nav-link",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.3 : 0.4,
          stagger: isMobile ? 0.03 : 0.05,
          delay: isMobile ? 0.3 : 0.5,
          scrollTrigger: {
            trigger: ".footer-nav",
            start: "top 85%",
            toggleActions: "play reset play reset"
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const navLinks = [
    { label: 'Start', href: '#start' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projekte', href: '#projects' },
    { label: 'Karriere', href: '#career' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} id="contact" className="py-20 relative bg-[#0a0d14] text-slate-200 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="footer-container max-w-5xl mx-auto">

          {/* Main Terminal Window */}
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden mb-8">

            {/* Terminal Header */}
            <TerminalHeader
              title={
                <>
                  <Terminal className="w-3 h-3" />
                  ~/contact
                </>
              }
            />

            {/* Terminal Content */}
            <div className="p-8 md:p-12 font-mono">

              {/* Logo / Brand */}
              <div className="footer-logo flex justify-center mb-10">
                <a
                  href="#start"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#start");
                  }}
                  className="group transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="/images/logo.svg"
                    alt="Jakob Dickhardt Logo"
                    className="h-14 w-auto filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="hidden text-3xl font-mono font-bold text-white">
                    &lt;J/D&gt;
                  </span>
                </a>
              </div>

              {/* Contact Cards - System Status Style */}
              <div className="contact-grid grid md:grid-cols-3 gap-4 mb-10">

                {/* Email Card */}
                <a href="mailto:Jakob.dickhardt@gmail.com" className="contact-card bg-[#0a0d14]/60 backdrop-blur-xl border border-white/5 rounded-lg p-4 hover:border-cyan-500/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-1">E-Mail</div>
                      <div className="text-xs text-cyan-400 font-semibold break-all">Jakob.dickhardt@<br className="hidden sm:inline"/>gmail.com</div>
                    </div>
                  </div>
                </a>

                {/* Phone Card */}
                <a href="tel:+4915151629365" className="contact-card bg-[#0a0d14]/60 backdrop-blur-xl border border-white/5 rounded-lg p-4 hover:border-emerald-500/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-1">Telefon</div>
                      <div className="text-xs text-emerald-400 font-semibold">+49 151 516 293 65</div>
                    </div>
                  </div>
                </a>

                {/* Location Card */}
                <div className="contact-card bg-[#0a0d14]/60 backdrop-blur-xl border border-white/5 rounded-lg p-4 hover:border-purple-500/30 transition-all group cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-1">Standort</div>
                      <div className="text-xs text-purple-400 font-semibold">Frankfurt am Main, 60437</div>
                      <div className="text-xs text-purple-400 font-semibold">Alt-Niedereschbach 17</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Divider */}
              <div className="h-[1px] bg-white/5 mb-8"></div>

              {/* Social Links + Navigation */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">

                {/* Left: Social Icons */}
                <div>
                  <div className="text-xs text-gray-500 mb-4">
                    Socials
                  </div>
                  <div className="social-icons flex gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="social-icon w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:scale-110 transition-all duration-300"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Navigation */}
                <div>
                  <div className="text-xs text-gray-500 mb-4">
                    Navigation
                  </div>
                  <div className="footer-nav flex flex-wrap gap-4 text-sm">
                    {navLinks.map((item) => {
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                          }}
                          className="footer-nav-link text-gray-400 hover:text-cyan-400 transition-colors relative group cursor-pointer"
                        >
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                        </a>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Status */}
              <div className="system-info flex items-center justify-center gap-3 text-xs text-gray-500">
                <div className="system-info-line flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-green-400">Verfügbar für Projekte</span>
                </div>
              </div>

            </div>

          </div>

          {/* Footer Bottom - Legal */}
          <div className="text-center font-mono">
            <div className="bg-[#0f1219]/40 backdrop-blur-xl border border-white/5 rounded-lg p-4 space-y-3">
              <p className="text-xs text-gray-600">
                © {new Date().getFullYear()} Jakob Dickhardt | Impressum & Inhalt
              </p>
              
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
