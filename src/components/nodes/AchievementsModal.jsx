import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Award, Code2, CloudCheck, Sparkles } from "lucide-react";
import { achievementsData } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function AchievementsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          className="relative w-full max-w-3xl max-h-[88vh] bg-slate-950 border border-yellow-500/50 rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.2)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-yellow-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/40 text-yellow-400">
                <Trophy className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-mono font-bold text-slate-100">
                  HONORS, CERTIFICATIONS & ACHIEVEMENTS
                </h2>
                <p className="text-xs font-mono text-yellow-400">
                  COMPETITIVE MASTERY & RECOGNITION
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

          {/* Body Cards */}
          <div className="p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-yellow-500/30">
            {achievementsData.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-yellow-500/50 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {idx === 0 ? (
                      <Trophy className="w-5 h-5 text-yellow-400" />
                    ) : idx === 1 ? (
                      <Code2 className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    )}
                    <h3 className="text-base font-bold font-mono text-slate-100">
                      {item.title}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 font-bold">
                    {item.year}
                  </span>
                </div>

                <div className="text-xs font-mono text-cyan-300 font-semibold">
                  {item.event}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
