import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
// DISABLED: import from 'sonner';

export interface UserBooking {
    id: string;
    session_date: string;
    session_time: string;
    pillar: string;
    session_type: 'video' | 'voice';
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    meeting_link: string | null;
    specialist: {
        id: string;
        name: string;
        avatar_url?: string;
    };
    created_at: string;
}

// Helper to calculate end time (start time + 60 mins)
function calculateEndTime(startTime: string): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    date.setMinutes(date.getMinutes() + 60);
    return date.toTimeString().slice(0, 5);
}

export function useUserBookings() {
    const { user } = useAuth();
    const [upcomingBookings, setUpcomingBookings] = useState<UserBooking[]>([]);
    const [pastBookings, setPastBookings] = useState<UserBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user's bookings
    const fetchBookings = async () => {
        if (!user) {
            setUpcomingBookings([]);
            setPastBookings([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            // Using explicit type assertion for nested join query
            const { data, error: fetchError } = await supabase
                .from('bookings')
                .select(`
                    id,
                    booking_date,
                    start_time,
                    primary_pillar,
                    session_type,
                    status,
                    created_at,
                    meeting_link,
                    specialists:specialist_id (
                        id,
                        user_id,
                        profiles:profiles(
                            full_name,
                            avatar_url
                        )
                    )
                `)
                .eq('user_id', user.id)
                .order('booking_date', { ascending: true });

            if (fetchError) throw fetchError;

            // Transform and split data
            const now = new Date();
            now.setHours(0, 0, 0, 0); // Reset time to start of day to include today's sessions

            const transformed: UserBooking[] = (data || []).map((booking: any) => {
                const specialistData = Array.isArray(booking.specialists)
                    ? booking.specialists[0]
                    : booking.specialists;

                // Handle nested profile data safely
                // The join hierarchy is specialists -> profiles
                const profile = specialistData?.profiles
                    ? (Array.isArray(specialistData.profiles) ? specialistData.profiles[0] : specialistData.profiles)
                    : null;

                return {
                    id: booking.id,
                    session_date: booking.booking_date || '', // Map from booking_date
                    session_time: booking.start_time || '',   // Map from start_time
                    pillar: booking.primary_pillar || 'PSYCH',      // Map from primary_pillar
                    session_type: (booking.session_type as 'video' | 'voice') || 'video',
                    status: (booking.status as UserBooking['status']) || 'pending',
                    meeting_link: booking.meeting_link || null,
                    specialist: {
                        id: specialistData?.id || '',
                        name: profile?.full_name || 'Especialista',
                        avatar_url: profile?.avatar_url,
                    },
                    created_at: booking.created_at || new Date().toISOString(),
                };
            });

            // Split into upcoming and past
            const upcoming = transformed.filter(b => {
                // Parse date carefully
                const [year, month, day] = b.session_date.split('-').map(Number);
                const sessionDate = new Date(year, month - 1, day);
                return sessionDate >= now && b.status !== 'cancelled';
            });

            const past = transformed.filter(b => {
                const [year, month, day] = b.session_date.split('-').map(Number);
                const sessionDate = new Date(year, month - 1, day);
                return sessionDate < now || b.status === 'cancelled' || b.status === 'completed';
            });

            setUpcomingBookings(upcoming);
            setPastBookings(past);
            setError(null);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
            toast.error('Erro ao carregar agendamentos');
        } finally {
            setLoading(false);
        }
    };

    // Create new booking
    const createBooking = async (bookingData: {
        specialist_id: string;
        session_date: string;
        session_time: string;
        pillar: string;
        session_type: 'video' | 'voice';
    }) => {
        if (!user) {
            throw new Error('User not authenticated');
        }

        try {
            // Check company status
            const { data: profileWithCompany } = await (supabase
                .from('profiles') as any)
                .select('company_id, companies!profiles_company_id_fkey(is_active)')
                .eq('id', user.id)
                .single();

            if (profileWithCompany?.company_id) {
                const company = Array.isArray(profileWithCompany?.companies)
                    ? profileWithCompany?.companies[0]
                    : profileWithCompany?.companies;

                if (company?.is_active === false || !company) {
                    throw new Error('A subscrição da sua empresa está atualmente em pausa. Contacte o administrador para mais informações.');
                }
            }

            const { data, error: insertError } = await supabase
                .from('bookings')
                .insert({
                    user_id: user.id,
                    specialist_id: bookingData.specialist_id,
                    booking_date: bookingData.session_date,     // Map to booking_date
                    start_time: bookingData.session_time,       // Map to start_time
                    end_time: calculateEndTime(bookingData.session_time), // Calculate end_time
                    primary_pillar: bookingData.pillar,         // Map to primary_pillar
                    session_type: bookingData.session_type,
                    status: 'pending',
                    duration_minutes: 60 // Default 1 hour
                })
                .select(`
                    id,
                    booking_date,
                    start_time,
                    primary_pillar,
                    session_type,
                    status,
                    created_at,
                    meeting_link,
                    specialists:specialist_id (
                        id,
                        user_id,
                        profiles:profiles(
                            full_name,
                            avatar_url
                        )
                    )
                `)
                .single();

            if (insertError) throw insertError;

            // Transform and add to upcoming bookings
            const specialistData = Array.isArray(data.specialists)
                ? data.specialists[0]
                : data.specialists;

            const profile = specialistData?.profiles
                ? (Array.isArray(specialistData.profiles) ? specialistData.profiles[0] : specialistData.profiles)
                : null;

            const transformedBooking: UserBooking = {
                id: data.id,
                session_date: data.booking_date || bookingData.session_date,
                session_time: data.start_time || bookingData.session_time,
                pillar: data.primary_pillar || bookingData.pillar,
                session_type: (data.session_type as 'video' | 'voice') || bookingData.session_type,
                status: (data.status as UserBooking['status']) || 'pending',
                meeting_link: data.meeting_link || null,
                specialist: {
                    id: specialistData?.id || '',
                    name: profile?.full_name || 'Especialista',
                    avatar_url: profile?.avatar_url,
                },
                created_at: data.created_at || new Date().toISOString(),
            };

            setUpcomingBookings(prev => [...prev, transformedBooking]);
            return transformedBooking;
        } catch (err) {
            console.error('Error creating booking:', err);
            throw err;
        }
    };

    // Cancel booking
    const cancelBooking = async (bookingId: string) => {
        if (!user) {
            throw new Error('User not authenticated');
        }

        try {
            const { error: updateError } = await supabase
                .from('bookings')
                .update({ status: 'cancelled' })
                .eq('id', bookingId)
                .eq('user_id', user.id);

            if (updateError) throw updateError;

            // Move from upcoming to past
            const booking = upcomingBookings.find(b => b.id === bookingId);
            if (booking) {
                setUpcomingBookings(prev => prev.filter(b => b.id !== bookingId));
                setPastBookings(prev => [...prev, { ...booking, status: 'cancelled' }]);
            }
        } catch (err) {
            console.error('Error cancelling booking:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user?.id]);

    return {
        upcomingBookings,
        pastBookings,
        loading,
        error,
        createBooking,
        cancelBooking,
        refetch: fetchBookings,
    };
}
