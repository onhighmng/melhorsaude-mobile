import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { logger } from '@/utils/logger';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/database.types';

type Company = Database['public']['Tables']['companies']['Row'] & {
  sessions_per_employee?: number | null;
  total_employees?: number | null;
};
type CompanyEmployeeRow = Database['public']['Tables']['company_employees']['Row'];


type CompanyEmployee = {
  id: string;
  company_id: string;
  user_id: string;
  status: string;
  is_active: boolean;
  seat_count: number;
  created_at: string;
  updated_at: string;
  profile?: {
    full_name: string;
    email: string;
    avatar_url?: string | null;
  };
  session_count?: number;
};

interface CompanyContextType {
  company: Company | null;
  employees: CompanyEmployee[];
  loading: boolean;
  error: string | null;
  refreshCompany: () => Promise<void>;
  refreshEmployees: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [employees, setEmployees] = useState<CompanyEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && profile?.company_id) {
      fetchCompanyData();
    } else {
      setLoading(false);
    }
  }, [user, profile]);

  const fetchCompanyData = async () => {
    if (!profile?.company_id) return;

    try {
      setLoading(true);

      // Fetch company profile
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', profile.company_id)
        .maybeSingle(); // Use maybeSingle instead of single to handle 0 rows

      if (companyError) throw companyError;
      if (!companyData) {
        logger.warn('Company not found', { companyId: profile.company_id });
        setCompany(null);
        setError('Company not found. Please contact support.');
        setLoading(false);
        return;
      }
      setCompany(companyData);

      // Fetch employees using the function
      await fetchEmployees();

      setError(null);
    } catch (err: unknown) {
      logger.error('Error fetching company data', { error: err });
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    if (!profile?.company_id) return;

    try {
      logger.debug('Fetching employees for company', { companyId: profile.company_id });

      const { data: companyEmployees, error: employeesError } = await supabase
        .from('company_employees')
        .select(`
          id,
          company_id,
          user_id,
          is_active,
          created_at,
          role,
          profile:profiles!company_employees_user_id_fkey (
            id,
            full_name,
            email,
            avatar_url,
            created_at
          )
        `)
        .eq('company_id', profile.company_id);

      if (employeesError) {
        logger.error('Error fetching company employees', { error: employeesError });
        throw employeesError;
      }

      logger.debug('Fetched company_employees', { count: companyEmployees?.length || 0 });

      type EmployeeWithProfile = Partial<CompanyEmployeeRow> & {
        profile?: {
          id: string;
          full_name: string | null;
          email: string | null;
          avatar_url: string | null;
          created_at: string | null;
        } | null;
      };

      let employeeRecords: EmployeeWithProfile[] = (companyEmployees || []) as EmployeeWithProfile[];

      if (employeeRecords.length === 0) {
        const { data: fallbackProfiles, error: fallbackError } = await supabase
          .from('profiles')
          .select('id, full_name, email, avatar_url, created_at')
          .eq('company_id', profile.company_id)
          .order('created_at', { ascending: false });

        if (fallbackError) throw fallbackError;

        employeeRecords = (fallbackProfiles || []).map((emp): EmployeeWithProfile => ({
          id: emp.id,
          company_id: profile.company_id!,
          user_id: emp.id,
          is_active: true,
          created_at: emp.created_at,
          profile: {
            id: emp.id,
            full_name: emp.full_name,
            email: emp.email,
            avatar_url: emp.avatar_url,
            created_at: emp.created_at,
          },
        }));
      }

      const employeeIds = employeeRecords
        .map((emp) => emp.user_id)
        .filter((id): id is string => Boolean(id));

      let bookings: { user_id: string | null; status: string | null }[] = [];
      if (employeeIds.length > 0) {
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('user_id, status')
          .in('user_id', employeeIds)
          .in('status', ['pending', 'confirmed', 'completed']);

        if (bookingsError) throw bookingsError;
        bookings = bookingsData || [];
      }

      const sessionCountMap = new Map<string, number>();
      bookings.forEach((booking) => {
        if (booking.user_id) {
          sessionCountMap.set(
            booking.user_id,
            (sessionCountMap.get(booking.user_id) || 0) + 1
          );
        }
      });

      const mappedEmployees: CompanyEmployee[] = employeeRecords.map((emp) => {
        const profileData = emp.profile;
        const userId = emp.user_id || '';
        return {
          id: emp.id || userId,
          company_id: profile.company_id!,
          user_id: userId,
          status: emp.is_active === false ? 'inactive' : 'active',
          is_active: emp.is_active === false ? false : true,
          seat_count: 1,
          created_at: emp.created_at || profileData?.created_at || new Date().toISOString(),
          updated_at: emp.created_at || profileData?.created_at || new Date().toISOString(),
          profile: {
            full_name: profileData?.full_name || 'Utilizador',
            email: profileData?.email || '',
            avatar_url: profileData?.avatar_url,
          },
          session_count: sessionCountMap.get(userId) || 0,
        };
      });

      logger.debug('Final mapped employees', { count: mappedEmployees.length });

      setEmployees(mappedEmployees);
    } catch (err: unknown) {
      logger.error('Error fetching employees', { error: err });
      throw err;
    }
  };

  const refreshCompany = async () => {
    await fetchCompanyData();
  };

  const refreshEmployees = async () => {
    await fetchEmployees();
  };

  // Realtime subscription for company_employees changes
  useEffect(() => {
    if (!profile?.company_id) return;

    logger.debug('Setting up realtime subscriptions for company dashboard', { companyId: profile.company_id });

    let debounceTimer: NodeJS.Timeout;

    const debouncedFetch = () => {
      logger.debug('Company employees update queued (debounced 5s)');
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        logger.debug('Executing debounced company employees update');
        fetchEmployees();
      }, 5000);
    };

    const channel = supabase
      .channel(`company-employees-${profile.company_id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'company_employees',
          filter: `company_id=eq.${profile.company_id}`
        },
        (payload) => {
          logger.debug('Company employees changed', { eventType: payload.eventType });
          debouncedFetch();
        }
      )
      .subscribe((status) => {
        logger.debug('Realtime subscription status (employees)', { status });
      });

    return () => {
      logger.debug('Cleaning up realtime subscription for company employees');
      clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }, [profile?.company_id]);

  // Realtime subscription for bookings changes (affects session counts)
  useEffect(() => {
    if (!profile?.company_id || employees.length === 0) return;

    logger.debug('Setting up realtime subscription for bookings (filtered)');

    let debounceTimer: NodeJS.Timeout;

    const debouncedFetch = () => {
      logger.debug('Company bookings update queued (debounced 5s)');
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        logger.debug('Executing debounced company booking update');
        fetchEmployees();
      }, 5000);
    };

    const channel = supabase
      .channel(`company-bookings-${profile.company_id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          // FIX: Add filter to prevent Broadcast Storm (listen only to this company's bookings)
          filter: `company_id=eq.${profile.company_id}`
        },
        (payload) => {
          logger.debug('Booking changed (filtered)', { eventType: payload.eventType });
          debouncedFetch();
        }
      )
      .subscribe((status) => {
        logger.debug('Realtime subscription status (bookings)', { status });
      });

    return () => {
      logger.debug('Cleaning up realtime subscription for bookings');
      clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }, [profile?.company_id, employees.length]);

  const value = {
    company,
    employees,
    loading,
    error,
    refreshCompany,
    refreshEmployees,
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
