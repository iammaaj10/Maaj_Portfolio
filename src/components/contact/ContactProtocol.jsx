import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, X, Send, Copy, Check, Github, Linkedin, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { sound } from "../../utils/audioEngine";

export default function ContactProtocol({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sentStatus, setSentStatus] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("maajb1122@gmail.com");
    sound.playClickSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+91 9130304068");
    sound.playClickSound();
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-slate-950/95 border-2 border-pink-500/40 rounded-2xl shadow-[0_0_80px_rgba(236,72,153,0.25)] overflow-hidden flex flex-col cyber-cut-corner bg-cyber-grid"
        >
          {/* Hologram scan line */}
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-holo-sweep z-30" />

          {/* Corner metadata */}
          <div className="pointer-events-none absolute top-2 left-3 text-[8px] font-mono text-pink-400/60 z-20">
            [UPLINK_FREQ // 2.40 GHz // AES_256_GCM]
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-pink-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/15 border border-pink-400/60 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-mono font-bold text-slate-100 tracking-wider">
                    COMMUNICATION UPLINK PROTOCOL
                  </h2>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-500/40 font-bold">
                    SECURE
                  </span>
                </div>
                <p className="text-xs font-mono text-pink-400">
                  DIRECT ENCRYPTED TRANSMISSION CHANNEL
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClickSound();
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form & Links Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-pink-500/40">
            {/* Quick Link Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleCopyEmail}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-pink-500/50 text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-200">
                  <Mail className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-slate-400">EMAIL UPLINK</div>
                    <span className="font-bold">maajb1122@gmail.com</span>
                  </div>
                </div>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-500 group-hover:text-pink-300 shrink-0" />
                )}
              </button>

              <button
                onClick={handleCopyPhone}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 text-left flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-200">
                  <Phone className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-slate-400">PHONE // CALL SIGN</div>
                    <span className="font-bold">+91 9130304068</span>
                  </div>
                </div>
                {copiedPhone ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 shrink-0" />
                )}
              </button>

              <a
                href="https://github.com/iammaaj10"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 flex items-center gap-2.5 text-xs font-mono text-slate-200 transition-all group"
              >
                <Github className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] text-slate-400">CODE REPOSITORY</div>
                  <span className="font-bold">github.com/iammaaj10</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/maaj-bhadgaonkar/"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/50 flex items-center gap-2.5 text-xs font-mono text-slate-200 transition-all group"
              >
                <Linkedin className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] text-slate-400">PROFESSIONAL NETWORK</div>
                  <span className="font-bold">linkedin.com/in/maaj</span>
                </div>
              </a>
            </div>

            {/* Transmission Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
              {sentStatus ? (
                <div className="p-6 rounded-xl bg-pink-500/10 border border-pink-400 text-center space-y-2">
                  <div className="text-pink-400 font-bold text-sm">
                    TRANSMISSION DISPATCHED SUCCESSFULLY!
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    Encrypted signal received. Closing uplink channel...
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-[10px] text-pink-400 uppercase font-bold tracking-wider flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    COMPOSE QUANTUM TRANSMISSION PAYLOAD
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] text-slate-400 block mb-1">
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-400"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 block mb-1">
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] text-slate-400 block mb-1">
                      ENCRYPTED MESSAGE PAYLOAD
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Enter project details, hiring inquiry, or collaboration query..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-400 resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-violet-500/20 border-2 border-pink-400 text-pink-200 hover:text-white hover:bg-pink-500/30 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.25)] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>DISPATCH SECURE TRANSMISSION</span>
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
