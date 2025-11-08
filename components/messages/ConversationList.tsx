"use client";

import { useState } from "react";
import "./scrollbar.css";

interface Conversation {
  id: string;
  participantName: string;
  participantRole: "client" | "freelancer";
  lastMessage: string;
  timestamp: string;
  isUnread: boolean;
  avatar: string;
  projectTitle: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelectConversation,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = conversations.filter((c) => c.isUnread).length;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Conversations</h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Search Bar */}
        <div className="mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 pl-10 text-sm text-white placeholder-gray-500 transition-colors focus:border-white/40 focus:bg-white/10 focus:outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-sm text-gray-400">No conversations found</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full p-4 text-left transition-all hover:bg-white/10 ${
                  selectedId === conversation.id
                    ? "bg-white/10 border-l-4 border-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold ${
                        conversation.participantRole === "client"
                          ? "bg-purple-600/30 text-purple-300"
                          : "bg-blue-600/30 text-blue-300"
                      }`}
                    >
                      {conversation.avatar}
                    </div>
                    {conversation.isUnread && (
                      <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-black bg-blue-500" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p
                          className={`truncate text-sm font-medium ${
                            conversation.isUnread ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {conversation.participantName}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {conversation.projectTitle}
                        </p>
                      </div>
                      <span className="flex-shrink-0 text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p
                      className={`mt-1.5 truncate text-sm ${
                        conversation.isUnread ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Compose Button */}
      <div className="border-t border-white/10 p-4">
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Message
          </div>
        </button>
      </div>
    </div>
  );
}

