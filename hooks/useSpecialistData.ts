// This file is now a facade for the atomic hooks.
// The logic has been split into:
// - useSpecialistBookings.ts
// - useSpecialistPerformance.ts
// - usePendingCalls.ts

export { useSpecialistBookings } from './useSpecialistBookings';
export { useSpecialistPerformance } from './useSpecialistPerformance';
export { usePendingCalls } from './usePendingCalls';

// Re-export type if needed only by legacy, though mostly it is inferred.
export type { Booking, BookingFilters } from './useSpecialistBookings';
export type { PerformanceMetrics } from './useSpecialistPerformance';


