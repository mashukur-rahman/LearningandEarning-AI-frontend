"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Mock course data
const mockCourses = [
  {
    id: "oop",
    title: "Object-Oriented Programming Fundamentals",
    instructor: "Code Master Academy",
    description: "Learn the core concepts of Object-Oriented Programming including classes, objects, inheritance, polymorphism, and encapsulation.",
    duration: "6 hours",
    lessons: 18,
    level: "Intermediate",
    category: "Programming",
    thumbnail: "🎯",
    progress: 0,
    rating: 4.9,
    students: 3500,
  },
  {
    id: "1",
    title: "Advanced React Patterns",
    instructor: "Dev Academy",
    description: "Master advanced React patterns including hooks, context, and performance optimization techniques.",
    duration: "8 hours",
    lessons: 24,
    level: "Intermediate",
    category: "React",
    thumbnail: "📚",
    progress: 0,
    rating: 4.8,
    students: 1250,
  },
  {
    id: "2",
    title: "TypeScript Mastery",
    instructor: "Code School",
    description: "Learn TypeScript from basics to advanced topics including generics, decorators, and type manipulation.",
    duration: "12 hours",
    lessons: 36,
    level: "Advanced",
    category: "TypeScript",
    thumbnail: "⚡",
    progress: 0,
    rating: 4.9,
    students: 890,
  },
  {
    id: "3",
    title: "Next.js 16 Complete Guide",
    instructor: "Web Dev Pro",
    description: "Build modern web applications with Next.js 16, covering App Router, Server Components, and more.",
    duration: "10 hours",
    lessons: 30,
    level: "Intermediate",
    category: "Next.js",
    thumbnail: "🚀",
    progress: 0,
    rating: 4.7,
    students: 2100,
  },
  {
    id: "4",
    title: "Node.js Backend Development",
    instructor: "Backend Masters",
    description: "Create scalable backend applications with Node.js, Express, and modern best practices.",
    duration: "14 hours",
    lessons: 42,
    level: "Advanced",
    category: "Node.js",
    thumbnail: "🔧",
    progress: 0,
    rating: 4.8,
    students: 1650,
  },
  {
    id: "5",
    title: "UI/UX Design Fundamentals",
    instructor: "Design Studio",
    description: "Learn the principles of great UI/UX design and create beautiful, user-friendly interfaces.",
    duration: "6 hours",
    lessons: 18,
    level: "Beginner",
    category: "Design",
    thumbnail: "🎨",
    progress: 0,
    rating: 4.6,
    students: 3200,
  },
  {
    id: "6",
    title: "GraphQL API Development",
    instructor: "API Experts",
    description: "Master GraphQL and build efficient APIs with Apollo Server and modern tooling.",
    duration: "9 hours",
    lessons: 27,
    level: "Intermediate",
    category: "GraphQL",
    thumbnail: "🔗",
    progress: 0,
    rating: 4.9,
    students: 980,
  },
];

export default function CoursesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const categories = ["all", ...Array.from(new Set(mockCourses.map((c) => c.category)))];
  
  const filteredCourses =
    selectedCategory === "all"
      ? mockCourses
      : mockCourses.filter((course) => course.category === selectedCategory);

  const handleStartCourse = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboardType={user?.role === "freelancer" ? "freelancer" : "client"}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 md:hidden hover:bg-white/10"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Courses</h1>
                <p className="mt-1 text-sm text-gray-400">
                  Enhance your skills with our curated courses
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "border border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
              >
                {/* Course Thumbnail Placeholder */}
                <div className="relative h-48 w-full bg-gradient-to-br from-blue-950/50 to-purple-950/50 flex items-center justify-center">
                  <div className="text-6xl">{course.thumbnail}</div>
                  {/* Video play overlay - will be replaced with actual video embed */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <svg
                        className="h-8 w-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
                      {course.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <p className="mb-3 text-sm text-gray-400">
                    by {course.instructor}
                  </p>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm text-gray-300">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        course.level === "Beginner"
                          ? "bg-green-500/20 text-green-300"
                          : course.level === "Intermediate"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {course.level}
                    </span>
                  </div>

                  {/* Start Button */}
                  <button
                    onClick={() => handleStartCourse(course.id)}
                    className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Start Course
                  </button>
                </div>

                {/* Gradient accent */}
                <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl" />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="text-center">
                <p className="mb-3 text-6xl">📚</p>
                <p className="text-lg font-medium text-gray-400">
                  No courses found in this category
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

