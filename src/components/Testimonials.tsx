import React, { useState } from "react";
import { TESTIMONIALS } from "../data";
import { Testimonial } from "../types";
import { Star, MessageSquare, Quote, PenTool, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [list, setList] = useState<Testimonial[]>(TESTIMONIALS);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [success, setSuccess] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const newFeedback: Testimonial = {
      id: `custom-${Date.now()}`,
      name: newName,
      role: newRole || "Produtor Independente",
      company: newCompany || "Criador de Conteúdo",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200", // Generic beautiful avatar placeholder
      comment: newComment,
      rating: newRating,
      projectTitle: "Produção Externa"
    };

    setList([newFeedback, ...list]);
    setSuccess(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setSuccess(false);
      setNewName("");
      setNewRole("");
      setNewCompany("");
      setNewComment("");
      setNewRating(5);
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col gap-12">
      
      {/* Testimonials Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-brand-purple-light text-xs font-mono uppercase tracking-widest">
            <MessageSquare size={14} />
            <span>Opinião de quem confia</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight uppercase">
            Depoimentos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-purple-400 font-normal">Clientes</span>
          </h3>
          <p className="font-sans text-gray-400 text-xs sm:text-sm max-w-xl">
            Histórias reais de marcas, diretores e músicos que uniram suas forças com a Moræ para redefinir sua identidade visual.
          </p>
        </div>

        <button
          onClick={() => setShowFeedbackModal(true)}
          className="px-5 py-3 rounded-lg border border-white/10 bg-transparent hover:bg-white hover:border-white hover:text-black text-white text-xs font-sans uppercase tracking-widest font-bold flex items-center gap-2 self-start md:self-end transition-all duration-300 cursor-pointer"
        >
          <PenTool size={13} />
          Escrever Depoimento
        </button>
      </div>

      {/* Testimonials Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-list-grid">
        {list.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel rounded-xl p-6 relative flex flex-col justify-between border border-white/10 text-left hover:border-white/20 hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Top quote marker and rating */}
            <div className="flex items-center justify-between mb-6">
              <Quote size={24} className="text-white opacity-20 group-hover:opacity-60 transition-opacity" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < item.rating ? "text-amber-500 fill-amber-500" : "text-gray-700"}
                  />
                ))}
              </div>
            </div>

            {/* Comment block */}
            <p className="font-sans text-gray-300 text-xs leading-relaxed italic mb-8 flex-1">
              "{item.comment}"
            </p>

            {/* User Profile Footer */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div>
                <h5 className="font-sans text-xs font-semibold text-white leading-tight">
                  {item.name}
                </h5>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {item.role}, <span className="text-brand-purple-light font-medium">{item.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Feedback Modal overlay */}
      <AnimatePresence>
        {showFeedbackModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setShowFeedbackModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0c0c0c] border border-white/10 rounded-xl p-8 w-full max-w-md shadow-2xl relative text-left"
            >
              <h4 className="font-display text-xl font-light text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <Sparkles size={18} className="text-brand-purple-light" />
                Deixe seu Depoimento
              </h4>
              <p className="font-sans text-gray-400 text-xs mb-6">
                Sua opinião é vital para mantermos o padrão de cortes perfeitos e narrativas impecáveis.
              </p>

              {success ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center animate-bounce">
                    <Check size={24} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm">Depoimento Registrado!</h5>
                    <p className="text-xs text-gray-400 mt-1">Obrigado por apoiar a Moræ.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="flex flex-col gap-4 font-sans text-xs">
                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Ex: Clara Mendes"
                      className="w-full bg-black/80 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Cargo</label>
                      <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="Ex: Diretora de Arte"
                        className="w-full bg-black/80 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Empresa/Banda</label>
                      <input
                        type="text"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        placeholder="Ex: Banda Solstício"
                        className="w-full bg-black/80 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Avaliação</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setNewRating(stars)}
                          className="text-gray-500 hover:text-amber-500 transition-colors p-1"
                        >
                          <Star
                            size={18}
                            className={stars <= newRating ? "text-amber-500 fill-amber-500" : "text-gray-700"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[9px] font-bold">Sua Opinião *</label>
                    <textarea
                      required
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Como foi trabalhar com a Moræ?"
                      className="w-full bg-black/80 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowFeedbackModal(false)}
                      className="px-4 py-2 rounded text-gray-400 hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded bg-white hover:bg-gray-100 text-black font-semibold uppercase tracking-wider text-[11px] transition-all cursor-pointer"
                    >
                      Enviar Depoimento
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
