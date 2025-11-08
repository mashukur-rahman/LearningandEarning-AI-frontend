"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ConversationList from "@/components/messages/ConversationList";
import ChatView from "@/components/messages/ChatView";
import {
  freelancerConversations,
  freelancerMessages,
} from "@/data/messages/mockConversationsFreelancer";
import {
  clientConversations,
  clientMessages,
} from "@/data/messages/mockConversationsClient";

export default function MessagesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  // Select conversations based on user role
  // Freelancers see conversations with clients
  // Clients see conversations with freelancers
  const conversations =
    user?.role === "freelancer" ? freelancerConversations : clientConversations;
  const messagesData =
    user?.role === "freelancer" ? freelancerMessages : clientMessages;

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  const messages = selectedConversationId
    ? messagesData[selectedConversationId] || []
    : [];

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    if (isMobileView) {
      setShowConversationList(false);
    }
  };

  const handleBackToList = () => {
    setShowConversationList(true);
    setSelectedConversationId(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dashboardType={user?.role === "freelancer" ? "freelancer" : "client"}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 md:hidden hover:bg-white/10 transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Messages</h1>
                <p className="mt-2 text-gray-400">
                  Communicate with your {user?.role === "freelancer" ? "clients" : "freelancers"}
                </p>
              </div>
            </div>
            <Link
              href={user?.role === "freelancer" ? "/freelancer-dashboard" : "/client-dashboard"}
              className="flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors border border-white/10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </Link>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-3" style={{ height: '700px' }}>
            {/* Conversation List - Left Panel */}
            <div
              className={`${
                isMobileView && !showConversationList ? "hidden" : "block"
              } h-full overflow-hidden md:col-span-1 md:block`}
            >
              <ConversationList
                conversations={conversations}
                selectedId={selectedConversationId}
                onSelectConversation={handleSelectConversation}
              />
            </div>

            {/* Chat View - Right Panel */}
            <div
              className={`${
                isMobileView && showConversationList ? "hidden" : "block"
              } h-full overflow-hidden md:col-span-2 md:block`}
            >
              {selectedConversation ? (
                <ChatView
                  conversation={selectedConversation}
                  messages={messages}
                  onBack={handleBackToList}
                  showBackButton={isMobileView}
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="text-center">
                    <div className="mb-4 text-6xl">💬</div>
                    <p className="text-lg font-medium text-gray-400">
                      Select a conversation to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
