"use client";

import { useState, useRef, useEffect } from "react";
import { autoReplies } from "@/data/messages/autoReplies";
import { moderateContent } from "@/utils/contentModeration";
import ModerationWarningModal from "./ModerationWarningModal";
import "./scrollbar.css";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

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

interface ChatViewProps {
  conversation: Conversation;
  messages: Message[];
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function ChatView({
  conversation,
  messages,
  onBack,
  showBackButton = false,
}: ChatViewProps) {
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState(messages);
  const [replyIndex, setReplyIndex] = useState(0);
  const [isOtherPersonTyping, setIsOtherPersonTyping] = useState(false);
  const [showModerationModal, setShowModerationModal] = useState(false);
  const [moderationReasons, setModerationReasons] = useState<string[]>([]);
  const [moderationPatterns, setModerationPatterns] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Content moderation check
    const moderationResult = moderateContent(newMessage);
    
    if (moderationResult.isBlocked) {
      // Show warning modal
      setModerationReasons(moderationResult.reasons);
      setModerationPatterns(moderationResult.detectedPatterns);
      setShowModerationModal(true);
      return;
    }

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: "me",
      senderName: "You",
      content: newMessage,
      timestamp: "Just now",
      isOwn: true,
    };

    setLocalMessages([...localMessages, newMsg]);
    setNewMessage("");

    // Show typing indicator
    setIsOtherPersonTyping(true);

    // Simulate auto-reply after 1.5 seconds
    setTimeout(() => {
      setIsOtherPersonTyping(false);
      
      const autoReplyMsg: Message = {
        id: `m${Date.now() + 1}`,
        senderId: "other",
        senderName: conversation.participantName,
        content: autoReplies[replyIndex % autoReplies.length],
        timestamp: "Just now",
        isOwn: false,
      };

      setLocalMessages((prev) => [...prev, autoReplyMsg]);
      setReplyIndex((prev) => prev + 1);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/10 bg-black/30 p-4">
        <div className="flex items-center gap-3">
          {/* Back Button (Mobile) */}
          {showBackButton && (
            <button
              onClick={onBack}
              className="flex items-center justify-center rounded-lg p-2 hover:bg-white/10 md:hidden"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Avatar */}
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base font-semibold ${
              conversation.participantRole === "client"
                ? "bg-purple-600/30 text-purple-300"
                : "bg-blue-600/30 text-blue-300"
            }`}
          >
            {conversation.avatar}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white">
              {conversation.participantName}
            </h3>
            <p className="truncate text-xs text-gray-400">
              {conversation.projectTitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              title="Video Call"
            >
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              title="More Options"
            >
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
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
        {localMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mb-3 text-5xl">👋</div>
              <p className="text-gray-400">
                Start the conversation by sending a message
              </p>
            </div>
          </div>
        ) : (
          <>
            {localMessages.map((message, index) => {
              const showAvatar =
                index === 0 ||
                localMessages[index - 1].isOwn !== message.isOwn;

              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${
                    message.isOwn ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {showAvatar && !message.isOwn ? (
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                          conversation.participantRole === "client"
                            ? "bg-purple-600/30 text-purple-300"
                            : "bg-blue-600/30 text-blue-300"
                        }`}
                      >
                        {conversation.avatar}
                      </div>
                    ) : (
                      <div className="h-8 w-8" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[70%] ${
                      message.isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`relative rounded-2xl px-4 py-2.5 ${
                        message.isOwn
                          ? "bg-blue-600 text-white"
                          : "border border-white/10 bg-white/10 text-white backdrop-blur-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {/* Timestamp */}
                      <p
                        className={`mt-1 text-xs ${
                          message.isOwn
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Typing Indicator */}
            {isOtherPersonTyping && (
              <div className="flex items-end gap-2">
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                      conversation.participantRole === "client"
                        ? "bg-purple-600/30 text-purple-300"
                        : "bg-blue-600/30 text-blue-300"
                    }`}
                  >
                    {conversation.avatar}
                  </div>
                </div>
                <div className="max-w-[70%]">
                  <div className="relative rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-white/10 bg-black/30 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          {/* Attachment Button */}
          <button
            type="button"
            className="flex-shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Attach File"
          >
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>

          {/* Text Input */}
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type your message..."
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-white/40 focus:bg-white/10 focus:outline-none"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="flex-shrink-0 rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>

        <p className="mt-2 text-xs text-gray-500">
          Press Enter to send
        </p>
      </div>

      {/* Moderation Warning Modal */}
      <ModerationWarningModal
        isOpen={showModerationModal}
        onClose={() => setShowModerationModal(false)}
        reasons={moderationReasons}
        detectedPatterns={moderationPatterns}
      />
    </div>
  );
}
