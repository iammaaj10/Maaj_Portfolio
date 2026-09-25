import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Github, Linkedin, Phone } from "lucide-react";
import { sound } from "../../utils/audioEngine";

export default function ContactProtocol({ isOpen, onClose }) {
  const [initiated, setInitiated] = useState(false);
  const [typedLine, setTypedLine] = useState("");
  
  useEffect(() => {
    if (!isOpen) {
      setInitiated(false);
      setTypedLine("");
    }
  }, [isOpen]);

  const handleInitiate = () => {
    sound.playClickSound();
    
    // Type out the command
    const cmd = "initiate_contact()";
    let i = 0;
    const interval = setInterval(() => {
      setTypedLine(cmd.substring(0, i + 1));
      i++;
      if (i === cmd.length) {
        clearInterval(interval);
        setTimeout(() => setInitiated(true), 400);
      }
    }, 50);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-slate-950/95 border border-slate-800 rounded shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] tracking-widest font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              TERMINAL // UPLINK
            </div>
            <button
              onClick={() => {
                sound.playClickSound();
                onClose();
              }}
              className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto text-sm sm:text-base space-y-8 scrollbar-thin scrollbar-thumb-slate-700">
            
            <div className="space-y-4">
              <div className="text-emerald-400 tracking-[0.2em] uppercase mb-8 font-bold">
                SYSTEM ANALYSIS COMPLETE
              </div>

              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm">ENGINEER:</div>
                <div className="text-slate-200">MAAJ</div>
              </div>

              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm">SPECIALIZATION:</div>
                <div className="text-slate-200">FULL STACK / AI SYSTEMS</div>
              </div>

              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm">SYSTEMS ANALYZED:</div>
                <div className="text-cyan-300">04+</div>
              </div>

              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm">PROJECTS:</div>
                <div className="text-cyan-300">04+</div>
              </div>

              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div className="text-slate-500 uppercase tracking-widest text-xs sm:text-sm">STATUS:</div>
                <div className="text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  AVAILABLE
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/50 flex items-center gap-3 text-slate-300 mt-8">
              <span className="text-emerald-500">{'>'}</span> 
              <span>{typedLine}</span>
              {!initiated && (
                <span className="w-2.5 h-5 bg-slate-400 animate-pulse inline-block" />
              )}
            </div>

            {!initiated && typedLine.length === 0 && (
              <button 
                onClick={handleInitiate}
                className="mt-6 px-4 py-2 border border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-all uppercase tracking-widest text-xs font-bold"
              >
                [ RUN INITIATE_CONTACT ]
              </button>
            )}

            {initiated && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <a href="mailto:maajb1122@gmail.com" className="flex items-center gap-3 p-4 border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all group">
                  <Mail className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                  <span className="text-slate-300 tracking-widest text-xs">EMAIL UPLINK</span>
                </a>
                
                <a href="tel:+919130304068" className="flex items-center gap-3 p-4 border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all group">
                  <Phone className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                  <span className="text-slate-300 tracking-widest text-xs">+91 9130304068</span>
                </a>

                <a href="https://linkedin.com/in/maaj-bhadgaonkar/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 border border-slate-700 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group">
                  <Linkedin className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                  <span className="text-slate-300 tracking-widest text-xs">LINKEDIN_SYS</span>
                </a>

                <a href="https://github.com/iammaaj10" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 border border-slate-700 hover:border-violet-500 hover:bg-violet-500/10 transition-all group">
                  <Github className="w-4 h-4 text-slate-500 group-hover:text-violet-400" />
                  <span className="text-slate-300 tracking-widest text-xs">GITHUB_REPO</span>
                </a>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
