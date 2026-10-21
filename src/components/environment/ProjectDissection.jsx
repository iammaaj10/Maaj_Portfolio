import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectDissection({ project, onClose }) {
  const [isXRay, setIsXRay] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);

  if (!project) return null;

  // Build architecture layers from project data
  const layers = [
    { id: "interface", label: "USER INTERFACE", tech: project.tech?.filter(t => ["React", "React.js", "Next.js", "TailwindCSS", "Framer Motion", "TypeScript"].includes(t)) || [] },
    { id: "application", label: "APPLICATION LOGIC", tech: project.tech?.filter(t => ["Node.js", "Express.js", "Socket.IO", "GraphQL"].includes(t)) || [] },
    { id: "data", label: "DATA LAYER", tech: project.tech?.filter(t => ["MongoDB", "PostgreSQL", "Supabase", "Prisma"].includes(t)) || [] },
    { id: "ai", label: "AI / ML PIPELINE", tech: project.tech?.filter(t => ["Gemini 2.0 LLM", "LLM", "RAG", "Local ML", "Transformers.js", "WebAssembly", "OpenAI / Gemini"].includes(t)) || [] },
  ].filter(layer => layer.tech.length > 0);

  // Build engineering decisions from architecture array
  const decisions = project.architecture?.map((arch, i) => ({
    reasoning: arch,
    index: i + 1,
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-50 bg-[#050505] flex flex-col overflow-hidden"
    >
      {/* X-Ray grid background */}
      <AnimatePresence>
        {isXRay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(226,74,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(226,74,43,0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 sm:px-10 py-6 border-b border-[#1a1a1a] gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-mono tracking-widest uppercase transition-colors duration-500 font-semibold ${isXRay ? "text-[#E24A2B]" : "text-[#F5F5F0]"}`}>
            {project.title}
          </h1>
          <div className="text-[10.5px] font-mono text-[#a1a1aa] tracking-widest uppercase mt-1">
            {project.tagline}
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              className="text-[10px] font-mono font-medium text-[#E24A2B] border border-[#E24A2B]/40 px-4 py-2 hover:bg-[#E24A2B] hover:text-[#050505] transition-all tracking-widest uppercase shadow-[0_0_12px_rgba(226,74,43,0.15)]">
              LIVE SYSTEM →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="text-[10px] font-mono text-[#a1a1aa] border border-[#27272a] px-4 py-2 hover:text-[#FFFFFF] hover:border-[#52525b] transition-all tracking-widest uppercase">
              SOURCE →
            </a>
          )}
          <button
            onClick={() => setIsXRay(!isXRay)}
            className={`text-[10px] font-mono px-4 py-2 border tracking-widest uppercase transition-all font-medium ${
              isXRay ? "border-[#E24A2B] text-[#E24A2B] bg-[#E24A2B]/10" : "border-[#27272a] text-[#a1a1aa] hover:text-[#FFFFFF]"
            }`}
          >
            X-RAY
          </button>
          <button
            onClick={onClose}
            className="text-[10px] font-mono text-[#a1a1aa] border border-[#27272a] px-4 py-2 hover:text-[#FFFFFF] transition-colors tracking-widest uppercase"
          >
            ← RETURN
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-8">

          {/* Summary */}
          <div className="mb-12">
            <div className="text-[9.5px] font-mono text-[#a1a1aa] tracking-widest uppercase mb-3 font-medium">MISSION SPECIFICATION</div>
            <p className="text-sm text-[#e4e4e7] leading-relaxed max-w-2xl">{project.summary}</p>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left: Architecture Layers */}
            <div className="flex-1">
              <div className="text-[9.5px] font-mono text-[#a1a1aa] tracking-widest uppercase mb-6 font-medium">
                {isXRay ? "SYSTEM X-RAY" : "SYSTEM LAYERS"}
              </div>

              {!isXRay ? (
                <div className="space-y-6">
                  {layers.map((layer, idx) => (
                    <div key={layer.id} className="relative group">
                      <div className="text-[9px] font-mono text-[#71717a] tracking-widest mb-2 font-medium">LAYER 0{idx + 1}</div>
                      <div
                        className={`border p-5 transition-all duration-300 cursor-crosshair ${
                          activeLayer === idx ? "border-[#E24A2B] bg-[#E24A2B]/5" : "border-[#27272a] hover:border-[#52525b]"
                        }`}
                        onClick={() => setActiveLayer(activeLayer === idx ? null : idx)}
                      >
                        <div className="text-sm font-mono text-[#F5F5F0] tracking-widest mb-3 font-medium">{layer.label}</div>
                        <div className="flex flex-wrap gap-2">
                          {layer.tech.map((t) => (
                            <span key={t} className="text-[9.5px] font-mono text-[#a1a1aa] border border-[#27272a] px-2.5 py-0.5">{t}</span>
                          ))}
                        </div>
                      </div>
                      {idx < layers.length - 1 && (
                        <div className="flex justify-center my-2">
                          <div className="w-px h-6 bg-[#27272a]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* X-RAY MODE */
                <div className="space-y-8">
                  {/* Architecture Trace */}
                  {project.architectureTrace && (
                    <div>
                      <div className="text-[9.5px] font-mono text-[#E24A2B] tracking-widest uppercase mb-4 font-medium">DATA FLOW TRACE</div>
                      <div className="flex flex-wrap items-center gap-2">
                        {project.architectureTrace.map((step, i) => (
                          <React.Fragment key={i}>
                            <div className="text-[10px] font-mono text-[#d4d4d8] border border-[#E24A2B]/30 px-3 py-1.5 bg-[#E24A2B]/5">
                              {step}
                            </div>
                            {i < project.architectureTrace.length - 1 && (
                              <span className="text-[#E24A2B] text-xs">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Security Analysis */}
                  {project.securityAnalysis && (
                    <div>
                      <div className="text-[9.5px] font-mono text-[#E24A2B] tracking-widest uppercase mb-4 font-medium">SECURITY BOUNDARY</div>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(project.securityAnalysis).map(([key, val]) => (
                          <div key={key} className="border border-[#27272a] p-3">
                            <div className="text-[9px] font-mono text-[#E24A2B] mb-1">{key}</div>
                            <div className="text-[10px] font-mono text-[#d4d4d8]">{val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  {project.metrics && (
                    <div>
                      <div className="text-[9.5px] font-mono text-[#E24A2B] tracking-widest uppercase mb-4 font-medium">SYSTEM TELEMETRY</div>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(project.metrics).map(([key, val]) => (
                          <div key={key} className="border border-[#27272a] p-3">
                            <div className="text-[9px] font-mono text-[#71717a] uppercase">{key.replace(/([A-Z])/g, " $1")}</div>
                            <div className="text-sm font-mono text-[#F5F5F0] mt-1">{val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Engineering Decisions */}
            <div className="lg:w-[380px] lg:border-l lg:border-[#1c1c1e] lg:pl-12">
              <div className="text-[9.5px] font-mono text-[#a1a1aa] tracking-widest uppercase mb-6 font-medium">ENGINEERING REASONING</div>

              <div className="space-y-8">
                {decisions.map((dec) => (
                  <div key={dec.index} className="border-l border-[#27272a] pl-5">
                    <div className="text-[9px] font-mono text-[#71717a] tracking-widest mb-2 font-medium">DECISION 0{dec.index}</div>
                    <div className="text-xs text-[#e4e4e7] leading-relaxed">{dec.reasoning}</div>
                  </div>
                ))}

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mt-8">
                    <div className="text-[9.5px] font-mono text-[#a1a1aa] tracking-widest uppercase mb-4 font-medium">KEY OUTCOMES</div>
                    {project.highlights.map((h, i) => (
                      <div key={i} className="text-xs text-[#d4d4d8] leading-relaxed mb-3 pl-3 border-l border-[#E24A2B]/30">
                        {h}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tech Stack Bar */}
          <div className="mt-12 pt-8 border-t border-[#1c1c1e]">
            <div className="text-[9.5px] font-mono text-[#a1a1aa] tracking-widest uppercase mb-4 font-medium">FULL TECHNOLOGY STACK</div>
            <div className="flex flex-wrap gap-2">
              {project.tech?.map((t) => (
                <span key={t} className="text-[10.5px] font-mono text-[#a1a1aa] border border-[#27272a] px-3 py-1 hover:border-[#E24A2B] hover:text-[#FFFFFF] transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-10 py-3 border-t border-[#1c1c1e] flex justify-between items-center">
        <div className="text-[8.5px] font-mono text-[#52525b] tracking-widest">
          PRESS ESC TO RETURN · {project.category?.toUpperCase()}
        </div>
        <div className="text-[8.5px] font-mono text-[#52525b] tracking-widest">
          {isXRay ? "X-RAY MODE ACTIVE" : "NORMAL VIEW"}
        </div>
      </div>
    </motion.div>
  );
}
