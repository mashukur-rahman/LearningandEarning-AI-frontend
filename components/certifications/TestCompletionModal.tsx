"use client";

interface TestCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCertifications?: () => void;
  courseTitle?: string;
}

export default function TestCompletionModal({
  isOpen,
  onClose,
  onViewCertifications,
  courseTitle,
}: TestCompletionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-black/95 backdrop-blur-xl shadow-2xl transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Title */}
          <h2 className="mb-6 text-3xl font-bold text-white">
            Thank You!
          </h2>

          {/* AI Evaluation Notice - Main Focus */}
          <div className="mb-6 rounded-xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-950/40 to-purple-950/40 p-6 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/30">
            {/* Animated AI Icon */}
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                  <svg
                    className="h-8 w-8 animate-pulse text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-blue-400"></div>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500"></div>
              </div>
            </div>

            {/* AI Evaluation Header */}
            <div className="mb-3">
              <h3 className="mb-2 text-xl font-bold text-blue-300">
                AI Evaluation in Progress
              </h3>
              <div className="mx-auto mb-3 h-1 w-24 overflow-hidden rounded-full bg-blue-900/50">
                <div className="h-full w-full animate-loading-bar bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
              </div>
            </div>

            {/* Main Message */}
            <p className="mb-3 text-base font-medium text-blue-100">
              Your exam is being evaluated by our{" "}
              <span className="font-bold text-blue-300">AI system</span>.
            </p>
            <p className="text-sm leading-relaxed text-blue-200/90">
              After evaluation, if you pass the test, your certificate will{" "}
              <span className="font-semibold text-blue-300">
                automatically be added
              </span>{" "}
              to your{" "}
              <span className="font-semibold text-blue-300">
                Certifications
              </span>{" "}
              section.
            </p>
          </div>

          {/* Additional Info */}
          <p className="mb-6 text-sm text-gray-400">
            You will be notified once the evaluation is complete. You can check
            your certifications page to see your new certificate when it's
            ready!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Got it!
            </button>
            <button
              onClick={onViewCertifications || onClose}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              View Certifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

