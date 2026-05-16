/**
 * Utility functions for company data processing
 */

const PILLAR_LABELS: Record<string, string> = {
  PSYCH: 'Saúde Mental',
  psychological: 'Saúde Mental',
  PHYSICAL: 'Bem-Estar Físico',
  physical: 'Bem-Estar Físico',
  FINANCIAL: 'Assistência Financeira',
  financial: 'Assistência Financeira',
  LEGAL: 'Assistência Jurídica',
  legal_social: 'Assistência Jurídica',
};

const PILLAR_NORMALIZE: Record<string, string> = {
  psychological: 'PSYCH',
  physical: 'PHYSICAL',
  financial: 'FINANCIAL',
  legal_social: 'LEGAL',
};

const EXCLUDED_STATUSES = new Set([
  'cancelled',
  'canceled',
  'declined',
  'no_show',
  'no-show',
]);

/**
 * Normalize pillar codes to canonical format
 */
export function canonicalizePillar(pillar?: string | null): string | null {
  if (!pillar) return null;
  return PILLAR_NORMALIZE[pillar] || pillar;
}

/**
 * Get user-friendly label for pillar code
 */
export function getPillarLabel(pillar?: string | null): string {
  if (!pillar) return 'Outro';
  const canonical = canonicalizePillar(pillar);
  return PILLAR_LABELS[canonical || pillar] || pillar;
}

/**
 * Check if booking status should be included in analytics
 */
export function isRelevantStatus(status?: string | null): boolean {
  if (!status) return true;
  return !EXCLUDED_STATUSES.has(status.toLowerCase());
}

/**
 * Format date for database queries (UTC format)
 */
export function formatDateForQuery(date: Date): string {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    .toISOString()
    .split('T')[0];
}
