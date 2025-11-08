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
type ProfileModalState = "closed" | "open" | "sending" | "sent";

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
  const [profileModalState, setProfileModalState] = useState<ProfileModalState>("closed");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  if (!isOpen || !job) return null;

  // Get candidate details excluding accepted ones
  const shortlistedCandidates = job.shortlistedCandidateIds
    .map((id) => mockCandidates.find((c) => c.id === id))
    .filter((c): c is Candidate => c !== undefined && !acceptedCandidateIds.includes(c.id));

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setProfileModalState("open");
  };

  const handleGoBack = () => {
    setProfileModalState("closed");
    setSelectedCandidate(null);
  };

  const handleSendOffer = async () => {
    if (!selectedCandidate) return;

    setProfileModalState("sending");

    // Immediately add to accepted list to remove from display
    setAcceptedCandidateIds((prev) => [...prev, selectedCandidate.id]);

    // Simulate sending offer process
    await new Promise((resolve) => setTimeout(resolve, 800));

    setProfileModalState("sent");
    setAcceptedCandidateName(selectedCandidate.name);
    setShowSuccessMessage(true);

    // Close modals after 2 seconds
    setTimeout(() => {
      if (job && onJobAccepted) {
        onJobAccepted(job.id);
      }
      onClose();
      setAcceptanceState("idle");
      setShowSuccessMessage(false);
      setAcceptedCandidateName("");
      setAcceptedCandidateIds([]);
      setProfileModalState("closed");
      setSelectedCandidate(null);
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
                    onClick={() => handleViewProfile(candidate)}
                    className="w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Candidate Profile Modal */}
      {profileModalState !== "closed" && selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl">
            {/* Header */}
            <div className="sticky top-0 bg-black/80 border-b border-white/10 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Candidate Profile</h2>
                <button
                  onClick={handleGoBack}
                  disabled={profileModalState === "sending"}
                  className="text-white/60 hover:text-white transition-colors disabled:cursor-not-allowed"
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
              {profileModalState === "sent" ? (
                // Success State with Celebration Vibes
                <div className="flex flex-col items-center justify-center py-12 text-center relative">
                  {/* Celebration Confetti Elements */}
                  <style>{`
                    @keyframes popIn {
                      0% { transform: scale(0) rotateZ(0deg); opacity: 0; }
                      50% { opacity: 1; }
                      100% { transform: scale(1) rotateZ(360deg); opacity: 0; }
                    }
                    @keyframes float {
                      0% { transform: translateY(0px) rotateZ(0deg); opacity: 1; }
                      100% { transform: translateY(-100px) rotateZ(180deg); opacity: 0; }
                    }
                    .confetti {
                      position: absolute;
                      pointer-events: none;
                    }
                    .confetti-piece {
                      display: inline-block;
                      width: 10px;
                      height: 10px;
                      border-radius: 2px;
                      animation: float 3s ease-in forwards;
                    }
                  `}</style>

                  {/* Animated Confetti Pieces */}
                  <div className="confetti" style={{ left: "10%", top: "20%", animation: "popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                    <div className="confetti-piece" style={{ backgroundColor: "#10b981", animationDelay: "0ms" }} />
                  </div>
                  <div className="confetti" style={{ right: "10%", top: "20%", animation: "popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards" }}>
                    <div className="confetti-piece" style={{ backgroundColor: "#3b82f6", animationDelay: "0.1s" }} />
                  </div>
                  <div className="confetti" style={{ left: "20%", top: "10%", animation: "popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards" }}>
                    <div className="confetti-piece" style={{ backgroundColor: "#a855f7", animationDelay: "0.2s" }} />
                  </div>
                  <div className="confetti" style={{ right: "20%", top: "10%", animation: "popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards" }}>
                    <div className="confetti-piece" style={{ backgroundColor: "#f59e0b", animationDelay: "0.3s" }} />
                  </div>

                  {/* Success Icon with Pulse Animation */}
                  <div className="relative mb-6 z-10">
                    <div className="absolute inset-0 w-16 h-16 bg-green-500/20 rounded-full animate-pulse"></div>
                    <div className="w-16 h-16 bg-green-500/30 border-2 border-green-400 rounded-full flex items-center justify-center relative">
                      <svg
                        className="w-8 h-8 text-green-400 animate-bounce"
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
                  </div>

                  {/* Success Text with Animation */}
                  <h3 className="text-3xl font-bold text-white mb-2 animate-bounce" style={{ animationDelay: "0.1s" }}>
                    Offer Sent! 🎉
                  </h3>
                  <p className="text-white/70 mb-4 text-lg">
                    Congratulations! Offer has been sent to
                  </p>
                  <p className="text-xl font-bold text-green-400">
                    {selectedCandidate.name}
                  </p>
                </div>
              ) : (
                <>
                  {/* Candidate Info */}
                  <div className="mb-6">
                    <div className="flex items-start gap-4 mb-6">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl font-bold text-white">
                          {selectedCandidate.avatar}
                        </span>
                      </div>

                      {/* Name and Rating */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {selectedCandidate.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-white">
                            {selectedCandidate.rating}
                          </span>
                          <span className="text-yellow-400">★</span>
                        </div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getExpertiseBadgeColor(
                            selectedCandidate.expertise
                          )}`}
                        >
                          {getExpertiseLabel(selectedCandidate.expertise)}
                        </span>
                      </div>
                    </div>

                    {/* Contact & Location Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {selectedCandidate.email && (
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-xs text-white/60 mb-2">Email</p>
                          <p className="text-sm text-blue-400 break-all">{selectedCandidate.email}</p>
                        </div>
                      )}
                      {selectedCandidate.location && (
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-xs text-white/60 mb-2">Location</p>
                          <p className="text-sm text-white/80">{selectedCandidate.location}</p>
                        </div>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-xs text-white/60 mb-2">Completed Projects</p>
                        <p className="text-2xl font-bold text-white">
                          {selectedCandidate.completedProjects}
                        </p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-xs text-white/60 mb-2">Hourly Rate</p>
                        <p className="text-2xl font-bold text-blue-400">
                          {selectedCandidate.hourlyRate}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                      <p className="text-sm font-semibold text-white mb-2">About</p>
                      <p className="text-sm text-white/80">{selectedCandidate.bio}</p>
                    </div>

                    {/* Reviews Section */}
                    {selectedCandidate.reviews && selectedCandidate.reviews.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Client Reviews</h4>
                        <div className="space-y-3">
                          {selectedCandidate.reviews.map((review, index) => (
                            <div
                              key={index}
                              className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p className="font-semibold text-white">{review.clientName}</p>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-bold text-white">
                                    {review.rating}
                                  </span>
                                  <span className="text-yellow-400">★</span>
                                </div>
                              </div>
                              <p className="text-sm text-white/80 italic">
                                "{review.feedback}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleGoBack}
                      disabled={profileModalState === "sending"}
                      className="flex-1 py-3 px-4 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 disabled:cursor-not-allowed transition-colors"
                    >
                      Go Back
                    </button>
                    <button
                      onClick={handleSendOffer}
                      disabled={profileModalState === "sending"}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                        profileModalState === "sending"
                          ? "bg-blue-600/50 text-white/40 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {profileModalState === "sending" ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Offer...
                        </span>
                      ) : (
                        "Send Offer"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
