import React from "react";
import { FileText, Github, Mail, Linkedin, MapPin, Phone } from "lucide-react";
import { developerProfile, experienceData, academicData, engineeringSignals } from "../../data/mindSystemData";
import { projectsData } from "../../data/projectsData";

export default function QuickScanMode() {
  return (
    <div className="fixed inset-0 z-30 bg-slate-950 pt-20 pb-10 px-4 sm:px-6 md:px-12 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/40 text-slate-300 font-mono">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Profile */}
        <section className="border-b border-slate-800 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 uppercase tracking-widest mb-2">
            {developerProfile.name}
          </h1>
          <h2 className="text-lg text-emerald-400 uppercase tracking-wider mb-6">
            {developerProfile.role}
          </h2>
          
          <div className="flex flex-wrap gap-4 text-xs">
            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {developerProfile.location}</span>
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {developerProfile.phone}</span>
            <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {developerProfile.email}</span>
            <a href={developerProfile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-400"><Github className="w-3.5 h-3.5" /> GITHUB</a>
            <a href={developerProfile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-400"><Linkedin className="w-3.5 h-3.5" /> LINKEDIN</a>
          </div>
          
          <p className="mt-6 text-sm leading-relaxed max-w-3xl border-l-2 border-emerald-500/50 pl-4 text-slate-400">
            {developerProfile.bio}
          </p>
        </section>

        {/* Engineering Signals */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-100 uppercase tracking-widest border-b border-slate-800 pb-2">Technical Proficiency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {engineeringSignals.map((sig, i) => (
              <div key={i} className="p-4 bg-slate-900/50 border border-slate-800 rounded flex flex-col gap-2">
                <span className="text-xs tracking-widest font-bold" style={{ color: sig.color }}>{sig.name}</span>
                <span className="text-sm font-bold text-slate-200">{sig.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-100 uppercase tracking-widest border-b border-slate-800 pb-2">Experience Log</h3>
          <div className="space-y-8">
            {experienceData.map((exp, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-1/4 shrink-0 text-sm text-slate-400 font-bold">{exp.period}</div>
                <div className="md:w-3/4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-emerald-300">{exp.role}</h4>
                  </div>
                  <div className="text-sm font-bold text-slate-300">{exp.company}</div>
                  <ul className="list-disc list-inside text-sm text-slate-400 space-y-1 mt-2">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="leading-relaxed">{ach}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-100 uppercase tracking-widest border-b border-slate-800 pb-2">Project Case Studies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((proj, i) => (
              <div key={i} className="p-5 bg-slate-900/50 border border-slate-800 rounded space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-cyan-300">{proj.title}</h4>
                  {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer"><Github className="w-4 h-4 text-slate-500 hover:text-white" /></a>}
                </div>
                <div className="text-xs text-slate-500 tracking-widest uppercase">{proj.tagline}</div>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{proj.summary}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tech.slice(0, 4).map((t, j) => (
                    <span key={j} className="text-[10px] px-2 py-0.5 bg-slate-950 border border-slate-700 rounded text-slate-300">{t}</span>
                  ))}
                  {proj.tech.length > 4 && <span className="text-[10px] px-2 py-0.5 text-slate-500">+{proj.tech.length - 4}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-100 uppercase tracking-widest border-b border-slate-800 pb-2">Academic Matrix</h3>
          <div className="space-y-4">
            {academicData.map((edu, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between border-b border-slate-800/50 pb-4">
                <div>
                  <h4 className="font-bold text-slate-200">{edu.degree}</h4>
                  <div className="text-sm text-slate-400">{edu.institution}</div>
                </div>
                <div className="text-right flex flex-col gap-1">
                  <span className="text-xs text-slate-500">{edu.period}</span>
                  <span className="text-sm font-bold text-emerald-400">{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-8 text-center text-xs text-slate-600 pb-12 border-t border-slate-800">
          [END OF TRANSMISSION]
        </div>

      </div>
    </div>
  );
}
