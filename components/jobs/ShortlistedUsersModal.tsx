"use client";

import { useState } from "react";
import { JobPosting } from "@/data/jobs/mockJobPostings";
import { Candidate, mockCandidates } from "@/data/jobs/mockCandidates";

interface ShortlistedUsersModalProps {
  job: JobPosting | null;
  isOpen: boolean;
  onClose: () => void;
  onJobAccepted?: (jobId: string) => void;
}

type AcceptanceState = "idle" | "accepting" | "accepted";

const getExpertiseBadgeColor = (expertise: string) => {
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

const getExpertiseLabel = (expertise: string): string => {
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

export default function ShortlistedUsersModal({
  job,
  isOpen,
  onClose,
  onJobAccepted,
}: ShortlistedUsersModalProps) {
  const [acceptedCandidateIds, setAcceptedCandidateIds] = useState<string[]>([]);
  const [acceptanceState, setAcceptanceState] = useState<AcceptanceState>(
    "idle"
  );
  const [acceptedCandidateName, setAcceptedCandidateName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!isOpen || !job) return null;

  // Get candidate details excluding accepted ones
  const shortlistedCandidates = job.shortlistedCandidateIds
    .map((id) => mockCandidates.find((c) => c.id === id))
    .filter((c): c is Candidate => c !== undefined && !acceptedCandidateIds.includes(c.id));

  const handleAcceptOffer = async (candidateId: string, candidateName: string) => {
    setAcceptanceState("accepting");

    // Immediately add to accepted list to remove from display
    setAcceptedCandidateIds((prev) => [...prev, candidateId]);

    // Simulate acceptance process
    await new Promise((resolve) => setTimeout(resolve, 800));

    setAcceptanceState("accepted");
    setAcceptedCandidateName(candidateName);
    setShowSuccessMessage(true);

    // Close modal after 2 seconds
    setTimeout(() => {
      if (job && onJobAccepted) {
        onJobAccepted(job.id);
      }
      onClose();
      setAcceptanceState("idle");
      setShowSuccessMessage(false);
      setAcceptedCandidateName("");
      setAcceptedCandidateIds([]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 border-b border-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{job.title}</h2>
              <p className="text-sm text-white/60">
                {shortlistedCandidates.length} Shortlisted Candidates
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success Message Banner */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/30 border border-green-500/50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-green-300 font-medium">This job is accepted!</p>
                <p className="text-green-300/70 text-sm">
                  {acceptedCandidateName} has been selected for this position
                </p>
              </div>
            </div>
          )}

          {shortlistedCandidates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60">No candidates shortlisted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {shortlistedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/8 hover:border-white/20 transition-all"
                >
                  {/* Candidate Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-white">
                          {candidate.avatar}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white">
                          {candidate.name}
                        </h3>
                        <p className="text-xs text-white/50">
                          {candidate.completedProjects} completed projects
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 justify-end">
                        <span className="text-lg font-bold text-white">
                          {candidate.rating}
                        </span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                      <p className="text-xs text-white/60 mb-1">Expertise Level</p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getExpertiseBadgeColor(
                          candidate.expertise
                        )}`}
                      >
                        {getExpertiseLabel(candidate.expertise)}
                      </span>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                      <p className="text-xs text-white/60 mb-1">Hourly Rate</p>
                      <p className="text-sm font-semibold text-blue-400">
                        {candidate.hourlyRate}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-3 p-2 bg-white/5 rounded border border-white/10">
                    <p className="text-sm text-white/80">{candidate.bio}</p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleAcceptOffer(candidate.id, candidate.name)}
                    disabled={acceptanceState !== "idle"}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      acceptanceState !== "idle"
                        ? "bg-white/5 text-white/40 cursor-not-allowed border border-white/10"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {acceptanceState === "accepting" ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Accepting...
                      </span>
                    ) : (
                      "View Profile & Send Offer"
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
