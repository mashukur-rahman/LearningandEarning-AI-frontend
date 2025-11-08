"use client";

import Link from "next/link";

interface Job {
  id: string;
  title: string;
  client: string;
  deadline: string;
  status: string;
  progress: number;
}

interface ActiveJobsProps {
  jobs: Job[];
  dashboardType?: "freelancer" | "client";
}

export default function ActiveJobs({
  jobs,
  dashboardType = "freelancer",
}: ActiveJobsProps) {
  if (jobs.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <div className="text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-400">
            {dashboardType === "freelancer"
              ? "No active jobs yet. Browse available jobs and start earning!"
              : "No active jobs posted. Create your first job to find talented freelancers."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 to-blue-900/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:from-blue-950/40 hover:to-blue-900/20 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Title with icon */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-lg font-bold text-white">{job.title}</h3>
              </div>

              {/* Company info */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm font-semibold text-blue-300">{job.client}</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-orange-300 font-medium">{job.deadline}</p>
                </div>
              </div>

              {/* Progress bar for freelancer */}
              {dashboardType === "freelancer" && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-400">Progress</span>
                    <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-2 py-1 rounded">
                      {job.progress}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Status badge for client */}
              {dashboardType === "client" && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-bold text-green-300 uppercase tracking-wide">
                    {job.status}
                  </span>
                </div>
              )}
            </div>

            <Link
              href={`/job/${job.id}`}
              className="ml-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 border border-blue-500/50 hover:border-blue-400"
            >
              {dashboardType === "freelancer" ? "View" : "Manage"}
            </Link>
          </div>

          {/* Gradient accent */}
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}
