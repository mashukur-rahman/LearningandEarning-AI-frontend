"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import FreelancerStats from "@/components/dashboard/FreelancerStats";
import ActiveJobs from "@/components/dashboard/ActiveJobs";
import Messages from "@/components/dashboard/Messages";
import Courses from "@/components/dashboard/Courses";
import Link from "next/link";

// Mock data
const mockActiveJobs = [
  {
    id: "1",
    title: "React Dashboard Development",
    client: "Tech Startup Inc",
    deadline: "2024-12-20",
    status: "in_progress",
    progress: 65,
  },
  {
    id: "2",
    title: "Mobile App UI Design",
    client: "Creative Agency Co",
    deadline: "2024-12-10",
    status: "in_progress",
    progress: 40,
  },
];

const mockPastJobs = [
  {
    id: "3",
    title: "E-commerce Website",
    client: "Online Store Ltd",
    deadline: "2024-11-15",
    status: "completed",
    progress: 100,
  },
  {
    id: "4",
    title: "API Integration",
    client: "Software Co",
    deadline: "2024-11-10",
    status: "completed",
    progress: 100,
  },
  {
    id: "5",
    title: "Database Optimization",
    client: "Data Systems",
    deadline: "2024-11-05",
    status: "completed",
    progress: 100,
  },
];

const mockMessages = [
  {
    id: "1",
    senderName: "John from Tech Startup",
    preview: "Great work on the dashboard! Can you add the...",
    timestamp: "2 min ago",
    isUnread: true,
  },
  {
    id: "2",
    senderName: "Sarah from Creative Agency",
    preview: "The UI designs look amazing! Let's discuss the...",
    timestamp: "1 hour ago",
    isUnread: true,
  },
  {
    id: "3",
    senderName: "Mike from Online Store",
    preview: "Thank you for completing the project on time!",
    timestamp: "1 day ago",
    isUnread: false,
  },
];

const mockCourses = [
  {
    id: "1",
    title: "Advanced React Patterns",
    instructor: "Dev Academy",
    progress: 75,
    category: "React",
  },
  {
    id: "2",
    title: "TypeScript Mastery",
    instructor: "Code School",
    progress: 50,
    category: "TypeScript",
  },
];

export default function FreelancerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPastJobs, setShowPastJobs] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "freelancer") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "freelancer") {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboardType="freelancer"
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
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user?.name.split(" ")[0]}!
              </h1>
            </div>

            {/* Quick Actions */}
            <Link
              href="/jobs"
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:inline-block"
            >
              Browse Jobs
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <section className="mb-8">
            <FreelancerStats jobsCompleted={12} level="Pro" />
          </section>

          {/* Active Jobs Section */}
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Active Jobs ({mockActiveJobs.length})
              </h2>
              <Link
                href="/my-jobs"
                className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                View All
              </Link>
            </div>
            <ActiveJobs jobs={mockActiveJobs} dashboardType="freelancer" />
          </section>

          {/* Past Jobs Section */}
          <section className="mb-8">
            <div
              className="mb-4 flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:bg-white/10"
              onClick={() => setShowPastJobs(!showPastJobs)}
            >
              <h2 className="text-lg font-semibold text-white">
                Past Jobs ({mockPastJobs.length})
              </h2>
              <div
                className={`transition-transform ${
                  showPastJobs ? "rotate-180" : ""
                }`}
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            {showPastJobs && (
              <div className="space-y-3">
                {mockPastJobs.map((job) => (
                  <div
                    key={job.id}
                    className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{job.title}</h3>
                        <p className="mt-1 text-sm text-gray-400">
                          Completed on {job.deadline}
                        </p>
                      </div>
                      <span className="inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Two Column Layout for Messages and Courses */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Messages */}
            <section>
              <Messages messages={mockMessages} />
            </section>

            {/* Courses */}
            <section>
              <Courses courses={mockCourses} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
