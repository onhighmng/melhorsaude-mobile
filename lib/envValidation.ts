import { z } from 'zod';

/**
 * Environment Variables Validation
 *
 * Validates required environment variables at build/runtime
 * to catch configuration errors early.
 *
 * Security: Ensures required secrets are configured before deployment
 */

// Define the schema for environment variables
const envSchema = z.object({
  // Supabase (REQUIRED)
  VITE_SUPABASE_URL: z
    .string()
    .url('VITE_SUPABASE_URL must be a valid URL')
    .refine((url) => url.includes('supabase.co'), {
      message: 'VITE_SUPABASE_URL must be a Supabase URL',
    }),

  VITE_SUPABASE_ANON_KEY: z
    .string()
    .min(20, 'VITE_SUPABASE_ANON_KEY is required and must be at least 20 characters')
    .refine((key) => key.startsWith('eyJ'), {
      message: 'VITE_SUPABASE_ANON_KEY must be a valid JWT token',
    }),

  // Supabase Functions URL (OPTIONAL - defaults to production)
  VITE_SUPABASE_FUNCTIONS_URL: z
    .string()
    .url('VITE_SUPABASE_FUNCTIONS_URL must be a valid URL')
    .optional(),

  // Sentry (OPTIONAL - but recommended for production)
  VITE_SENTRY_DSN: z
    .string()
    .url('VITE_SENTRY_DSN must be a valid URL')
    .optional(),

  // App version (OPTIONAL - auto-generated)
  VITE_APP_VERSION: z.string().optional(),

});

// Export type for TypeScript
export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables
 *
 * Call this early in the application lifecycle (main.tsx)
 * to catch configuration errors before runtime.
 */
export function validateEnv(): Env {
  try {
    const env = envSchema.parse(process.env);

    // Additional runtime checks
    const isDevelopment = process.env.DEV;
    const isProduction = process.env.PROD;

    // Sentry is optional — no warning if DSN is absent

    // Log successful validation in development
    if (isDevelopment) {
      console.log('✅ [ENV] Environment variables validated successfully');
    }

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ [ENV] Invalid environment variables:');
      error.errors.forEach((err) => {
        console.error(`  • ${err.path.join('.')}: ${err.message}`);
      });

      // In development, show helpful message
      if (process.env.DEV) {
        console.error('\n💡 [ENV] Check your .env.local file and compare with .env.example');
      }

      throw new Error('Environment validation failed. Check console for details.');
    }

    throw error;
  }
}

/**
 * Get validated environment variables (cached)
 */
let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = validateEnv();
  }
  return cachedEnv;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.PROD;
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.DEV;
}

/**
 * Get application version
 */
export function getAppVersion(): string {
  return process.env.VITE_APP_VERSION || '1.0.0';
}
