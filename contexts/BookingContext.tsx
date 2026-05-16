import React, { createContext, useContext, ReactNode } from 'react';
import { useBookings as useBookingsHook } from '@/hooks/useBookings';

// Define the shape of the context data
interface BookingContextType {
    upcomingBookings: any[];
    pastBookings: any[];
    loading: boolean;
    createBooking: (booking: any) => Promise<any>;
    rescheduleBooking: (bookingId: string, newDate: string, newTime: string, meetingType: 'video' | 'phone', specialistId?: string, pillar?: string) => Promise<any>;
    cancelBooking: (bookingId: string) => Promise<{ success: boolean; error?: string }>;
    refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    // Use the existing hook to get data
    const {
        upcomingBookings,
        pastBookings,
        loading,
        createBooking,
        rescheduleBooking,
        cancelBooking,
        refetch
    } = useBookingsHook();

    const value = {
        upcomingBookings,
        pastBookings,
        loading,
        createBooking,
        rescheduleBooking,
        cancelBooking,
        refreshBookings: async () => { await refetch(); }
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBookings() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBookings must be used within a BookingProvider');
    }
    return context;
}
