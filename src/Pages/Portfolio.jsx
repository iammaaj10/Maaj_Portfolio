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
  Palette,
  ChevronDown,
} from "lucide-react";

// --- Utility Components (Unchanged) ---

// Floating 3D Orb Component
const FloatingOrb = ({ delay = 0, size = "large" }) => {
  const orbRef = useRef(null);
  
  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    
    let frame = 0;
    const animate = () => {
      frame += 0.01;
      const x = Math.sin(frame + delay) * 50;
      const y = Math.cos(frame + delay) * 50;
      const scale = 1 + Math.sin(frame * 2 + delay) * 0.1;
      
      orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      requestAnimationFrame(animate);
    };
    
    animate();
    // Cleanup is not strictly necessary for rAF loop here, but good practice
    // return () => cancelAnimationFrame(animate); 
  }, [delay]);
  
  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-64 h-64",
    large: "w-96 h-96"
  };
  
  return (
    <div
      ref={orbRef}
      className={`${sizeClasses[size]} rounded-full blur-3xl opacity-20 absolute`}
      style={{
        background: `linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)`,
        animationDelay: `${delay}s`
      }}
    />
  );
};

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// Animated Card Component
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

// --- New Intro Component ---

const IntroSplash = ({ onAnimationEnd }) => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Hey mate, welcome to the world of 0s and 1s...";
  const indexRef = useRef(0); // Use a ref to track the current character index

  useEffect(() => {
    const typingInterval = setInterval(() => {
      // Get the current index from the ref
      const currentI = indexRef.current; 

      if (currentI < fullText.length) {
        // Use the functional form to append the next character
        setTypedText(prev => prev + fullText[currentI]);
        
        // Increment the ref
        indexRef.current = currentI + 1; 
      } else {
        clearInterval(typingInterval);
        // Wait a moment after typing is complete before starting the split
        setTimeout(onAnimationEnd, 1500); 
      }
    }, 100); // <-- Increased to 100ms for robust rendering

    return () => clearInterval(typingInterval);
  }, [onAnimationEnd]);
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-mono text-purple-400 border-r-4 border-white pr-2 whitespace-nowrap overflow-hidden animate-pulse">
        {typedText}
      </h1>
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

  // Function to handle the splash screen animation finish
  const handleIntroEnd = () => {
    setShowPortfolio(true);
    setTimeout(() => {
      setIntroFinished(true);
      // Ensure smooth scrolling starts at the top after intro
      window.scrollTo(0, 0); 
    }, 1500); // Duration matches CSS transition duration
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Only track active section if intro is finished
      if (introFinished) { 
        const sections = ["home", "about", "projects", "experience", "contact"];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is approximately in the viewport center (top 100px)
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

    // Skip intro if already seen (e.g., development environment)
    // if (process.env.NODE_ENV === 'development') { 
    //   setIntroFinished(true);
    // }

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
      gradient: "from-yellow-400 to-orange-500"
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
      gradient: "from-purple-400 to-pink-500"
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
      gradient: "from-green-400 to-emerald-500"
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
      gradient: "from-blue-400 to-cyan-500"
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
      gradient: "from-red-400 to-pink-500"
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
      gradient: "from-yellow-400 to-amber-500"
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
    { text: "Solved 300+ coding problems on LeetCode", icon: <Star size={20} /> },
    { text: "Internal Hackathon Winner - 1st place in Smart India Hackathon (2024)", icon: <Award size={20} /> },
    { text: "Google Cloud Storage Skill Badge (2024)", icon: <Cloud size={20} /> },
    { text: "AWS Cloud Technical Essentials (2025)", icon: <Cloud size={20} /> },
    { text: "State Level Selection - MSBTE project competition (2023)", icon: <Star size={20} /> },
  ];

  if (!introFinished) {
    return (
      <>
        {/* Intro Splash (Will be hidden immediately after animation starts) */}
        {!showPortfolio && <IntroSplash onAnimationEnd={handleIntroEnd} />}

        {/* The underlying content is rendered immediately, but clipped */}
        <div className="fixed inset-0 overflow-hidden">
          {/* Top Half */}
          <div 
            className={`fixed top-0 left-0 right-0 h-1/2 bg-black transition-all duration-1500 ease-in-out z-[90] ${
              showPortfolio ? '-translate-y-full' : 'translate-y-0'
            }`}
          />
          {/* Bottom Half */}
          <div 
            className={`fixed bottom-0 left-0 right-0 h-1/2 bg-black transition-all duration-1500 ease-in-out z-[90] ${
              showPortfolio ? 'translate-y-full' : 'translate-y-0'
            }`}
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden relative">
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* 3D Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingOrb delay={0} size="large" />
        <FloatingOrb delay={2} size="medium" />
        <FloatingOrb delay={4} size="small" />
      </div>

      {/* Mouse Follower Gradient */}
      <div
        className="fixed w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none z-0 transition-all duration-300"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transform: `scale(${1 + Math.sin(scrollY * 0.005) * 0.2})`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-2xl border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Maaj Bhadgaonkar
              </span>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 transition-all duration-300 ${
                    activeSection === item.toLowerCase() ? "text-purple-400" : "text-white hover:text-purple-400"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-purple-500/20 py-4">
            <div className="container mx-auto px-6 flex flex-col space-y-4">
              {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left py-2 px-4 rounded-lg hover:bg-purple-500/20 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedCard>
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-3 text-purple-400 text-xl">
                <Sparkles className="animate-pulse" />
                <span className="animate-pulse">Welcome to my universe</span>
                <Sparkles className="animate-pulse" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                  Full-Stack
                </span>
                <br />
                <span className="text-5xl md:text-7xl bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Developer
                </span>
              </h1>

              {/* Futuristic 3D element in the Hero section */}
              <div className="py-10 flex justify-center">
                <div className="w-40 h-40 bg-purple-500/50 rounded-3xl transform perspective-[1000px] animate-[spin_10s_linear_infinite] shadow-2xl shadow-purple-500/50 flex items-center justify-center">
                  <div className="w-20 h-20 bg-pink-400/80 rounded-full animate-ping absolute opacity-70" />
                  <Code size={48} className="text-white relative z-10" />
                </div>
              </div>
              {/* End of 3D element */}
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Crafting <span className="text-purple-400 font-semibold">innovative solutions</span> with MERN Stack
                <br />
                <span className="text-pink-400 font-semibold">10+ projects</span> • Google Cloud & AWS certified
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <a
                  href="https://drive.google.com/uc?export=download&id=16I8cbf-MGro3UMrFXAoBQSb9v2JpOEse"
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Download size={20} />
                    Download Resume
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-4 border-2 border-purple-400 rounded-full font-semibold text-lg hover:bg-purple-400/20 transition-all duration-300 hover:scale-110"
                >
                  Explore Projects
                </button>
              </div>
            </div>
          </AnimatedCard>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </AnimatedCard>
          
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedCard delay={200}>
              <div className="space-y-6">
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Code size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-400">Education</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-400/20 hover:border-purple-400/40 transition-all">
                      <h4 className="font-semibold text-pink-300 text-lg">B.Tech in Computer Science</h4>
                      <p className="text-gray-300">DKTE Society's Textile and Engineering Institute</p>
                      <p className="text-purple-300 font-semibold mt-2">2023 – Present | CGPA: 8.23</p>
                    </div>
                    
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-400/20 hover:border-purple-400/40 transition-all">
                      <h4 className="font-semibold text-pink-300 text-lg">Diploma in Computer Engineering</h4>
                      <p className="text-gray-300">Sant Gajanan Maharaj Rural Polytechnic</p>
                      <p className="text-purple-300 font-semibold mt-2">2020 – 2023 | 89.09%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <MapPin size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-400">Location</h3>
                  </div>
                  <p className="text-pink-300 font-semibold text-lg">Kolhapur, Maharashtra, India</p>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard delay={400}>
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Database size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400">Technical Skills</h3>
                </div>
                
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category} className="p-4 bg-purple-500/10 rounded-xl border border-purple-400/20">
                      <h4 className="font-semibold text-pink-300 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-400/30 hover:scale-110 hover:bg-purple-500/40 transition-all duration-300 cursor-pointer"
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

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </AnimatedCard>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      {project.icon}
                    </div>
                    <span className="text-xs text-gray-400 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30">
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">{project.title}</h3>
                  <h4 className="text-lg text-pink-300 mb-4 font-semibold">{project.subtitle}</h4>
                  <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{project.description}</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-400/20">
                      <h5 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                        <Star size={16} />
                        Features:
                      </h5>
                      <ul className="space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-400/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
                    >
                      {project.status === "Live Demo" ? <ExternalLink size={18} /> : <Github size={18} />}
                      {project.status}
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </AnimatedCard>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-cyan-400" />
            
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <AnimatedCard key={index} delay={index * 200}>
                  <div className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                      {exp.icon}
                    </div>
                    
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-purple-400">{exp.title}</h3>
                          <h4 className="text-lg text-pink-300 font-semibold">{exp.company}</h4>
                        </div>
                        <span className="text-sm text-gray-400 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30 mt-2 md:mt-0 inline-block">
                        {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
          
          {/* Achievements */}
          <AnimatedCard delay={600}>
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Award size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400">Achievements & Certifications</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-400/20 hover:border-purple-400/40 hover:scale-105 transition-all duration-300"
                    >
                      <div className="text-pink-400">{achievement.icon}</div>
                      <p className="text-gray-300">{achievement.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatedCard>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </AnimatedCard>
          
          <div className="max-w-4xl mx-auto">
            <AnimatedCard delay={200}>
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
                <p className="text-center text-gray-300 text-lg mb-8 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                  <br />
                  <span className="text-purple-400 font-semibold">Let's build something amazing together!</span>
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <a
                    href="mailto:bhadgaonkarmaaj@gmail.com"
                    className="flex items-center gap-4 p-6 bg-purple-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-300">Email</h4>
                      <p className="text-gray-300 text-sm">bhadgaonkarmaaj@gmail.com</p>
                    </div>
                  </a>
                  
                  
                  <a
                    href="tel:+918485878048"
                    className="flex items-center gap-4 p-6 bg-purple-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-300">Phone</h4>
                      <p className="text-gray-300 text-sm">+91 8485878048</p>
                    </div>
                  </a>
                  
                  
                  <a
                    href="https://www.linkedin.com/in/maaj-bhadgaonkar-2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 bg-purple-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-300">LinkedIn</h4>
                      <p className="text-gray-300 text-sm">Connect with me</p>
                    </div>
                  </a>
                  
                  
                  <a
                    href="https://github.com/iammaaj10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 bg-purple-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Github size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-300">GitHub</h4>
                      <p className="text-gray-300 text-sm">View my code</p>
                    </div>
                  </a>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Maaj Bhadgaonkar. Crafted with{" "}
            <span className="text-pink-400 animate-pulse">♥</span> and{" "}
            <span className="text-purple-400">Peace</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
