'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import Image from "next/image"
import logo from "../public/images/logo.svg"
import { socialLinks } from '@/public/data/socialLinks';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect with Throttling for Performance
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Cancel previous frame if it hasn't executed yet
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      // Use requestAnimationFrame to throttle to 60fps max
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Only update state if the scroll threshold is crossed
        const shouldBeScrolled = currentScrollY > 50;
        const wasScrolled = lastScrollY > 50;

        if (shouldBeScrolled !== wasScrolled) {
          setIsScrolled(shouldBeScrolled);
        }

        lastScrollY = currentScrollY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const navLinks = [
    { name: 'Start', href: '#start' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projekte', href: '#projects' },
    { name: 'Karriere', href: '#career' },
    { name: 'Kontakt', href: '#contact' },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Speichere aktuelle Scroll-Position
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Stelle Scroll-Position wieder her
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isMobileMenuOpen]);

  // Smooth Scroll Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Kurze Verzögerung, damit das Menü sich schließen kann
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f1219]/95 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-[#0a0d14]/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center h-14">

            {/* Logo */}
            <a
              href="#start"
              className="relative group"
              onClick={(e) => handleNavClick(e, '#start')}
            >
              <Image
                src={logo}
                alt="Jakob Dickhardt Logo"
                width={40}
                height={40}
                className="h-7 w-auto brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all"
              />
              <div className="absolute -inset-2 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative px-3 py-1.5 rounded-md text-xs font-mono font-medium text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
                >
                  <span className="text-cyan-500/50 mr-1.5">0{index + 1}</span>
                  {link.name}
                  <span className="absolute inset-0 rounded-md border border-transparent group-hover:border-cyan-500/30 transition-colors"></span>
                </a>
              ))}
            </nav>

            {/* Desktop Social + CTA */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-md text-gray-500 hover:text-cyan-400 hover:bg-white/5 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#kontakt')}
                className="ml-2 px-4 py-1.5 text-xs font-bold font-mono bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/20"
              >
                <span className="text-cyan-200 mr-1">$</span>
                contact
              </a>
            </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 relative ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu - Terminal Style Fullscreen Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a0d14] z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Terminal Window */}
        <div
          className={`absolute inset-x-4 bg-[#0f1219]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'top-20 opacity-100 translate-y-0' : 'top-0 opacity-0 -translate-y-4'
          }`}
          style={{ maxHeight: 'calc(100vh - 100px)' }}
        >
          {/* Terminal Header */}
            <div className="h-10 bg-[#151921] border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                navigation.sh
              </div>
              <button
                type="button"
                aria-label="Menü schließen"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-8 -mr-2 flex items-center justify-end text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
            {/* Command Prompt */}
            <div className="flex items-center gap-2 mb-6 text-xs">
              <span className="text-green-400">➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-gray-400">$</span>
              <span className="text-gray-200">ls -la ./navigation/</span>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 mb-8">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all group ${
                    isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transitionDuration: '300ms'
                  }}
                >
                  <span className="text-cyan-400 text-sm">0{index + 1}</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                    {link.name}
                  </span>
                  <span className="ml-auto text-gray-600 text-xs group-hover:text-cyan-500 transition-colors">
                    {link.href}
                  </span>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-6"></div>

            {/* Social Links Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                <span className="text-green-400">❯</span>
                <span>./social_links.sh</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all ${
                        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: isMobileMenuOpen ? `${300 + index * 50}ms` : '0ms',
                        transitionDuration: '300ms'
                      }}
                    >
                      <Icon className="w-6 h-6 text-gray-400" />
                      <span className="text-[10px] text-gray-500">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`block w-full mt-6 px-6 py-4 text-center font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? '450ms' : '0ms',
                transitionDuration: '300ms'
              }}
            >
              Kontakt aufnehmen →
            </a>

            {/* Footer Info */}
            <div className={`mt-6 pt-4 border-t border-white/5 text-[10px] text-gray-600 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
              style={{
                transitionDelay: isMobileMenuOpen ? '500ms' : '0ms',
                transitionDuration: '300ms'
              }}
            >
              <div className="flex items-center justify-between">
                <span>STATUS: <span className="text-green-400">ONLINE</span></span>
                <span>NAVIGATION v2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
