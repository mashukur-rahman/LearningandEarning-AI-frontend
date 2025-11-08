"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";
import {
  getAllFreelancerJobs,
  getFreelancerJobStats,
  type FreelancerJob,
} from "@/data/jobs/mockFreelancerJobs";

type JobFilter = "all" | "active" | "pending" | "completed";

export default function MyJobsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<JobFilter>("all");
  const [jobs, setJobs] = useState<FreelancerJob[]>([]);
  const stats = getFreelancerJobStats();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "freelancer") {
      router.push("/login");
    } else {
      const allJobs = getAllFreelancerJobs();
      setJobs(allJobs);
    }
  }, [isAuthenticated, user, router]);

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusLabel = (status: string) => {
    return status
      .replace("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
              <h1 className="text-2xl font-bold text-white">My Jobs</h1>
            </div>

            {/* Back to Dashboard */}
            <Link
              href="/freelancer-dashboard"
              className="hidden rounded-lg bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-300 border border-blue-500/30 transition-all hover:bg-blue-600/30 hover:border-blue-500/50 sm:inline-block"
            >
              Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Statistics Cards */}
          <section className="mb-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm text-gray-400">Total Jobs</p>
                <p className="text-2xl font-bold text-white">
                  {stats.activeJobs + stats.completedJobs + stats.pendingJobs}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm text-gray-400">Active</p>
                <p className="text-2xl font-bold text-blue-400">
                  {stats.activeJobs}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats.completedJobs}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {stats.pendingJobs}
                </p>
              </div>
            </div>
          </section>

          {/* Filter Buttons */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["all", "active", "pending", "completed"] as JobFilter[]).map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      filter === f
                        ? "bg-blue-600 text-white border border-blue-500"
                        : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                )
              )}
            </div>
          </section>

          {/* Jobs List */}
          <section>
            {filteredJobs.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-gray-400">
                  No {filter !== "all" ? filter : ""} jobs found.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
                  >
                    {/* Gradient accent */}
                    <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl group-hover:from-blue-500/20" />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {job.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-gray-400">
                              {job.client}
                            </span>
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(
                                job.status
                              )}`}
                            >
                              {getStatusLabel(job.status)}
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/job-details/${job.id}`}
                          className="ml-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap"
                        >
                          Details
                        </Link>
                      </div>

                      {/* Job Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Budget</p>
                          <p className="text-lg font-semibold text-green-400">
                            ৳{job.budget.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Deadline</p>
                          <p className="text-sm text-gray-300">{job.deadline}</p>
                        </div>
                        {job.daysLeft && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Days Left
                            </p>
                            <p className="text-sm text-yellow-400 font-medium">
                              {job.daysLeft} days
                            </p>
                          </div>
                        )}
                        {job.completedDate && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Completed
                            </p>
                            <p className="text-sm text-green-300">
                              {job.completedDate}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar for Active Jobs */}
                      {job.status === "in_progress" && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">
                              Progress
                            </span>
                            <span className="text-xs font-medium text-gray-300">
                              {job.progress}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Skills Tags */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">
                          Required Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-300 border border-blue-500/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description Preview */}
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {job.description}
                      </p>

                      {/* Feedback for Completed Jobs */}
                      {job.feedback && (
                        <div className="mt-4 rounded-lg bg-green-500/10 border border-green-500/20 p-3">
                          <p className="text-xs text-green-400 font-medium mb-1">
                            Client Feedback ⭐ {job.rating}
                          </p>
                          <p className="text-sm text-green-300">{job.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
