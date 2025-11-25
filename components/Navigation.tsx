'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import logo from "../public/images/logo.svg"
import { Button } from "./ui/Button"
import { X, Menu } from "./ui/Icons"

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Start", href: "#start" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Career", href: "#career" },
        { label: "Contact", href: "#contact" },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMobileMenuOpen(false);
        }
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}>
            <div className="container mx-auto px-4">
                <div className={`glass-effect rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? "glow-effect" : ""}`}>
                    
                    {/* Logo */}
                    <a 
                        href='#start' 
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#start")
                        }}
                        className="flex items-center hover:opacity-80 transition-opacity group"
                    >
                        <Image
                            src={logo}
                            alt="Jakob Dickhardt Logo"
                            width={40}
                            height={40}
                            className="h-8 w-auto brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }} 
                                className="text-foreground/80 hover:text-primary transition-colors font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 glass-effect rounded-2xl p-6 animate-fade-in">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    className="text-foreground/80 hover:text-primary transition-colors font-medium text-lg"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}