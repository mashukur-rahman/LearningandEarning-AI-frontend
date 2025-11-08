"use client";

import Link from "next/link";

export default function PostJobSection() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-blue-950/10 p-8 backdrop-blur-md">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Ready to hire?</h3>
          <p className="mt-2 text-gray-400">
            Post your first job and find talented freelancers to work with.
          </p>
        </div>
        <Link
          href="/post-jobs"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 cursor-pointer border border-blue-500/50 hover:border-blue-400"
        >
          <span>✏️</span>
          <span>Post a Job</span>
        </Link>
      </div>

      {/* Gradient accent */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl" />
    </div>
  );
}
