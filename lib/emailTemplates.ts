/**
 * Email Templates for Melhor Saúde
 *
 * HTML email templates for authentication and notifications
 */

const baseStyles = `
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #f5f5f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: #007AFF;
      color: white !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .button-secondary {
      background: #f5f5f7;
      color: #007AFF !important;
      border: 2px solid #007AFF;
    }
    .info-box {
      background: #f5f5f7;
      border-left: 4px solid #007AFF;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .info-box h3 {
      margin-top: 0;
      color: #007AFF;
      font-size: 18px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #666;
      font-weight: 500;
    }
    .detail-value {
      color: #1a1a1a;
      font-weight: 600;
    }
    .pillar-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin: 8px 0;
    }
    .pillar-psychological {
      background: #E8F4FF;
      color: #0066CC;
    }
    .pillar-financial {
      background: #E6F7ED;
      color: #00875A;
    }
    .pillar-physical {
      background: #FFF4E6;
      color: #FF8B00;
    }
    .pillar-legal {
      background: #F3E5FF;
      color: #6B3FA0;
    }
    .footer {
      background: #f5f5f7;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
    .quota-bar {
      background: #eee;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      margin: 10px 0;
    }
    .quota-fill {
      background: linear-gradient(90deg, #007AFF 0%, #0051D5 100%);
      height: 100%;
      transition: width 0.3s ease;
    }
  </style>
`;

interface EmailVerificationParams {
  userName: string;
  verificationUrl: string;
}

