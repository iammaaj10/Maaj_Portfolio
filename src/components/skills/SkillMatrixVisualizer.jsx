import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Activity, Cpu, Layers, ShieldCheck, Radio, Flame, CheckCircle2, Code2 } from "lucide-react";
import { skillCategories } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function SkillMatrixVisualizer({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950/95 border-2 border-emerald-500/40 rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.25)] overflow-hidden flex flex-col cyber-cut-corner bg-cyber-grid"
        >
          {/* Hologram scan line */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-holo-sweep z-30" />

          {/* Corner metadata */}
          <div className="pointer-events-none absolute top-2 left-3 text-[8px] font-mono text-emerald-400/60 z-20">
            [SYS_STACK // TECHNICAL_PROFICIENCY]
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-emerald-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/60 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-mono font-bold text-slate-100 tracking-wider">
                    TECHNICAL STACK & ARCHITECTURE MATRIX
                  </h2>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                    PRODUCTION_READY
                  </span>
                </div>
                <p className="text-xs font-mono text-emerald-400">
                  SPECIALIZED DOMAIN STACKS & PRODUCTION IMPACT
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

          {/* Domain Category Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 px-5 sm:px-6 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto">
            {skillCategories.map((cat) => {
              const isSel = activeCategory.name === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    sound.playClickSound();
                    setActiveCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-2 whitespace-nowrap ${
                    isSel
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                  />
                  <span>{cat.name}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {cat.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skill Cluster Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-emerald-500/40">
            {/* Top Domain Hero Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border-2 border-emerald-500/40 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  DOMAIN CLUSTER // {activeCategory.name}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-mono text-white">
                  {activeCategory.tier}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/80 shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  STATUS: {activeCategory.status}
                </span>
              </div>
            </div>

            {/* Individual Skills Visualizer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeCategory.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/90 hover:border-emerald-500/40 transition-all space-y-2.5 group"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-100 group-hover:text-white">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                        {skill.tier}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {skill.tag}
                      </span>
                    </div>
                  </div>

                  {/* Highlight note & production deliverable */}
                  <div className="text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{skill.highlight}</span>
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
