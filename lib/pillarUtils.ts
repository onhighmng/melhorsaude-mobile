/**
 * Pillar Utilities
 * Shared helper functions for pillar/wellness area handling across all user types
 */

/**
 * Map pillar codes to Portuguese display names
 */
export function getPillarName(code: string): string {
  const names: Record<string, string> = {
    'psychological': 'Saúde Mental',
    'physical': 'Bem-Estar Físico',
    'financial': 'Assistência Financeira',
    'legal_social': 'Assistência Jurídica',
    // Legacy codes for backward compatibility (use standard enum values instead)
    'PSYCH': 'Saúde Mental',
    'PHYSICAL': 'Bem-Estar Físico',
    'FINANCIAL': 'Assistência Financeira',
    'LEGAL': 'Assistência Jurídica'
  };
  return names[code] || code;
}

/**
 * Map pillar codes to Tailwind CSS classes for badges/pills
 */
export function getPillarColorClass(code: string): string {
  const colors: Record<string, string> = {
    'psychological': 'bg-blue-100 text-blue-700',
    'physical': 'bg-yellow-100 text-yellow-700',
    'financial': 'bg-green-100 text-green-700',
    'legal_social': 'bg-purple-100 text-purple-700',
    // Legacy codes for backward compatibility
    'PSYCH': 'bg-blue-100 text-blue-700',
    'PHYSICAL': 'bg-yellow-100 text-yellow-700',
    'FINANCIAL': 'bg-green-100 text-green-700',
    'LEGAL': 'bg-purple-100 text-purple-700'
  };
  return colors[code] || 'bg-gray-100 text-gray-700';
}

/**
 * Map pillar codes to Tailwind CSS background color classes
 */
export function getPillarColorBg(code: string): string {
  const colors: Record<string, string> = {
    'psychological': 'bg-blue-500',
    'physical': 'bg-yellow-500',
    'financial': 'bg-green-500',
    'legal_social': 'bg-purple-500',
    // Legacy codes for backward compatibility
    'PSYCH': 'bg-blue-500',
    'PHYSICAL': 'bg-yellow-500',
    'FINANCIAL': 'bg-green-500',
    'LEGAL': 'bg-purple-500'
  };
  return colors[code] || 'bg-gray-500';
}

/**
 * Map pillar codes to hex color values
 */
export function getPillarColor(code: string): string {
  const colors: Record<string, string> = {
    'psychological': '#007AFF',
    'physical': '#FFD60A',
    'financial': '#34C759',
    'legal_social': '#AF52DE',
    // Legacy codes for backward compatibility
    'PSYCH': '#007AFF',
    'PHYSICAL': '#FFD60A',
    'FINANCIAL': '#34C759',
    'LEGAL': '#AF52DE'
  };
  return colors[code] || '#9E9E9E';
}

/**
 * Map pillar codes to emoji icons
 */
export function getPillarIcon(code: string): string {
  const icons: Record<string, string> = {
    'psychological': '🧠',
    'physical': '💪',
    'financial': '💰',
    'legal_social': '⚖️',
    // Legacy codes for backward compatibility
    'PSYCH': '🧠',
    'PHYSICAL': '💪',
    'FINANCIAL': '💰',
    'LEGAL': '⚖️'
  };
  return icons[code] || '📋';
}

