import { posthog } from './posthog';

// ── Auth ────────────────────────────────────────────────────────────────────
export const track = {

  // Auth
  userSignedIn: (userId: string, method = 'email') =>
    posthog.capture('user_signed_in', { user_id: userId, method }),

  userSignedUp: (userId: string) =>
    posthog.capture('user_signed_up', { user_id: userId }),

  userSignedOut: () =>
    posthog.capture('user_signed_out'),

  // ── Mood ──────────────────────────────────────────────────────────────────
  moodLogged: (moodId: string, moodIndex: number) =>
    posthog.capture('mood_logged', { mood_id: moodId, mood_index: moodIndex }),

  // ── Pulse check-in ────────────────────────────────────────────────────────
  pulseCheckinStarted: () =>
    posthog.capture('pulse_checkin_started'),

  pulseStepCompleted: (step: 'energy' | 'stress' | 'humor', value: number) =>
    posthog.capture('pulse_step_completed', { step, value }),

  pulseCompleted: (energy: number, stress: number, humor: number, overallScore: number) =>
    posthog.capture('pulse_checkin_completed', { energy, stress, humor, overall_score: overallScore }),

  pulseAbandoned: (lastStep: string) =>
    posthog.capture('pulse_checkin_abandoned', { last_step: lastStep }),

  // ── Pillars ───────────────────────────────────────────────────────────────
  pillarSelected: (pillarId: string) =>
    posthog.capture('pillar_selected', { pillar: pillarId }),

  questionnaireCompleted: (pillarId: string) =>
    posthog.capture('questionnaire_completed', { pillar: pillarId }),

  questionnaireAbandoned: (pillarId: string) =>
    posthog.capture('questionnaire_abandoned', { pillar: pillarId }),

  // ── Urgent call ───────────────────────────────────────────────────────────
  urgentCallTapped: () =>
    posthog.capture('urgent_call_tapped'),

  urgentCallConfirmed: () =>
    posthog.capture('urgent_call_confirmed'),

  urgentCallCancelled: () =>
    posthog.capture('urgent_call_cancelled'),

  urgentCallFailed: (error: string) =>
    posthog.capture('urgent_call_failed', { error }),

  // ── Session booking ───────────────────────────────────────────────────────
  sessionTypeSelected: (type: 'video' | 'voice', pillar: string) =>
    posthog.capture('session_type_selected', { meeting_type: type, pillar }),

  sessionDaySelected: (pillar: string, daysAhead: number) =>
    posthog.capture('session_day_selected', { pillar, days_ahead: daysAhead }),

  sessionTimeSelected: (pillar: string, time: string) =>
    posthog.capture('session_time_selected', { pillar, time }),

  sessionBooked: (pillar: string, meetingType: string, date: string, isReschedule: boolean) =>
    posthog.capture('session_booked', { pillar, meeting_type: meetingType, date, is_reschedule: isReschedule }),

  sessionBookingFailed: (pillar: string, error: string) =>
    posthog.capture('session_booking_failed', { pillar, error }),

  // ── Session management ────────────────────────────────────────────────────
  sessionEntered: (meetingType: string, pillar: string) =>
    posthog.capture('session_entered', { meeting_type: meetingType, pillar }),

  sessionRescheduleTapped: (pillar: string) =>
    posthog.capture('session_reschedule_tapped', { pillar }),

  sessionCancelled: (pillar: string) =>
    posthog.capture('session_cancelled', { pillar }),

  // ── Session rating ────────────────────────────────────────────────────────
  sessionRatingOpened: (pillar: string, specialistName: string) =>
    posthog.capture('session_rating_opened', { pillar, specialist: specialistName }),

  sessionRated: (stars: number, pillar: string, hasComment: boolean) =>
    posthog.capture('session_rated', { stars, pillar, has_comment: hasComment }),

  sessionRatingFailed: (error: string) =>
    posthog.capture('session_rating_failed', { error }),

  // ── Quick actions (Meu Espaço) ────────────────────────────────────────────
  quickActionTapped: (action: 'mood_history' | 'rate_sessions' | 'health_progress' | 'recursos') =>
    posthog.capture('quick_action_tapped', { action }),

  // ── Resources ─────────────────────────────────────────────────────────────
  resourceCardTapped: (title: string, pillar: string | null, resourceType: string | null) =>
    posthog.capture('resource_card_tapped', { title, pillar, resource_type: resourceType }),

  featuredResourceTapped: (title: string | null) =>
    posthog.capture('featured_resource_tapped', { title }),

  resourcesViewAllTapped: () =>
    posthog.capture('resources_view_all_tapped'),

  // ── Mood history page ─────────────────────────────────────────────────────
  moodHistoryOpened: () =>
    posthog.capture('mood_history_opened'),

  moodHistoryTabChanged: (tab: 'humor' | 'pulse') =>
    posthog.capture('mood_history_tab_changed', { tab }),

  moodHistoryFilterChanged: (filter: 'all' | 'week' | 'month') =>
    posthog.capture('mood_history_filter_changed', { filter }),

  moodHistoryShowMore: () =>
    posthog.capture('mood_history_show_more'),

  // ── Health progress page ──────────────────────────────────────────────────
  healthProgressOpened: () =>
    posthog.capture('health_progress_opened'),

  healthProgressSectionExpanded: (section: 'pulse_history' | 'mood') =>
    posthog.capture('health_progress_section_expanded', { section }),
};
