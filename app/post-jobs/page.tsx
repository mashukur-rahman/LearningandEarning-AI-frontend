"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PostJobModal from "@/components/jobs/PostJobModal";
import JobPostCard from "@/components/jobs/JobPostCard";
import ShortlistedUsersModal from "@/components/jobs/ShortlistedUsersModal";
import {
  mockJobPostings,
  JobPosting,
  getBudgetForExpertise,
  ExpertiseLevel,
} from "@/data/jobs/mockJobPostings";
import Link from "next/link";

export default function PostJobsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdJobs, setCreatedJobs] = useState<JobPosting[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showCandidatesModal, setShowCandidatesModal] = useState(false);
  const [acceptedDummyJobIds, setAcceptedDummyJobIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "client") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  // Redirect if not authenticated or not a client
  if (!isAuthenticated || !user || user.role !== "client") {
    return null;
  }

  const handleCreateJob = (jobData: {
    title: string;
    description: string;
    requirements: string;
    expertiseLevel: ExpertiseLevel;
  }) => {
    const newJob: JobPosting = {
      id: `created-${Date.now()}`,
      title: jobData.title,
      description: jobData.description,
      requirements: jobData.requirements,
      expertiseLevel: jobData.expertiseLevel,
      budget: getBudgetForExpertise(jobData.expertiseLevel),
      createdAt: new Date(),
      createdBy: "user",
      shortlistedCandidateIds: [], // Start with 0 candidates
    };

    setCreatedJobs([newJob, ...createdJobs]);
  };

  const handleViewCandidates = (job: JobPosting) => {
    setSelectedJob(job);
    setShowCandidatesModal(true);
  };

  const handleJobAccepted = (jobId: string) => {
    setAcceptedDummyJobIds((prev) => [...prev, jobId]);
  };

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
              <h1 className="text-2xl font-bold text-white">Post Jobs</h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Job
              </button>
              <Link
                href="/client-dashboard"
                className="hidden sm:flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors border border-white/10"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Active Job Listings Section */}
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">Active Job Listings</h2>
              <p className="text-white/60">
                Manage your job postings and monitor AI-matched candidates
              </p>
            </div>

            {createdJobs.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-blue-500/40 hover:bg-white/8 hover:shadow-lg hover:shadow-blue-500/30">
                <svg
                  className="w-16 h-16 text-white/40 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to post a new job?
                </h3>
                <p className="text-white/60 mb-6">
                  Click the button below to create a new job posting and find talented freelancers
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add a New Job
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdJobs.map((job) => (
                  <JobPostCard
                    key={job.id}
                    job={job}
                    onViewCandidates={handleViewCandidates}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Featured Job Opportunities Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Featured AI Candidates
              </h2>
              <p className="text-white/60">
                Browse AI-recommended qualified candidates ready to work on your projects
              </p>
            </div>

            {/* AI-Powered Matching Explanation */}
            <div className="mb-8 rounded-xl border border-blue-500/20 bg-blue-500/10 backdrop-blur-md p-5 flex items-start gap-4">
              <svg
                className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-blue-300 mb-1">
                  AI-Powered Matching:
                </h3>
                <p className="text-sm text-blue-200/70 leading-relaxed">
                  Our AI analyzes your job requirements and intelligently matches you with the most qualified candidates from our platform. Post a job above and let our system find your perfect match!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockJobPostings
                .filter((job) => !acceptedDummyJobIds.includes(job.id))
                .map((job) => (
                  <JobPostCard
                    key={job.id}
                    job={job}
                    onViewCandidates={handleViewCandidates}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* Create Job Modal */}
      <PostJobModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateJob}
      />

      {/* View Candidates Modal */}
      <ShortlistedUsersModal
        job={selectedJob}
        isOpen={showCandidatesModal}
        onClose={() => {
          setShowCandidatesModal(false);
          setSelectedJob(null);
        }}
        onJobAccepted={handleJobAccepted}
      />
    </div>
  );
}
