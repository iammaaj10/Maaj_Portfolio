import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Activity, Cpu, Layers, ShieldCheck } from "lucide-react";
import { skillCategories } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function SkillMatrixVisualizer({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          className="relative w-full max-w-4xl max-h-[88vh] bg-slate-950 border border-emerald-500/50 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-emerald-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-mono font-bold text-slate-100">
                  SYSTEM SKILL MATRIX & ENERGY CLUSTERS
                </h2>
                <p className="text-xs font-mono text-emerald-400">
                  DYNAMIC PROFICIENCY & TOOL VECTORS
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

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-950 border-b border-slate-800">
            {skillCategories.map((cat) => {
              const isSel = activeCategory.name === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    sound.playClickSound();
                    setActiveCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-2 ${
                    isSel
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    [{cat.energy}% ENERGY]
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skill Cluster Body */}
          <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-emerald-500/30">
            {/* Cluster Overall Energy Meter */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold uppercase">
                  {activeCategory.name} // DOMAIN CAPACITY
                </span>
                <span className="text-emerald-400 font-bold">
                  {activeCategory.energy}% EFFICIENCY
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_#10b981]"
                  style={{
                    width: `${activeCategory.energy}%`,
                    backgroundColor: activeCategory.color
                  }}
                />
              </div>
            </div>

            {/* Individual Skills Visualizer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCategory.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-100">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {skill.tag}
                    </span>
                  </div>

                  {/* Level Meter Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>POWER LEVEL</span>
                      <span className="text-cyan-300">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: activeCategory.color
                        }}
                      />
                    </div>
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
