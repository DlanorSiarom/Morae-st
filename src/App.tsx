import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Film, Sliders, Volume2, Sparkles, ArrowRight, Scissors, Eye, Zap, Bird, Compass } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import ShortsCylinder from "./components/ShortsCylinder";
import BeforeAfter from "./components/BeforeAfter";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Logo from "./components/Logo";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedProjectForQuote, setSelectedProjectForQuote] = useState<string>("");
  const [lang, setLang] = useState<"pt" | "en">("pt");

  // Handler to smoothly trigger a quote request for a specific portfolio video format
  const handleQuoteForProject = (projectTitle: string) => {
    setSelectedProjectForQuote(projectTitle);
    setActiveTab("contact");
    setTimeout(() => {
      const formElement = document.getElementById("contact-form-section");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  // Keep track of page transitions and scroll state
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#050505] text-gray-100 font-sans selection:bg-brand-purple selection:text-white" id="morae-applet-root">
      
      {/* 1. Symmetric Header Menu with Centered Logo */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} setLang={setLang} />

      {/* 2. Page Canvas with Transitions */}
      <main className="flex-grow w-full relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME PAGE */}
          {activeTab === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col w-full"
            >
              {/* Hero Post-Production Editor Simulator */}
              <Hero 
                onExplorePortfolio={() => setActiveTab("portfolio")} 
                onContact={() => setActiveTab("contact")} 
                lang={lang}
              />

              {/* Technical Value Proposition Section (Bento grid style) */}
              <section className="py-24 border-t border-white/5 bg-[#070707]/40 relative overflow-hidden" id="features-bento-section">
                <div className="absolute top-0 right-0 w-[25rem] h-[25rem] bg-brand-purple-dark/5 rounded-full blur-[90px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
                  
                  <div className="flex flex-col gap-2 mb-16">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-brand-purple-light font-mono font-bold">
                      {lang === "pt" ? "MÉTODO DE EDIÇÃO" : "EDITING METHOD"}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight uppercase">
                      {lang === "pt" ? (
                        <>Nosso DNA de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-purple-400 font-normal">Pós-Produção</span></>
                      ) : (
                        <>Our Post-Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-purple-400 font-normal">DNA</span></>
                      )}
                    </h2>
                    <p className="font-sans text-gray-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                      {lang === "pt"
                        ? "Vídeos genéricos não retêm público. Nosso processo une psicologia visual com cortes milimetricamente desenhados para prender a atenção."
                        : "Generic videos don't retain audiences. Our process combines visual psychology with milimetrically styled cuts to hold undivided attention."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1: Montagem Rítmica */}
                    <div className="glass-panel rounded-xl p-8 border border-white/10 flex flex-col justify-between h-full hover:border-white/20 hover:shadow-2xl transition-all duration-300">
                      <div className="flex flex-col gap-6">
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                          <Compass size={20} />
                        </div>
                        <div>
                          <h4 className="font-display text-lg font-light text-white uppercase mb-2">
                            {lang === "pt" ? "Montagem Rítmica & Beats" : "Rhythmic & Beat Editing"}
                          </h4>
                          <p className="font-sans text-gray-400 text-xs leading-relaxed">
                            {lang === "pt"
                              ? "Cortes alinhados de forma milimétrica às batidas e transições táteis. Editamos baseados em frequências para maximizar a retenção cognitiva do espectador nos primeiros 3 segundos."
                              : "Cuts aligned millimetrically to beats and tactile transitions. We edit based on frequencies to maximize the viewer's cognitive retention in the vital first 3 seconds."}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-gray-500 mt-6 block uppercase tracking-widest">TIMING • RETENÇÃO</span>
                    </div>

                    {/* Feature 2: Color Grading Autoral */}
                    <div className="glass-panel rounded-xl p-8 border border-white/10 flex flex-col justify-between h-full hover:border-white/20 hover:shadow-2xl transition-all duration-300">
                      <div className="flex flex-col gap-6">
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                          <Sliders size={20} />
                        </div>
                        <div>
                          <h4 className="font-display text-lg font-light text-white uppercase mb-2">
                            {lang === "pt" ? "Color Grading Assinatura" : "Signature Color Grading"}
                          </h4>
                          <p className="font-sans text-gray-400 text-xs leading-relaxed">
                            {lang === "pt"
                              ? "Nossa paleta autoral (Ultraviolet) confere contraste cinematográfico robusto, pretos aveludados e tons de pele naturais sob iluminação fria neon. Perfeito para destacar sua marca no feed."
                              : "Our proprietary palette (Ultraviolet) delivers robust cinematic contrast, velvety blacks, and natural skin tones under cool neon lights. Ideal to make your brand pop in any feed."}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-gray-500 mt-6 block uppercase tracking-widest">COLOR METRIA • LUT</span>
                    </div>

                    {/* Feature 3: Sound Design Tátil */}
                    <div className="glass-panel rounded-xl p-8 border border-white/10 flex flex-col justify-between h-full hover:border-white/20 hover:shadow-2xl transition-all duration-300">
                      <div className="flex flex-col gap-6">
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                          <Volume2 size={20} />
                        </div>
                        <div>
                          <h4 className="font-display text-lg font-light text-white uppercase mb-2">
                            {lang === "pt" ? "Sound Design Multicamadas" : "Multi-layered Sound Design"}
                          </h4>
                          <p className="font-sans text-gray-400 text-xs leading-relaxed">
                            {lang === "pt"
                              ? "Mais de 20 canais de áudio integrando foley tátil, efeitos atmosféricos, wooshes espaciais e trilhas sonoras licenciadas. Um vídeo épico só existe se o som for imersivo."
                              : "Over 20 audio tracks integrating tactile foley, atmospheric effects, spatial swooshes, and licensed tracks. An epic video only works if the sound design is fully immersive."}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-gray-500 mt-6 block uppercase tracking-widest">FOLEY • IMMERSION</span>
                    </div>
                  </div>

                </div>
              </section>

              {/* Showcase Highlight: Large Interactive Color Calibration Slider */}
              <section className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden" id="before-after-landing-section">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <div className="w-full flex flex-col items-center">
                    <BeforeAfter lang={lang} />
                  </div>
                </div>
              </section>

              {/* Portfolio Recent Items Spotlight */}
              <section className="py-24 border-t border-white/5 bg-[#050505]" id="portfolio-spotlight-section">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left flex flex-col gap-12">
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-purple-light font-mono font-bold">
                        {lang === "pt" ? "PORTFÓLIO RECENTE" : "RECENT PORTFOLIO"}
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight uppercase">
                        {lang === "pt" ? (
                          <>Cortes em <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-purple-400 font-normal">Destaque</span></>
                        ) : (
                          <>Spotlight <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-purple-400 font-normal">Cuts</span></>
                        )}
                      </h3>
                      <p className="font-sans text-gray-400 text-xs sm:text-sm max-w-xl">
                        {lang === "pt"
                          ? "Nossas edições mais recentes que alcançaram altos picos de engajamento e prêmios de direção de arte."
                          : "Our most recent edits that achieved high viral engagement peaks and art direction awards."}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab("portfolio")}
                      className="group px-5 py-3 rounded-lg border border-white/10 bg-transparent hover:bg-white text-white hover:text-black hover:border-white text-xs font-sans uppercase tracking-widest font-bold flex items-center gap-2 transition-all duration-300 self-start md:self-end cursor-pointer"
                    >
                      {lang === "pt" ? "Ver Portfólio Completo" : "View Full Portfolio"}
                      <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Portfolio grid restricted to 3 recent items */}
                  <ShortsCylinder onQuoteForProject={handleQuoteForProject} lang={lang} />

                </div>
              </section>

              {/* Feedback Section (Testimonials) */}
              <section className="py-24 border-t border-white/5 bg-[#050505]" id="testimonials-section">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <Testimonials />
                </div>
              </section>

              {/* Contact Briefing Section */}
              <section className="py-24 border-t border-white/5 bg-[#050505]" id="contact-section">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <Contact />
                </div>
              </section>

            </motion.div>
          )}

          {/* TAB 2: PORTFOLIO SCREEN */}
          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-32 flex flex-col w-full bg-[#050505]"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left flex flex-col gap-12">
                
                {/* Section Header */}
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-2 text-brand-purple-light text-xs font-mono uppercase tracking-widest">
                    <Film size={14} />
                    <span>Post-Production Directory</span>
                  </div>
                  <h2 className="font-display text-4xl font-light text-white tracking-tight uppercase">
                    ESTÚDIO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-purple-400 font-normal">PORTFÓLIOS</span>
                  </h2>
                  <p className="font-sans text-gray-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                    Explore nosso portfólio completo de montagem. Use os filtros abaixo para escolher seu formato e clique no card para analisar detalhadamente a ficha técnica, métricas e gradação de cores de cada estudo de caso.
                  </p>
                </div>

                {/* Portfolio Full List View */}
                <Portfolio onQuoteForProject={handleQuoteForProject} lang={lang} />

                {/* Embedded Testimonials for confidence builder */}
                <div className="border-t border-white/5 pt-24 mt-12">
                  <Testimonials />
                </div>

                {/* Embedded Contact */}
                <div className="border-t border-white/5 pt-24 mt-12">
                  <Contact />
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: ABOUT SCREEN */}
          {activeTab === "about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-32 flex flex-col w-full bg-[#050505]"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left flex flex-col gap-16">
                
                {/* Segment Header */}
                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-2 text-brand-purple-light text-xs font-mono uppercase tracking-widest">
                    <Compass size={14} />
                    <span>Sobre o Manifesto Moræ</span>
                  </div>
                  <h2 className="font-display text-4xl font-light text-white tracking-tight uppercase">
                    Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-purple-400 font-normal">Filosofia</span> Cinematográfica
                  </h2>
                  <p className="font-sans text-gray-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                    Acreditamos que editar não é apenas cortar takes brutos, mas moldar sentimentos humanos através de ritmo, silêncio e cores sutis.
                  </p>
                </div>

                {/* Weaving the Raven & Shark Story of user logo uploaded */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#0a0a0a]/60 border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                  {/* Subtle purple background emblem */}
                  <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-[25rem] h-[25rem] bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none"></div>

                  <div className="flex flex-col gap-6">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-brand-purple-light uppercase">
                      A FUSÃO ELEMENTAR • LOGO E SIGNIFICADO
                    </span>
                    <h3 className="font-display text-2xl font-light text-white tracking-tight uppercase">
                      A Simbologia: O Corvo & O Tubarão
                    </h3>
                    <p className="font-sans text-gray-300 text-xs sm:text-sm leading-relaxed">
                      Representados em nosso emblema circular (o círculo de continuidade), unimos duas forças vitais que guiam nossa pós-produção:
                    </p>

                    <div className="flex flex-col gap-4 font-sans text-xs text-gray-300">
                      <div className="flex gap-4 p-4 rounded bg-[#0f0f0f] border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                          <Bird size={18} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">O Corvo (Perspectiva & Visão)</h5>
                          <p className="text-gray-400 mt-1">
                            Representa a visão panorâmica, o mistério onírico e o olhar aguçado para capturar a poesia visual de cada história. Garante que o roteiro tenha alma.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded bg-[#0f0f0f] border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                            <path d="M12 2C11 5 8 8 5 9" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">O Tubarão (Agressividade & Ritmo)</h5>
                          <p className="text-gray-400 mt-1">
                            Representa a precisão implacável, a velocidade cirúrgica nos cortes e a fluidez impecável nas transições de cena. Garante que o ritmo seja avassalador.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logo block displaying beautifully */}
                  <div className="flex flex-col items-center justify-center gap-4 bg-black/50 rounded-xl p-8 border border-white/10">
                    <Logo size={140} />
                    <div className="text-center">
                      <h4 className="font-display text-xl font-light tracking-[0.3em] text-white uppercase">Moræ</h4>
                      <p className="text-[8px] font-mono tracking-[0.4em] text-brand-purple-light mt-1">ESTÚDIO DE EDIÇÃO PREMIUM</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Workflow Blocks */}
                <div className="flex flex-col gap-8">
                  <h4 className="font-display text-xl font-light text-white uppercase">Nosso Pipeline de Produção</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    <div className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10">
                      <div className="font-mono text-2xl font-light text-white mb-4">01</div>
                      <h5 className="font-sans font-bold text-white text-sm mb-1.5">Montagem Bruta</h5>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Seleção minuciosa dos melhores takes, sincronização e estrutura de ritmo inicial.
                      </p>
                    </div>

                    <div className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10">
                      <div className="font-mono text-2xl font-light text-white mb-4">02</div>
                      <h5 className="font-sans font-bold text-white text-sm mb-1.5">Trilha & Sound FX</h5>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Criação de camadas de áudio profundas, efeitos foley e ambientação acústica imersiva.
                      </p>
                    </div>

                    <div className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10">
                      <div className="font-mono text-2xl font-light text-white mb-4">03</div>
                      <h5 className="font-sans font-bold text-white text-sm mb-1.5">Color Grading</h5>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Tratamento completo de cores, equilíbrio de exposição e aplicação do LUT autoral da marca.
                      </p>
                    </div>

                    <div className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10">
                      <div className="font-mono text-2xl font-light text-white mb-4">04</div>
                      <h5 className="font-sans font-bold text-white text-sm mb-1.5">Finalização</h5>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Adição de motion graphics, legendas elegantes, vfx e renderização de alta fidelidade.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Embedded Contact Form */}
                <div className="border-t border-white/5 pt-24 mt-12">
                  <Contact />
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: CONTACT SCREEN */}
          {activeTab === "contact" && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-32 flex flex-col w-full bg-[#050505]"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
                
                {/* Render the contact interface in focus */}
                <Contact initialProjectTitle={selectedProjectForQuote} />

                {/* Embedded Testimonials */}
                <div className="border-t border-white/5 pt-24 mt-24">
                  <Testimonials />
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. Global Footer Component */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
