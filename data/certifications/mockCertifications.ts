// Certificate Types
export interface Certificate {
  id: string;
  type: "course" | "project" | "skill" | "milestone";
  title: string;
  description: string;
  issuedBy: string;
  issuedDate: string; // "YYYY-MM-DD"
  expiryDate?: string; // Optional for non-expiring certs
  icon: string; // emoji or icon code
  badgeColor: string; // for badge styling
  category: string; // "Course", "Project", "Skill", "Achievement"
  credentialId?: string; // For sharing/verification
  projectLink?: string; // For project-based certificates
}

export interface Badge {
  id: string;
  title: string; // e.g., "React Beginner", "Machine Learning Expert"
  description: string;
  icon: string;
  color: string; // bg color class
  earnedDate: string; // "YYYY-MM-DD"
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  condition?: string; // How it was earned
  progress?: number; // 0-100 for badges with progress
  skill: string; // The skill name (e.g., "React", "UI/UX")
  level: "Beginner" | "Level 1" | "Level 2" | "Level 3" | "Intermediate" | "Advanced" | "Expert"; // Skill proficiency
}

export interface SkillEndorsement {
  id: string;
  skill: string;
  endorsementCount: number;
  level: "Beginner" | "Intermediate" | "Expert";
  yearsOfExperience: number;
  lastEndorsedDate: string;
  endorsedBy: string[]; // Names of people who endorsed
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "earnings" | "jobs" | "rating" | "courses" | "community";
  achievedDate: string;
  milestone: string; // e.g., "First 10 Jobs", "৳100,000 Earned"
  progress?: {
    current: number;
    target: number;
  };
}

// Certificates Data
export const mockCertificates: Certificate[] = [
  {
    id: "cert-1",
    type: "course",
    title: "Advanced React.js Mastery",
    description: "Comprehensive course on advanced React patterns, hooks, and performance optimization.",
    issuedBy: "Learning & Earning AI Academy",
    issuedDate: "2024-11-05",
    expiryDate: "2025-11-05",
    icon: "⚛️",
    badgeColor: "bg-blue-600",
    category: "Course",
    credentialId: "LEAI-2024-001-REACT",
  },
  {
    id: "cert-2",
    type: "course",
    title: "TypeScript Professional",
    description: "Master TypeScript for scalable and type-safe development.",
    issuedBy: "Learning & Earning AI Academy",
    issuedDate: "2024-10-20",
    expiryDate: "2025-10-20",
    icon: "📘",
    badgeColor: "bg-purple-600",
    category: "Course",
    credentialId: "LEAI-2024-002-TS",
  },
  {
    id: "cert-3",
    type: "course",
    title: "Next.js Full Stack Development",
    description: "Build production-ready full-stack applications with Next.js 16.",
    issuedBy: "Learning & Earning AI Academy",
    issuedDate: "2024-09-15",
    expiryDate: "2025-09-15",
    icon: "▲",
    badgeColor: "bg-black",
    category: "Course",
    credentialId: "LEAI-2024-003-NEXTJS",
  },
  {
    id: "cert-4",
    type: "course",
    title: "Node.js Backend Mastery",
    description: "Complete guide to backend development with Node.js and Express.",
    issuedBy: "Learning & Earning AI Academy",
    issuedDate: "2024-08-10",
    expiryDate: "2025-08-10",
    icon: "🟢",
    badgeColor: "bg-green-600",
    category: "Course",
    credentialId: "LEAI-2024-004-NODEJS",
  },
  {
    id: "cert-5",
    type: "course",
    title: "UI/UX Design Fundamentals",
    description: "Master modern UI/UX design principles and best practices.",
    issuedBy: "Learning & Earning AI Academy",
    issuedDate: "2024-07-22",
    expiryDate: "2025-07-22",
    icon: "🎨",
    badgeColor: "bg-pink-600",
    category: "Course",
    credentialId: "LEAI-2024-005-UIUX",
  },
  {
    id: "cert-6",
    type: "course",
    title: "GraphQL API Development",
    description: "Build modern APIs with GraphQL and Apollo.",
    issuedBy: "Learning & Earning AI Academy",
    issuedDate: "2024-06-18",
    expiryDate: "2025-06-18",
    icon: "🔗",
    badgeColor: "bg-rose-600",
    category: "Course",
    credentialId: "LEAI-2024-006-GRAPHQL",
  },
  {
    id: "cert-7",
    type: "course",
    title: "Object-Oriented Programming",
    description: "Complete OOP principles with JavaScript and TypeScript.",
    issuedBy: "Learning & Earning AI Academy",
    issuedDate: "2024-05-12",
    expiryDate: "2025-05-12",
    icon: "🏛️",
    badgeColor: "bg-indigo-600",
    category: "Course",
    credentialId: "LEAI-2024-007-OOP",
  },
  {
    id: "cert-8",
    type: "project",
    title: "E-Commerce Platform Development",
    description: "Successfully completed the e-commerce project with full-stack implementation.",
    issuedBy: "Learning & Earning AI - Project Review",
    issuedDate: "2024-11-01",
    icon: "🛍️",
    badgeColor: "bg-cyan-600",
    category: "Project",
    credentialId: "LEAI-2024-P001",
    projectLink: "https://github.com/yourprofile/ecommerce",
  },
  {
    id: "cert-9",
    type: "project",
    title: "Real-Time Chat Application",
    description: "Verified completion of real-time chat app with WebSocket integration.",
    issuedBy: "Learning & Earning AI - Project Review",
    issuedDate: "2024-10-15",
    icon: "💬",
    badgeColor: "bg-teal-600",
    category: "Project",
    credentialId: "LEAI-2024-P002",
    projectLink: "https://github.com/yourprofile/chat-app",
  },
  {
    id: "cert-10",
    type: "project",
    title: "Data Dashboard & Analytics",
    description: "Successfully developed comprehensive data visualization dashboard.",
    issuedBy: "Learning & Earning AI - Project Review",
    issuedDate: "2024-09-20",
    icon: "📊",
    badgeColor: "bg-orange-600",
    category: "Project",
    credentialId: "LEAI-2024-P003",
    projectLink: "https://github.com/yourprofile/dashboard",
  },
];

