import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({project}){
  return (
    <motion.a 
      href={project.repo} target="_blank" rel="noreferrer"
      whileHover={{ scale: 1.03}}
      className="glass p-4 rounded-xl hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{project.title}</h3>
        {project.featured && <span className="text-xs bg-neon/10 px-2 py-1 rounded">Featured</span>}
      </div>
      <p className="text-sm text-slate-300 mt-2">{project.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map(t => <span key={t} className="text-xs px-2 py-1 rounded bg-white/5">{t}</span>)}
      </div>
    </motion.a>
  );
}
