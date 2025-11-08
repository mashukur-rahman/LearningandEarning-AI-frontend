"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
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
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <p className="mt-2 text-gray-400">
            Communicate with your {user?.role === "freelancer" ? "clients" : "freelancers"}
          </p>
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
    </div>
  );
}
