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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl bg-slate-950 border border-violet-500/50 rounded-xl shadow-[0_0_40px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col font-mono text-xs"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2 text-violet-400 font-bold">
                <Terminal className="w-4 h-4" />
                <span>DEV_MIND CLI TERMINAL</span>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-80 overflow-y-auto space-y-2 bg-slate-950/95 scrollbar-thin scrollbar-thumb-violet-500/30">
              {history.map((item, i) => (
                <pre
                  key={i}
                  className={`whitespace-pre-wrap font-mono ${
                    item.type === "cmd"
                      ? "text-cyan-300 font-bold"
                      : item.type === "alert"
                      ? "text-pink-400 font-bold"
                      : item.type === "err"
                      ? "text-rose-400"
                      : "text-slate-300"
                  }`}
                >
                  {item.text}
                </pre>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <form
              onSubmit={handleCommand}
              className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
            >
              <span className="text-violet-400 font-bold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  sound.playTypingSound();
                }}
                placeholder="Type 'help' or command..."
                className="flex-1 bg-transparent text-slate-100 font-mono focus:outline-none"
              />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
