/**
 * Shared types for company-related hooks
 */
import { Database } from '@/types/database.types';

export type SessionQuota = Database['public']['Tables']['user_personal_quotas']['Row'];

export interface DisplayInvite {
  id: string;
  invite_code: string;
  status: string;
  used_by: string | null;
  used_at: string | null;
  expires_at: string;
  created_at: string;
}

export interface CompanyAnalytics {
  total_employees: number;
  active_employees: number;
  inactive_employees: number;
  monthly_sessions: number;
  lifetime_sessions: number;
  sessions_by_pillar_month: PillarStats[];
  sessions_by_pillar_lifetime: PillarStats[];
  utilization_rate: number;
  most_used_pillar: string | null;
  average_satisfaction: number | null;
}

export interface PillarStats {
  pillar_code: string;
  session_count: number;
  percentage: number;
  label: string;
}
