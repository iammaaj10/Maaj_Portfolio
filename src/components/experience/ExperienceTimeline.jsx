import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X, CheckCircle2, ShieldAlert, Briefcase, Calendar, Building2 } from "lucide-react";
import { experienceData } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function ExperienceTimeline({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950/95 border-2 border-amber-500/40 rounded-2xl shadow-[0_0_80px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col cyber-cut-corner bg-cyber-grid"
        >
          {/* Hologram scan line */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-holo-sweep z-30" />

          {/* Corner metadata */}
          <div className="pointer-events-none absolute top-2 left-3 text-[8px] font-mono text-amber-400/60 z-20">
            [SYS_LOG // SDE_EXPERIENCE]
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/60 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-mono font-bold text-slate-100 tracking-wider">
                    SDE INTERNSHIPS & EXPERIENCE LOG
                  </h2>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs font-mono text-amber-400">
                  PRODUCTION-GRADE FULL STACK DELIVERABLES
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClickSound();
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline List */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-amber-500/40">
            <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Pulse Node */}
                  <div
                    className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-amber-400" />
                          <h3 className="text-sm sm:text-base font-bold text-slate-100 font-mono">
                            {exp.role}
                          </h3>
                        </div>
                        <div className="text-xs font-mono text-slate-400 mt-0.5 flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {exp.achievements.map((ach, aIdx) => (
                        <div
                          key={aIdx}
                          className="flex items-start gap-2.5 text-xs text-slate-200 font-sans leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {exp.stack && (
                      <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-800/80">
                        {exp.stack.map((st, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-950 text-cyan-300 border border-cyan-500/30"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
