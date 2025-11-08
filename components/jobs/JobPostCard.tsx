"use client";

import { JobPosting, ExpertiseLevel } from "@/data/jobs/mockJobPostings";

interface JobPostCardProps {
  job: JobPosting;
  onViewCandidates: (job: JobPosting) => void;
}

const getExpertiseBadgeColor = (expertise: ExpertiseLevel) => {
  switch (expertise) {
    case "beginner":
      return "bg-green-500/20 border-green-500/30 text-green-300";
    case "intermediate":
      return "bg-yellow-500/20 border-yellow-500/30 text-yellow-300";
    case "expert":
      return "bg-purple-500/20 border-purple-500/30 text-purple-300";
    default:
      return "bg-blue-500/20 border-blue-500/30 text-blue-300";
  }
};

const getExpertiseLabel = (expertise: ExpertiseLevel): string => {
  switch (expertise) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "expert":
      return "Expert";
    default:
      return "Not Specified";
  }
};

export default function JobPostCard({
  job,
  onViewCandidates,
}: JobPostCardProps) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" }
  );

  return (
    <div className="group rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-md p-6 hover:border-purple-500/40 hover:from-purple-500/15 hover:to-blue-500/15 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-white leading-tight flex-1">{job.title}</h3>
        <span
          className={`px-2.5 py-1 rounded-full border text-xs font-semibold whitespace-nowrap ${getExpertiseBadgeColor(
            job.expertiseLevel
          )}`}
        >
          {getExpertiseLabel(job.expertiseLevel)}
        </span>
      </div>

      {/* Description Snippet */}
      <p className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* Budget & Date */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
        <span className="text-sm font-bold text-amber-400">{job.budget}</span>
        <div className="text-xs text-white/40">{formattedDate}</div>
      </div>

      {/* Candidates Count with AI Badge */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-xs font-semibold text-blue-300">AI Recommended</p>
        </div>
        <p className="text-3xl font-bold text-amber-400">
          {job.shortlistedCandidateIds.length}
        </p>
      </div>

      {/* View Button - Enhanced */}
      {job.shortlistedCandidateIds.length > 0 ? (
        <button
          onClick={() => onViewCandidates(job)}
          className="w-full py-3 px-4 bg-purple-800 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 border border-purple-600/40 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
        >
          View Candidates
        </button>
      ) : (
        <button
          disabled
          className="w-full py-3 px-4 bg-white/5 text-white/40 rounded-lg font-medium border border-white/10 cursor-not-allowed"
        >
          No Candidates Yet
        </button>
      )}
    </div>
  );
}
