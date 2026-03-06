import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Cloud,
  Award,
  ExternalLink,
  Download,
  Sparkles,
  Star,
  Zap,
  Menu,
  X,
  Music,
  Brain,
  ShoppingCart,
  TrendingUp,
  ChevronDown,
  Bot,
  Terminal,
  Cpu,
  Globe,
  PenTool,
  Users,
  BarChart3
} from "lucide-react";

// --- Global Styles Injection ---
const GlobalStyles = () => (
  <style>{`
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
    @keyframes scanline {
      0% { top: -100%; }
      100% { top: 100%; }
    }
    @keyframes rotate-3d-x {
      from { transform: rotateX(0deg) rotateY(0deg); }
      to { transform: rotateX(360deg) rotateY(360deg); }
    }
    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .perspective-1000 { perspective: 1000px; }
    .transform-style-3d { transform-style: preserve-3d; }
    .translate-z-16 { transform: translateZ(4rem); }
    .translate-z-neg-16 { transform: translateZ(-4rem); }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #4d7c0f; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #a3e635; }
  `}</style>
);

// --- Utility Components ---
const Typewriter = ({ text, delay = 0, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, text, delay, speed]);

  return (
    <span ref={elementRef}>
      {displayedText}
      <span className="inline-block w-2 h-5 bg-lime-400 ml-1 animate-[cursor-blink_1s_infinite]" />
    </span>
  );
};

const NeonGridBackground = () => {
  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ transform: `translateY(-${offsetY * 0.05}px)` }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#3f3f46 1px, transparent 1px), linear-gradient(90deg, #3f3f46 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute inset-0 z-0 opacity-10" style={{ background: 'linear-gradient(to bottom, transparent, #a3e635, transparent)', height: '100%', animation: 'scanline 8s linear infinite' }} />
      <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-lime-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse" />
    </div>
  );
};

