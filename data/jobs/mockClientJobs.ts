// Mock Client Jobs Data
// This includes job postings with applicants, ongoing jobs, and completed jobs

export interface JobApplicant {
  id: string;
  name: string;
  avatar: string;
  expertise: "beginner" | "intermediate" | "expert";
  rating: number;
  completedProjects: number;
  hourlyRate: number;
  bio: string;
  status: "applied" | "shortlisted" | "rejected" | "hired" | "in_progress";
}

export interface AIRecommendedFreelancer extends JobApplicant {
  matchPercentage: number;
  matchReason: string;
  isAISelected: boolean;
}

export interface ClientJobPosting {
  id: string;
  title: string;
  description: string;
  requirements: string;
  expertiseLevel: "beginner" | "intermediate" | "expert";
  budget: number;
  budgetRange: {
    min: number;
    max: number;
  };
  currencyCode: string;
  createdDate: string;
  deadline?: string;
  status: "open" | "in_progress" | "completed" | "closed";
  totalApplicants: number;
  applicants: JobApplicant[];
  aiRecommendedFreelancers?: AIRecommendedFreelancer[];
  selectedFreelancer?: JobApplicant;
  progress?: number;
  completionDate?: string;
  feedback?: string;
  rating?: number;
}

// Mock Client Job Postings - ONGOING PROJECTS
export const mockOngoingClientJobs: ClientJobPosting[] = [
  {
    id: "cj-1",
    title: "React Dashboard Development",
    description:
      "Build an interactive admin dashboard with real-time data visualization, user management features, and analytics charts using React and TypeScript.",
    requirements:
      "Experience with React, TypeScript, Redux, Chart.js, and responsive design. Must have at least 3 years of experience.",
    expertiseLevel: "intermediate",
    budget: 150000,
    budgetRange: { min: 70000, max: 180000 },
    currencyCode: "BDT",
    createdDate: "2024-10-15",
    deadline: "2024-12-20",
    status: "in_progress",
    totalApplicants: 8,
    progress: 65,
    applicants: [
      {
        id: "a-1",
        name: "Alex Johnson",
        avatar: "AJ",
        expertise: "intermediate",
        rating: 4.8,
        completedProjects: 34,
        hourlyRate: 5000,
        bio: "Full-stack developer with 5 years of experience in React and TypeScript.",
        status: "hired",
      },
      {
        id: "a-2",
        name: "Sarah Williams",
        avatar: "SW",
        expertise: "expert",
        rating: 4.9,
        completedProjects: 67,
        hourlyRate: 6500,
        bio: "Senior React developer specializing in dashboards and data visualization.",
        status: "shortlisted",
      },
      {
        id: "a-3",
        name: "Mike Chen",
        avatar: "MC",
        expertise: "intermediate",
        rating: 4.5,
        completedProjects: 28,
        hourlyRate: 4500,
        bio: "Frontend specialist with strong TypeScript and Chart.js skills.",
        status: "applied",
      },
    ],
    selectedFreelancer: {
      id: "a-1",
      name: "Alex Johnson",
      avatar: "AJ",
      expertise: "intermediate",
      rating: 4.8,
      completedProjects: 34,
      hourlyRate: 5000,
      bio: "Full-stack developer with 5 years of experience in React and TypeScript.",
      status: "in_progress",
    },
  },
  {
    id: "cj-2",
    title: "E-commerce Mobile App Development",
    description:
      "Develop a cross-platform mobile shopping application with product catalog, cart management, payment integration, and order tracking.",
    requirements:
      "React Native experience required. Must be familiar with Firebase, payment gateways, and native module integration.",
    expertiseLevel: "expert",
    budget: 280000,
    budgetRange: { min: 180000, max: 450000 },
    currencyCode: "BDT",
    createdDate: "2024-10-20",
    deadline: "2025-01-15",
    status: "in_progress",
    totalApplicants: 12,
    progress: 45,
    applicants: [
      {
        id: "a-4",
        name: "Emma Davis",
        avatar: "ED",
        expertise: "expert",
        rating: 4.9,
        completedProjects: 52,
        hourlyRate: 7000,
        bio: "Expert React Native developer with 7 years of mobile development experience.",
        status: "hired",
      },
      {
        id: "a-5",
        name: "James Rodriguez",
        avatar: "JR",
        expertise: "expert",
        rating: 4.7,
        completedProjects: 45,
        hourlyRate: 6800,
        bio: "Senior mobile developer with expertise in payment integration and Firebase.",
        status: "shortlisted",
      },
      {
        id: "a-6",
        name: "Lisa Park",
        avatar: "LP",
        expertise: "intermediate",
        rating: 4.4,
        completedProjects: 22,
        hourlyRate: 4800,
        bio: "Mobile developer with some React Native experience.",
        status: "applied",
      },
    ],
    selectedFreelancer: {
      id: "a-4",
      name: "Emma Davis",
      avatar: "ED",
      expertise: "expert",
      rating: 4.9,
      completedProjects: 52,
      hourlyRate: 7000,
      bio: "Expert React Native developer with 7 years of mobile development experience.",
      status: "in_progress",
    },
  },
  {
    id: "cj-3",
    title: "GraphQL API Backend Development",
    description:
      "Create a modern GraphQL API with Apollo Server, real-time subscriptions, complex resolvers, and comprehensive error handling.",
    requirements:
      "Strong Node.js and GraphQL knowledge. Must have experience with Apollo Server, database design, and authentication mechanisms.",
    expertiseLevel: "expert",
    budget: 220000,
    budgetRange: { min: 180000, max: 450000 },
    currencyCode: "BDT",
    createdDate: "2024-11-01",
    deadline: "2024-12-31",
    status: "in_progress",
    totalApplicants: 6,
    progress: 75,
    applicants: [
      {
        id: "a-7",
        name: "Robert Taylor",
        avatar: "RT",
        expertise: "expert",
        rating: 4.9,
        completedProjects: 58,
        hourlyRate: 7200,
        bio: "Senior backend developer specializing in GraphQL and Node.js architecture.",
        status: "hired",
      },
      {
        id: "a-8",
        name: "Nina Patel",
        avatar: "NP",
        expertise: "expert",
        rating: 4.8,
        completedProjects: 41,
        hourlyRate: 6900,
        bio: "Backend specialist with 6 years of GraphQL and database optimization experience.",
        status: "shortlisted",
      },
    ],
    selectedFreelancer: {
      id: "a-7",
      name: "Robert Taylor",
      avatar: "RT",
      expertise: "expert",
      rating: 4.9,
      completedProjects: 58,
      hourlyRate: 7200,
      bio: "Senior backend developer specializing in GraphQL and Node.js architecture.",
      status: "in_progress",
    },
  },
];

