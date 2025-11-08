// Mock Freelancer Jobs Data
// This includes both active and past jobs for freelancers

export interface FreelancerJob {
  id: string;
  title: string;
  client: string;
  clientAvatar: string;
  deadline: string;
  status: "in_progress" | "completed" | "pending";
  progress: number;
  budget: number;
  currencyCode: string;
  description: string;
  skills: string[];
  hourlyRate?: number;
  daysLeft?: number;
  rating?: number;
  completedDate?: string;
  feedback?: string;
}

// Active Jobs (In Progress)
export const mockActiveFreelancerJobs: FreelancerJob[] = [
  {
    id: "fj-1",
    title: "React Dashboard Development",
    client: "Tech Startup Inc",
    clientAvatar: "TS",
    deadline: "2024-12-20",
    status: "in_progress",
    progress: 65,
    budget: 150000,
    currencyCode: "BDT",
    description:
      "Build an interactive admin dashboard with real-time data visualization and user management features using React and TypeScript.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    hourlyRate: 5000,
    daysLeft: 12,
    rating: 4.8,
  },
  {
    id: "fj-2",
    title: "Mobile App UI Design Implementation",
    client: "Creative Agency Co",
    clientAvatar: "CA",
    deadline: "2024-12-10",
    status: "in_progress",
    progress: 40,
    budget: 120000,
    currencyCode: "BDT",
    description:
      "Convert Figma designs into responsive React Native components with smooth animations and pixel-perfect accuracy.",
    skills: ["React Native", "UI/UX", "Figma", "Animation"],
    hourlyRate: 4500,
    daysLeft: 2,
    rating: 4.5,
  },
  {
    id: "fj-3",
    title: "Next.js E-commerce API Integration",
    client: "Digital Commerce Ltd",
    clientAvatar: "DC",
    deadline: "2024-12-25",
    status: "in_progress",
    progress: 50,
    budget: 180000,
    currencyCode: "BDT",
    description:
      "Integrate Stripe payment gateway and implement product management APIs in a Next.js e-commerce platform with authentication.",
    skills: ["Next.js", "Node.js", "Stripe API", "PostgreSQL"],
    hourlyRate: 6000,
    daysLeft: 17,
    rating: 4.9,
  },
];

// Past Jobs (Completed)
export const mockCompletedFreelancerJobs: FreelancerJob[] = [
  {
    id: "fj-4",
    title: "E-commerce Website Development",
    client: "Online Store Ltd",
    clientAvatar: "OS",
    deadline: "2024-11-15",
    status: "completed",
    progress: 100,
    budget: 250000,
    currencyCode: "BDT",
    description:
      "Full-stack e-commerce website with product catalog, shopping cart, and checkout process.",
    skills: ["Next.js", "React", "MongoDB", "Stripe"],
    completedDate: "2024-11-14",
    rating: 5,
    feedback:
      "Excellent work! The website is fast, responsive, and user-friendly. Highly recommend!",
  },
  {
    id: "fj-5",
    title: "REST API Development",
    client: "Software Solutions Co",
    clientAvatar: "SS",
    deadline: "2024-11-10",
    status: "completed",
    progress: 100,
    budget: 180000,
    currencyCode: "BDT",
    description:
      "Build a scalable REST API with authentication, authorization, and comprehensive documentation.",
    skills: ["Node.js", "Express", "JWT", "MongoDB"],
    completedDate: "2024-11-09",
    rating: 4.9,
    feedback:
      "Perfect API architecture! Clean code and excellent documentation. Will work again.",
  },
  {
    id: "fj-6",
    title: "Database Optimization & Migration",
    client: "Data Systems Inc",
    clientAvatar: "DS",
    deadline: "2024-11-05",
    status: "completed",
    progress: 100,
    budget: 140000,
    currencyCode: "BDT",
    description:
      "Optimize existing MySQL database queries and migrate data from legacy system with zero downtime.",
    skills: ["MySQL", "PostgreSQL", "Database Design", "Performance Tuning"],
    completedDate: "2024-11-04",
    rating: 4.8,
    feedback:
      "Great optimization results. Performance improved by 40%. Very professional!",
  },
  {
    id: "fj-7",
    title: "TypeScript Migration Project",
    client: "Legacy Systems Ltd",
    clientAvatar: "LS",
    deadline: "2024-10-28",
    status: "completed",
    progress: 100,
    budget: 200000,
    currencyCode: "BDT",
    description:
      "Migrate existing JavaScript codebase to TypeScript with full type safety and zero breaking changes.",
    skills: ["TypeScript", "JavaScript", "React", "Testing"],
    completedDate: "2024-10-27",
    rating: 4.7,
    feedback:
      "Smooth migration process. Excellent communication throughout. Thank you!",
  },
  {
    id: "fj-8",
    title: "Mobile App Development",
    client: "StartUp Ventures",
    clientAvatar: "SV",
    deadline: "2024-10-20",
    status: "completed",
    progress: 100,
    budget: 300000,
    currencyCode: "BDT",
    description:
      "Cross-platform mobile application for iOS and Android using React Native with native module integration.",
    skills: ["React Native", "iOS", "Android", "Firebase"],
    completedDate: "2024-10-19",
    rating: 5,
    feedback:
      "Outstanding work! App is performing beautifully. Exceeded all expectations!",
  },
  {
    id: "fj-9",
    title: "UI Component Library Development",
    client: "Tech Innovations",
    clientAvatar: "TI",
    deadline: "2024-09-30",
    status: "completed",
    progress: 100,
    budget: 160000,
    currencyCode: "BDT",
    description:
      "Create a reusable UI component library with Storybook, TypeScript, and comprehensive documentation.",
    skills: ["React", "Storybook", "TypeScript", "CSS-in-JS"],
    completedDate: "2024-09-29",
    rating: 4.9,
    feedback:
      "Component library is well-organized and documented. Great for team productivity!",
  },
];

