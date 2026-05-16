export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      access_codes: {
        Row: {
          code: string
          company_id: string | null
          created_at: string | null
          created_by: string | null
          current_uses: number | null
          expires_at: string | null
          id: string
          max_uses: number | null
          metadata: Json | null
          redirect_path: string | null
          role_type: Database["public"]["Enums"]["user_role"] | null
          status: string | null
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          code: string
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          metadata?: Json | null
          redirect_path?: string | null
          role_type?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          code?: string
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          metadata?: Json | null
          redirect_path?: string | null
          role_type?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_codes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_codes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_codes_used_by_fkey"
            columns: ["used_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_date: string
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          company_id: string | null
          completed_at: string | null
          confirmed_at: string | null
          created_at: string | null
          diagnostic_session_id: string | null
          duration_minutes: number
          end_time: string
          id: string
          is_company_sponsored: boolean | null
          meeting_link: string | null
          meeting_type: string | null
          metadata: Json | null
          primary_pillar: string | null
          reminder_sent_1h: boolean | null
          reminder_sent_24h: boolean | null
          session_type: string | null
          specialist_id: string
          start_time: string
          status: Database["public"]["Enums"]["booking_status"]
          topic: string | null
          updated_at: string | null
          user_id: string
          user_notes: string | null
        }
        Insert: {
          booking_date: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          company_id?: string | null
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          diagnostic_session_id?: string | null
          duration_minutes?: number
          end_time: string
          id?: string
          is_company_sponsored?: boolean | null
          meeting_link?: string | null
          meeting_type?: string | null
          metadata?: Json | null
          primary_pillar?: string | null
          reminder_sent_1h?: boolean | null
          reminder_sent_24h?: boolean | null
          session_type?: string | null
          specialist_id: string
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          topic?: string | null
          updated_at?: string | null
          user_id: string
          user_notes?: string | null
        }
        Update: {
          booking_date?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          company_id?: string | null
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          diagnostic_session_id?: string | null
          duration_minutes?: number
          end_time?: string
          id?: string
          is_company_sponsored?: boolean | null
          meeting_link?: string | null
          meeting_type?: string | null
          metadata?: Json | null
          primary_pillar?: string | null
          reminder_sent_1h?: boolean | null
          reminder_sent_24h?: boolean | null
          session_type?: string | null
          specialist_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          topic?: string | null
          updated_at?: string | null
          user_id?: string
          user_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_diagnostic_session_id_fkey"
            columns: ["diagnostic_session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          attachments: Json | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          message_type: string | null
          read_at: string | null
          sender_id: string | null
          sender_type: string
          session_id: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          message_type?: string | null
          read_at?: string | null
          sender_id?: string | null
          sender_type: string
          session_id: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          message_type?: string | null
          read_at?: string | null
          sender_id?: string | null
          sender_type?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          closed_at: string | null
          created_at: string | null
          escalated_at: string | null
          escalation_reason: string | null
          id: string
          metadata: Json | null
          pillar_code: string | null
          session_type: string | null
          specialist_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          escalated_at?: string | null
          escalation_reason?: string | null
          id?: string
          metadata?: Json | null
          pillar_code?: string | null
          session_type?: string | null
          specialist_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          escalated_at?: string | null
          escalation_reason?: string | null
          id?: string
          metadata?: Json | null
          pillar_code?: string | null
          session_type?: string | null
          specialist_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: Json | null
          billing_contact_email: string | null
          billing_contact_name: string | null
          company_name: string
          company_size: string | null
          contact_email: string | null
          created_at: string | null
          created_by: string | null
          email: string
          employee_seats: number
          id: string
          industry: string | null
          metadata: Json | null
          phone: string | null
          sessions_per_employee: number | null
          tax_id: string | null
          updated_at: string | null
          website: string | null
          access_code: string | null
          monthly_total_quota: number | null
          sessions_used: number | null
          is_active: boolean | null
        }
        Insert: {
          address?: Json | null
          billing_contact_email?: string | null
          billing_contact_name?: string | null
          company_name: string
          company_size?: string | null
          contact_email?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          employee_seats?: number
          id?: string
          industry?: string | null
          metadata?: Json | null
          phone?: string | null
          sessions_per_employee?: number | null
          tax_id?: string | null
          updated_at?: string | null
          website?: string | null
          access_code?: string | null
          monthly_total_quota?: number | null
          sessions_used?: number | null
          is_active?: boolean | null
        }
        Update: {
          address?: Json | null
          billing_contact_email?: string | null
          billing_contact_name?: string | null
          company_name?: string
          company_size?: string | null
          contact_email?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          employee_seats?: number
          id?: string
          industry?: string | null
          metadata?: Json | null
          phone?: string | null
          sessions_per_employee?: number | null
          tax_id?: string | null
          updated_at?: string | null
          website?: string | null
          access_code?: string | null
          monthly_total_quota?: number | null
          sessions_used?: number | null
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employees: {
        Row: {
          company_id: string
          created_at: string | null
          deactivated_at: string | null
          department: string | null
          id: string
          is_active: boolean | null
          job_title: string | null
          joined_at: string | null
          monthly_session_quota: number | null
          quota_reset_date: string | null
          role: Database["public"]["Enums"]["company_employee_role"]
          sessions_used_this_month: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          deactivated_at?: string | null
          department?: string | null
          id?: string
          is_active?: boolean | null
          job_title?: string | null
          joined_at?: string | null
          monthly_session_quota?: number | null
          quota_reset_date?: string | null
          role?: Database["public"]["Enums"]["company_employee_role"]
          sessions_used_this_month?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          deactivated_at?: string | null
          department?: string | null
          id?: string
          is_active?: boolean | null
          job_title?: string | null
          joined_at?: string | null
          monthly_session_quota?: number | null
          quota_reset_date?: string | null
          role?: Database["public"]["Enums"]["company_employee_role"]
          sessions_used_this_month?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_employees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_invites: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          company_id: string | null
          created_at: string | null
          email: string
          expires_at: string | null
          id: string
          invite_code: string
          invited_by: string | null
          role: string | null
          status: string | null
          seats: number | null
          monthly_total_quota: number | null
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          company_id?: string | null
          created_at?: string | null
          email: string
          expires_at?: string | null
          id?: string
          invite_code?: string
          invited_by?: string | null
          role?: string | null
          status?: string | null
          seats?: number | null
          monthly_total_quota?: number | null
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          company_id?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          invite_code?: string
          invited_by?: string | null
          role?: string | null
          status?: string | null
          seats?: number | null
          monthly_total_quota?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "company_invites_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invites_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_views: {
        Row: {
          content_id: string
          content_type: string
          id: string
          ip_address: unknown
          session_id: string | null
          user_agent: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          id?: string
          ip_address?: unknown
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          id?: string
          ip_address?: unknown
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostic_responses: {
        Row: {
          chat_session_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          pillar_code: string
          question_page: number
          question_text: string
          response_index: number
          selected_option: string
          user_id: string
        }
        Insert: {
          chat_session_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          pillar_code: string
          question_page: number
          question_text: string
          response_index: number
          selected_option: string
          user_id: string
        }
        Update: {
          chat_session_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          pillar_code?: string
          question_page?: number
          question_text?: string
          response_index?: number
          selected_option?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_chat_session"
            columns: ["chat_session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      email_queue: {
        Row: {
          attempts: number | null
          body_html: string
          body_text: string | null
          created_at: string | null
          email_type: string
          error_message: string | null
          id: string
          last_attempt_at: string | null
          max_attempts: number | null
          metadata: Json | null
          provider: string | null
          provider_message_id: string | null
          recipient_email: string
          recipient_user_id: string | null
          sent_at: string | null
          status: string | null
          subject: string
        }
        Insert: {
          attempts?: number | null
          body_html: string
          body_text?: string | null
          created_at?: string | null
          email_type: string
          error_message?: string | null
          id?: string
          last_attempt_at?: string | null
          max_attempts?: number | null
          metadata?: Json | null
          provider?: string | null
          provider_message_id?: string | null
          recipient_email: string
          recipient_user_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          attempts?: number | null
          body_html?: string
          body_text?: string | null
          created_at?: string | null
          email_type?: string
          error_message?: string | null
          id?: string
          last_attempt_at?: string | null
          max_attempts?: number | null
          metadata?: Json | null
          provider?: string | null
          provider_message_id?: string | null
          recipient_email?: string
          recipient_user_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_queue_recipient_user_id_fkey"
            columns: ["recipient_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer_en: string | null
          answer_pt: string
          category: string | null
          created_at: string | null
          helpful_count: number | null
          id: string
          is_published: boolean | null
          not_helpful_count: number | null
          order_index: number | null
          question_en: string | null
          question_pt: string
          slug: string | null
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          answer_en?: string | null
          answer_pt: string
          category?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_published?: boolean | null
          not_helpful_count?: number | null
          order_index?: number | null
          question_en?: string | null
          question_pt: string
          slug?: string | null
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          answer_en?: string | null
          answer_pt?: string
          category?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_published?: boolean | null
          not_helpful_count?: number | null
          order_index?: number | null
          question_en?: string | null
          question_pt?: string
          slug?: string | null
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      financial_planner_data: {
        Row: {
          additional_income: number | null
          balance: number | null
          created_at: string | null
          expenses: Json | null
          id: string
          main_salary: number | null
          metadata: Json | null
          month_year: string
          notes: string | null
          talents: string[] | null
          total_expenses: number | null
          total_income: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_income?: number | null
          balance?: number | null
          created_at?: string | null
          expenses?: Json | null
          id?: string
          main_salary?: number | null
          metadata?: Json | null
          month_year: string
          notes?: string | null
          talents?: string[] | null
          total_expenses?: number | null
          total_income?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_income?: number | null
          balance?: number | null
          created_at?: string | null
          expenses?: Json | null
          id?: string
          main_salary?: number | null
          metadata?: Json | null
          month_year?: string
          notes?: string | null
          talents?: string[] | null
          total_expenses?: number | null
          total_income?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_planner_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_planner_history: {
        Row: {
          additional_income: number | null
          balance: number | null
          change_type: string | null
          created_at: string | null
          expenses: Json | null
          financial_data_id: string | null
          id: string
          main_salary: number | null
          month_year: string
          talents: string[] | null
          total_expenses: number | null
          total_income: number | null
          user_id: string
        }
        Insert: {
          additional_income?: number | null
          balance?: number | null
          change_type?: string | null
          created_at?: string | null
          expenses?: Json | null
          financial_data_id?: string | null
          id?: string
          main_salary?: number | null
          month_year: string
          talents?: string[] | null
          total_expenses?: number | null
          total_income?: number | null
          user_id: string
        }
        Update: {
          additional_income?: number | null
          balance?: number | null
          change_type?: string | null
          created_at?: string | null
          expenses?: Json | null
          financial_data_id?: string | null
          id?: string
          main_salary?: number | null
          month_year?: string
          talents?: string[] | null
          total_expenses?: number | null
          total_income?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_planner_history_financial_data_id_fkey"
            columns: ["financial_data_id"]
            isOneToOne: false
            referencedRelation: "financial_planner_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_planner_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      greeting_messages: {
        Row: {
          category: string
          created_at: string
          id: string
          is_active: boolean
          message: string
          metadata: Json
          updated_at: string
          weight: number
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          is_active?: boolean
          message: string
          metadata?: Json
          updated_at?: string
          weight?: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean
          message?: string
          metadata?: Json
          updated_at?: string
          weight?: number
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          created_at: string
          id: string
          mood_index: number
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood_index: number
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood_index?: number
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          email_booking_cancellations: boolean | null
          email_booking_changes: boolean | null
          email_booking_confirmations: boolean | null
          email_booking_reminders: boolean | null
          email_marketing: boolean | null
          email_milestones: boolean | null
          email_new_messages: boolean | null
          email_session_completed: boolean | null
          id: string
          sms_booking_reminders: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          email_booking_cancellations?: boolean | null
          email_booking_changes?: boolean | null
          email_booking_confirmations?: boolean | null
          email_booking_reminders?: boolean | null
          email_marketing?: boolean | null
          email_milestones?: boolean | null
          email_new_messages?: boolean | null
          email_session_completed?: boolean | null
          id?: string
          sms_booking_reminders?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          email_booking_cancellations?: boolean | null
          email_booking_changes?: boolean | null
          email_booking_confirmations?: boolean | null
          email_booking_reminders?: boolean | null
          email_marketing?: boolean | null
          email_milestones?: boolean | null
          email_new_messages?: boolean | null
          email_session_completed?: boolean | null
          id?: string
          sms_booking_reminders?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          meta: Json
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          meta?: Json
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          meta?: Json
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pillars: {
        Row: {
          color_hex: string | null
          created_at: string | null
          description_en: string | null
          description_pt: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          name_en: string
          name_pt: string
          order_index: number
        }
        Insert: {
          color_hex?: string | null
          created_at?: string | null
          description_en?: string | null
          description_pt?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name_en: string
          name_pt: string
          order_index: number
        }
        Update: {
          color_hex?: string | null
          created_at?: string | null
          description_en?: string | null
          description_pt?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name_en?: string
          name_pt?: string
          order_index?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_id: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          language: string | null
          last_seen_at: string | null
          metadata: Json | null
          onboarding_completed: boolean | null
          onboarding_completed_at: string | null
          phone: string | null
          primary_role: Database["public"]["Enums"]["user_role"]
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          is_active?: boolean | null
          language?: string | null
          last_seen_at?: string | null
          metadata?: Json | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          phone?: string | null
          primary_role?: Database["public"]["Enums"]["user_role"]
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          language?: string | null
          last_seen_at?: string | null
          metadata?: Json | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          phone?: string | null
          primary_role?: Database["public"]["Enums"]["user_role"]
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          created_at: string
          id: string
          subscription: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          subscription: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          subscription?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      quota_audit_log: {
        Row: {
          action: string
          booking_id: string | null
          created_at: string | null
          id: string
          new_total: number
          new_used: number
          performed_by: string | null
          previous_total: number
          previous_used: number
          reason: string | null
          user_id: string
        }
        Insert: {
          action: string
          booking_id?: string | null
          created_at?: string | null
          id?: string
          new_total: number
          new_used: number
          performed_by?: string | null
          previous_total: number
          previous_used: number
          reason?: string | null
          user_id: string
        }
        Update: {
          action?: string
          booking_id?: string | null
          created_at?: string | null
          id?: string
          new_total?: number
          new_used?: number
          performed_by?: string | null
          previous_total?: number
          previous_used?: number
          reason?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quota_audit_log_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quota_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_categories: {
        Row: {
          category_name_en: string | null
          category_name_pt: string
          color: string | null
          created_at: string | null
          description: string | null
          description_en: string | null
          description_pt: string | null
          icon: string | null
          id: string
          name_en: string | null
          name_pt: string
          order_index: number | null
          pillar_code: string | null
          updated_at: string | null
        }
        Insert: {
          category_name_en?: string | null
          category_name_pt: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          description_pt?: string | null
          icon?: string | null
          id?: string
          name_en?: string | null
          name_pt: string
          order_index?: number | null
          pillar_code?: string | null
          updated_at?: string | null
        }
        Update: {
          category_name_en?: string | null
          category_name_pt?: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          description_pt?: string | null
          icon?: string | null
          id?: string
          name_en?: string | null
          name_pt?: string
          order_index?: number | null
          pillar_code?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          author_id: string | null
          category_id: string | null
          created_at: string | null
          description_en: string | null
          description_pt: string | null
          difficulty_level: string | null
          downloads_count: number | null
          duration_minutes: number | null
          file_size_bytes: number | null
          file_url: string | null
          id: string
          is_published: boolean | null
          metadata: Json | null
          pillar_code: Database["public"]["Enums"]["pillar_code"] | null
          published_at: string | null
          resource_type: string
          slug: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title_en: string | null
          title_pt: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          created_at?: string | null
          description_en?: string | null
          description_pt?: string | null
          difficulty_level?: string | null
          downloads_count?: number | null
          duration_minutes?: number | null
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          metadata?: Json | null
          pillar_code?: Database["public"]["Enums"]["pillar_code"] | null
          published_at?: string | null
          resource_type: string
          slug?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title_en?: string | null
          title_pt: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          created_at?: string | null
          description_en?: string | null
          description_pt?: string | null
          difficulty_level?: string | null
          downloads_count?: number | null
          duration_minutes?: number | null
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          metadata?: Json | null
          pillar_code?: Database["public"]["Enums"]["pillar_code"] | null
          published_at?: string | null
          resource_type?: string
          slug?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title_en?: string | null
          title_pt?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "resource_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      session_feedback: {
        Row: {
          booking_id: string
          communication_rating: number | null
          helpfulness_rating: number | null
          id: string
          improvement_suggestions: string | null
          is_anonymous: boolean | null
          overall_rating: number | null
          positive_feedback: string | null
          professionalism_rating: number | null
          rating: number | null
          specialist_id: string | null
          submitted_at: string | null
          user_id: string
          would_recommend: boolean | null
        }
        Insert: {
          booking_id: string
          communication_rating?: number | null
          helpfulness_rating?: number | null
          id?: string
          improvement_suggestions?: string | null
          is_anonymous?: boolean | null
          overall_rating?: number | null
          positive_feedback?: string | null
          professionalism_rating?: number | null
          rating?: number | null
          specialist_id?: string | null
          submitted_at?: string | null
          user_id: string
          would_recommend?: boolean | null
        }
        Update: {
          booking_id?: string
          communication_rating?: number | null
          helpfulness_rating?: number | null
          id?: string
          improvement_suggestions?: string | null
          is_anonymous?: boolean | null
          overall_rating?: number | null
          positive_feedback?: string | null
          professionalism_rating?: number | null
          rating?: number | null
          specialist_id?: string | null
          submitted_at?: string | null
          user_id?: string
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "session_feedback_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_feedback_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      session_notes: {
        Row: {
          booking_id: string | null
          created_at: string | null
          follow_up_date: string | null
          follow_up_needed: boolean | null
          id: string
          private_notes: string | null
          recommendations: string | null
          shared_notes: string | null
          specialist_id: string | null
          updated_at: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          private_notes?: string | null
          recommendations?: string | null
          shared_notes?: string | null
          specialist_id?: string | null
          updated_at?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          private_notes?: string | null
          recommendations?: string | null
          shared_notes?: string | null
          specialist_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_notes_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_notes_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      session_ratings: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_ratings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      specialist_pillars: {
        Row: {
          certification_details: string | null
          created_at: string | null
          id: string
          is_primary_specialty: boolean | null
          pillar_code: string
          specialist_id: string | null
          years_experience: number | null
        }
        Insert: {
          certification_details?: string | null
          created_at?: string | null
          id?: string
          is_primary_specialty?: boolean | null
          pillar_code: string
          specialist_id?: string | null
          years_experience?: number | null
        }
        Update: {
          certification_details?: string | null
          created_at?: string | null
          id?: string
          is_primary_specialty?: boolean | null
          pillar_code?: string
          specialist_id?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "specialist_pillars_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      specialist_recurring_availability: {
        Row: {
          day_of_week: number | null
          effective_from: string | null
          effective_until: string | null
          end_time: string
          id: string
          is_active: boolean | null
          specialist_id: string | null
          start_time: string
        }
        Insert: {
          day_of_week?: number | null
          effective_from?: string | null
          effective_until?: string | null
          end_time: string
          id?: string
          is_active?: boolean | null
          specialist_id?: string | null
          start_time: string
        }
        Update: {
          day_of_week?: number | null
          effective_from?: string | null
          effective_until?: string | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          specialist_id?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "specialist_recurring_availability_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      specialist_time_off: {
        Row: {
          created_at: string | null
          end_datetime: string
          id: string
          reason: string | null
          specialist_id: string | null
          start_datetime: string
        }
        Insert: {
          created_at?: string | null
          end_datetime: string
          id?: string
          reason?: string | null
          specialist_id?: string | null
          start_datetime: string
        }
        Update: {
          created_at?: string | null
          end_datetime?: string
          id?: string
          reason?: string | null
          specialist_id?: string | null
          start_datetime?: string
        }
        Relationships: [
          {
            foreignKeyName: "specialist_time_off_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      specialists: {
        Row: {
          average_rating: number | null
          bio: string | null
          created_at: string | null
          id: string
          is_accepting_new_clients: boolean | null
          is_active: boolean | null
          languages: string[] | null
          license_number: string | null
          metadata: Json | null
          professional_title: string
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
          years_of_experience: number | null
        }
        Insert: {
          average_rating?: number | null
          bio?: string | null
          created_at?: string | null
          id?: string
          is_accepting_new_clients?: boolean | null
          is_active?: boolean | null
          languages?: string[] | null
          license_number?: string | null
          metadata?: Json | null
          professional_title?: string
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          years_of_experience?: number | null
        }
        Update: {
          average_rating?: number | null
          bio?: string | null
          created_at?: string | null
          id?: string
          is_accepting_new_clients?: boolean | null
          is_active?: boolean | null
          languages?: string[] | null
          license_number?: string | null
          metadata?: Json | null
          professional_title?: string
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "specialists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          sender_type: string
          ticket_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          sender_type: string
          ticket_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          sender_type?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_goals: {
        Row: {
          completed_date: string | null
          created_at: string | null
          current_value: number | null
          goal_description: string | null
          goal_title: string
          id: string
          is_auto_generated: boolean | null
          pillar_code: string | null
          start_date: string | null
          status: string | null
          target_date: string | null
          target_unit: string | null
          target_value: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_date?: string | null
          created_at?: string | null
          current_value?: number | null
          goal_description?: string | null
          goal_title: string
          id?: string
          is_auto_generated?: boolean | null
          pillar_code?: string | null
          start_date?: string | null
          status?: string | null
          target_date?: string | null
          target_unit?: string | null
          target_value?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_date?: string | null
          created_at?: string | null
          current_value?: number | null
          goal_description?: string | null
          goal_title?: string
          id?: string
          is_auto_generated?: boolean | null
          pillar_code?: string | null
          start_date?: string | null
          status?: string | null
          target_date?: string | null
          target_unit?: string | null
          target_value?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_greeting_state: {
        Row: {
          created_at: string
          last_daily_welcome_at: string | null
          last_message_category: string | null
          last_message_id: string | null
          last_message_shown_at: string | null
          recent_message_ids: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          last_daily_welcome_at?: string | null
          last_message_category?: string | null
          last_message_id?: string | null
          last_message_shown_at?: string | null
          recent_message_ids?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          last_daily_welcome_at?: string | null
          last_message_category?: string | null
          last_message_id?: string | null
          last_message_shown_at?: string | null
          recent_message_ids?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_greeting_state_last_message_id_fkey"
            columns: ["last_message_id"]
            isOneToOne: false
            referencedRelation: "greeting_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      user_milestones: {
        Row: {
          badge_icon_url: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          metadata: Json | null
          milestone_description: string | null
          milestone_label: string
          milestone_type: string
          points_awarded: number | null
          user_id: string
        }
        Insert: {
          badge_icon_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          metadata?: Json | null
          milestone_description?: string | null
          milestone_label: string
          milestone_type: string
          points_awarded?: number | null
          user_id: string
        }
        Update: {
          badge_icon_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          metadata?: Json | null
          milestone_description?: string | null
          milestone_label?: string
          milestone_type?: string
          points_awarded?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_milestones_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_personal_quotas: {
        Row: {
          created_at: string | null
          id: string
          sessions_used: number
          total_sessions: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          sessions_used?: number
          total_sessions?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          sessions_used?: number
          total_sessions?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_personal_quotas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          current_streak_days: number | null
          financial_sessions: number | null
          id: string
          last_active_date: string | null
          last_session_date: string | null
          legal_social_sessions: number | null
          level: number | null
          longest_streak_days: number | null
          physical_sessions: number | null
          psychological_sessions: number | null
          sessions_this_month: number | null
          sessions_this_week: number | null
          total_points: number | null
          total_sessions_completed: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          current_streak_days?: number | null
          financial_sessions?: number | null
          id?: string
          last_active_date?: string | null
          last_session_date?: string | null
          legal_social_sessions?: number | null
          level?: number | null
          longest_streak_days?: number | null
          physical_sessions?: number | null
          psychological_sessions?: number | null
          sessions_this_month?: number | null
          sessions_this_week?: number | null
          total_points?: number | null
          total_sessions_completed?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          current_streak_days?: number | null
          financial_sessions?: number | null
          id?: string
          last_active_date?: string | null
          last_session_date?: string | null
          legal_social_sessions?: number | null
          level?: number | null
          longest_streak_days?: number | null
          physical_sessions?: number | null
          psychological_sessions?: number | null
          sessions_this_month?: number | null
          sessions_this_week?: number | null
          total_points?: number | null
          total_sessions_completed?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: string
          metadata: Json | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          metadata?: Json | null
          role: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          metadata?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cancel_booking_with_refund: {
        Args: { p_booking_id: string; p_user_id: string }
        Returns: Json
      }
      complete_booking: {
        Args: { p_booking_id: string; p_specialist_id: string }
        Returns: Json
      }
      create_booking_with_lock: {
        Args: {
          p_booking_date: string
          p_booking_time: string
          p_meeting_type: string
          p_notes?: string
          p_primary_pillar: string
          p_specialist_id: string
          p_user_id: string
        }
        Returns: Json
      }
      create_company_for_admin:
      | {
        Args: {
          p_admin_user_id: string
          p_company_name: string
          p_employee_seats?: number
          p_sessions_per_employee?: number
        }
        Returns: Json
      }
      | {
        Args: {
          p_access_code: string
          p_company_name: string
          p_email: string
          p_employee_seats: number
          p_phone: string
          p_sessions_per_employee: number
          p_tax_id: string
          p_user_id: string
        }
        Returns: Json
      }
      | {
        Args: {
          p_company_name: string
          p_employee_seats?: number
          p_sessions_per_employee?: number
          p_user_id: string
        }
        Returns: string
      }
      create_notification_preferences: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      create_user_quota_if_missing: {
        Args: { p_user_id: string }
        Returns: Json
      }
      delete_company_safely: { Args: { p_company_id: string }; Returns: Json }
      generate_company_invite: {
        Args: { p_company_id: string }
        Returns: string
      }
      get_company_analytics: { Args: { p_company_id: string }; Returns: Json }
      get_company_quota_overview: {
        Args: { p_company_id: string }
        Returns: {
          average_utilization: number
          employees_quota_exhausted: number
          employees_quota_low: number
          employees_with_quotas: number
          integrity_issues: number
          total_employees: number
          total_quota_allocated: number
          total_quota_remaining: number
          total_quota_used: number
        }[]
      }
      get_platform_metrics: {
        Args: never
        Returns: {
          active_companies: number
          active_specialists: number
          active_users: number
          average_rating: number
          completed_sessions: number
          sessions_this_month: number
          total_companies: number
          total_sessions: number
          total_specialists: number
          total_users: number
        }[]
      }
      get_specialist_performance: {
        Args: { p_specialist_id: string }
        Returns: Json
      }
      get_user_dashboard_data: { Args: { p_user_id: string }; Returns: Json }
      get_user_quota_summary: {
        Args: { p_user_id: string }
        Returns: {
          active_bookings: number
          cancelled_bookings: number
          completed_bookings: number
          integrity_check: string
          last_booking_date: string
          quota_status: string
          sessions_remaining: number
          sessions_used: number
          total_sessions: number
          utilization_percentage: number
        }[]
      }
      get_user_session_balance: {
        Args: { p_user_id: string }
        Returns: {
          company_available: number
          company_quota: number
          company_used: number
          personal_available: number
          personal_quota: number
          personal_used: number
          total_remaining: number
        }[]
      }
      is_company_admin: { Args: { p_company_id: string }; Returns: boolean }
      is_specialist_available: {
        Args: {
          p_date: string
          p_end_time: string
          p_specialist_id: string
          p_start_time: string
        }
        Returns: boolean
      }
      link_company_to_admin: {
        Args: {
          p_admin_user_id: string
          p_company_address?: string
          p_company_name: string
          p_company_phone?: string
          p_company_tax_id?: string
          p_employee_seats?: number
          p_sessions_per_employee?: number
        }
        Returns: Json
      }
      manually_add_user_to_company: {
        Args: { p_company_id: string; p_user_email: string }
        Returns: Json
      }
      queue_email: {
        Args: {
          p_body_html: string
          p_email_type: string
          p_metadata?: Json
          p_recipient_email: string
          p_recipient_user_id: string
          p_subject: string
        }
        Returns: string
      }
      recalculate_user_quota: { Args: { p_user_id: string }; Returns: Json }
      redeem_access_code: {
        Args: { p_code: string; p_profile_id: string }
        Returns: Json
      }
      redeem_company_invite: {
        Args: { p_invite_code: string; p_user_id: string }
        Returns: Json
      }
      register_company_with_admin: {
        Args: {
          p_admin_email: string
          p_admin_full_name: string
          p_admin_password: string
          p_company_address: string
          p_company_name: string
          p_company_phone: string
          p_company_tax_id: string
          p_employee_seats?: number
          p_sessions_per_employee?: number
        }
        Returns: Json
      }
      register_employee_with_access_code: {
        Args: { p_access_code: string; p_full_name: string; p_user_id: string }
        Returns: Json
      }
      repair_quota_discrepancies: {
        Args: { p_user_id?: string }
        Returns: {
          corrected_by: number
          email: string
          new_used: number
          old_used: number
          status: string
          user_id: string
        }[]
      }
      reset_monthly_quotas: { Args: never; Returns: undefined }
      send_booking_reminders: { Args: never; Returns: undefined }
      send_booking_reminders_24h: { Args: never; Returns: undefined }
      send_email_notification: {
        Args: {
          p_html: string
          p_subject: string
          p_to: string
          p_type?: string
        }
        Returns: undefined
      }
      test_user_rls_access: { Args: { p_user_id: string }; Returns: Json }
      test_user_rls_with_jwt: { Args: { p_user_id: string }; Returns: Json }
      transfer_users_to_company: {
        Args: { p_from_company_id: string; p_to_company_id: string }
        Returns: Json
      }
      update_booking_reschedule: {
        Args: {
          p_booking_date: string
          p_booking_id: string
          p_end_time: string
          p_meeting_type: string
          p_metadata: Json
          p_primary_pillar: string
          p_specialist_id: string
          p_start_time: string
        }
        Returns: undefined
      }
      update_user_quota_locked: {
        Args: { p_total_sessions: number; p_user_id: string }
        Returns: Json
      }
      verify_quota_integrity: {
        Args: { p_user_id?: string }
        Returns: {
          actual_bookings_count: number
          details: string
          discrepancy: number
          email: string
          quota_remaining: number
          quota_total: number
          quota_used: number
          status: string
          user_id: string
        }[]
      }
      verify_user_company_mapping: {
        Args: never
        Returns: {
          email: string
          employee_company_id: string
          has_quota: boolean
          issue: string
          profile_company_id: string
          quota_total: number
          role: string
          status: string
          user_id: string
        }[]
      }
    }
    Enums: {
      booking_status:
      | "pending"
      | "confirmed"
      | "cancelled"
      | "completed"
      | "no_show"
      | "rescheduled"
      company_employee_role: "admin" | "member"
      pillar_code: "PSYCH" | "PHYSICAL" | "FINANCIAL" | "LEGAL"
      user_role: "user" | "specialist" | "company_admin" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {
      booking_status: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
        "no_show",
        "rescheduled",
      ],
      company_employee_role: ["admin", "member"],
      pillar_code: ["PSYCH", "PHYSICAL", "FINANCIAL", "LEGAL"],
      user_role: ["user", "specialist", "company_admin", "admin"],
    },
  },
} as const
