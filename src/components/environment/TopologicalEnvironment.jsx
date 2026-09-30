import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../../data/projectsData";
import { experienceData, developerProfile, academicData, achievementsData, engineeringSignals } from "../../data/mindSystemData";
import ProjectDissection from "./ProjectDissection";
import SecretTerminal from "../terminal/SecretTerminal";
import { audioSystem } from "../../utils/audioSystem";

// ─── TOPOLOGY NODE DEFINITIONS ─────────────────────────────────────────
const TOPOLOGY_NODES = [
  {
    id: "identity",
    label: "MAAJ",
    sublabel: "FULL-STACK ENGINEER",
    x: 50, y: 42,
    isCore: true,
    content: "identity",
  },
  {
    id: "projects",
    label: "PROJECTS",
    sublabel: "6 SYSTEMS BUILT",
    x: 50, y: 15,
    content: "projects",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    sublabel: "4 INTERNSHIPS",
    x: 18, y: 32,
    content: "experience",
  },
  {
    id: "engineering",
    label: "ENGINEERING",
    sublabel: "SIGNALS & STACK",
    x: 82, y: 32,
    content: "skills",
  },
  {
    id: "achievements",
    label: "ACHIEVEMENTS",
    sublabel: "SIH · LEETCODE · AWS",
    x: 18, y: 62,
    content: "achievements",
  },
  {
    id: "philosophy",
    label: "PHILOSOPHY",
    sublabel: "HOW I THINK",
    x: 82, y: 62,
    content: "philosophy",
  },
  {
    id: "contact",
    label: "CONTACT",
    sublabel: "ESTABLISH CONNECTION",
    x: 50, y: 82,
    content: "contact",
  },
];

