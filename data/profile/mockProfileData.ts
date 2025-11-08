export interface Review {
  id: string;
  reviewerName: string;
  reviewerRole: "client" | "freelancer";
  rating: number;
  comment: string;
  date: string;
  isAIVerified: boolean;
  jobTitle?: string;
}

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  role: "freelancer" | "client";
  // Freelancer specific
  skills?: string[];
  hourlyRate?: number;
  totalJobsCompleted?: number;
  totalEarnings?: string;
  // Client specific
  companyName?: string;
  totalJobsPosted?: number;
  totalSpent?: string;
}

// Mock Freelancer Profile
export const mockFreelancerProfile: ProfileData = {
  id: "freelancer-1",
  name: "Alex Johnson",
  email: "freelancer@gmail.com",
  bio: "Experienced full-stack developer specializing in React, Node.js, and TypeScript. Passionate about building scalable web applications.",
  location: "New York, USA",
  phone: "+1 (555) 123-4567",
  website: "https://alexjohnson.dev",
  averageRating: 4.9,
  totalReviews: 127,
  hourlyRate: 75,
  totalJobsCompleted: 45,
  totalEarnings: "$125,000",
  skills: ["React", "TypeScript", "Node.js", "Next.js", "GraphQL", "MongoDB"],
  role: "freelancer",
  reviews: [
    {
      id: "rev-1",
      reviewerName: "Sarah Smith",
      reviewerRole: "client",
      rating: 5,
      comment:
        "Alex delivered an exceptional React dashboard that exceeded all expectations. The code quality was outstanding and the project was completed ahead of schedule. Highly recommended!",
      date: "2024-11-10",
      isAIVerified: true,
      jobTitle: "React Dashboard Development",
    },
    {
      id: "rev-2",
      reviewerName: "Michael Chen",
      reviewerRole: "client",
      rating: 5,
      comment:
        "Outstanding work on our Next.js application. Alex's expertise in TypeScript and modern React patterns is evident. The project was well-documented and maintainable.",
      date: "2024-11-05",
      isAIVerified: true,
      jobTitle: "Next.js Full Stack Application",
    },
    {
      id: "rev-3",
      reviewerName: "Emily Davis",
      reviewerRole: "client",
      rating: 4,
      comment:
        "Good developer, delivered on time. Some minor communication delays but overall satisfied with the work.",
      date: "2024-10-28",
      isAIVerified: false,
      jobTitle: "API Integration Project",
    },
    {
      id: "rev-4",
      reviewerName: "David Wilson",
      reviewerRole: "client",
      rating: 5,
      comment:
        "Alex is a true professional. The GraphQL API implementation was flawless and the performance optimizations made a huge difference. Will definitely hire again!",
      date: "2024-10-20",
      isAIVerified: true,
      jobTitle: "GraphQL API Development",
    },
    {
      id: "rev-5",
      reviewerName: "Lisa Anderson",
      reviewerRole: "client",
      rating: 5,
      comment:
        "Excellent freelancer! The UI/UX improvements were exactly what we needed. Very responsive and professional throughout the project.",
      date: "2024-10-15",
      isAIVerified: true,
      jobTitle: "UI/UX Redesign",
    },
  ],
};

// Mock Client Profile
export const mockClientProfile: ProfileData = {
  id: "client-1",
  name: "Sarah Smith",
  email: "client@gmail.com",
  bio: "Tech startup founder looking for talented developers to build innovative products.",
  location: "San Francisco, USA",
  phone: "+1 (555) 987-6543",
  website: "https://techstartup.com",
  companyName: "Tech Startup Inc",
  averageRating: 4.8,
  totalReviews: 89,
  totalJobsPosted: 23,
  totalSpent: "$45,000",
  role: "client",
  reviews: [
    {
      id: "rev-c1",
      reviewerName: "Alex Johnson",
      reviewerRole: "freelancer",
      rating: 5,
      comment:
        "Great client to work with! Clear communication, fair requirements, and prompt payments. The project scope was well-defined from the start.",
      date: "2024-11-08",
      isAIVerified: true,
      jobTitle: "React Dashboard Development",
    },
    {
      id: "rev-c2",
      reviewerName: "Maria Garcia",
      reviewerRole: "freelancer",
      rating: 5,
      comment:
        "Sarah is an excellent client. Very professional, provides clear feedback, and respects deadlines. Highly recommend working with her!",
      date: "2024-11-01",
      isAIVerified: true,
      jobTitle: "Mobile App UI Design",
    },
    {
      id: "rev-c3",
      reviewerName: "John Doe",
      reviewerRole: "freelancer",
      rating: 4,
      comment:
        "Good client overall. Sometimes requirements changed mid-project but was always willing to adjust the budget accordingly.",
      date: "2024-10-25",
      isAIVerified: false,
      jobTitle: "Backend API Development",
    },
    {
      id: "rev-c4",
      reviewerName: "Emma Wilson",
      reviewerRole: "freelancer",
      rating: 5,
      comment:
        "One of the best clients I've worked with! Clear vision, excellent communication, and very supportive throughout the project.",
      date: "2024-10-18",
      isAIVerified: true,
      jobTitle: "Database Optimization",
    },
  ],
};
