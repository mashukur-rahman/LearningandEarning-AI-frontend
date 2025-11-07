import { ExpertiseLevel } from "./mockCandidates";

export type { ExpertiseLevel };

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requirements: string;
  expertiseLevel: ExpertiseLevel;
  budget: string;
  createdAt: Date;
  createdBy: string; // "user" for created jobs, "dummy" for example jobs
  shortlistedCandidateIds: string[]; // Array of candidate IDs
}

// Helper function to get budget based on expertise level
export const getBudgetForExpertise = (
  expertise: ExpertiseLevel
): string => {
  switch (expertise) {
    case "beginner":
      return "৳25000 - ৳70000";
    case "intermediate":
      return "৳70000 - ৳180000";
    case "expert":
      return "৳180000 - ৳450000+";
    default:
      return "৳40000 - ৳130000";
  }
};

export const mockJobPostings: JobPosting[] = [
  {
    id: "jp1",
    title: "E-Commerce Platform Development",
    description:
      "Build a full-stack e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard",
    requirements:
      "React, Node.js, MongoDB, Stripe API, Responsive design, User authentication",
    expertiseLevel: "expert",
    budget: "৳180000 - ৳450000+",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdBy: "dummy",
    shortlistedCandidateIds: ["c1", "c2", "c6", "c9", "c11", "c14", "c16", "c19", "c22", "c25"],
  },
  {
    id: "jp2",
    title: "React Dashboard Component Library",
    description:
      "Create a reusable component library for data visualization dashboards with charts, graphs, and real-time updates",
    requirements:
      "React, TypeScript, Chart.js, Storybook, Testing, Documentation",
    expertiseLevel: "intermediate",
    budget: "৳70000 - ৳180000",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdBy: "dummy",
    shortlistedCandidateIds: ["c3", "c4", "c7", "c8", "c12", "c15", "c17", "c20", "c23", "c24", "c27", "c29"],
  },
  {
    id: "jp3",
    title: "Mobile App UI Implementation",
    description:
      "Convert Figma designs to responsive React components for a mobile-first web application with smooth animations",
    requirements:
      "React, CSS/Tailwind, Figma understanding, Responsive design, Animation libraries",
    expertiseLevel: "intermediate",
    budget: "৳70000 - ৳180000",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdBy: "dummy",
    shortlistedCandidateIds: ["c4", "c8", "c12", "c24"],
  },
  {
    id: "jp4",
    title: "API Development for SaaS Platform",
    description:
      "Build RESTful and GraphQL APIs for a SaaS platform with authentication, user management, and data endpoints",
    requirements:
      "Node.js, Express, PostgreSQL, GraphQL, JWT Auth, Testing, API documentation",
    expertiseLevel: "expert",
    budget: "৳180000 - ৳450000+",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdBy: "dummy",
    shortlistedCandidateIds: ["c2", "c6", "c9", "c11", "c14", "c16", "c19", "c22"],
  },
  {
    id: "jp5",
    title: "Landing Page Development",
    description:
      "Create a high-converting landing page with animations, forms, email integration, and SEO optimization",
    requirements:
      "React/Next.js, Tailwind CSS, Animations, Forms, Email service integration, SEO",
    expertiseLevel: "beginner",
    budget: "৳25000 - ৳70000",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    createdBy: "dummy",
    shortlistedCandidateIds: ["c5", "c10", "c13", "c18"],
  },
  {
    id: "jp6",
    title: "Backend Optimization and Scaling",
    description:
      "Optimize existing Node.js backend for performance and scalability, implement caching, database optimization, and load balancing",
    requirements:
      "Node.js, Redis, PostgreSQL, Docker, Kubernetes, Performance monitoring, Load balancing",
    expertiseLevel: "expert",
    budget: "৳180000 - ৳450000+",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    createdBy: "dummy",
    shortlistedCandidateIds: ["c1", "c2", "c6", "c9", "c11", "c19", "c22", "c25", "c28"],
  },
  {
    id: "jp7",
    title: "Real-Time Chat Application",
    description:
      "Develop a real-time chat application with WebSocket support, user authentication, message history, and file sharing",
    requirements:
      "React, Node.js, Socket.io, MongoDB, User authentication, File handling, Real-time updates",
    expertiseLevel: "intermediate",
    budget: "৳70000 - ৳180000",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    createdBy: "dummy",
    shortlistedCandidateIds: ["c3", "c7", "c15", "c17", "c20", "c23"],
  },
  {
    id: "jp8",
    title: "Progressive Web App Setup",
    description:
      "Convert existing web app to PWA with service workers, offline capability, push notifications, and app manifest",
    requirements:
      "React, Service Workers, PWA setup, Caching strategies, Testing, Manifest configuration",
    expertiseLevel: "intermediate",
    budget: "৳70000 - ৳180000",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    createdBy: "dummy",
    shortlistedCandidateIds: ["c4", "c8", "c12", "c15", "c24", "c27"],
  },
];
