"use client";

interface ModerationWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasons: string[];
  detectedPatterns: string[];
}

export default function ModerationWarningModal({
  isOpen,
  onClose,
  reasons,
  detectedPatterns,
}: ModerationWarningModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4">
        <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-black/95 p-6 backdrop-blur-xl shadow-2xl">
          {/* Warning Icon */}
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <svg
                className="h-8 w-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-center text-xl font-bold text-white">
            Message Blocked
          </h3>

          {/* Description */}
          <p className="mb-4 text-center text-sm text-gray-300">
            Your message contains content that violates our platform guidelines
            and cannot be sent.
          </p>

          {/* Detected Content */}
          {detectedPatterns.length > 0 && (
            <div className="mb-4 rounded-lg border border-red-500/20 bg-red-950/20 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-300">
                Detected Content:
              </p>
              <div className="flex flex-wrap gap-2">
                {detectedPatterns.map((pattern, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-200"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reasons */}
          <div className="mb-6 space-y-2">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-gray-300"
              >
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400"
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
                <span>{reason}</span>
              </div>
            ))}
          </div>

          {/* Warning Box */}
          <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-950/20 p-4">
            <div className="flex gap-3">
              <svg
                className="h-5 w-5 flex-shrink-0 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-xs font-semibold text-yellow-300">
                  Important Notice
                </p>
                <p className="mt-1 text-xs text-yellow-200">
                  All communication and payments must remain on our platform for
                  your safety and protection. Repeated violations may result in
                  account suspension.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Edit Message
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              I Understand
            </button>
          </div>

          {/* Gradient accent */}
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-red-500/10 to-transparent blur-3xl" />
        </div>
      </div>
    </>
  );
}

