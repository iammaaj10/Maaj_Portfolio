import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Activity } from "lucide-react";
import { engineeringSignals } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function SkillMatrixVisualizer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950/95 border-2 border-emerald-500/40 rounded shadow-[0_0_80px_rgba(16,185,129,0.25)] overflow-hidden flex flex-col"
        >
          {/* Hologram scan line */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-holo-sweep z-30" />

          {/* Corner metadata */}
          <div className="pointer-events-none absolute top-2 left-3 text-[8px] font-mono text-emerald-400/60 z-20 tracking-widest">
            [SYS_STACK // ENGINEERING_SIGNALS]
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-emerald-500/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded border border-dashed border-emerald-400/60 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-950/30">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg sm:text-xl font-mono font-bold text-slate-100 tracking-[0.2em] uppercase">
                    ENGINEERING SIGNALS
                  </h2>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  EVIDENCE-BASED PROFICIENCY
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClickSound();
                onClose();
              }}
              className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Signals Body */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-emerald-500/40 bg-cyber-grid bg-[size:30px_30px]">
            {engineeringSignals.map((signal, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 rounded bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all relative overflow-hidden group"
              >
                {/* Left Accent */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: signal.color, boxShadow: `0 0 10px ${signal.color}` }}
                />

                <div className="sm:w-1/3 flex flex-col justify-center">
                  <span 
                    className="text-[10px] font-mono font-bold tracking-[0.2em] mb-1"
                    style={{ color: signal.color }}
                  >
                    DOMAIN_{idx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-mono font-bold text-slate-100 tracking-widest uppercase">
                    {signal.name}
                  </h3>
                </div>

                <div className="sm:w-2/3 flex flex-col justify-center gap-2 border-l border-slate-800/80 pl-4 sm:pl-6">
                  <div className="text-sm font-mono text-emerald-300 font-bold tracking-widest uppercase">
                    {signal.value}
                  </div>
                  <div className="text-xs font-mono text-slate-400 leading-relaxed">
                    <span className="text-slate-500 mr-2">EVIDENCE:</span>
                    {signal.evidence}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
