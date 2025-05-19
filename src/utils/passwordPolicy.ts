
// Password policy utilities for authentication
// These functions help enforce strong password requirements

/**
 * Validates if a password meets the security requirements
 * Requirements:
 * - At least 12 characters long
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 * - Contains at least one special character
 * - Doesn't contain common patterns
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check minimum length
  if (password.length < 12) {
    errors.push("Password must be at least 12 characters long");
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  // Check for numbers
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  // Check for special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  // Check for common patterns (simple check)
  const commonPatterns = [
    "password",
    "123456",
    "qwerty",
    "admin",
    "welcome",
    "portfolio"
  ];
  
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    errors.push("Password contains common easily guessable patterns");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generates a secure password hint that doesn't reveal the actual password
 */
export function generatePasswordHint(password: string): string {
  // Create a hint with first character, length indicator and last character
  const firstChar = password.charAt(0);
  const lastChar = password.charAt(password.length - 1);
  return `${firstChar}${"*".repeat(password.length - 2)}${lastChar} (${password.length} characters)`;
}

/**
 * Checks if the account is locked due to too many failed attempts
 */
export function checkAccountLockStatus(
  failedAttempts: number,
  lastFailedAttempt: Date | null
): {
  isLocked: boolean;
  remainingTime: number | null;
  maxAttempts: number;
} {
  const MAX_ATTEMPTS = 5;
  const LOCK_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  
  // If under the attempt limit, account is not locked
  if (failedAttempts < MAX_ATTEMPTS) {
    return {
      isLocked: false,
      remainingTime: null,
      maxAttempts: MAX_ATTEMPTS
    };
  }
  
  // If no last attempt recorded, should not happen but handle it
  if (!lastFailedAttempt) {
    return {
      isLocked: false,
      remainingTime: null,
      maxAttempts: MAX_ATTEMPTS
    };
  }
  
  const now = new Date();
  const timeSinceLastAttempt = now.getTime() - lastFailedAttempt.getTime();
  const remainingLockTime = LOCK_DURATION - timeSinceLastAttempt;
  
  // If lock duration has passed, account is no longer locked
  if (remainingLockTime <= 0) {
    return {
      isLocked: false,
      remainingTime: null,
      maxAttempts: MAX_ATTEMPTS
    };
  }
  
  // Account is still locked
  return {
    isLocked: true,
    remainingTime: Math.ceil(remainingLockTime / 1000), // in seconds
    maxAttempts: MAX_ATTEMPTS
  };
}

/**
 * Returns security recommendations for password management
 */
export function getPasswordRecommendations(): string[] {
  return [
    "Use a different password for each of your accounts",
    "Consider using a password manager like 1Password, LastPass, or Bitwarden",
    "Enable two-factor authentication whenever possible",
    "Change your password every 90 days",
    "Never share your password with others",
    "Avoid using personal information in your password",
    "Don't write down your password or store it in an unsecured location"
  ];
}
