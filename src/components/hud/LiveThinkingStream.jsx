import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, X, Send, Sparkles } from "lucide-react";
import { thinkingStreamThoughts } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function LiveThinkingStream({ isOpen, onClose }) {
  const [logs, setLogs] = useState(thinkingStreamThoughts.slice(0, 4));
  const [userInput, setUserInput] = useState("");
  const logEndRef = useRef(null);

  // Auto-stream thoughts every few seconds
  useEffect(() => {
    if (!isOpen) return;

    let index = 4;
    const interval = setInterval(() => {
      if (index < thinkingStreamThoughts.length) {
        const nextThought = thinkingStreamThoughts[index];
        setLogs((prev) => [...prev, nextThought]);
        sound.playTypingSound();
        index++;
      } else {
        // Loop random telemetry
        const randomLog = `TELEMETRY_PULSE // Active latency ${Math.floor(
          Math.random() * 20 + 15
        )}ms | Memory heap nominal...`;
        setLogs((prev) => [...prev, randomLog]);
        sound.playTypingSound();
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const query = userInput.trim();
    setLogs((prev) => [...prev, `USER_QUERY >> ${query}`]);
    setUserInput("");
    sound.playClickSound();

    // AI Response simulation
    setTimeout(() => {
      let response = `NEURAL_RESP >> Processing request: "${query}"... All systems running optimal. Explore Project Portals or Skill Matrix.`;
      if (query.toLowerCase().includes("narratia")) {
        response = `NEURAL_RESP >> Narratia Engine loaded. Access case portal or visit live deployment: https://narratia-wheat.vercel.app/`;
      } else if (query.toLowerCase().includes("clause")) {
        response = `NEURAL_RESP >> Clause Lens NLP vector pipeline standing by. Code available at github.com/iammaaj10/clause-lens.`;
      } else if (query.toLowerCase().includes("contact") || query.toLowerCase().includes("hire")) {
        response = `NEURAL_RESP >> Direct transmission channel open. Select COMM PROTOCOL node or send email via contact module.`;
      }

      setLogs((prev) => [...prev, response]);
      sound.playWarpSound();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -320 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -320 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-16 left-4 z-40 w-80 md:w-96 bg-slate-950/90 backdrop-blur-xl border border-emerald-500/40 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden text-xs font-mono"
        >
          {/* Stream Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-emerald-950/40 border-b border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: "6s" }} />
              <span>LIVE THINKING STREAM</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Telemetry Stream Output */}
          <div className="p-3 max-h-72 overflow-y-auto space-y-2 font-mono scrollbar-thin scrollbar-thumb-emerald-500/30">
            {logs.map((log, idx) => {
              const isUser = log.startsWith("USER_QUERY");
              const isResp = log.startsWith("NEURAL_RESP");
              return (
                <div
                  key={idx}
                  className={`p-2 rounded border transition-all ${
                    isUser
                      ? "bg-violet-950/40 border-violet-500/40 text-violet-300"
                      : isResp
                      ? "bg-cyan-950/40 border-cyan-500/40 text-cyan-300"
                      : "bg-slate-900/60 border-slate-800 text-emerald-400/90"
                  }`}
                >
                  <span className="text-[10px] opacity-60 mr-1.5">&gt;</span>
                  {log}
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>

          {/* Input Prompt Box */}
          <form
            onSubmit={handleSubmit}
            className="p-2 bg-slate-900/90 border-t border-emerald-500/20 flex items-center gap-1.5"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Query Developer Mind..."
              className="flex-1 bg-slate-950 border border-slate-700/60 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="p-1.5 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded hover:bg-emerald-500/30 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
