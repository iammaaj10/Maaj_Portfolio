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
  ShieldCheck,
  Target,
  ArrowDown
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-slate-900/90 border-b border-slate-800/90 gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div
                  className="p-3 rounded border border-dashed flex flex-col items-center justify-center shrink-0 relative overflow-hidden"
                  style={{
                    backgroundColor: `${selectedProject.nodeColor}10`,
                    borderColor: `${selectedProject.nodeColor}60`
                  }}
                >
                  <Target className="w-6 h-6 animate-[spin_4s_linear_infinite]" style={{ color: selectedProject.nodeColor }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-50" />
                </div>
                
                <div className="flex flex-col">
                  <div className="text-[10px] font-mono text-red-500 uppercase tracking-[0.2em] mb-0.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    TARGET ACQUIRED
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono tracking-widest uppercase">
                    {selectedProject.title}
                  </h3>
                  <div className="text-[10px] font-mono text-cyan-400 mt-1 uppercase tracking-wider">
                    {selectedProject.tagline}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                      STATUS: OPERATIONAL
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClickSound();
                  onClose();
                }}
                className="self-start sm:self-center p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-slate-950 border-b border-slate-800/80 text-[10px] font-mono overflow-x-auto tracking-widest uppercase">
              {[
                { id: "overview", label: "01 // OVERVIEW", icon: Activity },
                { id: "architecture", label: "02 // ARCHITECTURE TRACE", icon: Layers },
                ...(selectedProject.securityAnalysis ? [{ id: "security", label: "03 // SECURITY ANALYSIS", icon: ShieldCheck }] : [])
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
                    className={`px-3 py-2 rounded-sm border transition-all flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)] font-bold"
                        : "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-800"
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
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                    <Layers className="w-4 h-4" />
                    <span>SYSTEM ARCHITECTURE TRACE</span>
                  </div>

                  {selectedProject.architectureTrace ? (
                    <div className="p-6 rounded bg-slate-950 border border-slate-800 font-mono text-sm relative">
                      {/* Animated scanning line behind trace */}
                      <div className="absolute top-0 bottom-0 left-12 w-px bg-slate-800 z-0" />
                      <motion.div
                        className="absolute top-0 bottom-0 left-12 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent z-0"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                      
                      <div className="flex flex-col items-start gap-4 relative z-10">
                        {selectedProject.architectureTrace.map((node, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.15 }}
                              className="px-4 py-2 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-bold tracking-wider text-xs ml-8 relative"
                            >
                              {/* Connection Node */}
                              <div className="absolute top-1/2 -left-4 w-4 h-px bg-slate-600" />
                              <div className="absolute top-1/2 -left-5 w-2 h-2 -mt-1 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                              
                              {node}
                            </motion.div>
                            {i < selectedProject.architectureTrace.length - 1 && (
                              <ArrowDown className="w-4 h-4 text-slate-600 my-2 ml-8 opacity-50" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedProject.architecture.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded bg-slate-900/60 border border-slate-800 flex items-start gap-3.5 text-xs text-slate-300"
                        >
                          <div className="w-6 h-6 rounded bg-slate-950 border border-slate-700 text-cyan-400 flex items-center justify-center font-mono font-bold shrink-0">
                            {`0${idx + 1}`}
                          </div>
                          <span className="leading-relaxed font-sans">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "security" && selectedProject.securityAnalysis && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      <span>SECURITY & THREAT ANALYSIS</span>
                    </div>
                    <span className="px-2 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] font-mono rounded animate-pulse">
                      SCANNING
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded p-6 font-mono text-xs sm:text-sm tracking-widest uppercase relative overflow-hidden">
                    {/* Visual Scanning Animation */}
                    <motion.div
                      className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none"
                      animate={{ y: ["-100%", "400%"] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                    
                    <div className="space-y-4">
                      {Object.entries(selectedProject.securityAnalysis).map(([key, status], idx) => {
                        const isAnalyzed = status === "ANALYZED";
                        const isZero = status === "ZERO";
                        return (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex items-center justify-between border-b border-slate-800 pb-2"
                          >
                            <span className="text-slate-400">{key.replace(/_/g, " ")}</span>
                            <span className={`font-bold ${isAnalyzed ? "text-amber-400" : isZero ? "text-slate-300" : "text-emerald-400"}`}>
                              {status}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
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