// Pending Jobs (Not Started)
export const mockPendingFreelancerJobs: FreelancerJob[] = [
  {
    id: "fj-10",
    title: "GraphQL API Implementation",
    client: "Modern Tech Stack",
    clientAvatar: "MT",
    deadline: "2024-12-31",
    status: "pending",
    progress: 0,
    budget: 220000,
    currencyCode: "BDT",
    description:
      "Build a modern GraphQL API with Apollo Server, real-time subscriptions, and complex resolvers.",
    skills: ["GraphQL", "Apollo", "Node.js", "PostgreSQL"],
    hourlyRate: 5500,
    daysLeft: 23,
    rating: 4.6,
  },
  {
    id: "fj-11",
    title: "Machine Learning Model Integration",
    client: "AI Solutions Inc",
    clientAvatar: "AI",
    deadline: "2024-12-28",
    status: "pending",
    progress: 0,
    budget: 280000,
    currencyCode: "BDT",
    description:
      "Integrate ML model APIs into a web application with real-time predictions and data visualization.",
    skills: ["Python", "TensorFlow", "React", "FastAPI"],
    hourlyRate: 7000,
    daysLeft: 20,
    rating: 4.7,
  },
];

// Helper Functions

/**
 * Get all active jobs for a freelancer
 */
export function getActiveFreelancerJobs(): FreelancerJob[] {
  return mockActiveFreelancerJobs;
}

/**
 * Get all completed jobs for a freelancer
 */
export function getCompletedFreelancerJobs(): FreelancerJob[] {
  return mockCompletedFreelancerJobs;
}

/**
 * Get all pending jobs for a freelancer
 */
export function getPendingFreelancerJobs(): FreelancerJob[] {
  return mockPendingFreelancerJobs;
}

/**
 * Get all jobs for a freelancer (active + pending + completed)
 */
export function getAllFreelancerJobs(): FreelancerJob[] {
  return [
    ...mockActiveFreelancerJobs,
    ...mockPendingFreelancerJobs,
    ...mockCompletedFreelancerJobs,
  ];
}

/**
 * Get a specific job by ID
 */
export function getFreelancerJobById(jobId: string): FreelancerJob | undefined {
  return getAllFreelancerJobs().find((job) => job.id === jobId);
}

/**
 * Get job statistics for freelancer
 */
export function getFreelancerJobStats() {
  return {
    activeJobs: mockActiveFreelancerJobs.length,
    completedJobs: mockCompletedFreelancerJobs.length,
    pendingJobs: mockPendingFreelancerJobs.length,
    totalEarnings: [
      ...mockActiveFreelancerJobs,
      ...mockCompletedFreelancerJobs,
      ...mockPendingFreelancerJobs,
    ].reduce((sum, job) => sum + job.budget, 0),
    averageRating:
      mockCompletedFreelancerJobs.length > 0
        ? (
            mockCompletedFreelancerJobs.reduce((sum, job) => sum + (job.rating || 0), 0) /
            mockCompletedFreelancerJobs.length
          ).toFixed(1)
        : 0,
  };
}
