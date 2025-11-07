"use client";

import { useEffect, useState } from "react";
import { Job } from "@/data/jobs/mockJobs";
import { mcqQuestions } from "@/data/jobs/mcqQuestions";

interface JobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (job: Job) => void;
}

type SubmissionState = "idle" | "loading" | "success";

export default function JobModal({
  job,
  isOpen,
  onClose,
  onSuccess,
}: JobModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [projectLink, setProjectLink] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>(
    "idle"
  );

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setProjectLink("");
      setSubmissionState("idle");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isLinkValid = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const currentQuestion = mcqQuestions[currentQuestionIndex];
  const allQuestionsAnswered = mcqQuestions.every(
    (q) => selectedAnswers[q.id]
  );
  const isFormValid =
    allQuestionsAnswered && projectLink.trim() !== "" && isLinkValid(projectLink);

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < mcqQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmissionState("loading");

    // Simulate 1 second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmissionState("success");

    // Auto close after 2 seconds
    setTimeout(() => {
      onSuccess(job);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 border-b border-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {job.title}
              </h2>
              <p className="text-sm text-white/60">{job.company}</p>
            </div>
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
              <p className="text-white/70 mb-4">
                Your profile got shortlisted for this job
              </p>
              <p className="text-sm text-white/50">
                Redirecting you back...
              </p>
            </div>
          ) : (
            // Form State
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Side - MCQ Section */}
              <div className="lg:col-span-2">
                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white/80">
                      Question {currentQuestionIndex + 1} of{" "}
                      {mcqQuestions.length}
                    </h3>
                    <div className="flex gap-1">
                      {mcqQuestions.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-8 rounded-full transition-colors ${
                            index <= currentQuestionIndex
                              ? "bg-blue-500"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {currentQuestion.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/8 hover:border-white/20 transition-all"
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option.id}
                          checked={selectedAnswers[currentQuestion.id] === option.id}
                          onChange={() => handleAnswerSelect(option.id)}
                          className="w-4 h-4 text-blue-600 border-white/20 focus:ring-0"
                        />
                        <span className="ml-3 text-white/80">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 py-2 px-4 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/8 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={
                      currentQuestionIndex === mcqQuestions.length - 1 ||
                      !selectedAnswers[currentQuestion.id]
                    }
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Right Side - Project Section (Sticky) */}
              <div className="lg:col-span-1">
                <div className="sticky top-0 space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Project Requirements
                    </h4>

                    {/* Instructions */}
                    <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-xs text-blue-300 leading-relaxed">
                        ℹ️ Below is the project description. Complete the project according to these requirements and submit the link to your completed work.
                      </p>
                    </div>

                    {/* Job Description (Read-only) */}
                    <div className="mb-4">
                      <label className="block text-sm text-white/80 mb-2 font-semibold">
                        Project Description
                      </label>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-sm text-white/90 leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    {/* Project Link Input */}
                    <div className="mb-4">
                      <label className="block text-sm text-white/80 mb-2 font-semibold">
                        Your Project Link
                      </label>
                      <input
                        type="url"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        placeholder="https://github.com/yourname/project or https://your-project.com"
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-colors"
                      />
                      {projectLink && !isLinkValid(projectLink) && (
                        <p className="text-xs text-red-400 mt-2">
                          ❌ Please enter a valid URL
                        </p>
                      )}
                      {projectLink && isLinkValid(projectLink) && (
                        <p className="text-xs text-green-400 mt-2">
                          ✅ Valid URL
                        </p>
                      )}
                      <p className="text-xs text-white/50 mt-2">
                        Share your GitHub repo, live demo, or portfolio link
                      </p>
                    </div>

                    {/* Validation Checklist */}
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg mb-4">
                      <p className="text-xs text-white/70 font-semibold mb-2">
                        Submission Requirements:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                              allQuestionsAnswered
                                ? "bg-green-500 text-green-900"
                                : "bg-white/20"
                            }`}
                          >
                            {allQuestionsAnswered && "✓"}
                          </div>
                          <span className="text-xs text-white/70">
                            All 10 questions answered
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                              projectLink && isLinkValid(projectLink)
                                ? "bg-green-500 text-green-900"
                                : "bg-white/20"
                            }`}
                          >
                            {projectLink && isLinkValid(projectLink) && "✓"}
                          </div>
                          <span className="text-xs text-white/70">
                            Valid project link submitted
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid || submissionState === "loading"}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        !isFormValid || submissionState === "loading"
                          ? "bg-white/5 text-white/40 border border-white/10 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/50"
                      }`}
                    >
                      {submissionState === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
