import React, { useState, useEffect } from "react";
import {
  Brain,
  Volume2,
  VolumeX,
  Terminal,
  RotateCcw,
  Sparkles,
  Activity,
  Cpu,
  Tv,
  FileText
} from "lucide-react";
import { sound } from "../../utils/audioEngine";

export default function SystemHeader({
  systemState,
  onResetCanvas,
  onOpenTerminal,
  onOpenResume,
  onToggleScanlines,
  scanlinesActive,
  onToggleThinkingStream,
  thinkingStreamOpen,
  isOverclocked
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [fps, setFps] = useState(60);

  // Simple FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMuteToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const getStatusColor = () => {
    if (isOverclocked) return "text-pink-400 border-pink-500/50 bg-pink-500/10";
    switch (systemState) {
      case "EXPLORING":
        return "text-cyan-400 border-cyan-500/50 bg-cyan-500/10";
      case "PORTAL_ACTIVE":
        return "text-violet-400 border-violet-500/50 bg-violet-500/10";
      case "THINKING":
        return "text-emerald-400 border-emerald-500/50 bg-emerald-500/10";
      default:
        return "text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 pointer-events-none flex items-center justify-between">
      {/* Left: Branding & System State */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div
          onClick={onResetCanvas}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)] cursor-pointer hover:border-cyan-400 transition-all"
        >
          <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-100 flex items-center gap-1.5">
              DEV_MIND <span className="text-[10px] text-cyan-400 font-normal">v2.6</span>
            </span>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              A DEVELOPER'S LIVING SYSTEM
            </span>
          </div>
        </div>

        {/* System State Badge */}
        <div
          className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold tracking-wide transition-all ${getStatusColor()}`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-ping" />
          <span>STATUS: {isOverclocked ? "OVERCLOCK_MAX" : systemState}</span>
        </div>
      </div>

      {/* Right: Controls & Telemetry */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* FPS Telemetry */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] font-mono text-slate-300">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>{fps} FPS</span>
        </div>

        {/* Live Thinking Toggle */}
        <button
          onClick={onToggleThinkingStream}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 border transition-all ${
            thinkingStreamOpen
              ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              : "bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-emerald-500/50"
          }`}
          title="Toggle Live Thinking Stream"
        >
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span className="hidden md:inline">LIVE THINKING</span>
        </button>

        {/* Resume Viewer Trigger */}
        <button
          onClick={onOpenResume}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)]"
          title="Open Official Resume Protocol"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">RESUME</span>
        </button>

        {/* CLI Terminal Trigger */}
        <button
          onClick={onOpenTerminal}
          className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-violet-400 text-slate-300 hover:text-violet-300 text-xs font-mono flex items-center gap-2 transition-all"
          title="Open Sci-Fi CLI Terminal (Ctrl+K)"
        >
          <Terminal className="w-4 h-4 text-violet-400" />
          <span className="hidden md:inline">CLI (CTRL+K)</span>
        </button>

        {/* Scanlines Effect */}
        <button
          onClick={onToggleScanlines}
          className={`p-2 rounded-lg border text-xs font-mono transition-all ${
            scanlinesActive
              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
              : "bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200"
          }`}
          title="Toggle CRT Scanline Overlay"
        >
          <Tv className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={handleMuteToggle}
          className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all"
          title="Toggle UI Sound Synthesizer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-cyan-400" />
          )}
        </button>

        {/* Reset Viewport Button */}
        <button
          onClick={onResetCanvas}
          className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all"
          title="Reset Canvas Viewport"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
