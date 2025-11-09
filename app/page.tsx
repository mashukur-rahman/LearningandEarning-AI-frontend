"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/components/Navbar";
import HeroSection from "./HeroSection";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to respective dashboard based on role
      if (user.role === "freelancer") {
        router.push("/freelancer-dashboard");
      } else if (user.role === "client") {
        router.push("/client-dashboard");
      }
    }
  }, [isAuthenticated, user, router]);

  // Show loading or landing page if not authenticated
  if (isAuthenticated && user) {
    return <div className="h-screen bg-black" />;
  }

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}
