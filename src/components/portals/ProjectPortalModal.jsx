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
  Cpu,
  Terminal,
  Activity,
  Radio,
  Share2,
  Code2,
  ShieldCheck
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-slate-950/95 border-2 border-violet-500/40 rounded-2xl shadow-[0_0_80px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col md:flex-row cyber-cut-corner bg-cyber-grid"
        >
          {/* Cyber Top Scanning Beam */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-holo-sweep z-30" />

          {/* Corner Cyber HUD Accents */}
          <div className="pointer-events-none absolute top-2 left-2 text-[8px] font-mono text-violet-400/60 z-20">
            [SYS_POD // 0xFA49]
          </div>
          <div className="pointer-events-none absolute top-2 right-12 text-[8px] font-mono text-cyan-400/60 z-20">
            [MODE: HOLODECK_INSPECT]
          </div>

          {/* Left Sidebar: Project Selector Pods */}
          <div className="w-full md:w-80 bg-slate-950/90 border-b md:border-b-0 md:border-r border-slate-800/80 p-3 sm:p-4 flex flex-col justify-between shrink-0 relative">
            <div>
              {/* Pod Header */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2 text-violet-400 font-mono font-bold text-xs tracking-widest">
                  <div className="p-1 rounded bg-violet-500/20 border border-violet-400/50">
                    <FolderGit2 className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <span>PORTAL_PODS</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-violet-950 border border-violet-500/40 text-violet-300 font-bold">
                  {projectsData.length} ACTIVE
                </span>
              </div>

              {/* Pod Items List */}
              <div className="space-y-2 max-h-36 sm:max-h-48 md:max-h-[calc(88vh-140px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-violet-500/40">
                {projectsData.map((proj) => {
                  const isSelected = selectedProject.id === proj.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => {
                        sound.playClickSound();
                        setSelectedProject(proj);
                      }}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-200 relative group overflow-hidden ${
                        isSelected
                          ? "bg-violet-950/50 border-violet-400/80 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                          : "bg-slate-900/40 border-slate-800/80 hover:border-violet-500/40 hover:bg-slate-900/80"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500" />
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shadow-sm"
                            style={{ backgroundColor: proj.nodeColor, boxShadow: `0 0 8px ${proj.nodeColor}` }}
                          />
                          <span
                            className={`text-xs font-mono font-bold tracking-wide ${
                              isSelected ? "text-violet-200" : "text-slate-300 group-hover:text-white"
                            }`}
                          >
                            {proj.title}
                          </span>
                        </div>

                        {proj.featured && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 animate-pulse">
                            TOP
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] text-slate-400 truncate mt-1 pl-4">
                        {proj.tagline}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom telemetry status */}
            <div className="hidden md:flex items-center justify-between pt-3 border-t border-slate-800 text-[9px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                NEURAL_LINK: SYNCED
              </span>
              <span className="text-violet-400">60 FPS</span>
            </div>
          </div>

          {/* Right Main Area: Holographic Case Study Chamber */}
          <div className="flex-1 flex flex-col bg-slate-950/90 overflow-hidden relative">
            {/* Top Bar with Holographic Title */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-slate-900/90 border-b border-slate-800/90">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-xl border flex items-center justify-center"
                  style={{
                    backgroundColor: `${selectedProject.nodeColor}15`,
                    borderColor: `${selectedProject.nodeColor}60`
                  }}
                >
                  <Cpu className="w-5 h-5" style={{ color: selectedProject.nodeColor }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono tracking-wide">
                      {selectedProject.title}
                    </h3>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {selectedProject.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">{selectedProject.tagline}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClickSound();
                  onClose();
                }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-slate-950 border-b border-slate-800/80 text-xs font-mono overflow-x-auto">
              {[
                { id: "overview", label: "01 // OVERVIEW & METRICS", icon: Activity },
                { id: "architecture", label: "02 // PIPELINE ARCHITECTURE", icon: Layers },
                { id: "highlights", label: "03 // ENGINEERING WINS", icon: ShieldCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playClickSound();
                      setActiveTab(tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? "bg-violet-500/20 border-violet-400 text-violet-200 shadow-[0_0_15px_rgba(168,85,247,0.25)] font-bold"
                        : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body Content */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-violet-500/40">
              {activeTab === "overview" && (
                <div className="space-y-5">
                  {/* Hologram Summary Banner */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 to-slate-900/60 border border-violet-500/30 relative overflow-hidden space-y-2">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      MISSION SPECIFICATION & PURPOSE
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {selectedProject.summary}
                    </p>
                  </div>

                  {/* Telemetry Gauge Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(selectedProject.metrics).map(([key, val], idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 relative overflow-hidden group hover:border-violet-500/40 transition-all"
                      >
                        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                          {key}
                        </div>
                        <div className="text-base font-mono font-bold text-cyan-300 mt-1 flex items-center justify-between">
                          <span>{val}</span>
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Visualizer Chips */}
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                      ENGINEERING STACK MATRIX
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-700/80 text-xs font-mono text-violet-200 shadow-sm flex items-center gap-1.5 hover:border-violet-400 transition-colors"
                        >
                          <Code2 className="w-3 h-3 text-cyan-400" />
                          <span>{t}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Launchers */}
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-800/90">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500/25 to-violet-500/25 border-2 border-cyan-400 text-cyan-200 hover:text-white hover:bg-cyan-500/30 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)]"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>LAUNCH PRODUCTION ENGINE (LIVE DEMO)</span>
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-violet-400 text-slate-200 text-xs font-mono font-bold flex items-center gap-2 transition-all"
                      >
                        <Github className="w-4 h-4 text-violet-400" />
                        <span>VIEW SOURCE CODE (GITHUB)</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "architecture" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>SYSTEM EXECUTION PIPELINE</span>
                  </div>

                  <div className="space-y-3">
                    {selectedProject.architecture.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-all flex items-start gap-3.5 text-xs text-slate-200"
                      >
                        <div className="w-7 h-7 rounded-lg bg-violet-950 border border-violet-400 text-violet-300 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                          {`0${idx + 1}`}
                        </div>
                        <div className="space-y-1">
                          <span className="leading-relaxed font-sans">{step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "highlights" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>VERIFIED PERFORMANCE WINS</span>
                  </div>

                  <div className="space-y-3">
                    {selectedProject.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-3.5 text-xs text-slate-200"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-400 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="leading-relaxed font-sans mt-1">{h}</span>
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
