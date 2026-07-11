import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageSquare, 
  Share2, 
  Sparkles, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  CheckCircle2, 
  Disc,
  Compass,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

interface ShortsItem {
  id: string;
  title: string;
  category: string;
  hashtag: string;
  views: string;
  likes: string;
  comments: string;
  videoUrl: string;
  projectId: string;
}

const SHORTS_DATA: ShortsItem[] = [
  {
    id: "shorts-shark",
    title: "Shark Bite Energy",
    category: "Comercial",
    hashtag: "#beatsync #editing #foley",
    views: "148K",
    likes: "12.4K",
    comments: "482",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-drums-42410-large.mp4",
    projectId: "shark-bite",
  },
  {
    id: "shorts-raven",
    title: "Voo do Corvo",
    category: "Videoclipe",
    hashtag: "#matchcut #cinematic #grading",
    views: "94K",
    likes: "8.1K",
    comments: "312",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-lens-of-a-camera-with-reflections-of-colored-lights-42407-large.mp4",
    projectId: "voo-corvo",
  },
  {
    id: "shorts-fashion",
    title: "Sombra & Luz",
    category: "Fashion / Moda",
    hashtag: "#slowmotion #textura #aesthetic",
    views: "210K",
    likes: "18.3K",
    comments: "593",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-her-smartphone-in-vertical-mode-41225-large.mp4",
    projectId: "sombra-luz",
  },
  {
    id: "shorts-doc",
    title: "Profundezas de Si",
    category: "Documentário",
    hashtag: "#storytelling #film #analog",
    views: "65K",
    likes: "4.2K",
    comments: "189",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-view-of-a-subway-station-with-neon-lights-42203-large.mp4",
    projectId: "profundezas-si",
  },
  {
    id: "shorts-tech",
    title: "Tech Showcase",
    category: "Redes Sociais",
    hashtag: "#reels #tiktok #transitions",
    views: "320K",
    likes: "27.5K",
    comments: "841",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-building-at-night-42171-large.mp4",
    projectId: "tech-showcase",
  },
  {
    id: "shorts-sound",
    title: "Sound FX Tátil",
    category: "Sound Design",
    hashtag: "#foley #immersion #audio",
    views: "185K",
    likes: "15.9K",
    comments: "604",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-editor-working-on-a-soundboard-42398-large.mp4",
    projectId: "shark-bite",
  }
];

interface ShortsCylinderProps {
  onQuoteForProject?: (projectId: string) => void;
  lang?: "pt" | "en";
}

