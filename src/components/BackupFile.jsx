// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   Github,
//   Linkedin,
//   Mail,
//   Phone,
//   MapPin,
//   Code,
//   Database,
//   Cloud,
//   Award,
//   ExternalLink,
//   Download,
//   Sparkles,
//   Star,
//   Zap,
//   Menu,
//   X,
// } from "lucide-react";

// const Portfolio = () => {
//   const [activeSection, setActiveSection] = useState("hero");
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//       // Update active section based on scroll position
//       const sections = ["home", "about", "projects", "experience", "contact"];
//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= 100 && rect.bottom >= 100) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//     setMobileMenuOpen(false);
//   };

//   const handleDownloadResume = () => {
//     // Create a temporary anchor element
//     const link = document.createElement("a");
//     link.href = "/resume.pdf"; 
//     link.download = "Maaj_Bhadgaonkar_Resume.pdf";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const skills = {
//     "Programming Languages": [
//       "C",
//       "C++",
//       "Java",
//       "Python",
//       "JavaScript",
//       "TypeScript",
//       "SQL",
//     ],
//     "Web Development": [
//       "HTML",
//       "CSS",
//       "React.js",
//       "Node.js",
//       "Express.js",
//       "REST APIs",
//     ],
//     "AI & ML": ["NLP basics", "Pandas", "NumPy", "Matplotlib"],
//     "Tools & Technologies": [
//       "MongoDB",
//       "Git",
//       "GitHub",
//       "Figma",
//       "Linux basics",
//     ],
//   };

//   const projects = [
//     {
//       title: "MechHelp",
//       subtitle: "Online Mechanic Services",
//       year: "2025",
//       description:
//         "MERN stack platform enabling users to discover and contact mechanics within 50km radius during vehicle breakdowns.",
//       features: [
//         "Real-time geolocation",
//         "Role-based dashboards",
//         "Mechanic subscription system",
//         "25+ mechanics tested",
//       ],
//       tech: [
//         "React.js",
//         "Node.js",
//         "Express.js",
//         "MongoDB",
//         "React Leaflet",
//         "JWT",
//       ],
//       status: "Live Demo",
//       demoLink: "https://mechhelp.vercel.app/",
//       icon: <Zap size={24} />,
//     },
//     {
//       title: "NewsBlog",
//       subtitle: "AI-Powered News & Blogging Platform",
//       year: "2024",
//       description:
//         "Full-stack web app combining online news services with community blogging and real-time social interactions.",
//       features: [
//         "Daily news updates",
//         "AI-based blog generation",
//         "Real-time social features",
//         "Socket.IO integration",
//       ],
//       tech: [
//         "React.js",
//         "Node.js",
//         "Express.js",
//         "MongoDB",
//         "Socket.IO",
//         "OpenAI/Gemini API",
//       ],
//       status: "GitHub",
//       githubLink: "https://github.com/iammaaj10/newsBlogs",
//       icon: <Sparkles size={24} />,
//     },
//   ];

//   const experience = [
//     {
//       title: "Frontend Developer",
//       company: "BlueStock Fintech",
//       period: "Jan 2025 – Mar 2025",
//       description:
//         "Developed IPO dashboard and implemented frontend authentication features using React.js at a stock market-focused fintech company.",
//       icon: <Code size={20} />,
//     },
//     {
//       title: "Backend Developer",
//       company: "InternPe Pvt",
//       period: "Mar 2024 – Apr 2024",
//       description:
//         "Created authentication APIs including login, registration, and token handling as a backend developer.",
//       icon: <Database size={20} />,
//     },
//     {
//       title: "Python Training",
//       company: "Malleable Softwares Pvt",
//       period: "May 2022 – Jul 2022",
//       description:
//         "Completed comprehensive Python development training covering fundamental concepts and core programming constructs.",
//       icon: <Cloud size={20} />,
//     },
//   ];

//   const achievements = [
//     {
//       text: "Solved 200+ coding problems on LeetCode",
//       icon: <Star size={20} />,
//     },
//     {
//       text: "Internal Hackathon Winner - 1st place in Smart India Hackathon (2024)",
//       icon: <Award size={20} />,
//     },
//     {
//       text: "Google Cloud Storage Skill Badge (2024)",
//       icon: <Cloud size={20} />,
//     },
//     {
//       text: "AWS Cloud Technical Essentials (2025)",
//       icon: <Cloud size={20} />,
//     },
//     {
//       text: "State Level Selection - MSBTE project competition (2023)",
//       icon: <Star size={20} />,
//     },
//   ];
  
