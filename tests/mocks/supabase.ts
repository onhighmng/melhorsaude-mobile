import { vi } from 'vitest';

/**
 * Mock Supabase client for testing
 */
export const createMockSupabaseClient = () => {
  const mockSelect = vi.fn().mockReturnThis();
  const mockInsert = vi.fn().mockReturnThis();
  const mockUpdate = vi.fn().mockReturnThis();
  const mockDelete = vi.fn().mockReturnThis();
  const mockEq = vi.fn().mockReturnThis();
  const mockNeq = vi.fn().mockReturnThis();
  const mockGt = vi.fn().mockReturnThis();
  const mockLt = vi.fn().mockReturnThis();
  const mockGte = vi.fn().mockReturnThis();
  const mockLte = vi.fn().mockReturnThis();
  const mockIn = vi.fn().mockReturnThis();
  const mockOrder = vi.fn().mockReturnThis();
  const mockLimit = vi.fn().mockReturnThis();
  const mockSingle = vi.fn().mockReturnThis();
  const mockMaybeSingle = vi.fn().mockReturnThis();

  const mockFrom = vi.fn(() => ({
    select: mockSelect,
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    eq: mockEq,
    neq: mockNeq,
    gt: mockGt,
    lt: mockLt,
    gte: mockGte,
    lte: mockLte,
    in: mockIn,
    order: mockOrder,
    limit: mockLimit,
    single: mockSingle,
    maybeSingle: mockMaybeSingle,
  }));

  const mockChannel = vi.fn(() => ({
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn().mockReturnThis(),
    unsubscribe: vi.fn(),
  }));

  const mockAuth = {
    getSession: vi.fn(),
    getUser: vi.fn(),
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
    resetPasswordForEmail: vi.fn(),
    updateUser: vi.fn(),
  };

  const mockStorage = {
    from: vi.fn(() => ({
      upload: vi.fn(),
      download: vi.fn(),
      remove: vi.fn(),
      getPublicUrl: vi.fn(),
    })),
  };

  return {
    from: mockFrom,
    auth: mockAuth,
    storage: mockStorage,
    channel: mockChannel,
    removeChannel: vi.fn(),
    _mockHelpers: {
      mockSelect,
      mockInsert,
      mockUpdate,
      mockDelete,
      mockEq,
      mockNeq,
      mockGt,
      mockLt,
      mockGte,
      mockLte,
      mockIn,
      mockOrder,
      mockLimit,
      mockSingle,
      mockMaybeSingle,
      mockChannel,
    },
  };
};

export type MockSupabaseClient = ReturnType<typeof createMockSupabaseClient>;

/**
 * Mock successful query response
 */
export const mockSuccessResponse = <T>(data: T) => ({
  data,
  error: null,
  count: null,
  status: 200,
  statusText: 'OK',
});

/**
 * Mock error response
 */
export const mockErrorResponse = (message: string, code?: string) => ({
  data: null,
  error: {
    message,
    code: code || 'PGRST301',
    details: '',
    hint: '',
  },
  count: null,
  status: 400,
  statusText: 'Bad Request',
});

/**
 * Mock user session
 */
export const mockUserSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: {
    id: 'mock-user-id',
    email: 'test@example.com',
    email_confirmed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    role: 'authenticated',
  },
};

/**
 * Mock user profile
 */
export const mockUserProfile = {
  id: 'mock-user-id',
  email: 'test@example.com',
  full_name: 'Test User',
  user_type: 'user' as const,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
