import { z } from "zod";

/**
 * Environment variable schema
 * Validates required environment variables at application startup
 */
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url("Invalid Supabase URL"),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, "Supabase anon key is required"),
  VITE_SENTRY_DSN: z.string().url("Invalid Sentry DSN").optional(),
  VITE_APP_VERSION: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates and returns typed environment variables
 * @throws {Error} If required environment variables are missing or invalid
 */
export function getEnv(): Env {
  try {
    return envSchema.parse({
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
      VITE_SENTRY_DSN: process.env.VITE_SENTRY_DSN,
      VITE_APP_VERSION: process.env.VITE_APP_VERSION,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      throw new Error(
        `Environment validation failed:\n${missingVars.join("\n")}\n\nPlease check your .env.local file against .env.example`
      );
    }
    throw error;
  }
}

/**
 * Validated environment variables
 * Use this instead of process.env for type safety
 */
export const env = getEnv();