// Badges Data - Skill-Based Proficiency Badges
export const mockBadges: Badge[] = [
  {
    id: "badge-1",
    title: "React Beginner",
    description: "Started learning React fundamentals and basics",
    icon: "⚛️",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    earnedDate: "2024-05-10",
    rarity: "common",
    skill: "React",
    level: "Beginner",
    condition: "Complete React basics course",
  },
  {
    id: "badge-2",
    title: "React Intermediate",
    description: "Mastered React hooks, state management, and component patterns",
    icon: "⚛️",
    color: "bg-gradient-to-br from-blue-500 to-cyan-600",
    earnedDate: "2024-07-15",
    rarity: "uncommon",
    skill: "React",
    level: "Intermediate",
    condition: "Build 5 React projects",
  },
  {
    id: "badge-3",
    title: "React Expert",
    description: "Advanced React patterns, performance optimization, and architecture",
    icon: "⚛️",
    color: "bg-gradient-to-br from-blue-600 to-cyan-700",
    earnedDate: "2024-09-20",
    rarity: "rare",
    skill: "React",
    level: "Expert",
    condition: "Complete advanced React course + 10 projects",
  },
  {
    id: "badge-4",
    title: "TypeScript Beginner",
    description: "Learned TypeScript basics and type system fundamentals",
    icon: "📘",
    color: "bg-gradient-to-br from-purple-500 to-indigo-600",
    earnedDate: "2024-05-22",
    rarity: "common",
    skill: "TypeScript",
    level: "Beginner",
    condition: "Complete TypeScript fundamentals",
  },
  {
    id: "badge-5",
    title: "TypeScript Intermediate",
    description: "Advanced types, generics, decorators, and utility types mastery",
    icon: "📘",
    color: "bg-gradient-to-br from-purple-500 to-pink-600",
    earnedDate: "2024-08-10",
    rarity: "uncommon",
    skill: "TypeScript",
    level: "Intermediate",
    condition: "Build 3 TypeScript projects",
  },
  {
    id: "badge-6",
    title: "Node.js Intermediate",
    description: "Server-side development, REST APIs, and middleware expertise",
    icon: "🟢",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    earnedDate: "2024-06-18",
    rarity: "uncommon",
    skill: "Node.js",
    level: "Intermediate",
    condition: "Build 3 Node.js backends",
  },
  {
    id: "badge-7",
    title: "Node.js Expert",
    description: "Advanced backend patterns, scaling, and system design",
    icon: "🟢",
    color: "bg-gradient-to-br from-green-600 to-teal-700",
    earnedDate: "2024-10-01",
    rarity: "rare",
    skill: "Node.js",
    level: "Expert",
    condition: "Complete advanced Node.js + microservices",
  },
  {
    id: "badge-8",
    title: "Next.js Beginner",
    description: "Started with Next.js framework and full-stack development",
    icon: "▲",
    color: "bg-gradient-to-br from-black to-gray-800",
    earnedDate: "2024-06-05",
    rarity: "common",
    skill: "Next.js",
    level: "Beginner",
    condition: "Build first Next.js app",
  },
  {
    id: "badge-9",
    title: "Next.js Intermediate",
    description: "API routes, SSR, ISR, and advanced Next.js features",
    icon: "▲",
    color: "bg-gradient-to-br from-gray-700 to-gray-900",
    earnedDate: "2024-08-25",
    rarity: "uncommon",
    skill: "Next.js",
    level: "Intermediate",
    condition: "Build 2 full-stack Next.js apps",
  },
  {
    id: "badge-10",
    title: "UI/UX Level 1",
    description: "Design fundamentals, color theory, and basic principles",
    icon: "🎨",
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    earnedDate: "2024-05-15",
    rarity: "common",
    skill: "UI/UX Design",
    level: "Level 1",
    condition: "Complete UI/UX fundamentals",
  },
  {
    id: "badge-11",
    title: "UI/UX Level 2",
    description: "Advanced design systems, prototyping, and user research",
    icon: "🎨",
    color: "bg-gradient-to-br from-pink-600 to-rose-700",
    earnedDate: "2024-08-12",
    rarity: "uncommon",
    skill: "UI/UX Design",
    level: "Level 2",
    condition: "Design 3 complete design systems",
  },
  {
    id: "badge-12",
    title: "UI/UX Level 3",
    description: "Expert-level design, interaction patterns, and accessibility",
    icon: "🎨",
    color: "bg-gradient-to-br from-pink-700 to-rose-800",
    earnedDate: "2024-10-15",
    rarity: "rare",
    skill: "UI/UX Design",
    level: "Level 3",
    condition: "Design 5+ professional projects",
  },
  {
    id: "badge-13",
    title: "GraphQL Beginner",
    description: "GraphQL fundamentals and query basics",
    icon: "🔗",
    color: "bg-gradient-to-br from-rose-500 to-orange-600",
    earnedDate: "2024-07-20",
    rarity: "common",
    skill: "GraphQL",
    level: "Beginner",
    condition: "Learn GraphQL basics",
  },
  {
    id: "badge-14",
    title: "Machine Learning Beginner",
    description: "ML fundamentals, algorithms, and introduction to AI",
    icon: "🤖",
    color: "bg-gradient-to-br from-yellow-500 to-orange-600",
    earnedDate: "2024-09-30",
    rarity: "uncommon",
    skill: "Machine Learning",
    level: "Beginner",
    condition: "Complete ML fundamentals course",
  },
];

