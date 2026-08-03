import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X, CheckCircle2, ShieldAlert } from "lucide-react";
import { experienceData } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function ExperienceTimeline({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          className="relative w-full max-w-3xl max-h-[88vh] bg-slate-950 border border-amber-500/50 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-400">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-mono font-bold text-slate-100">
                  SYSTEM EXPERIENCE LOG & TELEMETRY
                </h2>
                <p className="text-xs font-mono text-amber-400">
                  CONTINUOUS OPTIMIZATION HISTORY
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClickSound();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline List */}
          <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-amber-500/30">
            <div className="relative pl-6 border-l-2 border-slate-800 space-y-8">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Pulse Node */}
                  <div
                    className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {exp.period}
                        </span>
                        <h3 className="text-sm font-bold text-slate-100 font-mono mt-1">
                          {exp.role}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {exp.company}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {exp.achievements.map((ach, aIdx) => (
                        <div
                          key={aIdx}
                          className="flex items-start gap-2.5 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {exp.stack && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                        {exp.stack.map((st, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-cyan-500/30"
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
