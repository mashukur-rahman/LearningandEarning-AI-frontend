"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import CertificationCard from "@/components/certifications/CertificationCard";
import CertificateModal from "@/components/certifications/CertificateModal";
import SkillEndorsements from "@/components/certifications/SkillEndorsements";
import {
  mockCertificates,
  mockBadges,
  mockSkillEndorsements,
  mockMilestones,
  mockCertificationStats,
  Certificate,
  Badge,
} from "@/data/certifications/mockCertifications";

type FilterTab =
  | "all"
  | "certificates"
  | "badges"
  | "skills"
  | "milestones";

export default function CertificationPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [selectedItem, setSelectedItem] = useState<Certificate | Badge | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "freelancer") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  // Redirect if not authenticated or not a freelancer
  if (!isAuthenticated || !user || user.role !== "freelancer") {
    return null;
  }

  const getFilteredItems = (): (Certificate | Badge)[] => {
    switch (activeFilter) {
      case "certificates":
        return mockCertificates;
      case "badges":
        return mockBadges;
      case "all":
      default:
        return [...mockCertificates, ...mockBadges].sort(
          (a, b) =>
            new Date(
              "issuedDate" in a ? a.issuedDate : a.earnedDate
            ).getTime() -
            new Date(
              "issuedDate" in b ? b.issuedDate : b.earnedDate
            ).getTime()
        );
    }
  };

  const filteredItems = getFilteredItems();

  const filterTabs: Array<{ id: FilterTab; label: string; count: number }> = [
    {
      id: "all",
      label: "All",
      count: mockCertificates.length + mockBadges.length,
    },
    { id: "certificates", label: "Certificates", count: mockCertificates.length },
    { id: "badges", label: "Badges", count: mockBadges.length },
    { id: "skills", label: "Skills", count: mockSkillEndorsements.length },
    { id: "milestones", label: "Milestones", count: mockMilestones.length },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboardType="freelancer"
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
              <h1 className="text-2xl font-bold text-white">My Certifications</h1>
            </div>

            {/* Right Actions */}
            <Link
              href="/freelancer-dashboard"
              className="flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors border border-white/10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Statistics Summary */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <p className="text-sm text-white/60 mb-2">Total Certificates</p>
              <p className="text-3xl font-bold text-blue-400">
                {mockCertificationStats.totalCertificates}
              </p>
              <p className="text-xs text-white/40 mt-1">Course & Project</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <p className="text-sm text-white/60 mb-2">Badges Earned</p>
              <p className="text-3xl font-bold text-purple-400">
                {mockCertificationStats.totalBadges}
              </p>
              <p className="text-xs text-white/40 mt-1">Achievements</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <p className="text-sm text-white/60 mb-2">Skill Endorsements</p>
              <p className="text-3xl font-bold text-green-400">
                {mockCertificationStats.skillEndorsementCount}
              </p>
              <p className="text-xs text-white/40 mt-1">
                {mockCertificationStats.totalSkillsEndorsed} skills
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <p className="text-sm text-white/60 mb-2">Profile Strength</p>
              <p className="text-3xl font-bold text-orange-400">
                {mockCertificationStats.completionPercentage}%
              </p>
              <p className="text-xs text-white/40 mt-1">Complete</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 flex overflow-x-auto gap-2 pb-2 border-b border-white/10">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? "bg-blue-600 text-white border border-blue-500"
                    : "text-white/70 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Content Sections */}

          {/* Certificates & Badges View */}
          {(activeFilter === "all" ||
            activeFilter === "certificates" ||
            activeFilter === "badges") && (
            <div>
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <CertificationCard
                      key={item.id}
                      item={item}
                      onViewDetails={setSelectedItem}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <p className="text-white/60 text-lg mb-2">
                    No {activeFilter} found
                  </p>
                  <p className="text-white/40 text-sm">
                    Keep learning to earn badges and certificates!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Skills Endorsements View */}
          {activeFilter === "skills" && (
            <div>
              {mockSkillEndorsements.length > 0 ? (
                <SkillEndorsements skills={mockSkillEndorsements} />
              ) : (
                <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <p className="text-white/60 text-lg">No skills endorsed yet</p>
                </div>
              )}
            </div>
          )}

          {/* Milestones View */}
          {activeFilter === "milestones" && (
            <div>
              {mockMilestones.length > 0 ? (
                <div className="space-y-4">
                  {mockMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/8 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="text-4xl flex-shrink-0">
                          {milestone.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {milestone.title}
                              </h3>
                              <p className="text-sm text-white/60 mt-1">
                                {milestone.description}
                              </p>
                            </div>
                            <span className="inline-block px-3 py-1 rounded-lg bg-blue-600/20 text-blue-300 text-xs font-semibold border border-blue-500/30 whitespace-nowrap">
                              {milestone.milestone}
                            </span>
                          </div>

                          {/* Category and Date */}
                          <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">
                              {milestone.category.charAt(0).toUpperCase() +
                                milestone.category.slice(1)}
                            </span>
                            <span>
                              Achieved{" "}
                              {new Date(milestone.achievedDate).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Progress Bar if applicable */}
                          {milestone.progress && (
                            <div className="mt-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-white/50">
                                  Progress
                                </span>
                                <span className="text-xs text-white/70">
                                  {milestone.progress.current} /{" "}
                                  {milestone.progress.target}
                                </span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/10">
                                <div
                                  className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                                  style={{
                                    width: `${Math.min(
                                      (milestone.progress.current /
                                        milestone.progress.target) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <p className="text-white/60 text-lg">No milestones achieved yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={selectedItem !== null}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
