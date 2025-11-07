"use client";

import { useState, useEffect } from "react";
import { mockJobs, Job } from "@/data/jobs/mockJobs";
import JobCard from "@/components/jobs/JobCard";
import JobModal from "@/components/jobs/JobModal";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";

export default function BrowseJobsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "freelancer") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  // Redirect if not authenticated or not a freelancer
  if (!isAuthenticated || !user || user.role !== "freelancer") {
    return null;
  }

  const handleApply = (job: Job) => {
    setSelectedJob(job);
  };

  const handleSuccess = (job: Job) => {
    setAppliedJobs((prev) => new Set(prev).add(job.id));
  };

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
              <h1 className="text-2xl font-bold text-white">Browse Jobs</h1>
            </div>

            {/* Right Actions */}
            <Link
              href="/freelancer-dashboard"
              className="flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors border border-white/10"
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
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Total Jobs</p>
              <p className="text-3xl font-bold text-white">
                {mockJobs.length}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Applied</p>
              <p className="text-3xl font-bold text-blue-400">
                {appliedJobs.size}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Available</p>
              <p className="text-3xl font-bold text-green-400">
                {mockJobs.length - appliedJobs.size}
              </p>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                applied={appliedJobs.has(job.id)}
              />
            ))}
          </div>

          {/* Empty State */}
          {mockJobs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-white mb-2">
                No jobs available
              </h3>
              <p className="text-white/60">
                Check back later for new opportunities
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Job Modal */}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
