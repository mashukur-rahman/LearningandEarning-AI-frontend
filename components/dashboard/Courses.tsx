"use client";

import Link from "next/link";

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  category: string;
}

interface CoursesProps {
  courses: Course[];
}

export default function Courses({ courses }: CoursesProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white">Your Courses</h3>
        <Link
          href="/courses"
          className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          View All
        </Link>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-gray-400">
            No courses yet. Upskill yourself to get better jobs!
          </p>
          <Link
            href="/courses"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-white/10">
          {courses.map((course) => (
            <div key={course.id} className="p-4 transition-colors hover:bg-white/5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium text-white">{course.title}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {course.instructor}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-block rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                      {course.category}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-medium text-gray-300">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gradient accent */}
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl" />
    </div>
  );
}
