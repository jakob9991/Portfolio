'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from "next/image"
import logo from "../public/images/logo.svg"
import { socialLinks } from '@/public/data/socialLinks';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* Logo */}
        <a 
          href="#start" 
          className="relative group z-50"
          onClick={(e) => handleNavClick(e, '#start')}
        >
          <Image
            src={logo}
            alt="Jakob Dickhardt Logo"
            width={40}
            height={40}
            className="h-8 w-auto brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all"
          />
          <div className="absolute -inset-2 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Desktop Social/CTA */}
        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}

          <a
            href="mailto:Jakob.dickhardt@t-online.de"
            className="px-4 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-colors"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 top-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="flex gap-6 mt-8">
            <a href="https://github.com/jakobdickhardt" className="p-3 bg-white/5 rounded-full text-white"><Github /></a>
            <a href="https://linkedin.com/in/jakob-dickhardt" className="p-3 bg-white/5 rounded-full text-white"><Linkedin /></a>
            <a href="mailto:Jakob.dickhardt@t-online.de" className="p-3 bg-white/5 rounded-full text-white"><Mail /></a>
          </div>
        </div>

      </div>
    </header>
  );
};