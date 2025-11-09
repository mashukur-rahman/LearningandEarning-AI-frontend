"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Hire Talents", href: "/hire-talents" },
  { label: "Get Hired", href: "/get-hired" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ className = "" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-lg ${className}`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>

          {/* Logo - Left aligned on all screens */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-white transition-colors hover:text-gray-200"
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              LE
            </span>
            <span>Learning&Earning</span>
          </Link>

          {/* Navigation Links (Desktop Only) */}
          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons (Desktop Only) */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name.split(" ")[0]}</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-white/10 bg-black/90 backdrop-blur-xl shadow-xl">
                    <div className="border-b border-white/10 p-4">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <div className="space-y-1 p-2">
                      <Link
                        href={
                          user.role === "freelancer"
                            ? "/freelancer-dashboard"
                            : "/client-dashboard"
                        }
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        📊 Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        👤 Profile
                      </Link>
                    </div>
                    <div className="border-t border-white/10 p-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                          router.push("/");
                        }}
                        className="w-full rounded px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-950/20"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  Registration
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button Spacer */}
          <div className="w-10 md:hidden" />
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden border-t border-white/10 bg-black/50 backdrop-blur-lg transition-all duration-300 md:hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-4 py-4 sm:px-6 lg:px-8">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href={
                      user.role === "freelancer"
                        ? "/freelancer-dashboard"
                        : "/client-dashboard"
                    }
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                      router.push("/");
                    }}
                    className="rounded-lg px-4 py-2 text-center text-sm font-medium text-red-400 transition-colors hover:bg-red-950/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    href="/registration"
                    onClick={closeMobileMenu}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-cyan-500"
                  >
                    Registration
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

