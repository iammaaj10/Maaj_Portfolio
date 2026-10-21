import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioSystem } from "../../utils/audioSystem";

export default function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1); // 1: Diagnostics, 2: Neural Synth, 3: Core Identity
  const isFinished = useRef(false);

  const finish = useCallback(() => {
    if (isFinished.current) return;
    isFinished.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Initialize audio system
    audioSystem.init();
    audioSystem.playBoot();

    // Keydown skip handler
    const handleKey = () => finish();
    window.addEventListener("keydown", handleKey);

    // Smooth progress counter using requestAnimationFrame
    const startTime = performance.now();
    const duration = 3800; // 3.8s total sequence for buttery swiftness

    let frameId;
    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 35 && stage < 2) {
        setStage(2);
      }
      if (pct >= 70 && stage < 3) {
        setStage(3);
      }

      if (elapsed < duration) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(finish, 600);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleKey);
    };
  }, [finish, stage]);

  const branches = [
    { label: "AI & RAG", d: "M 200,140 L 90,75", tx: 40, ty: 70 },
    { label: "SECURITY", d: "M 200,140 L 310,75", tx: 318, ty: 70 },
    { label: "SYSTEMS", d: "M 200,140 L 65,190", tx: 10, ty: 195 },
    { label: "PRODUCT", d: "M 200,140 L 335,190", tx: 342, ty: 195 },
    { label: "ARCHITECTURE", d: "M 200,140 L 200,45", tx: 152, ty: 35 },
  ];

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between bg-[#050505] p-6 sm:p-10 select-none cursor-pointer overflow-hidden font-mono"
      onClick={finish}
    >
      {/* Subtle Background Radial Atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(226, 74, 43, 0.08) 0%, transparent 65%)"
        }}
      />

      {/* High-tech Corner Brackets */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-[#3a3a3c] pointer-events-none" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-[#3a3a3c] pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-[#3a3a3c] pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-[#3a3a3c] pointer-events-none" />

      {/* Top Diagnostics Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl flex justify-between items-center text-[9px] tracking-widest text-[#71717a] border-b border-[#1c1c1e] pb-3 z-10"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E24A2B] animate-pulse" />
          <span className="text-[#a1a1aa] font-medium">SYS_KERNEL // v2.4</span>
          <span className="hidden sm:inline text-[#52525b]">|</span>
          <span className="hidden sm:inline text-[#71717a]">LATENCY: 8ms</span>
        </div>
        <div className="flex items-center gap-4 text-[#a1a1aa]">
          <span>TELEMETRY: ACTIVE</span>
          <span className="text-[#E24A2B] font-semibold tabular-nums">{String(progress).padStart(3, "0")}%</span>
        </div>
      </motion.div>

      {/* Centerpiece Animation Container */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-xl z-10">
        
        {/* Stage 1 & 2: Circuit Visualization */}
        <div className="relative w-[380px] h-[280px] flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 280">
            <defs>
              <filter id="glow-subtle" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Main Power Trunk (Bottom to Center) */}
            <motion.path
              d="M 200,270 L 200,140"
              stroke="#E24A2B"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#glow-subtle)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Glowing Trunk Pulse Head */}
            <motion.circle
              cx="200"
              r="2.5"
              fill="#FFFFFF"
              initial={{ cy: 270, opacity: 0 }}
              animate={{ cy: 140, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Central Node Core */}
            <motion.circle
              cx="200"
              cy="140"
              r="4.5"
              fill="#E24A2B"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Central Radial Wave */}
            <motion.circle
              cx="200"
              cy="140"
              r="14"
              stroke="#E24A2B"
              strokeWidth="1"
              fill="none"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ 
                scale: [0.3, 2], 
                opacity: [0.8, 0] 
              }}
              transition={{ 
                delay: 1.1,
                duration: 1.6, 
                repeat: Infinity, 
                ease: "easeOut" 
              }}
            />

            {/* Neural Branches */}
            {stage >= 2 && branches.map((b, i) => (
              <g key={b.label}>
                <motion.path
                  d={b.d}
                  stroke="#3a3a3c"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.9, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: i * 0.08 
                  }}
                />
                {/* Branch Endpoint Dot */}
                <motion.circle
                  cx={b.d.split(" ")[2].split(",")[0]}
                  cy={b.d.split(" ")[2].split(",")[1]}
                  r="2"
                  fill="#71717a"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }}
                />
                {/* Branch Label */}
                <motion.text
                  x={b.tx}
                  y={b.ty}
                  fill="#a1a1aa"
                  fontSize="8.5"
                  fontFamily="'JetBrains Mono', monospace"
                  letterSpacing="1.8"
                  fontWeight="500"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 + i * 0.08 }}
                >
                  {b.label}
                </motion.text>
              </g>
            ))}
          </svg>
        </div>

        {/* Central Identity Callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-2"
        >
          <div className="text-[10px] tracking-[0.3em] text-[#E24A2B] font-medium uppercase mb-1">
            {stage < 3 ? "INITIALIZING ENVIRONMENT" : "SYSTEM CORE ONLINE"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[0.2em] text-[#F5F5F0] font-sans">
            MAAJ
          </h1>
          <p className="text-[10px] tracking-[0.25em] text-[#a1a1aa] uppercase mt-2">
            FULL-STACK SDE · AI SYSTEMS & SECURITY
          </p>
        </motion.div>
      </div>

      {/* Bottom Progress Bar & Skip Telemetry */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-4xl flex flex-col items-center gap-4 z-10"
      >
        {/* Progress Bar Track */}
        <div className="w-full h-[2px] bg-[#1c1c1e] relative overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#E24A2B] via-[#ff6b4a] to-[#E24A2B]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Interactive Skip Telemetry */}
        <div className="flex items-center justify-between w-full text-[9px] text-[#71717a] tracking-widest uppercase">
          <span className="hidden sm:inline text-[#52525b]">PRESS ANY KEY TO SKIP</span>
          <span className="text-[#a1a1aa] hover:text-[#F5F5F0] transition-colors">
            CLICK TO INITIALIZE →
          </span>
          <span className="tabular-nums font-mono text-[#E24A2B]">{progress}%</span>
        </div>
      </motion.div>
    </div>
  );
}
