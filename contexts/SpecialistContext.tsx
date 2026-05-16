import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';

type SpecialistRow = Database['public']['Tables']['specialists']['Row'];
type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export type SpecialistProfile = SpecialistRow & {
  profile: ProfileRow | null;
};

interface SpecialistContextType {
  specialistProfile: SpecialistProfile | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

const SpecialistContext = createContext<SpecialistContextType | undefined>(undefined);

export function SpecialistProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const [specialistProfile, setSpecialistProfile] = useState<SpecialistProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && profile?.primary_role === 'specialist') {
      fetchSpecialistProfile();
    } else {
      setLoading(false);
    }
  }, [user, profile]);

  const fetchSpecialistProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('specialists')
        .select(`
          *,
          profile:profiles!specialists_user_id_fkey (*)
        `)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setSpecialistProfile(data as SpecialistProfile);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching specialist profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    await fetchSpecialistProfile();
  };

  const value = {
    specialistProfile,
    loading,
    error,
    refreshProfile,
  };

  return <SpecialistContext.Provider value={value}>{children}</SpecialistContext.Provider>;
}

export function useSpecialist() {
  const context = useContext(SpecialistContext);
  if (context === undefined) {
    throw new Error('useSpecialist must be used within a SpecialistProvider');
  }
  return context;
}

