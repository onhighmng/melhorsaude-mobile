import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useCallRequest() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUrgentCallRequest = async () => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('call_requests')
        .insert({
          user_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setLoading(false);
      return { success: true, request: data };
    } catch (err: any) {
      console.error('Error creating call request:', err);
      setError(err.message || 'Error creating call request');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return {
    createUrgentCallRequest,
    loading,
    error
  };
}
