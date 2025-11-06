"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";

// Mock course data - in a real app, this would come from an API
const courseDatabase: Record<string, {
  id: string;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  thumbnail: string;
  rating: number;
  students: number;
  videoUrl: string;
}> = {
  "oop": {
    id: "oop",
    title: "Object-Oriented Programming Fundamentals",
    instructor: "Code Master Academy",
    description: "Learn the core concepts of Object-Oriented Programming including classes, objects, inheritance, polymorphism, and encapsulation. Perfect for beginners and intermediate developers.",
    duration: "6 hours",
    lessons: 18,
    level: "Intermediate",
    category: "Programming",
    thumbnail: "🎯",
    rating: 4.9,
    students: 3500,
    videoUrl: "/oop.mp4",
  },
  "1": {
    id: "1",
    title: "Advanced React Patterns",
    instructor: "Dev Academy",
    description: "Master advanced React patterns including hooks, context, and performance optimization techniques.",
    duration: "8 hours",
    lessons: 24,
    level: "Intermediate",
    category: "React",
    thumbnail: "📚",
    rating: 4.8,
    students: 1250,
    videoUrl: "/oop.mp4", // Placeholder
  },
};

export default function CourseDetailPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const course = courseDatabase[courseId];

  if (!course) {
    return (
      <div className="flex h-screen overflow-hidden bg-black">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          dashboardType={user?.role === "freelancer" ? "freelancer" : "client"}
        />
        <main className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">📚</p>
            <h1 className="text-2xl font-bold text-white mb-2">Course Not Found</h1>
            <p className="text-gray-400 mb-6">The course you're looking for doesn't exist.</p>
            <Link
              href="/courses"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Back to Courses
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
                <h1 className="text-xl font-bold text-white truncate max-w-md">
                  {course.title}
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                  by {course.instructor}
                </p>
              </div>
            </div>
            <Link
              href="/courses"
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Back to Courses
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
                {/* Video Player */}
                <video
                  ref={videoRef}
                  src={course.videoUrl}
                  className="w-full aspect-video"
                  controls={false}
                />

                {/* Custom Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      style={{
                        background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`,
                      }}
                    />
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayPause}
                      className="flex items-center justify-center rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700"
                    >
                      {isPlaying ? (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2 flex-1">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isMuted || volume === 0 ? (
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
                              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                            />
                          </svg>
                        ) : (
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
                              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                          </svg>
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={() => {
                        const video = videoRef.current;
                        if (video?.requestFullscreen) {
                          video.requestFullscreen();
                        }
                      }}
                      className="text-white hover:text-gray-300 transition-colors"
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
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  About This Course
                </h2>
                <p className="text-gray-300 leading-relaxed">{course.description}</p>
              </div>
            </div>

            {/* Course Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Course Stats */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Course Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Duration</span>
                      <span className="text-sm font-medium text-white">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Lessons</span>
                      <span className="text-sm font-medium text-white">
                        {course.lessons}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Level</span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          course.level === "Beginner"
                            ? "bg-green-500/20 text-green-300"
                            : course.level === "Intermediate"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Rating</span>
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm font-medium text-white">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Students</span>
                      <span className="text-sm font-medium text-white">
                        {course.students.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <div className="text-center">
                    <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Take Test Button */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <button
                    onClick={() => router.push(`/courses/${courseId}/test`)}
                    className="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    📝 Take Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

