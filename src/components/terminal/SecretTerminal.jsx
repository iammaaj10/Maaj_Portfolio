import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioSystem } from '../../utils/audioSystem';
import { developerProfile, experienceData, achievementsData } from '../../data/mindSystemData';

export default function SecretTerminal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'MAAJ OS v1.0.0 initialized.' },
    { type: 'system', text: 'Type "help" to view available commands.' }
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      audioSystem.init();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = [];

    switch (trimmed) {
      case 'help':
        response = [
          'AVAILABLE COMMANDS:',
          '  whoami      - display system identity',
          '  status      - view core telemetry',
          '  experience  - list work history',
          '  awards      - list achievements',
          '  clear       - wipe terminal history',
          '  exit        - close terminal interface'
        ];
        break;
      case 'whoami':
        response = [
          `NAME: ${developerProfile.name}`,
          `ROLE: ${developerProfile.role}`,
          `STATUS: ${developerProfile.status}`,
          `EMAIL: ${developerProfile.email}`
        ];
        break;
      case 'status':
        response = developerProfile.stats.map(s => `${s.label}: ${s.value}`);
        break;
      case 'experience':
        response = experienceData.map(e => `${e.period} | ${e.role} @ ${e.company}`);
        break;
      case 'awards':
        response = achievementsData.map(a => `${a.year} - ${a.title}`);
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case '':
        return;
      default:
        response = [`command not found: ${trimmed}`];
    }

    setHistory(prev => [
      ...prev,
      { type: 'user', text: `> ${cmd}` },
      ...response.map(r => ({ type: 'output', text: r }))
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      audioSystem.playClick();
    } else {
      audioSystem.playType();
    }
    
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[100]"
      >
        <div className="bg-[#0a0a0a]/95 backdrop-blur-md border border-[#27272a] shadow-2xl overflow-hidden font-mono text-xs">
          {/* Header */}
          <div className="bg-[#111113] border-b border-[#27272a] px-4 py-2.5 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-[#E24A2B] animate-pulse"></span>
              <span className="text-[#a1a1aa] tracking-widest text-[9.5px] font-medium">TERMINAL // ROOT</span>
            </div>
            <button onClick={onClose} className="text-[#71717a] hover:text-[#E24A2B] transition-colors font-bold px-1">✕</button>
          </div>

          {/* Body */}
          <div className="p-4 h-[400px] overflow-y-auto scrollbar-hide text-[#d4d4d8]" onClick={() => inputRef.current?.focus()}>
            {history.map((entry, i) => (
              <div key={i} className={`mb-1.5 leading-relaxed ${entry.type === 'user' ? 'text-[#F5F5F0] font-semibold' : entry.type === 'system' ? 'text-[#a1a1aa]' : 'text-[#d4d4d8] ml-4'}`}>
                {entry.text}
              </div>
            ))}
            
            <div className="flex items-center mt-3 pt-2 border-t border-[#1c1c1e]">
              <span className="text-[#E24A2B] font-bold mr-2">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#F5F5F0] font-mono text-xs"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
