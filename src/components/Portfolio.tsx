import React, { useState } from "react";
import { PORTFOLIO_PROJECTS } from "../data";
import { PortfolioProject } from "../types";
import { Filter, Clock, Video, User, Star, Layers, Activity, Scissors, ArrowRight, Play, X, Zap, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BeforeAfter from "./BeforeAfter";

interface PortfolioProps {
  onQuoteForProject?: (projectTitle: string) => void;
  limit?: number; // Optional limit for Home screen recent highlights
  lang?: "pt" | "en";
}

export default function Portfolio({ onQuoteForProject, limit, lang = "pt" }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState(lang === "pt" ? "Todos" : "All");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);

  // Localization helper maps
  const translateProjectTitle = (proj: any) => {
    if (lang === "en") {
      if (proj.id === "shark-bite") return "Shark Bite Energy - Nitro";
      if (proj.id === "voo-corvo") return "Flight of the Raven";
      if (proj.id === "sombra-luz") return "Shadow and Light";
      if (proj.id === "pulso-urbano") return "Urban Pulse";
    }
    return proj.title;
  };

  const translateProjectDescription = (proj: any) => {
    if (lang === "en") {
      if (proj.id === "shark-bite") return "High-intensity commercial featuring fast cuts, aggressive sound design, and impact color grading with purple accents.";
      if (proj.id === "voo-corvo") return "Artistic music video with visual match-cut transitions, dramatic overlays, and a captivating dream narrative.";
      if (proj.id === "sombra-luz") return "Editorial fashion film playing with negative space, high contrast, and dynamic speed ramps for elite brands.";
      if (proj.id === "pulso-urbano") return "Underground documentary featuring multi-cam sync, complex text overlays, and street atmospheric sound design.";
    }
    return proj.description;
  };

  const translateProjectLongDescription = (proj: any) => {
    if (lang === "en") {
      if (proj.id === "shark-bite") return "A disruptive advertising campaign for Shark Vitality. The goal was to convey relentless energy using beat-matching fast assembly, analog frame overlays, and subtle glitch effects. The color grading was designed to establish heavy contrast between deep blacks and ultraviolet neon highlights, amplifying the elegant aggressiveness of the brand's shark icon.";
      if (proj.id === "voo-corvo") return "Independent music production with dense cinematic aesthetics. We developed a dreamy editing timeline using visual Match Cuts connecting a raven's flight with the singer's expressions. The color treatment leverages a melancholic palette with cold shadow tones and warm violet/purple highlights, creating a mistic and highly memorable atmosphere.";
      if (proj.id === "sombra-luz") return "Fashion film for premium apparel launch. Focused on negative space and visual geometric symmetry. We worked with dynamic speed ramps (time remapping) transitioning seamlessly between slow motion and rapid cuts. The color profile accentuates natural skin tones and isolates fabric colors under high-contrast shadows.";
      if (proj.id === "pulso-urbano") return "Rhythmical urban documentary following skateboard culture and street art. Edited using multi-cam sync across 4 cameras, layered with real foley sound recorded on location. Highlighting dynamic subtitles styled with custom motion typography, paired with a moody, filmic color-grading LUT.";
    }
    return proj.longDescription;
  };

  const translateProjectCategory = (cat: string) => {
    if (lang === "en") {
      if (cat === "Comerciais") return "Commercials";
      if (cat === "Videoclipes") return "Music Videos";
      if (cat === "Documentários") return "Documentaries";
      if (cat === "Redes Sociais") return "Social Media";
      if (cat === "Moda & Arte") return "Fashion & Art";
    }
    return cat;
  };

  const translateRole = (role: string) => {
    if (lang === "en") {
      if (role === "Edição Comercial") return "Commercial Editing";
      if (role === "Sound Design") return "Sound Design";
      if (role === "Color Grading") return "Color Grading";
      if (role === "Motion Graphics") return "Motion Graphics";
      if (role === "Edição Geral") return "General Editing";
      if (role === "Direção de Arte Digital") return "Digital Art Direction";
      if (role === "Color Grading Criativo") return "Creative Color Grading";
      if (role === "Edição de Moda") return "Fashion Editing";
      if (role === "Tratamento de Contraste") return "Contrast Treatment";
      if (role === "Edição Documental") return "Documentary Editing";
      if (role === "Curadoria de Áudio") return "Audio Curation";
    }
    return role;
  };

  const translateTech = (tech: string) => {
    if (lang === "en") {
      if (tech === "Montagem Rítmica") return "Rhythmic Editing";
      if (tech === "Glitch Transitions") return "Glitch Transitions";
      if (tech === "Sound Layering") return "Sound Layering";
      if (tech === "Speed Ramping") return "Speed Ramping";
      if (tech === "Match Cuts") return "Match Cuts";
      if (tech === "Sobreposição (Double Exposure)") return "Double Exposure Overlays";
      if (tech === "Câmera Lenta Orgânica") return "Organic Slow Motion";
      if (tech === "Raccord Temporal") return "Temporal Continuity";
      if (tech === "Time Remapping") return "Time Remapping";
      if (tech === "Color Isolation") return "Color Isolation";
      if (tech === "Geometric Masking") return "Geometric Masking";
      if (tech === "Multi-cam Sync") return "Multi-cam Sync";
      if (tech === "Foley Design") return "Foley Design";
      if (tech === "Kinetic Typography") return "Kinetic Typography";
    }
    return tech;
  };

  // Filter logic
  const categoriesPt = ["Todos", "Comerciais", "Videoclipes", "Documentários", "Redes Sociais", "Moda & Arte"];
  const categoriesEn = ["All", "Commercials", "Music Videos", "Documentaries", "Social Media", "Fashion & Art"];
  const categories = lang === "pt" ? categoriesPt : categoriesEn;
  
  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    if (selectedCategory === "Todos" || selectedCategory === "All") return true;
    
    let categoryToMatch = selectedCategory;
    if (lang === "en") {
      const idx = categoriesEn.indexOf(selectedCategory);
      if (idx !== -1) {
        categoryToMatch = categoriesPt[idx];
      }
    }
    return proj.category === categoryToMatch;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const toggleLike = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening the modal
    if (likedProjects.includes(projectId)) {
      setLikedProjects(likedProjects.filter(id => id !== projectId));
    } else {
      setLikedProjects([...likedProjects, projectId]);
    }
  };

  return (
    <div className="w-full">
      {/* Category Filter Pills (Only show if not limited/preview mode) */}
      {!limit && (
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="portfolio-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-sans transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-black border border-white font-bold"
                  : "bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setActiveProject(project)}
              className="group glass-panel rounded-xl overflow-hidden cursor-pointer relative flex flex-col justify-between h-full border border-white/10 transition-all duration-300 hover:translate-y-[-4px] hover:border-white/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Card Header & Thumbnail area */}
              <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                {/* Simulated gradients for background */}
                <div 
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: project.thumbnailUrl }}
                />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
 
                {/* Aesthetic center icon */}
                <div className="relative z-10 flex flex-col items-center justify-center text-white p-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play size={16} className="text-white group-hover:text-black fill-current ml-0.5 transition-colors duration-300" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/70 mt-3 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {project.duration} MIN
                  </span>
                </div>

                {/* Category tag */}
                <span className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-widest border border-white/10">
                  {translateProjectCategory(project.category)}
                </span>

                {/* Like / Heart button */}
                <button
                  onClick={(e) => toggleLike(project.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-gray-400 hover:text-red-500 hover:bg-black/80 transition-all border border-white/5 cursor-pointer"
                >
                  <Heart size={12} className={likedProjects.includes(project.id) ? "fill-red-500 text-red-500" : ""} />
                </button>
              </div>

              {/* Card metadata content */}
              <div className="p-6 flex flex-col justify-between flex-1 text-left">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>
                  <h4 className="font-display text-lg font-light uppercase text-white tracking-tight group-hover:text-brand-purple-light transition-colors duration-300">
                    {translateProjectTitle(project)}
                  </h4>
                  <p className="font-sans text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {translateProjectDescription(project)}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-6 border-t border-white/5 pt-4">
                  {/* Stats highlights */}
                  <div className="flex justify-between text-[9px] font-mono text-gray-500">
                    <span className="flex items-center gap-1">
                      <Scissors size={10} />
                      {project.stats.cuts} {lang === "pt" ? "Cortes" : "Cuts"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers size={10} />
                      {project.stats.timelineLayers} {lang === "pt" ? "Camadas" : "Tracks"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity size={10} />
                      {project.stats.audioTracks} {lang === "pt" ? "Áudio" : "Audio"}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-brand-purple-light group-hover:text-white flex items-center gap-1 mt-1 transition-colors duration-300">
                    {lang === "pt" ? "Estudo de Caso" : "Case Study"}
                    <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicking modal body from closing
              className="relative bg-[#050505] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Top-Right Absolute/Fixed Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProject(null);
                }}
                className="absolute top-4 right-4 md:fixed md:top-8 md:right-8 p-2.5 rounded-lg bg-black/90 hover:bg-white hover:text-black text-white border border-white/20 transition-all z-[60] cursor-pointer shadow-xl hover:scale-105 flex items-center justify-center"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>

              {/* Modal Top Banner (Stretched Gradient Thumbnail) */}
              <div 
                className="relative aspect-[21/9] w-full flex items-end p-6 md:p-10"
                style={{ background: activeProject.thumbnailUrl }}
              >
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/10"></div>

                {/* Banner Content */}
                <div className="relative z-10 flex flex-col gap-2 text-left w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white text-black text-[9px] font-mono uppercase tracking-widest font-bold">
                      {translateProjectCategory(activeProject.category)}
                    </span>
                    <span className="text-gray-300 text-xs font-mono">
                      {activeProject.duration} {lang === "pt" ? "MINUTOS" : "MINUTES"}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-light tracking-tight text-white leading-tight uppercase">
                    {translateProjectTitle(activeProject)}
                  </h3>
                </div>
              </div>

              {/* Modal Body Grid */}
              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* Left Side: Editorial & Detailed Copy (Columns 1-7) */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  
                  {/* Detailed Description */}
                  <div className="flex flex-col gap-3">
                    <h5 className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                      {lang === "pt" ? "Resumo Criativo" : "Creative Summary"}
                    </h5>
                    <p className="font-sans text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {translateProjectLongDescription(activeProject)}
                    </p>
                  </div>

                  {/* Interactive Grading Slider inside Case Study */}
                  <div className="border-t border-white/5 pt-6">
                    <BeforeAfter
                      lang={lang}
                      imageUrl={
                        activeProject.id === "shark-bite" 
                          ? "https://images.unsplash.com/photo-1551632879-c5617a3a9643?auto=format&fit=crop&q=80&w=1200" // underwater oceanic diver sharky feel
                          : activeProject.id === "voo-corvo"
                          ? "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200" // moody atmospheric forest ravenish feel
                          : activeProject.id === "sombra-luz"
                          ? "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200" // luxury model fashion shoot
                          : "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1200" // dynamic urban moody sunset
                      }
                      beforeFilter={activeProject.colorGrading.beforeColor}
                      afterFilter={activeProject.colorGrading.afterColor}
                      title={lang === "pt" ? "Análise de Tratamento de Cor" : "Color Grading Analysis"}
                      description={
                        lang === "pt" 
                          ? "Simulação real do processo de color grading aplicado para este projeto. Do RAW cinza lavado ao resultado final calibrado."
                          : "Real-time simulation of the color grading workflow applied to this project. From flat, desaturated RAW profile to fully calibrated final look."
                      }
                    />
                  </div>

                </div>

                {/* Right Side: Technical Specs & Roles (Columns 8-12) */}
                <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0a0a0a] border border-white/10 rounded-xl p-6 h-fit">
                  
                  {/* Project Info */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[11px] uppercase tracking-widest text-white font-bold">
                      {lang === "pt" ? "Ficha Técnica" : "Technical Specs"}
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-500">
                          {lang === "pt" ? "Cliente" : "Client"}
                        </p>
                        <p className="text-xs text-white font-medium">{activeProject.client}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-500">
                          {lang === "pt" ? "Ano" : "Year"}
                        </p>
                        <p className="text-xs text-white font-medium">{activeProject.year}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-500">
                          {lang === "pt" ? "Formato" : "Format"}
                        </p>
                        <p className="text-xs text-brand-purple-light font-medium uppercase tracking-wider">
                          {translateProjectCategory(activeProject.category)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-500">
                          {lang === "pt" ? "Duração" : "Duration"}
                        </p>
                        <p className="text-xs text-white font-medium">
                          {activeProject.duration}s
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Production Stats */}
                  <div className="flex flex-col gap-4 border-t border-white/5 pt-5">
                    <span className="text-[11px] uppercase tracking-widest text-white font-bold">
                      {lang === "pt" ? "Métricas de Post-Prod" : "Post-Prod Metrics"}
                    </span>
                    <div className="grid grid-cols-2 gap-3 font-mono">
                      <div className="bg-[#121212] p-3 rounded-lg border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase">
                          {lang === "pt" ? "Cortes Efetuados" : "Cuts Performed"}
                        </p>
                        <p className="text-base text-white font-bold mt-1">{activeProject.stats.cuts}</p>
                      </div>
                      <div className="bg-[#121212] p-3 rounded-lg border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase">
                          {lang === "pt" ? "Horas de Edição" : "Editing Hours"}
                        </p>
                        <p className="text-base text-white font-bold mt-1">{activeProject.stats.hoursEditing}h</p>
                      </div>
                      <div className="bg-[#121212] p-3 rounded-lg border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase">
                          {lang === "pt" ? "Camadas de Linha" : "Timeline Layers"}
                        </p>
                        <p className="text-base text-white font-bold mt-1">{activeProject.stats.timelineLayers}</p>
                      </div>
                      <div className="bg-[#121212] p-3 rounded-lg border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase">
                          {lang === "pt" ? "Canais de Áudio" : "Audio Channels"}
                        </p>
                        <p className="text-base text-white font-bold mt-1">{activeProject.stats.audioTracks}</p>
                      </div>
                    </div>
                  </div>

                  {/* Techniques & Roles list */}
                  <div className="flex flex-col gap-4 border-t border-white/5 pt-5">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-white font-bold">
                        {lang === "pt" ? "Serviços Executados" : "Executed Services"}
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {activeProject.roles.map((role) => (
                          <span key={role} className="text-[9px] bg-[#121212] text-brand-purple-light px-2.5 py-1 rounded border border-white/5">
                            {translateRole(role)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-[11px] uppercase tracking-widest text-white font-bold">
                        {lang === "pt" ? "Técnicas Utilizadas" : "Techniques Used"}
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {activeProject.techniques.map((tech) => (
                          <span key={tech} className="text-[9px] bg-black/60 text-gray-300 px-2.5 py-1 rounded border border-white/5">
                            {translateTech(tech)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick request action */}
                  {onQuoteForProject && (
                    <button
                      onClick={() => {
                        onQuoteForProject(translateProjectTitle(activeProject));
                        setActiveProject(null);
                      }}
                      className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-brand-purple hover:text-white text-black font-semibold text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                    >
                      <Zap size={12} />
                      {lang === "pt" ? "Solicitar Vídeo Similar" : "Request Similar Video"}
                    </button>
                  )}

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
