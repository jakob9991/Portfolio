"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { LogoInline } from "@/components/LogoInline";
import { useMobile } from "@/hooks/useMobile";
import {
  FooterBottom,
  FooterContacts,
  FooterNavigation,
  FooterSocialLinks,
  FooterStatus,
  defaultFooterContacts,
  defaultFooterLinks,
  defaultFooterMeta,
  FooterContact,
  FooterLink,
  FooterMeta,
} from "@/components/sections/footer";

gsap.registerPlugin(ScrollTrigger);

type FooterProps = {
  links: FooterLink[];
  contacts: FooterContact[];
  meta: FooterMeta | null;
};

export const Footer = ({ links, contacts, meta }: FooterProps) => {
  const footerRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();

  const footerMeta = meta ?? defaultFooterMeta;
  const footerLinks = links.length > 0 ? links : defaultFooterLinks;
  const footerContacts = contacts.length > 0 ? contacts : defaultFooterContacts;

  const socialLinks = footerLinks
    .filter((link) => link.is_visible && link.type === "social")
    .sort((a, b) => a.sort_order - b.sort_order);

  const navLinks = footerLinks
    .filter((link) => link.is_visible && link.type === "nav")
    .sort((a, b) => a.sort_order - b.sort_order);

  const visibleContacts = footerContacts
    .filter((contact) => contact.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);

  useEffect(() => {
    if (!footerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-container",
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
            toggleActions: "play reset play reset",
          },
        },
      );

      gsap.fromTo(
        ".footer-logo",
        isMobile ? { scale: 0, opacity: 0 } : { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: isMobile ? 0.5 : 0.8,
          delay: isMobile ? 0.2 : 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play reset play reset",
          },
        },
      );

      gsap.fromTo(
        ".contact-card",
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
            toggleActions: "play reset play reset",
          },
        },
      );

      gsap.fromTo(
        ".social-icon",
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
            toggleActions: "play reset play reset",
          },
        },
      );

      gsap.fromTo(
        ".system-info-line",
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
            toggleActions: "play reset play reset",
          },
        },
      );

      gsap.fromTo(
        ".footer-nav-link",
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
            toggleActions: "play reset play reset",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} id="contact" className="py-20 relative bg-[#0a0d14] text-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="footer-container max-w-5xl mx-auto">
          <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden mb-8">
            <TerminalHeader
              title={
                <>
                  <Terminal className="w-3 h-3" />
                  ~/contact
                </>
              }
            />

            <div className="p-8 md:p-12 font-mono">
              <div className="footer-logo flex justify-center mb-10">
                <div className="group transition-transform duration-300 hover:scale-105">
                  <LogoInline className="h-14 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <FooterContacts contacts={visibleContacts} />

              <div className="h-[1px] bg-white/5 mb-8" />

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <FooterSocialLinks links={socialLinks} />
                <FooterNavigation links={navLinks} scrollToSection={scrollToSection} />
              </div>

              <FooterStatus meta={footerMeta} />
            </div>
          </div>

          <FooterBottom meta={footerMeta} />
        </div>
      </div>
    </footer>
  );
};

