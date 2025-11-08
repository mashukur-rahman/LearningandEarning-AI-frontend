"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardType: "freelancer" | "client";
}

const renderIcon = (type: string) => {
  const iconProps = "w-5 h-5 stroke-current";

  switch (type) {
    case "dashboard":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m-9 4l4-4m9-5l2-3m-2 3l7-4" />
        </svg>
      );
    case "jobs":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    case "browse":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case "messages":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case "courses":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" />
        </svg>
      );
    case "certifications":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "profile":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "payments":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      );
    case "post":
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      );
    default:
      return null;
  }
};

export default function DashboardSidebar({
  isOpen,
  onClose,
  dashboardType,
}: DashboardSidebarProps) {
  const { logout, user } = useAuth();
  const router = useRouter();

  const freelancerLinks: NavItem[] = [
    { label: "Dashboard", href: "/freelancer-dashboard", icon: renderIcon("dashboard") },
    { label: "Browse Jobs", href: "/browse-jobs", icon: renderIcon("browse") },
    { label: "My Jobs", href: "/my-jobs", icon: renderIcon("jobs") },
    { label: "Messages", href: "/messages", icon: renderIcon("messages") },
    { label: "Courses", href: "/courses", icon: renderIcon("courses") },
    { label: "Certifications", href: "/certification", icon: renderIcon("certifications") },
    { label: "Profile", href: "/profile", icon: renderIcon("profile") },
  ];

  const clientLinks: NavItem[] = [
    { label: "Dashboard", href: "/client-dashboard", icon: renderIcon("dashboard") },
    { label: "Post a Job", href: "/post-jobs", icon: renderIcon("post") },
    { label: "Candidates Progress", href: "/my-posted-jobs", icon: renderIcon("jobs") },
    { label: "Messages", href: "/messages", icon: renderIcon("messages") },
    { label: "Payments", href: "/payments", icon: renderIcon("payments") },
    { label: "Profile", href: "/profile", icon: renderIcon("profile") },
  ];

  const navItems = dashboardType === "freelancer" ? freelancerLinks : clientLinks;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/10 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-xl transition-transform duration-300 md:relative md:z-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Branding */}
          <div className="border-b border-white/10 p-6">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:from-blue-300 hover:to-blue-500 transition-all"
            >
              L&E AI
            </Link>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gray-500">
              {dashboardType === "freelancer" ? "Freelancer" : "Client"} Dashboard
            </p>
          </div>

          {/* User Info */}
          <div className="border-b border-white/10 p-6 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/40 to-blue-600/40 border border-blue-400/30 text-lg font-bold text-blue-300">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xl font-bold text-white truncate">{user?.name}</p>
                <p className="text-xs font-medium text-gray-400 truncate mt-1">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex items-center gap-4 rounded-lg px-4 py-3 text-base font-medium text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white hover:pl-5 border border-transparent hover:border-white/20"
              >
                <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                  {item.icon}
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-white/10 p-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-950/40 hover:border-red-500/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
