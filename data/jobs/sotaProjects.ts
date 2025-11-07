export interface SOTAProject {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  example: string;
}

export const sotaProjects: SOTAProject[] = [
  {
    id: "ai-chatbot",
    name: "AI-Powered Chat Application",
    category: "AI/ML",
    description:
      "Real-time chat app with AI assistance using OpenAI API, WebSocket for live messaging, user authentication, and message history.",
    technologies: ["React", "Node.js", "WebSocket", "OpenAI API", "PostgreSQL"],
    example:
      "Built a real-time chat interface with ChatGPT integration for customer support automation, featuring message search, conversation history, and typing indicators.",
  },
  {
    id: "collab-tool",
    name: "Real-time Collaboration Platform",
    category: "Web App",
    description:
      "Multi-user collaboration tool similar to Figma/Notion with live cursors, real-time editing, version control, and permission management.",
    technologies: ["React", "Yjs", "WebSocket", "Firebase", "TypeScript"],
    example:
      "Developed a collaborative document editor with real-time sync, concurrent editing, conflict resolution, and user presence indicators.",
  },
  {
    id: "web3-dapp",
    name: "Web3 DApp (Blockchain Application)",
    category: "Blockchain",
    description:
      "Decentralized application with wallet integration, smart contract interaction, token swapping, and NFT management.",
    technologies: [
      "React",
      "Web3.js",
      "Ethereum",
      "MetaMask",
      "Hardhat",
    ],
    example:
      "Created a decentralized finance (DeFi) dashboard with real-time token pricing, liquidity pools, and smart contract integration.",
  },
  {
    id: "pwa-ecommerce",
    name: "Progressive Web App (E-Commerce)",
    category: "PWA",
    description:
      "Offline-capable e-commerce app with service workers, local caching, push notifications, and installable PWA features.",
    technologies: ["Next.js", "PWA", "Service Workers", "IndexedDB", "Stripe"],
    example:
      "Built a fully functional PWA shopping app that works offline, with push notifications for order updates and one-click checkout.",
  },
  {
    id: "video-platform",
    name: "Video Streaming Platform",
    category: "Media",
    description:
      "YouTube-like platform with video upload, transcoding, adaptive streaming, user subscriptions, and analytics dashboard.",
    technologies: ["Next.js", "FFmpeg", "HLS/DASH", "Redis", "Node.js"],
    example:
      "Developed a video streaming platform with automatic transcoding to multiple resolutions, CDN delivery, and viewer analytics.",
  },
  {
    id: "ml-dashboard",
    name: "Machine Learning Analytics Dashboard",
    category: "AI/ML",
    description:
      "Data visualization dashboard for ML models with real-time metrics, model performance tracking, and automated alerts.",
    technologies: ["React", "D3.js", "TensorFlow.js", "Python", "FastAPI"],
    example:
      "Created an ML model monitoring dashboard with real-time predictions, performance metrics, data drift detection, and A/B testing capabilities.",
  },
  {
    id: "saas-platform",
    name: "SaaS Multi-tenant Platform",
    category: "Web App",
    description:
      "Scalable SaaS application with tenant isolation, role-based access control (RBAC), billing system, and API management.",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Auth0", "Docker"],
    example:
      "Built a project management SaaS with role-based teams, custom workflows, invoice generation, and Stripe subscription handling.",
  },
  {
    id: "ai-image-gen",
    name: "AI Image Generation Tool",
    category: "AI/ML",
    description:
      "Web app for AI image generation using Stable Diffusion or DALL-E API with image editing, history, and sharing features.",
    technologies: ["React", "Stable Diffusion API", "Canvas API", "AWS S3"],
    example:
      "Developed an AI art generator with prompt engineering UI, image editing tools, history management, and social sharing capabilities.",
  },
  {
    id: "iot-dashboard",
    name: "IoT Device Management Dashboard",
    category: "IoT",
    description:
      "Real-time monitoring dashboard for IoT devices with live telemetry, alerts, remote control, and historical data visualization.",
    technologies: ["React", "MQTT", "Node.js", "InfluxDB", "Grafana"],
    example:
      "Created a smart home management dashboard with real-time device status, automation rules, energy consumption tracking, and alert notifications.",
  },
  {
    id: "voice-assistant",
    name: "Voice-Powered Assistant",
    category: "AI/ML",
    description:
      "Voice recognition and natural language processing app with speech-to-text, context awareness, and smart responses.",
    technologies: [
      "React",
      "Web Speech API",
      "Natural Language API",
      "Node.js",
    ],
    example:
      "Built a voice-controlled task manager with speech recognition, natural language understanding, and voice response system.",
  },
  {
    id: "3d-viewer",
    name: "3D Model Viewer & Editor",
    category: "3D/Graphics",
    description:
      "Interactive 3D model viewer with WebGL, model manipulation, texture mapping, and real-time rendering optimization.",
    technologies: ["React", "Three.js", "Babylon.js", "WebGL", "Blender"],
    example:
      "Developed an interactive 3D product configurator with real-time rendering, material customization, and AR preview.",
  },
  {
    id: "realtime-notifications",
    name: "Real-time Notification System",
    category: "Web App",
    description:
      "Scalable notification platform with WebSocket/Server-Sent Events, message queuing, delivery tracking, and multi-channel notifications.",
    technologies: ["Node.js", "Socket.io", "Redis", "Message Queue", "Kafka"],
    example:
      "Built a notification service handling millions of messages with email, SMS, and push notifications with delivery guarantees.",
  },
];
