"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import {
  mockFreelancerProfile,
  mockClientProfile,
  ProfileData,
  Review,
} from "@/data/profile/mockProfileData";
import {
  mockCertificates,
  mockBadges,
  Certificate,
  Badge,
} from "@/data/certifications/mockCertifications";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    phone: "",
    website: "",
    companyName: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      // Load profile data based on role
      const profile =
        user?.role === "freelancer" ? mockFreelancerProfile : mockClientProfile;
      setProfileData(profile);
      setFormData({
        name: profile.name,
        bio: profile.bio || "",
        location: profile.location || "",
        phone: profile.phone || "",
        website: profile.website || "",
        companyName: profile.companyName || "",
      });
    }
  }, [isAuthenticated, user, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (profileData) {
      setProfileData({
        ...profileData,
        ...formData,
      });
      setIsEditing(false);
      // In a real app, you would save to backend here
    }
  };

  const handleCancel = () => {
    if (profileData) {
      setFormData({
        name: profileData.name,
        bio: profileData.bio || "",
        location: profileData.location || "",
        phone: profileData.phone || "",
        website: profileData.website || "",
        companyName: profileData.companyName || "",
      });
      setIsEditing(false);
    }
  };

  if (!isAuthenticated || !user || !profileData) {
    return null;
  }

  const isFreelancer = user.role === "freelancer";

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboardType={isFreelancer ? "freelancer" : "client"}
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
              <h1 className="text-2xl font-bold text-white">Profile</h1>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {/* Profile Header Section */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-4xl font-bold text-white">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
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
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                        />
                      </div>
                      {isFreelancer ? (
                        <>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                              Bio
                            </label>
                            <textarea
                              name="bio"
                              value={formData.bio}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-300">
                                Location
                              </label>
                              <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-300">
                                Phone
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                              Website
                            </label>
                            <input
                              type="url"
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                              Bio
                            </label>
                            <textarea
                              name="bio"
                              value={formData.bio}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-300">
                                Location
                              </label>
                              <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-300">
                                Phone
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-white/40 focus:bg-white/10 focus:outline-none"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="flex gap-3">
                        <button
                          onClick={handleSave}
                          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="mb-2 text-3xl font-bold text-white">
                        {profileData.name}
                      </h2>
                      {profileData.companyName && (
                        <p className="mb-2 text-lg text-gray-400">
                          {profileData.companyName}
                        </p>
                      )}
                      {profileData.bio && (
                        <p className="mb-4 text-gray-300">{profileData.bio}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        {profileData.location && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {profileData.location}
                          </div>
                        )}
                        {profileData.website && (
                          <a
                            href={profileData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Website
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Rating Section */}
                {!isEditing && (
                  <div className="text-center md:text-right">
                    <div className="mb-2 flex items-center justify-center gap-2 md:justify-end">
                      <svg
                        className="h-6 w-6 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-2xl font-bold text-white">
                        {profileData.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {profileData.totalReviews} reviews
                    </p>
                    {isFreelancer && (
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="text-gray-400">
                          <span className="font-medium text-white">
                            ${profileData.hourlyRate}
                          </span>{" "}
                          /hr
                        </div>
                        <div className="text-gray-400">
                          <span className="font-medium text-white">
                            {profileData.totalJobsCompleted}
                          </span>{" "}
                          jobs completed
                        </div>
                        <div className="text-gray-400">
                          Earned{" "}
                          <span className="font-medium text-white">
                            {profileData.totalEarnings}
                          </span>
                        </div>
                      </div>
                    )}
                    {!isFreelancer && (
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="text-gray-400">
                          <span className="font-medium text-white">
                            {profileData.totalJobsPosted}
                          </span>{" "}
                          jobs posted
                        </div>
                        <div className="text-gray-400">
                          Spent{" "}
                          <span className="font-medium text-white">
                            {profileData.totalSpent}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Freelancer Specific: Certifications & Badges */}
            {isFreelancer && !isEditing && (
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                {/* Certificates */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Certificates ({mockCertificates.length})
                  </h3>
                  <div className="space-y-3">
                    {mockCertificates.slice(0, 3).map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
                      >
                        <div className="text-2xl">{cert.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{cert.title}</p>
                          <p className="text-xs text-gray-400">
                            {cert.category} • {cert.issuedDate}
                          </p>
                        </div>
                      </div>
                    ))}
                    {mockCertificates.length > 3 && (
                      <p className="text-center text-sm text-blue-400">
                        +{mockCertificates.length - 3} more certificates
                      </p>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Badges ({mockBadges.length})
                  </h3>
                  <div className="space-y-3">
                    {mockBadges.slice(0, 3).map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
                      >
                        <div className="text-2xl">{badge.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-white">
                            {badge.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {badge.skill} • {badge.level}
                          </p>
                        </div>
                      </div>
                    ))}
                    {mockBadges.length > 3 && (
                      <p className="text-center text-sm text-blue-400">
                        +{mockBadges.length - 3} more badges
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            {!isEditing && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Reviews ({profileData.reviews.length})
                </h3>
                <div className="space-y-6">
                  {profileData.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Review Card Component with AI Verification
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold text-white">
            {review.reviewerName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h4 className="font-semibold text-white">
                {review.reviewerName}
              </h4>
              {review.isAIVerified && (
                <div className="group relative">
                  <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 px-3 py-1 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20 ring-1 ring-blue-400/30">
                    <div className="relative">
                      <svg
                        className="h-4 w-4 animate-pulse text-blue-300"
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
                      <div className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-ping rounded-full bg-blue-400"></div>
                      <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                      <span className="text-xs font-bold text-blue-200">
                        AI Verified
                      </span>
                  </div>
                  <div className="absolute left-0 top-full z-10 mt-2 hidden w-72 rounded-xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-950/95 to-purple-950/95 p-4 text-xs text-blue-100 shadow-2xl backdrop-blur-xl ring-2 ring-blue-500/30 group-hover:block">
                    <div className="mb-3 flex items-center gap-2 border-b border-blue-500/30 pb-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                        <svg
                          className="h-4 w-4 text-white"
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
                      <span className="font-bold text-blue-300">
                        AI Verification
                      </span>
                    </div>
                    <p className="leading-relaxed">
                      This review has been{" "}
                      <span className="font-semibold text-blue-300">
                        verified by our AI system
                      </span>{" "}
                      to ensure authenticity and prevent fraudulent feedback.
                      Our AI analyzes review patterns, user behavior, and
                      content quality to maintain platform integrity.
                    </p>
                  </div>
                </div>
              )}
            </div>
            {review.jobTitle && (
              <p className="mb-1 text-sm text-gray-400">{review.jobTitle}</p>
            )}
            <div className="mb-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-300">{review.comment}</p>
            <p className="mt-2 text-xs text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        {!review.isAIVerified && (
          <div className="ml-4 rounded-lg border border-gray-600/30 bg-gray-900/20 px-3 py-1">
            <span className="text-xs text-gray-500">Not Verified</span>
          </div>
        )}
      </div>
    </div>
  );
}

