"use client";

import { useEffect, useState } from "react";
import { ExpertiseLevel, getBudgetForExpertise } from "@/data/jobs/mockJobPostings";

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: {
    title: string;
    description: string;
    requirements: string;
    expertiseLevel: ExpertiseLevel;
  }) => void;
}

type SubmissionState = "idle" | "loading" | "success";

export default function PostJobModal({
  isOpen,
  onClose,
  onSubmit,
}: PostJobModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [expertiseLevel, setExpertiseLevel] = useState<ExpertiseLevel>(
    "intermediate"
  );
  const [submissionState, setSubmissionState] = useState<SubmissionState>(
    "idle"
  );

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setRequirements("");
      setExpertiseLevel("intermediate");
      setSubmissionState("idle");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isFormValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    requirements.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setSubmissionState("loading");

    // Simulate 1 second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmissionState("success");

    // Call parent callback
    onSubmit({
      title,
      description,
      requirements,
      expertiseLevel,
    });

    // Auto close after 1.5 seconds
    setTimeout(() => {
      setSubmissionState("idle");
      onClose();
    }, 1500);
  };

  const budget = getBudgetForExpertise(expertiseLevel);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 border-b border-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Post a New Job</h2>
            <button
              onClick={onClose}
              disabled={submissionState !== "idle"}
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
          {submissionState === "success" ? (
            // Success State
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
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
              <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
              <p className="text-white/70">
                Your job has been posted successfully
              </p>
            </div>
          ) : (
            // Form State
            <div className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., React Frontend Developer"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-colors"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Job Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the job, responsibilities, and project details..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-colors resize-none"
                />
                <p className="text-xs text-white/50 mt-1">
                  {description.length}/500 characters
                </p>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Requirements & Skills
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="List required skills, technologies, and experience level (E.g., React, Node.js, 3+ years experience, TypeScript)"
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-colors resize-none"
                />
                <p className="text-xs text-white/50 mt-1">
                  {requirements.length}/500 characters
                </p>
              </div>

              {/* Expertise Level */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-3">
                  Expertise Level Required
                </label>
                <div className="space-y-2">
                  {(["beginner", "intermediate", "expert"] as ExpertiseLevel[]).map(
                    (level) => (
                      <label key={level} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="expertise"
                          value={level}
                          checked={expertiseLevel === level}
                          onChange={() => setExpertiseLevel(level)}
                          className="w-4 h-4 text-blue-600 border-white/20 focus:ring-0"
                        />
                        <span className="ml-3 text-white/80">
                          <span className="font-semibold capitalize">{level}</span>
                          {level === "beginner" && " - $300 - $800 (Low Complexity)"}
                          {level === "intermediate" &&
                            " - $800 - $2000 (Medium Complexity)"}
                          {level === "expert" &&
                            " - $2000 - $5000+ (High Complexity)"}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Budget Display */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-300 mb-1">Estimated Budget Range</p>
                <p className="text-xl font-bold text-blue-300">{budget}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  disabled={submissionState !== "idle"}
                  className="flex-1 py-2.5 px-4 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/8 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || submissionState === "loading"}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                    !isFormValid || submissionState === "loading"
                      ? "bg-white/5 text-white/40 border border-white/10 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/50"
                  }`}
                >
                  {submissionState === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Post Job"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
