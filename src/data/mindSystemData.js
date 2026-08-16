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
    description: "Central processing core containing architectural philosophy, background specs, contact telemetry, and developer blueprint."
  },
  {
    id: "projects-portal",
    label: "PROJECT PORTALS",
    sublabel: "Case-Study Systems",
    category: "projects",
    x: -270,
    y: -140,
    radius: 46,
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    icon: "FolderGit2",
    pulseRate: 2.0,
    description: "Interactive neural showcase of Narratia (AI Storyteller), ClauseLens (Local WASM Scanner), MechHelp (Geo Dispatch), and production web systems."
  },
  {
    id: "skills-matrix",
    label: "SKILL MATRIX",
    sublabel: "Energy & Tech Visualizer",
    category: "skills",
    x: 270,
    y: -140,
    radius: 46,
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    icon: "Zap",
    pulseRate: 1.8,
    description: "Dynamic force visualizer displaying proficiency in Java, Python, JS, MERN Stack, Next.js, Docker, databases, and core CS fundamentals."
  },
  {
    id: "experience-log",
    label: "EXPERIENCE LOG",
    sublabel: "Internships & Telemetry",
    category: "experience",
    x: -240,
    y: 180,
    radius: 44,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    icon: "Activity",
    pulseRate: 1.4,
    description: "Timeline stream of SDE internships at Vulnuris Security Solutions, Tregadevs, Shoro AI Lab, and BlueStock Fintech."
  },
  {
    id: "achievements-node",
    label: "ACHIEVEMENTS",
    sublabel: "Hackathons & Certs",
    category: "achievements",
    x: 0,
    y: -230,
    radius: 44,
    color: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.4)",
    icon: "Trophy",
    pulseRate: 2.1,
    description: "1st Place SIH Hackathon 2024 Winner, 350+ LeetCode DSA Solved badge, and AWS Certified Cloud Essentials."
  },
  {
    id: "academic-matrix",
    label: "ACADEMIC MATRIX",
    sublabel: "Education Specs",
    category: "academic",
    x: 0,
    y: 230,
    radius: 44,
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    icon: "GraduationCap",
    pulseRate: 1.6,
    description: "B.Tech CSE (8.46 CGPA), Diploma in Computer Engineering (89.09%), and High School SSC (86.60%)."
  },
  {
    id: "contact-protocol",
    label: "COMM PROTOCOL",
    sublabel: "Transmission Uplink",
    category: "contact",
    x: 240,
    y: 180,
    radius: 44,
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    icon: "Radio",
    pulseRate: 2.2,
    description: "Encrypted direct communication uplink for hiring inquiries, phone (+91 9130304068), email, and social networks."
  }
];

export const mindEdges = [
  { from: "system-core", to: "projects-portal", flowSpeed: 1.2, label: "DATA_FEED" },
  { from: "system-core", to: "skills-matrix", flowSpeed: 1.5, label: "POWER_BUS" },
  { from: "system-core", to: "experience-log", flowSpeed: 0.9, label: "TELEMETRY" },
  { from: "system-core", to: "contact-protocol", flowSpeed: 1.1, label: "UPLINK" },
  { from: "system-core", to: "achievements-node", flowSpeed: 1.4, label: "HONORS" },
  { from: "system-core", to: "academic-matrix", flowSpeed: 1.0, label: "ACADEMICS" },
  { from: "projects-portal", to: "skills-matrix", flowSpeed: 0.8, label: "STACK_LINK" },
  { from: "experience-log", to: "projects-portal", flowSpeed: 0.7, label: "HISTORY" },
  { from: "skills-matrix", to: "contact-protocol", flowSpeed: 1.0, label: "SYNAPSE" },
  { from: "achievements-node", to: "skills-matrix", flowSpeed: 1.1, label: "DSA_MASTERY" }
];

export const developerProfile = {
  name: "Maaj Bhadagaonkar",
  role: "Full-Stack Software Engineer & AI Systems Craftsman",
  designation: "ENTRY-LEVEL SDE // PRODUCT-GRADE ENGINEER",
  status: "OPEN FOR ENTRY-LEVEL SDE ROLES // READY FOR UPLINK",
  location: "Pune, Maharashtra, India",
  phone: "+91 9130304068",
  email: "maajb1122@gmail.com",
  linkedin: "https://linkedin.com/in/maaj-bhadgaonkar/",
  github: "https://github.com/iammaaj10",
  portfolio: "https://maaj-portfolio.vercel.app",
  bio: "Full-stack developer who ships production-grade products end-to-end — from a real-time mechanic dispatch network to an AI storytelling suite and a privacy-first local WASM browser extension. Experienced across MERN, Next.js, Socket.IO, and AI integrations with paid internships, security freelance work, and a hackathon win.",
  stats: [
    { label: "B.Tech CSE Grade", value: "8.46 CGPA" },
    { label: "LeetCode Solved", value: "350+ DSA Problems" },
    { label: "Hackathon Winner", value: "1st Place SIH 2024" },
    { label: "AWS Certified", value: "Cloud Essentials (2025)" }
  ],
  principles: [
    "Ship production-grade code end-to-end with sub-50ms performance targets.",
    "Air-gapped privacy-first architectures with zero unnecessary server dependency.",
    "Motion as identity; maximum UI clarity and execution speed.",
    "Continuous mastery of DSA, OOP, Linux, and Cloud scalable backend design."
  ]
};

