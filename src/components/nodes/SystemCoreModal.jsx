import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, Cpu, ShieldCheck, Zap, Award, Code2, Terminal, MapPin, Mail, Phone } from "lucide-react";
import { developerProfile } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function SystemCoreModal({ isOpen, onClose, onSelectNode }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950/95 border-2 border-cyan-500/40 rounded-2xl shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col cyber-cut-corner bg-cyber-grid"
        >
          {/* Hologram sweep line */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-holo-sweep z-30" />

          {/* Corner metadata */}
          <div className="pointer-events-none absolute top-2 left-3 text-[8px] font-mono text-cyan-400/60 z-20">
            [SYS_CORE // DEVELOPER_IDENTITY]
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/60 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-mono font-bold text-slate-100 tracking-wider">
                    DEVELOPER MIND SYSTEM CORE
                  </h2>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                    ONLINE
                  </span>
                </div>
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
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-cyan-500/40 font-sans">
            {/* Bio Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-500/30 space-y-2.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  IDENTITY // BIOGRAPHY
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-mono text-slate-100">{developerProfile.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{developerProfile.bio}</p>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{developerProfile.location}</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  VERIFIED TELEMETRY METRICS
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {developerProfile.stats.map((s, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-colors">
                      <div className="text-[10px] font-mono text-slate-400">{s.label}</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-cyan-300 mt-0.5">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Principles */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>CORE ENGINEERING BLUEPRINT & PRINCIPLES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {developerProfile.principles.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="font-sans leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Node Warp Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400">
                WARP TO CONNECTED SYSTEM NODES:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    sound.playClickSound();
                    onSelectNode("projects-portal");
                  }}
                  className="px-3.5 py-2 rounded-xl bg-violet-500/20 border border-violet-400/60 text-violet-200 text-xs font-mono font-bold hover:bg-violet-500/30 transition-all shadow-sm"
                >
                  PROJECT PORTALS
                </button>
                <button
                  onClick={() => {
                    sound.playClickSound();
                    onSelectNode("achievements-node");
                  }}
                  className="px-3.5 py-2 rounded-xl bg-yellow-500/20 border border-yellow-400/60 text-yellow-200 text-xs font-mono font-bold hover:bg-yellow-500/30 transition-all shadow-sm"
                >
                  ACHIEVEMENTS
                </button>
                <button
                  onClick={() => {
                    sound.playClickSound();
                    onSelectNode("academic-matrix");
                  }}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/60 text-cyan-200 text-xs font-mono font-bold hover:bg-cyan-500/30 transition-all shadow-sm"
                >
                  ACADEMICS
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
