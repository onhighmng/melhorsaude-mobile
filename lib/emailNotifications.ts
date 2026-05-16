/**
 * Email Notification Service
 * 
 * This service provides email notification functionality that works
 * without requiring pg_net or pg_cron extensions.
 * 
 * Use this for local development or as a fallback if database triggers aren't working.
 */

import { supabase } from '@/lib/supabase';

interface EmailNotificationParams {
  to: string;
  subject: string;
  html: string;
  type?: 'verification' | 'password-reset' | 'notification' | 'booking-confirmation' | 'session-completed' | 'booking-reminder';
}

/**
 * Send an email notification via the Edge Function
 */
export async function sendEmailNotification(params: EmailNotificationParams): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: params
    });

    if (error) {
      console.error('Failed to send email:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully:', data);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate booking confirmation email HTML
 */
export function generateBookingConfirmationEmail(booking: {
  userName: string;
  specialistName: string;
  date: string;
  time: string;
  duration: number;
  meetingLink?: string;
  pillar: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .details ul { list-style: none; padding: 0; }
        .details li { padding: 8px 0; }
        .details strong { color: #007AFF; }
        .button { display: inline-block; background: #007AFF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Consulta Confirmada!</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${booking.userName}</strong>,</p>
          <p>A sua consulta foi confirmada com sucesso. Estamos ansiosos para ajudá-lo no seu percurso de bem-estar!</p>
          
          <div class="details">
            <h3>📋 Detalhes da Consulta</h3>
            <ul>
              <li><strong>Especialista:</strong> ${booking.specialistName}</li>
              <li><strong>Data:</strong> ${booking.date}</li>
              <li><strong>Hora:</strong> ${booking.time}</li>
              <li><strong>Duração:</strong> ${booking.duration} minutos</li>
              <li><strong>Pilar:</strong> ${booking.pillar}</li>
              ${booking.meetingLink ? `<li><strong>Link da Reunião:</strong> <a href="${booking.meetingLink}">Entrar na Reunião</a></li>` : ''}
            </ul>
          </div>

          ${booking.meetingLink ? `
            <center>
              <a href="${booking.meetingLink}" class="button">Entrar na Reunião</a>
            </center>
          ` : ''}

          <p>Para alterar ou cancelar a sua consulta, aceda ao seu painel de controlo em <strong>Minhas Sessões</strong> e clique na sessão para gerir.</p>
          
          <p>Obrigado por confiar na <strong>Melhor Saúde</strong>!</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Melhor Saúde. Todos os direitos reservados.</p>
          <p>Este é um email automático, por favor não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate session completed email HTML
 */
export function generateSessionCompletedEmail(session: {
  userName: string;
  specialistName: string;
  date: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #34C759 0%, #30A14E 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Consulta Concluída!</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${session.userName}</strong>,</p>
          <p>A sua consulta com <strong>${session.specialistName}</strong> foi concluída com sucesso em ${session.date}.</p>
          <p>Continue o seu percurso de bem-estar — pode agendar a sua próxima sessão a qualquer momento.</p>
          <p>Obrigado por confiar na <strong>Melhor Saúde</strong>!</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Melhor Saúde. Todos os direitos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(
  userEmail: string,
  booking: {
    userName: string;
    specialistName: string;
    date: string;
    time: string;
    duration: number;
    meetingLink?: string;
    pillar: string;
  }
): Promise<{ success: boolean; error?: string }> {
  return sendEmailNotification({
    to: userEmail,
    subject: 'Consulta Confirmada - Melhor Saúde',
    html: generateBookingConfirmationEmail(booking),
    type: 'booking-confirmation'
  });
}

/**
 * Send session completed email
 */
export async function sendSessionCompletedEmail(
  userEmail: string,
  session: {
    userName: string;
    specialistName: string;
    date: string;
  }
): Promise<{ success: boolean; error?: string }> {
  return sendEmailNotification({
    to: userEmail,
    subject: 'Consulta Concluída - Melhor Saúde',
    html: generateSessionCompletedEmail(session),
    type: 'session-completed'
  });
}

/**
 * Send booking notification to specialist
 */
export async function sendSpecialistBookingNotification(
  specialistEmail: string,
  booking: {
    specialistName: string;
    userName: string;
    date: string;
    time: string;
    duration: number;
    pillar: string;
    meetingLink?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #34C759 0%, #30A14E 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .details ul { list-style: none; padding: 0; }
        .details li { padding: 8px 0; }
        .details strong { color: #34C759; }
        .button { display: inline-block; background: #34C759; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📅 Nova Consulta Agendada!</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${booking.specialistName}</strong>,</p>
          <p>Foi agendada uma nova consulta consigo. Aqui estão os detalhes:</p>
          
          <div class="details">
            <h3>📋 Detalhes da Consulta</h3>
            <ul>
              <li><strong>Cliente:</strong> ${booking.userName}</li>
              <li><strong>Data:</strong> ${booking.date}</li>
              <li><strong>Hora:</strong> ${booking.time}</li>
              <li><strong>Duração:</strong> ${booking.duration} minutos</li>
              <li><strong>Pilar:</strong> ${booking.pillar}</li>
              ${booking.meetingLink ? `<li><strong>Link da Reunião:</strong> <a href="${booking.meetingLink}">Entrar na Reunião</a></li>` : ''}
            </ul>
          </div>

          ${booking.meetingLink ? `
            <center>
              <a href="${booking.meetingLink}" class="button">Entrar na Reunião</a>
            </center>
          ` : ''}

          <p>Por favor, certifique-se de que está disponível na hora marcada.</p>
          
          <p>Obrigado pelo seu profissionalismo!</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Melhor Saúde. Todos os direitos reservados.</p>
          <p>Este é um email automático, por favor não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmailNotification({
    to: specialistEmail,
    subject: 'Nova Consulta Agendada - Melhor Saúde',
    html,
    type: 'booking-confirmation'
  });
}


/**
 * Generate welcome email HTML
 */
export function generateWelcomeEmail(userName: string, role: string): string {
  const isSpecialist = role === 'specialist';
  const isCompany = role === 'company_admin';

  let welcomeMessage = 'Bem-vindo à comunidade Melhor Saúde! Estamos aqui para apoiar o seu bem-estar físico, mental, financeiro e jurídico.';
  let actionText = 'Agendar Primeira Sessão';
  let actionLink = 'https://app.melhorsaude.com/user/dashboard'; // Adjust based on env

  if (isSpecialist) {
    welcomeMessage = 'Bem-vindo à equipa de especialistas da Melhor Saúde! Estamos entusiasmados por tê-lo connosco para ajudar a transformar vidas.';
    actionText = 'Completar Perfil Profissional';
    actionLink = 'https://app.melhorsaude.com/specialist/dashboard';
  } else if (isCompany) {
    welcomeMessage = 'Bem-vindo à Melhor Saúde para Empresas! A sua jornada para uma equipa mais saudável e feliz começa agora.';
    actionText = 'Adicionar Colaboradores';
    actionLink = 'https://app.melhorsaude.com/company/dashboard';
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00C7B1 0%, #00A693 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .button { display: inline-block; background: #00C7B1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .features { display: flex; justify-content: space-between; margin-top: 20px; }
        .feature { width: 48%; background: #F5F9F9; padding: 15px; border-radius: 8px; box-sizing: border-box; margin-bottom: 10px; }
        .feature-title { color: #00C7B1; font-weight: bold; margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>👋 Bem-vindo(a), ${userName}!</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${userName}</strong>,</p>
          <p>${welcomeMessage}</p>
          
          <p>Na Melhor Saúde, acreditamos numa abordagem 360º ao bem-estar. A sua conta dá-lhe acesso a:</p>
          
          <div style="margin: 20px 0;">
            <div style="background: #F0FDFA; padding: 10px 15px; border-left: 4px solid #00C7B1; margin-bottom: 10px;">
              <strong>🧠 Saúde Mental:</strong> Psicologia e bem-estar emocional.
            </div>
            <div style="background: #FFF7ED; padding: 10px 15px; border-left: 4px solid #F97316; margin-bottom: 10px;">
              <strong>💪 Bem-Estar Físico:</strong> Nutrição e exercício físico.
            </div>
            <div style="background: #ECFDF5; padding: 10px 15px; border-left: 4px solid #10B981; margin-bottom: 10px;">
              <strong>💰 Assistência Financeira:</strong> Gestão e planeamento financeiro.
            </div>
            <div style="background: #F5F3FF; padding: 10px 15px; border-left: 4px solid #8B5CF6; margin-bottom: 10px;">
              <strong>⚖️ Apoio Jurídico:</strong> Aconselhamento legal e social.
            </div>
          </div>

          <center>
            <a href="${actionLink}" class="button">${actionText}</a>
          </center>

          <p>Se tiver alguma dúvida, a nossa equipa de suporte está sempre disponível para ajudar.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Melhor Saúde. Todos os direitos reservados.</p>
          <p>Siga-nos nas redes sociais para dicas diárias de bem-estar!</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(
  userEmail: string,
  userName: string,
  role: string = 'user'
): Promise<{ success: boolean; error?: string }> {
  return sendEmailNotification({
    to: userEmail,
    subject: 'Bem-vindo à Melhor Saúde! 🌟',
    html: generateWelcomeEmail(userName, role),
    type: 'notification'
  });
}