// Skills Endorsements Data
export const mockSkillEndorsements: SkillEndorsement[] = [
  {
    id: "skill-1",
    skill: "React",
    endorsementCount: 127,
    level: "Expert",
    yearsOfExperience: 4,
    lastEndorsedDate: "2024-11-05",
    endorsedBy: [
      "Ahmed Hassan",
      "Sarah Johnson",
      "David Chen",
      "Emma Wilson",
      "+123 more",
    ],
  },
  {
    id: "skill-2",
    skill: "TypeScript",
    endorsementCount: 98,
    level: "Expert",
    yearsOfExperience: 3,
    lastEndorsedDate: "2024-11-04",
    endorsedBy: [
      "Michael Brown",
      "Lisa Wang",
      "James Davis",
      "Sophie Martin",
      "+94 more",
    ],
  },
  {
    id: "skill-3",
    skill: "Node.js",
    endorsementCount: 85,
    level: "Expert",
    yearsOfExperience: 3,
    lastEndorsedDate: "2024-11-03",
    endorsedBy: [
      "Carlos Rodriguez",
      "Anna Kowalski",
      "Raj Patel",
      "Maria Garcia",
      "+81 more",
    ],
  },
  {
    id: "skill-4",
    skill: "Next.js",
    endorsementCount: 76,
    level: "Expert",
    yearsOfExperience: 2,
    lastEndorsedDate: "2024-11-02",
    endorsedBy: [
      "Tom Wilson",
      "Jessica Lee",
      "Alex Kumar",
      "Rachel Green",
      "+72 more",
    ],
  },
  {
    id: "skill-5",
    skill: "Tailwind CSS",
    endorsementCount: 64,
    level: "Expert",
    yearsOfExperience: 2,
    lastEndorsedDate: "2024-10-28",
    endorsedBy: [
      "Nina Sato",
      "Oliver Schmidt",
      "Grace Park",
      "Marcus Hall",
      "+60 more",
    ],
  },
  {
    id: "skill-6",
    skill: "GraphQL",
    endorsementCount: 42,
    level: "Intermediate",
    yearsOfExperience: 1,
    lastEndorsedDate: "2024-10-15",
    endorsedBy: [
      "Laura Martinez",
      "Daniel Kim",
      "Sophie Laurent",
      "+39 more",
    ],
  },
  {
    id: "skill-7",
    skill: "MongoDB",
    endorsementCount: 38,
    level: "Intermediate",
    yearsOfExperience: 1,
    lastEndorsedDate: "2024-10-10",
    endorsedBy: ["Viktor Novak", "Chen Liu", "Petra Mueller", "+35 more"],
  },
  {
    id: "skill-8",
    skill: "UI/UX Design",
    endorsementCount: 31,
    level: "Intermediate",
    yearsOfExperience: 1,
    lastEndorsedDate: "2024-09-20",
    endorsedBy: ["Isabelle Dubois", "Erik Soren", "+27 more"],
  },
];