//   const phone = () => {
//     alert("9130304068");
//   }
// const fileId = import.meta.env.VITE_GOOGLE_DRIVE_FILE_ID;
// const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
//       {/* Enhanced Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {/* Floating orbs */}
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
//         <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500 rounded-full opacity-10 animate-bounce animation-delay-2000"></div>
//         <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-cyan-500 rounded-full opacity-15 animate-pulse animation-delay-3000"></div>

//         {/* Mouse follower with enhanced effects */}
//         <div
//           className="absolute w-96 h-96 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full opacity-10 blur-3xl transition-all duration-1000"
//           style={{
//             left: mousePosition.x - 192,
//             top: mousePosition.y - 192,
//             transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`,
//           }}
//         ></div>

//         {/* Geometric shapes */}
//         <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 rotate-45 animate-spin-slow opacity-30"></div>
//         <div className="absolute bottom-20 left-20 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-40"></div>
//         <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-cyan-400 rotate-45 animate-bounce opacity-50"></div>
//       </div>

//       {/* Enhanced Navigation */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/20 shadow-2xl">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
//               Maaj Bhadgaonkar
//             </div>
            
//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="text-white focus:outline-none"
//               >
//                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
            
//             {/* Desktop Navigation */}
//             <div className="hidden md:flex space-x-8">
//               {["Home", "About", "Projects", "Experience", "Contact"].map(
//                 (item) => (
//                   <button
//                     key={item}
//                     onClick={() => scrollToSection(item.toLowerCase())}
//                     className={`hover:text-purple-400 transition-all duration-300 relative group py-2 px-4 rounded-full hover:bg-white/10 ${
//                       activeSection === item.toLowerCase() ? "text-purple-400" : ""
//                     }`}
//                   >
//                     {item}
//                     <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
//                       activeSection === item.toLowerCase() ? "w-3/4" : "w-0 group-hover:w-3/4"
//                     }`}></span>
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-black/80 backdrop-blur-lg border-t border-white/20 py-4">
//             <div className="container mx-auto px-6 flex flex-col space-y-4">
//               {["Home", "About", "Projects", "Experience", "Contact"].map(
//                 (item) => (
//                   <button
//                     key={item}
//                     onClick={() => scrollToSection(item.toLowerCase())}
//                     className={`text-left py-2 px-4 rounded-lg transition-all duration-300 ${
//                       activeSection === item.toLowerCase() 
//                         ? "bg-purple-500/20 text-purple-400" 
//                         : "hover:bg-white/10 hover:text-purple-400"
//                     }`}
//                   >
//                     {item}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Enhanced Hero Section */}
//       <section
//         id="home"
//         className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
//       >
//         <div className="container mx-auto px-6 text-center relative z-10">
//           <div className="animate-fade-in-up">
//             <div className="mb-8 inline-block">
//               <div className="flex items-center gap-2 text-purple-400 text-lg font-semibold mb-4">
//                 <Sparkles size={24} className="animate-pulse" />
//                 <span className="animate-pulse">Welcome to my world</span>
//                 <Sparkles size={24} className="animate-pulse" />
//               </div>
//             </div>
//             <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
//               Full-Stack
//               <br />
//               <span className="text-4xl sm:text-5xl md:text-7xl bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                 Developer
//               </span>
//             </h1>
//             <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               Skilled in MERN Stack with{" "}
//               <span className="text-purple-400 font-semibold">
//                 10+ projects
//               </span>
//               . Google Cloud & AWS certified.
//               <br />
//               <span className="text-pink-400 font-semibold">
//                 Building innovative solutions
//               </span>{" "}
//               that matter.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <a href={downloadLink}>
//                 <button 
                
