export const projectsData = [
  {
    id: "narratia",
    title: "Narratia",
    tagline: "Collaborative AI Storytelling & Screenplay Suite",
    category: "AI & Collaborative Engineering",
    liveUrl: "https://narratia-wheat.vercel.app/",
    githubUrl: "https://github.com/iammaaj10",
    featured: true,
    nodeColor: "#00f0ff", // cyan energy
    metrics: {
      productivity: "+40% Team Output",
      aiEngine: "Gemini 2.0 LLM",
      features: "Multi-User & Heatmaps"
    },
    tech: ["Next.js", "Supabase", "TipTap", "PostgreSQL", "Recharts", "TailwindCSS", "TypeScript", "jsPDF"],
    summary: "A collaborative writing and AI storytelling suite featuring multi-user real-time editing, role-based access control (RBAC), auto-save, version control, and emotion heatmap analytics.",
    architecture: [
      "Real-time collaborative editing matrix utilizing TipTap rich text engine synchronized over Supabase real-time channels.",
      "Integrated Gemini 2.0 LLM for AI-assisted writing, automated screenplay format conversion, and emotion heatmap analysis.",
      "Custom analytics dashboard built with Recharts driving a 40% improvement in team writing productivity with one-click PDF export via jsPDF."
    ],
    highlights: [
      "40% verified boost in team writing productivity during collaborative test sessions.",
      "Gemini 2.0 automated screenplay conversion with emotion heatmaps and version control.",
      "Secure RBAC permissions and instant auto-save backup pipelines."
    ]
  },
  {
    id: "clause-lens",
    title: "ClauseLens",
    tagline: "100% Local Air-Gapped Privacy-First Clause Scanner",
    category: "AI & Legal Security",
    liveUrl: null,
    githubUrl: "https://github.com/iammaaj10/clause-lens",
    featured: true,
    nodeColor: "#a855f7", // violet pulse
    metrics: {
      scanLatency: "< 50ms Air-Gapped",
      privacy: "Zero External APIs",
      safetyScore: "0-100 Normalized"
    },
    tech: ["React 19", "Vite", "CRXJS", "TailwindCSS", "WebAssembly", "Transformers.js", "Chrome MV3"],
    summary: "A 100% local, air-gapped Chrome Extension (Manifest V3) that scans and explains complex legal agreements in under 50ms with zero external API calls or data leaks.",
    architecture: [
      "Two-stage hybrid processing pipeline combining regex/lexicon engine with local WASM semantic embeddings (all-MiniLM-L6-v2).",
      "Deterministic explainer layer rendering through an isolated Shadow DOM tooltip system to prevent AI hallucinations and host-page CSS conflicts.",
      "Normalized 0-100 page safety scoring algorithm with one-click full security report export."
    ],
    highlights: [
      "Sub-50ms agreement scanning with 100% local air-gapped WASM Transformers.js execution.",
      "Zero host-page CSS pollution using isolated Shadow DOM tooltip injection.",
      "Instant risk score calculation preventing sneaky auto-renewals and data privacy waivers."
    ]
  },
  {
    id: "mechhelp",
    title: "MechHelp",
    tagline: "Real-Time Geo-Dispatch Emergency Mechanic Platform",
    category: "Full Stack & Geo-Spatial",
    liveUrl: "https://mechhelp.vercel.app/",
    githubUrl: "https://github.com/iammaaj10",
    featured: true,
    nodeColor: "#10b981", // emerald matrix
    metrics: {
      radius: "50km Search Range",
      pilotTesting: "25+ Mechanics / 50+ Users",
      sockets: "Real-Time Geo Chat"
    },
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "React Leaflet", "JWT", "Socket.IO"],
    summary: "Real-time emergency mechanic dispatch system with live geolocation tracking within a 50km search radius, enabling stranded drivers to connect with verified mechanics instantly.",
    architecture: [
      "WebSocket-driven real-time geo-tracking pipeline broadcasting user coordinates to regional mechanics within 50km.",
      "JWT authentication, live socket chat room, and mechanic rating & review system.",
      "Pilot tested with 25+ mechanics and 50+ active users during initial deployment, significantly reducing roadside emergency response time."
    ],
    highlights: [
      "Substantially cut emergency roadside assistance response times during pilot deployment.",
      "Live interactive Leaflet GIS map with 50km radius dispatcher discovery.",
      "Full socket chat stream between mechanics and drivers with job status workflows."
    ]
  },
  {
    id: "newsblog",
    title: "NewsBlog AI",
    tagline: "Real-Time News & AI Content Publishing System",
    category: "Content Engine",
    liveUrl: null,
    githubUrl: "https://github.com/iammaaj10/NewsBlog",
    featured: false,
    nodeColor: "#f59e0b", // amber energy
    metrics: {
      synthesis: "Instant AI Bullet",
      feeds: "Multi-Source Stream"
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
      fps: "60 FPS Canvas Equalizer",
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
  }
];
