// Design Tokens - Matches web version exactly
export const COLORS = {
  // Base
  BG: '#ffffff',
  BG_ALT: '#f5f5f5',

  // Cards
  CARD: '#f2f1ef',
  CARD_EL: '#ecece7',

  // Text - from web design
  TEXT_PRIMARY: '#101828',
  TEXT_SECONDARY: '#474747',
  TEXT_TERTIARY: '#999999',

  // Primary & Actions
  PRIMARY: '#1565C0',
  PRIMARY_DARK: '#0046a2',

  // Pillar Colors
  PILLAR_MENTAL: '#1565C0',
  PILLAR_FISICO: '#FB923C',
  PILLAR_FINANCEIRA: '#34D399',
  PILLAR_JURIDICA: '#F472B6',

  // Pillar Gradients (top colors) - from web design
  PILLAR_MENTAL_LIGHT: '#a8c8e8',
  PILLAR_FISICO_LIGHT: '#f4c190',
  PILLAR_FINANCEIRA_LIGHT: '#8fcdc5',
  PILLAR_JURIDICA_LIGHT: '#d8a4c4',

  // Mood Colors
  MOOD_VERY_SAD: '#DBEAFE',
  MOOD_SAD: '#FFE2E2',
  MOOD_NEUTRAL: '#F3F4F6',
  MOOD_GOOD: '#FEF9C2',
  MOOD_GREAT: '#FFF085',

  // Status Colors
  SUCCESS: '#10B981',
  ERROR: '#ef4444',
  WARNING: '#FBBF24',
  INFO: '#1565C0',

  // Mood Indicators
  MOOD_STRESS: '#FBBF24',
  MOOD_ENERGY: '#F87171',
  MOOD_HUMOR: '#34D399',

  // Borders & Dividers
  BORDER: 'rgba(0,0,0,0.05)',
  DIVIDER: '#ecece7',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 1000,
};

export const TYPOGRAPHY = {
  // Font families
  PACIFICO: 'Pacifico_400Regular',
  POPPINS_400: 'Poppins_400Regular',
  POPPINS_500: 'Poppins_500Medium',
  POPPINS_600: 'Poppins_600SemiBold',
  POPPINS_700: 'Poppins_700Bold',
  JAKARTA_400: 'PlusJakartaSans_400Regular',
  JAKARTA_600: 'PlusJakartaSans_600SemiBold',
  JAKARTA_700: 'PlusJakartaSans_700Bold',
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
};

export const GRADIENT = {
  BG_GRADIENT: {
    colors: ['#e8f4f8', '#b8e1f0'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
};