//                 className="group bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   <Download size={20} />
//                   Download Resume
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>
//               </a>
//               <button
//                 onClick={() => scrollToSection("projects")}
//                 className="group border-2 border-purple-400 hover:bg-purple-400 hover:border-pink-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-400/25 relative overflow-hidden"
//               >
//                 <span className="relative z-10">View Projects</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="flex flex-col items-center gap-2">
//             <ChevronDown size={32} className="text-purple-400 animate-pulse" />
//             <span className="text-sm text-gray-400">Scroll to explore</span>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced About Section */}
//       <section id="about" className="py-16 md:py-20 relative">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
//             About Me
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
//             <div className="space-y-6">
//               <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 group">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
//                     <Code size={20} className="text-white" />
//                   </div>
//                   <h3 className="text-xl md:text-2xl font-bold text-purple-400">
//                     Education
//                   </h3>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all duration-300">
//                     <h4 className="font-semibold text-pink-300">
//                       B.Tech in Computer Science
//                     </h4>
//                     <p className="text-gray-300">
//                       DKTE Society's Textile and Engineering Institute
//                     </p>
//                     <p className="text-purple-300 font-semibold">
//                       2023 – Present | CGPA: 8.23
//                     </p>
//                   </div>
//                   <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all duration-300">
//                     <h4 className="font-semibold text-pink-300">
//                       Diploma in Computer Engineering
//                     </h4>
//                     <p className="text-gray-300">
//                       Sant Gajanan Maharaj Rural Polytechnic
//                     </p>
//                     <p className="text-purple-300 font-semibold">
//                       2020 – 2023 | 89.09%
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
//                     <MapPin size={20} className="text-white" />
//                   </div>
//                   <h3 className="text-xl md:text-2xl font-bold text-purple-400">
//                     Location
//                   </h3>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-300">
//                   <span className="text-pink-300 font-semibold">
//                     Kolhapur, Maharashtra, India
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
//                   <Database size={20} className="text-white" />
//                 </div>
//                 <h3 className="text-xl md:text-2xl font-bold text-purple-400">
//                   Technical Skills
//                 </h3>
//               </div>
//               <div className="space-y-6">
//                 {Object.entries(skills).map(([category, skillList]) => (
//                   <div
//                     key={category}
//                     className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all duration-300"
//                   >
//                     <h4 className="font-semibold mb-3 text-pink-300 flex items-center gap-2">
//                       <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
//                       {category}
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {skillList.map((skill) => (
//                         <span
//                           key={skill}
//                           className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-purple-400/30 hover:bg-purple-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Projects Section */}
//       <section id="projects" className="py-16 md:py-20 relative">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
//             Featured Projects
//           </h2>
//           <div className="grid md:grid-cols-2 gap-6 md:gap-8">
//             {projects.map((project, index) => (
//               <div
//                 key={index}
//                 className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 group relative overflow-hidden"
//               >
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
//                 <div className="relative z-10">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
//                         {project.icon}
//                       </div>
//                       <h3 className="text-xl md:text-2xl font-bold text-purple-400">
//                         {project.title}
//                       </h3>
//                     </div>
//                     <span className="text-xs sm:text-sm text-gray-400 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-2 sm:px-3 py-1 rounded-full border border-purple-400/30">
//                       {project.year}
//                     </span>
//                   </div>
//                   <h4 className="text-lg text-pink-300 mb-4 font-semibold">
//                     {project.subtitle}
//                   </h4>
//                   <p className="text-gray-300 mb-6 leading-relaxed">
//                     {project.description}
//                   </p>
//                   <div className="space-y-4">
//                     <div className="p-4 bg-white/5 rounded-lg border border-white/10">
//                       <h5 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
//                         <Star size={16} />
//                         Key Features:
//                       </h5>
//                       <ul className="space-y-1">
//                         {project.features.map((feature, i) => (
//                           <li
//                             key={i}
//                             className="text-xs sm:text-sm text-gray-300 flex items-center gap-2"
//                           >
//                             <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
//                             {feature}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div className="p-4 bg-white/5 rounded-lg border border-white/10">
//                       <h5 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
//                         <Code size={16} />
//                         Technologies:
//                       </h5>
//                       <div className="flex flex-wrap gap-2">
//                         {project.tech.map((tech) => (
//                           <span
//                             key={tech}
//                             className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-400/30 hover:scale-105 transition-transform duration-300"
//                           >
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
//                     <div className="flex gap-4">
//                       {project.title === "MechHelp" && (
//                         <a
//                           href="https://mechhelp.vercel.app/"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-105 font-semibold text-sm sm:text-base"
//                         >
//                           <ExternalLink size={16} />
//                           Live Demo
//                         </a>
//                       )}
//                       {project.title === "NewsBlog" && (
//                         <a
//                           href="https://github.com/iammaaj10/newsBlogs"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-105 font-semibold text-sm sm:text-base"
//                         >
//                           <Github size={16} />
//                           View Code
//                         </a>
//                       )}
//                     </div>
//                     <span className="text-xs sm:text-sm text-gray-400">
//                       {project.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Experience Section */}
//       <section id="experience" className="py-16 md:py-20 relative">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
//             Experience
//           </h2>
//           <div className="max-w-4xl mx-auto">
//             <div className="relative">
//               <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-cyan-400"></div>
//               <div className="space-y-6 md:space-y-8">
//                 {experience.map((exp, index) => (
//                   <div key={index} className="relative pl-8 sm:pl-12 group">
//                     <div className="absolute left-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-125 transition-transform duration-300">
//                       {exp.icon}
//                     </div>
//                     <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//                         <div>
//                           <h3 className="text-lg sm:text-xl font-bold text-purple-400">
//                             {exp.title}
//                           </h3>
//                           <h4 className="text-base sm:text-lg text-pink-300 font-semibold">
//                             {exp.company}
//                           </h4>
//                         </div>
//                         <span className="text-xs sm:text-sm text-gray-400 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-2 sm:px-3 py-1 rounded-full w-fit border border-purple-400/30 mt-2 md:mt-0">
//                           {exp.period}
//                         </span>
//                       </div>
//                       <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
//                         {exp.description}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Achievements Section */}
//       <section className="py-16 md:py-20 relative">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
//             Achievements
//           </h2>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {achievements.map((achievement, index) => (
//               <div
//                 key={index}
//                 className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 group relative overflow-hidden"
//               >
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
//                 <div className="relative z-10">
//                   <div className="flex items-start gap-3">
//                     <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                       {achievement.icon}
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
//                       {achievement.text}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Contact Section */}
//       <section id="contact" className="py-16 md:py-20 relative">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
//             Get In Touch
//           </h2>
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
//               <div className="grid md:grid-cols-2 gap-8 md:gap-12">
//                 <div className="space-y-4 md:space-y-6">
//                   <div className="flex items-center gap-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
//                       <Mail size={18} className="text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm sm:text-base font-semibold text-purple-400">Email</h3>
//                       <p className="text-xs sm:text-sm text-gray-300">maajb1122@gmail.com</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
//                       <Phone size={18} className="text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm sm:text-base font-semibold text-purple-400">Phone</h3>
//                       <p className="text-xs sm:text-sm text-gray-300">+91 9130304068</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
//                       <Linkedin size={18} className="text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm sm:text-base font-semibold text-purple-400">
//                         LinkedIn
//                       </h3>
//                       <p className="text-xs sm:text-sm text-gray-300">/maaj-bhadgaonkar/</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
//                       <Github size={18} className="text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm sm:text-base font-semibold text-purple-400">GitHub</h3>
//                       <p className="text-xs sm:text-sm text-gray-300">/iammaaj10</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-sm sm:text-base"
//                   />
//                   <input
//                     type="email"
//                     placeholder="Your Email"
//                     className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-sm sm:text-base"
//                   />
//                   <textarea
//                     placeholder="Your Message"
//                     rows={4}
//                     className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-sm sm:text-base"
//                   ></textarea>
//                   <button className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group text-sm sm:text-base">
//                     <span className="relative z-10">Send Message</span>
//                     <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Footer */}
//       <footer className="py-8 md:py-12 border-t border-white/20 bg-black/20 backdrop-blur-sm">
//         <div className="container mx-auto px-6">
//           <div className="text-center space-y-4">
//             <div className="flex justify-center items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
//               <a
//                 href="mailto:maajb1122@gmail.com"
//                 className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300"
//               >
//                 <Mail size={16} className="text-white" />
//               </a>
//               <a
//                 className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300"
//               >
//                 <Phone size={16} className="text-white" onClick={phone}/>
//               </a>
//               <a
//                 href="https://www.linkedin.com/in/maaj-bhadgaonkar/"
//                 className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300"
//               >
//                 <Linkedin size={16} className="text-white" />
//               </a>
//               <a
//                 href="https://github.com/iammaaj10"
//                 className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300"
//               >
//                 <Github size={16} className="text-white" />
//               </a>
//             </div>
//             <p className="text-gray-400 text-sm sm:text-lg">
//               © 2025 Maaj Bhadgaonkar. All rights reserved.
//             </p>
//             <p className="text-gray-500 text-xs sm:text-sm">
//               Crafted with passion • Powered by innovation
//             </p>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 1s ease-out;
//         }

//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }

//         .animation-delay-1000 {
//           animation-delay: 1s;
//         }

//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }

//         .animation-delay-3000 {
//           animation-delay: 3s;
//         }

//         /* Smooth scrolling */
//         html {
//           scroll-behavior: smooth;
//         }

//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.1);
//         }

//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #a855f7, #ec4899);
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #9333ea, #db2777);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Portfolio;