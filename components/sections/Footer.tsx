'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, MapPin, Smartphone } from "lucide-react";
import { socialLinks } from "@/public/data/socialLinks";
gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  // Echte Daten aus dem CV


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Fade In for footer elements
      gsap.fromTo(".footer-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%", // Startet fast sofort wenn der Footer sichtbar wird
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);
  const navLinks = ['Start', 'Skills', 'Projects', 'Career'];
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} id="contact" className="py-20 relative border-t border-white/10 bg-black/20 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* 1. Logo */}
          <div className="footer-item mb-10">
            <a
              href="#start"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#start");
              }}
              className="block group transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/images/logo.svg"
                alt="Jakob Dickhardt Logo"
                className="h-12 w-auto mx-auto filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-2xl font-mono font-bold text-white">
                &lt;J/D&gt;
              </span>
            </a>
          </div>

          {/* 2. Contact Info Grid */}
          <div className="footer-item grid md:grid-cols-3 gap-6 mb-12 w-full max-w-2xl">
            <a href="mailto:Jakob.dickhardt@t-online.de" className="glass-effect p-4 flex flex-col items-center gap-3 hover-glow group transition-all duration-300 hover:-translate-y-1">
              <div className="p-2 bg-blue-500/10 rounded-full text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Jakob.dickhardt@t-online.de</span>
            </a>

            <a href="tel:+4915151629365" className="glass-effect p-4 flex flex-col items-center gap-3 hover-glow group transition-all duration-300 hover:-translate-y-1">
              <div className="p-2 bg-green-500/10 rounded-full text-green-400 group-hover:text-white group-hover:bg-green-500 transition-colors">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">+49 151 516 293 65</span>
            </a>

            <div className="glass-effect p-4 flex flex-col items-center gap-3 hover-glow group transition-all duration-300 hover:-translate-y-1 cursor-default">
              <div className="p-2 bg-purple-500/10 rounded-full text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Frankfurt am Main</span>
            </div>
          </div>

          {/* 3. Navigation Links - ✅ MIT SMOOTH SCROLL */}
          <div className="footer-item flex flex-wrap justify-center gap-8 mb-10 text-sm font-medium text-gray-400">
            {navLinks.map((item) => {
              const sectionId = item.toLowerCase() === 'start' ? '#start' : `#${item.toLowerCase()}`;
              return (
                <a
                  key={item}
                  href={sectionId}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                  }}
                  className="hover:text-blue-400 transition-colors relative group cursor-pointer"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          {/* 4. Social Icons */}
          <div className="footer-item flex gap-4 mb-10">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                >
                  <Icon className= "w-5-h-5"/>
                </a>
              )
            })}
          </div>

          {/* 5. Copyright & Legal */}
          <div className="footer-item text-center space-y-2">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Jakob Dickhardt. All rights reserved.
            </p>
            <div className="flex justify-center gap-4 text-xs text-gray-600">
              <a href="/impressum" className="hover:text-gray-400 transition-colors">Impressum</a>
              <span>•</span>
              <a href="/datenschutz" className="hover:text-gray-400 transition-colors">Datenschutz</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};