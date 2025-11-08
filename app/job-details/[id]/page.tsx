"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";
import { getFreelancerJobById, type FreelancerJob } from "@/data/jobs/mockFreelancerJobs";

export default function JobDetailsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [job, setJob] = useState<FreelancerJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "freelancer") {
      router.push("/login");
    } else {
      const foundJob = getFreelancerJobById(jobId);
      setJob(foundJob || null);
      setIsLoading(false);
    }
  }, [isAuthenticated, user, router, jobId]);

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

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-black">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          dashboardType="freelancer"
        />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading job details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex h-screen overflow-hidden bg-black">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          dashboardType="freelancer"
        />
        <main className="flex-1">
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
                <h1 className="text-2xl font-bold text-white">Job Details</h1>
              </div>
              <Link
                href="/my-jobs"
                className="text-blue-400 hover:text-blue-300"
              >
                Back to Jobs
              </Link>
            </div>
          </header>
          <div className="p-8 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-400 mb-4">Job not found</p>
            <Link
              href="/my-jobs"
              className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Back to Jobs
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboardType="freelancer"
      />

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
              <h1 className="text-2xl font-bold text-white">Job Details</h1>
            </div>
            <Link
              href="/my-jobs"
              className="hidden rounded-lg bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-300 border border-blue-500/30 transition-all hover:bg-blue-600/30 hover:border-blue-500/50 sm:inline-block"
            >
              Back to Jobs
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md mb-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl" />

            <div className="relative">
              {/* Header Section */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {job.title}
                    </h1>
                    <p className="text-lg text-gray-400">{job.client}</p>
                  </div>
                  <span
                    className={`inline-block rounded-full px-4 py-2 text-sm font-medium border ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {getStatusLabel(job.status)}
                  </span>
                </div>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="text-2xl font-bold text-green-400">
                    ৳{job.budget.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-gray-500 mb-1">Deadline</p>
                  <p className="text-sm text-gray-300 font-medium">
                    {job.deadline}
                  </p>
                </div>
                {job.daysLeft && (
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <p className="text-xs text-gray-500 mb-1">Days Left</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {job.daysLeft}
                    </p>
                  </div>
                )}
                {job.hourlyRate && (
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <p className="text-xs text-gray-500 mb-1">Hourly Rate</p>
                    <p className="text-lg font-bold text-blue-400">
                      ৳{job.hourlyRate.toLocaleString()}/hr
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Description
                </h2>
                <p className="text-gray-300 leading-relaxed">{job.description}</p>
              </div>

              {/* Skills Required */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300 border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress for Active Jobs */}
              {job.status === "in_progress" && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Progress
                  </h2>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400">Overall Progress</span>
                      <span className="text-2xl font-bold text-blue-400">
                        {job.progress}%
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback for Completed Jobs */}
              {job.feedback && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Client Feedback
                  </h2>
                  <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">⭐</span>
                      <span className="text-lg font-bold text-green-300">
                        {job.rating} / 5.0
                      </span>
                    </div>
                    <p className="text-green-300 leading-relaxed">
                      {job.feedback}
                    </p>
                    {job.completedDate && (
                      <p className="text-sm text-green-400 mt-3">
                        Completed on {job.completedDate}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Rating Info */}
              {job.rating && !job.feedback && (
                <div className="mb-8">
                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-6">
                    <span className="text-lg font-semibold text-blue-300">
                      Client Rating: {job.rating} ⭐
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              href="/my-jobs"
              className="rounded-lg bg-blue-600/20 px-6 py-3 text-sm font-medium text-blue-300 border border-blue-500/30 transition-all hover:bg-blue-600/30 hover:border-blue-500/50"
            >
              ← Back to All Jobs
            </Link>
            {job.status === "in_progress" && (
              <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700">
                Update Progress
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
