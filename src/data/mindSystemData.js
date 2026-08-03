export const mindNodes = [
  {
    id: "system-core",
    label: "SYSTEM CORE",
    sublabel: "Developer Mind & Blueprint",
    category: "core",
    x: 0,
    y: 0,
    radius: 54,
    color: "#00f0ff",
    glowColor: "rgba(0, 240, 255, 0.4)",
    icon: "Brain",
    pulseRate: 1.5,
    description: "Central processing core containing architectural philosophy, background specs, and system telemetry."
  },
  {
    id: "projects-portal",
    label: "PROJECT PORTALS",
    sublabel: "Case-Study Systems",
    category: "projects",
    x: -260,
    y: -140,
    radius: 46,
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    icon: "FolderGit2",
    pulseRate: 2.0,
    description: "Interactive neural showcase of featured software systems, AI narrative engines, and full-stack platforms."
  },
  {
    id: "skills-matrix",
    label: "SKILL MATRIX",
    sublabel: "Energy & Tech Visualizer",
    category: "skills",
    x: 260,
    y: -140,
    radius: 46,
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    icon: "Zap",
    pulseRate: 1.8,
    description: "Dynamic force visualizer displaying system proficiencies, tech stack energy levels, and tool vectors."
  },
  {
    id: "experience-log",
    label: "EXPERIENCE LOG",
    sublabel: "Architecture & Telemetry",
    category: "experience",
    x: -220,
    y: 180,
    radius: 44,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    icon: "Activity",
    pulseRate: 1.4,
    description: "Timeline stream of system deployments, engineering milestones, and continuous optimization history."
  },
  {
    id: "contact-protocol",
    label: "COMM PROTOCOL",
    sublabel: "Transmission Uplink",
    category: "contact",
    x: 220,
    y: 180,
    radius: 44,
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    icon: "Radio",
    pulseRate: 2.2,
    description: "Secure encrypted communications interface for collaboration, inquiries, and direct transmissions."
  }
];

export const mindEdges = [
  { from: "system-core", to: "projects-portal", flowSpeed: 1.2, label: "DATA_FEED" },
  { from: "system-core", to: "skills-matrix", flowSpeed: 1.5, label: "POWER_BUS" },
  { from: "system-core", to: "experience-log", flowSpeed: 0.9, label: "TELEMETRY" },
  { from: "system-core", to: "contact-protocol", flowSpeed: 1.1, label: "UPLINK" },
  { from: "projects-portal", to: "skills-matrix", flowSpeed: 0.8, label: "STACK_LINK" },
  { from: "experience-log", to: "projects-portal", flowSpeed: 0.7, label: "HISTORY" },
  { from: "skills-matrix", to: "contact-protocol", flowSpeed: 1.0, label: "SYNAPSE" }
];

export const developerProfile = {
  name: "Maaj",
  role: "Full-Stack System Architect & AI Engineer",
  designation: "TOP 1% CRAFTSMAN // EXPERIMENTAL UI & PLATFORMS",
  status: "SYSTEM_ONLINE // READY FOR UPLINK",
  location: "Global Remote / Earth",
  bio: "Specializing in event-driven full-stack architectures, real-time AI integrations, high-performance UI canvases, and resilient backend pipelines.",
  stats: [
    { label: "Core Architecture", value: "React / Node / Python" },
    { label: "AI Integration", value: "LLM Pipelines / NLP" },
    { label: "Performance standard", value: "60 FPS Canvas UI" },
    { label: "Systems Built", value: "15+ High Impact" }
  ],
  principles: [
    "Motion as identity, not decoration.",
    "Zero unnecessary abstraction; maximum execution speed.",
    "Form and function in high-frequency visual synergy.",
    "Resilient backend design with instant real-time telemetry."
  ]
};