// Mock Client Job Postings - COMPLETED PROJECTS
export const mockCompletedClientJobs: ClientJobPosting[] = [
  {
    id: "cj-4",
    title: "Landing Page Design & Development",
    description:
      "Create a modern, responsive landing page with smooth animations, SEO optimization, and conversion-focused design.",
    requirements:
      "HTML, CSS, JavaScript, and Figma design skills. Experience with performance optimization and SEO.",
    expertiseLevel: "beginner",
    budget: 45000,
    budgetRange: { min: 25000, max: 70000 },
    currencyCode: "BDT",
    createdDate: "2024-09-01",
    deadline: "2024-09-30",
    status: "completed",
    totalApplicants: 15,
    completionDate: "2024-09-28",
    rating: 5,
    feedback:
      "Outstanding work! The landing page looks beautiful and performs exceptionally well. Great communication throughout.",
    applicants: [
      {
        id: "a-9",
        name: "Tom Wilson",
        avatar: "TW",
        expertise: "beginner",
        rating: 4.7,
        completedProjects: 15,
        hourlyRate: 2500,
        bio: "Frontend developer specializing in landing pages and animations.",
        status: "hired",
      },
    ],
    selectedFreelancer: {
      id: "a-9",
      name: "Tom Wilson",
      avatar: "TW",
      expertise: "beginner",
      rating: 4.7,
      completedProjects: 15,
      hourlyRate: 2500,
      bio: "Frontend developer specializing in landing pages and animations.",
      status: "hired",
    },
  },
  {
    id: "cj-5",
    title: "Database Schema Design & Optimization",
    description:
      "Design and optimize database schema for a large-scale application. Include indexing strategies and query optimization.",
    requirements:
      "Expert in relational databases, normalization, and performance tuning. Must understand complex query optimization.",
    expertiseLevel: "expert",
    budget: 140000,
    budgetRange: { min: 180000, max: 450000 },
    currencyCode: "BDT",
    createdDate: "2024-08-15",
    deadline: "2024-09-15",
    status: "completed",
    totalApplicants: 7,
    completionDate: "2024-09-14",
    rating: 4.9,
    feedback:
      "Excellent database design! The schema is well-structured and queries run 50% faster. Professional approach.",
    applicants: [
      {
        id: "a-10",
        name: "David Kumar",
        avatar: "DK",
        expertise: "expert",
        rating: 4.9,
        completedProjects: 71,
        hourlyRate: 6500,
        bio: "Database architect with 8 years of experience in optimization and scaling.",
        status: "hired",
      },
    ],
    selectedFreelancer: {
      id: "a-10",
      name: "David Kumar",
      avatar: "DK",
      expertise: "expert",
      rating: 4.9,
      completedProjects: 71,
      hourlyRate: 6500,
      bio: "Database architect with 8 years of experience in optimization and scaling.",
      status: "hired",
    },
  },
  {
    id: "cj-6",
    title: "API Documentation & Postman Collection",
    description:
      "Create comprehensive API documentation and Postman collection with examples, error handling, and authentication flows.",
    requirements:
      "Technical writing skills, API knowledge, Postman expertise, and ability to explain complex concepts clearly.",
    expertiseLevel: "intermediate",
    budget: 60000,
    budgetRange: { min: 70000, max: 180000 },
    currencyCode: "BDT",
    createdDate: "2024-07-20",
    deadline: "2024-08-20",
    status: "completed",
    totalApplicants: 9,
    completionDate: "2024-08-18",
    rating: 4.8,
    feedback:
      "Perfect documentation! Clear, comprehensive, and easy to follow. This will help our entire team.",
    applicants: [
      {
        id: "a-11",
        name: "Sophie Martin",
        avatar: "SM",
        expertise: "intermediate",
        rating: 4.8,
        completedProjects: 38,
        hourlyRate: 4200,
        bio: "Technical writer specializing in API documentation and developer guides.",
        status: "hired",
      },
    ],
    selectedFreelancer: {
      id: "a-11",
      name: "Sophie Martin",
      avatar: "SM",
      expertise: "intermediate",
      rating: 4.8,
      completedProjects: 38,
      hourlyRate: 4200,
      bio: "Technical writer specializing in API documentation and developer guides.",
      status: "hired",
    },
  },
  {
    id: "cj-7",
    title: "UI/UX Design System Implementation",
    description:
      "Build a complete design system with component library, accessibility guidelines, and Figma file management.",
    requirements:
      "Strong design background, Figma expertise, UI/UX principles, and ability to create scalable design systems.",
    expertiseLevel: "expert",
    budget: 180000,
    budgetRange: { min: 180000, max: 450000 },
    currencyCode: "BDT",
    createdDate: "2024-06-01",
    deadline: "2024-07-30",
    status: "completed",
    totalApplicants: 11,
    completionDate: "2024-07-29",
    rating: 5,
    feedback:
      "Exceptional design system! Professional, well-organized, and ahead of schedule. Exactly what we needed!",
    applicants: [
      {
        id: "a-12",
        name: "Grace Chen",
        avatar: "GC",
        expertise: "expert",
        rating: 5,
        completedProjects: 44,
        hourlyRate: 6700,
        bio: "Expert UI/UX designer specializing in design systems and component libraries.",
        status: "hired",
      },
    ],
    selectedFreelancer: {
      id: "a-12",
      name: "Grace Chen",
      avatar: "GC",
      expertise: "expert",
      rating: 5,
      completedProjects: 44,
      hourlyRate: 6700,
      bio: "Expert UI/UX designer specializing in design systems and component libraries.",
      status: "hired",
    },
  },
];

