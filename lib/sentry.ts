// Sentry disabled for mobile - not available in Expo environment
// import * as Sentry from '@sentry/react';

/**
 * Sentry Error Monitoring Configuration
 *
 * Tracks errors, performance, and user sessions in production.
 * Configured to respect user privacy and GDPR compliance.
 */

const SENTRY_DSN = process.env.VITE_SENTRY_DSN;
const ENVIRONMENT = process.env.NODE_ENV || 'development'; // 'development' or 'production'
const APP_VERSION = process.env.VITE_APP_VERSION || '1.0.0';

/**
 * Initialize Sentry
 *
 * Call this once at app startup (main.tsx)
 */
export function initSentry() {
  // Sentry disabled for mobile
  return;
  /*
  // Only initialize if DSN is provided
  if (!SENTRY_DSN) {
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
    release: `melhorsaude@${APP_VERSION}`,

    // Integrations
    integrations: [
      // React-specific integrations
      Sentry.browserTracingIntegration({
        // Track route changes
        enableInp: true,
      }),
      Sentry.replayIntegration({
        // Session replay for debugging (privacy-aware)
        maskAllText: true, // Mask all text for privacy
        blockAllMedia: true, // Block images/videos
        maskAllInputs: true, // Mask form inputs
      }),
    ],

    // Performance Monitoring
    tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0, // 10% in production, 100% in dev
    tracePropagationTargets: [
      'localhost',
      /^https:\/\/.*\.supabase\.co/,
      /^https:\/\/melhorsaude\.(mz|co\.mz)/,
    ],

    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Privacy & Security
    beforeSend(event) {
      // Filter sensitive data
      if (event.request) {
        // Remove sensitive headers
        delete event.request.cookies;

        // Remove sensitive query params
        if (event.request.url) {
          const url = new URL(event.request.url);
          ['token', 'apikey', 'password', 'api_key'].forEach(param => {
            url.searchParams.delete(param);
          });
          event.request.url = url.toString();
        }
      }

      // Remove sensitive context
      if (event.contexts) {
        delete event.contexts['device']?.['name']; // Remove device name
      }

      return event;
    },

    // Ignore common non-critical errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'atomicFindClose',

      // Network errors (expected)
      'NetworkError',
      'Network request failed',
      'Failed to fetch',

      // User cancellations
      'AbortError',
      'The user aborted a request',

      // ResizeObserver (benign)
      'ResizeObserver loop',
    ],

    // Don't send errors from browser extensions
    denyUrls: [
      /extensions\//i,
      /^chrome:\/\//i,
      /^moz-extension:\/\//i,
    ],
  });

  console.log(`✅ Sentry initialized (${ENVIRONMENT})`);
  */
}

// No-op stubs for mobile (Sentry disabled)
export function setSentryUser(user: {
  id: string;
  email?: string;
  role?: string;
  company_id?: string;
}) {
  // No-op
}

export function clearSentryUser() {
  // No-op
}

export function addBreadcrumb(message: string, category?: string, data?: Record<string, any>) {
  // No-op
}

export function captureException(error: Error | unknown, context?: Record<string, any>) {
  // No-op
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  // No-op
}

export function startSpan(options: { name: string; op: string }) {
  return null;
}
