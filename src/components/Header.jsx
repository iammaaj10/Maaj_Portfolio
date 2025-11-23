import React from 'react';

export default function Header(){
  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neon">
            <img src="/profile.jpg" alt="Maaj" className="w-full h-full object-cover"/>
          </div>
          <div className="text-white/90">
            <div className="font-semibold">Maaj Munawar</div>
            <div className="text-xs text-white/60">Full-Stack Developer</div>
          </div>
        </div>
        <nav className="glass px-4 py-2 rounded-xl flex gap-4">
          <a href="#projects" className="text-sm hover:underline">Projects</a>
          <a href="#about" className="text-sm hover:underline">About</a>
          <a href="/MaajResume.pdf" download className="text-sm bg-gradient-to-r from-teal-400/30 to-violet-400/20 px-3 py-1 rounded-lg">Resume</a>
        </nav>
      </div>
    </header>
  );
}
