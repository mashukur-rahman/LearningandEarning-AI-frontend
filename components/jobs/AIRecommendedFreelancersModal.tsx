"use client";

import { AIRecommendedFreelancer } from "@/data/jobs/mockClientJobs";
import { useState } from "react";

interface AIRecommendedFreelancersModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  freelancers: AIRecommendedFreelancer[];
  onSelectFreelancer: (freelancer: AIRecommendedFreelancer) => void;
}

export default function AIRecommendedFreelancersModal({
  isOpen,
  onClose,
  jobTitle,
  freelancers,
  onSelectFreelancer,
}: AIRecommendedFreelancersModalProps) {
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<AIRecommendedFreelancer | null>(null);

  if (!isOpen) return null;

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

  const getMatchColor = (percentage: number) => {
    if (percentage >= 95) return "from-green-600 to-emerald-600";
    if (percentage >= 85) return "from-blue-600 to-cyan-600";
    return "from-yellow-600 to-amber-600";
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 border-b border-white/10 bg-black/40 backdrop-blur-xl px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    AI Selected
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">
                  Recommended Freelancers
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  For: <span className="text-white font-medium">{jobTitle}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 inline-flex items-center justify-center rounded-lg p-2 hover:bg-white/10 transition"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {freelancers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No recommended freelancers available</p>
              </div>
            ) : (
              freelancers.map((freelancer, index) => (
                <div
                  key={freelancer.id}
                  className={`group relative p-4 rounded-xl border transition cursor-pointer ${
                    selectedFreelancer?.id === freelancer.id
                      ? "bg-white/10 border-purple-500/50"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                  onClick={() => setSelectedFreelancer(freelancer)}
                >
                  {/* Rank Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    #{index + 1}
                  </div>

                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {freelancer.avatar}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-blue-300 transition">
                            {freelancer.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {freelancer.completedProjects} projects completed
                          </p>
                        </div>
                        <div
                          className={`flex-shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-r ${getMatchColor(
                            freelancer.matchPercentage
                          )} text-white text-xs font-bold`}
                        >
                          {freelancer.matchPercentage}% Match
                        </div>
                      </div>

                      {/* Match Reason */}
                      <p className="text-sm text-blue-300 mb-3 line-clamp-2">
                        {freelancer.matchReason}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm text-gray-300">
                            {freelancer.rating.toFixed(1)}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getExpertiseBadgeColor(
                            freelancer.expertise
                          )}`}
                        >
                          {freelancer.expertise.charAt(0).toUpperCase() +
                            freelancer.expertise.slice(1)}
                        </span>

                        <div className="flex items-center gap-1.5 text-sm text-emerald-400">
                          <span>৳{freelancer.hourlyRate.toLocaleString()}/hr</span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {freelancer.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-white/10 bg-black/40 backdrop-blur-xl px-6 py-4 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition font-medium"
            >
              Close
            </button>
            {selectedFreelancer && (
              <button
                onClick={() => {
                  onSelectFreelancer(selectedFreelancer);
                  onClose();
                }}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Hire {selectedFreelancer.name}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
