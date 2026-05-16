/**
 * Client-Side Rate Limiter
 *
 * This provides basic client-side rate limiting for API calls.
 * Note: This is NOT a replacement for server-side rate limiting,
 * but provides UX improvements and reduces unnecessary requests.
 *
 * For production, implement server-side rate limiting via:
 * - Vercel Edge Config
 * - Upstash Redis
 * - Supabase rate limiting
 */

interface RateLimitConfig {
  /**
   * Maximum number of requests allowed
   */
  maxRequests: number;
  /**
   * Time window in milliseconds
   */
  windowMs: number;
  /**
   * Message to show when rate limited
   */
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private readonly PREFIX = 'ratelimit_';

  /**
   * Check if a request should be allowed
   *
   * @param key - Unique identifier for the rate limit (e.g., 'login:user@example.com')
   * @param config - Rate limit configuration
   * @returns Object with allowed status and remaining requests
   */
  check(key: string, config: RateLimitConfig): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    message?: string;
  } {
    const storageKey = this.PREFIX + key;
    const now = Date.now();

    // Get or create entry
    let entry = this.storage.get(storageKey);

    // Reset if window has passed
    if (!entry || now >= entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + config.windowMs
      };
      this.storage.set(storageKey, entry);
    }

    // Check if limit exceeded
    const allowed = entry.count < config.maxRequests;

    if (allowed) {
      entry.count++;
    }

    const remaining = Math.max(0, config.maxRequests - entry.count);

    return {
      allowed,
      remaining,
      resetTime: entry.resetTime,
      message: allowed ? undefined : (config.message || 'Too many requests. Please try again later.')
    };
  }

  /**
   * Reset rate limit for a specific key
   */
  reset(key: string): void {
    this.storage.delete(this.PREFIX + key);
  }

  /**
   * Clear all rate limit data (useful for testing)
   */
  clearAll(): void {
    this.storage.clear();
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (now >= entry.resetTime) {
        this.storage.delete(key);
      }
    }
  }
}

// Singleton instance
const rateLimiter = new RateLimiter();

// Auto-cleanup every 5 minutes
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);

// Rate limit configurations
export const RATE_LIMITS = {
  /**
   * Login attempts: 5 per 15 minutes
   */
  LOGIN: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    message: 'Muitas tentativas de login. Por favor, aguarde 15 minutos antes de tentar novamente.'
  },

  /**
   * Registration: 3 per hour
   */
  REGISTRATION: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000,
    message: 'Muitas tentativas de registo. Por favor, aguarde 1 hora antes de tentar novamente.'
  },

  /**
   * Password reset: 3 per hour
   */
  PASSWORD_RESET: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000,
    message: 'Muitas tentativas de redefinição de palavra-passe. Por favor, aguarde 1 hora.'
  },

  /**
   * Code redemption: 5 per 30 minutes
   */
  CODE_REDEMPTION: {
    maxRequests: 5,
    windowMs: 30 * 60 * 1000,
    message: 'Muitas tentativas de resgate de código. Por favor, aguarde 30 minutos.'
  },

  /**
   * Booking creation: 10 per 5 minutes
   */
  BOOKING_CREATE: {
    maxRequests: 10,
    windowMs: 5 * 60 * 1000,
    message: 'Muitas tentativas de marcação. Por favor, aguarde alguns minutos.'
  },

  /**
   * API calls: 100 per minute
   */
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 1000,
    message: 'Muitas requisições. Por favor, aguarde um minuto.'
  }
} as const;

/**
 * Helper function to check login rate limit
 */
export function checkLoginRateLimit(email: string) {
  return rateLimiter.check(`login:${email.toLowerCase()}`, RATE_LIMITS.LOGIN);
}

/**
 * Helper function to check registration rate limit
 */
export function checkRegistrationRateLimit(email: string) {
  return rateLimiter.check(`register:${email.toLowerCase()}`, RATE_LIMITS.REGISTRATION);
}

/**
 * Helper function to check password reset rate limit
 */
export function checkPasswordResetRateLimit(email: string) {
  return rateLimiter.check(`reset:${email.toLowerCase()}`, RATE_LIMITS.PASSWORD_RESET);
}

/**
 * Helper function to check code redemption rate limit
 */
export function checkCodeRedemptionRateLimit(userId: string) {
  return rateLimiter.check(`code:${userId}`, RATE_LIMITS.CODE_REDEMPTION);
}

/**
 * Helper function to check booking creation rate limit
 */
export function checkBookingRateLimit(userId: string) {
  return rateLimiter.check(`booking:${userId}`, RATE_LIMITS.BOOKING_CREATE);
}

/**
 * Generic rate limit check
 */
export function checkRateLimit(key: string, config: RateLimitConfig) {
  return rateLimiter.check(key, config);
}

/**
 * Reset rate limit for a key
 */
export function resetRateLimit(key: string) {
  rateLimiter.reset(key);
}

export default rateLimiter;
