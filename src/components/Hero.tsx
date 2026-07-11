import React, { useState, useEffect } from "react";
import { Play, Pause, RefreshCw, Layers, Sliders, Volume2, Film, Sparkles, Radio } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  onExplorePortfolio: () => void;
  onContact: () => void;
  lang: "pt" | "en";
}

type GradingMode = "log" | "rec709" | "cinema" | "retro";

export default function Hero({ onExplorePortfolio, onContact, lang }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [grading, setGrading] = useState<GradingMode>("cinema");
  const [timecode, setTimecode] = useState("00:14:23");
  const [activeTrack, setActiveTrack] = useState(1);
  const [soundWave, setSoundWave] = useState<number[]>([]);

  // Typewriter effect state and logic
  const words = lang === "pt"
    ? ["Edição Premiada", "Ritmo Implacável", "Visual Autoral"]
    : ["Award-winning Editing", "Relentless Rhythm", "Authorial Visuals"];

  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  // Sync / Reset typewriter when language changes to prevent index issues or wrong words
  useEffect(() => {
    setCurrentText("");
    setIsDeleting(false);
    setWordIndex(0);
    setSpeed(150);
  }, [lang]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = words[wordIndex % words.length];

    const handleType = () => {
      if (!isDeleting) {
        const nextText = activeWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        setSpeed(100);

        if (nextText === activeWord) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        const nextText = activeWord.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        setSpeed(50);

        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setSpeed(200);
          return;
        }
      }
    };

    timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, lang, speed]);

  // Simulate video timecode running
  useEffect(() => {
    let frame = 0;
    let seconds = 14;
    let minutes = 23;

    const interval = setInterval(() => {
      if (!isPlaying) return;
      frame += 1;
      if (frame >= 24) {
        frame = 0;
        seconds += 1;
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }
      }

      const fStr = frame.toString().padStart(2, "0");
      const sStr = seconds.toString().padStart(2, "0");
      const mStr = minutes.toString().padStart(2, "0");
      setTimecode(`00:${mStr}:${sStr}:${fStr}`);
    }, 41); // Roughly 24 frames per second

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Generate dynamic wave values for the sound design layer
  useEffect(() => {
    const generateWave = () => {
      const arr = [];
      const count = 30;
      for (let i = 0; i < count; i++) {
        arr.push(Math.random() * (isPlaying ? 35 : 5) + 5);
      }
      setSoundWave(arr);
    };
    generateWave();
    const interval = setInterval(generateWave, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Color profiles description
  const gradingProfiles = {
    log: {
      name: lang === "pt" ? "C-LOG (Cru/Raw)" : "C-LOG (Raw/Unprocessed)",
      style: "grayscale(0.3) contrast(0.6) brightness(1.2) sepia(0.05)",
      desc: lang === "pt" 
        ? "Footage plano e lavado de câmera de cinema de 10-bits. Pronto para receber o processo de LUT e colorização criativa."
        : "Flat and washed footage from a 10-bit cinema camera. Ready to receive LUT application and creative color grading."
    },
    rec709: {
      name: lang === "pt" ? "Rec.709 (Padrão)" : "Rec.709 (Standard)",
      style: "contrast(1.0) brightness(1.0) saturate(1.0)",
      desc: lang === "pt"
        ? "Conversão primária correta de cores para telas convencionais. Tons de pele naturais e cores fiéis à realidade."
        : "Correct primary color conversion for conventional screens. Natural skin tones and true-to-life color fidelity."
    },
    cinema: {
      name: "Moræ Ultraviolet (Cinema)",
      style: "contrast(1.35) brightness(1.02) saturate(1.15) sepia(0.1) hue-rotate(240deg)",
      desc: lang === "pt"
        ? "A nossa assinatura visual. Pretos profundos de alta gama, sombras púrpuras dramáticas e realces néon de alto impacto."
        : "Our visual signature. High-end deep blacks, dramatic purple shadows, and high-impact neon highlights."
    },
    retro: {
      name: lang === "pt" ? "Retro 35mm (Vintage)" : "Retro 35mm (Vintage Film)",
      style: "contrast(1.1) brightness(0.9) saturate(0.8) sepia(0.25) hue-rotate(15deg)",
      desc: lang === "pt"
        ? "Simulação orgânica de película analógica de 35mm com tons quentes e grão cinematográfico adicionado artificialmente."
        : "Organic simulation of 35mm analog film with warm tones and artificially added cinematic grain."
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-[#050505]">
      
      {/* Background Neon Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-brand-purple-dark/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Background Cinematic Lens Flare Overlay */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-purple/10 to-transparent pointer-events-none z-0 shadow-[0_0_20px_1px_rgba(168,85,247,0.08)]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Hero Headline and Details (Left Column) */}
        <div className="lg:col-span-5 flex flex-col gap-8 text-left text-glow-container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-white/10 bg-white/5 w-fit">
            <Radio size={12} className="text-brand-purple animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-300 font-medium">
              {lang === "pt" ? "ESTÚDIO DE PÓS-PRODUÇÃO PREMIUM" : "PREMIUM POST-PRODUCTION STUDIO"}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-light tracking-tight leading-[1.1] text-white uppercase min-h-[2.8em] sm:min-h-[2.4em] lg:min-h-[2.6em] xl:min-h-[2.4em]">
            {lang === "pt" ? "Cortes " : "Subtle "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light via-brand-purple to-purple-400 font-normal">
              {lang === "pt" ? "Sutis" : "Cuts"}
            </span>.<br />
            <span className="text-white font-normal transition-all duration-100">{currentText}</span>
            <span className="text-brand-purple-light animate-pulse ml-1">|</span>
          </h1>

          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg">
            {lang === "pt" ? (
              <>
                A <strong>Moræ</strong> transforma gravações brutas em experiências cinematográficas imersivas. Criamos montagens de alto ritmo, colorização cirúrgica e design de som tátil que elevam a retenção do seu conteúdo ao nível máximo.
              </>
            ) : (
              <>
                <strong>Moræ</strong> transforms raw recordings into immersive cinematic experiences. We craft high-tempo editing, surgical color grading, and tactile sound design that elevate your content retention to the absolute maximum.
              </>
            )}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onExplorePortfolio}
              className="px-6 py-3.5 rounded-lg bg-white text-black hover:bg-brand-purple hover:text-white transition-all duration-300 font-sans text-xs uppercase tracking-widest font-bold cursor-pointer"
            >
              {lang === "pt" ? "Ver Portfólio" : "View Portfolio"}
            </button>
            <button
              onClick={onContact}
              className="px-6 py-3.5 rounded-lg border border-white/10 hover:border-white bg-transparent text-white hover:bg-white/5 transition-all duration-300 font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer"
            >
              {lang === "pt" ? "Solicitar Orçamento" : "Get a Quote"}
            </button>
          </div>

          {/* Quick studio stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
            <div>
              <p className="font-display text-2xl font-light text-white">48M+</p>
              <p className="text-[9px] uppercase tracking-wider text-gray-500">
                {lang === "pt" ? "Visualizações de Clientes" : "Client Video Views"}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-light text-white">100%</p>
              <p className="text-[9px] uppercase tracking-wider text-gray-500">
                {lang === "pt" ? "Fidelidade de Áudio" : "Audio Fidelity"}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-light text-white">&lt;48h</p>
              <p className="text-[9px] uppercase tracking-wider text-gray-500">
                {lang === "pt" ? "Prazo de Entrega (Shorts)" : "Shorts Turnaround"}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Video Editor Simulator (Right Column) */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          <div className="glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
            
            {/* 1. Interface Header / Timecode & Track Monitor */}
            <div className="bg-[#0a0a0a]/90 px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="tracking-wider uppercase font-sans text-[10px] font-bold text-white">
                  Moræ Engine v2.0
                </span>
              </div>
              <div className="bg-black/60 px-3 py-1 rounded border border-white/10 text-brand-purple-light font-semibold tracking-wider">
                {timecode}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <Film size={12} />
                <span>24 FPS</span>
              </div>
            </div>

            {/* 2. Main Playback Screen */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              
              {/* Cinematic grid overlay toggleable */}
              <div className="absolute inset-0 pointer-events-none z-20 border-[0.5px] border-white/5">
                {/* Rule of Thirds Lines */}
                <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white/5"></div>
                <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-white/5"></div>
                <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/5"></div>
                <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-white/5"></div>
                
                {/* Aspect ratio frame lines */}
                <div className="absolute inset-x-0 top-0 h-4 bg-black/60 border-b border-white/5"></div>
                <div className="absolute inset-x-0 bottom-0 h-4 bg-black/60 border-t border-white/5"></div>
                
                {/* Center marker crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <div className="w-[1px] h-3 bg-white/20"></div>
                  <div className="h-[1px] w-3 bg-white/20 absolute"></div>
                </div>
              </div>

              {/* Simulated Video Canvas */}
              <div 
                className="w-full h-full relative transition-all duration-700 flex flex-col items-center justify-center p-6 text-center"
                style={{ filter: gradingProfiles[grading].style }}
              >
                {/* Video Footage Placeholder Visual - Dark Cinematic Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#120024] via-[#050014] to-[#1e1135] z-0"></div>
                
                {/* Aesthetic Raven & Shark dynamic backdrop */}
                <div className="relative z-10 flex flex-col items-center gap-4 text-white p-4">
                  
                  {/* Floating abstract bird & fish shapes moving when active */}
                  <motion.div
                    animate={{
                      y: isPlaying ? [0, -10, 0] : 0,
                      rotate: isPlaying ? [0, 4, -4, 0] : 0,
                    }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="w-24 h-24 text-brand-purple-light flex items-center justify-center"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                      <path d="M50,15 C20,15 15,40 30,55 C45,70 60,75 75,55 C90,35 80,15 50,15 Z" fillOpacity="0.15" />
                      {/* Raven */}
                      <path d="M 50,22 C 45,28 35,26 38,32 C 40,34 45,31 48,29 C 49,28 50,29 50,30" fill="currentColor" />
                      {/* Shark */}
                      <path d="M 45,45 C 55,46 65,50 75,55 C 70,58 66,64 62,56" fill="currentColor" />
                    </svg>
                  </motion.div>

                  <div>
                    <h3 className="font-display text-xl font-bold tracking-widest text-white uppercase">
                      Moræ Showreel 2026
                    </h3>
                    <p className="text-[10px] tracking-[0.2em] text-brand-purple-light mt-1 uppercase">
                      DIRETÓRIO / PROD_044_REEL.RAW
                    </p>
                  </div>
                  
                  {/* Subtle video artifacts if Retro is selected */}
                  {grading === "retro" && (
                    <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay animate-pulse z-30">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/15 animate-bounce"></div>
                      <p className="absolute bottom-4 left-4 font-mono text-[8px] text-amber-500/80">35MM FILM GAIN_400X</p>
                    </div>
                  )}

                  {/* FLAT LOG indicator */}
                  {grading === "log" && (
                    <span className="absolute bottom-4 left-4 bg-white/10 text-white border border-white/20 text-[8px] font-mono px-2 py-0.5 rounded tracking-widest">
                      LOG_PROFILE_FLAT
                    </span>
                  )}
                </div>

                {/* Subtitle / Telemetry Text */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[9px] uppercase tracking-[0.3em] font-mono text-white/70 bg-black/40 px-3 py-1 rounded backdrop-blur-sm whitespace-nowrap">
                  {isPlaying 
                    ? lang === "pt" ? "» Executando cortes dinâmicos..." : "» Running dynamic cuts..." 
                    : lang === "pt" ? "⏸ Pausado no Frame 342" : "⏸ Paused on Frame 342"}
                </div>
              </div>

              {/* Pause/Play Hover overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center"
                  >
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="p-5 rounded-full bg-brand-purple text-white shadow-2xl shadow-brand-purple hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Play size={24} fill="white" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Color Grading LUT Controller Panels */}
            <div className="bg-[#0c0c0c] px-4 py-4 border-t border-white/5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-sans font-bold flex items-center gap-1">
                  <Sliders size={12} className="text-brand-purple-light" />
                  {lang === "pt" ? "Color Grading & Correção de Cor (LUTs)" : "Color Grading & Color Correction (LUTs)"}
                </span>
                <span className="text-[9px] font-mono text-brand-purple-light">
                  {gradingProfiles[grading].name}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(gradingProfiles) as GradingMode[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setGrading(key)}
                    className={`px-2 py-2 rounded text-[10px] font-medium transition-all duration-300 cursor-pointer ${
                      grading === key
                        ? "bg-brand-purple text-white font-bold border border-brand-purple-light"
                        : "bg-black/40 hover:bg-black text-gray-400 border border-transparent"
                    }`}
                  >
                    {key === "log" ? "RAW LOG" : key === "rec709" ? "REC.709" : key === "cinema" ? "ULTRAVIOLET" : "RETRO 35MM"}
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-gray-500 leading-normal italic min-h-[30px]">
                {gradingProfiles[grading].desc}
              </p>
            </div>

            {/* 4. Audio Waveform Timeline Visualizer */}
            <div className="bg-[#070707] px-4 py-3 border-t border-white/5 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-3 flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded bg-brand-purple/10 hover:bg-brand-purple text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                </button>
                
                <span className="text-[9px] font-mono text-gray-400 tracking-wider">
                  TRACK_0{activeTrack}
                </span>
              </div>

              {/* Interactive Audio waves */}
              <div className="col-span-9 flex items-end gap-[2px] h-[35px] px-2 bg-black/50 rounded border border-white/5">
                {soundWave.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all duration-150"
                    style={{
                      height: `${h}%`,
                      backgroundColor: isPlaying
                        ? i % 4 === 0
                          ? "#c084fc"
                          : "#9333ea"
                        : "#2e1065",
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* 5. Post Production Multi-Track Timeline */}
            <div className="bg-[#090909] px-4 py-3 border-t border-white/5 flex flex-col gap-2">
              {/* Timeline markers */}
              <div className="flex justify-between text-[8px] font-mono text-gray-600 border-b border-white/5 pb-1">
                <span>00:00:00</span>
                <span>00:10:00</span>
                <span>00:20:00</span>
                <span>00:30:00</span>
                <span>00:40:00</span>
                <span>00:50:00</span>
              </div>
              
              {/* V1 - Video Cuts Track */}
              <div className="flex items-center gap-2">
                <span className="w-6 text-[8px] font-mono text-gray-400 font-bold uppercase">Video</span>
                <div className="flex-1 flex gap-1 h-4">
                  <div className={`flex-1 rounded ${grading === "log" ? "bg-gray-700" : "bg-brand-purple/40"} border border-brand-purple-light/20 flex items-center justify-center text-[7px] font-mono text-white/50`}>
                    {lang === "pt" ? "Corte 01" : "Cut 01"}
                  </div>
                  <div className={`w-[25%] rounded ${grading === "log" ? "bg-gray-600" : "bg-brand-purple/60"} border border-brand-purple-light/30 flex items-center justify-center text-[7px] font-mono text-white/80`}>Glitch</div>
                  <div className={`w-[35%] rounded ${grading === "log" ? "bg-gray-800" : "bg-brand-purple/20"} border border-brand-purple-light/10 flex items-center justify-center text-[7px] font-mono text-white/30`}>
                    {lang === "pt" ? "Transição" : "Transition"}
                  </div>
                </div>
              </div>

              {/* A1 - Audio Track */}
              <div className="flex items-center gap-2">
                <span className="w-6 text-[8px] font-mono text-gray-400 font-bold uppercase">Audio</span>
                <div className="flex-1 flex gap-1 h-4">
                  <div className="w-[40%] rounded bg-[#1c0c3a]/60 border border-purple-900/20 flex items-center justify-center text-[7px] font-mono text-white/40">Beat_Sync.wav</div>
                  <div className="flex-1 rounded bg-[#1c0c3a]/40 border border-purple-950/20 flex items-center justify-center text-[7px] font-mono text-white/30">SFX_Impact.mp3</div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="flex items-center justify-between text-[11px] text-gray-500 px-2">
            <span className="flex items-center gap-1.5 font-mono">
              <Sparkles size={11} className="text-brand-purple-light" />
              {lang === "pt" ? "Tente alternar os perfis de cor acima!" : "Try switching color profiles above!"}
            </span>
            <span className="font-mono">Time remap: ON</span>
          </div>
        </div>

      </div>
    </section>
  );
}
