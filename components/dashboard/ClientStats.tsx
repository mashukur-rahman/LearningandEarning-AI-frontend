"use client";

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

interface ClientStatsProps {
  jobsPosted: number;
  activeJobs: number;
  totalSpend: string;
  completedJobs?: number;
  totalApplicants?: number;
  averageRating?: number;
}

export default function ClientStats({
  jobsPosted,
  activeJobs,
  totalSpend,
  completedJobs = 0,
  totalApplicants = 0,
  averageRating = 0,
}: ClientStatsProps) {
  const stats: StatCard[] = [
    {
      label: "Total Jobs Posted",
      value: jobsPosted,
      icon: "📋",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      label: "Active Jobs",
      value: activeJobs,
      icon: "⚡",
      color: "from-yellow-500/20 to-yellow-600/10",
    },
    {
      label: "Total Spent",
      value: totalSpend,
      icon: "💳",
      color: "from-green-500/20 to-green-600/10",
    },
    ...(completedJobs > 0
      ? [
          {
            label: "Completed Jobs",
            value: completedJobs,
            icon: "✓",
            color: "from-emerald-500/20 to-emerald-600/10",
          } as StatCard,
        ]
      : []),
    ...(totalApplicants > 0
      ? [
          {
            label: "Total Applicants",
            value: totalApplicants,
            icon: "👥",
            color: "from-purple-500/20 to-purple-600/10",
          } as StatCard,
        ]
      : []),
    ...(averageRating > 0
      ? [
          {
            label: "Avg Rating",
            value: `${averageRating.toFixed(1)} ⭐`,
            icon: "⭐",
            color: "from-pink-500/20 to-pink-600/10",
          } as StatCard,
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
