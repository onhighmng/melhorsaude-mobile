/**
 * Centralized logging utility
 * Replaces console.log with environment-aware logging
 * 
 * Usage:
 *   import { logger } from '@/utils/logger';
 *   logger.debug('Debug message', { data });
 *   logger.info('Info message');
 *   logger.warn('Warning message');
 *   logger.error('Error message', error);
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
} as const;

// In development, show all logs. In production, only warnings and errors
const currentLevel = process.env.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN;

// Helper to format log messages
const formatMessage = (level: string, ...args: unknown[]): unknown[] => {
  const timestamp = new Date().toISOString();
  return [`[${timestamp}] [${level}]`, ...args];
};

// Helper to sanitize sensitive data
const sanitize = (data: unknown): unknown => {
  if (typeof data !== 'object' || data === null) return data;

  const sanitized = { ...data } as Record<string, unknown>;
  const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'authorization'];

  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(k => key.toLowerCase().includes(k))) {
      sanitized[key] = '[REDACTED]';
    }
  }

  return sanitized;
};

export const logger = {
  /**
   * Debug-level logging (development only)
   * Use for detailed debugging information
   */
  debug: (...args: unknown[]) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.log(...formatMessage('DEBUG', ...args.map(sanitize)));
    }
  },

  /**
   * Info-level logging
   * Use for general informational messages
   */
  info: (...args: unknown[]) => {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.info(...formatMessage('INFO', ...args.map(sanitize)));
    }
  },

  /**
   * Warning-level logging
   * Use for potentially harmful situations
   */
  warn: (...args: unknown[]) => {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn(...formatMessage('WARN', ...args.map(sanitize)));
    }
  },

  /**
   * Error-level logging
   * Always logged, even in production
   * Use for error conditions
   */
  error: (...args: unknown[]) => {
    console.error(...formatMessage('ERROR', ...args.map(sanitize)));

    // In production, send to monitoring service (Sentry)
    if (process.env.PROD) {
      try {
        // Sentry integration (if available)
        if (typeof window !== 'undefined' && (window as any).Sentry) {
          const errorMessage = args
            .map(arg => (arg instanceof Error ? arg.message : String(arg)))
            .join(' ');
          (window as any).Sentry.captureMessage(errorMessage, { level: 'error' });
        }
      } catch (e) {
        // Fail silently if Sentry is not available
      }
    }
  },

  /**
   * Group logging (for related log messages)
   */
  group: (label: string, callback: () => void) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.group(label);
      callback();
      console.groupEnd();
    }
  },

  /**
   * Table logging (for structured data)
   */
  table: (data: unknown) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.table(sanitize(data));
    }
  }
};

// Export for backward compatibility
export default logger;