// Milestones Data
export const mockMilestones: Milestone[] = [
  {
    id: "milestone-1",
    title: "First Job Completed",
    description: "You completed your very first freelance job!",
    icon: "🎉",
    category: "jobs",
    achievedDate: "2024-05-15",
    milestone: "First 1 Job",
  },
  {
    id: "milestone-2",
    title: "10 Jobs Completed",
    description: "You've successfully completed 10 projects",
    icon: "🚀",
    category: "jobs",
    achievedDate: "2024-06-20",
    milestone: "10 Jobs",
  },
  {
    id: "milestone-3",
    title: "50 Jobs Completed",
    description: "You've completed 50 projects and are a trusted freelancer",
    icon: "⭐",
    category: "jobs",
    achievedDate: "2024-11-01",
    milestone: "50 Jobs",
  },
  {
    id: "milestone-4",
    title: "First ৳10,000 Earned",
    description: "Your first major earnings milestone!",
    icon: "💵",
    category: "earnings",
    achievedDate: "2024-05-22",
    milestone: "৳10,000",
  },
  {
    id: "milestone-5",
    title: "৳100,000 Earned",
    description: "You've earned 100k! Keep up the great work",
    icon: "💰",
    category: "earnings",
    achievedDate: "2024-08-10",
    milestone: "৳100,000",
  },
  {
    id: "milestone-6",
    title: "৳1,000,000 Earned",
    description: "You've reached 1 million taka in earnings!",
    icon: "🎊",
    category: "earnings",
    achievedDate: "2024-11-05",
    milestone: "৳1,000,000",
  },
  {
    id: "milestone-7",
    title: "Perfect 5.0 Rating",
    description: "Achieved a perfect 5.0 rating from all clients",
    icon: "✨",
    category: "rating",
    achievedDate: "2024-11-03",
    milestone: "5.0 Rating",
  },
  {
    id: "milestone-8",
    title: "100+ Reviews",
    description: "Received over 100 client reviews",
    icon: "📝",
    category: "jobs",
    achievedDate: "2024-11-02",
    milestone: "100 Reviews",
  },
  {
    id: "milestone-9",
    title: "5 Courses Completed",
    description: "You've completed 5 professional courses",
    icon: "📚",
    category: "courses",
    achievedDate: "2024-09-20",
    milestone: "5 Courses",
  },
  {
    id: "milestone-10",
    title: "10 Courses Completed",
    description: "You've completed 10 professional development courses",
    icon: "🏆",
    category: "courses",
    achievedDate: "2024-11-04",
    milestone: "10 Courses",
  },
  {
    id: "milestone-11",
    title: "Top Rated Badge",
    description: "Qualified as a Top Rated freelancer with 4.9+ rating",
    icon: "👑",
    category: "rating",
    achievedDate: "2024-11-01",
    milestone: "Top Rated",
  },
  {
    id: "milestone-12",
    title: "Community Helper",
    description: "Helped 20+ freelancers with mentoring",
    icon: "🤝",
    category: "community",
    achievedDate: "2024-10-25",
    milestone: "20 Mentees",
  },
];

