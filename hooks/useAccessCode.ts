import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { logger } from '@/utils/logger';

interface CodeRedemptionResult {
  success: boolean;
  error?: string;
  role?: string;
  redirectPath?: string;
  companyId?: string;
}

export function useAccessCode() {
  const [isValidating, setIsValidating] = useState(false);

  /**
   * Validates if an access code exists and is available for use
   * Checks both access_codes and company_invites
   */
  const validateCode = async (code: string): Promise<boolean> => {
    try {

      const normalizedCode = code.trim();

      const [inviteResult, accessResult] = await Promise.all([
        supabase
          .from('company_invites')
          .select('id, expires_at, accepted_by, status')
          .eq('invite_code', normalizedCode)
          .maybeSingle(),
        supabase
          .from('access_codes')
          .select('id, expires_at, used_by, status')
          .eq('code', normalizedCode)
          .maybeSingle()
      ]);

      const { data: companyInvite, error: companyError } = inviteResult;


      if (!companyError && companyInvite) {
        if (companyInvite.accepted_by) {
          logger.warn('❌ Code already used');
          return false;
        }

        if (companyInvite.expires_at && new Date(companyInvite.expires_at) < new Date()) {
          logger.warn('❌ Code expired');
          return false;
        }

        if (companyInvite.status !== 'pending') {
          // Code status not pending
          return false;
        }


        return true;
      }

      const { data: accessCode, error: accessError } = accessResult;
      if (accessError || !accessCode) {
        return false;
      }

      if (accessCode.used_by) return false;
      if (accessCode.expires_at && new Date(accessCode.expires_at) < new Date()) return false;
      if (accessCode.status !== 'active') return false;

      return true;
    } catch (error: any) {
      logger.error('Error validating code:', error);
      // Log network errors for debugging geographic issues
      if (error?.message?.includes('network') || error?.code === 'NETWORK_ERROR') {
        logger.error('Network error during code validation - may indicate connectivity issues', {
          error: error.message,
          code: error.code
        });
      }
      return false;
    }
  };

  /**
   * Redeems an access code for a user after registration
   * Supports both access_codes and company_invites
   */
  const redeemCode = async (code: string, profileId: string): Promise<CodeRedemptionResult> => {
    setIsValidating(true);

    try {
      logger.info('Attempting to redeem code:', code, 'for profile:', profileId);

      // First, try to redeem as a company invite
      const { data: companyInviteData, error: companyInviteError } = await supabase
        .rpc('redeem_company_invite', {
          p_invite_code: code,
          p_user_id: profileId
        });

      // If company invite redemption succeeded
      // Explicitly checking success property on the returned JSON object
      const inviteResult = companyInviteData as any;
      if (!companyInviteError && inviteResult?.success) {
        logger.info('✅ Successfully redeemed as company invite:', inviteResult);
        return {
          success: true,
          role: inviteResult.role || 'user', // Use returned role or default to 'user'
          redirectPath: inviteResult.redirectPath || '/user/dashboard',
          companyId: inviteResult.companyId
        };
      }

      logger.info('Not a company invite or failed, trying access_code...', companyInviteError);

      // If not a company invite, try as regular access code
      const { data: accessCodeData, error: accessCodeError } = await supabase
        .rpc('redeem_access_code', {
          p_code: code,
          p_profile_id: profileId
        });

      if (accessCodeError) {
        logger.error('Error redeeming access code:', accessCodeError);
        return {
          success: false,
          error: 'Código inválido ou já utilizado'
        };
      }

      // Parse the result
      const result = accessCodeData as any;

      if (!result.success) {
        return {
          success: false,
          error: result.error || 'Erro ao processar código'
        };
      }

      logger.info('✅ Successfully redeemed as access code:', result);

      return {
        success: true,
        role: result.role,
        redirectPath: result.redirectPath,
        companyId: result.companyId
      };
    } catch (error: any) {
      logger.error('Error in redeemCode:', error);

      // Provide more detailed error messages
      let errorMessage = 'Erro ao processar código';

      if (error?.message?.includes('network') || error?.code === 'NETWORK_ERROR') {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
        logger.error('Network error during code redemption', {
          error: error.message,
          code: error.code
        });
      } else if (error?.message?.includes('timeout')) {
        errorMessage = 'Tempo de resposta excedido. Tente novamente.';
      } else if (error?.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * Gets information about a code without redeeming it
   * Checks both access_codes and company_invites
   */
  const getCodeInfo = async (code: string) => {
    try {
      logger.debug('🔍 Getting code info for:', code);
      const normalizedCode = code.trim();

      const [inviteResult, accessResult] = await Promise.all([
        supabase
          .from('company_invites')
          .select('company_id, expires_at, status, accepted_by')
          .eq('invite_code', normalizedCode)
          .maybeSingle(),
        supabase
          .from('access_codes')
          .select('role_type, metadata, expires_at, status, used_by')
          .eq('code', normalizedCode)
          .maybeSingle()
      ]);

      const { data: companyInvite, error: companyError } = inviteResult;
      if (companyError) {
        logger.debug('Company invite check failed (expected if access code):', companyError);
      }

      if (!companyError && companyInvite) {
        const info = {
          roleType: 'user' as const, // Company invites always create 'user' role (company employees)
          metadata: { company_id: companyInvite.company_id },
          expiresAt: companyInvite.expires_at,
          status: companyInvite.status,
          isUsed: !!companyInvite.accepted_by,
          isExpired: companyInvite.expires_at ? new Date(companyInvite.expires_at) < new Date() : false,
          isValid:
            !companyInvite.accepted_by &&
            (companyInvite.expires_at ? new Date(companyInvite.expires_at) >= new Date() : true) &&
            companyInvite.status === 'pending'
        };
        logger.info('✅ Code info:', info);
        return info;
      }

      const { data, error } = accessResult;
      if (error || !data) return null;

      return {
        roleType: data.role_type,
        metadata: data.metadata,
        expiresAt: data.expires_at,
        status: data.status,
        isUsed: !!data.used_by,
        isExpired: data.expires_at ? new Date(data.expires_at) < new Date() : false,
        isValid:
          !data.used_by &&
          (data.expires_at ? new Date(data.expires_at) >= new Date() : true) &&
          data.status === 'active'
      };
    } catch (error) {
      logger.error('Error getting code info:', error);
      return null;
    }
  };

  return {
    validateCode,
    redeemCode,
    getCodeInfo,
    isValidating
  };
}

