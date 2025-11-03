"use client";

import Link from "next/link";

interface Message {
  id: string;
  senderName: string;
  preview: string;
  timestamp: string;
  isUnread: boolean;
}

interface MessagesProps {
  messages: Message[];
}

export default function Messages({ messages }: MessagesProps) {
  const unreadCount = messages.filter((m) => m.isUnread).length;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Your Messages</h3>
          {unreadCount > 0 && (
            <p className="mt-1 text-sm text-gray-400">
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <Link
          href="/messages"
          className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          View All
        </Link>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-2xl mb-2">💬</p>
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="divide-y divide-white/10">
          {messages.slice(0, 5).map((message) => (
            <div
              key={message.id}
              className={`border-b border-white/10 p-4 transition-colors hover:bg-white/5 last:border-b-0 cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full">
                  {message.isUnread && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`font-medium ${
                        message.isUnread
                          ? "text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {message.senderName}
                    </p>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-400">
                    {message.preview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gradient accent */}
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl" />
    </div>
  );
}
