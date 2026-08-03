import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, X, Send, Sparkles, MessageSquare, ExternalLink, RefreshCw } from "lucide-react";
import { thinkingStreamThoughts } from "../../data/mindSystemData";
import { sound } from "../../utils/audioEngine";

export default function LiveThinkingStream({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      type: "sys",
      text: "SYSTEM_INIT // Living Mind Conversational Agent standing by. Query any topic below or ask a question."
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const logEndRef = useRef(null);

  // Background Telemetry Pulse
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const randomTelemetry = [
        "TELEMETRY_PULSE // Neural graph locked at 60 FPS | Memory heap 0.42 MB",
        "SYSTEM_STATE // Narratia Vercel node & Clause Lens NLP pipeline active",
        "CONTEXT_CACHE // Internships & Project portals synchronized"
      ][Math.floor(Math.random() * 3)];

      // Only add background telemetry if user hasn't chatted recently
      setMessages((prev) => {
        if (prev.length > 25) return prev;
        return [...prev, { type: "telemetry", text: randomTelemetry }];
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Quick Action Chips Data
  const quickChips = [
    { label: "🚀 Narratia Engine", query: "Tell me about Narratia" },
    { label: "📄 Clause Lens NLP", query: "What is Clause Lens?" },
    { label: "🛡️ Vulnuris / SignTrace", query: "Tell me about Vulnuris internship" },
    { label: "🎓 Tregadevs", query: "What did you do at Tregadevs?" },
    { label: "🧠 Shoro AI", query: "Tell me about Shoro AI Lab" },
    { label: "📈 BlueStock", query: "What is BlueStock Fintech experience?" },
    { label: "⚡ Tech Stack", query: "What is your tech stack?" },
    { label: "📡 Contact Maaj", query: "How to hire or contact Maaj?" }
  ];

  // AI Knowledge & Conversational Intent Matcher
  const generateResponse = (q) => {
    const query = q.toLowerCase();

    // 1. Narratia
    if (query.includes("narratia")) {
      return {
        text: "🚀 NARRATIA ENGINE // Interactive AI Storytelling Platform:\n- Built with React, AI / LLM API, TailwindCSS, and Framer Motion.\n- Features real-time streaming generation, prompt state graphs, and dynamic narrative branching.\n- Live Demo: https://narratia-wheat.vercel.app/",
        link: "https://narratia-wheat.vercel.app/"
      };
    }

    // 2. Clause Lens
    if (query.includes("clause") || query.includes("lens") || query.includes("legal")) {
      return {
        text: "📄 CLAUSE LENS // AI Legal Document & Contract Analyzer:\n- Built with React, Python/FastAPI, NLP Transformers, and TailwindCSS.\n- Scans contracts to extract high-risk liability terms and summarize complex legal clauses into plain English.\n- GitHub Repo: https://github.com/iammaaj10/clause-lens",
        link: "https://github.com/iammaaj10/clause-lens"
      };
    }

    // 3. Vulnuris / SignTrace
    if (query.includes("vulnuris") || query.includes("signtrace") || query.includes("signature")) {
      return {
        text: "🛡️ VULNURIS SECURITY SOLUTIONS (Dec 2025 - Jul 2026):\n- Role: Full Stack Developer (Internship)\n- Built 'SignTrace', a digital signature platform with facial recognition, camera snapshots, dedicated user certificates, face matching, and liveness detection.\n- Stack: React.js, TypeScript, Node.js, MongoDB, AWS, Express.js"
      };
    }

    // 4. Tregadevs
    if (query.includes("tregadevs") || query.includes("education") || query.includes("prisma")) {
      return {
        text: "🎓 TREGADEVS (Nov 2025 - Jan 2026):\n- Role: Full Stack Developer (Internship)\n- Built a role-based education management platform with secure authentication, teacher attendance workflows, and scalable APIs.\n- Stack: Next.js, Node.js, Prisma, PostgreSQL, TypeScript"
      };
    }

    // 5. Shoro AI
    if (query.includes("shoro") || query.includes("driving") || query.includes("rag")) {
      return {
        text: "🧠 SHORO AI LAB (Apr 2025 - Jul 2025):\n- Role: Full Stack Developer (Internship)\n- Developed 'Shoro AI', a US driving education platform with MCQs, flashcards, state handbooks, AI chatbots, and a RAG-based test prep system.\n- Stack: Next.js, GraphQL, RAG, MongoDB"
      };
    }

    // 6. BlueStock Fintech
    if (query.includes("bluestock") || query.includes("fintech") || query.includes("ipo")) {
      return {
        text: "📈 BLUESTOCK FINTECH (Jan 2025 - Mar 2025):\n- Role: Frontend Developer (Internship)\n- Developed the IPO dashboard and frontend authentication features (user sign-in/up) for a real-time stock market insights platform.\n- Stack: React.js, JavaScript, TailwindCSS, REST APIs"
      };
    }

    // 7. Tech Stack & Skills
    if (query.includes("stack") || query.includes("skill") || query.includes("framework") || query.includes("react")) {
      return {
        text: "⚡ TECH STACK & ARCHITECTURE:\n- Frontend: React.js, Next.js, TypeScript, TailwindCSS, Framer Motion, HTML5 Canvas / Three.js\n- Backend: Node.js, Express, Python, FastAPI, GraphQL, REST\n- Databases & Tools: MongoDB, PostgreSQL, Prisma, AWS, Git, Vercel\n- AI / ML: LLM APIs, NLP Transformers, RAG Systems, Scikit-Learn"
      };
    }

    // 8. Contact & Hiring
    if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("reach")) {
      return {
        text: "📡 COMMUNICATION UPLINK:\n- Email: iammaaj10@gmail.com\n- GitHub: https://github.com/iammaaj10\n- Status: Available for High-Impact Full-Stack & AI Engineering Opportunities."
      };
    }

    // 9. Bio / Who is Maaj
    if (query.includes("who") || query.includes("maaj") || query.includes("about") || query.includes("hi") || query.includes("hello")) {
      return {
        text: "🧠 DEVELOPER MIND OVERVIEW:\n- Name: Maaj\n- Role: Full-Stack & AI Systems Architect\n- Specialty: 60fps Interactive UI Canvases, Real-time AI Systems, and Scalable Full-Stack Web Applications."
      };
    }

    // Fallback response
    return {
      text: `NEURAL_RESP >> Analyzed query: "${q}". Ready to provide technical details on Narratia, Clause Lens, Vulnuris, Tregadevs, Shoro AI, BlueStock, or overall tech stack.`
    };
  };

  const handleSend = (textToSend) => {
    const q = textToSend || userInput;
    if (!q.trim()) return;

    sound.playClickSound();
    setMessages((prev) => [...prev, { type: "user", text: q }]);
    if (!textToSend) setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateResponse(q);
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: resp.text, link: resp.link }
      ]);
      setIsTyping(false);
      sound.playWarpSound();
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -340 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -340 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-16 left-4 z-40 w-84 sm:w-96 bg-slate-950/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.2)] flex flex-col overflow-hidden text-xs font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-950/50 border-b border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: "6s" }} />
              <span>LIVE AI MIND CHAT</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMessages([{ type: "sys", text: "SYSTEM_RESET // Buffer cleared." }]);
                  sound.playClickSound();
                }}
                className="text-[10px] text-slate-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                title="Clear Chat History"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Quick Chips */}
          <div className="px-3 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 hover:bg-emerald-500/20 whitespace-nowrap transition-all shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="p-3 h-80 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-emerald-500/30 font-mono">
            {messages.map((msg, idx) => {
              if (msg.type === "telemetry") {
                return (
                  <div
                    key={idx}
                    className="text-[10px] text-emerald-500/70 italic px-1 py-0.5"
                  >
                    &gt; {msg.text}
                  </div>
                );
              }

              if (msg.type === "sys") {
                return (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300"
                  >
                    {msg.text}
                  </div>
                );
              }

              if (msg.type === "user") {
                return (
                  <div key={idx} className="flex justify-end">
                    <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-500/40 text-violet-200 max-w-[85%]">
                      <span className="text-[10px] text-violet-400 block font-bold mb-0.5">
                        YOU
                      </span>
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={idx} className="flex justify-start">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 max-w-[90%] whitespace-pre-wrap leading-relaxed">
                    <span className="text-[10px] text-cyan-400 block font-bold mb-0.5">
                      DEV_MIND AI
                    </span>
                    {msg.text}
                    {msg.link && (
                      <a
                        href={msg.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300 underline hover:text-white"
                      >
                        <span>OPEN EXTERNAL LINK</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Processing neural query...</span>
              </div>
            )}
            <div ref={logEndRef} />
          </div>

          {/* Input Prompt Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2 bg-slate-900 border-t border-emerald-500/30 flex items-center gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask anything about Maaj's mind, code, or work..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="p-2 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
