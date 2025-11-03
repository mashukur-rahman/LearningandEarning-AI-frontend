"use client";

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

interface FreelancerStatsProps {
  jobsCompleted: number;
  level: string;
}

export default function FreelancerStats({
  jobsCompleted,
  level,
}: FreelancerStatsProps) {
  const stats: StatCard[] = [
    {
      label: "Level",
      value: level,
      icon: "⭐",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      label: "Jobs Completed",
      value: jobsCompleted,
      icon: "✓",
      color: "from-green-500/20 to-green-600/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${stat.color} p-6 backdrop-blur-md`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>

          {/* Gradient accent */}
          <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
        </div>
      ))}
    </div>
  );
}