// Summary Statistics
export interface CertificationStats {
  totalCertificates: number;
  totalBadges: number;
  totalSkillsEndorsed: number;
  skillEndorsementCount: number;
  expertSkills: number;
  completionPercentage: number;
  lastAchievementDate: string;
}

export const mockCertificationStats: CertificationStats = {
  totalCertificates: mockCertificates.length,
  totalBadges: mockBadges.length,
  totalSkillsEndorsed: mockSkillEndorsements.length,
  skillEndorsementCount: mockSkillEndorsements.reduce(
    (sum, skill) => sum + skill.endorsementCount,
    0
  ),
  expertSkills: mockSkillEndorsements.filter((s) => s.level === "Expert")
    .length,
  completionPercentage: 85,
  lastAchievementDate: "2024-11-05",
};

// Utility Functions
export const getRarityColor = (
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
): string => {
  const colors: Record<
    "common" | "uncommon" | "rare" | "epic" | "legendary",
    string
  > = {
    common: "bg-gray-600",
    uncommon: "bg-green-600",
    rare: "bg-blue-600",
    epic: "bg-purple-600",
    legendary: "bg-yellow-600",
  };
  return colors[rarity];
};

export const getRarityBorder = (
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
): string => {
  const colors: Record<
    "common" | "uncommon" | "rare" | "epic" | "legendary",
    string
  > = {
    common: "border-gray-500",
    uncommon: "border-green-500",
    rare: "border-blue-500",
    epic: "border-purple-500",
    legendary: "border-yellow-500",
  };
  return colors[rarity];
};

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    Course: "📖",
    Project: "💼",
    Skill: "⚡",
    Achievement: "🏅",
  };
  return icons[category] || "🎯";
};

export const getAllCertifications = () => {
  return [...mockCertificates, ...mockBadges];
};

export const getCertificatesByType = (type: string) => {
  return mockCertificates.filter((cert) => cert.type === type);
};

export const getBadgesByRarity = (
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
) => {
  return mockBadges.filter((badge) => badge.rarity === rarity);
};

export const getRecentCertifications = (days: number = 30) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return mockCertificates.filter(
    (cert) => new Date(cert.issuedDate) >= cutoffDate
  );
};

export const getRecentBadges = (days: number = 30) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return mockBadges.filter(
    (badge) => new Date(badge.earnedDate) >= cutoffDate
  );
};
