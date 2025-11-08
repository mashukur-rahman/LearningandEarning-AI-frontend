// Content Moderation Utility for detecting risky content in messages

export interface ModerationResult {
  isBlocked: boolean;
  reasons: string[];
  detectedPatterns: string[];
}

// Regex patterns for detecting risky content
const patterns = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  phoneAlt: /\b\d{10,}\b/g,
  
  // Social media patterns
  whatsapp: /\b(whatsapp|whats app|wa\.me)\b/gi,
  telegram: /\b(telegram|t\.me)\b/gi,
  skype: /\b(skype|skype id)\b/gi,
  discord: /\b(discord|discord id)\b/gi,
  instagram: /\b(instagram|insta|ig)\b/gi,
  facebook: /\b(facebook|fb)\b/gi,
  twitter: /\b(twitter|x\.com)\b/gi,
  linkedin: /\b(linkedin)\b/gi,
  
  // Payment methods
  paypal: /\b(paypal|pay pal)\b/gi,
  venmo: /\b(venmo)\b/gi,
  cashapp: /\b(cash app|cashapp|\$[a-zA-Z0-9_]+)\b/gi,
  zelle: /\b(zelle)\b/gi,
  wise: /\b(wise|transferwise)\b/gi,
  crypto: /\b(bitcoin|btc|ethereum|eth|crypto|wallet address)\b/gi,
  
  // URLs and websites
  url: /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/g,
  
  // Generic patterns
  dotCom: /\b[a-zA-Z0-9-]+\s*\.\s*com\b/gi,
  atSymbol: /\s@\s[a-zA-Z0-9]+/g,
};

// Suspicious phrases that indicate trying to move off-platform
const suspiciousPhrases = [
  // Short direct phrases
  "email me",
  "call me",
  "text me",
  "dm me",
  "message me",
  "reach me",
  "contact me",
  
  // Longer variations
  "contact me directly",
  "reach me at",
  "email me at",
  "call me at",
  "text me at",
  "add me on",
  "find me on",
  "message me on",
  "dm me on",
  "connect with me on",
  "let's take this offline",
  "let's talk outside",
  "contact outside of",
  "reach out to me",
  "my contact",
  "personal contact",
  "direct contact",
  "contact info",
  "contact information",
  "off platform",
  "outside platform",
  "leave platform",
  "work directly",
  "hire me directly",
  "pay me directly",
  "send money to",
  "payment outside",
  "external payment",
  "share my email",
  "share my number",
  "share my phone",
  "give you my email",
  "give you my number",
  "give you my phone",
];

/**
 * Check if a message contains risky content
 */
export function moderateContent(message: string): ModerationResult {
  const result: ModerationResult = {
    isBlocked: false,
    reasons: [],
    detectedPatterns: [],
  };

  const lowerMessage = message.toLowerCase();

  // Check for email addresses
  if (patterns.email.test(message)) {
    result.isBlocked = true;
    result.reasons.push("Email addresses are not allowed");
    result.detectedPatterns.push("Email address");
  }

  // Check for phone numbers
  if (patterns.phone.test(message) || patterns.phoneAlt.test(message.replace(/\s/g, ""))) {
    result.isBlocked = true;
    result.reasons.push("Phone numbers are not allowed");
    result.detectedPatterns.push("Phone number");
  }

  // Check for social media
  if (patterns.whatsapp.test(message)) {
    result.isBlocked = true;
    result.reasons.push("WhatsApp references are not allowed");
    result.detectedPatterns.push("WhatsApp");
  }

  if (patterns.telegram.test(message)) {
    result.isBlocked = true;
    result.reasons.push("Telegram references are not allowed");
    result.detectedPatterns.push("Telegram");
  }

  if (patterns.skype.test(message)) {
    result.isBlocked = true;
    result.reasons.push("Skype references are not allowed");
    result.detectedPatterns.push("Skype");
  }

  if (patterns.discord.test(message)) {
    result.isBlocked = true;
    result.reasons.push("Discord references are not allowed");
    result.detectedPatterns.push("Discord");
  }

  if (patterns.instagram.test(message)) {
    result.isBlocked = true;
    result.reasons.push("Instagram references are not allowed");
    result.detectedPatterns.push("Instagram");
  }

  if (patterns.facebook.test(message)) {
    result.isBlocked = true;
    result.reasons.push("Facebook references are not allowed");
    result.detectedPatterns.push("Facebook");
  }

  // Check for payment methods
  if (patterns.paypal.test(message)) {
    result.isBlocked = true;
    result.reasons.push("External payment methods are not allowed");
    result.detectedPatterns.push("PayPal");
  }

  if (patterns.venmo.test(message)) {
    result.isBlocked = true;
    result.reasons.push("External payment methods are not allowed");
    result.detectedPatterns.push("Venmo");
  }

  if (patterns.cashapp.test(message)) {
    result.isBlocked = true;
    result.reasons.push("External payment methods are not allowed");
    result.detectedPatterns.push("Cash App");
  }

  if (patterns.zelle.test(message)) {
    result.isBlocked = true;
    result.reasons.push("External payment methods are not allowed");
    result.detectedPatterns.push("Zelle");
  }

  if (patterns.crypto.test(message)) {
    result.isBlocked = true;
    result.reasons.push("Cryptocurrency payments are not allowed");
    result.detectedPatterns.push("Cryptocurrency");
  }

  // Check for URLs
  if (patterns.url.test(message) || patterns.dotCom.test(message)) {
    result.isBlocked = true;
    result.reasons.push("External links and websites are not allowed");
    result.detectedPatterns.push("Website/URL");
  }

  // Check for suspicious phrases
  for (const phrase of suspiciousPhrases) {
    if (lowerMessage.includes(phrase)) {
      result.isBlocked = true;
      result.reasons.push("Message contains suspicious content attempting to move conversation off-platform");
      result.detectedPatterns.push(`"${phrase}"`);
      break; // Only add this reason once
    }
  }

  // Remove duplicate reasons
  result.reasons = [...new Set(result.reasons)];
  result.detectedPatterns = [...new Set(result.detectedPatterns)];

  return result;
}

/**
 * Get a user-friendly warning message
 */
export function getWarningMessage(result: ModerationResult): string {
  if (result.detectedPatterns.length === 0) {
    return "Your message contains content that violates our terms of service.";
  }

  return `Your message was blocked because it contains: ${result.detectedPatterns.join(", ")}. Please keep all communication on our platform for your safety and protection.`;
}

