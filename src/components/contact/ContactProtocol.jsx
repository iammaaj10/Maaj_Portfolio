import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, X, Send, Copy, Check, Github, Linkedin, Mail } from "lucide-react";
import { sound } from "../../utils/audioEngine";

export default function ContactProtocol({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sentStatus, setSentStatus] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("iammaaj10@gmail.com");
    sound.playClickSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playWarpSound();
    setSentStatus(true);
    setTimeout(() => {
      setSentStatus(false);
      setFormState({ name: "", email: "", message: "" });
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          className="relative w-full max-w-2xl max-h-[88vh] bg-slate-950 border border-pink-500/50 rounded-2xl shadow-[0_0_60px_rgba(236,72,153,0.2)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-pink-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/40 text-pink-400">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-mono font-bold text-slate-100">
                  COMMUNICATION UPLINK PROTOCOL
                </h2>
                <p className="text-xs font-mono text-pink-400">
                  ENCRYPTED TRANSMISSION CHANNEL
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClickSound();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form & Links Body */}
          <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-pink-500/30">
            {/* Quick Links & Copy Email */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleCopyEmail}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 text-left flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                  <Mail className="w-4 h-4 text-pink-400" />
                  <span className="truncate">Email Uplink</span>
                </div>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              <a
                href="https://github.com/iammaaj10"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 flex items-center gap-2 text-xs font-mono text-slate-200 transition-all"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Node</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 flex items-center gap-2 text-xs font-mono text-slate-200 transition-all"
              >
                <Linkedin className="w-4 h-4 text-violet-400" />
                <span>LinkedIn Vector</span>
              </a>
            </div>

            {/* Transmission Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              {sentStatus ? (
                <div className="p-6 rounded-xl bg-pink-500/10 border border-pink-400 text-center space-y-2">
                  <div className="text-pink-400 font-bold text-sm">
                    TRANSMISSION DISPATCHED SUCCESSFULLY!
                  </div>
                  <p className="text-xs text-slate-300">
                    Encrypted signal received. Closing uplink...
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">
                        SENDER IDENTIFIER
                      </label>
                      <input
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Your Name / Call Sign"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">
                        TRANSMISSION RETURN ADDRESS
                      </label>
                      <input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="your.email@domain.com"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      ENCRYPTED MESSAGE PAYLOAD
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Enter project details, inquiry, or transmission query..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-pink-500/20 border border-pink-400 text-pink-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT SIGNAL</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
