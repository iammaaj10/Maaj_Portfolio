import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Zap } from "lucide-react";
import { sound } from "../../utils/audioEngine";

export default function TerminalModal({
  isOpen,
  onClose,
  onSelectNode,
  onTriggerOverclock
}) {
  const [history, setHistory] = useState([
    { text: "DEV_MIND CLI TERMINAL v2.6 [READY]", type: "sys" },
    { text: "Type 'help' to inspect available system commands.", type: "sys" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    sound.playClickSound();
    const newHist = [...history, { text: `> ${inputVal}`, type: "cmd" }];

    switch (cmd) {
      case "help":
        newHist.push({
          text: `AVAILABLE COMMANDS:
- resume        : Launch Official Resume Protocol
- achievements  : View SIH Hackathon, LeetCode (350+), & AWS Certs
- academic      : View B.Tech (8.46 CGPA) & Diploma Grades
- projects      : Navigate to Case-Study Projects Node
- skills        : Navigate to Skill Matrix Node
- narratia      : Open Narratia Live System
- clause        : Open ClauseLens Repository
- experience    : Navigate to Experience Log Node
- contact       : Navigate to Communication Uplink Node
- overclock     : ENGAGE OVERCLOCK MATRIX MODE (Easter Egg)
- whoami        : Display System Developer Blueprint
- clear         : Clear Terminal Buffer
- exit          : Close Terminal Console`,
          type: "out"
        });
        break;
      case "resume":
        newHist.push({ text: "Opening Official Resume Protocol...", type: "out" });
        onSelectNode(null);
        break;
      case "achievements":
        onSelectNode("achievements-node");
        onClose();
        break;
      case "academic":
        onSelectNode("academic-matrix");
        onClose();
        break;
      case "projects":
        onSelectNode("projects-portal");
        onClose();
        break;
      case "skills":
        onSelectNode("skills-matrix");
        onClose();
        break;
      case "narratia":
        window.open("https://narratia-wheat.vercel.app/", "_blank");
        newHist.push({ text: "Launching Narratia live instance...", type: "out" });
        break;
      case "clause":
        window.open("https://github.com/iammaaj10/clause-lens", "_blank");
        newHist.push({ text: "Opening Clause Lens GitHub repository...", type: "out" });
        break;
      case "experience":
        onSelectNode("experience-log");
        onClose();
        break;
      case "contact":
        onSelectNode("contact-protocol");
        onClose();
        break;
      case "overclock":
        sound.playWarpSound();
        onTriggerOverclock();
        newHist.push({
          text: ">>> OVERCLOCKING SYSTEM NEURAL CANVAS... MATRIX MODE ACTIVE!",
          type: "alert"
        });
        break;
      case "whoami":
        newHist.push({
          text: `DEVELOPER_SPEC:
- Name: Maaj
- Designation: Full-Stack & AI Systems Architect (Top 1%)
- Stack: React, Next.js, Node.js, Python, FastAPI, MongoDB, Three.js
- Status: READY_FOR_UPLINK`,
          type: "out"
        });
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "exit":
        onClose();
        return;
      default:
        newHist.push({
          text: `Command not recognized: '${cmd}'. Type 'help' for options.`,
          type: "err"
        });
    }

    setHistory(newHist);
    setInputVal("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-full max-w-3xl bg-slate-950/95 border-2 border-violet-500/40 rounded shadow-[0_0_80px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col font-mono text-xs sm:text-sm relative cyber-cut-corner"
          >
            {/* Terminal Glass Reflection */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-50 mix-blend-overlay z-20" />

            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-900/90 border-b border-violet-500/30 relative z-30">
              <div className="flex items-center gap-3 text-violet-400 font-bold tracking-widest uppercase">
                <Terminal className="w-5 h-5 animate-pulse" />
                <span>DEV_MIND CLI TERMINAL</span>
                <span className="px-2 py-0.5 bg-violet-950 text-[9px] border border-violet-500/50 rounded">
                  SECURE_SHELL
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 min-h-[50vh] max-h-[60vh] p-5 sm:p-6 overflow-y-auto space-y-3 bg-slate-950/95 scrollbar-thin scrollbar-thumb-violet-500/30 relative z-30 text-shadow-sm">
              {history.map((item, i) => (
                <pre
                  key={i}
                  className={`whitespace-pre-wrap font-mono ${
                    item.type === "cmd"
                      ? "text-cyan-300 font-bold tracking-widest"
                      : item.type === "alert"
                      ? "text-pink-400 font-bold tracking-widest py-2 border-y border-pink-500/30 bg-pink-500/10 text-center uppercase"
                      : item.type === "err"
                      ? "text-rose-400 border-l-2 border-rose-500/50 pl-2"
                      : "text-slate-300 border-l-2 border-slate-800 pl-2 leading-relaxed"
                  }`}
                >
                  {item.text}
                </pre>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Footer */}
            <form
              onSubmit={handleCommand}
              className="p-4 bg-slate-900/90 border-t border-violet-500/30 flex items-center gap-3 relative z-30"
            >
              <span className="text-violet-500 font-bold tracking-wider hidden sm:inline">
                root@devmind:~$
              </span>
              <span className="text-violet-500 font-bold sm:hidden">{">"}</span>
              <input
                ref={inputRef}
                type="text"
                autoFocus
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  sound.playTypingSound();
                }}
                className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono tracking-wider font-bold placeholder:text-slate-700"
                placeholder="Enter command..."
              />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
