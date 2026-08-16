import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X, BookOpen, Award, CheckCircle2, ShieldCheck, Binary, Cpu } from "lucide-react";
import { academicData } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function AcademicModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950/95 border-2 border-cyan-500/40 rounded-2xl shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col cyber-cut-corner bg-cyber-grid"
        >
          {/* Hologram sweep line */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-holo-sweep z-30" />

          {/* Corner metadata */}
          <div className="pointer-events-none absolute top-2 left-3 text-[8px] font-mono text-cyan-400/60 z-20">
            [DATA_BANK // ACADEMIC_RECORDS]
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/60 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <GraduationCap className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-mono font-bold text-slate-100 tracking-wider">
                    ACADEMIC MATRIX & DEGREES
                  </h2>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs font-mono text-cyan-400">
                  DKTE TEXTILE & ENG. INSTITUTE • B.TECH CSE (2026)
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

          {/* Body Academic Records */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-cyan-500/40">
            {/* Top Stat Overview Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  B.TECH CSE GRADE
                </span>
                <div className="text-xl font-bold font-mono text-white">8.46 CGPA</div>
                <div className="text-[10px] text-slate-400">First Class with Distinction</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-500/30 space-y-1">
                <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest font-bold">
                  DIPLOMA CSE SCORE
                </span>
                <div className="text-xl font-bold font-mono text-white">89.09 %</div>
                <div className="text-[10px] text-slate-400">Polytechnic Engineering</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  HIGH SCHOOL SSC
                </span>
                <div className="text-xl font-bold font-mono text-white">86.60 %</div>
                <div className="text-[10px] text-slate-400">Rosary High School</div>
              </div>
            </div>

            {/* Timeline Stream */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                <Binary className="w-4 h-4 text-cyan-400" />
                <span>CHRONOLOGICAL EDUCATIONAL TELEMETRY</span>
              </div>

              {academicData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 relative overflow-hidden group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center justify-center font-mono font-bold text-xs shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        {`0${idx + 1}`}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold font-mono text-slate-100">
                          {item.degree}
                        </h3>
                        <div className="text-xs text-slate-400 font-sans">{item.institution}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 shadow-sm">
                        SCORE: {item.grade}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans pt-2 border-t border-slate-800/80">
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
