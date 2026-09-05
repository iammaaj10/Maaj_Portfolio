import React, { useState, useEffect, useCallback } from "react";
import NeuralCanvas from "./components/canvas/NeuralCanvas";
import CustomCursor from "./components/hud/CustomCursor";
import SystemHeader from "./components/hud/SystemHeader";
import LiveThinkingStream from "./components/hud/LiveThinkingStream";
import NavRadarMinimap from "./components/hud/NavRadarMinimap";
import TerminalModal from "./components/hud/TerminalModal";
import ResumeModal from "./components/hud/ResumeModal";
import SystemCoreModal from "./components/nodes/SystemCoreModal";
import ProjectPortalModal from "./components/portals/ProjectPortalModal";
import SkillMatrixVisualizer from "./components/skills/SkillMatrixVisualizer";
import ExperienceTimeline from "./components/experience/ExperienceTimeline";
import ContactProtocol from "./components/contact/ContactProtocol";
import AchievementsModal from "./components/nodes/AchievementsModal";
import AcademicModal from "./components/nodes/AcademicModal";
import { mindNodes } from "./data/mindSystemData";
import { sound } from "./utils/audioEngine";

export default function App() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoomScale, setZoomScale] = useState(1.0);
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [scanlinesActive, setScanlinesActive] = useState(true);
  const [thinkingStreamOpen, setThinkingStreamOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Compute current System State Label for Header HUD
  const getSystemStateLabel = () => {
    if (activeNodeId) return `PORTAL_ACTIVE: [${activeNodeId.toUpperCase()}]`;
    if (resumeOpen) return "RESUME_PROTOCOL";
    if (thinkingStreamOpen) return "THINKING_STREAM";
    if (hoveredNodeId) return `NEURAL_EXPLORING: [${hoveredNodeId.toUpperCase()}]`;
    return "IDLE_STANDBY";
  };

  // Bounds constants
  const MIN_ZOOM = 0.75;
  const MAX_ZOOM = 1.45;
  const MAX_PAN_X = 350;
  const MAX_PAN_Y = 260;

  // Center Canvas Viewport on specified node ID with bounding
  const centerOnNode = useCallback((nodeId) => {
    const node = mindNodes.find((n) => n.id === nodeId);
    if (node) {
      const limitX = MAX_PAN_X * zoomScale;
      const limitY = MAX_PAN_Y * zoomScale;
      const targetX = -node.x * zoomScale;
      const targetY = -node.y * zoomScale;
      setPanOffset({
        x: Math.max(-limitX, Math.min(limitX, targetX)),
        y: Math.max(-limitY, Math.min(limitY, targetY))
      });
    }
  }, [zoomScale]);

  // Zoom Helpers
  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev * 1.15, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev * 0.85, MIN_ZOOM));
  };

  // Handle Node Selection
  const handleSelectNode = (nodeId) => {
    setActiveNodeId(nodeId);
    centerOnNode(nodeId);
  };

  // Reset Canvas Viewport
  const handleResetCanvas = () => {
    sound.playClickSound();
    setActiveNodeId(null);
    setPanOffset({ x: 0, y: 0 });
    setZoomScale(1.0);
  };

  // Keyboard Shortcuts (Ctrl+K or ~ for terminal, Esc to close/reset)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === "k") || e.key === "`") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        if (activeNodeId) {
          setActiveNodeId(null);
        } else if (resumeOpen) {
          setResumeOpen(false);
        } else if (terminalOpen) {
          setTerminalOpen(false);
        } else if (thinkingStreamOpen) {
          setThinkingStreamOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeNodeId, resumeOpen, terminalOpen, thinkingStreamOpen]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* Sci-Fi Laser Cursor */}
      <CustomCursor isHoveredNode={!!hoveredNodeId} />

      {/* CRT Scanline FX Layer */}
      {scanlinesActive && (
        <div className="pointer-events-none fixed inset-0 z-30 bg-scanlines opacity-40 mix-blend-overlay" />
      )}

      {/* Futuristic Ambient Glow Background Shader */}
      <div
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ${
          isOverclocked
            ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/30 via-slate-950 to-slate-950"
            : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950"
        }`}
      />

      {/* Top Header HUD Controller */}
      <SystemHeader
        systemState={getSystemStateLabel()}
        onResetCanvas={handleResetCanvas}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onToggleScanlines={() => setScanlinesActive((prev) => !prev)}
        scanlinesActive={scanlinesActive}
        onToggleThinkingStream={() => setThinkingStreamOpen((prev) => !prev)}
        thinkingStreamOpen={thinkingStreamOpen}
        isOverclocked={isOverclocked}
      />

      {/* Interactive 60fps Neural Network Canvas Engine */}
      <NeuralCanvas
        activeNodeId={activeNodeId}
        onSelectNode={handleSelectNode}
        hoveredNodeId={hoveredNodeId}
        setHoveredNodeId={setHoveredNodeId}
        panOffset={panOffset}
        setPanOffset={setPanOffset}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
        isOverclocked={isOverclocked}
      />

      {/* Live Developer Thinking Stream Drawer */}
      <LiveThinkingStream
        isOpen={thinkingStreamOpen}
        onClose={() => setThinkingStreamOpen(false)}
      />

      {/* Radar Minimap HUD */}
      <NavRadarMinimap
        activeNodeId={activeNodeId}
        panOffset={panOffset}
        zoomScale={zoomScale}
        onCenterNode={(id) => {
          centerOnNode(id);
          setActiveNodeId(id);
        }}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetCanvas={handleResetCanvas}
      />

      {/* Interactive CLI Terminal Console */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onSelectNode={handleSelectNode}
        onTriggerOverclock={() => setIsOverclocked((prev) => !prev)}
      />

      {/* Dedicated Resume Protocol Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Active Node Modals */}
      <SystemCoreModal
        isOpen={activeNodeId === "system-core"}
        onClose={() => setActiveNodeId(null)}
        onSelectNode={handleSelectNode}
      />

      <ProjectPortalModal
        isOpen={activeNodeId === "projects-portal"}
        onClose={() => setActiveNodeId(null)}
        initialProjectId="narratia"
      />

      <SkillMatrixVisualizer
        isOpen={activeNodeId === "skills-matrix"}
        onClose={() => setActiveNodeId(null)}
      />

      <ExperienceTimeline
        isOpen={activeNodeId === "experience-log"}
        onClose={() => setActiveNodeId(null)}
      />

      <AchievementsModal
        isOpen={activeNodeId === "achievements-node"}
        onClose={() => setActiveNodeId(null)}
      />

      <AcademicModal
        isOpen={activeNodeId === "academic-matrix"}
        onClose={() => setActiveNodeId(null)}
      />

      <ContactProtocol
        isOpen={activeNodeId === "contact-protocol"}
        onClose={() => setActiveNodeId(null)}
      />
    </main>
  );
}