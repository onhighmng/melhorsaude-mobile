import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation
    'nav.back': 'Voltar',
    'nav.logout': 'Sair',

    // Dashboard
    'dashboard.title': 'Painel',
    'dashboard.welcome': 'Bem-vindo',
    'dashboard.footer': 'Apoiamos o Mental, Físico, Financeiro e Jurídico. Para que a pressão da vida não os faça quebrar por dentro.',

    // Dashboard Cards
    'card.team.title': 'A Sua Equipa',
    'card.team.subtitle': 'Dê a todos um futuro melhor hoje.',
    'card.sessions.title': 'Sessões',
    'card.sessions.subtitle': 'Garanta que ninguém fica para trás',
    'card.sessions.label': 'sessões',
    'card.truth.title': 'A Verdade',
    'card.truth.subtitle': 'Veja o que ninguém mais vê',
    'card.profile.title': 'O Meu Perfil',
    'card.profile.subtitle': 'Ajuste a sua liderança',

    // Dashboard Header
    'header.title': 'Liderar a Mudança',
    'header.welcome': 'Bem-vindo. Lembre-se:',
    'header.transform': 'Cuidar das pessoas transforma empresas.',
    'header.opportunity': 'Abra a porta a uma nova era de bem-estar, a oportunidade de transformar',
    'header.lives': 'vidas',

    // Profile Page
    'profile.title': 'O Meu Perfil',
    'profile.section': 'Perfil',
    'profile.name': 'Nome',
    'profile.email': 'Email',
    'profile.phone': 'Telefone',
    'profile.save': 'Guardar Alterações',
    'profile.saveSuccess': 'Perfil atualizado com sucesso!',

    // Auth
    'auth.signOut': 'Terminar Sessão',
    'auth.signOutButton': 'Sair da Conta',

    // Password
    'password.section': 'Alterar Palavra-Passe',
    'password.current': 'Palavra-Passe Atual',
    'password.new': 'Nova Palavra-Passe',
    'password.confirm': 'Confirmar Palavra-Passe',
    'password.change': 'Alterar Palavra-Passe',
    'password.mismatch': 'As palavras-passe não coincidem!',
    'password.tooShort': 'A palavra-passe deve ter pelo menos 6 caracteres!',
    'password.success': 'Palavra-passe alterada com sucesso!',

    // Language
    'language.section': 'Idioma',
    'language.portuguese': 'Português',
    'language.english': 'English',
    'language.selected': 'Idioma selecionado:',

    // A Verdade Page
    'truth.title': 'A Verdade',
    'truth.subtitle': 'Descubra a História Completa',
    'truth.description': 'Dados em tempo real do bem-estar da sua equipa',
    'chart.sessions': 'Sessões',
    'chart_sessions': 'Sessões',
    'chart_pillarUsage': 'Uso dos Pilares',
    'chart_last6Months': 'Últimos 6 Meses',
    'chart_score': 'Nota Média',
    'chart.noData': 'Nenhum dado disponível',
    'truth.insight': 'Entenda o silêncio da sua organização. Descubra o que a sua equipa está a sentir e quais os recursos que mais consomem. Use estes dados para agir antes que o cansaço se transforme em desistência.',
    'truth_moodEvolution': 'Evolução Emocional',
    'truth.emotionalEvolution': 'Evolução Emocional',
    'truth.emotionalDesc': 'Comparação semanal do estado emocional',
    'truth.pillarUsage': 'Uso dos Pilares',
    'truth.pillarDesc': 'Sessões realizadas por categoria',
    'truth.weeklyTrend': 'Tendência Semanal',
    'truth.weeklyDesc': 'Padrões de atividade ao longo do tempo',
    'truth.sessions': 'sessões',

    // Emotions
    'ejoy': 'Alegria',
    'eanxiety': 'Ansiedade',
    'esadness': 'Tristeza',
    'eanger': 'Raiva',
    'ecalm': 'Calma',

    // Pillars
    'pillar.mental': 'Saúde Mental',
    'pillar.physical': 'Saúde Física',
    'pillar.financial': 'Bem-Estar Financeiro',
    'pillar.nutrition': 'Nutrição',

    // Days
    'day.mon': 'Seg',
    'day.tue': 'Ter',
    'day.wed': 'Qua',
    'day.thu': 'Qui',
    'day.fri': 'Sex',
    'day.sat': 'Sáb',
    'day.sun': 'Dom',

    // Recursos Page
    'resources.title': 'Recursos',
    'resources.subtitle': 'Ferramentas para o Crescimento',
    'resources.description': 'Explore artigos, guias e materiais cuidadosamente selecionados para apoiar a sua jornada de bem-estar.',

    // Sessões Page
    'sessions.title': 'Sessões',
    'sessions.subtitle': 'Gerir as Suas Sessões',
    'sessions.description': 'Acompanhe o uso de sessões, veja quantas estão disponíveis e compre mais quando necessário.',
    'sessions.pageDescription': 'Monitorize o \'combustível\' de bem-estar da sua equipa. Garanta que o apoio nunca pára.',
    'sessions.headerTitle': 'Motor de Evolução',
    'sessions.available': 'Sessões Disponíveis',
    'sessions.buyPackage': 'Adquirir Pacote de Sessões',
    'sessions.stats.used': 'Usadas',
    'sessions.stats.available': 'Disponíveis',
    'sessions.stats.reserved': 'Reservadas',
    'sessions.cta.text': 'Não deixe a evolução parar. Reforce o saldo.',
    'sessions.cta.button': 'Adquirir Pacote',

    // Pacotes Page
    'packages.title': 'Expandir a Transformação',
    'packages.label': 'Pacotes',
    'packages.description': 'Aumente a sua capacidade de cuidar. Reforce as sessões ou traga mais pessoas para a nova era.',
    'packages.sessionPackage': 'Pacote de Sessões',
    'packages.collaboratorPackage': 'Pacote de Colaboradores',
    'packages.selectSessions': 'Selecione o número de sessões',
    'packages.selectCollaborators': 'Selecione o número de colaboradores',
    'packages.totalPrice': 'Preço Total',
    'packages.purchase': 'Adquirir',
    'packages.contact': 'Para mais de 3000 sessões, contacte-nos para uma solução personalizada.',
    'packages.guarantee': 'Garanta acesso contínuo aos especialistas nas 4 áreas vitais.',
    'packages.expand': 'Aumente a sua equipa e democratize o acesso ao bem-estar integral.',
    'packages.monthly': 'Mensal',
    'packages.yearly': 'Anual',
    'packages.buyNow': 'Comprar Agora',
    'packages.getStarted': 'Começar',
    'packages.mostPopular': 'Mais Popular',
    'packages.starter.name': 'Inicial',
    'packages.starter.description': 'Perfeito para indivíduos e pequenos projetos',
    'packages.starter.feature1.name': 'Análise Básica',
    'packages.starter.feature1.description': 'Acompanhe métricas essenciais e comportamento do usuário',
    'packages.starter.feature2.name': '5 Membros da Equipe',
    'packages.starter.feature2.description': 'Colabore com uma pequena equipe',
    'packages.starter.feature3.name': 'Suporte Básico',
    'packages.starter.feature3.description': 'Suporte por e-mail com resposta em 24h',
    'packages.starter.feature4.name': 'Acesso à API',
    'packages.starter.feature4.description': 'Acesso limitado à API para integrações básicas',
    'packages.pro.name': 'Pro',
    'packages.pro.description': 'Ideal para equipes e empresas em crescimento',
    'packages.pro.feature1.name': 'Análise Avançada',
    'packages.pro.feature1.description': 'Insights profundos e relatórios personalizados',
    'packages.pro.feature2.name': 'Membros Ilimitados',
    'packages.pro.feature2.description': 'Expanda sua equipe sem limites',
    'packages.pro.feature3.name': 'Suporte Prioritário',
    'packages.pro.feature3.description': 'Suporte 24/7 prioritário por e-mail e chat',
    'packages.pro.feature4.name': 'Acesso Completo à API',
    'packages.pro.feature4.description': 'Acesso completo à API com limites mais altos',

    // Team Page (Relatorios/Colaboradores)
    'team.title': 'A Sua Equipa',
    'team.description': 'Códigos de acesso exclusivo. Distribua-os para desbloquear o apoio da',
    'team.toEachCollaborator': 'a cada colaborador.',
    'team.management': 'Gestão de Equipa',
    'team.managementDesc': 'Para dar acesso à equipa: gere os códigos, descarregue a lista e envie para eles. É a chave para entrarem na plataforma.',

    // Reports
    'reports.title': 'Relatórios e Impacto',
    'reports.subtitle': 'Sua Equipe',
    'reports.description': 'Gerencie o acesso à plataforma e acompanhe a adesão dos seus colaboradores',
    'reports.activeCollaborators': 'Colaboradores Ativos',
    'reports.generatedCodes': 'Códigos Gerados',
    'reports.activatedCodes': 'Códigos Ativados',
    'reports.inviteManagement': 'Gestão de Convites',

    // Charts
    'chart.teamEmotionalState': 'Estado Emocional da Equipa',
    'chart.collaborators': 'colaboradores',
    'chart.current': 'Atual',
    'chart.previous': 'Anterior',
    'chart.veryHappy': 'Muito Feliz',
    'chart.happy': 'Feliz',
    'chart.neutral': 'Neutro',
    'chart.sad': 'Triste',
    'chart.frustrated': 'Frustrado',
    'chart.pillarUsage': 'Uso dos Pilares',
    'pillar_mental': 'Mental',
    'pillar_physical': 'Físico',
    'pillar_financial': 'Financeiro',
    'pillar_legal': 'Jurídico',
    'chart.pillarDescription': 'Distribuição de sessões por área',
    'chart.weeklyActivity': 'Atividade Semanal',
    'chart.weeklyDescription': 'Sessões realizadas por dia',

    // CodeGenerator
    'codes.generator.title': 'Gerador de Códigos',
    'codes.generator.subtitle': 'Gestão de Acessos',
    'codes.available': 'Disponíveis',
    'codes.used': 'Usados',
    'codes.generate': 'Gerar Novo Código',
    'codes.generating': 'Gerando...',
    'codes.generated': 'Gerado!',
    'codes.export': 'Exportar Lista',
    'codes.exported': 'Exportado!',
    'codes.refresh': 'Atualizar Lista',
    'codes.latest': 'Últimos Códigos Gerados',
    'codes.empty': 'Nenhum código gerado ainda',
    'codes.success.generate': 'Código gerado com sucesso!',
    'codes.success.export': 'Códigos exportados!',
    'codes.error.permission': 'Sem permissão para gerar códigos',
    'codes.error.generic': 'Erro ao gerar código',
  },
  en: {
    // Navigation
    'nav.back': 'Back',
    'nav.logout': 'Sign Out',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.footer': 'Supporting Mental, Physical, Financial, and Legal. So life\'s pressure doesn\'t break them from the inside.',

    // Dashboard Cards
    'card.team.title': 'Your Team',
    'card.team.subtitle': 'Give everyone a better future today.',
    'card.sessions.title': 'Sessions',
    'card.sessions.subtitle': 'Ensure no one is left behind',
    'card.sessions.label': 'sessions',
    'card.truth.title': 'The Truth',
    'card.truth.subtitle': 'See what no one else sees',
    'card.profile.title': 'My Profile',
    'card.profile.subtitle': 'Adjust your leadership',

    // Dashboard Header
    'header.title': 'Leading Change',
    'header.welcome': 'Welcome. Remember:',
    'header.transform': 'Caring for people transforms companies.',
    'header.opportunity': 'Open the door to a new era of wellness, the opportunity to transform',
    'header.lives': 'lives',

    // Profile Page
    'profile.title': 'My Profile',
    'profile.section': 'Profile',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.save': 'Save Changes',
    'profile.saveSuccess': 'Profile updated successfully!',

    // Auth
    'auth.signOut': 'Sign Out',
    'auth.signOutButton': 'Sign Out',

    // Password
    'password.section': 'Change Password',
    'password.current': 'Current Password',
    'password.new': 'New Password',
    'password.confirm': 'Confirm Password',
    'password.change': 'Change Password',
    'password.mismatch': 'Passwords do not match!',
    'password.tooShort': 'Password must be at least 6 characters!',
    'password.success': 'Password changed successfully!',

    // Language
    'language.section': 'Language',
    'language.portuguese': 'Português',
    'language.english': 'English',
    'language.selected': 'Selected language:',

    // A Verdade Page
    'truth.title': 'The Truth',
    'truth.subtitle': 'Discover the Full Story',
    'truth.description': 'Real-time data on your team\'s well-being',
    'truth.insight': 'Understand the silence of your organization. Discover what your team is feeling and which resources they consume most. Use this data to act before exhaustion turns into resignation.',
    'truth.emotionalEvolution': 'Emotional Evolution',
    'truth_moodEvolution': 'Mood Evolution',
    'truth.emotionalDesc': 'Weekly comparison of emotional state',
    'truth.pillarUsage': 'Pillar Usage',
    'truth.pillarDesc': 'Sessions completed by category',
    'truth.weeklyTrend': 'Weekly Trend',
    'truth.weeklyDesc': 'Activity patterns over time',
    'truth.sessions': 'sessions',

    // Emotions
    'ejoy': 'Joy',
    'eanxiety': 'Anxiety',
    'esadness': 'Sadness',
    'eanger': 'Anger',
    'ecalm': 'Calm',

    // Pillars
    'pillar.mental': 'Mental Health',
    'pillar.physical': 'Physical Health',
    'pillar.financial': 'Financial Wellness',
    'pillar.nutrition': 'Nutrition',

    // Charts
    'chart_sessions': 'Sessions',
    'chart_pillarUsage': 'Pillar Usage',
    'chart_last6Months': 'Last 6 Months',
    'chart_score': 'Average Score',
    'chart.noData': 'No data available',

    // Days
    'day.mon': 'Mon',
    'day.tue': 'Tue',
    'day.wed': 'Wed',
    'day.thu': 'Thu',
    'day.fri': 'Fri',
    'day.sat': 'Sat',
    'day.sun': 'Sun',

    // Recursos Page
    'resources.title': 'Resources',
    'resources.subtitle': 'Tools for Growth',
    'resources.description': 'Explore carefully curated articles, guides, and materials to support your wellness journey.',

    // Sessões Page
    'sessions.title': 'Sessions',
    'sessions.subtitle': 'Manage Your Sessions',
    'sessions.description': 'Track session usage, see how many are available, and purchase more when needed.',
    'sessions.pageDescription': 'Monitor your team\'s wellness \'fuel\'. Ensure support never stops.',
    'sessions.headerTitle': 'Evolution Engine',
    'sessions.available': 'Available Sessions',
    'sessions.buyPackage': 'Purchase Session Package',
    'sessions.stats.used': 'Used',
    'sessions.stats.available': 'Available',
    'sessions.stats.reserved': 'Reserved',
    'sessions.cta.text': 'Don\'t let evolution stop. Boost your balance.',
    'sessions.cta.button': 'Purchase Package',

    // Pacotes Page
    'packages.title': 'Expand the Transformation',
    'packages.label': 'Packages',
    'packages.description': 'Increase your capacity to care. Reinforce sessions or bring more people into the new era.',
    'packages.sessionPackage': 'Session Package',
    'packages.collaboratorPackage': 'Collaborator Package',
    'packages.selectSessions': 'Select number of sessions',
    'packages.selectCollaborators': 'Select number of collaborators',
    'packages.totalPrice': 'Total Price',
    'packages.purchase': 'Purchase',
    'packages.contact': 'For more than 3000 sessions, contact us for a customized solution.',
    'packages.guarantee': 'Guarantee continuous access to specialists in all 4 vital areas.',
    'packages.expand': 'Grow your team and democratize access to comprehensive wellness.',
    'packages.monthly': 'Monthly',
    'packages.yearly': 'Yearly',
    'packages.buyNow': 'Buy Now',
    'packages.getStarted': 'Get Started',
    'packages.mostPopular': 'Most Popular',
    'packages.starter.name': 'Starter',
    'packages.starter.description': 'Perfect for individuals and small projects',
    'packages.starter.feature1.name': 'Basic Analysis',
    'packages.starter.feature1.description': 'Track essential metrics and user behavior',
    'packages.starter.feature2.name': '5 Team Members',
    'packages.starter.feature2.description': 'Collaborate with a small team',
    'packages.starter.feature3.name': 'Basic Support',
    'packages.starter.feature3.description': 'Email support with a 24h response time',
    'packages.starter.feature4.name': 'API Access',
    'packages.starter.feature4.description': 'Limited API access for basic integrations',
    'packages.pro.name': 'Pro',
    'packages.pro.description': 'Ideal for growing teams and companies',
    'packages.pro.feature1.name': 'Advanced Analysis',
    'packages.pro.feature1.description': 'Deep insights and customized reports',
    'packages.pro.feature2.name': 'Unlimited Members',
    'packages.pro.feature2.description': 'Expand your team without limits',
    'packages.pro.feature3.name': 'Priority Support',
    'packages.pro.feature3.description': '24/7 priority support via email and chat',
    'packages.pro.feature4.name': 'Full API Access',
    'packages.pro.feature4.description': 'Full API access with higher limits',

    // Team Page (Relatorios/Colaboradores)
    'team.title': 'Your Team',
    'team.description': 'Exclusive access codes. Distribute them to unlock support from',
    'team.toEachCollaborator': 'for each collaborator.',
    'team.management': 'Team Management',
    'team.managementDesc': 'To give team access: manage codes, download the list and send to them. It\'s the key to entering the platform.',

    // Reports
    'reports.title': 'Reports & Impact',
    'reports.subtitle': 'Your Team',
    'reports.description': 'Manage platform access and track your employees\' adoption',
    'reports.activeCollaborators': 'Active Collaborators',
    'reports.generatedCodes': 'Generated Codes',
    'reports.activatedCodes': 'Activated Codes',
    'reports.inviteManagement': 'Invite Management',

    // Charts
    'chart.teamEmotionalState': 'Team Emotional State',
    'chart.collaborators': 'collaborators',
    'chart.current': 'Current',
    'chart.previous': 'Previous',
    'chart.veryHappy': 'Very Happy',
    'chart.happy': 'Happy',
    'chart.neutral': 'Neutral',
    'chart.sad': 'Sad',
    'chart.frustrated': 'Frustrated',
    'chart.pillarUsage': 'Pillar Usage',
    'chart.pillarDescription': 'Session distribution by area',
    'chart.weeklyActivity': 'Weekly Activity',
    'chart.weeklyDescription': 'Sessions completed per day',

    // CodeGenerator
    'codes.generator.title': 'Code Generator',
    'codes.generator.subtitle': 'Access Management',
    'codes.available': 'Available',
    'codes.used': 'Used',
    'codes.generate': 'Generate New Code',
    'codes.generating': 'Generating...',
    'codes.generated': 'Generated!',
    'codes.export': 'Export List',
    'codes.exported': 'Exported!',
    'codes.refresh': 'Refresh List',
    'codes.latest': 'Latest Generated Codes',
    'codes.empty': 'No codes generated yet',
    'codes.success.generate': 'Code generated successfully!',
    'codes.success.export': 'Codes exported!',
    'codes.error.permission': 'No permission to generate codes',
    'codes.error.generic': 'Error generating code',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
