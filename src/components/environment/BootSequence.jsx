import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioSystem } from "../../utils/audioSystem";

export default function BootSequence({ onComplete }) {
  const [phase, setPhase] = useState(0);

  const finish = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Initialize audio system on first interaction/mount
    audioSystem.init();
    
    const t1 = setTimeout(() => {
      setPhase(1);
      audioSystem.playBoot();
    }, 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 4000);
    const t4 = setTimeout(() => setPhase(4), 5500);
    const t5 = setTimeout(() => finish(), 7500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [finish]);

  const branches = [
    { label: "AI", d: "M 200,150 L 100,80", tx: 75, ty: 72 },
    { label: "SECURITY", d: "M 200,150 L 320,80", tx: 325, ty: 72 },
    { label: "SYSTEMS", d: "M 200,150 L 60,210", tx: 15, ty: 220 },
    { label: "PRODUCT", d: "M 200,150 L 340,210", tx: 345, ty: 220 },
    { label: "ARCHITECTURE", d: "M 200,150 L 200,40", tx: 155, ty: 30 },
  ];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[#050505] cursor-pointer"
      onClick={finish}
    >
      {/* Click to skip hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-[#333] font-mono tracking-widest uppercase">
        PRESS ANY KEY OR CLICK TO SKIP
      </div>

      {/* Phase 1: Initializing text */}
      <AnimatePresence mode="wait">
        {phase >= 1 && phase < 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="absolute text-[9px] tracking-[0.25em] text-[#555] uppercase font-mono"
            style={{ 
              top: "calc(50% - 80px)", 
              left: "50%", 
              x: "-50%",
              willChange: "opacity, transform" 
            }}
          >
            INITIALIZING ENGINEERING ENVIRONMENT
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2-3: Circuit SVG */}
      <AnimatePresence mode="wait">
        {phase >= 2 && phase < 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="w-[380px] h-[260px]"
            style={{ willChange: "opacity" }}
          >
            <svg className="w-full h-full" viewBox="0 0 400 280">
              {/* Main trunk signal */}
              <motion.path
                d="M 200,280 L 200,150"
                stroke="#E24A2B"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "stroke-dashoffset" }}
              />
              {/* Central node dot */}
              <motion.circle
                cx="200" cy="150" r="3"
                fill="#E24A2B"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "opacity, transform", transformOrigin: "center" }}
              />

              {/* Branches */}
              {phase >= 3 && branches.map((b, i) => (
                <g key={b.label}>
                  <motion.path
                    d={b.d}
                    stroke="#333"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                    style={{ willChange: "stroke-dashoffset" }}
                  />
                  <motion.text
                    x={b.tx} y={b.ty}
                    fill="#666"
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="2"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                    style={{ willChange: "opacity, transform" }}
                  >
                    {b.label}
                  </motion.text>
                </g>
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: Name reveal */}
      <AnimatePresence mode="wait">
        {phase === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
            style={{ willChange: "opacity, transform" }}
          >
            <h1 className="text-engineer text-[#F5F5F0] mb-6 tracking-widest">MAAJ</h1>
            <div className="text-[10px] tracking-[0.3em] text-[#666] uppercase font-mono space-y-2">
              <div>FULL-STACK ENGINEER</div>
              <div className="text-[#444]">AI SYSTEMS · SECURITY · PRODUCT</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
