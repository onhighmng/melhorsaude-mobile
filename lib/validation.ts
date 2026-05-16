import { z } from 'zod';

/**
 * Validation Schemas
 *
 * Centralized validation schemas for input sanitization and data validation.
 * All user input should be validated against these schemas before processing.
 */

// ====================================
// Authentication Schemas
// ====================================

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email é obrigatório')
  .email('Email inválido')
  .max(255, 'Email muito longo')
  .toLowerCase();

export const passwordSchema = z
  .string()
  .min(8, 'A palavra-passe deve ter pelo menos 8 caracteres')
  .max(128, 'Palavra-passe muito longa')
  .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Deve conter pelo menos um número')
  .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, 'Contém caracteres inválidos');

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Nome deve ter pelo menos 2 caracteres')
  .max(100, 'Nome muito longo')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome contém caracteres inválidos');

// ====================================
// Company Registration Schemas
// ====================================

export const companyNameSchema = z
  .string()
  .trim()
  .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
  .max(200, 'Nome da empresa muito longo')
  .regex(/^[a-zA-ZÀ-ÿ0-9\s.,'&()-]+$/, 'Nome da empresa contém caracteres inválidos');

export const accessCodeSchema = z
  .string()
  .trim()
  .min(6, 'Código de acesso inválido')
  .max(50, 'Código de acesso muito longo')
  .regex(/^[A-Z0-9-]+$/, 'Código de acesso deve conter apenas letras maiúsculas, números e hífens');

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[0-9+\s()-]{7,20}$/, 'Número de telefone inválido')
  .optional()
  .or(z.literal(''));

export const taxIdSchema = z
  .string()
  .trim()
  .min(1, 'Identificação fiscal é obrigatória')
  .max(50, 'Identificação fiscal muito longa')
  .regex(/^[0-9A-Z-]+$/, 'Identificação fiscal contém caracteres inválidos')
  .optional()
  .or(z.literal(''));

export const addressSchema = z
  .string()
  .trim()
  .max(500, 'Endereço muito longo')
  .optional()
  .or(z.literal(''));

// ====================================
// Booking Schemas
// ====================================

export const bookingNotesSchema = z
  .string()
  .trim()
  .max(2000, 'Notas muito longas')
  .optional()
  .or(z.literal(''));

export const meetingLinkSchema = z
  .string()
  .trim()
  .url('Link de reunião inválido')
  .max(500, 'Link muito longo')
  .optional()
  .or(z.literal(''));

// ====================================
// Resource Schemas
// ====================================

export const resourceTitleSchema = z
  .string()
  .trim()
  .min(3, 'Título deve ter pelo menos 3 caracteres')
  .max(200, 'Título muito longo');

export const resourceDescriptionSchema = z
  .string()
  .trim()
  .min(10, 'Descrição deve ter pelo menos 10 caracteres')
  .max(2000, 'Descrição muito longa');

export const urlSchema = z
  .string()
  .trim()
  .url('URL inválido')
  .max(1000, 'URL muito longo')
  .optional()
  .or(z.literal(''));

// ====================================
// Complete Form Schemas
// ====================================

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Palavra-passe é obrigatória') // Don't validate strength on login
});

export const registerFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: nameSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As palavras-passe não coincidem',
  path: ['confirmPassword']
});

export const companyRegistrationSchema = z.object({
  companyName: companyNameSchema,
  taxId: taxIdSchema,
  address: addressSchema,
  phone: phoneSchema,
  email: emailSchema,
  adminFullName: nameSchema,
  adminEmail: emailSchema,
  adminPassword: passwordSchema
});

export const employeeRegistrationSchema = z.object({
  accessCode: accessCodeSchema,
  fullName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As palavras-passe não coincidem',
  path: ['confirmPassword']
});

// ====================================
// Utility Functions
// ====================================

/**
 * Sanitize string input by removing potentially dangerous characters
 * and limiting length
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Sanitize HTML to prevent XSS
 * For rich text, use DOMPurify library instead
 */
export function sanitizeHTML(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate and sanitize email
 */
export function validateEmail(email: string): { valid: boolean; sanitized: string; error?: string } {
  try {
    const sanitized = emailSchema.parse(email);
    return { valid: true, sanitized };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, sanitized: email, error: error.errors[0].message };
    }
    return { valid: false, sanitized: email, error: 'Email inválido' };
  }
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  try {
    passwordSchema.parse(password);
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.errors.map(e => e.message) };
    }
    return { valid: false, errors: ['Palavra-passe inválida'] };
  }
}
