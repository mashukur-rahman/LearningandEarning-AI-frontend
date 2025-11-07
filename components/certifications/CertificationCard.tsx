"use client";

import { Certificate, Badge, getRarityColor, getRarityBorder } from "@/data/certifications/mockCertifications";

interface CertificationCardProps {
  item: Certificate | Badge;
  onViewDetails: (item: Certificate | Badge) => void;
}

const isBadge = (item: Certificate | Badge): item is Badge => {
  return "rarity" in item;
};

export default function CertificationCard({
  item,
  onViewDetails,
}: CertificationCardProps) {
  if (isBadge(item)) {
    return (
      <div
        onClick={() => onViewDetails(item)}
        className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:bg-white/8 hover:border-white/20"
      >
        {/* Badge Icon and Rarity Header */}
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`inline-flex items-center justify-center h-16 w-16 rounded-full text-3xl ${
              item.color
            } ring-2 ${getRarityBorder(item.rarity)} ring-offset-2 ring-offset-black group-hover:scale-110 transition-transform`}
          >
            {item.icon}
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${getRarityColor(
              item.rarity
            )} text-white border border-white/20`}
          >
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </span>
        </div>

        {/* Skill Badge */}
        <div className="mb-3">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {item.skill}
          </span>
          <span className="ml-2 inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {item.level}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
        <p className="text-sm text-white/60 mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Date and Condition */}
        <div className="space-y-2 border-t border-white/10 pt-4">
          {item.condition && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/50">How to earn:</span>
              <span className="text-xs text-blue-400">{item.condition}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50">
              Earned {new Date(item.earnedDate).toLocaleDateString()}
            </span>
            <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              View →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Certificate
  return (
    <div
      onClick={() => onViewDetails(item)}
      className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10"
    >
      {/* Certificate Preview Header */}
      <div className={`${item.badgeColor} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{item.icon}</span>
            <div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm opacity-90">{item.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="p-6">
        <p className="text-sm text-white/70 mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Info Grid */}
        <div className="space-y-3 mb-4 border-t border-white/10 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">Issued By</span>
            <span className="text-sm text-white/80">{item.issuedBy}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">Issued Date</span>
            <span className="text-sm text-white/80">
              {new Date(item.issuedDate).toLocaleDateString()}
            </span>
          </div>
          {item.expiryDate && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/50">Expires</span>
              <span className="text-sm text-white/80">
                {new Date(item.expiryDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {item.credentialId && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/50">Credential ID</span>
              <span className="text-xs text-blue-400 font-mono">
                {item.credentialId}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors border border-blue-500/50">
          View Details
        </button>
      </div>
    </div>
  );
}
