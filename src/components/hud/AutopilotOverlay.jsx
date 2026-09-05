import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, XSquare, Crosshair } from "lucide-react";

export default function AutopilotOverlay({
  isActive,
  subtitle,
  progress,
  onCancel
}) {
  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 z-[60] pointer-events-none flex flex-col items-center justify-between py-6 sm:py-8">
          
          {/* Top Floating Control Pill */}
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="flex items-center gap-4 sm:gap-6 bg-slate-950/85 border border-cyan-500/40 rounded-full px-4 sm:px-6 py-2.5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 sm:p-2 bg-cyan-500/20 rounded-full text-cyan-400">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-[10px] sm:text-xs tracking-[0.2em] text-cyan-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  AUTOPILOT
                </span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono tracking-widest uppercase">
                  Cinematic Mode
                </span>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-800 hidden sm:block" />

            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400 rounded-full transition-all font-mono text-[9px] sm:text-[10px] tracking-widest group"
            >
              <XSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">ABORT TOUR</span>
              <span className="hidden sm:inline text-red-500/60 ml-1 pl-2 border-l border-red-500/30">ESC</span>
            </button>
          </motion.div>

          {/* Dynamic Center Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 mix-blend-screen">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-cyan-500/20 border-dashed animate-[spin_20s_linear_infinite]" 
            />
            <Crosshair className="absolute w-8 h-8 text-cyan-500/30 animate-pulse" strokeWidth={1} />
          </div>

          {/* Bottom Floating Telemetry HUD */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="w-[90%] sm:w-full max-w-2xl bg-slate-950/85 border border-cyan-500/30 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto overflow-hidden relative"
          >
            {/* Top Scanning Beam */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
            
            <div className="px-5 py-4 sm:px-8 sm:py-6 flex flex-col items-center justify-center gap-4">
              <motion.div 
                key={subtitle}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-cyan-50 text-xs sm:text-sm md:text-base font-mono tracking-wide text-center"
              >
                <span className="text-cyan-500 mr-2 opacity-80">❯</span>
                {subtitle}
                <span className="animate-pulse ml-1 inline-block w-1.5 h-3 bg-cyan-400 align-middle"></span>
              </motion.div>
              
              {/* Progress Track */}
              <div className="w-full sm:w-3/4 h-1 bg-slate-900 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-cyan-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
