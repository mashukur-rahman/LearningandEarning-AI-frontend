"use client";

import { SkillEndorsement } from "@/data/certifications/mockCertifications";

interface SkillEndorsementsProps {
  skills: SkillEndorsement[];
}

export default function SkillEndorsements({ skills }: SkillEndorsementsProps) {
  const getLevelColor = (
    level: "Beginner" | "Intermediate" | "Expert"
  ): string => {
    const colors = {
      Beginner: "bg-green-500/20 text-green-300 border-green-500/30",
      Intermediate: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      Expert: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    };
    return colors[level];
  };

  const totalEndorsements = skills.reduce((sum, skill) => sum + skill.endorsementCount, 0);

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
          <p className="text-sm text-white/60 mb-1">Total Endorsements</p>
          <p className="text-3xl font-bold text-blue-400">{totalEndorsements}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
          <p className="text-sm text-white/60 mb-1">Skills Endorsed</p>
          <p className="text-3xl font-bold text-green-400">{skills.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
          <p className="text-sm text-white/60 mb-1">Expert Skills</p>
          <p className="text-3xl font-bold text-purple-400">
            {skills.filter((s) => s.level === "Expert").length}
          </p>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/8 hover:border-white/20 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {skill.skill}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold border ${getLevelColor(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                  <span className="text-xs text-white/50">
                    {skill.yearsOfExperience} year
                    {skill.yearsOfExperience !== 1 ? "s" : ""} experience
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-400">
                  {skill.endorsementCount}
                </p>
                <p className="text-xs text-white/50">endorsements</p>
              </div>
            </div>

            {/* Endorsement Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50">Endorsement Progress</span>
                <span className="text-xs text-white/70">
                  {Math.min(skill.endorsementCount, 100)} of 100
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{
                    width: `${Math.min((skill.endorsementCount / 100) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Endorsements Info */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <p className="text-xs text-white/50 mb-2">
                Last endorsed {new Date(skill.lastEndorsedDate).toLocaleDateString()}
              </p>
              <div>
                <p className="text-xs text-white/60 mb-2">Endorsed by:</p>
                <div className="flex flex-wrap gap-2">
                  {skill.endorsedBy.map((name, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="mt-4 w-full py-2 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-sm font-medium transition-colors">
              View Profile →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