// Mock Client Job Postings - OPEN/AVAILABLE (Not yet started)
export const mockOpenClientJobs: ClientJobPosting[] = [
  {
    id: "cj-8",
    title: "PWA Development with Offline Support",
    description:
      "Build a Progressive Web Application with offline functionality, service workers, and push notifications.",
    requirements:
      "Experience with PWA development, service workers, caching strategies, and web APIs.",
    expertiseLevel: "intermediate",
    budget: 110000,
    budgetRange: { min: 70000, max: 180000 },
    currencyCode: "BDT",
    createdDate: "2024-11-05",
    deadline: "2024-12-31",
    status: "open",
    totalApplicants: 4,
    applicants: [
      {
        id: "a-13",
        name: "Kevin Bell",
        avatar: "KB",
        expertise: "intermediate",
        rating: 4.6,
        completedProjects: 26,
        hourlyRate: 4400,
        bio: "Frontend developer with PWA and offline-first development experience.",
        status: "applied",
      },
      {
        id: "a-14",
        name: "Rachel Green",
        avatar: "RG",
        expertise: "intermediate",
        rating: 4.5,
        completedProjects: 19,
        hourlyRate: 3900,
        bio: "Web developer focusing on modern web technologies and PWA.",
        status: "applied",
      },
    ],
    aiRecommendedFreelancers: [
      {
        id: "ai-1",
        name: "James Mitchell",
        avatar: "JM",
        expertise: "expert",
        rating: 4.9,
        completedProjects: 52,
        hourlyRate: 6200,
        bio: "Expert in PWA development with 8 years of experience in offline-first applications.",
        status: "applied",
        matchPercentage: 98,
        matchReason:
          "Perfect match: 8 years PWA experience, 52 completed projects, excellent ratings",
        isAISelected: true,
      },
      {
        id: "ai-2",
        name: "Emma Rodriguez",
        avatar: "ER",
        expertise: "intermediate",
        rating: 4.7,
        completedProjects: 38,
        hourlyRate: 4800,
        bio: "Specialized in service workers and modern web APIs implementation.",
        status: "applied",
        matchPercentage: 92,
        matchReason:
          "Strong match: Specialized in service workers, 38 completed projects, high ratings",
        isAISelected: true,
      },
      {
        id: "ai-3",
        name: "David Chen",
        avatar: "DC",
        expertise: "intermediate",
        rating: 4.6,
        completedProjects: 29,
        hourlyRate: 4100,
        bio: "Full-stack developer with strong experience in progressive web apps.",
        status: "applied",
        matchPercentage: 85,
        matchReason:
          "Good match: PWA experience, responsive design skills, reliable track record",
        isAISelected: true,
      },
    ],
  },
  {
    id: "cj-9",
    title: "Cloud Infrastructure Setup & DevOps",
    description:
      "Set up cloud infrastructure on AWS/Azure, implement CI/CD pipelines, and configure monitoring and logging.",
    requirements:
      "Cloud platform experience (AWS/Azure), Docker, Kubernetes, CI/CD tools, and DevOps best practices.",
    expertiseLevel: "expert",
    budget: 200000,
    budgetRange: { min: 180000, max: 450000 },
    currencyCode: "BDT",
    createdDate: "2024-11-03",
    deadline: "2025-01-10",
    status: "open",
    totalApplicants: 5,
    applicants: [
      {
        id: "a-15",
        name: "Marcus Johnson",
        avatar: "MJ",
        expertise: "expert",
        rating: 4.8,
        completedProjects: 49,
        hourlyRate: 7500,
        bio: "DevOps engineer specializing in AWS infrastructure and Kubernetes orchestration.",
        status: "applied",
      },
    ],
    aiRecommendedFreelancers: [
      {
        id: "ai-4",
        name: "Thomas Anderson",
        avatar: "TA",
        expertise: "expert",
        rating: 4.95,
        completedProjects: 67,
        hourlyRate: 8100,
        bio: "Senior DevOps architect with 10+ years in AWS, Azure, and cloud infrastructure.",
        status: "applied",
        matchPercentage: 99,
        matchReason:
          "Exceptional fit: 10+ years cloud expertise, 67 completed projects, AWS & Azure certified",
        isAISelected: true,
      },
      {
        id: "ai-5",
        name: "Lisa Wong",
        avatar: "LW",
        expertise: "expert",
        rating: 4.8,
        completedProjects: 54,
        hourlyRate: 7800,
        bio: "Cloud architect specializing in Kubernetes and CI/CD pipeline automation.",
        status: "applied",
        matchPercentage: 96,
        matchReason:
          "Excellent match: Kubernetes expert, 54 successful deployments, strong DevOps background",
        isAISelected: true,
      },
      {
        id: "ai-6",
        name: "Robert Park",
        avatar: "RP",
        expertise: "expert",
        rating: 4.7,
        completedProjects: 43,
        hourlyRate: 7200,
        bio: "Infrastructure specialist with Docker, Kubernetes, and monitoring expertise.",
        status: "applied",
        matchPercentage: 88,
        matchReason:
          "Strong match: Complete DevOps stack experience, proven monitoring solutions",
        isAISelected: true,
      },
    ],
  },
];

