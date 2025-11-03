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
          className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <p className="mt-1 text-sm text-gray-400">Client: {job.client}</p>
              <p className="mt-1 text-sm text-gray-500">
                Deadline: {job.deadline}
              </p>

              {/* Progress bar for freelancer */}
              {dashboardType === "freelancer" && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-medium text-gray-300">
                      {job.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Status badge for client */}
              {dashboardType === "client" && (
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      job.status === "active" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  <span className="text-xs font-medium text-gray-400">
                    {job.status}
                  </span>
                </div>
              )}
            </div>

            <Link
              href={`/job/${job.id}`}
              className="ml-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {dashboardType === "freelancer" ? "View" : "Manage"}
            </Link>
          </div>

          {/* Gradient accent */}
          <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl" />
        </div>
      ))}
    </div>
  );
}