export const skillCategories = [
  {
    name: "Frontend & Canvas",
    energy: 96,
    color: "#00f0ff",
    skills: [
      { name: "React / Next.js", level: 98, tag: "Primary Framework" },
      { name: "JavaScript / TypeScript", level: 95, tag: "Core Logic" },
      { name: "TailwindCSS & CSS Houdini", level: 96, tag: "Styling & Tokens" },
      { name: "Framer Motion & GSAP", level: 92, tag: "Physics Motion" },
      { name: "HTML5 Canvas / Three.js", level: 88, tag: "2D/3D Rendering" }
    ]
  },
  {
    name: "Backend & Systems",
    energy: 92,
    color: "#a855f7",
    skills: [
      { name: "Node.js / Express", level: 94, tag: "Async Runtime" },
      { name: "Python / FastAPI", level: 90, tag: "API & Data" },
      { name: "MongoDB / PostgreSQL", level: 88, tag: "Databases & Indexing" },
      { name: "WebSockets & Socket.IO", level: 92, tag: "Real-time Telemetry" },
      { name: "REST & GraphQL", level: 90, tag: "Protocol Design" }
    ]
  },
  {
    name: "AI & Data Engineering",
    energy: 89,
    color: "#10b981",
    skills: [
      { name: "OpenAI / Gemini APIs", level: 94, tag: "LLM Orchestration" },
      { name: "NLP Transformers", level: 85, tag: "Document Parsing" },
      { name: "Scikit-Learn / ML Models", level: 82, tag: "Predictive Analytics" },
      { name: "Prompt Architecture", level: 96, tag: "Context Optimization" }
    ]
  },
  {
    name: "DevOps & Tools",
    energy: 87,
    color: "#f59e0b",
    skills: [
      { name: "Git / GitHub Actions", level: 94, tag: "Version & CI/CD" },
      { name: "Vercel / Cloud Deployment", level: 92, tag: "Serverless Deploy" },
      { name: "Vite / Webpack", level: 90, tag: "Build Tooling" },
      { name: "Linux & Shell Scripting", level: 86, tag: "OS & Terminal" }
    ]
  }
];

export const experienceData = [
  {
    period: "DEC 2025 - JUL 2026",
    role: "Full Stack Developer (Internship)",
    company: "Vulnuris Security Solutions — Remote",
    color: "#00f0ff",
    stack: ["React.js", "TypeScript", "Node.js", "MongoDB", "AWS", "Express.js"],
    achievements: [
      "Built 'SignTrace', an advanced digital signature platform surpassing traditional solutions with facial recognition, camera snapshots, and dedicated user certificates.",
      "Designed Fast and Manual signing modes with secure document verification workflow, real-time face matching, and liveness detection."
    ]
  },
  {
    period: "NOV 2025 - JAN 2026",
    role: "Full Stack Developer (Internship)",
    company: "Tregadevs — Remote",
    color: "#a855f7",
    stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "TypeScript"],
    achievements: [
      "Full-stack SDE intern building a role-based education management platform with secure authentication, teacher attendance workflows, and scalable APIs.",
      "Architected database schemas and API endpoints leveraging Next.js, Node.js, Prisma, and PostgreSQL."
    ]
  },
  {
    period: "APR 2025 - JUL 2025",
    role: "Full Stack Developer (Internship)",
    company: "Shoro AI Lab — Remote",
    color: "#10b981",
    stack: ["Next.js", "GraphQL", "RAG", "MongoDB"],
    achievements: [
      "Developed 'Shoro AI', a US driving education platform featuring interactive MCQs, flashcards, state-wise handbooks, and AI chatbots.",
      "Implemented a RAG-based (Retrieval-Augmented Generation) AI system for personalized driving test preparation and real-time query resolution."
    ]
  },
  {
    period: "JAN 2025 - MAR 2025",
    role: "Frontend Developer (Internship)",
    company: "BlueStock Fintech — Remote",
    color: "#f59e0b",
    stack: ["React.js", "JavaScript", "TailwindCSS", "REST APIs"],
    achievements: [
      "Developed the IPO dashboard and implemented frontend authentication features including user sign-in and sign-up using React.js.",
      "Worked at a stock market-focused fintech company offering real-time insights and dashboards for IPOs and investment opportunities."
    ]
  }
];

export const thinkingStreamThoughts = [
  "INIT_SYSTEM // Calibrating canvas viewport matrix...",
  "PARSING_NODE // Narratia live state verified on Vercel node [narratia-wheat.vercel.app]...",
  "LEGAL_TECH // Clause Lens NLP vector pipeline standing by on GitHub [clause-lens]...",
  "GEO_SPATIAL // MechHelp socket cluster maintaining 99.9% heartbeat...",
  "FRAME_RATE // Rendering neural graph at target 60 FPS...",
  "MEMORY_HEAP // Garbage collection clean, zero heap fragmentation...",
  "PROMPT_SYNAPSE // Context window compression algorithm optimized...",
  "AUDIO_SYNTH // Web Audio frequency oscillators calibrated to 440Hz...",
  "USER_NEURAL_UPLINK // Active mouse vector locked to canvas quadrant..."
];
