"use client";

import { Certificate, Badge, getRarityColor } from "@/data/certifications/mockCertifications";
import { useState } from "react";

interface CertificateModalProps {
  isOpen: boolean;
  item: Certificate | Badge | null;
  onClose: () => void;
}

const isBadge = (item: Certificate | Badge | null): item is Badge => {
  return item !== null && "rarity" in item;
};

export default function CertificateModal({
  isOpen,
  item,
  onClose,
}: CertificateModalProps) {
  const [copiedCredentialId, setCopiedCredentialId] = useState(false);

  if (!isOpen || !item) return null;

  const isBadgeItem = isBadge(item);

  const handleDownload = () => {
    // Simulate downloading the certificate
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Certificate of Completion\n\n${item.title}\n\nIssued to: Freelancer\nIssued by: ${
          isBadgeItem ? "Learning & Earning AI" : item.issuedBy
        }\nDate: ${
          isBadgeItem
            ? new Date(item.earnedDate).toLocaleDateString()
            : new Date(item.issuedDate).toLocaleDateString()
        }`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${item.title.replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyCredentialId = () => {
    if (!isBadgeItem && item.credentialId) {
      navigator.clipboard.writeText(item.credentialId);
      setCopiedCredentialId(true);
      setTimeout(() => setCopiedCredentialId(false), 2000);
    }
  };

  const handleShare = () => {
    const shareText = `I just earned the "${item.title}" credential from Learning & Earning AI! 🎉`;
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: shareText,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert("Share text copied to clipboard!");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-black border border-white/10 rounded-2xl backdrop-blur-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-4xl">{item.icon}</span>
            {item.title}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 mb-2">
              Description
            </h3>
            <p className="text-white/80">{item.description}</p>
          </div>

          {/* Badge-specific info */}
          {isBadgeItem && (
            <>
              {/* Skill & Level Badges */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 mb-3">Skill & Proficiency</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <div>
                    <span className="inline-block px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {item.skill}
                    </span>
                  </div>
                  <div>
                    <span className="inline-block px-3 py-2 rounded-lg text-sm font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.level}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">Rarity</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${getRarityColor(
                        item.rarity
                      )} text-white`}
                    >
                      {item.rarity.charAt(0).toUpperCase() +
                        item.rarity.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">Earned Date</p>
                  <p className="text-white font-semibold">
                    {new Date(item.earnedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {item.condition && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-2">How to Earn</p>
                  <p className="text-white/80">{item.condition}</p>
                </div>
              )}

              {item.progress !== undefined && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-2">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-white/70">
                      {item.progress}%
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Certificate-specific info */}
          {!isBadgeItem && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">Category</p>
                  <p className="text-white font-semibold">{item.category}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">Issued Date</p>
                  <p className="text-white font-semibold">
                    {new Date(item.issuedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 mb-1">Issued By</p>
                <p className="text-white font-semibold">{item.issuedBy}</p>
              </div>

              {item.expiryDate && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">Expiry Date</p>
                  <p className="text-white font-semibold">
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {item.credentialId && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-2">Credential ID</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs text-blue-400 font-mono bg-black/50 px-3 py-2 rounded border border-white/10 break-all">
                      {item.credentialId}
                    </code>
                    <button
                      onClick={handleCopyCredentialId}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                    >
                      {copiedCredentialId ? "✓" : "Copy"}
                    </button>
                  </div>
                </div>
              )}

              {item.projectLink && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-2">Project Link</p>
                  <a
                    href={item.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm break-all transition-colors"
                  >
                    {item.projectLink}
                  </a>
                </div>
              )}
            </>
          )}

          {/* Certificate Preview */}
          {!isBadgeItem && (
            <div className="p-6 rounded-xl border-2 border-dashed border-white/20 bg-gradient-to-br from-white/5 to-white/2 text-center">
              <p className="text-white/60 text-sm mb-2">Certificate Preview</p>
              <div className="text-6xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                Issued by {item.issuedBy}
              </p>
              <p className="text-white/50 text-xs">
                {new Date(item.issuedDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Footer - Action Buttons */}
        <div className="sticky bottom-0 bg-black border-t border-white/10 p-6 flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-colors border border-white/20"
          >
            Share 🔗
          </button>
          {!isBadgeItem && (
            <button
              onClick={handleDownload}
              className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors border border-blue-500/50"
            >
              Download 📥
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
