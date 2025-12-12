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
} from "lucide-react";

// --- Custom Styles & Keyframes (MUST BE IN GLOBAL CSS/TAILWIND CONFIG) ---
/*
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
    100% { transform: translate(0); }
}
@keyframes matrix-scan {
    0% { background-position: 0% 0%; }
    100% { background-position: -100% -100%; }
}
@keyframes border-pulse {
    0%, 100% { border-color: rgba(163, 230, 53, 0.5); transform: skewX(0deg); }
    50% { border-color: rgba(232, 121, 220, 0.8); transform: skewX(5deg); }
}
@keyframes rotate-3d-x {
    from { transform: rotateX(0deg) rotateY(0deg); }
    to { transform: rotateX(360deg) rotateY(360deg); }
}
@keyframes pulse-core {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
}
*/

// --- Utility Components ---

// Neon Grid Background (Parallax setup)
const NeonGridBackground = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        style={{ transform: `translateY(-${offsetY * 0.1}px)` }} // Subtle Parallax
    >
        {/* Dark Grid Lines */}
        <div 
            className="absolute inset-0 opacity-10" 
            style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #101010, #101010 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #101010, #101010 1px, transparent 1px, transparent 20px)',
                backgroundSize: '20px 20px'
            }}
        />
        {/* Cyber Glow Spots */}
        <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-lime-400/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-fuchsia-400/20 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
    </div>
  );
};

// Animated Card Component (Used for section visibility - unchanged logic)
const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  const handleIntersection = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => setIsVisible(true), delay);
    }
  }, [delay]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [handleIntersection]);
  
  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- System Bootup Intro Component (Matrix/Glitched Reveal) ---

const IntroSplash = ({ onAnimationEnd }) => {
    const [typedText, setTypedText] = useState("");
    const fullText = "> SYSTEM BOOTUP: ACCESS GRANTED. INITIATING UI...";
    const indexRef = useRef(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            const currentI = indexRef.current; 

            if (currentI < fullText.length) {
                setTypedText(prev => prev + fullText[currentI]);
                indexRef.current = currentI + 1; 
            } else {
                clearInterval(typingInterval);
                setTimeout(onAnimationEnd, 1000); // Short delay before split
            }
        }, 50); // Fast matrix typing speed

        return () => clearInterval(typingInterval);
    }, [onAnimationEnd]);
    
    return (
        <div className="fixed inset-0 z-[100] bg-gray-950 flex flex-col items-center justify-center space-y-4 font-mono">
            {/* Matrix Background Effect (Simulated) */}
            <div 
                className="absolute inset-0 opacity-10" 
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ctext x='0' y='8' style='fill:rgb(0,255,0)'%3E1%3C/text%3E%3C/svg%3E")`,
                    backgroundSize: '10px 10px',
                    animation: 'matrix-scan 20s linear infinite'
                }}
            />
            
           <h1 className="text-2xl md:text-4xl text-lime-400 tracking-wider z-10">
                {typedText}
            </h1>
            <p className="text-fuchsia-400 text-sm animate-pulse z-10">
                // DATA STREAM ESTABLISHED
            </p>
        </div>
    );
};


