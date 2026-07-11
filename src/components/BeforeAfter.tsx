import React, { useState, useRef, MouseEvent, TouchEvent } from "react";
import { Sliders, Sparkles, Image as ImageIcon } from "lucide-react";

interface BeforeAfterProps {
  imageUrl?: string;
  beforeFilter?: string;
  afterFilter?: string;
  title?: string;
  description?: string;
  lang?: "pt" | "en";
}

export default function BeforeAfter({
  imageUrl = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200", // High quality movie theater / cinematic photo
  beforeFilter = "grayscale(0.7) contrast(0.6) brightness(1.2) blur(0.5px)",
  afterFilter = "contrast(1.35) brightness(1.02) saturate(1.25) hue-rotate(240deg) drop-shadow(0px 0px 10px rgba(147, 51, 234, 0.4))",
  title,
  description,
  lang = "pt"
}: BeforeAfterProps) {
  const displayTitle = title || (lang === "pt" ? "A Mágica da Colorização" : "The Magic of Colorization");
  const displayDescription = description || (lang === "pt" 
    ? "Deslize o cursor para comparar a gravação bruta em perfil LOG (Sem Cor) com o nosso color grading profissional (Ultraviolet)."
    : "Drag the slider to compare raw log footage (flat profile) with our signature Ultraviolet color grading.");

  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Descriptive Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-brand-purple-light text-xs font-mono uppercase tracking-widest">
          <Sliders size={14} />
          <span>{lang === "pt" ? "Controle de Gradação" : "Grading Control"}</span>
        </div>
        <h3 className="font-display text-2xl font-light text-white tracking-tight uppercase">
          {displayTitle}
        </h3>
        <p className="font-sans text-gray-400 text-xs leading-relaxed max-w-xl">
          {displayDescription}
        </p>
      </div>

      {/* Slider Visual Arena */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        onMouseLeave={handleEnd}
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize border border-white/10 shadow-2xl select-none"
        id="color-grading-slider-container"
      >
        
        {/* Layer 1: BEFORE Color Grading (Flat LOG) */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-150"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            filter: beforeFilter
          }}
        >
          {/* Label Tag Left */}
          <span className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded bg-black/60 text-white font-mono text-[9px] uppercase tracking-widest border border-white/10 backdrop-blur-sm">
            {lang === "pt" ? "C-LOG (Bruto)" : "C-LOG (Raw)"}
          </span>
        </div>

        {/* Layer 2: AFTER Color Grading (Graded Artwork) */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-150"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            filter: afterFilter,
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
          }}
        >
          {/* Label Tag Right */}
          <span className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded bg-brand-purple/90 text-white font-mono text-[9px] uppercase tracking-widest border border-white/10 backdrop-blur-sm">
            Morae Cinema
          </span>
        </div>

        {/* Slideline divider bar */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 z-20 shadow-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center handle badge button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black border-2 border-white flex items-center justify-center shadow-lg cursor-ew-resize">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
              <path d="m15 18-6-6 6-6" />
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>

        {/* Instructions Overlay that disappears on hover/move */}
        <div className="absolute inset-x-0 top-4 flex justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-black/75 text-white/90 text-[10px] uppercase tracking-widest font-mono flex items-center gap-1.5 shadow backdrop-blur-sm">
            <Sparkles size={10} className="text-brand-purple-light animate-pulse" />
            {lang === "pt" ? "Arraste para colorir" : "Drag to Grade"}
          </span>
        </div>

      </div>

      {/* Grading values display panel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0c0c0c]/80 border border-white/5 rounded-xl p-4 text-center">
        <div>
          <p className="text-[9px] uppercase tracking-wider text-gray-500">
            {lang === "pt" ? "Exposição" : "Exposure"}
          </p>
          <p className="font-mono text-xs text-white font-medium">{sliderPosition > 50 ? "+0.15 Ev" : "+0.00 Ev"}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-gray-500">
            {lang === "pt" ? "Contraste" : "Contrast"}
          </p>
          <p className="font-mono text-xs text-white font-medium">{sliderPosition > 50 ? "+32%" : "0%"}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-gray-500">
            {lang === "pt" ? "Saturação Roxo" : "Purple Saturation"}
          </p>
          <p className="font-mono text-xs text-brand-purple-light font-bold">
            {sliderPosition > 50 
              ? lang === "pt" ? "135% Ativo" : "135% Active" 
              : lang === "pt" ? "0% Flat" : "0% Flat"}
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-gray-500">
            {lang === "pt" ? "LUT Aplicada" : "LUT Applied"}
          </p>
          <p className="font-mono text-xs text-brand-purple-light font-bold">
            {sliderPosition > 50 
              ? "M_ULTRA_v2" 
              : lang === "pt" ? "NENHUMA" : "NONE"}
          </p>
        </div>
      </div>

    </div>
  );
}
