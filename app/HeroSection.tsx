"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  className?: string;
}

const AnimatedGradientText = ({ text }: { text: string }) => {
  return (
    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
      {text}
    </span>
  );
};

const TestimonialCard = ({
  name,
  role,
  text,
  rating,
}: {
  name: string;
  role: string;
  text: string;
  rating: number;
}) => {
  return (
    <div className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <div className="mb-4 flex gap-1">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
      </div>
      <p className="mb-6 text-sm leading-relaxed text-gray-300">{text}</p>
      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/[0.08]">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-2xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  );
};

const PathCard = ({
  title,
  description,
  icon,
  features,
  ctaText,
  ctaHref,
  delay,
}: {
  title: string;
  description: string;
  icon: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  delay: number;
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-white/0 p-8 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/[0.08]"
      style={{
        animation: `slideInUp 0.6s ease-out ${delay}s both`,
      }}
    >
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-cyan-600/50 blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-4xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
        <p className="mb-6 text-gray-400">{description}</p>

        <ul className="mb-8 space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/30 text-xs font-bold text-blue-300">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/50"
        >
          {ctaText}
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

const CategoryCard = ({
  icon,
  title,
  count,
}: {
  icon: string;
  title: string;
  count: string;
}) => {
  return (
    <div className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/[0.08]">
      <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h4 className="mb-1 font-semibold text-white">{title}</h4>
      <p className="text-xs text-gray-500">{count}</p>
    </div>
  );
};

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const [activeRole, setActiveRole] = useState<"hire" | "work">("hire");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={`relative w-full bg-black ${className}`}>
      {/* Hero Section - Main CTA with Background Image */}
      <div
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://live.staticflickr.com/65535/52159902511_b65e17bb7f_o.jpg')`,
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />

        {/* Content */}
        <div className="relative flex h-full min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/20 px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-300" />
              </span>
              <span className="text-xs font-medium text-blue-200">
                AI-Powered Talent Matching
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Find the Perfect <AnimatedGradientText text="Freelancer" /> Today
            </h1>
            <p className="mb-12 text-xl text-gray-200">
              Post a job and get matched with verified talent in minutes. Whether you need a designer, developer, or marketer, we've got you covered.
            </p>

            {/* Role Selector */}
            <div className="mb-8 inline-flex gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md">
              <button
                onClick={() => setActiveRole("hire")}
                className={`rounded-full px-8 py-3 font-semibold transition-all duration-300 ${
                  activeRole === "hire"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Hire Talent
              </button>
              <button
                onClick={() => setActiveRole("work")}
                className={`rounded-full px-8 py-3 font-semibold transition-all duration-300 ${
                  activeRole === "work"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Find Work
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/registration"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                {activeRole === "hire" ? "Post Your First Job" : "Browse Opportunities"}
                <span>→</span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/20"
              >
                Sign In
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-gray-200">
                <span className="text-blue-300">✓</span>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <span className="text-blue-300">✓</span>
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <span className="text-blue-300">✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Path Cards Section */}
      <div className="relative border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <PathCard
              title="I'm Hiring"
              description="Find and hire skilled freelancers for your projects"
              icon="💼"
              features={[
                "AI-matched freelancers",
                "Verified professionals",
                "Transparent pricing",
                "Secure payments",
                "Real-time collaboration",
              ]}
              ctaText="Post Your First Job"
              ctaHref="/registration"
              delay={0.3}
            />
            <PathCard
              title="I Want to Earn"
              description="Showcase your skills and land amazing projects"
              icon="🚀"
              features={[
                "Browse thousands of jobs",
                "Showcase your portfolio",
                "Flexible work schedule",
                "Competitive rates",
                "Build your reputation",
              ]}
              ctaText="Start Earning Today"
              ctaHref="/registration"
              delay={0.4}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Why Choose Learning & <AnimatedGradientText text="Earning AI?" />
          </h2>
          <p className="mb-16 text-gray-400">Trusted by thousands of professionals worldwide</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="🤖"
              title="AI Matching"
              description="Advanced AI algorithm matches you with perfect fits based on skills and experience"
            />
            <FeatureCard
              icon="🔒"
              title="Secure & Safe"
              description="End-to-end encryption, escrow protection, and verified profiles for peace of mind"
            />
            <FeatureCard
              icon="💬"
              title="Real-Time Chat"
              description="Instant messaging, video calls, and seamless communication with team members"
            />
            <FeatureCard
              icon="📈"
              title="Track Progress"
              description="Monitor projects, track milestones, and celebrate wins together in one dashboard"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 inline-block">
            <h2 className="text-4xl font-bold text-white">
              Browse By <AnimatedGradientText text="Category" />
            </h2>
          </div>
          <p className="mb-12 text-gray-400">Explore opportunities across different domains</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              icon="💻"
              title="Web Development"
              count="2,340+ Active"
            />
            <CategoryCard
              icon="📱"
              title="Mobile Development"
              count="1,890+ Active"
            />
            <CategoryCard
              icon="🎨"
              title="Design & Creative"
              count="3,120+ Active"
            />
            <CategoryCard
              icon="📊"
              title="Data & Analytics"
              count="1,450+ Active"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-white">
            How It <AnimatedGradientText text="Works" />
          </h2>
          <p className="mb-16 text-center text-gray-400">Simple process, amazing results</p>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Hiring Flow */}
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-md">
              <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 font-bold">
                  1
                </span>
                For Clients
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">Post your job or request</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">Get matched with qualified talent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">Collaborate and get results</span>
                </li>
              </ul>
            </div>

            {/* Freelancer Flow */}
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-md">
              <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 font-bold">
                  2
                </span>
                For Freelancers
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">Create your professional profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">Browse and apply for projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">Earn money and build reputation</span>
                </li>
              </ul>
            </div>

            {/* Security */}
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-md">
              <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 font-bold">
                  3
                </span>
                Safe & Secure
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">Secure payment protection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">Verified profiles & reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-gray-300">24/7 support team</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 text-center backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10">
              <p className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                10K+
              </p>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 text-center backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10">
              <p className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                5K+
              </p>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 text-center backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10">
              <p className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                $2M+
              </p>
              <p className="text-gray-400">Payments Processed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-white">
            What Our <AnimatedGradientText text="Users Say" />
          </h2>
          <p className="mb-16 text-center text-gray-400">Join thousands of satisfied professionals worldwide</p>
          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialCard
              name="Emily Johnson"
              role="Product Manager"
              text="Found the perfect developer for our project in just 3 days. The quality was exceptional and the process was smooth."
              rating={5}
            />
            <TestimonialCard
              name="Alex Rodriguez"
              role="Freelance Designer"
              text="This platform has completely changed my freelance career. I'm earning 3x more than before and the clients are great."
              rating={5}
            />
            <TestimonialCard
              name="Sarah Chen"
              role="Startup Founder"
              text="The AI matching is incredible. It connected us with exactly the team we needed. Highly recommended!"
              rating={5}
            />
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-blue-900/20 to-white/5 p-12 backdrop-blur-md sm:p-16">
            <h2 className="mb-4 text-center text-4xl font-bold text-white">
              Ready to Get <AnimatedGradientText text="Started?" />
            </h2>
            <p className="mb-8 text-center text-gray-400">
              Join thousands of professionals and companies building amazing projects together
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/registration"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/50"
              >
                Create Free Account
                <span>→</span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