// --- Main Portfolio Component ---
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  const handleIntroEnd = () => {
    setShowPortfolio(true);
    setTimeout(() => {
      setIntroFinished(true);
      window.scrollTo(0, 0); 
    }, 1500); 
  };
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (introFinished) { 
        const sections = ["home", "about", "projects", "experience", "contact"];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) { 
              setActiveSection(section);
              break;
            }
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
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  // --- Data (Unchanged) ---
  const skills = {
    "Programming Languages": ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"],
    "Web Development": ["HTML", "CSS", "React.js", "Node.js", "Express.js", "REST APIs"],
    "AI & ML": ["NLP basics", "Pandas", "NumPy", "Matplotlib"],
    "Tools & Technologies": ["MongoDB", "Git", "GitHub", "Figma", "Linux basics"],
  };

  const projects = [
    {
      title: "MechHelp",
      subtitle: "Online Mechanic Services",
      year: "2025",
      description: "MERN stack platform enabling users to discover and contact mechanics within 50km radius during vehicle breakdowns.",
      features: ["Real-time geolocation", "Role-based dashboards", "Mechanic subscription system", "25+ mechanics tested"],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "React Leaflet", "JWT"],
      status: "Live Demo",
      link: "https://mechhelp.vercel.app/",
      icon: <Zap size={24} />,
      gradient: "from-lime-400 to-cyan-500" 
    },
    {
      title: "NewsBlog",
      subtitle: "AI-Powered News & Blogging Platform",
      year: "2024",
      description: "Full-stack web app combining online news services with community blogging and real-time social interactions.",
      features: ["Daily news updates", "AI-based blog generation", "Real-time social features", "Socket.IO integration"],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "OpenAI/Gemini API"],
      status: "GitHub",
      link: "https://github.com/iammaaj10/newsBlogs",
      icon: <Sparkles size={24} />,
      gradient: "from-fuchsia-400 to-lime-500" 
    },
     {
       title: "Recruitify AI",
       subtitle: "AI-Powered Resume–JD Matching System",
       year: "2025",
       description: "Smart resume analysis platform that compares resumes with job descriptions using NLP-powered scoring, skill extraction, and personalized feedback.",
       features: [
        "AI-based resume–JD match score",
        "Skill extraction (matched & missing)",
        "NLP-powered text similarity",
        "Personalized improvement feedback",
        "Responsive modern UI"
      ],
  tech: ["React.js", "TypeScript", "Flask", "Python", "scikit-learn", "NLTK", "TailwindCSS"],
  status: "Live Demo",
  link: "https://recruitify-ai.vercel.app/",
  icon: <Sparkles size={24} />,
  gradient: "from-purple-500 to-indigo-500"
},
    {
  title: "RAG Chatbot",
  subtitle: "Intelligent Document Q&A System",
  year: "2025",
  description: "Full-stack RAG (Retrieval-Augmented Generation) chatbot system with TF-IDF ranking that enables users to upload documents and ask contextual questions powered by Google Gemini AI.",
  features: [
    "TF-IDF document retrieval", 
    "Cosine similarity ranking", 
    "Real-time AI responses", 
    "LocalStorage persistence",
    "Multi-document support"
  ],
  tech: [
    "React.js", 
    "Node.js", 
    "Express.js", 
    "Google Gemini AI", 
    "TailwindCSS", 
    "Lucide Icons"
  ],
  status: "GitHub",
  link: "https://github.com/iammaaj10/Rag-chatbot",
  icon: <Bot size={24} />,
  gradient: "from-purple-400 to-blue-500" 
},

    {
      title: "Spotify Clone",
      subtitle: "Music Streaming Interface",
      year: "2024",
      description: "Feature-rich Spotify clone built with React, replicating the popular music streaming platform's UI and core functionalities.",
      features: ["Music player interface", "Playlist management", "Responsive design", "React components"],
      tech: ["React.js", "CSS3", "JavaScript", "REST APIs"],
      status: "GitHub",
      link: "https://github.com/iammaaj10/Spotify_Clone_react.git",
      icon: <Music size={24} />,
      gradient: "from-cyan-400 to-fuchsia-500" 
    },
    {
      title: "AI UI Generator",
      subtitle: "Intelligent Interface Designer",
      year: "2024",
      description: "AI-powered tool that generates modern user interfaces based on natural language descriptions and requirements.",
      features: ["Natural language processing", "Component generation", "Modern UI patterns", "Export functionality"],
      tech: ["React.js", "AI/ML APIs", "Tailwind CSS", "JavaScript"],
      status: "GitHub",
      link: "https://github.com/iammaaj10/AI_UI.git",
      icon: <Brain size={24} />,
      gradient: "from-fuchsia-500 to-lime-500" 
    },
    {
      title: "E-Commerce Platform",
      subtitle: "Full-Stack Shopping Solution",
      year: "2024",
      description: "Complete e-commerce platform with product management, shopping cart, and secure checkout functionality.",
      features: ["Product catalog", "Shopping cart", "User authentication", "Payment integration"],
      tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Stripe API"],
      status: "GitHub",
      link: "https://github.com/iammaaj10/ecommerce.git",
      icon: <ShoppingCart size={24} />,
      gradient: "from-cyan-600 to-lime-700" 
    },
    {
      title: "Gold Price Prediction",
      subtitle: "ML-Based Financial Forecasting",
      year: "2024",
      description: "Machine learning model that predicts gold prices using historical data and various economic indicators.",
      features: ["Time series analysis", "ML algorithms", "Data visualization", "Prediction accuracy metrics"],
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      status: "GitHub",
      link: "https://github.com/iammaaj10/GoldPricePrediction.git",
      icon: <TrendingUp size={24} />,
      gradient: "from-lime-400 to-fuchsia-500" 
    },
  ];

  const experience = [
    {
      title: "Frontend Developer",
      company: "BlueStock Fintech",
      period: "Jan 2025 – Mar 2025",
      description: "Developed IPO dashboard and implemented frontend authentication features using React.js at a stock market-focused fintech company.",
      icon: <Code size={20} />,
    },
    {
      title: "Backend Developer",
      company: "InternPe Pvt",
      period: "Mar 2024 – Apr 2024",
      description: "Created authentication APIs including login, registration, and token handling as a backend developer.",
      icon: <Database size={20} />,
    },
    {
      title: "Python Training",
      company: "Malleable Softwares Pvt",
      period: "May 2022 – Jul 2022",
      description: "Completed comprehensive Python development training covering fundamental concepts and core programming constructs.",
      icon: <Cloud size={20} />,
    },
  ];

  const achievements = [
    { 
        text: "Solved 350+ coding problems on LeetCode", 
        icon: <Star size={20} />, 
        link: "https://leetcode.com/u/iammaaj/" 
    },
    { text: "Internal Hackathon Winner - 1st place in Smart India Hackathon (2024)", icon: <Award size={20} /> },
    { text: "Google Cloud Storage Skill Badge (2024)", icon: <Cloud size={20} /> },
    { text: "AWS Cloud Technical Essentials (2025)", icon: <Cloud size={20} /> },
    { text: "State Level Selection - MSBTE project competition (2023)", icon: <Star size={20} /> },
  ];

  if (!introFinished) {
    return (
      <>
        {!showPortfolio && <IntroSplash onAnimationEnd={handleIntroEnd} />}

        <div className="fixed inset-0 overflow-hidden">
          {/* Top Half (Dark Cyberpunk Gray) */}
          <div 
            className={`fixed top-0 left-0 right-0 h-1/2 bg-gray-950 transition-all duration-1500 ease-in-out z-[90] ${
              showPortfolio ? '-translate-y-full' : 'translate-y-0'
            }`}
          />
          {/* Bottom Half (Dark Cyberpunk Gray) */}
          <div 
            className={`fixed bottom-0 left-0 right-0 h-1/2 bg-gray-950 transition-all duration-1500 ease-in-out z-[90] ${
              showPortfolio ? 'translate-y-full' : 'translate-y-0'
            }`}
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden overflow-y-auto relative font-mono">
      
      {/* Neon Grid Background (Parallax Enabled) */}
      <NeonGridBackground />

      {/* Mouse Follower Glow */}
      <div
        className="fixed w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none z-0 transition-all duration-300"
        style={{
          background: "radial-gradient(circle, rgba(163,230,53,0.4) 0%, rgba(232,121,220,0.2) 50%, transparent 70%)", // Lime/Fuchsia glow
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transform: `scale(${1 + Math.sin(scrollY * 0.005) * 0.2})`
        }}
      />

      {/* Navigation (Transparent Black HUD) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-lime-500/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-lime-400 tracking-widest text-shadow-neon animate-glitch">
                MAAJ.DEV
              </span>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-lime-400">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop Menu Links */}
            <div className="hidden md:flex space-x-6">
              {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 transition-all duration-300 text-sm tracking-widest ${
                    activeSection === item.toLowerCase() ? "text-fuchsia-400 border-b border-fuchsia-400" : "text-white hover:text-lime-400"
                  }`}
                >
                  {item.toUpperCase()}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-400 to-lime-400 shadow-neon-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-fuchsia-500/20 py-4 absolute w-full top-full">
            <div className="container mx-auto px-6 flex flex-col space-y-4">
              {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left py-2 px-4 rounded-lg hover:bg-fuchsia-500/20 transition-all text-lime-400 tracking-widest"
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center relative z-20">
          <AnimatedCard>
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-3 text-lime-400 text-xl tracking-widest text-shadow-neon">
                <Sparkles className="animate-pulse" />
                <span className="animate-glitch">CYBER.PORTFOLIO // V3.0 ONLINE</span>
                <Sparkles className="animate-pulse" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold uppercase" style={{ textShadow: '0 0 10px #e879f9' }}>
                <span className="bg-gradient-to-r from-white via-lime-200 to-fuchsia-400 bg-clip-text text-transparent animate-glitch-text">
                  FULL-STACK
                </span>
                <br />
                <span className="text-5xl md:text-7xl text-fuchsia-400 tracking-tighter">
                  DEVELOPER
                </span>
              </h1>

              {/* === REVERTED DATA CUBE WITH 'M' === */}
              <div className="py-10 flex justify-center">
                <div 
                  className="w-40 h-40 border-4 border-lime-400/50 bg-gray-800/80 transform perspective-[1000px] flex items-center justify-center shadow-neon-xl"
                  style={{ transformStyle: 'preserve-3d', animation: 'rotate-3d-x 15s linear infinite' }}
                >
                    <div 
                        className="text-6xl font-extrabold text-lime-400 absolute z-10" 
                        style={{ textShadow: '0 0 10px #a3e635' }}
                    >
                        M
                    </div>
                    {/* Inner Cube Frame (Simulated 3D lines) */}
                    <div className="absolute inset-0 border-lime-400/30 border-[1px] transform translateZ(20px)" />
                    <div className="absolute inset-0 border-lime-400/30 border-[1px] transform translateZ(-20px)" />
                </div>
              </div>
              {/* ==================================== */}
              
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed tracking-wider">
                Crafting <span className="text-fuchsia-400 font-semibold text-shadow-neon-sm">modular solutions</span> in the Full Stack.
                <br />
                <span className="text-lime-400 font-semibold">CODE READY // EXPERIENCE INJECTED</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <a
                  href="https://drive.google.com/uc?export=download&id=16I8cbf-MGro3UMrFXAoBQSb9v2JpOEse"
                  className="group relative px-8 py-4 bg-fuchsia-600 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-neon-lg overflow-hidden border border-fuchsia-400"
                >
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    <Download size={20} className="text-lime-200" />
                    DOWNLOAD SPEC SHEET
                  </span>
                </a>
                
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-4 border-2 border-lime-400 text-lime-400 rounded-lg font-semibold text-lg hover:bg-lime-400/20 transition-all duration-300 hover:scale-110 text-shadow-neon"
                >
                  VIEW PROJECTS LOG
                </button>
              </div>
            </div>
          </AnimatedCard>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-lime-400 text-shadow-neon" />
        </div>
      </section>

      {/* About Section (Floating Data Blocks) */}
      <section id="about" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-16 uppercase text-fuchsia-400 text-shadow-neon">
              // CORE DATA //
            </h2>
          </AnimatedCard>
          
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedCard delay={200}>
              <div className="space-y-6">
                {/* Data Block 1: Education (Dynamic Border) */}
                <div 
                    className="bg-black/70 backdrop-blur-sm rounded-xl p-8 border-t-4 border-l-4 border-lime-500/50 shadow-neon-md hover:border-lime-400 transition-all duration-300"
                    style={{ animation: 'border-pulse 4s infinite alternate' }} // Dynamic border
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-lime-400/20 border border-lime-400 rounded-md flex items-center justify-center shadow-neon-sm">
                      <Code size={24} className="text-lime-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-lime-400 tracking-wider">EDUCATION_PATH</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-fuchsia-400 hover:border-fuchsia-300 transition-all">
                      <h4 className="font-semibold text-fuchsia-300 text-lg">B.Tech in Computer Science</h4>
                      <p className="text-gray-400 text-sm">DKTE Society's Textile and Engineering Institute</p>
                      <p className="text-lime-300 font-semibold mt-2 text-xs">2023 – Present | CGPA: 8.25</p>
                    </div>
                    
                    <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-fuchsia-400 hover:border-fuchsia-300 transition-all">
                      <h4 className="font-semibold text-fuchsia-300 text-lg">Diploma in Computer Engineering</h4>
                      <p className="text-gray-400 text-sm">Sant Gajanan Maharaj Rural Polytechnic</p>
                      <p className="text-lime-300 font-semibold mt-2 text-xs">2020 – 2023 | 89.09%</p>
                    </div>
                  </div>
                </div>
                
                {/* Data Block 2: Location (Dynamic Border) */}
                <div 
                    className="bg-black/70 backdrop-blur-sm rounded-xl p-8 border-b-4 border-r-4 border-lime-500/50 shadow-neon-md hover:border-lime-400 transition-all duration-300"
                    style={{ animation: 'border-pulse 4s infinite alternate reverse' }} // Dynamic border
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-lime-400/20 border border-lime-400 rounded-md flex items-center justify-center shadow-neon-sm">
                      <MapPin size={24} className="text-lime-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-lime-400 tracking-wider">LOCATION_TRACK</h3>
                  </div>
                  <p className="text-fuchsia-300 font-semibold text-lg">Kolhapur, Maharashtra, India</p>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={400}>
              {/* Data Block 3: Skills (Dynamic Border) */}
              <div 
                    className="bg-black/70 backdrop-blur-sm rounded-xl p-8 border-t-4 border-r-4 border-fuchsia-500/50 shadow-neon-md hover:border-fuchsia-400 transition-all duration-300 h-full"
                    style={{ animation: 'border-pulse 4s infinite alternate' }} // Dynamic border
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-fuchsia-400/20 border border-fuchsia-400 rounded-md flex items-center justify-center shadow-neon-sm">
                    <Database size={24} className="text-fuchsia-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-fuchsia-400 tracking-wider">TECHNICAL_MATRIX</h3>
                </div>
                
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category} className="p-4 bg-gray-800 rounded-lg border-l-4 border-lime-400">
                      <h4 className="font-semibold text-lime-300 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
                        {category.toUpperCase()}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gray-700/50 text-cyan-300 px-3 py-1 rounded-full text-xs border border-cyan-400/50 hover:bg-cyan-900 transition-all duration-300 cursor-pointer"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Projects Section (Data Fragment Cards) */}
      <section id="projects" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-16 uppercase text-lime-400 text-shadow-neon">
              // PROJECT LOGS //
            </h2>
          </AnimatedCard>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                {/* Data Fragment Card (Dynamic Border + Hover Skew) */}
                <div 
                    className="bg-black/70 backdrop-blur-sm rounded-xl p-6 border-2 border-fuchsia-500/30 shadow-neon-sm transition-all duration-500 group h-full flex flex-col relative overflow-hidden hover:scale-[1.03] hover:shadow-neon-lg hover:skew-x-1"
                    style={{ animation: 'border-pulse 5s infinite alternate reverse' }} // Dynamic border
                >
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-lime-400/50 group-hover:border-fuchsia-400 transition-colors" />

                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${project.gradient} rounded-md flex items-center justify-center shadow-neon-sm`}>
                      {project.icon}
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 border border-lime-400/30">
                      {project.year} | {project.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-fuchsia-400 mb-1 tracking-wider">{project.title.toUpperCase()}</h3>
                  <h4 className="text-md text-lime-300 mb-4 font-semibold">{project.subtitle}</h4>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">{project.description}</p>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-800 rounded-lg border-l-4 border-cyan-400/50">
                      <h5 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2 text-xs">
                        <Star size={14} />
                        FEATURES:
                      </h5>
                      <ul className="space-y-0.5">
                        {project.features.slice(0, 2).map((feature, i) => (
                          <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                            <span className="w-1 h-1 bg-fuchsia-400 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs bg-gray-700/50 text-cyan-300 px-2 py-0.5 rounded border border-cyan-400/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-fuchsia-600 rounded-lg font-semibold text-sm hover:bg-lime-600 transition-all duration-300 hover:scale-[1.01] text-white tracking-widest"
                    >
                      {project.status === "Live Demo" ? <ExternalLink size={16} /> : <Github size={16} />}
                      ACCESS DATA
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section (Timeline/Command Log) */}
      <section id="experience" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-16 uppercase text-fuchsia-400 text-shadow-neon">
              // COMMAND LOG //
            </h2>
          </AnimatedCard>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Bar (Neon) */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-400 via-cyan-400 to-fuchsia-400 shadow-neon-lg" />
            
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <AnimatedCard key={index} delay={index * 200}>
                  <div className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 bg-gray-900 border-2 border-fuchsia-400 rounded-full flex items-center justify-center shadow-neon-sm animate-pulse">
                      {exp.icon}
                    </div>
                    
                    {/* Log Entry Panel (Dynamic Border) */}
                    <div 
                        className="bg-black/70 backdrop-blur-sm rounded-lg p-6 border-l-4 border-fuchsia-400 transition-all duration-300 hover:scale-[1.01]"
                        style={{ animation: 'border-pulse 3s infinite alternate' }} // Dynamic border
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-lime-400 tracking-wider">{exp.title.toUpperCase()}</h3>
                          <h4 className="text-md text-fuchsia-300 font-semibold">{exp.company}</h4>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-lime-400/30 mt-2 md:mt-0 inline-block">
                        {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
          
          {/* Achievements (System Alerts) */}
          <AnimatedCard delay={600}>
            <div className="mt-16 max-w-4xl mx-auto">
              {/* Achievements Container (Dynamic Border) */}
              <div 
                  className="bg-black/70 backdrop-blur-sm rounded-xl p-8 border-4 border-lime-400/50 shadow-neon-lg"
                  style={{ animation: 'border-pulse 5s infinite alternate reverse' }} // Dynamic border
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-lime-400/20 border border-lime-400 rounded-md flex items-center justify-center shadow-neon-sm">
                    <Award size={24} className="text-lime-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-lime-400 tracking-wider">SYSTEM_ALERTS (ACHIEVEMENTS)</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    
                    const ItemWrapper = achievement.link ? 'a' : 'div';
                    const linkProps = achievement.link ? { 
                        href: achievement.link, 
                        target: "_blank", 
                        rel: "noopener noreferrer" 
                    } : {};

                    return (
                        <ItemWrapper
                            key={index}
                            {...linkProps}
                            className={`flex items-center gap-3 p-4 bg-gray-800 rounded-lg border-l-4 border-cyan-400/50 transition-all duration-300 ${
                                achievement.link 
                                    ? 'hover:scale-[1.02] cursor-pointer hover:border-fuchsia-400' 
                                    : ''
                            }`}
                        >
                            <div className="text-fuchsia-400">{achievement.icon}</div>
                            <p className="text-gray-300 text-sm">{achievement.text}</p>
                            {achievement.link && (
                                <ExternalLink size={16} className="text-lime-400 ml-auto" />
                            )}
                        </ItemWrapper>
                    );
                  })}
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Contact Section (Terminal Interface) */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedCard>
            <h2 className="text-4xl font-bold text-center mb-16 uppercase text-fuchsia-400 text-shadow-neon">
              // CONTACT_INTERFACE //
            </h2>
          </AnimatedCard>
          
          <div className="max-w-4xl mx-auto">
            <AnimatedCard delay={200}>
              {/* Contact Container (Dynamic Border) */}
              <div 
                  className="bg-black/80 backdrop-blur-sm rounded-xl p-8 border-2 border-lime-400/50 shadow-neon-lg"
                  style={{ animation: 'border-pulse 4s infinite alternate' }} // Dynamic border
              >
                <p className="text-center text-gray-300 text-lg mb-8 leading-relaxed">
                  <span className="text-lime-400">STATUS: READY.</span> Enter command to establish communication link.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {[
                    { icon: <Mail size={24} />, title: "EMAIL", value: "maajb1122@gmail.com", href: "mailto:maajb1122@gmail.com" },
                    { icon: <Phone size={24} />, title: "PHONE", value: "+91 9130304068", href: "tel:+918485878048" },
                    { icon: <Linkedin size={24} />, title: "LINKEDIN", value: "CONNECT", href: "https://www.linkedin.com/in/maaj-bhadgaonkar/" },
                    { icon: <Github size={24} />, title: "GITHUB", value: "VIEW CODE", href: "https://github.com/iammaaj10" },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-6 bg-gray-900 rounded-lg border-l-4 border-fuchsia-400 hover:border-lime-400 transition-all duration-300 group shadow-lg shadow-fuchsia-900/50 hover:scale-[1.02]"
                    >
                      <div className="w-12 h-12 bg-lime-400/20 border border-lime-400 rounded-md flex items-center justify-center group-hover:bg-fuchsia-400/20 transition-transform shadow-neon-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lime-300 tracking-widest">{item.title}</h4>
                        <p className="text-fuchsia-400 text-sm">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-fuchsia-500/30 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-xs tracking-widest">
            (C) 2025 MAAJ BHADGAONKAR // DATA STREAM TERMINATED
            <br />
            <span className="text-lime-400 animate-pulse">SYSTEM ONLINE // NO ERRORS FOUND</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
