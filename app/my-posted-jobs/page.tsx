"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";
import {
  getAllClientJobs,
  getClientJobStats,
  getAIRecommendedFreelancers,
  type ClientJobPosting,
  type AIRecommendedFreelancer,
} from "@/data/jobs/mockClientJobs";
import AIRecommendedFreelancersModal from "@/components/jobs/AIRecommendedFreelancersModal";

type JobFilter = "all" | "open" | "completed";

export default function MyPostedJobsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<JobFilter>("all");
  const [jobs, setJobs] = useState<ClientJobPosting[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedJobForAI, setSelectedJobForAI] = useState<ClientJobPosting | null>(null);
  const [recommendedFreelancers, setRecommendedFreelancers] = useState<AIRecommendedFreelancer[]>([]);
  const stats = getClientJobStats();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "client") {
      router.push("/login");
    } else {
      const allJobs = getAllClientJobs();
      setJobs(allJobs);
    }
  }, [isAuthenticated, user, router]);

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    if (filter === "open") return job.status === "open";
    if (filter === "completed") return job.status === "completed";
    return false;
  });

  const handleOpenJobClick = (job: ClientJobPosting) => {
    setSelectedJobForAI(job);
    const aiFreelancers = getAIRecommendedFreelancers(job.id);
    setRecommendedFreelancers(aiFreelancers);
    setShowAIModal(true);
  };

  const handleSelectFreelancer = (freelancer: AIRecommendedFreelancer) => {
    console.log(`Selected freelancer: ${freelancer.name} for job: ${selectedJobForAI?.title}`);
    // Here you can add logic to update the job with the selected freelancer
    // For now, just close the modal
  };

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
              <h1 className="text-2xl font-bold text-white">My Posted Jobs</h1>
            </div>

            {/* Back to Dashboard */}
            <Link
              href="/client-dashboard"
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm text-gray-400">Total Posted</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalJobs}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm text-gray-400">Open</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {stats.openJobs}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats.completedJobs}
                </p>
              </div>
            </div>
          </section>

          {/* Filter Buttons */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["all", "open", "completed"] as JobFilter[]).map(
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
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(
                                job.status
                              )}`}
                            >
                              {getStatusLabel(job.status)}
                            </span>
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
                        <div className="flex gap-2 ml-4">
                          {job.status === "open" ? (
                            <button
                              onClick={() => handleOpenJobClick(job)}
                              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-indigo-500 hover:to-purple-500 whitespace-nowrap gap-2"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              AI Recommendations
                            </button>
                          ) : (
                            <Link
                              href={`/client-job-details/${job.id}`}
                              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap"
                            >
                              Manage
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Job Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Budget</p>
                          <p className="text-lg font-semibold text-green-400">
                            ৳{job.budget.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Applicants
                          </p>
                          <p className="text-sm text-gray-300">
                            <span className="text-2xl font-bold text-blue-300">
                              {job.totalApplicants}
                            </span>{" "}
                            applied
                          </p>
                        </div>
                        {job.deadline && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Deadline
                            </p>
                            <p className="text-sm text-gray-300">
                              {job.deadline}
                            </p>
                          </div>
                        )}
                        {job.completionDate && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Completed
                            </p>
                            <p className="text-sm text-green-300">
                              {job.completionDate}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar for Ongoing Jobs */}
                      {job.status === "in_progress" && job.progress && (
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

                      {/* Description Preview */}
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {job.description}
                      </p>

                      {/* Selected Freelancer Info */}
                      {job.selectedFreelancer && (
                        <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 mb-4">
                          <p className="text-xs text-blue-400 font-medium mb-2">
                            Selected Freelancer
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {job.selectedFreelancer.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                ⭐ {job.selectedFreelancer.rating} •{" "}
                                {job.selectedFreelancer.completedProjects} projects
                              </p>
                            </div>
                            <span className="text-sm font-bold text-blue-300">
                              ৳{job.selectedFreelancer.hourlyRate}/hr
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Client Feedback for Completed Jobs */}
                      {job.feedback && (
                        <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
                          <p className="text-xs text-green-400 font-medium mb-1">
                            Your Feedback ⭐ {job.rating}
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

      {/* AI Recommended Freelancers Modal */}
      {selectedJobForAI && (
        <AIRecommendedFreelancersModal
          isOpen={showAIModal}
          onClose={() => {
            setShowAIModal(false);
            setSelectedJobForAI(null);
          }}
          jobTitle={selectedJobForAI.title}
          freelancers={recommendedFreelancers}
          onSelectFreelancer={handleSelectFreelancer}
        />
      )}
    </div>
  );
}