export default function ShortsCylinder({ onQuoteForProject, lang = "pt" }: ShortsCylinderProps) {
  // Rotations
  const [rotationX, setRotationX] = useState(-10); // slightly tilted downward to view 3D faces from above
  const [rotationY, setRotationY] = useState(12);  // slightly yawed
  const [isDragging, setIsDragging] = useState(false);
  const [autoSpin, setAutoSpin] = useState(true);

  // Subtle Mouse Parallax offsets
  const [parallaxX, setParallaxX] = useState(0); // pitch offset
  const [parallaxY, setParallaxY] = useState(0); // yaw offset
  
  // Audio control: we can unmute one video at a time
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);
  
  // Likes state
  const [likedList, setLikedList] = useState<string[]>([]);
  
  // Modal states
  const [selectedShort, setSelectedShort] = useState<ShortsItem | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [modalMuted, setModalMuted] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const pointerDownRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync modal video playback with controls
  useEffect(() => {
    if (selectedShort && modalVideoRef.current) {
      modalVideoRef.current.muted = modalMuted;
      if (modalPlaying) {
        modalVideoRef.current.play().catch(() => {});
      } else {
        modalVideoRef.current.pause();
      }
    }
  }, [selectedShort, modalMuted, modalPlaying]);

  // Auto spin effect
  useEffect(() => {
    if (!autoSpin || isDragging) return;
    
    let frameId: number;
    const update = () => {
      setRotationX((prev) => (prev + 0.15) % 360);
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [autoSpin, isDragging]);

  // Audio syncer
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (unmutedIndex === i) {
          video.muted = false;
          // Play just in case it was paused
          video.play().catch(() => {});
        } else {
          video.muted = true;
        }
      }
    });
  }, [unmutedIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoSpin(false); // Stop auto spin when user interacts
    pointerDownRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotationX,
      rotY: rotationY
    };
    dragStartPosRef.current = {
      x: e.clientX,
      y: e.clientY
    };
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - pointerDownRef.current.x;
      const deltaY = e.clientY - pointerDownRef.current.y;
      
      // Dragging vertically rolls the cylinder around its horizontal X-axis
      // Dragging horizontally rotates around vertical Y-axis
      setRotationX(pointerDownRef.current.rotX - deltaY * 0.45);
      setRotationY(pointerDownRef.current.rotY + deltaX * 0.45);
      
      // Clear parallax offsets while active dragging is occurring
      setParallaxX(0);
      setParallaxY(0);
    } else {
      // Subtle mouse-move parallax effect
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const normX = mouseX / (rect.width / 2);
      const normY = mouseY / (rect.height / 2);
      
      // Highly responsive tilt: max -6/+6 degrees pitch and max -8/+8 degrees yaw
      setParallaxX(-normY * 6);
      setParallaxY(normX * 8);
    }
  };

  const handlePointerLeave = () => {
    // Smoothly restore default orientation when pointer leaves the 3D stage area
    setParallaxX(0);
    setParallaxY(0);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const toggleMute = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (unmutedIndex === index) {
      setUnmutedIndex(null);
    } else {
      setUnmutedIndex(index);
    }
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedList.includes(id)) {
      setLikedList(likedList.filter((item) => item !== id));
    } else {
      setLikedList([...likedList, id]);
    }
  };

  const resetRotation = () => {
    setRotationX(-10);
    setRotationY(12);
    setParallaxX(0);
    setParallaxY(0);
    setAutoSpin(true);
  };

  // N = 6 faces. Radius for height = 390px
  // radius = h / (2 * tan(360 / (2 * N))) = 390 / (2 * tan(30)) = 390 / 1.1547 = 338px
  const radius = 338; 

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Interactive Helper Text */}
      <div className="flex items-center gap-2 mb-8 bg-white/5 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm animate-pulse">
        <Compass size={14} className="text-brand-purple-light" />
        <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
          {isDragging 
            ? (lang === "pt" ? "GIRANDO O CILINDRO..." : "DRAGGING CYLINDER...") 
            : (lang === "pt" ? "CLIQUE PARA AMPLIAR • ARRASTE EM QUALQUER DIREÇÃO" : "CLICK TO EXPAND • DRAG IN ANY DIRECTION")}
        </span>
      </div>

      {/* 3D Perspective Stage Container */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="w-full max-w-4xl h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none relative overflow-visible"
        style={{ 
          perspective: "1600px",
          touchAction: "none"
        }}
        id="shorts-3d-cylinder-stage"
      >
        {/* Soft background ambient glow matching current active angle */}
        <div className="absolute w-[450px] h-[450px] bg-brand-purple-dark/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        {/* The Rotatable Cylinder */}
        <div 
          className="relative w-[220px] h-[390px]"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotationX + parallaxX}deg) rotateY(${rotationY + parallaxY}deg)`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)"
          }}
        >
          {/* Left Side Cap (with Company Logo) */}
          <div
            className="absolute top-1/2 left-1/2 rounded-full border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden pointer-events-none"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              transform: `translate(-50%, -50%) translateX(-110px) rotateY(-90deg)`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "radial-gradient(circle, #0e0a1b 0%, #030303 75%, #000000 100%)",
            }}
          >
            {/* Concentric rings to simulate record/metallic look */}
            <div className="absolute inset-6 rounded-full border border-dashed border-white/5"></div>
            <div className="absolute inset-16 rounded-full border border-white/5"></div>
            <div className="absolute inset-32 rounded-full border border-dashed border-white/5"></div>
            <div className="absolute inset-48 rounded-full border border-white/5"></div>
            
            {/* Elegant Glow and Logo */}
            <div className="flex flex-col items-center justify-center transform scale-[1.3] relative z-10">
              <Logo size={42} />
              <span className="font-display text-[8px] uppercase tracking-[0.4em] text-white/70 mt-1 font-light">Moræ</span>
            </div>
          </div>

          {/* Right Side Cap (with Company Logo) */}
          <div
            className="absolute top-1/2 left-1/2 rounded-full border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden pointer-events-none"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              transform: `translate(-50%, -50%) translateX(110px) rotateY(90deg)`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "radial-gradient(circle, #0e0a1b 0%, #030303 75%, #000000 100%)",
            }}
          >
            {/* Concentric rings */}
            <div className="absolute inset-6 rounded-full border border-dashed border-white/5"></div>
            <div className="absolute inset-16 rounded-full border border-white/5"></div>
            <div className="absolute inset-32 rounded-full border border-dashed border-white/5"></div>
            <div className="absolute inset-48 rounded-full border border-white/5"></div>
            
            {/* Elegant Glow and Logo */}
            <div className="flex flex-col items-center justify-center transform scale-[1.3] relative z-10">
              <Logo size={42} />
              <span className="font-display text-[8px] uppercase tracking-[0.4em] text-white/70 mt-1 font-light">Moræ</span>
            </div>
          </div>

          {SHORTS_DATA.map((shorts, index) => {
            const angle = index * 60; // 360deg / 6 faces = 60deg each
            const isLiked = likedList.includes(shorts.id);
            const isUnmuted = unmutedIndex === index;

            return (
              <div
                key={shorts.id}
                onClick={(e) => {
                  const deltaX = Math.abs(e.clientX - dragStartPosRef.current.x);
                  const deltaY = Math.abs(e.clientY - dragStartPosRef.current.y);
                  if (deltaX < 20 && deltaY < 20) {
                    setSelectedShort(shorts);
                    setAutoSpin(false);
                  }
                }}
                className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden border border-white/10 bg-[#070707] shadow-2xl transition-all duration-300 cursor-pointer hover:border-brand-purple-light/50"
                style={{
                  transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  boxShadow: isUnmuted 
                    ? "0 0 35px rgba(168, 85, 247, 0.25), inset 0 0 15px rgba(255,255,255,0.05)" 
                    : "0 10px 30px rgba(0,0,0,0.8), inset 0 0 15px rgba(255,255,255,0.05)"
                }}
              >
                {/* Smartphone Bezel Styling top notch */}
                <div className="absolute top-0 inset-x-0 h-4 bg-black/90 z-20 flex justify-center items-center">
                  <div className="w-16 h-3 bg-zinc-800 rounded-b-md"></div>
                </div>

                {/* Vertical Video Frame */}
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={shorts.videoUrl}
                  loop
                  muted={!isUnmuted}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 z-10 pointer-events-none"></div>

                {/* Left side category/status indicator */}
                <div className="absolute top-6 left-4 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-purple-light animate-ping"></span>
                  <span className="font-sans text-[8px] uppercase tracking-wider text-white font-medium">{shorts.category}</span>
                </div>

                {/* Audio/Mute Floating Button - Top Right */}
                <button
                  onClick={(e) => toggleMute(index, e)}
                  className={`absolute top-6 right-4 z-20 p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                    isUnmuted 
                      ? "bg-brand-purple text-white border-brand-purple-light scale-110 shadow-lg" 
                      : "bg-black/60 text-gray-300 border-white/15 hover:border-white/40 hover:text-white"
                  }`}
                  title={isUnmuted ? "Mudar" : "Ativar som"}
                >
                  {isUnmuted ? <Volume2 size={11} /> : <VolumeX size={11} />}
                </button>

                {/* Right Column Interaction Panel (TikTok / Shorts Style) */}
                <div className="absolute right-3 bottom-16 z-20 flex flex-col gap-4 items-center">
                  
                  {/* Like Button */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={(e) => toggleLike(shorts.id, e)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border backdrop-blur-md transition-all cursor-pointer ${
                        isLiked 
                          ? "bg-red-500 text-white border-red-400 scale-110" 
                          : "bg-black/40 text-gray-300 border-white/10 hover:text-white hover:bg-black/60"
                      }`}
                    >
                      <Heart size={12} className={isLiked ? "fill-current" : ""} />
                    </button>
                    <span className="font-mono text-[8px] text-gray-400 mt-1">
                      {isLiked ? "12.5K" : shorts.likes}
                    </span>
                  </div>

                  {/* Comment Button */}
                  <div className="flex flex-col items-center">
                    <button className="w-8 h-8 rounded-full bg-black/40 text-gray-300 border border-white/10 flex items-center justify-center hover:text-white hover:bg-black/60 transition-all">
                      <MessageSquare size={12} />
                    </button>
                    <span className="font-mono text-[8px] text-gray-400 mt-1">{shorts.comments}</span>
                  </div>

                  {/* Share button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onQuoteForProject) onQuoteForProject(shorts.projectId);
                    }}
                    className="w-8 h-8 rounded-full bg-black/40 text-gray-300 border border-white/10 flex items-center justify-center hover:text-white hover:bg-black/60 transition-all cursor-pointer"
                    title="Pedir Orçamento para esta Edição"
                  >
                    <Share2 size={12} />
                  </button>

                </div>

                {/* Left Bottom Video Description Block (Shorts Style) */}
                <div className="absolute left-4 bottom-4 right-14 z-20 text-left flex flex-col gap-1 select-none">
                  
                  {/* Account Name with Verified Badge */}
                  <div className="flex items-center gap-1">
                    <span className="font-sans font-semibold text-[10px] text-white">@morae.studio</span>
                    <CheckCircle2 size={9} className="text-[#38bdf8] fill-current" />
                  </div>

                  {/* Video Title */}
                  <h5 className="font-display font-medium text-white text-[11px] leading-tight tracking-wide">
                    {shorts.title}
                  </h5>

                  {/* Custom Hashtags */}
                  <p className="font-sans text-[8px] text-gray-400 font-medium">
                    {shorts.hashtag}
                  </p>

                  {/* Views indicator */}
                  <div className="flex items-center gap-1 text-[8px] text-zinc-500 font-mono mt-0.5">
                    <Eye size={8} />
                    <span>{shorts.views} Visualizações</span>
                  </div>

                </div>

                {/* Spinning vinyl logo in bottom right */}
                <div className="absolute right-3 bottom-4 z-20">
                  <div className={`w-7 h-7 rounded-full bg-black border border-zinc-800 flex items-center justify-center ${isUnmuted ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }}>
                    <Disc size={12} className="text-brand-purple-light" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Manual 3D Controls and Settings Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-3xl mt-2 bg-[#0c0c0c]/80 border border-white/5 rounded-xl p-4 backdrop-blur-md">
        
        {/* Toggle Auto Spin with status light */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoSpin(!autoSpin)}
            className={`px-4 py-2 rounded-lg border text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 transition-all cursor-pointer ${
              autoSpin 
                ? "bg-white/5 border-white/20 text-white hover:bg-white/10" 
                : "bg-transparent border-white/5 text-gray-500 hover:text-gray-300"
            }`}
          >
            <RefreshCw size={11} className={autoSpin ? "animate-spin" : ""} style={{ animationDuration: "6s" }} />
            {lang === "pt" ? "Giro Automático:" : "Auto Spin:"} {autoSpin ? (lang === "pt" ? "ATIVO" : "ACTIVE") : (lang === "pt" ? "PAUSADO" : "PAUSED")}
          </button>
          <span className={`w-2 h-2 rounded-full ${autoSpin ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-zinc-700"}`}></span>
        </div>

        {/* 3D Arrow keys pads */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-zinc-500 uppercase mr-1">
            {lang === "pt" ? "Rolar:" : "Pitch:"}
          </span>
          
          <button 
            onClick={() => { setAutoSpin(false); setRotationX(prev => prev - 30); }}
            className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
            title={lang === "pt" ? "Girar para Cima" : "Tilt Up"}
          >
            <ChevronUp size={14} />
          </button>

          <button 
            onClick={() => { setAutoSpin(false); setRotationX(prev => prev + 30); }}
            className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
            title={lang === "pt" ? "Girar para Baixo" : "Tilt Down"}
          >
            <ChevronDown size={14} />
          </button>

          <span className="font-mono text-[9px] text-zinc-500 uppercase ml-2 mr-1">
            {lang === "pt" ? "Girar:" : "Yaw:"}
          </span>

          <button 
            onClick={() => { setAutoSpin(false); setRotationY(prev => prev - 30); }}
            className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
            title={lang === "pt" ? "Girar Esquerda" : "Spin Left"}
          >
            <ChevronLeft size={14} />
          </button>

          <button 
            onClick={() => { setAutoSpin(false); setRotationY(prev => prev + 30); }}
            className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
            title={lang === "pt" ? "Girar Direita" : "Spin Right"}
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Reset Camera View button */}
        <button
          onClick={resetRotation}
          className="group px-4 py-2 rounded-lg border border-white/10 bg-transparent text-white hover:bg-white hover:text-black hover:border-white text-[10px] font-sans uppercase tracking-widest font-bold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Sparkles size={11} className="group-hover:rotate-12 transition-transform" />
          {lang === "pt" ? "Resetar Visão" : "Reset View"}
        </button>

      </div>

      {/* 3D Focus Modal for Expanded Short */}
      <AnimatePresence>
        {selectedShort && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelectedShort(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
              className="relative bg-[#070707] border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 max-h-[90vh] md:max-h-[80vh]"
            >
              
              {/* Close Button at top-right of modal */}
              <button
                onClick={() => setSelectedShort(null)}
                className="absolute top-4 right-4 md:fixed md:top-8 md:right-8 p-2.5 rounded-lg bg-black/90 hover:bg-white hover:text-black text-white border border-white/20 transition-all z-[60] cursor-pointer shadow-xl hover:scale-105 flex items-center justify-center"
                title={lang === "pt" ? "Fechar" : "Close"}
              >
                <X size={18} />
              </button>

              {/* Left Column: The Vertical Video Stage (Columns 1-5) */}
              <div className="md:col-span-5 bg-black relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10 h-[50vh] md:h-full min-h-[350px]">
                {/* Glowing background matching the brand accent */}
                <div className="absolute inset-0 bg-radial-gradient from-brand-purple/10 to-transparent pointer-events-none"></div>

                {/* Simulated Smartphone Bezel */}
                <div className="relative w-full max-w-[240px] aspect-[9/16] rounded-[28px] overflow-hidden border-4 border-zinc-800 bg-[#0c0c0c] shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col">
                  {/* Top Notch */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-black z-30 flex justify-center items-center">
                    <div className="w-12 h-2.5 bg-zinc-800 rounded-full"></div>
                  </div>

                  {/* Actual Video */}
                  <video
                    ref={modalVideoRef}
                    src={selectedShort.videoUrl}
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover z-10 cursor-pointer"
                    onClick={() => setModalPlaying(!modalPlaying)}
                  />

                  {/* Floating Video Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 z-20 pointer-events-none"></div>

                  {/* Bottom Video details inside Smartphone Screen */}
                  <div className="absolute left-3 bottom-3 right-3 z-30 flex flex-col gap-1 pointer-events-none text-left">
                    <div className="flex items-center gap-1">
                      <span className="font-sans font-semibold text-[9px] text-white">@morae.studio</span>
                      <CheckCircle2 size={8} className="text-[#38bdf8] fill-current" />
                    </div>
                    <p className="font-sans text-[8px] text-gray-300 font-medium line-clamp-2">
                      {selectedShort.hashtag}
                    </p>
                  </div>

                  {/* Central Play/Pause Overlay Indicator */}
                  {!modalPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/40 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white animate-pulse">
                        <Play size={20} className="fill-current ml-1" />
                      </div>
                    </div>
                  )}

                  {/* In-Screen Audio & Play HUD Controls */}
                  <div className="absolute top-6 right-3 z-30 flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalMuted(!modalMuted);
                      }}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all cursor-pointer"
                    >
                      {modalMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalPlaying(!modalPlaying);
                      }}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all cursor-pointer flex items-center justify-center"
                    >
                      {modalPlaying ? <span className="font-mono text-[7px] font-bold">||</span> : <Play size={10} />}
                    </button>
                  </div>

                </div>
              </div>

              {/* Right Column: Creative analysis and stats (Columns 6-12) */}
              <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between text-left h-full">
                <div className="flex flex-col gap-6">
                  
                  {/* Category Header */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-brand-purple-light text-[9px] font-mono uppercase tracking-widest font-bold">
                      {lang === "pt" 
                        ? selectedShort.category 
                        : selectedShort.category === "Comercial" 
                          ? "Commercial" 
                          : selectedShort.category === "Música / Artista" 
                            ? "Music / Artist" 
                            : selectedShort.category === "Vlog de Viagem" 
                              ? "Travel Vlog" 
                              : selectedShort.category === "Educacional / Tech" 
                                ? "Educational / Tech" 
                                : selectedShort.category}
                    </span>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                      {lang === "pt" ? "Foco em Retenção & Ritmo" : "Focus on Retention & Pace"}
                    </span>
                  </div>

                  {/* Title & Hashtags */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl md:text-3xl font-light tracking-tight text-white uppercase leading-tight">
                      {selectedShort.title}
                    </h3>
                    <p className="font-sans text-brand-purple-light text-xs font-semibold">
                      {selectedShort.hashtag}
                    </p>
                  </div>

                  {/* Editorial analysis breakdown */}
                  <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
                    <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-mono">
                      {lang === "pt" ? "Análise de Edição & Post-Produção" : "Editing & Post-Production Analysis"}
                    </h4>
                    <p className="font-sans text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {lang === "pt" 
                        ? "Este projeto foi desenvolvido com foco total em micro-retenção nas plataformas verticais (TikTok, YouTube Shorts e Instagram Reels). Aplicamos técnicas avançadas de beat-matching e cortes dinâmicos a cada mudança de compasso musical, acompanhados por efeitos de sound design (foley) cirúrgicos para aumentar o valor de produção percebido em telas móveis."
                        : "This project was developed with a complete focus on micro-retention on vertical platforms (TikTok, YouTube Shorts, and Instagram Reels). We applied advanced beat-matching and dynamic cuts at every musical beat change, coupled with surgical sound design (foley) effects to maximize production value on mobile screens."}
                    </p>
                  </div>

                  {/* Production Stats Matrix */}
                  <div className="grid grid-cols-3 gap-3 font-mono border-t border-white/5 pt-5">
                    <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
                      <span className="text-[9px] text-zinc-500 uppercase block">
                        {lang === "pt" ? "Alcance" : "Reach"}
                      </span>
                      <span className="text-sm font-bold text-white mt-1 block">{selectedShort.views}</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
                      <span className="text-[9px] text-zinc-500 uppercase block">Likes</span>
                      <span className="text-sm font-bold text-white mt-1 block">
                        {likedList.includes(selectedShort.id) ? "12.5K" : selectedShort.likes}
                      </span>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
                      <span className="text-[9px] text-zinc-500 uppercase block">
                        {lang === "pt" ? "Engajamento" : "Engagement"}
                      </span>
                      <span className="text-sm font-bold text-brand-purple-light mt-1 block">
                        {lang === "pt" ? "Alto (+15%)" : "High (+15%)"}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Footer Action buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 border-t border-white/5 pt-6">
                  
                  {/* Like sync button */}
                  <button
                    onClick={(e) => toggleLike(selectedShort.id, e)}
                    className={`w-full sm:w-auto px-5 py-3.5 rounded-lg border font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      likedList.includes(selectedShort.id)
                        ? "bg-red-500/20 border-red-500 text-red-400"
                        : "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <Heart size={14} className={likedList.includes(selectedShort.id) ? "fill-current" : ""} />
                    {likedList.includes(selectedShort.id) 
                      ? lang === "pt" ? "Curtido" : "Liked" 
                      : lang === "pt" ? "Curtir Shorts" : "Like Shorts"}
                  </button>

                  {/* Quick quote action */}
                  <button
                    onClick={() => {
                      if (onQuoteForProject) onQuoteForProject(selectedShort.projectId);
                      setSelectedShort(null);
                    }}
                    className="w-full sm:flex-1 py-3.5 rounded-lg bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
                  >
                    <Sparkles size={13} />
                    {lang === "pt" ? "Solicitar Edição Similar" : "Request Similar Editing"}
                  </button>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
