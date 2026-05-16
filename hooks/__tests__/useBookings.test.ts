import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { createMockSupabaseClient, mockSuccessResponse, mockErrorResponse } from '@/test/mocks/supabase';

// Create mocks before importing modules
const mockSupabase = createMockSupabaseClient();
const mockUseAuth = vi.fn();

// Mock dependencies
vi.mock('@/lib/supabase', () => ({
  supabase: mockSupabase,
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: mockUseAuth,
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/utils/bookingMetadata', () => ({
  isUrgentCallBooking: vi.fn(() => false),
}));

// Import after setting up mocks
import { useBookings } from '../useBookings';

describe('useBookings', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
  };

  const mockUpcomingBooking = {
    id: 'booking-1',
    user_id: 'user-123',
    specialist_id: 'specialist-1',
    booking_date: '2025-12-01',
    start_time: '10:00:00',
    end_time: '11:00:00',
    status: 'confirmed',
    primary_pillar: 'nutrition',
    meeting_link: 'https://meet.example.com/123',
    specialist: {
      id: 'specialist-1',
      user_id: 'specialist-user-1',
      profile: {
        full_name: 'Dr. Smith',
        avatar_url: 'https://example.com/avatar.jpg',
      },
      specialist_pillars: [{ pillar_code: 'nutrition' }],
    },
  };

  const mockPastBooking = {
    id: 'booking-2',
    user_id: 'user-123',
    specialist_id: 'specialist-1',
    booking_date: '2025-10-01',
    start_time: '14:00:00',
    end_time: '15:00:00',
    status: 'completed',
    primary_pillar: 'fitness',
    completed_at: '2025-10-01T15:00:00Z',
    specialist: {
      id: 'specialist-1',
      user_id: 'specialist-user-1',
      profile: {
        full_name: 'Dr. Smith',
        avatar_url: 'https://example.com/avatar.jpg',
      },
      specialist_pillars: [{ pillar_code: 'fitness' }],
    },
    feedback: {
      id: 'feedback-1',
      booking_id: 'booking-2',
      rating: 5,
      comment: 'Great session!',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useBookings());

    expect(result.current.loading).toBe(true);
    expect(result.current.upcomingBookings).toEqual([]);
    expect(result.current.pastBookings).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should fetch upcoming and past bookings successfully', async () => {
    // Mock successful responses
    const mockFrom = mockSupabase.from as any;
    mockFrom.mockImplementation((table: string) => {
      const chainable = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        in: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        limit: vi.fn().mockImplementation(() => {
          if (table === 'bookings') {
            // First call returns upcoming, second returns past
            const isUpcoming = chainable.gte.mock.calls.length > 0;
            return Promise.resolve(
              mockSuccessResponse(isUpcoming ? [mockUpcomingBooking] : [mockPastBooking])
            );
          }
          return Promise.resolve(mockSuccessResponse([]));
        }),
      };
      return chainable;
    });

    const { result } = renderHook(() => useBookings());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.upcomingBookings).toHaveLength(1);
    expect(result.current.upcomingBookings[0].id).toBe('booking-1');
    expect(result.current.pastBookings).toHaveLength(1);
    expect(result.current.pastBookings[0].id).toBe('booking-2');
    expect(result.current.error).toBeNull();
  });

  it('should handle missing table error gracefully', async () => {
    const mockFrom = mockSupabase.from as any;
    mockFrom.mockImplementation(() => {
      const chainable = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        in: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue(mockErrorResponse('Table does not exist', '42P01')),
      };
      return chainable;
    });

    const { result } = renderHook(() => useBookings());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.upcomingBookings).toEqual([]);
    expect(result.current.pastBookings).toEqual([]);
    expect(result.current.error).toBeNull(); // Error is suppressed
  });

  it('should handle no user state', () => {
    mockUseAuth.mockReturnValue({ user: null });

    const { result } = renderHook(() => useBookings());

    expect(result.current.loading).toBe(false);
    expect(result.current.upcomingBookings).toEqual([]);
    expect(result.current.pastBookings).toEqual([]);
  });

  it('should setup realtime subscription for authenticated user', async () => {
    const mockChannel = vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
      unsubscribe: vi.fn(),
    });

    (mockSupabase as any).channel = mockChannel;

    renderHook(() => useBookings());

    await waitFor(() => {
      expect(mockChannel).toHaveBeenCalledWith(`bookings-user-${mockUser.id}`);
    });
  });

  it('should filter out urgent call bookings', async () => {
    const { isUrgentCallBooking } = await import('@/utils/bookingMetadata');
    (isUrgentCallBooking as any).mockImplementation((booking: any) =>
      booking.primary_pillar === 'urgent'
    );

    const mockUrgentBooking = { ...mockUpcomingBooking, primary_pillar: 'urgent' };
    const mockRegularBooking = { ...mockUpcomingBooking, id: 'booking-3' };

    const mockFrom = mockSupabase.from as any;
    mockFrom.mockImplementation(() => {
      const chainable = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        in: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        limit: vi.fn().mockImplementation(() => {
          return Promise.resolve(
            mockSuccessResponse([mockUrgentBooking, mockRegularBooking])
          );
        }),
      };
      return chainable;
    });

    const { result } = renderHook(() => useBookings());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should only include the regular booking, not the urgent one
    expect(result.current.upcomingBookings).toHaveLength(1);
    expect(result.current.upcomingBookings[0].id).toBe('booking-3');
  });

  it('should refetch bookings when user changes', async () => {
    const mockFrom = mockSupabase.from as any;
    const fetchSpy = vi.fn().mockImplementation(() => {
      const chainable = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        in: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue(mockSuccessResponse([])),
      };
      return chainable;
    });
    mockFrom.mockImplementation(fetchSpy);

    const { rerender } = renderHook(() => useBookings());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });

    const initialCallCount = fetchSpy.mock.calls.length;

    // Change user
    mockUseAuth.mockReturnValue({
      user: { id: 'user-456', email: 'another@example.com' }
    });

    rerender();

    await waitFor(() => {
      expect(fetchSpy.mock.calls.length).toBeGreaterThan(initialCallCount);
    });
  });
});
