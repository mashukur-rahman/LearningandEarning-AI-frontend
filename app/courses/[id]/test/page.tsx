"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";

// Mock test questions
const testQuestions = [
  {
    id: "1",
    type: "mcq",
    question: "What is the main principle of Object-Oriented Programming?",
    options: [
      "Procedural programming",
      "Functional programming",
      "Encapsulation and abstraction",
      "Linear programming",
    ],
    correctAnswer: 2,
  },
  {
    id: "2",
    type: "mcq",
    question: "Which of the following is NOT a pillar of OOP?",
    options: [
      "Inheritance",
      "Polymorphism",
      "Encapsulation",
      "Compilation",
    ],
    correctAnswer: 3,
  },
  {
    id: "3",
    type: "mcq",
    question: "What does 'this' keyword refer to in a class?",
    options: [
      "The parent class",
      "The current instance of the class",
      "The global object",
      "The window object",
    ],
    correctAnswer: 1,
  },
  {
    id: "4",
    type: "short",
    question: "Explain the concept of inheritance in OOP with an example.",
    placeholder: "Type your answer here...",
  },
  {
    id: "5",
    type: "short",
    question: "What is the difference between method overriding and method overloading?",
    placeholder: "Type your answer here...",
  },
  {
    id: "6",
    type: "mcq",
    question: "Which access modifier provides the most restricted access?",
    options: [
      "public",
      "protected",
      "private",
      "default",
    ],
    correctAnswer: 2,
  },
];

export default function TestPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<"pending" | "granted" | "denied">("pending");
  const [isRecording, setIsRecording] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => {
      // Cleanup: stop recording and release camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      setCameraPermission("granted");
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermission("denied");
    }
  };

  const startTest = () => {
    if (cameraPermission !== "granted") {
      alert("Please grant camera permission to start the test.");
      return;
    }

    setTestStarted(true);
    setIsRecording(true);
    startRecording();
    startTimer();
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    try {
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: "video/webm;codecs=vp8,opus",
      });

      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        saveRecording(blob);
      };

      mediaRecorder.start(1000); // Collect data every second
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const startTimer = () => {
    timerIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const saveRecording = (blob: Blob) => {
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `test-recording-${courseId}-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Note: To save to public folder, you would need to send the blob to a backend API
    // Example: await fetch('/api/save-recording', { method: 'POST', body: formData })
  };

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleEndTest = async () => {
    if (isRecording) {
      stopRecording();
    }

    setIsSubmitting(true);

    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Wait a bit for recording to finalize
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would submit answers to backend here
    console.log("Test answers:", answers);
    console.log("Recording time:", recordingTime, "seconds");

    alert("Test submitted successfully! Your recording has been saved.");
    router.push(`/courses/${courseId}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboardType={user?.role === "freelancer" ? "freelancer" : "client"}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 md:hidden hover:bg-white/10"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Course Test</h1>
                <p className="mt-1 text-sm text-gray-400">
                  Complete the test to earn your certificate
                </p>
              </div>
            </div>
            {testStarted && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-500"}`} />
                  <span className="text-sm text-white">{formatTime(recordingTime)}</span>
                </div>
                <Link
                  href={`/courses/${courseId}`}
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  Back to Course
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {!testStarted ? (
            /* Pre-Test: Camera Permission */
            <div className="mx-auto max-w-2xl">
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="text-center">
                  <div className="mb-6 text-6xl">📹</div>
                  <h2 className="mb-4 text-2xl font-bold text-white">
                    Camera Permission Required
                  </h2>
                  <p className="mb-8 text-gray-300">
                    This test requires camera access to record your session for security and
                    integrity purposes. Please grant camera permission to proceed.
                  </p>

                  {cameraPermission === "pending" && (
                    <button
                      onClick={requestCameraPermission}
                      className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Request Camera Permission
                    </button>
                  )}

                  {cameraPermission === "granted" && (
                    <div className="space-y-4">
                      <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-lg border border-white/20 bg-black">
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          playsInline
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-green-500/80 px-3 py-1 text-xs font-medium text-white">
                          <div className="h-2 w-2 rounded-full bg-white" />
                          Camera Active
                        </div>
                      </div>
                      <div className="rounded-lg border border-green-500/30 bg-green-950/20 p-4">
                        <p className="text-sm text-green-300">
                          ✓ Camera permission granted! You can now start the test.
                        </p>
                      </div>
                      <button
                        onClick={startTest}
                        className="w-full rounded-lg bg-green-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-green-700"
                      >
                        Start Test
                      </button>
                    </div>
                  )}

                  {cameraPermission === "denied" && (
                    <div className="space-y-4">
                      <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                        <p className="text-sm text-red-300">
                          Camera permission was denied. Please enable camera access in your
                          browser settings and refresh the page.
                        </p>
                      </div>
                      <button
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        Refresh Page
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Test Form */
            <div className="mx-auto max-w-4xl">
              {/* Recording Indicator */}
              {isRecording && (
                <div className="mb-6 rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                      <span className="text-sm font-medium text-red-300">
                        Recording in progress... {formatTime(recordingTime)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Your session is being recorded
                    </div>
                  </div>
                </div>
              )}

              {/* Test Questions */}
              <form className="space-y-6">
                {testQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="mb-4 text-lg font-semibold text-white">
                          {question.question}
                        </h3>

                        {question.type === "mcq" && question.options && (
                          <div className="space-y-3">
                            {question.options.map((option, optionIndex) => (
                              <label
                                key={optionIndex}
                                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                                  answers[question.id] === optionIndex
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={optionIndex}
                                  checked={answers[question.id] === optionIndex}
                                  onChange={(e) =>
                                    handleAnswerChange(
                                      question.id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  className="mt-1 h-4 w-4 cursor-pointer accent-blue-600"
                                />
                                <span className="flex-1 text-gray-300">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {question.type === "short" && (
                          <textarea
                            value={answers[question.id] as string || ""}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            placeholder={question.placeholder}
                            rows={5}
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-colors focus:border-white/40 focus:bg-white/10 focus:outline-none"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* End Test Button */}
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleEndTest}
                    disabled={isSubmitting}
                    className="rounded-lg bg-red-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "End Test"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

