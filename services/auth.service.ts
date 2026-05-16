import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import {
  Result,
  Ok,
  Err,
  AuthenticationError,
  NotFoundError,
  handleSupabaseError,
  AppError,
} from '@/lib/errors';

type Profile = Database['public']['Tables']['profiles']['Row'];

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  metadata?: Record<string, any>;
}

/**
 * Authentication Service
 * Handles all authentication-related operations
 */
export class AuthService {
  /**
   * Sign in with email and password
   */
  async signIn(credentials: SignInCredentials): Promise<Result<{ profile: Profile }, AppError>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return Err(
          new AuthenticationError(
            error.message,
            'Invalid email or password. Please try again.',
            { email: credentials.email }
          )
        );
      }

      if (!data.user) {
        return Err(
          new AuthenticationError('No user returned from sign in', 'Authentication failed.')
        );
      }

      // Fetch user profile
      const profile = await this.getProfile(data.user.id);
      if (!profile) {
        return Err(
          new NotFoundError('Profile not found', 'User Profile', data.user.id)
        );
      }

      return Ok({ profile });
    } catch (err) {
      return Err(handleSupabaseError(err));
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(signUpData: SignUpData): Promise<Result<{ profile: Profile }, AppError>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            full_name: signUpData.fullName,
            phone: signUpData.phone,
            ...signUpData.metadata,
          },
        },
      });

      if (error) {
        return Err(
          new AuthenticationError(
            error.message,
            error.message.includes('already registered')
              ? 'This email is already registered. Please sign in instead.'
              : 'Failed to create account. Please try again.',
            { email: signUpData.email }
          )
        );
      }

      if (!data.user) {
        return Err(
          new AuthenticationError('No user returned from sign up', 'Failed to create account.')
        );
      }

      // Profile is created via trigger, fetch it
      const profile = await this.getProfile(data.user.id);
      if (!profile) {
        return Err(
          new NotFoundError('Profile not created', 'User Profile', data.user.id)
        );
      }

      return Ok({ profile });
    } catch (err) {
      return Err(handleSupabaseError(err));
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<Result<void, AppError>> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return Err(
          new AuthenticationError(error.message, 'Failed to sign out. Please try again.')
        );
      }
      return Ok(undefined);
    } catch (err) {
      return Err(handleSupabaseError(err));
    }
  }

  /**
   * Get user profile from database
   */
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: Partial<Profile>
  ): Promise<Result<Profile, AppError>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return Err(handleSupabaseError(error));
      }

      return Ok(data);
    } catch (err) {
      return Err(handleSupabaseError(err));
    }
  }

  /**
   * Reset password for email
   */
  async resetPassword(email: string): Promise<Result<void, AppError>> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return Err(
          new AuthenticationError(
            error.message,
            'Failed to send password reset email. Please check the email address and try again.'
          )
        );
      }

      return Ok(undefined);
    } catch (err) {
      return Err(handleSupabaseError(err));
    }
  }

  /**
   * Get current session
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return { session: null, error };
    }
    return { session: data.session, error: null };
  }

  /**
   * Get current user
   */
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return { user: null, error };
    }
    return { user: data.user, error: null };
  }
}

// Export singleton instance
export const authService = new AuthService();
