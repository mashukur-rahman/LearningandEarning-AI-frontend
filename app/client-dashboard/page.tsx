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
import {
  getOngoingClientJobs,
  getCompletedClientJobs,
  getClientJobStats,
} from "@/data/jobs/mockClientJobs";

// Mock data with realistic company names and updated deadlines
const companyNames = [
  "TechStart Inc",
  "Digital Solutions Ltd",
  "CloudScale Systems",
  "Enterprise Solutions Co",
];

const mockActiveJobs = getOngoingClientJobs().map((job, index) => ({
  id: job.id,
  title: job.title,
  client: companyNames[index % companyNames.length],
  deadline: job.deadline ? updateDateToFuture(job.deadline) : "2025-12-20",
  status: "active" as const,
  progress: job.progress || 0,
}));

// Helper function to update dates to be after Nov 8, 2025
function updateDateToFuture(dateStr: string): string {
  const date = new Date(dateStr);
  const baseDate = new Date("2025-11-08");

  if (date < baseDate) {
    // If date is in the past, add months to make it future
    const monthDiff = (date.getMonth() - baseDate.getMonth()) +
      (12 * (date.getFullYear() - baseDate.getFullYear()));
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() + Math.abs(monthDiff) + 1);
    return newDate.toISOString().split('T')[0];
  }

  return dateStr;
}

const mockPastJobs = getCompletedClientJobs().map((job) => ({
  id: job.id,
  title: job.title,
  client: "Your Company",
  deadline: job.completionDate || "2024-11-20",
  status: "completed" as const,
  progress: 100,
}));

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
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <section className="mb-8">
            {(() => {
              const stats = getClientJobStats();
              return (
                <ClientStats
                  jobsPosted={stats.totalJobs}
                  activeJobs={stats.ongoingJobs}
                  totalSpend={`৳${(stats.totalSpent / 100000).toFixed(1)}L`}
                  completedJobs={stats.completedJobs}
                  totalApplicants={stats.totalApplicants}
                  averageRating={parseFloat(stats.averageRating as string)}
                />
              );
            })()}
          </section>

          {/* Post Job Section */}
          <section className="mb-8">
            <PostJobSection />
          </section>

          {/* In Progress Projects Section */}
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    In Progress Projects ({mockActiveJobs.length})
                  </h2>
                </div>
                <p className="text-sm text-gray-400 ml-11">
                  Active freelancers working on your projects
                </p>
              </div>
              <Link
                href="/my-posted-jobs"
                className="text-sm font-semibold text-blue-400 transition-all hover:text-blue-300 hover:gap-2 inline-flex items-center gap-1"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <ActiveJobs jobs={mockActiveJobs} dashboardType="client" />
          </section>

          {/* Past Posted Jobs Section */}
          <section className="mb-8">
            <div
              className="mb-4 flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:bg-white/10 transition-all hover:border-white/20"
              onClick={() => setShowPastJobs(!showPastJobs)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-white">
                  Completed Projects ({mockPastJobs.length})
                </h2>
              </div>
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
