import React, { useState } from "react";
import { SOCIAL_LINKS } from "../data";
import { Send, Check, Phone, Mail, MapPin, Youtube, Instagram, MessageSquare, Award, Sparkles, AlertCircle, Scissors, FileText, Calendar, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  initialProjectTitle?: string;
}

export default function Contact({ initialProjectTitle = "" }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(initialProjectTitle ? "Comerciais" : "Comerciais");
  const [customTitle, setCustomTitle] = useState(initialProjectTitle);
  const [budget, setBudget] = useState("médio");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-calculated suggestions based on briefing inputs
  const getProjectEstimates = () => {
    switch (projectType) {
      case "Comerciais":
        return {
          layers: 16,
          audio: 10,
          time: "4 a 7 dias",
          colorGrading: "Ultraviolet High Contrast",
          recommendedLength: "30s a 60s"
        };
      case "Videoclipes":
        return {
          layers: 24,
          audio: 18,
          time: "10 a 14 dias",
          colorGrading: "Creative Atmospheric LUTs",
          recommendedLength: "3min a 5min"
        };
      case "Documentários":
        return {
          layers: 12,
          audio: 24,
          time: "15 a 25 dias",
          colorGrading: "Film Grain 35mm Naturalist",
          recommendedLength: "5min a 20min"
        };
      case "Redes Sociais":
        return {
          layers: 18,
          audio: 6,
          time: "24h a 48h",
          colorGrading: "Vibrant Punchy Social",
          recommendedLength: "15s a 30s"
        };
      default:
        return {
          layers: 14,
          audio: 8,
          time: "5 a 9 dias",
          colorGrading: "Cinema Custom Match",
          recommendedLength: "Livre"
        };
    }
  };

  const estimates = getProjectEstimates();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setProgress(10);

    // Simulate standard post-production render progress bar loading
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsSubmitting(false);
          setIsSubmitted(true);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 text-left" id="contact-form-section">
      
      {/* Left Column: Studio Information & Social platforms Integration (Cols 1-5) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-10">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-brand-purple-light text-xs font-mono uppercase tracking-widest">
            <Mail size={14} />
            <span>Contato & Briefing</span>
          </div>
          
          <h3 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight uppercase leading-tight">
            Pronto para dar <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-purple-400 font-normal">alma</span> ao seu vídeo?
          </h3>
          
          <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed">
            Preencha o formulário para enviar as diretrizes do seu projeto. Nosso algoritmo gera instantaneamente uma estimativa técnica de pós-produção baseada nos padrões de montagem da Moræ.
          </p>

          {/* Quick contact slots */}
          <div className="flex flex-col gap-4 mt-4 font-sans text-xs text-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Phone size={14} />
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">Atendimento Rápido</p>
                <p className="font-medium hover:text-white/80 transition-colors cursor-pointer">+55 (11) 99999-9999</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Mail size={14} />
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">E-mail Comercial</p>
                <p className="font-medium hover:text-white/80 transition-colors cursor-pointer">comercial@morae.studio</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <MapPin size={14} />
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">Localização</p>
                <p className="font-medium">São Paulo, Brasil (Atendimento Global Remoto)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand values + Social platforms integration cards */}
        <div className="flex flex-col gap-6 border-t border-white/5 pt-8">
          <div>
            <h5 className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-3">Redes Sociais & Canais de Vídeo</h5>
            <div className="flex flex-wrap gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0f0f0f] border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white text-xs transition-all duration-300 cursor-pointer"
              >
                <Instagram size={14} className="text-[#e1306c]" />
                <span>Instagram</span>
              </a>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0f0f0f] border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white text-xs transition-all duration-300 cursor-pointer"
              >
                <Youtube size={14} className="text-[#ff0000]" />
                <span>YouTube</span>
              </a>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 hover:bg-emerald-950/50 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 text-xs transition-all duration-300 cursor-pointer"
              >
                <MessageSquare size={14} className="text-emerald-500" />
                <span>WhatsApp Rápido</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
            <Award size={14} className="text-brand-purple-light" />
            <span>Pós-produção certificada e com altos índices de retenção.</span>
          </div>
        </div>

      </div>

      {/* Right Column: Functional interactive briefing Form & Slate Calculator (Cols 6-12) */}
      <div className="lg:col-span-7">
        <div className="glass-panel rounded-xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              // Active briefing input form
              <motion.div
                key="form-view"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h4 className="font-display text-lg font-light text-white mb-1 uppercase tracking-wider">
                    Formulário de Briefing Direto
                  </h4>
                  <p className="font-sans text-gray-400 text-xs">
                    Preencha as informações básicas para iniciar sua jornada cinematográfica.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Seu Nome *</label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Rodrigo Albuquerque"
                        className="w-full bg-black/80 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Seu E-mail *</label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: rodrigo@empresa.com"
                        className="w-full bg-black/80 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Formato do Vídeo</label>
                      <select
                        value={projectType}
                        disabled={isSubmitting}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-black/90 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                      >
                        <option value="Comerciais">Comerciais (Ads / Lançamentos)</option>
                        <option value="Videoclipes">Videoclipes Musicais</option>
                        <option value="Documentários">Documentários & Institucional</option>
                        <option value="Redes Sociais">Vídeos Curtos (Tiktok / Reels)</option>
                        <option value="Outro">Outros Formatos Artísticos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Complexidade do Projeto</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["baixo", "médio", "alto"].map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => setBudget(lvl)}
                            className={`py-2.5 rounded border text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                              budget === lvl
                                ? "bg-white text-black border-white shadow-md"
                                : "bg-black/85 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                            }`}
                          >
                            {lvl === "baixo" ? "Rápido" : lvl === "médio" ? "Premium" : "Cinema"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {initialProjectTitle && (
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Referência Escolhida</label>
                      <input
                        type="text"
                        disabled
                        value={customTitle}
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-white font-medium"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Seu Briefing / Instruções adicionais</label>
                    <textarea
                      rows={4}
                      disabled={isSubmitting}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Descreva detalhes como ritmo do vídeo, referências musicais ou efeitos desejados..."
                      className="w-full bg-black/80 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Rendering Estimator Sandbox below fields */}
                  <div className="p-3.5 bg-[#0a0a0a] border border-white/10 rounded-lg flex flex-col gap-2">
                    <p className="text-[9px] uppercase tracking-wider text-gray-500 font-mono font-bold flex items-center gap-1">
                      <Sparkles size={11} className="text-brand-purple-light" />
                      Estimativa Moræ Inteligente (Calculada em Tempo Real)
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[10px]">
                      <div>
                        <span className="text-gray-500 block">Canais de Vídeo:</span>
                        <span className="text-white font-bold">{(estimates.layers * (budget === "baixo" ? 0.7 : budget === "alto" ? 1.5 : 1.0)).toFixed(0)} canais</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Canais de Áudio:</span>
                        <span className="text-white font-bold">{(estimates.audio * (budget === "baixo" ? 0.6 : budget === "alto" ? 1.4 : 1.0)).toFixed(0)} tracks</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Tempo de Entrega:</span>
                        <span className="text-brand-purple-light font-bold">{budget === "baixo" ? "24h a 48h" : estimates.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button & Render Progress */}
                  <div className="mt-4 flex flex-col gap-3">
                    {isSubmitting ? (
                      <div className="w-full">
                        <div className="flex justify-between items-center text-[10px] font-mono text-brand-purple-light mb-1.5">
                          <span>RENDERIZANDO PROJETO...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-black rounded overflow-hidden border border-white/10">
                          <div
                            className="h-full bg-white transition-all duration-150"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-lg bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
                      >
                        <Send size={12} />
                        Enviar Briefing & Renderizar Estimativa
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            ) : (
              // Submitted View: Clapperboard Slate display of customized post production report!
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-6 py-6"
              >
                {/* Custom Clapperboard Aesthetic Frame */}
                <div className="border-2 border-dashed border-white/15 bg-[#0f0f0f] rounded-xl p-6 flex flex-col gap-5 text-left font-mono">
                  
                  {/* Clapperboard Chevron Stripes Top */}
                  <div className="flex justify-between items-center bg-zinc-900 border-b-2 border-black p-2 rounded-t text-white text-[10px] font-bold tracking-widest">
                    <span>🎬 MORÆ STUDIO SLATE</span>
                    <span className="text-brand-purple-light">PROJETO DE POST_ESTIMADO</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs border-b border-gray-900 pb-4">
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase">DIRETOR DE EDICÃO</span>
                      <span className="text-white font-bold uppercase">{name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase">CONTATO BRIEFING</span>
                      <span className="text-white font-medium">{email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs border-b border-gray-900 pb-4">
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase">FORMATO SOLICITADO</span>
                      <span className="text-brand-purple-light font-bold uppercase flex items-center gap-1">
                        <Scissors size={10} />
                        {projectType}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase">GRAU DE COMPLEXIDADE</span>
                      <span className="text-white font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-brand-purple/10 border border-brand-purple/20">
                        {budget === "baixo" ? "Celeridade Rápida" : budget === "médio" ? "Premium Studio" : "Full Cinema Grade"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">REPORT DE PÓS-PRODUÇÃO SUGERIDO</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="bg-black border border-white/5 p-3 rounded">
                        <p className="text-[8px] text-gray-500 uppercase flex items-center gap-1">
                          <Sliders size={10} className="text-brand-purple-light" />
                          LUT Recomendada
                        </p>
                        <p className="text-white font-bold text-xs mt-1">{estimates.colorGrading}</p>
                      </div>

                      <div className="bg-black border border-white/5 p-3 rounded">
                        <p className="text-[8px] text-gray-500 uppercase flex items-center gap-1">
                          <FileText size={10} className="text-brand-purple-light" />
                          Canais Linha de Tempo
                        </p>
                        <p className="text-white font-bold text-xs mt-1">
                          {(estimates.layers * (budget === "baixo" ? 0.7 : budget === "alto" ? 1.5 : 1.0)).toFixed(0)} Camadas
                        </p>
                      </div>

                      <div className="bg-black border border-white/5 p-3 rounded">
                        <p className="text-[8px] text-gray-500 uppercase flex items-center gap-1">
                          <Calendar size={10} className="text-brand-purple-light" />
                          Prazo Estimado
                        </p>
                        <p className="text-emerald-400 font-bold text-xs mt-1">
                          {budget === "baixo" ? "24h a 48h" : estimates.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {message && (
                    <div className="p-3 bg-white/5 rounded border border-white/5">
                      <p className="text-[8px] text-gray-500 uppercase">NOTAS DE OBSERVAÇÃO DO DIRETOR</p>
                      <p className="text-gray-300 text-[11px] leading-relaxed mt-1 italic">"{message}"</p>
                    </div>
                  )}

                  {/* Estimated length notes */}
                  <div className="flex items-center gap-2 p-3 bg-brand-purple/10 rounded text-brand-purple-light text-[11px]">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>Nossos editores foram notificados. Uma proposta formal detalhada de colorometria e trilhas sonoras foi enviada para o seu e-mail em formato PDF.</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage("");
                    }}
                    className="flex-1 py-3 bg-white/5 border border-gray-800 hover:border-brand-purple text-white text-xs uppercase tracking-widest font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    Enviar Outro Briefing
                  </button>

                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare size={14} />
                    Acelerar no WhatsApp
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </section>
  );
}
