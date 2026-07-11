import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X, ArrowUpRight, Youtube, Instagram, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SOCIAL_LINKS } from "../data";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: "pt" | "en";
  setLang: (lang: "pt" | "en") => void;
}

export default function Header({ activeTab, setActiveTab, lang, setLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = lang === "pt" ? [
    { id: "home", label: "Início" },
    { id: "portfolio", label: "Portfólio" },
    { id: "about", label: "Sobre" },
    { id: "contact", label: "Contato" },
  ] : [
    { id: "home", label: "Home" },
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smooth scroll to top of page when changing tabs
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-md py-3 border-b border-white/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Symmetrical Desktop Layout */}
          <div className="hidden md:grid grid-cols-3 items-center w-full">
            
            {/* Left Nav Menu */}
            <nav className="flex justify-start gap-12" id="desktop-nav-left">
              {navItems.slice(0, 2).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2 cursor-pointer ${
                    activeTab === item.id
                      ? "text-white font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-purple"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Centralized Logo Block */}
            <div className="flex justify-center" id="desktop-nav-center">
              <button
                onClick={() => handleNavClick("home")}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <Logo size={36} />
                <span className="font-display text-lg font-light tracking-[0.5em] text-white uppercase group-hover:text-brand-purple transition-colors duration-300 mr-[-0.5em]">
                  M<span className="text-brand-purple font-normal">O</span>RÆ
                </span>
                <span className="text-[7px] tracking-[0.6em] text-gray-400 uppercase opacity-70 group-hover:opacity-100 transition-opacity duration-300 ml-[0.6em]">
                  VIDEO EDITING
                </span>
              </button>
            </div>

            {/* Right Nav Menu */}
            <nav className="flex justify-end gap-12 items-center" id="desktop-nav-right">
              {navItems.slice(2, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2 cursor-pointer ${
                    activeTab === item.id
                      ? "text-white font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-purple"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              
              {/* Call-to-action button */}
              <button
                onClick={() => handleNavClick("contact")}
                className="ml-4 flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
              >
                Showreel
                <ArrowUpRight size={10} />
              </button>

              {/* Language Switcher Segmented Control */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 ml-4">
                <button
                  onClick={() => setLang("pt")}
                  className={`px-2 py-1 rounded text-[9px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                    lang === "pt"
                      ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-1 rounded text-[9px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                    lang === "en"
                      ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Mobile Left Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              <Menu size={22} />
            </button>

            {/* Centered Logo on Mobile */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <Logo size={28} />
              <div className="flex flex-col items-center">
                <span className="font-display text-sm font-light tracking-[0.4em] text-white uppercase leading-none mr-[-0.4em]">
                  M<span className="text-brand-purple font-normal">O</span>RÆ
                </span>
                <span className="text-[6px] tracking-[0.4em] text-gray-400 uppercase opacity-70 ml-[0.4em]">
                  STUDIO
                </span>
              </div>
            </button>

            {/* Quick Actions (Language + WhatsApp) to balance mobile header */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "pt" ? "en" : "pt")}
                className="px-2 py-1 rounded border border-white/10 bg-white/5 text-[9px] font-bold tracking-widest text-gray-300 hover:border-white/20 transition-all cursor-pointer"
              >
                {lang === "pt" ? "PT" : "EN"}
              </button>
              
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-brand-purple-light hover:text-white transition-colors cursor-pointer"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide-down Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 border-b border-brand-purple/20 md:hidden"
          >
            {/* Close button inside mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 left-6 p-2 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Mobile Nav Links list */}
            <div className="flex flex-col gap-6 mt-4">
              <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold">
                {lang === "pt" ? "Navegação" : "Navigation"}
              </span>
              <nav className="flex flex-col gap-5">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left font-display text-2xl uppercase tracking-widest cursor-pointer ${
                      activeTab === item.id
                        ? "text-brand-purple-light font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Language Selection in Mobile Menu Drawer */}
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-[10px] tracking-[0.4em] text-brand-purple uppercase font-semibold">
                  {lang === "pt" ? "Idioma" : "Language"}
                </span>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-0.5 w-fit">
                  <button
                    onClick={() => setLang("pt")}
                    className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                      lang === "pt"
                        ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Português (BR)
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                      lang === "en"
                        ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    English (US)
                  </button>
                </div>
              </div>
            </div>

            {/* Social media connections and brand footer inside mobile menu */}
            <div className="flex flex-col gap-6 border-t border-brand-purple/10 pt-6">
              <div className="flex justify-around items-center text-gray-400">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-purple-light transition-colors">
                  <Instagram size={20} />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="hover:text-brand-purple-light transition-colors">
                  <Youtube size={20} />
                </a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-brand-purple-light transition-colors">
                  <MessageSquare size={20} />
                </a>
              </div>
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-widest text-gray-500">© 2026 Moræ Video Editing</p>
                <p className="text-[7px] uppercase tracking-[0.3em] text-brand-purple-light/50 mt-1">
                  {lang === "pt" ? "CORTES SUTIS • ALMA AUDIOVISUAL" : "SUBTLE CUTS • AUDIOVISUAL SOUL"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
