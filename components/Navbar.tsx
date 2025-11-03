"use client";

import Link from "next/link";
import { useState } from "react";

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`mx-auto mt-4 flex w-full max-w-7xl items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md shadow-lg sm:px-6 lg:px-8 ${className}`}
      >
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

        {/* Logo - Centered on mobile, left on desktop */}
        <div className="flex flex-1 items-center justify-center md:flex-none md:justify-start">
          <Link
            href="/"
            className="text-xl font-bold text-white transition-colors hover:text-gray-300"
          >
            Learning&Earning AI
          </Link>
        </div>

        {/* Navigation Links (Desktop Only) */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons (Desktop Only) */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Login
          </Link>
          <Link
            href="/registration"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Registration
          </Link>
        </div>

        {/* Spacer for mobile to balance hamburger menu */}
        <div className="w-10 md:hidden" />
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mx-auto mt-2 w-full max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
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
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Login
            </Link>
            <Link
              href="/registration"
              onClick={closeMobileMenu}
              className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Registration
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

