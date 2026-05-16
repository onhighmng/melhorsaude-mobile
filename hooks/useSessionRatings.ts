import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface SessionRating {
    id: string;
    booking_id: string;
    user_id: string;
    rating: number;
    comment?: string;
    created_at: string;
}

export interface RatedBooking {
    id: string;
    session_date: string;
    session_time: string;
    pillar: string;
    specialist: {
        name: string;
    };
    rating?: SessionRating;
}

export function useSessionRatings() {
    const { user } = useAuth();
    const [completedSessions, setCompletedSessions] = useState<RatedBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch completed sessions with ratings
    const fetchCompletedSessions = async () => {
        if (!user) {
            setCompletedSessions([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            // Fetch completed bookings with specialist info and ratings
            const { data, error: fetchError } = await supabase
                .from('bookings')
                .select(`
                    id,
                    session_date,
                    session_time,
                    pillar,
                    specialists:specialist_id (
                        name
                    ),
                    session_ratings (
                        id,
                        rating,
                        comment,
                        created_at
                    )
                `)
                .eq('user_id', user.id)
                .eq('status', 'completed')
                .order('session_date', { ascending: false });

            if (fetchError) throw fetchError;

            // Transform data
            const transformedData = (data || []).map(booking => ({
                id: booking.id,
                session_date: booking.session_date,
                session_time: booking.session_time,
                pillar: booking.pillar,
                specialist: Array.isArray(booking.specialists)
                    ? booking.specialists[0]
                    : booking.specialists,
                rating: Array.isArray(booking.session_ratings) && booking.session_ratings.length > 0
                    ? booking.session_ratings[0]
                    : undefined,
            }));

            setCompletedSessions(transformedData);
            setError(null);
        } catch (err) {
            console.error('Error fetching completed sessions:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch completed sessions');
        } finally {
            setLoading(false);
        }
    };

    // Submit rating for a session
    const submitRating = async (bookingId: string, rating: number, comment?: string) => {
        if (!user) {
            throw new Error('User not authenticated');
        }

        try {
            const { data, error: insertError } = await supabase
                .from('session_ratings')
                .insert({
                    booking_id: bookingId,
                    user_id: user.id,
                    rating,
                    comment: comment || null,
                })
                .select()
                .single();

            if (insertError) throw insertError;

            // Update local state
            setCompletedSessions(prev =>
                prev.map(session =>
                    session.id === bookingId
                        ? { ...session, rating: data }
                        : session
                )
            );

            return data;
        } catch (err) {
            console.error('Error submitting rating:', err);
            throw err;
        }
    };

    // Update existing rating
    const updateRating = async (ratingId: string, rating: number, comment?: string) => {
        if (!user) {
            throw new Error('User not authenticated');
        }

        try {
            const { data, error: updateError } = await supabase
                .from('session_ratings')
                .update({
                    rating,
                    comment: comment || null,
                })
                .eq('id', ratingId)
                .eq('user_id', user.id)
                .select()
                .single();

            if (updateError) throw updateError;

            // Update local state
            setCompletedSessions(prev =>
                prev.map(session =>
                    session.rating?.id === ratingId
                        ? { ...session, rating: data }
                        : session
                )
            );

            return data;
        } catch (err) {
            console.error('Error updating rating:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchCompletedSessions();
    }, [user?.id]);

    return {
        completedSessions,
        loading,
        error,
        submitRating,
        updateRating,
        refetch: fetchCompletedSessions,
    };
}
