import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Download, Copy, Check, ExternalLink, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
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

SKILLS:
- Languages: Java, Python, JavaScript, SQL
- Frontend: React.js, Next.js, HTML, CSS, TypeScript, TailwindCSS
- Backend: Node.js, Express.js, REST APIs, Socket.IO
- Databases: MongoDB, PostgreSQL, Supabase
- Tools & Core: Git, GitHub, Docker, Postman, Figma, OOP, DSA, Linux, AWS

EXPERIENCE:
1. Vulnuris Security Solutions — Full Stack Developer Intern (Dec 2025 – Jul 2026)
2. Tregadevs — Full Stack Developer Intern (Nov 2025 – Jan 2026)
3. Shoro AI Lab — Full Stack Developer Intern (Apr 2025 – Jul 2025)
4. BlueStock Fintech — Frontend Developer Intern (Jan 2025 – Mar 2025)

EDUCATION:
- B.Tech CSE @ DKTE Society's Textile and Engineering Institute (2023–2026) — CGPA: 8.46
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          className="relative w-full max-w-4xl max-h-[88vh] bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
                <FileText className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-mono font-bold text-slate-100">
                  OFFICIAL RESUME PROTOCOL
                </h2>
                <p className="text-xs font-mono text-cyan-400">
                  MAAJ BHADAGAONKAR // SDE SPECIFICATION
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "COPIED RAW TEXT" : "COPY RESUME"}</span>
              </button>

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
          </div>

          {/* Main Resume Viewer Body */}
          <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/30 font-sans">
            {/* Header Contact Strip */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-100 font-mono tracking-wide">
                    {developerProfile.name}
                  </h1>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">
                    {developerProfile.role} • {developerProfile.location}
                  </p>
                </div>

                <a
                  href={`mailto:${developerProfile.email}`}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-500/30 flex items-center gap-2 transition-all"
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

            {/* Summary */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                PROFESSIONAL SUMMARY
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {developerProfile.bio}
              </p>
            </div>

            {/* Resume Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-yellow-400 uppercase font-bold block">
                  LEETCODE MASTER
                </span>
                <div className="text-base font-bold text-slate-100 font-mono">350+ Solved</div>
                <p className="text-[11px] text-slate-400">DSA & Algorithmic Problem Solving</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                  HACKATHON WINNER
                </span>
                <div className="text-base font-bold text-slate-100 font-mono">1st Place SIH 2024</div>
                <p className="text-[11px] text-slate-400">Internal Smart India Hackathon</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">
                  B.TECH CSE GRADE
                </span>
                <div className="text-base font-bold text-slate-100 font-mono">8.46 CGPA</div>
                <p className="text-[11px] text-slate-400">DKTE Textile & Eng. Institute</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
