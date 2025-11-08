"use client";

interface StatCard {
  label: string;
  value: string | number;
  iconType: "clipboard" | "lightning" | "wallet" | "checkmark" | "users" | "star";
  color: string;
  accentColor: string;
}

interface ClientStatsProps {
  jobsPosted: number;
  activeJobs: number;
  totalSpend: string;
  completedJobs?: number;
  totalApplicants?: number;
  averageRating?: number;
}

const renderIcon = (iconType: StatCard["iconType"]) => {
  const iconProps = "w-6 h-6 stroke-current";

  switch (iconType) {
    case "clipboard":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    case "lightning":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "wallet":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V5a3 3 0 00-3-3H6a3 3 0 00-3 3v11a3 3 0 003 3z" />
        </svg>
      );
    case "checkmark":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "users":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646M9 8H7a4 4 0 014-4h2a4 4 0 014 4h-2a2 2 0 00-2-2H9zm0 0a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2v-4a2 2 0 00-2-2" />
        </svg>
      );
    case "star":
      return (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    default:
      return null;
  }
};

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
      iconType: "clipboard",
      color: "from-blue-500/20 to-blue-600/10",
      accentColor: "text-blue-400",
    },
    {
      label: "Active Jobs",
      value: activeJobs,
      iconType: "lightning",
      color: "from-yellow-500/20 to-yellow-600/10",
      accentColor: "text-yellow-400",
    },
    {
      label: "Total Spent",
      value: totalSpend,
      iconType: "wallet",
      color: "from-green-500/20 to-green-600/10",
      accentColor: "text-green-400",
    },
    ...(completedJobs > 0
      ? [
          {
            label: "Completed Jobs",
            value: completedJobs,
            iconType: "checkmark" as const,
            color: "from-emerald-500/20 to-emerald-600/10",
            accentColor: "text-emerald-400",
          } as StatCard,
        ]
      : []),
    ...(totalApplicants > 0
      ? [
          {
            label: "Total Applicants",
            value: totalApplicants,
            iconType: "users" as const,
            color: "from-purple-500/20 to-purple-600/10",
            accentColor: "text-purple-400",
          } as StatCard,
        ]
      : []),
    ...(averageRating > 0
      ? [
          {
            label: "Avg Rating",
            value: `${averageRating.toFixed(1)}`,
            iconType: "star" as const,
            color: "from-amber-500/20 to-amber-600/10",
            accentColor: "text-amber-400",
          } as StatCard,
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${stat.color} p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-gradient-to-br`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`${stat.accentColor} flex-shrink-0`}>
              {renderIcon(stat.iconType)}
            </div>
          </div>

          {/* Gradient accent */}
          <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
        </div>
      ))}
    </div>
  );
}
