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
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold text-white flex-1">{job.title}</h3>
        <div className="text-xs text-white/50 whitespace-nowrap">{formattedDate}</div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/70 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Expertise & Budget */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span
          className={`px-3 py-1 rounded-lg border text-xs font-medium ${getExpertiseBadgeColor(
            job.expertiseLevel
          )}`}
        >
          {getExpertiseLabel(job.expertiseLevel)}
        </span>
        <span className="text-sm text-blue-400 font-semibold">{job.budget}</span>
      </div>

      {/* Shortlisted Count */}
      <div className="p-3 bg-white/5 border border-white/10 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/60">Shortlisted Candidates</p>
          <p className="text-2xl font-bold text-white">
            {job.shortlistedCandidateIds.length}
          </p>
        </div>
      </div>

      {/* View Button */}
      {job.shortlistedCandidateIds.length > 0 ? (
        <button
          onClick={() => onViewCandidates(job)}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          View Shortlisted Candidates
        </button>
      ) : (
        <button
          disabled
          className="w-full py-2.5 px-4 bg-white/5 text-white/40 rounded-lg font-medium border border-white/10 cursor-not-allowed"
        >
          No Candidates Yet
        </button>
      )}
    </div>
  );
}
