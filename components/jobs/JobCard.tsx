"use client";

import { useEffect, useState } from "react";
import { Job, getTimeString } from "@/data/jobs/mockJobs";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  applied?: boolean;
}

export default function JobCard({ job, onApply, applied = false }: JobCardProps) {
  const [timeRemaining, setTimeRemaining] = useState(job.timeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isTimeUp = timeRemaining === 0;

  return (
    <div
      className={`rounded-2xl border backdrop-blur-md p-6 transition-all duration-300 ${
        applied
          ? "bg-white/3 border-white/5 opacity-60"
          : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {job.title}
            </h3>
            <p className="text-sm text-white/60">{job.company}</p>
          </div>
          {applied && (
            <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-xs text-green-400 whitespace-nowrap">
              Applied
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/70 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Budget */}
      <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <p className="text-sm text-white/60 mb-1">Budget</p>
        <p className="text-lg font-semibold text-blue-400">{job.budget}</p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-xs text-white/60 mb-2">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs text-blue-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Timer */}
      <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <p className="text-xs text-white/60 mb-1">Time Remaining</p>
        <p
          className={`text-2xl font-mono font-bold ${
            isTimeUp ? "text-red-400" : "text-white"
          }`}
        >
          {getTimeString(timeRemaining)}
        </p>
        {isTimeUp && (
          <p className="text-xs text-red-400 mt-1">Application window closed</p>
        )}
      </div>

      {/* Apply Button */}
      <button
        onClick={() => onApply(job)}
        disabled={applied || isTimeUp}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
          applied || isTimeUp
            ? "bg-white/5 text-white/40 border border-white/10 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/50"
        }`}
      >
        {applied ? "Already Applied" : isTimeUp ? "Application Closed" : "Apply Now"}
      </button>
    </div>
  );
}
