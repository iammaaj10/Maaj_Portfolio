import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, Cpu, ShieldCheck, Zap, Award, Sparkles, Terminal } from "lucide-react";
import { developerProfile } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function SystemCoreModal({ isOpen, onClose, onSelectNode }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-mono font-bold text-slate-100">
                  DEVELOPER MIND SYSTEM CORE
                </h2>
                <p className="text-xs font-mono text-cyan-400">
                  {developerProfile.designation}
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

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/30 font-sans">
            {/* Bio Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block">
                  IDENTITY // BLUEPRINT
                </span>
                <h3 className="text-xl font-bold text-slate-100">{developerProfile.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{developerProfile.bio}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block">
                  SYSTEM METRICS
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {developerProfile.stats.map((s, idx) => (
                    <div key={idx} className="p-2 bg-slate-950/80 rounded border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400">{s.label}</div>
                      <div className="text-xs font-mono font-bold text-cyan-300">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Principles */}
            <div className="p-5 rounded-xl bg-slate-900/40 border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>CORE ENGINEERING SPECIFICATIONS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {developerProfile.principles.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Node Jump Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400">
                TRANSITION TO OTHER SYSTEM NODES:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    sound.playClickSound();
                    onSelectNode("projects-portal");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-400/60 text-violet-300 text-xs font-mono hover:bg-violet-500/30 transition-all"
                >
                  EXPLORE PROJECTS PORTAL
                </button>
                <button
                  onClick={() => {
                    sound.playClickSound();
                    onSelectNode("skills-matrix");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-mono hover:bg-emerald-500/30 transition-all"
                >
                  VIEW SKILL MATRIX
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
