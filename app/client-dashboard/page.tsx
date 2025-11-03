"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ClientStats from "@/components/dashboard/ClientStats";
import ActiveJobs from "@/components/dashboard/ActiveJobs";
import Messages from "@/components/dashboard/Messages";
import PostJobSection from "@/components/dashboard/PostJobSection";
import Link from "next/link";

// Mock data
const mockActiveJobs = [
  {
    id: "1",
    title: "Full Stack Developer needed for SaaS",
    client: "Your Company",
    deadline: "2024-12-20",
    status: "active",
    progress: 0,
  },
  {
    id: "2",
    title: "UI/UX Designer for Mobile App",
    client: "Your Company",
    deadline: "2024-12-15",
    status: "active",
    progress: 0,
  },
];

const mockPastJobs = [
  {
    id: "3",
    title: "E-commerce Platform Development",
    client: "Your Company",
    deadline: "2024-11-20",
    status: "completed",
    progress: 100,
  },
  {
    id: "4",
    title: "Marketing Website Redesign",
    client: "Your Company",
    deadline: "2024-11-15",
    status: "completed",
    progress: 100,
  },
  {
    id: "5",
    title: "API Integration Project",
    client: "Your Company",
    deadline: "2024-11-10",
    status: "completed",
    progress: 100,
  },
];

const mockMessages = [
  {
    id: "1",
    senderName: "Alex - React Developer",
    preview: "Hi! I'm interested in your full stack position. I have...",
    timestamp: "5 min ago",
    isUnread: true,
  },
  {
    id: "2",
    senderName: "Sarah - UI/UX Designer",
    preview: "I can help with your mobile app design. Here are my...",
    timestamp: "2 hours ago",
    isUnread: true,
  },
  {
    id: "3",
    senderName: "Mike - Freelancer",
    preview: "Thanks for the feedback on my submission!",
    timestamp: "1 day ago",
    isUnread: false,
  },
];

export default function ClientDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPastJobs, setShowPastJobs] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "client") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "client") {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboardType="client"
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
                Welcome, {user?.name.split(" ")[0]}!
              </h1>
            </div>

            {/* Quick Actions */}
            <Link
              href="/post-job"
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:inline-block"
            >
              Post a Job
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <section className="mb-8">
            <ClientStats
              jobsPosted={8}
              activeJobs={mockActiveJobs.length}
              totalSpend="$12,450"
            />
          </section>

          {/* Post Job Section */}
          <section className="mb-8">
            <PostJobSection />
          </section>

          {/* Active Posted Jobs Section */}
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Active Jobs ({mockActiveJobs.length})
              </h2>
              <Link
                href="/my-posted-jobs"
                className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                View All
              </Link>
            </div>
            <ActiveJobs jobs={mockActiveJobs} dashboardType="client" />
          </section>

          {/* Past Posted Jobs Section */}
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

          {/* Messages */}
          <section className="mb-8">
            <Messages messages={mockMessages} />
          </section>
        </div>
      </main>
    </div>
  );
}
