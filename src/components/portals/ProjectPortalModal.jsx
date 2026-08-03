import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  X,
  ExternalLink,
  Github,
  Zap,
  Layers,
  CheckCircle2,
  Activity,
  ArrowRight
} from "lucide-react";
import { projectsData } from "../../data/projectsData";
import { sound } from "../../utils/audioEngine";

export default function ProjectPortalModal({ isOpen, onClose, initialProjectId }) {
  const [selectedProject, setSelectedProject] = useState(
    () => projectsData.find((p) => p.id === initialProjectId) || projectsData[0]
  );
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          className="relative w-full max-w-5xl h-[88vh] bg-slate-950 border border-violet-500/50 rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.2)] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Sidebar: Project Selector Portal Nodes */}
          <div className="w-full md:w-72 bg-slate-900/80 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-violet-400 font-mono font-bold text-xs tracking-wider">
                  <FolderGit2 className="w-4 h-4" />
                  <span>PROJECT PORTALS</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">
                  {projectsData.length} MODULES
                </span>
              </div>

              <div className="space-y-2 max-h-48 md:max-h-[calc(88vh-140px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                {projectsData.map((proj) => {
                  const isSelected = selectedProject.id === proj.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => {
                        sound.playClickSound();
                        setSelectedProject(proj);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1 ${
                        isSelected
                          ? "bg-violet-950/50 border-violet-400/80 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                          : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? "text-violet-300" : "text-slate-200"
                          }`}
                        >
                          {proj.title}
                        </span>
                        {proj.featured && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 truncate">
                        {proj.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:block pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
              CLICK MODULE TO LOAD SYSTEM PORTAL SPECIFICATIONS.
            </div>
          </div>

          {/* Right Main Area: Case Study Details */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            {/* Case Study Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedProject.nodeColor }}
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-100 font-mono">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedProject.tagline}</p>
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

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-950 border-b border-slate-800/80 text-xs font-mono">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "overview"
                    ? "bg-violet-500/20 border-violet-400 text-violet-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                OVERVIEW & LINKS
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "architecture"
                    ? "bg-violet-500/20 border-violet-400 text-violet-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                SYSTEM ARCHITECTURE
              </button>
              <button
                onClick={() => setActiveTab("highlights")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "highlights"
                    ? "bg-violet-500/20 border-violet-400 text-violet-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                ENGINEERING HIGHLIGHTS
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-violet-500/30">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest block">
                      SYSTEM DESCRIPTION
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedProject.summary}
                    </p>
                  </div>

                  {/* Telemetry Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(selectedProject.metrics).map(([key, val], idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-900/40 border border-slate-800"
                      >
                        <div className="text-[10px] font-mono text-slate-400 uppercase">
                          {key}
                        </div>
                        <div className="text-sm font-mono font-bold text-cyan-300 mt-1">
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      TECHNOLOGY STACK NODES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>LAUNCH LIVE DEMO ENGINE</span>
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-violet-400 text-xs font-mono font-bold flex items-center gap-2 transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>INSPECT CODE REPOSITORY</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "architecture" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold">
                    <Layers className="w-4 h-4" />
                    <span>SYSTEM PIPELINE ARCHITECTURE</span>
                  </div>

                  <div className="space-y-3">
                    {selectedProject.architecture.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300"
                      >
                        <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-400 text-violet-300 flex items-center justify-center font-mono font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <span className="leading-relaxed mt-0.5">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "highlights" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                    <Zap className="w-4 h-4" />
                    <span>ENGINEERING HIGHLIGHTS & WINS</span>
                  </div>

                  <div className="space-y-3">
                    {selectedProject.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
