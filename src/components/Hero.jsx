import React from 'react';
import Hero3D from './Hero3D';
import { motion } from 'framer-motion';

export default function Hero(){
  return (
    <section className="mt-20 grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <motion.h1 initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.1}} className="text-4xl md:text-5xl font-bold leading-tight">
          Maaj Munawar — <span className="text-neon">Full-Stack</span> Developer
        </motion.h1>
        <motion.p initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2}} className="mt-4 text-slate-300 max-w-xl">
          Building realtime, scalable apps using MERN stack. Cloud certified. I design futuristic UIs and ship polished experiences.
        </motion.p>
        <div className="mt-6 flex gap-4">
          <a href="/MaajResume.pdf" download className="px-5 py-2 glass rounded-md border border-white/6 hover:scale-105 transition">Download CV</a>
          <a href="#projects" className="px-5 py-2 bg-gradient-to-r from-neon/40 to-violet/40 rounded-md">See Projects</a>
        </div>
      </div>

      <div className="w-full h-96 glass rounded-xl p-2">
        <Hero3D />
      </div>
    </section>
  );
}