// ─── EDGE CONNECTIONS (all radiate from center) ────────────────────────
const EDGES = [
  ["identity", "projects"],
  ["identity", "experience"],
  ["identity", "engineering"],
  ["identity", "achievements"],
  ["identity", "philosophy"],
  ["identity", "contact"],
  ["projects", "engineering"],
  ["experience", "achievements"],
  ["engineering", "philosophy"],
  ["achievements", "contact"],
  ["philosophy", "contact"],
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────
export default function TopologicalEnvironment() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState(null);
  const [openProject, setOpenProject] = useState(null);
  const [expandedContent, setExpandedContent] = useState(null);
  const [isQuickScan, setIsQuickScan] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [explorationPath, setExplorationPath] = useState([]);
  const [systemTime, setSystemTime] = useState("");
  const containerRef = useRef(null);
  const dims = useRef({ w: window.innerWidth, h: window.innerHeight });

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Track mouse
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleResize = () => { dims.current = { w: window.innerWidth, h: window.innerHeight }; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Track exploration
  const trackExplore = useCallback((label) => {
    setExplorationPath((prev) => {
      if (prev[prev.length - 1] === label) return prev;
      return [...prev.slice(-8), label];
    });
  }, []);

  // ── Node position with semantic gravity ──
  const getNodePos = useCallback((node) => {
    const w = dims.current.w;
    const h = dims.current.h;
    const baseX = (node.x / 100) * w;
    const baseY = (node.y / 100) * h;

    if (openProject || expandedContent || isQuickScan) {
      return { x: baseX, y: baseY, opacity: 0.03, scale: 0.8 };
    }

    const dx = mousePos.x - baseX;
    const dy = mousePos.y - baseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pullRadius = 250;

    let pullX = 0, pullY = 0, opacity = 0.3, scale = 1;

    if (dist < pullRadius) {
      const force = (pullRadius - dist) / pullRadius;
      pullX = dx * force * 0.1;
      pullY = dy * force * 0.1;
      opacity = 0.3 + force * 0.7;
      scale = 1 + force * 0.06;
    }

    if (node.isCore) {
      opacity = Math.max(opacity, 0.6);
      scale = Math.max(scale, 1.0);
    }

    if (activeNode === node.id) {
      opacity = 1;
      scale = node.isCore ? 1.05 : 1.12;
    } else if (activeNode) {
      opacity = 0.08;
      scale = 0.95;
    }

    return { x: baseX + pullX, y: baseY + pullY, opacity, scale };
  }, [mousePos, activeNode, openProject, expandedContent, isQuickScan]);

  // ── Handle node click ──
  const handleNodeClick = useCallback((node) => {
    trackExplore(node.label);
    if (activeNode === node.id) {
      if (node.content) setExpandedContent(node.content);
      return;
    }
    setActiveNode(node.id);
  }, [activeNode, trackExplore]);

  // ── Handle project click ──
  const handleProjectClick = useCallback((projId) => {
    const proj = projectsData.find((p) => p.id === projId);
    if (proj) {
      trackExplore(proj.title);
      setOpenProject(proj);
    }
  }, [trackExplore]);

  // ── Close overlays ──
  const handleCloseOverlay = useCallback(() => {
    setOpenProject(null);
    setExpandedContent(null);
    setIsQuickScan(false);
  }, []);

  // Esc key & Terminal hotkey
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
        if (!isTerminalOpen) audioSystem.init();
      }
      
      if (e.key === "Escape") {
        if (isTerminalOpen) setIsTerminalOpen(false);
        else if (openProject) setOpenProject(null);
        else if (expandedContent) setExpandedContent(null);
        else if (isQuickScan) setIsQuickScan(false);
        else if (activeNode) setActiveNode(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openProject, expandedContent, isQuickScan, activeNode, isTerminalOpen]);

  // Handle node interactions with sound
  const handleNodeClickWithSound = useCallback((node) => {
    audioSystem.init();
    audioSystem.playClick();
    handleNodeClick(node);
  }, [handleNodeClick]);

  const handleNodeHover = () => {
    audioSystem.init();
    audioSystem.playHover();
  };

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[#050505] overflow-hidden">

      {/* ── Subtle dot grid ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, #222 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* ── Edge lines (SVG) ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {EDGES.map(([fromId, toId]) => {
          const fn = TOPOLOGY_NODES.find((n) => n.id === fromId);
          const tn = TOPOLOGY_NODES.find((n) => n.id === toId);
          if (!fn || !tn) return null;
          const w = dims.current.w, h = dims.current.h;
          const x1 = (fn.x / 100) * w, y1 = (fn.y / 100) * h;
          const x2 = (tn.x / 100) * w, y2 = (tn.y / 100) * h;
          const isHL = activeNode === fromId || activeNode === toId;
          const isCore = fn.isCore || tn.isCore;
          return (
            <line key={`${fromId}-${toId}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isHL ? "#E24A2B" : isCore ? "#333" : "#222"}
              strokeWidth={isHL ? 1.5 : 0.5}
              strokeDasharray={isCore ? "none" : "4 8"}
              opacity={openProject || expandedContent || isQuickScan ? 0.05 : 1}
              style={{ transition: "all 0.6s ease" }}
            />
          );
        })}
      </svg>

      {/* ── Topology Nodes ── */}
      {TOPOLOGY_NODES.map((node) => {
        const pos = getNodePos(node);
        const isActive = activeNode === node.id;

        return (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center z-10"
            style={{ cursor: "crosshair" }}
            animate={{
              left: pos.x, top: pos.y,
              opacity: pos.opacity, scale: pos.scale,
              x: "-50%", y: "-50%",
            }}
            transition={{ type: "spring", damping: 35, stiffness: 180, mass: 0.8 }}
            onClick={() => handleNodeClickWithSound(node)}
            onMouseEnter={handleNodeHover}
          >
            {/* Node marker */}
            {node.isCore ? (
              <div className="relative mb-4">
                <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${isActive ? "bg-[#E24A2B]" : "bg-[#555]"}`} />
                <div className={`absolute -inset-2 rounded-full border transition-colors duration-500 ${isActive ? "border-[#E24A2B]/40" : "border-[#444]"}`} />
              </div>
            ) : (
              <div className={`w-1.5 h-1.5 rounded-full mb-3 transition-colors duration-300 ${isActive ? "bg-[#E24A2B]" : "bg-[#555]"}`} />
            )}

            {/* Label */}
            <div className={`font-mono tracking-[0.2em] transition-all duration-300 ${
              node.isCore ? "text-base font-medium" : "text-[11px]"
            } ${isActive ? "text-[#F5F5F0]" : node.isCore ? "text-[#a3a3a3]" : "text-[#777]"}`}>
              {node.label}
            </div>

            {/* Sublabel */}
            <div className={`font-mono text-[8px] tracking-[0.15em] mt-1 transition-all duration-300 ${
              isActive ? "text-[#a3a3a3]" : "text-[#555]"
            }`}>
              {node.sublabel}
            </div>

            {/* Hint when active */}
            <AnimatePresence>
              {isActive && !openProject && !expandedContent && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-[9px] text-[#888] font-mono tracking-widest"
                >
                  {node.content === "projects" ? "SELECT A SYSTEM BELOW" : "CLICK AGAIN TO EXPAND"}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Projects dropdown (only for PROJECTS node) */}
            <AnimatePresence>
              {isActive && node.content === "projects" && !openProject && !expandedContent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ staggerChildren: 0.05 }}
                  className="absolute top-14 flex flex-col items-center"
                >
                  {/* HUD Tether Line */}
                  <div className="w-px h-6 bg-gradient-to-b from-[#E24A2B] to-transparent mb-2" />
                  
                  {/* Glassmorphism Container */}
                  <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-[#333]/50 p-3 flex flex-col gap-2 shadow-2xl relative">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#555]" />
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#555]" />
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#555]" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#555]" />
                    
                    {projectsData.filter(p => p.featured).map((proj) => (
                      <motion.button
                        key={proj.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          audioSystem.playClick();
                          handleProjectClick(proj.id); 
                        }}
                        onMouseEnter={handleNodeHover}
                        className="group text-[10px] font-mono text-[#a3a3a3] border border-[#222] px-6 py-2.5 tracking-[0.15em] hover:text-[#F5F5F0] hover:border-[#E24A2B] hover:bg-[#E24A2B]/5 transition-all duration-200 flex items-center justify-between min-w-[180px]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-1 h-1 rounded-full bg-[#555] group-hover:bg-[#E24A2B] transition-colors shadow-[0_0_8px_rgba(226,74,43,0)] group-hover:shadow-[0_0_8px_rgba(226,74,43,0.8)]" />
                          {proj.title.toUpperCase()}
                        </div>
                        {proj.liveUrl && <span className="text-[7px] text-[#E24A2B] border border-[#E24A2B]/30 px-1.5 py-0.5 ml-3">LIVE</span>}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* ═══════════════ OVERLAYS ═══════════════ */}

      {/* ── PROJECT DISSECTION ── */}
      <AnimatePresence>
        {openProject && <ProjectDissection project={openProject} onClose={handleCloseOverlay} />}
      </AnimatePresence>

      {/* ── IDENTITY / ABOUT ── */}
      <AnimatePresence>
        {expandedContent === "identity" && (
          <ContentOverlay title="SYSTEM CORE — DEVELOPER IDENTITY" onClose={handleCloseOverlay}>
            <div className="max-w-xl space-y-8">
              <div>
                <h2 className="text-3xl font-mono text-[#F5F5F0] mb-2">{developerProfile.name}</h2>
                <div className="text-xs text-[#888] font-mono">{developerProfile.role}</div>
                <div className="text-[10px] text-[#E24A2B] font-mono mt-2 tracking-widest">{developerProfile.status}</div>
              </div>
              <div className="w-12 h-px bg-[#222]" />
              <p className="text-sm text-[#999] leading-relaxed">{developerProfile.bio}</p>
              <div className="w-12 h-px bg-[#222]" />
              <div>
                <div className="text-[9px] font-mono text-[#555] tracking-widest uppercase mb-4">CORE STATS</div>
                <div className="space-y-3">
                  {developerProfile.stats.map((s) => (
                    <div key={s.label} className="flex justify-between text-xs font-mono border-b border-[#141414] pb-2">
                      <span className="text-[#666]">{s.label}</span>
                      <span className="text-[#F5F5F0]">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-[#555] tracking-widest uppercase mb-4">EDUCATION</div>
                {academicData.map((a, i) => (
                  <div key={i} className="mb-4">
                    <div className="text-sm text-[#F5F5F0] font-mono">{a.degree}</div>
                    <div className="text-[10px] text-[#666] mt-0.5">{a.institution} · {a.period}</div>
                    <div className="text-[10px] text-[#E24A2B] font-mono mt-1">{a.grade}</div>
                  </div>
                ))}
              </div>
            </div>
          </ContentOverlay>
        )}
      </AnimatePresence>

      {/* ── PROJECTS LIST ── */}
      <AnimatePresence>
        {expandedContent === "projects" && (
          <ContentOverlay title="ALL SYSTEMS" onClose={handleCloseOverlay} wide>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsData.map((proj) => (
                <div key={proj.id}
                  className="border border-[#1a1a1a] p-6 hover:border-[#E24A2B] transition-all duration-300 cursor-crosshair group"
                  onClick={() => { setExpandedContent(null); setOpenProject(proj); }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm font-mono text-[#F5F5F0] group-hover:text-[#E24A2B] transition-colors">{proj.title}</div>
                      <div className="text-[10px] text-[#666] mt-0.5">{proj.tagline}</div>
                    </div>
                    <div className="text-[8px] font-mono text-[#333] tracking-widest uppercase">{proj.category}</div>
                  </div>
                  <p className="text-xs text-[#777] leading-relaxed mb-4 line-clamp-2">{proj.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.tech.slice(0, 5).map((t) => (
                      <span key={t} className="text-[8px] font-mono text-[#555] border border-[#1a1a1a] px-1.5 py-0.5">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                        className="text-[9px] font-mono text-[#E24A2B] hover:text-[#F5F5F0] transition-colors tracking-widest">LIVE →</a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                        className="text-[9px] font-mono text-[#555] hover:text-[#F5F5F0] transition-colors tracking-widest">SOURCE →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ContentOverlay>
        )}
      </AnimatePresence>

      {/* ── EXPERIENCE ── */}
      <AnimatePresence>
        {expandedContent === "experience" && (
          <ContentOverlay title="EXPERIENCE TIMELINE" onClose={handleCloseOverlay}>
            <div className="space-y-10 max-w-xl">
              {experienceData.map((exp, i) => (
                <div key={i} className="border-l border-[#1a1a1a] pl-6 relative">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#E24A2B]" />
                  <div className="text-[9px] font-mono text-[#444] tracking-widest mb-2">{exp.period}</div>
                  <div className="text-sm text-[#F5F5F0] font-mono mb-1">{exp.role}</div>
                  <div className="text-xs text-[#666] mb-4">{exp.company}</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.stack.map((t) => (
                      <span key={t} className="text-[8px] font-mono text-[#555] border border-[#1a1a1a] px-2 py-0.5">{t}</span>
                    ))}
                  </div>
                  {exp.achievements.map((a, j) => (
                    <div key={j} className="text-xs text-[#888] leading-relaxed mb-2 pl-3 border-l border-[#1a1a1a]">{a}</div>
                  ))}
                </div>
              ))}
            </div>
          </ContentOverlay>
        )}
      </AnimatePresence>

      {/* ── ENGINEERING SIGNALS ── */}
      <AnimatePresence>
        {expandedContent === "skills" && (
          <ContentOverlay title="ENGINEERING SIGNALS" onClose={handleCloseOverlay}>
            <div className="space-y-8 max-w-xl">
              {engineeringSignals.map((sig, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sig.color }} />
                  <div className="text-[10px] font-mono tracking-widest text-[#666] mb-1">{sig.name}</div>
                  <div className="text-sm text-[#F5F5F0] font-mono mb-2">{sig.value}</div>
                  <div className="text-xs text-[#777] leading-relaxed">{sig.evidence}</div>
                </div>
              ))}
            </div>
          </ContentOverlay>
        )}
      </AnimatePresence>

      {/* ── ACHIEVEMENTS ── */}
      <AnimatePresence>
        {expandedContent === "achievements" && (
          <ContentOverlay title="VERIFIED ACHIEVEMENTS" onClose={handleCloseOverlay}>
            <div className="space-y-8 max-w-xl">
              {achievementsData.map((ach, i) => (
                <div key={i} className="border border-[#1a1a1a] p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm text-[#F5F5F0] font-mono">{ach.title}</div>
                      <div className="text-[10px] text-[#666] mt-0.5">{ach.event}</div>
                    </div>
                    <div className="text-[9px] font-mono text-[#E24A2B] tracking-widest">{ach.year}</div>
                  </div>
                  <p className="text-xs text-[#888] leading-relaxed">{ach.description}</p>
                  <div className="mt-3 text-[8px] font-mono text-[#444] tracking-widest uppercase">{ach.category}</div>
                </div>
              ))}
            </div>
          </ContentOverlay>
        )}
      </AnimatePresence>

      {/* ── PHILOSOPHY ── */}
      <AnimatePresence>
        {expandedContent === "philosophy" && (
          <ContentOverlay title="ENGINEERING PHILOSOPHY" onClose={handleCloseOverlay}>
            <div className="max-w-xl space-y-10">
              <div>
                <div className="text-[9px] font-mono text-[#444] tracking-widest uppercase mb-6">CORE PRINCIPLES</div>
                {developerProfile.principles.map((p, i) => (
                  <div key={i} className="flex gap-4 mb-6">
                    <div className="text-[10px] font-mono text-[#333] mt-0.5">0{i + 1}</div>
                    <div className="text-sm text-[#ccc] leading-relaxed border-l border-[#1a1a1a] pl-4">{p}</div>
                  </div>
                ))}
              </div>
              <div className="w-12 h-px bg-[#1a1a1a]" />
              <div>
                <div className="text-[9px] font-mono text-[#444] tracking-widest uppercase mb-6">WHAT I OPTIMIZE FOR</div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { metric: "PERFORMANCE", target: "Sub-50ms response targets" },
                    { metric: "PRIVACY", target: "Air-gapped when possible" },
                    { metric: "CLARITY", target: "Code as communication" },
                    { metric: "RESILIENCE", target: "Graceful degradation" },
                    { metric: "SECURITY", target: "Zero-trust boundaries" },
                    { metric: "SCALABILITY", target: "Cloud-native architecture" },
                  ].map((item) => (
                    <div key={item.metric} className="border border-[#141414] p-4">
                      <div className="text-[9px] font-mono text-[#E24A2B] tracking-widest mb-1">{item.metric}</div>
                      <div className="text-[11px] text-[#888]">{item.target}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ContentOverlay>
        )}
      </AnimatePresence>

      {/* ── CONTACT ── */}
      <AnimatePresence>
        {expandedContent === "contact" && (
          <ContentOverlay title="ESTABLISH CONNECTION" onClose={handleCloseOverlay}>
            <div className="flex flex-col items-center text-center max-w-md mx-auto space-y-8 pt-8">
              <h2 className="text-3xl font-mono text-[#F5F5F0] tracking-widest">{developerProfile.name.toUpperCase()}</h2>
              <div className="text-[10px] font-mono text-[#555] tracking-widest uppercase space-y-1.5">
                <div>FULL-STACK ENGINEER</div>
                <div className="text-[#444]">AI SYSTEMS · SECURITY · PRODUCT</div>
              </div>
              <div className="w-16 h-px bg-[#1a1a1a]" />
              <div className="text-[10px] font-mono text-[#E24A2B] tracking-widest">{developerProfile.status}</div>
              <div className="space-y-4 font-mono text-sm w-full">
                <a href={`mailto:${developerProfile.email}`}
                  className="block border border-[#1a1a1a] p-4 text-[#888] hover:text-[#E24A2B] hover:border-[#E24A2B]/30 transition-all">
                  {developerProfile.email}
                </a>
                <a href={developerProfile.github} target="_blank" rel="noreferrer"
                  className="block border border-[#1a1a1a] p-4 text-[#888] hover:text-[#F5F5F0] hover:border-[#333] transition-all">
                  GITHUB → {developerProfile.github.replace("https://", "")}
                </a>
                <a href={developerProfile.linkedin} target="_blank" rel="noreferrer"
                  className="block border border-[#1a1a1a] p-4 text-[#888] hover:text-[#F5F5F0] hover:border-[#333] transition-all">
                  LINKEDIN → {developerProfile.linkedin.replace("https://", "")}
                </a>
                <div className="border border-[#1a1a1a] p-4 text-[#666]">
                  {developerProfile.phone}
                </div>
              </div>
              <div className="mt-8 text-[10px] font-mono text-[#333] tracking-widest">
                {">"} establish_connection()<span className="animate-pulse">_</span>
              </div>
            </div>
          </ContentOverlay>
        )}
      </AnimatePresence>

      {/* ── QUICK SCAN (60 SECOND SCAN) ── */}
      <AnimatePresence>
        {isQuickScan && (
          <ContentOverlay title="60 SECOND SCAN" onClose={handleCloseOverlay} wide>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left: Profile */}
              <div className="space-y-8">
                <div>
                  <div className="text-[9px] font-mono text-[#444] tracking-widest mb-2">ENGINEER</div>
                  <div className="text-2xl font-mono text-[#F5F5F0]">{developerProfile.name}</div>
                  <div className="text-xs text-[#888] mt-1">{developerProfile.role}</div>
                  <div className="text-[10px] text-[#E24A2B] font-mono mt-2">{developerProfile.status}</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-[#444] tracking-widest mb-3">CORE STATS</div>
                  {developerProfile.stats.map((s) => (
                    <div key={s.label} className="flex justify-between text-xs font-mono border-b border-[#141414] pb-2 mb-2">
                      <span className="text-[#666]">{s.label}</span>
                      <span className="text-[#F5F5F0]">{s.value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[9px] font-mono text-[#444] tracking-widest mb-3">EXPERIENCE</div>
                  {experienceData.map((e, i) => (
                    <div key={i} className="mb-3">
                      <div className="text-xs text-[#F5F5F0] font-mono">{e.role}</div>
                      <div className="text-[10px] text-[#555]">{e.company} · {e.period}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[9px] font-mono text-[#444] tracking-widest mb-3">LINKS</div>
                  <div className="text-xs font-mono space-y-1.5">
                    <a href={`mailto:${developerProfile.email}`} className="block text-[#888] hover:text-[#E24A2B] transition-colors">{developerProfile.email}</a>
                    <a href={developerProfile.github} target="_blank" rel="noreferrer" className="block text-[#888] hover:text-[#E24A2B] transition-colors">{developerProfile.github}</a>
                    <a href={developerProfile.linkedin} target="_blank" rel="noreferrer" className="block text-[#888] hover:text-[#E24A2B] transition-colors">{developerProfile.linkedin}</a>
                  </div>
                </div>
              </div>
              {/* Right: Projects + Signals */}
              <div className="space-y-8">
                <div className="text-[9px] font-mono text-[#444] tracking-widest mb-3">TOP PROJECTS</div>
                {projectsData.filter((p) => p.featured).map((proj) => (
                  <div key={proj.id} className="border border-[#141414] p-5 hover:border-[#E24A2B] transition-colors cursor-crosshair"
                    onClick={() => { setIsQuickScan(false); setOpenProject(proj); }}>
                    <div className="text-sm font-mono text-[#F5F5F0] mb-1">{proj.title}</div>
                    <div className="text-[10px] text-[#666] mb-3">{proj.tagline}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.slice(0, 5).map((t) => (
                        <span key={t} className="text-[8px] font-mono text-[#444] border border-[#1a1a1a] px-1.5 py-0.5">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-3">
                      {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-[9px] font-mono text-[#E24A2B] hover:text-[#F5F5F0] transition-colors tracking-widest">LIVE →</a>}
                      {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-[9px] font-mono text-[#555] hover:text-[#F5F5F0] transition-colors tracking-widest">SOURCE →</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContentOverlay>
        )}
      </AnimatePresence>

      {/* ═══════════════ PERSISTENT HUD ═══════════════ */}

      {/* Bottom left: Exploration path */}
      <div className="absolute bottom-5 left-6 z-20 pointer-events-none max-w-[300px]">
        <div className="text-[7px] font-mono text-[#555] tracking-widest uppercase mb-1">YOUR EXPLORATION</div>
        <div className="text-[9px] font-mono text-[#888] tracking-wider">
          {explorationPath.length === 0 ? "—" : explorationPath.join(" → ")}
        </div>
      </div>

      {/* Bottom right: System status */}
      <div className="absolute bottom-5 right-6 z-20 pointer-events-none text-right">
        <div className="text-[9px] font-mono text-[#666] tracking-widest tabular-nums">{systemTime}</div>
        <div className="text-[7px] font-mono text-[#555] tracking-widest uppercase mt-0.5">
          {activeNode ? `NODE: ${activeNode.toUpperCase()}` : "STANDBY"}
        </div>
      </div>

      {/* Top right: Mode controls */}
      <div className="absolute top-5 right-6 flex gap-6 z-20">
        <button onClick={() => { handleCloseOverlay(); setActiveNode(null); }}
          className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${!isQuickScan ? "text-[#a3a3a3]" : "text-[#555] hover:text-[#888]"}`}>
          DEEP EXPLORE
        </button>
        <button onClick={() => setIsQuickScan(true)}
          className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${isQuickScan ? "text-[#E24A2B]" : "text-[#555] hover:text-[#888]"}`}>
          60 SECOND SCAN
        </button>
      </div>

      {/* Top left: Identity */}
      <div className="absolute top-5 left-6 z-20 pointer-events-none">
        <div className="text-[11px] font-mono text-[#888] tracking-[0.25em]">MAAJ</div>
        <div className="text-[7px] font-mono text-[#555] tracking-widest uppercase mt-0.5">ENGINEERING ARTIFACT v1.0</div>
      </div>

      {/* Secret Terminal */}
      <SecretTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* Click-away to deselect */}
      {activeNode && !openProject && !expandedContent && !isQuickScan && (
        <div className="absolute inset-0 z-0" onClick={() => setActiveNode(null)} />
      )}
    </div>
  );
}


// ─── REUSABLE CONTENT OVERLAY ──────────────────────────────────────────
function ContentOverlay({ title, onClose, children, wide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-50 bg-[#050505] overflow-hidden flex flex-col"
    >
      <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-b border-[#141414] flex-shrink-0">
        <div className="text-[10px] font-mono text-[#666] tracking-widest uppercase">{title}</div>
        <button onClick={onClose}
          className="text-[10px] font-mono text-[#444] tracking-widest uppercase hover:text-[#F5F5F0] transition-colors">
          [ RETURN ]
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto px-6 sm:px-8 py-8 ${wide ? "max-w-6xl" : "max-w-3xl"} mx-auto w-full`}>
        {children}
      </div>
      <div className="px-6 sm:px-8 py-3 border-t border-[#141414] text-[7px] font-mono text-[#222] tracking-widest flex-shrink-0">
        ESC TO RETURN
      </div>
    </motion.div>
  );
}
