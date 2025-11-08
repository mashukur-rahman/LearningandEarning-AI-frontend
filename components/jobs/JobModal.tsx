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
          <style>{`
            .test-info-tooltip {
              opacity: 0;
              visibility: hidden;
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              width: 300px;
              margin-top: 8px;
              background: linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(139, 92, 246) 100%);
              border: 2px solid rgb(139, 92, 246);
              border-radius: 12px;
              padding: 14px;
              z-index: 60;
              transition: opacity 0.3s, visibility 0.3s;
              white-space: normal;
            }
            .test-info-icon:hover .test-info-tooltip {
              opacity: 1;
              visibility: visible;
            }
          `}</style>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                {job.title}
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-sm text-white/60">{job.company}</p>
                <div className="relative test-info-icon">
                  <button className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 hover:bg-purple-500/30 transition-all cursor-help">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="test-info-tooltip">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-lg">✨</span>
                        <h4 className="font-bold text-purple-200">Why This Test Matters:</h4>
                      </div>
                      <p className="text-xs text-purple-100 leading-relaxed">
                        This assessment helps recruiters understand your depth of knowledge, technical skills, and problem-solving abilities. It verifies your expertise and increases your chances of being selected for premium opportunities!
                      </p>
                    </div>
                  </button>
                </div>
              </div>
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
                  <h4 className="text-lg font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4">
                    {currentQuestion.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? "bg-purple-500/25 border-2 border-purple-400 hover:bg-purple-500/35 hover:border-purple-300"
                              : "bg-white/5 border border-white/10 hover:bg-blue-500/15 hover:border-blue-400/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={option.id}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(option.id)}
                            className="w-4 h-4 text-purple-600 border-white/20 focus:ring-0"
                          />
                          <span className={`ml-3 font-medium ${
                            isSelected ? "text-purple-300 font-semibold" : "text-white/80"
                          }`}>
                            {option.text}
                          </span>
                        </label>
                      );
                    })}
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
                  {/* Instructions Box - Top Priority */}
                  <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-sm font-bold text-emerald-300 mb-2">
                          What You Need to Do:
                        </h4>
                        <p className="text-xs text-emerald-200 leading-relaxed">
                          Complete the project requirements below, then submit your GitHub link or live demo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-5">
                    <h4 className="text-lg font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                      📋 Project Requirements
                    </h4>

                    {/* Job Description (Read-only) */}
                    <div className="space-y-2">
                      <label className="block text-sm text-white/90 font-bold flex items-center gap-2">
                        <span className="text-lg">📝</span>
                        What to Build
                      </label>
                      <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-sm text-white/90 leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    {/* Project Link Input */}
                    <div className="space-y-2">
                      <label className="block text-sm text-white/90 font-bold flex items-center gap-2">
                        <span className="text-lg">🔗</span>
                        Submit Your Work
                      </label>
                      <input
                        type="url"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        placeholder="https://github.com/yourname/project"
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-purple-400/60 focus:bg-white/10 transition-colors"
                      />
                      {projectLink && !isLinkValid(projectLink) && (
                        <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                          ❌ Invalid URL - Please enter a valid link
                        </p>
                      )}
                      {projectLink && isLinkValid(projectLink) && (
                        <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                          ✅ URL looks good!
                        </p>
                      )}
                      <p className="text-xs text-white/50 mt-2">
                        💡 Share GitHub repo, live demo, or portfolio
                      </p>
                    </div>

                    {/* Validation Checklist */}
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
                      <p className="text-sm text-amber-300 font-bold mb-3">
                        ⚡ Before You Submit:
                      </p>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              allQuestionsAnswered
                                ? "bg-emerald-500 text-emerald-900"
                                : "bg-white/20 text-white/40"
                            }`}
                          >
                            {allQuestionsAnswered ? "✓" : "1"}
                          </div>
                          <span className={`text-xs font-medium ${
                            allQuestionsAnswered ? "text-emerald-300" : "text-white/60"
                          }`}>
                            Answer all 10 questions
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              projectLink && isLinkValid(projectLink)
                                ? "bg-emerald-500 text-emerald-900"
                                : "bg-white/20 text-white/40"
                            }`}
                          >
                            {projectLink && isLinkValid(projectLink) ? "✓" : "2"}
                          </div>
                          <span className={`text-xs font-medium ${
                            projectLink && isLinkValid(projectLink) ? "text-emerald-300" : "text-white/60"
                          }`}>
                            Submit your project link
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