export function getEmailVerificationTemplate({
  userName,
  verificationUrl,
}: EmailVerificationParams): string {
  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verifique o seu email</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✉️ Confirme o seu Email</h1>
        </div>
        <div class="content">
          <p>Olá ${userName},</p>
          <p>Obrigado por se registar na Melhor Saúde! Para começar a usar a sua conta, precisamos que confirme o seu endereço de email.</p>
          <p style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verificar Email</a>
          </p>
          <p style="color: #666; font-size: 14px;">Se o botão não funcionar, copie e cole este link no seu navegador:</p>
          <p style="word-break: break-all; color: #007AFF; font-size: 12px;">${verificationUrl}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            <strong>Não solicitou este email?</strong><br>
            Se não criou uma conta na Melhor Saúde, pode ignorar este email com segurança.
          </p>
        </div>
        <div class="footer">
          <p><strong>Melhor Saúde</strong></p>
          <p>Plataforma de Bem-Estar Corporativo</p>
          <p>📧 suporte@melhorsaude.mz | 🌐 www.melhorsaude.mz</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

interface PasswordResetParams {
  userName: string;
  resetUrl: string;
}

export function getPasswordResetTemplate({
  userName,
  resetUrl,
}: PasswordResetParams): string {
  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Redefinir Palavra-passe</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 Redefinir Palavra-passe</h1>
        </div>
        <div class="content">
          <p>Olá ${userName},</p>
          <p>Recebemos um pedido para redefinir a palavra-passe da sua conta Melhor Saúde.</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Redefinir Palavra-passe</a>
          </p>
          <p style="color: #666; font-size: 14px;">Este link expira em 1 hora.</p>
          <p style="color: #666; font-size: 14px;">Se o botão não funcionar, copie e cole este link no seu navegador:</p>
          <p style="word-break: break-all; color: #007AFF; font-size: 12px;">${resetUrl}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            <strong>Não solicitou esta alteração?</strong><br>
            Se não pediu para redefinir a sua palavra-passe, ignore este email. A sua conta está segura.
          </p>
        </div>
        <div class="footer">
          <p><strong>Melhor Saúde</strong></p>
          <p>Plataforma de Bem-Estar Corporativo</p>
          <p>📧 suporte@melhorsaude.mz | 🌐 www.melhorsaude.mz</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

interface BookingConfirmationParams {
  userName: string;
  specialistName: string;
  pillar: 'psychological' | 'financial' | 'physical' | 'legal_social';
  date: string;
  time: string;
  duration: number;
  meetingLink?: string;
  meetingType: 'virtual' | 'in_person';
  location?: string;
}

const pillarNames = {
  psychological: 'Saúde Psicológica',
  financial: 'Saúde Financeira',
  physical: 'Saúde Física',
  legal_social: 'Saúde Jurídica e Social',
};

const pillarEmojis = {
  psychological: '🧠',
  financial: '💰',
  physical: '💪',
  legal_social: '⚖️',
};

export function getBookingConfirmationTemplate({
  userName,
  specialistName,
  pillar,
  date,
  time,
  duration,
  meetingLink,
  meetingType,
  location,
}: BookingConfirmationParams): string {
  const pillarClass = `pillar-${pillar.replace('_', '-')}`;
  const pillarName = pillarNames[pillar];
  const pillarEmoji = pillarEmojis[pillar];

  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Consulta Confirmada</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Consulta Confirmada!</h1>
        </div>
        <div class="content">
          <p>Olá ${userName},</p>
          <p>A sua consulta foi confirmada com sucesso. Estamos ansiosos para ajudá-lo no seu percurso de bem-estar!</p>
          
          <div class="info-box">
            <h3>📅 Detalhes da Consulta</h3>
            <div class="detail-row">
              <span class="detail-label">Especialista</span>
              <span class="detail-value">${specialistName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Área</span>
              <span class="detail-value">
                <span class="pillar-badge ${pillarClass}">${pillarEmoji} ${pillarName}</span>
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Data</span>
              <span class="detail-value">${date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Hora</span>
              <span class="detail-value">${time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Duração</span>
              <span class="detail-value">${duration} minutos</span>
            </div>
            ${meetingType === 'virtual' && meetingLink ? `
            <div class="detail-row">
              <span class="detail-label">Tipo</span>
              <span class="detail-value">💻 Virtual</span>
            </div>
            ` : ''}
            ${meetingType === 'in_person' && location ? `
            <div class="detail-row">
              <span class="detail-label">Local</span>
              <span class="detail-value">📍 ${location}</span>
            </div>
            ` : ''}
          </div>

          ${meetingLink ? `
          <p style="text-align: center;">
            <a href="${meetingLink}" class="button">Entrar na Reunião</a>
          </p>
          <p style="color: #666; font-size: 14px; text-align: center;">
            Guarde este link para aceder à consulta virtual
          </p>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <h3 style="color: #007AFF;">💡 Preparação para a Consulta</h3>
          <ul style="color: #666;">
            <li>Esteja num local tranquilo e privado</li>
            <li>Tenha papel e caneta para anotações</li>
            <li>Prepare as questões que gostaria de discutir</li>
            ${meetingType === 'virtual' ? '<li>Teste a sua câmara e microfone antes da hora</li>' : ''}
          </ul>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            <strong>Precisa cancelar ou reagendar?</strong><br>
            Aceda ao seu painel de controlo em <strong>Minhas Sessões</strong> para gerir as suas consultas diretamente.
          </p>
        </div>
        <div class="footer">
          <p><strong>Melhor Saúde</strong></p>
          <p>Plataforma de Bem-Estar Corporativo</p>
          <p>📧 suporte@melhorsaude.mz | 🌐 www.melhorsaude.mz</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

interface BookingReminderParams {
  userName: string;
  specialistName: string;
  pillar: 'psychological' | 'financial' | 'physical' | 'legal_social';
  date: string;
  time: string;
  meetingLink?: string;
  meetingType: 'virtual' | 'in_person';
  location?: string;
}

export function getBookingReminderTemplate({
  userName,
  specialistName,
  pillar,
  date,
  time,
  meetingLink,
  meetingType,
  location,
}: BookingReminderParams): string {
  const pillarClass = `pillar-${pillar.replace('_', '-')}`;
  const pillarName = pillarNames[pillar];
  const pillarEmoji = pillarEmojis[pillar];

  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lembrete de Consulta</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⏰ Lembrete: Consulta Amanhã</h1>
        </div>
        <div class="content">
          <p>Olá ${userName},</p>
          <p><strong>A sua consulta está agendada para amanhã!</strong></p>
          
          <div class="info-box">
            <h3>📅 Detalhes da Consulta</h3>
            <div class="detail-row">
              <span class="detail-label">Especialista</span>
              <span class="detail-value">${specialistName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Área</span>
              <span class="detail-value">
                <span class="pillar-badge ${pillarClass}">${pillarEmoji} ${pillarName}</span>
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Data</span>
              <span class="detail-value">${date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Hora</span>
              <span class="detail-value">${time}</span>
            </div>
            ${meetingType === 'virtual' ? `
            <div class="detail-row">
              <span class="detail-label">Tipo</span>
              <span class="detail-value">💻 Virtual</span>
            </div>
            ` : ''}
            ${meetingType === 'in_person' && location ? `
            <div class="detail-row">
              <span class="detail-label">Local</span>
              <span class="detail-value">📍 ${location}</span>
            </div>
            ` : ''}
          </div>

          ${meetingLink ? `
          <p style="text-align: center;">
            <a href="${meetingLink}" class="button">Entrar na Reunião</a>
          </p>
          ` : ''}

          <div style="background: #FFF4E6; border-left: 4px solid #FF8B00; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p style="margin: 0; color: #1a1a1a;">
              <strong>⚡ Dica:</strong> Chegue alguns minutos mais cedo para garantir que tudo está pronto!
            </p>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Estamos ansiosos para vê-lo amanhã!
          </p>
        </div>
        <div class="footer">
          <p><strong>Melhor Saúde</strong></p>
          <p>Plataforma de Bem-Estar Corporativo</p>
          <p>📧 suporte@melhorsaude.mz | 🌐 www.melhorsaude.mz</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

interface SessionCompletedParams {
  userName: string;
  specialistName: string;
  pillar: 'psychological' | 'financial' | 'physical' | 'legal_social';
  date: string;
  sessionsRemaining: number;
  totalSessions: number;
}

export function getSessionCompletedTemplate({
  userName,
  specialistName,
  pillar,
  date,
  sessionsRemaining,
  totalSessions,
}: SessionCompletedParams): string {
  const pillarName = pillarNames[pillar];
  const pillarEmoji = pillarEmojis[pillar];
  const quotaPercentage = (sessionsRemaining / totalSessions) * 100;

  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Consulta Concluída</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Consulta Concluída!</h1>
        </div>
        <div class="content">
          <p>Olá ${userName},</p>
          <p>A sua consulta de <strong>${pillarEmoji} ${pillarName}</strong> com <strong>${specialistName}</strong> foi concluída com sucesso.</p>
          
          <div class="info-box">
            <h3>📊 Resumo da Consulta</h3>
            <div class="detail-row">
              <span class="detail-label">Data</span>
              <span class="detail-value">${date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Especialista</span>
              <span class="detail-value">${specialistName}</span>
            </div>
          </div>

          <div style="background: #E8F4FF; border-left: 4px solid #007AFF; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #007AFF;">💳 Sessões Restantes</h3>
            <p style="font-size: 32px; font-weight: 700; color: #007AFF; margin: 10px 0;">
              ${sessionsRemaining} de ${totalSessions}
            </p>
            <div class="quota-bar">
              <div class="quota-fill" style="width: ${quotaPercentage}%"></div>
            </div>
            <p style="color: #666; font-size: 14px; margin-bottom: 0;">
              ${sessionsRemaining > 0 ? 'Continue o seu percurso de bem-estar!' : 'Considere adquirir mais sessões para continuar.'}
            </p>
          </div>

          ${sessionsRemaining > 0 ? `
          <p style="text-align: center;">
            <a href="https://melhorsaude.onhighmanagement.com/user/dashboard" class="button">Agendar Próxima Consulta</a>
          </p>
          ` : `
          <p style="text-align: center;">
            <a href="https://melhorsaude.onhighmanagement.com/user/dashboard" class="button">Ver Planos</a>
          </p>
          `}

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <h3 style="color: #007AFF;">💬 A sua opinião é importante!</h3>
          <p style="color: #666;">
            Ajude-nos a melhorar os nossos serviços partilhando a sua experiência com esta consulta.
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Obrigado por confiar na Melhor Saúde para o seu bem-estar!
          </p>
        </div>
        <div class="footer">
          <p><strong>Melhor Saúde</strong></p>
          <p>Plataforma de Bem-Estar Corporativo</p>
          <p>📧 suporte@melhorsaude.mz | 🌐 www.melhorsaude.mz</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

interface QuotaLowWarningParams {
  userName: string;
  sessionsRemaining: number;
  totalSessions: number;
}

export function getQuotaLowWarningTemplate({
  userName,
  sessionsRemaining,
  totalSessions,
}: QuotaLowWarningParams): string {
  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quota Baixa</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚠️ Quota de Sessões Baixa</h1>
        </div>
        <div class="content">
          <p>Olá ${userName},</p>
          <p>Queremos informá-lo que está a aproximar-se do limite das suas sessões mensais.</p>
          
          <div style="background: #FFF4E6; border-left: 4px solid #FF8B00; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #FF8B00;">📊 Quota Atual</h3>
            <p style="font-size: 32px; font-weight: 700; color: #FF8B00; margin: 10px 0;">
              ${sessionsRemaining} de ${totalSessions}
            </p>
            <div class="quota-bar">
              <div class="quota-fill" style="width: ${(sessionsRemaining / totalSessions) * 100}%; background: linear-gradient(90deg, #FF8B00 0%, #FF6B00 100%);"></div>
            </div>
            <p style="color: #666; font-size: 14px; margin-bottom: 0;">
              ${sessionsRemaining === 1 ? 'Resta apenas 1 sessão' : `Restam apenas ${sessionsRemaining} sessões`}
            </p>
          </div>

          <h3 style="color: #007AFF;">💡 O que pode fazer?</h3>
          <ul style="color: #666;">
            <li><strong>Continue o seu percurso:</strong> Use a sua última sessão com sabedoria</li>
            <li><strong>Adquira mais sessões:</strong> Mantenha o momentum do seu bem-estar</li>
            <li><strong>Fale com RH:</strong> Verifique se a sua empresa oferece sessões adicionais</li>
          </ul>

          <p style="text-align: center;">
            <a href="https://melhorsaude.onhighmanagement.com/user/dashboard" class="button">Ver Opções</a>
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Não deixe o seu bem-estar em segundo plano. Estamos aqui para apoiá-lo!
          </p>
        </div>
        <div class="footer">
          <p><strong>Melhor Saúde</strong></p>
          <p>Plataforma de Bem-Estar Corporativo</p>
          <p>📧 suporte@melhorsaude.mz | 🌐 www.melhorsaude.mz</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