// Helper Functions

/**
 * Get all ongoing client jobs
 */
export function getOngoingClientJobs(): ClientJobPosting[] {
  return mockOngoingClientJobs;
}

/**
 * Get all completed client jobs
 */
export function getCompletedClientJobs(): ClientJobPosting[] {
  return mockCompletedClientJobs;
}

/**
 * Get all open/available client jobs (awaiting freelancer selection)
 */
export function getOpenClientJobs(): ClientJobPosting[] {
  return mockOpenClientJobs;
}

/**
 * Get all client jobs
 */
export function getAllClientJobs(): ClientJobPosting[] {
  return [
    ...mockOngoingClientJobs,
    ...mockOpenClientJobs,
    ...mockCompletedClientJobs,
  ];
}

/**
 * Get a specific job by ID
 */
export function getClientJobById(jobId: string): ClientJobPosting | undefined {
  return getAllClientJobs().find((job) => job.id === jobId);
}

/**
 * Get applicants for a specific job
 */
export function getJobApplicants(jobId: string): JobApplicant[] {
  const job = getClientJobById(jobId);
  return job?.applicants || [];
}

/**
 * Get job statistics for client
 */
export function getClientJobStats() {
  return {
    ongoingJobs: mockOngoingClientJobs.length,
    completedJobs: mockCompletedClientJobs.length,
    openJobs: mockOpenClientJobs.length,
    totalJobs:
      mockOngoingClientJobs.length +
      mockOpenClientJobs.length +
      mockCompletedClientJobs.length,
    totalSpent: [
      ...mockOngoingClientJobs,
      ...mockCompletedClientJobs,
      ...mockOpenClientJobs,
    ].reduce((sum, job) => sum + job.budget, 0),
    averageRating:
      mockCompletedClientJobs.length > 0
        ? (
            mockCompletedClientJobs.reduce((sum, job) => sum + (job.rating || 0), 0) /
            mockCompletedClientJobs.length
          ).toFixed(1)
        : 0,
    totalApplicants: [
      ...mockOngoingClientJobs,
      ...mockOpenClientJobs,
      ...mockCompletedClientJobs,
    ].reduce((sum, job) => sum + job.totalApplicants, 0),
  };
}

/**
 * Get total applicants count for a specific job
 */
export function getJobApplicantCount(jobId: string): number {
  const job = getClientJobById(jobId);
  return job?.totalApplicants || 0;
}

/**
 * Get applicant count by status for a job
 */
export function getApplicantsByStatus(jobId: string, status: string): JobApplicant[] {
  const applicants = getJobApplicants(jobId);
  return applicants.filter((a) => a.status === status);
}

/**
 * Get AI recommended freelancers for a job
 */
export function getAIRecommendedFreelancers(jobId: string): AIRecommendedFreelancer[] {
  const job = getClientJobById(jobId);
  return job?.aiRecommendedFreelancers || [];
}
