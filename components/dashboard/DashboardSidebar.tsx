"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardType: "freelancer" | "client";
}

export default function DashboardSidebar({
  isOpen,
  onClose,
  dashboardType,
}: DashboardSidebarProps) {
  const { logout, user } = useAuth();
  const router = useRouter();

  const freelancerLinks: NavItem[] = [
    { label: "Dashboard", href: "/freelancer-dashboard", icon: "📊" },
    { label: "Browse Jobs", href: "/browse-jobs", icon: "💼" },
    { label: "My Jobs", href: "/my-jobs", icon: "📋" },
    { label: "Messages", href: "/messages", icon: "💬" },
    { label: "Courses", href: "/courses", icon: "📚" },
    { label: "Certifications", href: "/certification", icon: "🏆" },
    { label: "Profile", href: "/profile", icon: "👤" },
  ];

  const clientLinks: NavItem[] = [
    { label: "Dashboard", href: "/client-dashboard", icon: "📊" },
    { label: "Post a Job", href: "/post-jobs", icon: "✏️" },
    { label: "My Jobs", href: "/my-posted-jobs", icon: "📋" },
    { label: "Messages", href: "/messages", icon: "💬" },
    { label: "Payments", href: "/payments", icon: "💳" },
    { label: "Profile", href: "/profile", icon: "👤" },
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
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/10 bg-black/80 backdrop-blur-xl transition-transform duration-300 md:relative md:z-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Branding */}
          <div className="border-b border-white/10 p-6">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
            >
              L&E AI
            </Link>
            <p className="mt-2 text-xs text-gray-400">
              {dashboardType === "freelancer" ? "Freelancer" : "Client"} Dashboard
            </p>
          </div>

          {/* User Info */}
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/30 text-blue-300">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-white/10 p-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg border border-red-500/30 bg-red-950/20 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-950/40 hover:border-red-500/50"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
