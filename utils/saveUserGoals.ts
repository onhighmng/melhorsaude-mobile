import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { logger } from '@/utils/logger';
import { Goal } from './goalMapping';

/**
 * Save user goals to the database
 * @param userId - The user's ID from auth
 * @param goals - Array of goals to save
 * @returns Success status and any errors
 */
const LEGAL_PILLAR_CODE = 'legal_social';

const normalizePillarCode = (pillarCode: any) => { // Changed Goal['pillar_code'] to any as Goal is removed
  if (!pillarCode) return pillarCode;

  const normalized = pillarCode.toLowerCase();

  if (normalized === 'legal' || normalized === 'legal_social' || normalized === 'legal-social' || normalized === 'juridica') {
    return LEGAL_PILLAR_CODE;
  }

  return pillarCode;
};

type UserGoal = Database['public']['Tables']['user_goals']['Row'];

interface SaveGoalsParams {
  userId: string;
  goals: {
    pillar: string;
    description: string; // The text selected by user
    target_value?: number;
    target_unit?: string;
    frequency?: string;
  }[];
}

export async function saveUserGoals({ userId, goals }: SaveGoalsParams) {
  if (!userId || !goals.length) return;

  try {
    logger.info('💾 Saving goals for user:', userId);
    logger.debug('📋 Goals to save:', goals);

    // 1. Get current goals to avoid duplicates or clearing excessive history?
    // For now, let's just insert new ones. 
    // Ideally, we might want to mark old ones as 'completed' or 'archived' if this is a "set new goals" flow.
    // But assuming this is "Onboarding" or "Add Goal", we insert.

    const goalsToInsert = goals.map(g => ({
      user_id: userId,
      pillar_code: g.pillar, // Ensure this matches DB enum/string
      goal_title: g.description, // Mapped description to title as per schema requirement
      goal_description: g.description,
      target_value: g.target_value ?? 1, // Default to 1 if not specified
      target_unit: g.target_unit ?? 'times',
      frequency: g.frequency ?? 'weekly',
      status: 'active',
      start_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('user_goals')
      .insert(goalsToInsert)
      .select();

    if (error) {
      logger.error('❌ Error saving goals:', error);
      throw error;
    }

    logger.info('✅ Goals saved successfully');
    return { success: true, data };

  } catch (error) {
    logger.error('❌ Failed to save goals:', error);
    return { success: false, error };
  }
}
