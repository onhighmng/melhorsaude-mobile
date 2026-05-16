import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type Company = Database['public']['Tables']['companies']['Row'];
type CompanyEmployeeRow = Database['public']['Tables']['company_employees']['Row'];
type BookingRow = Database['public']['Tables']['bookings']['Row'];

interface CompanyEmployee extends CompanyEmployeeRow {
  profile?: {
    id: string;
    full_name: string | null;
    email: string;
    phone: string | null;
    avatar_url: string | null;
    metadata: Database['public']['Tables']['profiles']['Row']['metadata'];
  } | null;
}

interface CompanySession extends BookingRow {
  specialist?: {
    id: string;
    profile?: {
      full_name: string | null;
    } | null;
  } | null;
}

interface CompanyWithDetails extends Company {
  employees: CompanyEmployee[];
  sessions: CompanySession[];
  session_stats: {
    completed: number;
    upcoming: number;
    cancelled: number;
  };
  total_sessions_allocated: number;
  sessions_used: number;
  sessions_available: number;
}

export function useAdminCompanies() {
  const [companies, setCompanies] = useState<CompanyWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      // Fetch all companies
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (companiesError) throw companiesError;

      const companyIds = (companiesData || []).map((company) => company.id);

      if (companyIds.length === 0) {
        setCompanies([]);
        setError(null);
        return;
      }

      // Fetch employees for all companies
      // Try company_employees table first, then fallback to profiles table
      let employeesData: any[] = [];
      let employeesError: any = null;



      const { data: companyEmployeesData, error: companyEmployeesError } = await supabase
        .from('company_employees')
        .select(`
          *,
          profile:profiles!company_employees_user_id_fkey (
            id,
            full_name,
            email,
            phone,
            avatar_url,
            metadata
          )
        `)
        .in('company_id', companyIds)
        .order('joined_at', { ascending: true });

      if (companyEmployeesError) {
        console.warn('Error fetching from company_employees (RLS might be blocking):', companyEmployeesError);
        employeesError = companyEmployeesError;
      } else {
        employeesData = companyEmployeesData || [];

      }

      // ALWAYS try profiles fallback since RLS might block company_employees for admins
      // This ensures we get the data even if company_employees RLS is restrictive
      if (companyIds.length > 0) {

        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, email, phone, avatar_url, metadata, company_id, created_at')
          .in('company_id', companyIds)
          .not('company_id', 'is', null)
          .order('created_at', { ascending: true });

        if (profilesError) {
          console.error('Error fetching employees from profiles:', profilesError);
          if (!employeesError) employeesError = profilesError;
        } else if (profilesData && profilesData.length > 0) {
          // Merge with existing employeesData, avoiding duplicates
          const existingUserIds = new Set(employeesData.map(e => e.user_id));
          const newEmployeesFromProfiles = profilesData
            .filter(profile => !existingUserIds.has(profile.id))
            .map((profile) => ({
              id: profile.id,
              company_id: profile.company_id,
              user_id: profile.id,
              is_active: true,
              joined_at: profile.created_at,
              role: null,
              department: null,
              job_title: null,
              profile: {
                id: profile.id,
                full_name: profile.full_name,
                email: profile.email || '',
                phone: profile.phone,
                avatar_url: profile.avatar_url,
                metadata: profile.metadata,
              },
            }));

          employeesData = [...employeesData, ...newEmployeesFromProfiles];

        } else {

        }
      }

      if (employeesError && employeesData.length === 0) {
        console.error('Failed to fetch employees from both sources:', employeesError);
        // Don't throw - continue with empty employees array
      } else if (employeesData.length > 0) {

      }

      // Fetch sessions for all companies
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('bookings')
        .select(`
          *,
          specialist:specialists!bookings_specialist_id_fkey (
            id,
            profile:profiles!specialists_user_id_fkey (
              full_name
            )
          )
        `)
        .in('company_id', companyIds)
        .order('booking_date', { ascending: false });

      if (sessionsError) throw sessionsError;

      const employeesByCompany = new Map<string, CompanyEmployee[]>();
      (employeesData || []).forEach((employee) => {
        const companyId = employee.company_id;
        if (!companyId) {
          console.warn('Employee missing company_id:', employee);
          return;
        }
        if (!employeesByCompany.has(companyId)) {
          employeesByCompany.set(companyId, []);
        }
        employeesByCompany.get(companyId)!.push(employee as CompanyEmployee);
      });


      totalEmployees: employeesData.length,
        companiesWithEmployees: Array.from(employeesByCompany.entries()).map(([id, emps]) => ({
          companyId: id,
          count: emps.length
        }))
    });

    const sessionsByCompany = new Map<string, CompanySession[]>();
    (sessionsData || []).forEach((session) => {
      const companyId = session.company_id;
      if (!companyId) return;
      if (!sessionsByCompany.has(companyId)) {
        sessionsByCompany.set(companyId, []);
      }
      sessionsByCompany.get(companyId)!.push(session as CompanySession);
    });

    const companiesWithDetails: CompanyWithDetails[] = (companiesData || []).map((company) => {
      const employeesForCompany = employeesByCompany.get(company.id) || [];
      const sessionsForCompany = sessionsByCompany.get(company.id) || [];


      employeesCount: employeesForCompany.length,
        sessionsCount: sessionsForCompany.length,
          employeeSeats: company.employee_seats
    });

    const completedSessions = sessionsForCompany.filter((session) => session.status === 'completed').length;
    const upcomingSessions = sessionsForCompany.filter((session) =>
      ['pending', 'confirmed', 'rescheduled'].includes(session.status ?? '')
    ).length;
    const cancelledSessions = sessionsForCompany.filter((session) => session.status === 'cancelled').length;

    const seats = company.employee_seats ?? employeesForCompany.length;
    const sessionsPerEmployee = company.sessions_per_employee ?? 0;
    const companyMetadata = (company.metadata as Record<string, any> | null) || {};
    const metadataAllocation = [companyMetadata?.total_sessions, companyMetadata?.sessions_allocated, companyMetadata?.sessions]
      .find((value) => typeof value === 'number') as number | undefined;
    const totalSessionsAllocated = metadataAllocation ?? seats * sessionsPerEmployee;
    const sessionsUsed = completedSessions;
    const sessionsAvailable = Math.max(totalSessionsAllocated - sessionsUsed, 0);

    return {
      ...company,
      employees: employeesForCompany,
      sessions: sessionsForCompany,
      session_stats: {
        completed: completedSessions,
        upcoming: upcomingSessions,
        cancelled: cancelledSessions,
      },
      total_sessions_allocated: totalSessionsAllocated,
      sessions_used: sessionsUsed,
      sessions_available: sessionsAvailable,
    };
  });

  setCompanies(companiesWithDetails);
  setError(null);
} catch (err: any) {
  console.error('Error fetching companies:', err);
  setError(err.message);
} finally {
  setLoading(false);
}
  };

const updateCompanyStatus = async (companyId: string, isActive: boolean) => {
  try {
    // Note: companies table doesn't have is_active column
    // This function is a placeholder for future implementation
    console.warn('Company status update not implemented - companies table has no is_active column');
    return { success: false, error: 'Not implemented' };
  } catch (err: any) {
    console.error('Error updating company status:', err);
    return { success: false, error: err.message };
  }
};

return {
  companies,
  loading,
  error,
  refetch: fetchCompanies,
  updateCompanyStatus
};
}

