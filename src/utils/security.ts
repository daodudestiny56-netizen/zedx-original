/**
 * ZedX Security Protocols
 * Utilities for input sanitization and validation
 */

// Basic XSS sanitization for string inputs
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: "Cipher must be at least 8 characters long." };
  }
  // Add more complexity checks if needed (e.g. numbers, special chars)
  // For now, length is a good baseline for UX/Security balance in this demo
  return { valid: true };
};

export const mapAuthError = (error: any): string => {
  const msg = error.message?.toLowerCase() || "";
  
  if (msg.includes("user not found") || msg.includes("invalid") || msg.includes("credential")) {
    return "Neural Identity not recognized. Access Denied. Please Register first.";
  }
  if (msg.includes("password")) {
    return "Access Cipher Invalid. Security Protocol Engaged.";
  }
  if (msg.includes("network") || msg.includes("failed to fetch")) {
    return "Uplink destabilized. Check network connection.";
  }
  
  return "Security Error: " + (error.message || "Unknown anomaly detected.");
};
