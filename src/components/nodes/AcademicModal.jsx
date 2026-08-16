import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { academicData } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function AcademicModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          className="relative w-full max-w-3xl max-h-[88vh] bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
                <GraduationCap className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-mono font-bold text-slate-100">
                  ACADEMIC MATRIX & DEGREES
                </h2>
                <p className="text-xs font-mono text-cyan-400">
                  COMPUTER SCIENCE & SYSTEMS ENGINEERING
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

          {/* Academic Timeline Body */}
          <div className="p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/30">
            <div className="space-y-4">
              {academicData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold font-mono text-slate-100">
                      {item.degree}
                    </h3>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      SCORE: {item.grade}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{item.institution}</span>
                    <span>{item.period}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