export const skillCategories = [
  {
    name: "Languages & Core CS",
    energy: 96,
    color: "#00f0ff",
    skills: [
      { name: "Java", level: 92, tag: "OOP & DSA" },
      { name: "JavaScript / TypeScript", level: 96, tag: "Core Stack" },
      { name: "Python", level: 90, tag: "AI & Data Scripts" },
      { name: "SQL", level: 88, tag: "Relational Queries" },
      { name: "Data Structures & Algorithms", level: 94, tag: "350+ LeetCode Solved" },
      { name: "OOP & Linux Fundamentals", level: 92, tag: "System Design" }
    ]
  },
  {
    name: "Frontend Architecture",
    energy: 95,
    color: "#a855f7",
    skills: [
      { name: "React.js / Next.js", level: 98, tag: "Primary Framework" },
      { name: "TailwindCSS & HTML/CSS", level: 96, tag: "UI Tokens & Styling" },
      { name: "Framer Motion & Canvas", level: 92, tag: "Physics & Motion" },
      { name: "WebAssembly (WASM)", level: 86, tag: "Transformers.js In-Browser" }
    ]
  },
  {
    name: "Backend & Cloud",
    energy: 93,
    color: "#10b981",
    skills: [
      { name: "Node.js / Express.js", level: 95, tag: "Async Runtime" },
      { name: "REST APIs & GraphQL", level: 92, tag: "API Orchestration" },
      { name: "Socket.IO & WebSockets", level: 94, tag: "Real-time Telemetry" },
      { name: "AWS Cloud Essentials", level: 88, tag: "Certified 2025" },
      { name: "Docker & Linux CLI", level: 86, tag: "Containers & OS" }
    ]
  },
  {
    name: "Databases & Tools",
    energy: 91,
    color: "#f59e0b",
    skills: [
      { name: "MongoDB", level: 94, tag: "NoSQL & Geospatial" },
      { name: "PostgreSQL & Supabase", level: 92, tag: "Relational Storage" },
      { name: "Prisma ORM", level: 90, tag: "Type-Safe DB Client" },
      { name: "Git / GitHub & Postman", level: 95, tag: "CI/CD & API Testing" }
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
      "Designed Fast and Manual signing modes with a secure document verification workflow.",
      "Implemented real-time face matching and liveness detection for automated identity verification."
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
      "Developed 'Shoro AI', a US driving education platform featuring interactive MCQs, flashcards, and state-wise handbooks.",
      "Built AI chatbots and a RAG-based (Retrieval-Augmented Generation) system for personalized driving test preparation and real-time query resolution."
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

export const academicData = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "DKTE Society’s Textile and Engineering Institute",
    period: "2023 – 2026",
    grade: "8.46 CGPA",
    color: "#00f0ff",
    details: "Core focus on Data Structures & Algorithms, Object Oriented Programming, Database Management Systems, Linux & Cloud Infrastructure."
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Sant Gajanan Maharaj Rural Polytechnic",
    period: "2020 – 2023",
    grade: "89.09%",
    color: "#a855f7",
    details: "Foundation in Computer Networks, Software Engineering principles, Java, Web Development, and Systems Programming."
  },
  {
    degree: "10th Grade (SSC)",
    institution: "Rosary English High School",
    period: "2019 – 2020",
    grade: "86.60%",
    color: "#10b981",
    details: "Strong fundamentals in Mathematics, Science, and Analytical Logic."
  }
];

export const achievementsData = [
  {
    title: "1st Place Winner",
    event: "Internal Smart India Hackathon (SIH) 2024",
    year: "2024",
    category: "Hackathon Victory",
    color: "#eab308",
    description: "Secured Top 1st Place for building an innovative software solution under strict hackathon deadlines."
  },
  {
    title: "350+ DSA Problems Solved",
    event: "LeetCode Data Structures & Algorithms Mastery",
    year: "Continuous",
    category: "Algorithmic Excellence",
    color: "#00f0ff",
    description: "Demonstrated strong problem-solving proficiency across Trees, Graphs, Dynamic Programming, Arrays, and String manipulation."
  },
  {
    title: "AWS Certified: Cloud Technical Essentials",
    event: "Amazon Web Services (AWS)",
    year: "2025",
    category: "Cloud Architecture Certification",
    color: "#a855f7",
    description: "Certified in core AWS cloud services, serverless computing, IAM security, and resilient cloud infrastructure design."
  }
];

export const thinkingStreamThoughts = [
  "INIT_SYSTEM // Loading Maaj Bhadagaonkar's developer mind matrix...",
  "VERIFY_CREDENTIALS // B.Tech CSE CGPA 8.46 | 350+ LeetCode Solved | SIH 2024 1st Place",
  "NARRATIA_STATE // Gemini 2.0 AI storytelling engine & emotion heatmaps verified",
  "CLAUSELENS_STATE // Local WASM Transformers.js scanning agreements <50ms air-gapped",
  "MECHHELP_STATE // 50km geo-dispatch network active with Socket.IO",
  "VULNURIS_STATE // SignTrace digital signatures & liveness detection active",
  "STATUS // Seeking Entry-Level SDE Role | Pune, MH | Phone: +91 9130304068"
];
