export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  budget: string;
  skills: string[];
  timeRemaining: number; // in seconds (e.g., 5400 = 1.5 hours)
}

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Build E-commerce Platform",
    company: "TechStart Solutions",
    description: "Create a full-stack e-commerce website with React and Node.js. Requirements include product catalog, shopping cart, and payment integration.",
    budget: "$2000 - $3500",
    skills: ["React", "Node.js", "MongoDB", "Stripe"],
    timeRemaining: 5400, // 1.5 hours
  },
  {
    id: "job-2",
    title: "Portfolio Website Design",
    company: "Creative Agency Co.",
    description: "Design and develop a responsive portfolio website showcasing design work. Must be modern, fast, and mobile-friendly.",
    budget: "$800 - $1500",
    skills: ["React", "Tailwind CSS", "Responsive Design"],
    timeRemaining: 7200, // 2 hours
  },
  {
    id: "job-3",
    title: "API Development for SaaS",
    company: "CloudTech Inc.",
    description: "Build RESTful APIs for a SaaS application. Include authentication, user management, and data endpoints.",
    budget: "$1500 - $2500",
    skills: ["Node.js", "Express", "PostgreSQL", "REST API"],
    timeRemaining: 10800, // 3 hours
  },
  {
    id: "job-4",
    title: "React Dashboard Component",
    company: "DataViz Systems",
    description: "Create interactive dashboard components for data visualization. Include charts, graphs, and real-time data updates.",
    budget: "$1000 - $1800",
    skills: ["React", "TypeScript", "Chart.js", "D3.js"],
    timeRemaining: 3600, // 1 hour
  },
  {
    id: "job-5",
    title: "Mobile App UI Implementation",
    company: "AppFlow Studios",
    description: "Convert design mockups to responsive React components. Focus on performance and accessibility.",
    budget: "$1200 - $2000",
    skills: ["React", "CSS", "Figma", "Responsive Design"],
    timeRemaining: 4320, // 1.2 hours
  },
  {
    id: "job-6",
    title: "Backend Optimization Project",
    company: "PerformanceFirst",
    description: "Optimize existing Node.js backend for scalability. Include caching, database optimization, and load balancing.",
    budget: "$2000 - $3000",
    skills: ["Node.js", "Redis", "PostgreSQL", "Docker"],
    timeRemaining: 8100, // 2.25 hours
  },
  {
    id: "job-7",
    title: "Next.js Full-Stack Development",
    company: "ModernWeb Co.",
    description: "Build a full-stack application using Next.js 16 with authentication, database, and API routes.",
    budget: "$1800 - $2800",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Authentication"],
    timeRemaining: 6300, // 1.75 hours
  },
  {
    id: "job-8",
    title: "GraphQL Implementation",
    company: "DataFlow Systems",
    description: "Convert existing REST APIs to GraphQL. Setup Apollo Server and client-side queries.",
    budget: "$1400 - $2200",
    skills: ["GraphQL", "Apollo", "Node.js", "TypeScript"],
    timeRemaining: 7200, // 2 hours
  },
  {
    id: "job-9",
    title: "Landing Page Development",
    company: "MarketingPro Agency",
    description: "Create a high-converting landing page with animations, forms, and email integration.",
    budget: "$600 - $1200",
    skills: ["React", "Tailwind CSS", "Animations", "Forms"],
    timeRemaining: 2700, // 45 minutes
  },
  {
    id: "job-10",
    title: "Testing & QA Framework Setup",
    company: "QualityAssure Ltd.",
    description: "Setup Jest and React Testing Library for a React application. Create comprehensive test suites.",
    budget: "$1100 - $1900",
    skills: ["Jest", "React Testing", "TypeScript", "CI/CD"],
    timeRemaining: 5400, // 1.5 hours
  },
  {
    id: "job-11",
    title: "Form Builder Component",
    company: "FormTech Solutions",
    description: "Build a dynamic form builder component with validation, conditional fields, and submission handling.",
    budget: "$900 - $1600",
    skills: ["React", "Formik", "Validation", "State Management"],
    timeRemaining: 6300, // 1.75 hours
  },
  {
    id: "job-12",
    title: "Real-time Chat Application",
    company: "CommunicateApp",
    description: "Develop a real-time chat application using WebSocket. Include user authentication and message history.",
    budget: "$1600 - $2400",
    skills: ["React", "Node.js", "Socket.io", "WebSocket"],
    timeRemaining: 9000, // 2.5 hours
  },
];

export const getTimeString = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};
