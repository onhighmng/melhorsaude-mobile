import { supabase } from '@/lib/supabase';

export interface DiagnosticResponse {
  pillarCode: string;
  questionPage: number;
  questionText: string;
  selectedOption: string;
  responseIndex: number;
}

export async function saveDiagnosticResponses(
  userId: string,
  responses: DiagnosticResponse[]
) {
  try {
    // Create a chat session first
    const { data: session, error: sessionError } = await (supabase
      .from('chat_sessions') as any)
      .insert({
        user_id: userId,
        pillar_code: responses[0]?.pillarCode,
        session_type: 'diagnostic'
      })
      .select()
      .single();

    if (sessionError) throw sessionError;

    // Insert diagnostic responses with the session ID
    const responsesToInsert = responses.map(response => ({
      user_id: userId,
      pillar_code: response.pillarCode,
      question_page: response.questionPage,
      question_text: response.questionText,
      selected_option: response.selectedOption,
      response_index: response.responseIndex,
      chat_session_id: session.id
    }));

    const { error: responsesError } = await (supabase
      .from('diagnostic_responses') as any)
      .insert(responsesToInsert);

    if (responsesError) throw responsesError;

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error saving diagnostic responses:', error);
    throw error;
  }
}

