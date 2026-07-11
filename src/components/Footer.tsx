import React from "react";
import Logo from "./Logo";
import { SOCIAL_LINKS } from "../data";
import { Instagram, Youtube, HelpCircle, Shield, FileLock, Mail } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleFooterLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-16 relative z-10 overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30rem] h-[15rem] bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-10">
        
        {/* Central Logo & Brand name */}
        <div className="flex flex-col items-center gap-2">
          <Logo size={48} />
          <h4 className="font-display text-2xl font-light tracking-[0.3em] text-white uppercase mt-2">
            Moræ
          </h4>
          <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-brand-purple-light ml-[0.5em]">
            CORTES SUTIS • ALMA AUDIOVISUAL
          </p>
        </div>

        {/* Directory links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-sans text-gray-400 uppercase tracking-widest border-y border-white/5 py-6 w-full max-w-xl">
          <button onClick={() => handleFooterLinkClick("home")} className="hover:text-white transition-colors cursor-pointer">Início</button>
          <button onClick={() => handleFooterLinkClick("portfolio")} className="hover:text-white transition-colors cursor-pointer">Portfólio</button>
          <button onClick={() => handleFooterLinkClick("about")} className="hover:text-white transition-colors cursor-pointer">Sobre Nós</button>
          <button onClick={() => handleFooterLinkClick("contact")} className="hover:text-white transition-colors cursor-pointer">Contato</button>
        </nav>

        {/* Social connections platforms integrations */}
        <div className="flex items-center gap-6 text-gray-500">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors p-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors p-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5"
            aria-label="YouTube"
          >
            <Youtube size={16} />
          </a>
          <a
            href={`mailto:comercial@morae.studio`}
            className="hover:text-white transition-colors p-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5"
            aria-label="E-mail"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Bottom copyright declaration */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full text-[10px] font-mono text-gray-600 border-t border-white/5 pt-8 mt-4">
          <p>© 2026 Moræ Video Post-Production. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 transition-colors flex items-center gap-1 cursor-pointer">
              <Shield size={10} /> Termos de Serviço
            </span>
            <span className="hover:text-gray-400 transition-colors flex items-center gap-1 cursor-pointer">
              <FileLock size={10} /> Privacidade
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
