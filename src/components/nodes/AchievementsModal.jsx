import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Award, Code2, CloudCheck, CheckCircle2, Shield, Flame } from "lucide-react";
import { achievementsData } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function AchievementsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950/95 border-2 border-yellow-500/40 rounded-2xl shadow-[0_0_80px_rgba(234,179,8,0.25)] overflow-hidden flex flex-col cyber-cut-corner bg-cyber-grid"
        >
          {/* Hologram sweep line */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-holo-sweep z-30" />

          {/* Corner metadata */}
          <div className="pointer-events-none absolute top-2 left-3 text-[8px] font-mono text-yellow-400/60 z-20">
            [SYS_VAULT // HONORS_CERTIFICATIONS]
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-yellow-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-yellow-500/15 border border-yellow-400/60 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                <Trophy className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-mono font-bold text-slate-100 tracking-wider">
                    HONORS, HACKATHONS & CERTS
                  </h2>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-500/40 font-bold">
                    TOP 1%
                  </span>
                </div>
                <p className="text-xs font-mono text-yellow-400">
                  SIH 2024 WINNER • 350+ LEETCODE • AWS CERTIFIED
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

          {/* Body Trophy Vault */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-yellow-500/40">
            {/* 1. SIH Hackathon Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-yellow-950/40 to-slate-900/60 border-2 border-yellow-500/40 relative overflow-hidden space-y-3 shadow-[0_0_20px_rgba(234,179,8,0.15)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-yellow-500/20 border border-yellow-400 text-yellow-300">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-yellow-400 uppercase font-bold tracking-wider">
                      HACKATHON CHAMPION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-mono text-white">
                      1st Place Winner — Internal Smart India Hackathon
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400">
                  YEAR 2024
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                Secured Top 1st Place across intense competitive rounds for designing and building an innovative, full-stack software prototype addressing national problem statements under strict 24-hour hackathon deadlines.
              </p>
            </div>

            {/* 2. LeetCode 350+ DSA Mastery Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border-2 border-cyan-500/40 relative overflow-hidden space-y-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300">
                    <Flame className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                      ALGORITHMIC PROBLEM SOLVER
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-mono text-white">
                      LeetCode Mastery — 350+ DSA Problems Solved
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400">
                  ACTIVE CRACKER
                </span>
              </div>

              {/* Skill Domain Meters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                {[
                  { topic: "Trees & Graphs", count: "80+ Solved" },
                  { topic: "Dynamic Programming", count: "65+ Solved" },
                  { topic: "Arrays & Strings", count: "110+ Solved" },
                  { topic: "Recursion & Backtracking", count: "50+ Solved" }
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400">{item.topic}</div>
                    <div className="text-xs font-mono font-bold text-cyan-300 mt-0.5">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. AWS Certified Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900/60 border-2 border-purple-500/40 relative overflow-hidden space-y-3 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
                      OFFICIAL CLOUD CERTIFICATION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-mono text-white">
                      AWS Certified: Cloud Technical Essentials
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400">
                  ISSUED 2025
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                Official certification by Amazon Web Services verifying core competence in AWS compute, IAM identity & access management, serverless architecture, S3 storage, networking security, and cloud deployment pipelines.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
