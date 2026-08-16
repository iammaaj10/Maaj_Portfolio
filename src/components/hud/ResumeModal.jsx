import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Download, Copy, Check, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Shield, Award, Terminal } from "lucide-react";
import { developerProfile } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `
MAAJ BHADAGAONKAR
Full-stack SDE | Pune, Maharashtra, India
Phone: ${developerProfile.phone} | Email: ${developerProfile.email}
LinkedIn: ${developerProfile.linkedin} | GitHub: ${developerProfile.github}
Portfolio: ${developerProfile.portfolio}

PROFESSIONAL SUMMARY:
${developerProfile.bio}

TECHNICAL SKILLS:
- Languages: Java, Python, JavaScript, SQL
- Frontend: React.js, Next.js, HTML, CSS, TypeScript, TailwindCSS
- Backend: Node.js, Express.js, REST APIs, Socket.IO
- Databases: MongoDB, PostgreSQL, Supabase
- Tools: Git, GitHub, Docker, Postman, Figma
- Core CS: OOP, DSA, Linux, Cloud, Machine Learning

EXPERIENCE:
1. Vulnuris Security Solutions — Full Stack Developer Intern (Dec 2025 – Jul 2026)
   - Built SignTrace digital signature platform with facial recognition, snapshots, user certificates, and liveness detection.
   - Stack: React.js, TypeScript, Node.js, MongoDB, AWS, Express.js
2. Tregadevs — Full Stack Developer Intern (Nov 2025 – Jan 2026)
   - Built role-based education platform with secure auth and scalable APIs.
   - Stack: Next.js, Node.js, Prisma, PostgreSQL, TypeScript
3. Shoro AI Lab — Full Stack Developer Intern (Apr 2025 – Jul 2025)
   - Developed Shoro AI US driving platform with MCQs, flashcards, AI chatbots, and RAG prep.
   - Stack: Next.js, GraphQL, RAG, MongoDB
4. BlueStock Fintech — Frontend Developer Intern (Jan 2025 – Mar 2025)
   - Developed IPO dashboard and frontend auth for real-time stock insights.
   - Stack: React.js, JavaScript, TailwindCSS, REST APIs

PROJECTS:
1. Narratia — AI Collaborative Storytelling Suite (2026)
   - Multi-user editing, Gemini 2.0 LLM, emotion heatmaps, screenplay PDF export (+40% team productivity).
   - Stack: Next.js, Supabase, TipTap, PostgreSQL, Recharts, TailwindCSS, TypeScript, jsPDF
2. ClauseLens — Privacy-First Clause Scanner (2026)
   - 100% local air-gapped Chrome Extension (MV3), WASM semantic embeddings (<50ms scans).
   - Stack: React 19, Vite, CRXJS, TailwindCSS, WebAssembly, Transformers.js, Chrome MV3
3. MechHelp — Mechanic Services Dispatch Platform (2025)
   - Real-time 50km geo-tracking dispatch, Socket.IO chat, tested with 25+ mechanics & 50+ users.
   - Stack: React.js, Node.js, Express.js, MongoDB, React Leaflet, JWT, Socket.IO

EDUCATION:
- B.Tech in CSE @ DKTE Society's Textile and Engineering Institute (2023–2026) — CGPA: 8.46
- Diploma in Computer Engineering @ Sant Gajanan Maharaj Rural Polytechnic (2020–2023) — 89.09%
- 10th SSC @ Rosary English High School (2019–2020) — 86.60%

ACHIEVEMENTS:
- 1st Place Winner, Internal Smart India Hackathon (SIH) 2024
- 350+ LeetCode DSA Problems Solved
- AWS Certified: Cloud Technical Essentials (2025)
    `.trim();

    navigator.clipboard.writeText(text);
    sound.playClickSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950/95 border-2 border-cyan-500/40 rounded-2xl shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col cyber-cut-corner bg-cyber-grid"
        >
          {/* Hologram scan line */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-holo-sweep z-30" />

          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/60 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <FileText className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-mono font-bold text-slate-100 tracking-wider">
                    SDE DOSSIER // RESUME PROTOCOL
                  </h2>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                    SECURITY_CLEARANCE: TOP_1%
                  </span>
                </div>
                <p className="text-xs font-mono text-cyan-400">
                  MAAJ BHADAGAONKAR • PUNE, INDIA • OPEN FOR ENTRY-LEVEL SDE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400 text-xs font-mono font-bold text-cyan-200 hover:bg-cyan-500/20 flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED RAW TEXT" : "COPY RESUME"}</span>
              </button>

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
          </div>

          {/* Main Resume Viewer Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-cyan-500/40 font-sans">
            {/* Header Contact Strip */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-slate-900/60 border border-cyan-500/30 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono tracking-wide">
                    {developerProfile.name}
                  </h1>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">
                    {developerProfile.role} • {developerProfile.location}
                  </p>
                </div>

                <a
                  href={`mailto:${developerProfile.email}`}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-200 text-xs font-mono font-bold hover:bg-cyan-500/30 flex items-center gap-2 transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{developerProfile.email}</span>
                </a>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  {developerProfile.phone}
                </span>
                <a
                  href={developerProfile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  LinkedIn Profile
                </a>
                <a
                  href={developerProfile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  GitHub Repository
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                PROFESSIONAL SUMMARY
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {developerProfile.bio}
              </p>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-yellow-500/30 space-y-1">
                <span className="text-[10px] font-mono text-yellow-400 uppercase font-bold block">
                  LEETCODE MASTER
                </span>
                <div className="text-base sm:text-lg font-bold text-white font-mono">350+ Solved</div>
                <p className="text-[11px] text-slate-400">DSA & Algorithmic Problem Solving</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                  HACKATHON WINNER
                </span>
                <div className="text-base sm:text-lg font-bold text-white font-mono">1st Place SIH 2024</div>
                <p className="text-[11px] text-slate-400">Internal Smart India Hackathon</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/30 space-y-1">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">
                  B.TECH CSE GRADE
                </span>
                <div className="text-base sm:text-lg font-bold text-white font-mono">8.46 CGPA</div>
                <p className="text-[11px] text-slate-400">DKTE Textile & Eng. Institute</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
