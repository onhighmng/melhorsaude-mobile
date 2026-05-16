/**
 * Centralized pillar code mapping utility
 *
 * Database uses UPPERCASE codes: PSYCH, PHYSICAL, FINANCIAL, LEGAL
 * Frontend UI uses lowercase for display: psychological, physical, financial, legal
 *
 * This utility ensures consistent mapping across the entire application.
 */

// Database enum values (UPPERCASE)
export type DatabasePillarCode = 'PSYCH' | 'PHYSICAL' | 'FINANCIAL' | 'LEGAL';

// Frontend display values (lowercase - for backwards compatibility)
export type DisplayPillarCode = 'psychological' | 'physical' | 'financial' | 'legal' | 'legal_social';

// Portuguese category names
export type PortuguesePillarCategory = 'saude_mental' | 'bem_estar_fisico' | 'financeiro' | 'juridico';

/**
 * Map from database codes (UPPERCASE) to display codes (lowercase)
 */
export const DB_TO_DISPLAY: Record<DatabasePillarCode, DisplayPillarCode> = {
  'PSYCH': 'psychological',
  'PHYSICAL': 'physical',
  'FINANCIAL': 'financial',
  'LEGAL': 'legal'
};

/**
 * Map from display codes (lowercase) to database codes (UPPERCASE)
 */
export const DISPLAY_TO_DB: Record<DisplayPillarCode, DatabasePillarCode> = {
  'psychological': 'PSYCH',
  'physical': 'PHYSICAL',
  'financial': 'FINANCIAL',
  'legal': 'LEGAL',
  'legal_social': 'LEGAL' // Legacy support
};

/**
 * Map from Portuguese UI categories to database codes (UPPERCASE)
 */
export const CATEGORY_TO_DB: Record<PortuguesePillarCategory, DatabasePillarCode> = {
  'saude_mental': 'PSYCH',
  'bem_estar_fisico': 'PHYSICAL',
  'financeiro': 'FINANCIAL',
  'juridico': 'LEGAL'
};

/**
 * Map from database codes to Portuguese UI categories
 */
export const DB_TO_CATEGORY: Record<DatabasePillarCode, PortuguesePillarCategory> = {
  'PSYCH': 'saude_mental',
  'PHYSICAL': 'bem_estar_fisico',
  'FINANCIAL': 'financeiro',
  'LEGAL': 'juridico'
};

/**
 * Convert display code (lowercase) to database code (UPPERCASE)
 */
export function toDbPillarCode(displayCode: DisplayPillarCode | string): DatabasePillarCode {
  const upperCode = displayCode.toUpperCase();

  // Check if it's already a valid database code
  if (upperCode === 'PSYCH' || upperCode === 'PHYSICAL' || upperCode === 'FINANCIAL' || upperCode === 'LEGAL') {
    return upperCode as DatabasePillarCode;
  }

  // Map from display code
  const dbCode = DISPLAY_TO_DB[displayCode as DisplayPillarCode];
  if (dbCode) {
    return dbCode;
  }

  // Default fallback
  console.warn(`Unknown pillar code: ${displayCode}, defaulting to PSYCH`);
  return 'PSYCH';
}

/**
 * Convert database code (UPPERCASE) to display code (lowercase)
 */
export function toDisplayPillarCode(dbCode: DatabasePillarCode | string): DisplayPillarCode {
  const upperCode = dbCode.toUpperCase() as DatabasePillarCode;
  return DB_TO_DISPLAY[upperCode] || 'psychological';
}

/**
 * Convert Portuguese category to database code
 */
export function categoryToDbCode(category: PortuguesePillarCategory | string): DatabasePillarCode {
  return CATEGORY_TO_DB[category as PortuguesePillarCategory] || 'PSYCH';
}

/**
 * Get all valid database pillar codes
 */
export function getAllDbPillarCodes(): DatabasePillarCode[] {
  return ['PSYCH', 'PHYSICAL', 'FINANCIAL', 'LEGAL'];
}

/**
 * Get all valid display pillar codes
 */
export function getAllDisplayPillarCodes(): DisplayPillarCode[] {
  return ['psychological', 'physical', 'financial', 'legal'];
}

/**
 * Check if a code is a valid database pillar code
 */
export function isValidDbPillarCode(code: string): code is DatabasePillarCode {
  return ['PSYCH', 'PHYSICAL', 'FINANCIAL', 'LEGAL'].includes(code);
}

/**
 * Check if a code is a valid display pillar code
 */
export function isValidDisplayPillarCode(code: string): code is DisplayPillarCode {
  return ['psychological', 'physical', 'financial', 'legal', 'legal_social'].includes(code);
}
