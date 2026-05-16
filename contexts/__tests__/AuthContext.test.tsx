import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { AuthProvider, useAuth } from '../AuthContext';
import {
  createMockSupabaseClient,
  mockSuccessResponse,
  mockErrorResponse,
  mockUserSession,
  mockUserProfile,
} from '@/test/mocks/supabase';

// Mock dependencies
const mockSupabase = createMockSupabaseClient();

vi.mock('@/lib/supabase', () => ({
  supabase: mockSupabase,
}));

vi.mock('@/lib/sentry', () => ({
  setSentryUser: vi.fn(),
  clearSentryUser: vi.fn(),
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock: no active session
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
  });

  describe('initialization', () => {
    it('should start with loading state', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.loading).toBe(true);
      expect(result.current.user).toBeNull();
      expect(result.current.profile).toBeNull();
      expect(result.current.session).toBeNull();
    });

    it('should load existing session on mount', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockUserSession },
        error: null,
      });

      mockSupabase.from.mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue(mockSuccessResponse(mockUserProfile)),
      }));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUserSession.user);
      expect(result.current.session).toEqual(mockUserSession);
      expect(result.current.profile).toEqual(mockUserProfile);
    });

    it('should handle missing profile by creating one', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockUserSession },
        error: null,
      });

      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUserSession.user },
        error: null,
      });

      // First call returns null (profile doesn't exist)
      // Second call in insert returns the new profile
      let callCount = 0;
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'profiles') {
          callCount++;
          if (callCount === 1) {
            // maybeSingle returns null
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue(mockSuccessResponse(null)),
            };
          } else {
            // insert returns new profile
            return {
              insert: vi.fn().mockReturnThis(),
              select: vi.fn().mockReturnThis(),
              single: vi.fn().mockResolvedValue(mockSuccessResponse(mockUserProfile)),
            };
          }
        }
        return {};
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.profile).toEqual(mockUserProfile);
    });
  });

  describe('signIn', () => {
    it('should sign in successfully with valid credentials', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { session: mockUserSession, user: mockUserSession.user },
        error: null,
      });

      mockSupabase.from.mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue(mockSuccessResponse(mockUserProfile)),
      }));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let signInResult;
      await act(async () => {
        signInResult = await result.current.signIn('test@example.com', 'password123');
      });

      expect(signInResult).toEqual({ error: null });
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should return error on invalid credentials', async () => {
      const authError = {
        name: 'AuthError',
        message: 'Invalid credentials',
        status: 400,
      };

      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { session: null, user: null },
        error: authError as any,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let signInResult;
      await act(async () => {
        signInResult = await result.current.signIn('wrong@example.com', 'wrongpass');
      });

      expect(signInResult).toEqual({ error: authError });
      expect(result.current.user).toBeNull();
    });
  });

  describe('signUp', () => {
    it('should sign up successfully with valid data', async () => {
      mockSupabase.auth.signUp.mockResolvedValue({
        data: { session: mockUserSession, user: mockUserSession.user },
        error: null,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let signUpResult;
      await act(async () => {
        signUpResult = await result.current.signUp(
          'newuser@example.com',
          'securepass123',
          'New User',
          '1234567890'
        );
      });

      expect(signUpResult).toEqual({ error: null });
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        password: 'securepass123',
        options: {
          data: {
            full_name: 'New User',
            phone: '1234567890',
          },
        },
      });
    });

    it('should return error if email already exists', async () => {
      const authError = {
        name: 'AuthError',
        message: 'User already registered',
        status: 400,
      };

      mockSupabase.auth.signUp.mockResolvedValue({
        data: { session: null, user: null },
        error: authError as any,
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let signUpResult;
      await act(async () => {
        signUpResult = await result.current.signUp(
          'existing@example.com',
          'password123',
          'Existing User'
        );
      });

      expect(signUpResult).toEqual({ error: authError });
    });
  });

  describe('signOut', () => {
    it('should sign out and clear user state', async () => {
      // Setup: User is logged in
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockUserSession },
        error: null,
      });

      mockSupabase.from.mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue(mockSuccessResponse(mockUserProfile)),
      }));

      mockSupabase.auth.signOut.mockResolvedValue({ error: null });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).not.toBeNull();
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
      expect(result.current.user).toBeNull();
      expect(result.current.profile).toBeNull();
      expect(result.current.session).toBeNull();
    });
  });

  describe('refreshProfile', () => {
    it('should refetch profile data', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockUserSession },
        error: null,
      });

      const updatedProfile = {
        ...mockUserProfile,
        full_name: 'Updated Name',
      };

      let fetchCount = 0;
      mockSupabase.from.mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockImplementation(() => {
          fetchCount++;
          return Promise.resolve(
            mockSuccessResponse(fetchCount === 1 ? mockUserProfile : updatedProfile)
          );
        }),
      }));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.profile).toEqual(mockUserProfile);
      });

      await act(async () => {
        await result.current.refreshProfile();
      });

      await waitFor(() => {
        expect(result.current.profile).toEqual(updatedProfile);
      });
    });
  });

  describe('auth state change listener', () => {
    it('should handle SIGNED_OUT event', async () => {
      let authCallback: ((event: string, session: any) => void) | null = null;

      mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
        authCallback = callback;
        return {
          data: { subscription: { unsubscribe: vi.fn() } },
        };
      });

      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: mockUserSession },
        error: null,
      });

      mockSupabase.from.mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue(mockSuccessResponse(mockUserProfile)),
      }));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).not.toBeNull();
      });

      // Trigger SIGNED_OUT event
      await act(async () => {
        if (authCallback) {
          authCallback('SIGNED_OUT', null);
        }
      });

      expect(result.current.user).toBeNull();
      expect(result.current.profile).toBeNull();
      expect(result.current.session).toBeNull();
    });
  });
});