const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay);
    }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={cardRef} className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} ${className}`}>
      {children}
    </div>
  );
};

const IntroSplash = ({ onAnimationEnd }) => {
  const [typedText, setTypedText] = useState("");
  const fullText = "> INITIALIZING MAAJ.DEV V3.0...";
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i + 1));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(onAnimationEnd, 800);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onAnimationEnd]);
  return (
    <div className="fixed inset-0 z-[100] bg-gray-950 flex flex-col items-center justify-center font-mono">
      <h1 className="text-xl md:text-3xl text-lime-400 tracking-wider">{typedText}<span className="animate-pulse">_</span></h1>
      <div className="mt-4 w-64 h-1 bg-gray-800 rounded overflow-hidden">
        <div className="h-full bg-fuchsia-500 animate-[width_2s_ease-out_forwards]" style={{ width: '100%' }} />
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  const handleIntroEnd = () => {
    setShowPortfolio(true);
    setTimeout(() => {
      setIntroFinished(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleScroll = () => {
      if (!introFinished) return;
      const sections = ["home", "about", "projects", "experience", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [introFinished]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  // --- Data ---
  const bioText = "I am a final-year Computer Science student at DKTE Society's Textile & Engineering Institute, maintaining a strong academic record with a CGPA of 8.36. I am a passionate Full-Stack Developer with hands-on experience in building scalable, real-world applications using React, Next.js, Node.js, MongoDB, and modern UI frameworks. I have developed several end-to-end projects, including real-time platforms with authentication, role-based access, and secure backend architectures. Currently, I am deepening my expertise in Next.js, system design, and AI-integration.";

  const skills = {
    "Core Stack": ["React.js", "Next.js 16", "Node.js", "Express.js", "MongoDB", "PostgreSQL"],
    "Languages": ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"],
    "AI & Data": ["Gemini 2.0 Flash", "AI Agents", "ML", "Pandas", "NumPy"],
    "Tools & DevOps": ["Git", "GitHub", "Supabase", "Prisma", "Docker", "Tailwind CSS"],
  };

  const projects = [
    {
      title: "Narratia",
      subtitle: "AI Writing & Collaboration OS",
      year: "2025",
      description: "Full-featured writing platform with hierarchical project organization and real-time collaboration. Features AI brainstorming, emotion analysis, and professional exports.",
      features: ["Gemini 2.0 Integration", "Real-time Collaboration", "Writing Analytics"],
      tech: ["Next.js 16", "TypeScript", "Supabase", "TipTap"],
      status: "GitHub",
      link: "https://github.com/iammaaj10/Narratia",
      icon: <PenTool size={24} />,
      gradient: "from-orange-500 via-fuchsia-500 to-indigo-500"
    },
    {
      title: "MechHelp",
      subtitle: "Emergency Service Platform",
      year: "2025",
      description: "MERN stack platform enabling users to discover and contact mechanics within a 50km radius during vehicle breakdowns.",
      features: ["Real-time geolocation", "Role-based dashboards", "Subscription system"],
      tech: ["React.js", "Node.js", "MongoDB", "Leaflet Maps"],
      status: "Live Demo",
      link: "https://mechhelp.vercel.app/",
      icon: <Zap size={24} />,
      gradient: "from-lime-400 to-cyan-500"
    },
    {
       title: "Recruitify AI",
       subtitle: "AI Resume & JD Matcher",
       year: "2025",
       description: "Smart analysis platform comparing resumes with job descriptions using NLP-powered scoring and skill extraction.",
       features: ["AI Match Score", "Skill Gap Analysis", "NLP Text Similarity"],
       tech: ["React", "TypeScript", "Flask", "Python", "NLTK"],
       status: "Live Demo",
       link: "https://recruitify-ai.vercel.app/",
       icon: <Brain size={24} />,
       gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "NewsBlog",
      subtitle: "AI-Powered Media Platform",
      year: "2024",
      description: "Web app combining news services with community blogging and real-time social interactions.",
      features: ["AI Blog Generation", "Real-time Chat", "Socket.IO"],
      tech: ["React", "Node.js", "Socket.IO", "Gemini API"],
      status: "GitHub",
      link: "https://github.com/iammaaj10/newsBlogs",
      icon: <Globe size={24} />,
      gradient: "from-fuchsia-400 to-lime-500"
    },
    {
      title: "RAG Chatbot",
      subtitle: "Document Q&A System",
      year: "2025",
      description: "Intelligent chatbot using TF-IDF ranking to answer questions based on uploaded documents.",
      features: ["TF-IDF Retrieval", "Contextual Answers", "Document Parsing"],
      tech: ["React", "Node.js", "Gemini AI", "Tailwind"],
      status: "GitHub",
      link: "https://github.com/iammaaj10/Rag-chatbot",
      icon: <Bot size={24} />,
      gradient: "from-purple-400 to-blue-500"
    },
    {
        title: "AI UI Generator",
        subtitle: "Generative Interface Tool",
        year: "2024",
        description: "AI-powered tool that generates modern user interfaces based on natural language descriptions.",
        features: ["NLP to UI", "Tailwind Generation", "Live Preview"],
        tech: ["React", "AI APIs", "Tailwind CSS"],
        status: "GitHub",
        link: "https://github.com/iammaaj10/AI_UI.git",
        icon: <Cpu size={24} />,
        gradient: "from-fuchsia-500 to-lime-500"
    },
  ];

  const experience = [
    {
      title: "Software Development Engineer Intern",
      company: "TregaDevs",
      period: "Nov 2025 – Jan 2026",
      description: "Built CoachOS, a full-stack education platform with role-based access. Implemented NextAuth (JWT), Teacher Attendance system, and RESTful APIs using Node.js and Prisma ORM.",
      icon: <Code size={20} />,
    },
    {
      title: "Frontend Developer",
      company: "BlueStock Fintech",
      period: "Jan 2025 – Mar 2025",
      description: "Developed IPO dashboard and implemented frontend authentication features using React.js.",
      icon: <Code size={20} />,
    },
  ];

  const achievements = [
    { text: "Solved 350+ coding problems on LeetCode", icon: <Star size={20} />, link: "https://leetcode.com/u/iammaaj/" },
    { text: "Winner - 1st place in Smart India Hackathon (Internal 2024)", icon: <Award size={20} /> },
    { text: "Google Cloud Storage Skill Badge (2024)", icon: <Cloud size={20} /> },
    { text: "AWS Cloud Technical Essentials (2025)", icon: <Cloud size={20} /> },
  ];

  if (!introFinished) {
    return (
      <>
        <GlobalStyles />
        {!showPortfolio && <IntroSplash onAnimationEnd={handleIntroEnd} />}
        <div className={`fixed inset-0 bg-gray-950 transition-transform duration-1000 ease-in-out z-[90] ${showPortfolio ? '-translate-y-full' : 'translate-y-0'}`} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden relative font-mono selection:bg-lime-400 selection:text-black">
      <GlobalStyles />
      <NeonGridBackground />

      {/* Mouse Follower Glow */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full opacity-15 blur-[80px] pointer-events-none z-0 transition-transform duration-100 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(163,230,53,0.3) 0%, rgba(232,121,220,0.1) 50%, transparent 70%)",
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-xl font-bold tracking-widest text-lime-400 hover:text-white transition-colors cursor-pointer">
              MAAJ<span className="text-fuchsia-400">.DEV</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-xs tracking-[0.2em] transition-all hover:text-lime-400 ${activeSection === item.toLowerCase() ? "text-fuchsia-400 scale-105" : "text-gray-400"}`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="md:hidden text-lime-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </div>
        </div>
        {mobileMenuOpen && (
             <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-lime-500/20 py-4 absolute w-full">
               {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
                 <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left py-3 px-8 text-sm tracking-widest text-gray-300 hover:bg-white/5 hover:text-lime-400">
                   {item.toUpperCase()}
                 </button>
               ))}
             </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedCard>
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime-500/30 bg-lime-500/5 mb-8">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span></span>
                <span className="text-xs text-lime-300 tracking-widest">SYSTEM ONLINE</span>
             </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
              FULL-STACK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-white to-fuchsia-400">DEVELOPER</span>
            </h1>
            <div className="py-12 flex justify-center perspective-1000">
                <div className="relative w-32 h-32 transform-style-3d animate-[rotate-3d-x_12s_linear_infinite]">
                    <div className="absolute inset-0 border-2 border-lime-400/40 bg-black/20 translate-z-16"></div>
                    <div className="absolute inset-0 border-2 border-fuchsia-400/40 bg-black/20 translate-z-neg-16"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(163,230,53,0.8)]">M</span>
                    </div>
                </div>
             </div>
            <p className="text-gray-400 max-w-xl mx-auto text-lg mb-10 leading-relaxed">
               Building scalable, futuristic applications with <span className="text-lime-400">Next.js</span> and <span className="text-fuchsia-400">AI Agents</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="px-8 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded font-bold transition-all flex items-center justify-center gap-2"><Download size={18} /> DOWNLOAD CV</a>
              <button onClick={() => scrollToSection("projects")} className="px-8 py-3 border border-lime-400 text-lime-400 hover:bg-lime-400/10 rounded font-bold transition-all">VIEW WORK</button>
            </div>
          </AnimatedCard>
        </div>
        <div className="absolute bottom-10 animate-bounce"><ChevronDown className="text-gray-500" /></div>
      </section>

      {/* About */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6">
          <AnimatedCard><h2 className="text-3xl font-bold mb-16 flex items-center gap-4"><span className="text-lime-400">01.</span><span>ABOUT_ME</span><div className="h-px bg-gray-800 flex-grow ml-4"></div></h2></AnimatedCard>
          <AnimatedCard delay={100} className="mb-12">
            <div className="bg-black/40 backdrop-blur-md border-l-4 border-lime-400 rounded-r-lg p-6 md:p-10 relative overflow-hidden group">
               <div className="flex items-start gap-4 relative z-10">
                  <Terminal className="text-lime-400 mt-1 flex-shrink-0" size={28} />
                  <div className="space-y-4">
                     <h3 className="text-xl text-white font-bold tracking-wide">MISSION PROFILE</h3>
                     <div className="text-gray-300 leading-relaxed text-md md:text-lg font-light"><Typewriter text={bioText} speed={15} /></div>
                  </div>
               </div>
            </div>
          </AnimatedCard>
          <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-8">
                <AnimatedCard delay={200}>
                   <div className="p-6 bg-gray-900/50 rounded-xl border border-white/5">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Code className="text-fuchsia-400" /> EDUCATION</h3>
                      <div className="space-y-6">
                        <div className="relative pl-6 border-l border-gray-700">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-fuchsia-500 rounded-full"></div>
                            <h4 className="text-lg font-semibold text-white">B.Tech in Computer Science</h4>
                            <p className="text-sm text-gray-400">DKTE Institute | CGPA: 8.36</p>
                        </div>
                      </div>
                   </div>
                </AnimatedCard>
                <AnimatedCard delay={300}>
                   <div className="p-6 bg-gray-900/50 rounded-xl border border-white/5 flex items-center gap-4"><MapPin className="text-lime-400" /><div><h4 className="text-sm text-gray-400">BASE LOCATION</h4><p className="text-xl font-bold text-white">Kolhapur, India</p></div></div>
                </AnimatedCard>
             </div>
             <AnimatedCard delay={400}>
                <div className="p-6 bg-gray-900/50 rounded-xl border border-white/5">
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Database className="text-lime-400" /> TECH_STACK</h3>
                   <div className="space-y-6">
                      {Object.entries(skills).map(([category, items], idx) => (
                         <div key={idx}><h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">{category}</h4><div className="flex flex-wrap gap-2">{items.map((skill) => (<span key={skill} className="px-3 py-1 bg-gray-800 text-xs text-gray-300 rounded hover:bg-lime-400 hover:text-black transition-all">{skill}</span>))}</div></div>
                      ))}
                   </div>
                </div>
             </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 relative bg-black/20">
         <div className="container mx-auto px-6">
            <AnimatedCard><h2 className="text-3xl font-bold mb-16 flex items-center gap-4 justify-end"><div className="h-px bg-gray-800 flex-grow mr-4"></div><span>PROJECT_LOGS</span><span className="text-fuchsia-400">02.</span></h2></AnimatedCard>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {projects.map((project, index) => (
                  <AnimatedCard key={index} delay={index * 100}>
                     <div className="group h-full bg-gray-900/40 border border-white/10 rounded-xl overflow-hidden hover:border-lime-500/50 transition-all duration-300">
                        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />
                        <div className="p-6 flex flex-col h-full">
                           <div className="flex justify-between items-start mb-4">
                              <div className="p-3 rounded-lg bg-gray-800 text-white group-hover:text-lime-400 transition-colors">{project.icon}</div>
                              <div className="flex gap-2"><Github size={16} className="text-gray-500 hover:text-white cursor-pointer" /></div>
                           </div>
                           <h3 className="text-xl font-bold text-white mb-1 group-hover:text-lime-400">{project.title}</h3>
                           <p className="text-xs font-mono text-fuchsia-400 mb-4">{project.subtitle}</p>
                           <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
                           <div className="flex flex-wrap gap-2 mt-auto">
                              {project.tech.map(t => (<span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded text-gray-300">{t}</span>))}
                           </div>
                           <a href={project.link} target="_blank" rel="noreferrer" className="mt-6 w-full py-2 bg-white/5 hover:bg-lime-500 hover:text-black rounded text-center text-sm font-bold transition-all">ACCESS TERMINAL</a>
                        </div>
                     </div>
                  </AnimatedCard>
               ))}
            </div>
         </div>
      </section>

      {/* Experience & Contact */}
      <section id="experience" className="py-24 relative">
         <div className="container mx-auto px-6">
            <AnimatedCard><h2 className="text-3xl font-bold mb-16 flex items-center gap-4"><span className="text-lime-400">03.</span><span>EXPERIENCE</span><div className="h-px bg-gray-800 flex-grow ml-4"></div></h2></AnimatedCard>
            <div className="max-w-4xl mx-auto space-y-12">
               {experience.map((exp, index) => (
                  <AnimatedCard key={index} delay={index * 200}>
                     <div className="md:flex items-start gap-10 group pl-8 md:pl-0 relative">
                        <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-gray-800"></div>
                        <div className="hidden md:block w-32 text-right pt-2 text-sm font-mono text-gray-500">{exp.period}</div>
                        <div className="hidden md:block w-4 h-4 rounded-full bg-gray-800 border-2 border-lime-500 relative z-10 mt-2"></div>
                        <div className="flex-1 bg-gray-900/50 p-6 rounded-xl border border-white/5 group-hover:border-lime-500/30 transition-all">
                           <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                           <h4 className="text-fuchsia-400 font-medium mb-4">{exp.company}</h4>
                           <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                        </div>
                     </div>
                  </AnimatedCard>
               ))}
            </div>
         </div>
      </section>

      <section id="contact" className="py-24 relative text-center">
         <div className="container mx-auto px-6">
            <AnimatedCard>
               <h2 className="text-5xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">GET IN TOUCH</h2>
               <a href="mailto:maajb1122@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 bg-lime-500 text-black font-bold rounded hover:scale-105 transition-transform"><Mail size={20} /> SAY HELLO</a>
               <div className="mt-20 flex justify-center gap-8">
                  <a href="https://github.com/iammaaj10" className="text-gray-500 hover:text-fuchsia-400 transition-all"><Github /></a>
                  <a href="https://www.linkedin.com/in/maaj-bhadgaonkar/" className="text-gray-500 hover:text-fuchsia-400 transition-all"><Linkedin /></a>
               </div>
            </AnimatedCard>
         </div>
      </section>

      <footer className="py-8 text-center text-gray-600 text-sm font-mono border-t border-white/5 bg-black">
         <p>DESIGNED & BUILT BY MAAJ BHADGAONKAR © 2025</p>
      </footer>
    </div>
  );
};

export default Portfolio;
