export const projectsData = [
  {
    id: "narratia",
    title: "Narratia",
    tagline: "Interactive Narrative & AI Storytelling Platform",
    category: "AI & Interactive Media",
    liveUrl: "https://narratia-wheat.vercel.app/",
    githubUrl: "https://github.com/iammaaj10",
    featured: true,
    nodeColor: "#00f0ff", // cyan energy
    metrics: {
      latency: "< 120ms",
      architecture: "Event-Driven AI Engine",
      rating: "99.8% Uptime"
    },
    tech: ["React", "AI / LLM API", "TailwindCSS", "Framer Motion", "Vite", "Node.js"],
    summary: "A cutting-edge interactive narrative engine that transforms user choices into dynamically generated immersive stories with adaptive visuals, branch logic, and rich sensory UI.",
    architecture: [
      "Real-time streaming generation pipeline utilizing prompt engineering and dynamic context compression.",
      "Reactive branch-state graph that maintains character memory, world consistency, and narrative tension.",
      "Custom procedural canvas visualizer matching story mood with ambient particle themes."
    ],
    highlights: [
      "Dynamic prompt state graphs preventing narrative loops.",
      "Sub-150ms UI response time for interactive story path branches.",
      "Ultra-fluid dark mode glassmorphism UI built for long-form immersive reading."
    ]
  },
  {
    id: "clause-lens",
    title: "Clause Lens",
    tagline: "AI-Powered Legal & Document Clause Analyzer",
    category: "AI & Legal Tech",
    liveUrl: null,
    githubUrl: "https://github.com/iammaaj10/clause-lens",
    featured: true,
    nodeColor: "#a855f7", // violet pulse
    metrics: {
      accuracy: "96.4%",
      parseSpeed: "3,000 wpm",
      privacy: "Zero-Data Retention"
    },
    tech: ["React", "Python / FastAPI", "NLP Transformers", "TailwindCSS", "Vite"],
    summary: "An intelligent document security and contract analysis tool designed to scan, extract, highlight high-risk clauses, and summarize complex legal jargon into actionable developer/business insights.",
    architecture: [
      "Hybrid client-side OCR and serverless NLP pipeline for instant document parsing.",
      "Risk assessment scoring algorithm classifying ambiguous liability, hidden auto-renewals, and IP transfer terms.",
      "Visual clause inspector with side-by-side comparative diffing and plain-English translation layer."
    ],
    highlights: [
      "Automated risk badge detection for contract ambiguity.",
      "Interactive visual clause breakdown with severity heatmap overlays.",
      "Privacy-first architecture ensuring sensitive legal documents are processed securely."
    ]
  },
  {
    id: "mechhelp",
    title: "MechHelp",
    tagline: "Real-Time Emergency Location & Mechanic Finder",
    category: "Full Stack & Geo-Spatial",
    liveUrl: "https://mechhelp.vercel.app/",
    githubUrl: "https://github.com/iammaaj10",
    featured: true,
    nodeColor: "#10b981", // emerald matrix
    metrics: {
      dispatchTime: "< 45 secs",
      geoAccuracy: "High-Precision",
      sockets: "Real-time bi-directional"
    },
    tech: ["React", "Node.js", "MongoDB", "Socket.IO", "Leaflet GIS", "Express"],
    summary: "Full-stack location-based emergency mechanic dispatch system enabling stranded vehicle owners to connect with nearby verified mechanics in real time.",
    architecture: [
      "WebSocket-driven real-time geo-tracking pipeline broadcasting user coordinates to regional dispatchers.",
      "MongoDB geospatial indexing (`$near` queries) optimized for instant proximity matching.",
      "Interactive Leaflet radar map with live route calculations and ETA telemetry."
    ],
    highlights: [
      "Instant WebSocket handshakes between drivers and mobile mechanics.",
      "Live GPS movement polling with low battery overhead.",
      "Complete status workflow from service request to job completion feedback."
    ]
  },
  {
    id: "newsblog",
    title: "NewsBlog AI",
    tagline: "Real-Time News & AI-Augmented Publishing System",
    category: "Content Engine",
    liveUrl: null,
    githubUrl: "https://github.com/iammaaj10/NewsBlog",
    featured: false,
    nodeColor: "#f59e0b", // amber energy
    metrics: {
      generation: "Instant Summary",
      feeds: "Multi-Source Ingestion"
    },
    tech: ["React", "Socket.IO", "OpenAI / Gemini", "TailwindCSS", "Node.js"],
    summary: "High-throughput news aggregator and content portal featuring instant AI article synthesis, topic clustering, and live user reaction feeds.",
    architecture: [
      "Automated news feed ingestion engine feeding into LLM summarization streams.",
      "Real-time websocket pulse broadcasting hot breaking headlines and live comment threads."
    ],
    highlights: [
      "Automated TL;DR bullet point extraction for fast consumption.",
      "Custom reader controls with audio stream synthesis readiness."
    ]
  },
  {
    id: "spotify-clone",
    title: "Aura Sound (Spotify Core)",
    tagline: "Audio Engine & Immersive Music Interface",
    category: "Audio / Frontend Engineering",
    liveUrl: null,
    githubUrl: "https://github.com/iammaaj10/Spotify_Clone_react",
    featured: false,
    nodeColor: "#06b6d4",
    metrics: {
      fps: "60 FPS Animations",
      audioBuffer: "Low-Latency"
    },
    tech: ["React", "Web Audio API", "TailwindCSS", "Framer Motion"],
    summary: "Ultra-responsive music player application recreating modern streaming UX with custom equalizer visualizers, playback queues, and dark glassmorphic styling.",
    architecture: [
      "Web Audio API frequency analyzer powering real-time canvas spectrum visualization.",
      "Persistent global state queue managing playback, volume normalization, and seamless track crossfades."
    ],
    highlights: [
      "Custom audio spectrum canvas visualizer.",
      "Zero-lag UI response on track scrubbing and volume modulation."
    ]
  },
  {
    id: "ai-ui",
    title: "AI_UI Cyberpunk Experiments",
    tagline: "Futuristic Design System & Motion Graphics",
    category: "Experimental Design",
    liveUrl: null,
    githubUrl: "https://github.com/iammaaj10/AI_UI",
    featured: false,
    nodeColor: "#ec4899", // pink neon
    metrics: {
      components: "25+ Cyber Modules",
      performance: "GPU Accelerated"
    },
    tech: ["React", "Framer Motion", "Canvas", "CSS Houdini"],
    summary: "A laboratory of experimental sci-fi UI components, kinetic typography, neon glass shaders, and high-frequency motion design patterns.",
    architecture: [
      "GPU-accelerated CSS animations combined with Framer Motion layout morphing.",
      "Modular design tokens powering sci-fi state displays and bio-metric charts."
    ],
    highlights: [
      "Holographic panel effect algorithms.",
      "Micro-interaction motion suite for high-tech dashboards."
    ]
  },
  {
    id: "gold-price-prediction",
    title: "Aurum Oracle",
    tagline: "Machine Learning Gold & Commodity Price Predictor",
    category: "Machine Learning / Data Science",
    liveUrl: null,
    githubUrl: "https://github.com/iammaaj10/GoldPricePrediction",
    featured: false,
    nodeColor: "#eab308",
    metrics: {
      model: "Random Forest & XGBoost",
      r2Score: "0.941"
    },
    tech: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Flask"],
    summary: "Predictive analytics pipeline leveraging historical economic indicators, inflation indexes, and currency exchange telemetry to forecast gold market trends.",
    architecture: [
      "Data preprocessing pipeline cleaning historical financial series and engineering lag features.",
      "Ensemble machine learning model trained on multi-decade commodity price datasets."
    ],
    highlights: [
      "Feature importance evaluation highlighting macroeconomic price drivers.",
      "Interactive trend forecast curves with confidence interval bands."
    ]
  }
];
