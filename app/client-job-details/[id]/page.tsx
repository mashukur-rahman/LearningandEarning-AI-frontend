"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";
import {
  getClientJobById,
  type ClientJobPosting,
  type JobApplicant,
} from "@/data/jobs/mockClientJobs";

export default function ClientJobDetailsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [job, setJob] = useState<ClientJobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplicantTab, setSelectedApplicantTab] = useState<
    "all" | "shortlisted" | "hired"
  >("all");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "client") {
      router.push("/login");
    } else {
      const foundJob = getClientJobById(jobId);
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
      case "open":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      case "open":
        return "Open";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const getApplicantStatusColor = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "shortlisted":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "applied":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getExpertiseBadgeColor = (
    expertise: "beginner" | "intermediate" | "expert"
  ) => {
    switch (expertise) {
      case "beginner":
        return "bg-green-600/20 text-green-300 border-green-500/30";
      case "intermediate":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
      case "expert":
        return "bg-purple-600/20 text-purple-300 border-purple-500/30";
    }
  };

  const filteredApplicants = job?.applicants.filter((a) => {
    if (selectedApplicantTab === "all") return true;
    return a.status === selectedApplicantTab;
  }) || [];

  if (!isAuthenticated || user?.role !== "client") {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-black">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          dashboardType="client"
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
          dashboardType="client"
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
                href="/my-posted-jobs"
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
              href="/my-posted-jobs"
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
        dashboardType="client"
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
              <h1 className="text-2xl font-bold text-white">Job Management</h1>
            </div>
            <Link
              href="/my-posted-jobs"
              className="hidden rounded-lg bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-300 border border-blue-500/30 transition-all hover:bg-blue-600/30 hover:border-blue-500/50 sm:inline-block"
            >
              Back to Jobs
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Main Job Details Card */}
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
                    <p className="text-gray-400">Posted on {job.createdDate}</p>
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
                  <p className="text-xs text-gray-500 mt-1">
                    Range: ৳{job.budgetRange.min.toLocaleString()} - ৳
                    {job.budgetRange.max.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-gray-500 mb-1">Total Applicants</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {job.totalApplicants}
                  </p>
                </div>
                {job.deadline && (
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <p className="text-xs text-gray-500 mb-1">Deadline</p>
                    <p className="text-sm text-gray-300 font-medium">
                      {job.deadline}
                    </p>
                  </div>
                )}
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-gray-500 mb-1">Expertise Level</p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${getExpertiseBadgeColor(
                      job.expertiseLevel
                    )}`}
                  >
                    {job.expertiseLevel.charAt(0).toUpperCase() +
                      job.expertiseLevel.slice(1)}
                  </span>
                </div>
              </div>

              {/* Description and Requirements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Description
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {job.description}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Requirements
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {job.requirements}
                  </p>
                </div>
              </div>

              {/* Progress for Ongoing Jobs */}
              {job.status === "in_progress" && job.progress && (
                <div className="mb-8 rounded-lg bg-white/5 border border-white/10 p-6">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Project Progress
                  </h2>
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
              )}

              {/* Feedback for Completed Jobs */}
              {job.feedback && (
                <div className="mb-8 rounded-lg bg-green-500/10 border border-green-500/20 p-6">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Client Feedback
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">⭐</span>
                    <span className="text-lg font-bold text-green-300">
                      {job.rating} / 5.0
                    </span>
                  </div>
                  <p className="text-green-300 leading-relaxed">
                    {job.feedback}
                  </p>
                  {job.completionDate && (
                    <p className="text-sm text-green-400 mt-3">
                      Completed on {job.completionDate}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Applicants Section */}
          {job.applicants.length > 0 && (
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl" />

              <div className="relative">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Applicants ({job.applicants.length})
                </h2>

                {/* Applicant Status Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(["all", "shortlisted", "hired"] as const).map((status) => {
                    const count =
                      status === "all"
                        ? job.applicants.length
                        : job.applicants.filter((a) => a.status === status)
                            .length;
                    return (
                      <button
                        key={status}
                        onClick={() => setSelectedApplicantTab(status)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                          selectedApplicantTab === status
                            ? "bg-blue-600 text-white border border-blue-500"
                            : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)} (
                        {count})
                      </button>
                    );
                  })}
                </div>

                {/* Applicants List */}
                <div className="space-y-4">
                  {filteredApplicants.length === 0 ? (
                    <div className="rounded-lg bg-white/5 border border-white/10 p-6 text-center">
                      <p className="text-gray-400">
                        No {selectedApplicantTab} applicants
                      </p>
                    </div>
                  ) : (
                    filteredApplicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Avatar */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/30 text-blue-300 font-semibold flex-shrink-0">
                              {applicant.avatar}
                            </div>

                            {/* Applicant Info */}
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white">
                                {applicant.name}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span
                                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${getExpertiseBadgeColor(
                                    applicant.expertise
                                  )}`}
                                >
                                  {applicant.expertise.charAt(0).toUpperCase() +
                                    applicant.expertise.slice(1)}
                                </span>
                                <span
                                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${getApplicantStatusColor(
                                    applicant.status
                                  )}`}
                                >
                                  {applicant.status
                                    .charAt(0)
                                    .toUpperCase() +
                                    applicant.status.slice(1)}
                                </span>
                              </div>
                              <p className="mt-2 text-sm text-gray-400">
                                {applicant.bio}
                              </p>
                              <div className="mt-2 flex items-center gap-4 text-sm">
                                <span className="text-gray-400">
                                  ⭐ {applicant.rating} rating
                                </span>
                                <span className="text-gray-400">
                                  {applicant.completedProjects} projects
                                </span>
                                <span className="font-semibold text-blue-300">
                                  ৳{applicant.hourlyRate.toLocaleString()}/hr
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap">
                            {applicant.status === "hired"
                              ? "View Profile"
                              : "Review"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/my-posted-jobs"
              className="rounded-lg bg-blue-600/20 px-6 py-3 text-sm font-medium text-blue-300 border border-blue-500/30 transition-all hover:bg-blue-600/30 hover:border-blue-500/50"
            >
              ← Back to All Jobs
            </Link>
            {job.status === "open" && (
              <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700">
                Close Job
              </button>
            )}
            {job.status === "in_progress" && (
              <button className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-green-700">
                Mark as Completed
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
