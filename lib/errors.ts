/**
 * Typed Error Handling System
 *
 * Provides specific error types for better error handling and user feedback.
 * Instead of generic "Unknown error", we can provide specific error messages
 * and recovery strategies.
 */

/**
 * Base application error class
 */
export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly userMessage: string;
  readonly timestamp: Date;
  readonly context?: Record<string, any>;

  constructor(message: string, context?: Record<string, any>) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.context = context;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    return this.userMessage;
  }

  /**
   * Convert error to JSON for logging
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      userMessage: this.userMessage,
      timestamp: this.timestamp,
      context: this.context,
      stack: this.stack,
    };
  }
}

/**
 * Network/Connection errors
 */
export class NetworkError extends AppError {
  readonly code = 'NETWORK_ERROR';
  readonly userMessage = 'Connection failed. Please check your internet connection and try again.';
  readonly retry?: () => Promise<any>;

  constructor(message: string, retry?: () => Promise<any>, context?: Record<string, any>) {
    super(message, context);
    this.retry = retry;
  }
}

/**
 * Authentication errors
 */
export class AuthenticationError extends AppError {
  readonly code = 'AUTHENTICATION_ERROR';
  readonly userMessage: string;

  constructor(message: string, userMessage?: string, context?: Record<string, any>) {
    super(message, context);
    this.userMessage = userMessage || 'Authentication failed. Please log in again.';
  }
}

/**
 * Authorization/Permission errors
 */
export class PermissionError extends AppError {
  readonly code = 'PERMISSION_ERROR';
  readonly userMessage = 'You do not have permission to perform this action.';
  readonly requiredPermission?: string;

  constructor(
    message: string,
    requiredPermission?: string,
    context?: Record<string, any>
  ) {
    super(message, context);
    this.requiredPermission = requiredPermission;
  }
}

/**
 * Resource not found errors
 */
export class NotFoundError extends AppError {
  readonly code = 'NOT_FOUND';
  readonly userMessage: string;
  readonly resourceType?: string;
  readonly resourceId?: string;

  constructor(
    message: string,
    resourceType?: string,
    resourceId?: string,
    context?: Record<string, any>
  ) {
    super(message, context);
    this.resourceType = resourceType;
    this.resourceId = resourceId;
    this.userMessage = resourceType
      ? `${resourceType} not found.`
      : 'The requested resource was not found.';
  }
}

/**
 * Validation errors (user input)
 */
export class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR';
  readonly userMessage: string;
  readonly fields?: Record<string, string[]>;

  constructor(
    message: string,
    fields?: Record<string, string[]>,
    context?: Record<string, any>
  ) {
    super(message, context);
    this.fields = fields;
    this.userMessage = 'Please check your input and try again.';
  }

  /**
   * Get field-specific errors
   */
  getFieldErrors(fieldName: string): string[] {
    return this.fields?.[fieldName] || [];
  }

  /**
   * Check if a field has errors
   */
  hasFieldError(fieldName: string): boolean {
    return !!this.fields?.[fieldName]?.length;
  }
}

/**
 * Database/Backend errors
 */
export class DatabaseError extends AppError {
  readonly code = 'DATABASE_ERROR';
  readonly userMessage = 'A database error occurred. Please try again later.';
  readonly dbCode?: string;

  constructor(message: string, dbCode?: string, context?: Record<string, any>) {
    super(message, context);
    this.dbCode = dbCode;
  }
}

/**
 * Rate limiting errors
 */
export class RateLimitError extends AppError {
  readonly code = 'RATE_LIMIT_ERROR';
  readonly userMessage = 'Too many requests. Please wait a moment and try again.';
  readonly retryAfter?: number; // seconds

  constructor(message: string, retryAfter?: number, context?: Record<string, any>) {
    super(message, context);
    this.retryAfter = retryAfter;
  }
}

/**
 * Conflict errors (e.g., duplicate entries)
 */
export class ConflictError extends AppError {
  readonly code = 'CONFLICT_ERROR';
  readonly userMessage: string;

  constructor(message: string, userMessage?: string, context?: Record<string, any>) {
    super(message, context);
    this.userMessage = userMessage || 'This action conflicts with existing data.';
  }
}

/**
 * Generic application errors (fallback)
 */
export class ApplicationError extends AppError {
  readonly code = 'APPLICATION_ERROR';
  readonly userMessage = 'An unexpected error occurred. Please try again.';

  constructor(message: string, context?: Record<string, any>) {
    super(message, context);
  }
}

/**
 * Error type guard
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Convert unknown errors to AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new ApplicationError(error.message, {
      originalError: error.name,
      stack: error.stack,
    });
  }

  return new ApplicationError('An unknown error occurred', {
    originalError: String(error),
  });
}

/**
 * Handle Supabase errors and convert to AppError
 */
export function handleSupabaseError(error: any): AppError {
  // Authentication errors
  if (error.status === 401 || error.code === 'PGRST301') {
    return new AuthenticationError(
      error.message,
      'Your session has expired. Please log in again.',
      { originalError: error }
    );
  }

  // Permission errors (RLS violations)
  if (error.status === 403 || error.code === 'PGRST204' || error.code === '42501') {
    return new PermissionError(error.message, undefined, { originalError: error });
  }

  // Not found errors
  if (error.status === 404 || error.code === '42P01') {
    return new NotFoundError(error.message, undefined, undefined, { originalError: error });
  }

  // Unique constraint violations
  if (error.code === '23505') {
    return new ConflictError(
      error.message,
      'This record already exists.',
      { originalError: error }
    );
  }

  // Foreign key violations
  if (error.code === '23503') {
    return new ValidationError(
      error.message,
      undefined,
      { originalError: error }
    );
  }

  // Database errors
  if (error.code?.startsWith('P') || error.code?.startsWith('42')) {
    return new DatabaseError(error.message, error.code, { originalError: error });
  }

  // Network errors
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    return new NetworkError(error.message, undefined, { originalError: error });
  }

  // Generic fallback
  return new ApplicationError(error.message || 'Database operation failed', {
    originalError: error,
  });
}

/**
 * Result type for operations that can fail
 */
export type Result<T, E = AppError> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };

/**
 * Create successful result
 */
export function Ok<T>(data: T): Result<T, never> {
  return { success: true, data, error: null };
}

/**
 * Create error result
 */
export function Err<E extends AppError>(error: E): Result<never, E> {
  return { success: false, data: null, error };
}

/**
 * Wrap a function that might throw in a Result type
 */
export async function tryAsync<T>(
  fn: () => Promise<T>
): Promise<Result<T, AppError>> {
  try {
    const data = await fn();
    return Ok(data);
  } catch (error) {
    return Err(toAppError(error));
  }
}

/**
 * Wrap a sync function that might throw in a Result type
 */
export function trySync<T>(fn: () => T): Result<T, AppError> {
  try {
    const data = fn();
    return Ok(data);
  } catch (error) {
    return Err(toAppError(error));
  }
}
