import React, { createContext, useContext, useState, ReactNode } from 'react';

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

    // Dashboard
    'dashboard.title': 'Painel',
    'dashboard.welcome': 'Bem-vindo',

    // Profile Page
    'profile.title': 'O Meu Perfil',
    'profile.section': 'Perfil',
    'profile.name': 'Nome',
    'profile.email': 'Email',
    'profile.phone': 'Telefone',
    'profile.save': 'Guardar Alterações',
    'profile.saveSuccess': 'Perfil atualizado com sucesso!',

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

    // Auth
    'auth.signOut': 'Terminar Sessão',
    'auth.signOutButton': 'Sair da Conta',

    // A Verdade Page
    'truth.title': 'A Verdade',
    'truth.subtitle': 'Descubra a História Completa',
    'truth.description': 'Dados em tempo real do bem-estar da sua equipa',
    'truth.insight': 'Entenda o silêncio da sua organização. Descubra o que a sua equipa está a sentir e quais os recursos que mais consomem. Use estes dados para agir antes que o cansaço se transforme em desistência.',
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
    'pillar.physical': 'Bem-Estar Físico',
    'pillar.financial': 'Assistência Financeira',
    'pillar.nutrition': 'Nutrição',
    'pillar.legal': 'Apoio Jurídico',

    // Short pillar names for CRM tables
    'pillar.mentalShort': 'Mental',
    'pillar.physicalShort': 'Físico',
    'pillar.financialShort': 'Financeiro',
    'pillar.legalShort': 'Jurídico',

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

    // Team Page (Relatorios/Colaboradores)
    'team.title': 'A Sua Equipa',
    'team.description': 'Códigos de acesso exclusivo. Distribua-os para desbloquear o apoio da',
    'team.toEachCollaborator': 'a cada colaborador.',
    'team.management': 'Gestão de Equipa',
    'team.managementDesc': 'Para dar acesso à equipa: gere os códigos, descarregue a lista e envie para eles. É a chave para entrarem na plataforma.',

    // Gestão de Empresas Page
    'companies.title': 'Gestão de Empresas',
    'companies.description': 'Criar contas, atribuir vagas e carregar sessões',
    'companies.headerTitle': 'Gere Empresas',
    'companies.management': 'Gestão de Empresas',
    'companies.managementDesc': 'Configure os limites iniciais (Vagas e Sessões) e gere o código de ativação. Envie este código ao responsável de RH para que ele faça o registo autónomo da empresa.',
    'companies.addCompany': 'Adicionar Empresa',
    'companies.addNewTitle': 'Adicionar Nova Empresa',
    'companies.addNewDesc': 'Preencha os detalhes para criar uma nova conta empresarial e gerar um código de acesso.',
    'companies.companyName': 'Nome da Empresa',
    'companies.companyNamePlaceholder': 'Ex: TechCorp Solutions',
    'companies.email': 'Email',
    'companies.emailPlaceholder': 'Ex: contato@empresa.com',
    'companies.seats': 'Número de Vagas',
    'companies.seatsPlaceholder': 'Ex: 50',
    'companies.sessions': 'Número de Sessões',
    'companies.sessionsPlaceholder': 'Ex: 200',
    'companies.cancel': 'Cancelar',
    'companies.generate': 'Gerar Código e Criar',
    'companies.registered': 'Empresas Registadas',
    'companies.tableCompanyName': 'Nome da Empresa',
    'companies.tableEmail': 'Email',
    'companies.tableCode': 'Código',
    'companies.tableSessionsLeft': 'Sessões',
    'companies.tableCreatedDate': 'Data de Criação',
    'companies.tableHumorState': 'Estado de Humor',
    'companies.positive': 'Positivo',
    'companies.negative': 'Negativo',
    'companies.tableActions': 'Ações',
    'companies.deactivate': 'Desativar',
    'companies.activate': 'Ativar',
    'companies.deactivateTitle': 'Desativar Conta?',
    'companies.deactivateDesc': 'Isto irá desativar a conta até que você a reative novamente.',
    'companies.confirmDeactivate': 'Desativar',
    'companies.reactivateTitle': 'Reativar Conta?',
    'companies.reactivateDesc': 'Isto irá reativar a conta e restaurar o acesso.',
    'companies.confirmReactivate': 'Reativar',

    // Rede de Especialistas Page
    'specialists.title': 'Rede de Especialistas',
    'specialists.description': 'Gerir a sua equipa de profissionais',
    'specialists.management': 'Rede de Especialistas',
    'specialists.managementDesc': 'Gere um código de acesso exclusivo. O especialista usará este código para criar o seu perfil e configurar a agenda.',
    'specialists.headerTitle': 'GESTÃO DE ESPECIALISTAS',
    'specialists.addSpecialist': 'Adicionar Especialista',
    'specialists.addNewTitle': 'Gerar Código de Especialista',
    'specialists.addNewDesc': 'Selecione o pilar de saúde e gere um código único.',
    'specialists.selectPillarDesc': 'Selecione o pilar de saúde para gerar um código único de acesso.',
    'specialists.tableName': 'Nome',
    'specialists.tableEmail': 'Email',
    'specialists.tablePhone': 'Telefone',
    'specialists.tablePillar': 'Pilar',
    'specialists.tableSessions': 'Sessões',
    'specialists.tableRating': 'Avaliação',
    'specialists.tableActions': 'Ações',
    'specialists.deleteTitle': 'Eliminar Especialista?',
    'specialists.deleteDesc': 'Esta ação irá remover o especialista da plataforma. Não poderá ser desfeita.',
    'specialists.confirmDelete': 'Eliminar',
    'specialists.cancel': 'Cancelar',
    'specialists.generate': 'Gerar Código',
    'specialists.pillar': 'Pilar',
    'specialists.selectPillar': 'Selecione um pilar...',
    'specialists.registered': 'Especialistas Registados',
    'specialists.pillarLegal': 'Jurídico',

    // Agenda Global Page
    'schedule.title': 'Agenda Global',
    'schedule.description': 'Ver sessões marcadas e horários de todos',
    'schedule.management': 'Agenda Global',
    'schedule.managementDesc': 'Visualize todas as sessões agendadas na plataforma, consulte disponibilidade de especialistas e gira conflitos de horários.',

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
    'chart.pillarDescription': 'Distribuição de sessões por área',
    'chart.sessions': 'sessões',
    'chart.weeklyActivity': 'Atividade Semanal',
    'chart.weeklyDescription': 'Sessões realizadas por dia',
  },
  en: {
    // Navigation
    'nav.back': 'Back',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',

    // Profile Page
    'profile.title': 'My Profile',
    'profile.section': 'Profile',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.save': 'Save Changes',
    'profile.saveSuccess': 'Profile updated successfully!',

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

    // Auth
    'auth.signOut': 'Sign Out',
    'auth.signOutButton': 'Sign Out',

    // A Verdade Page
    'truth.title': 'The Truth',
    'truth.subtitle': 'Discover the Full Story',
    'truth.description': 'Real-time data on your team\'s well-being',
    'truth.insight': 'Understand the silence of your organization. Discover what your team is feeling and which resources they consume most. Use this data to act before exhaustion turns into resignation.',
    'truth.emotionalEvolution': 'Emotional Evolution',
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
    'pillar.legal': 'Legal Support',

    // Short pillar names for CRM tables
    'pillar.mentalShort': 'Mental',
    'pillar.physicalShort': 'Físico',
    'pillar.financialShort': 'Financeiro',
    'pillar.legalShort': 'Jurídico',

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

    // Team Page (Relatorios/Colaboradores)
    'team.title': 'Your Team',
    'team.description': 'Exclusive access codes. Distribute them to unlock support from',
    'team.toEachCollaborator': 'for each collaborator.',
    'team.management': 'Team Management',
    'team.managementDesc': 'To give team access: manage codes, download the list and send to them. It\'s the key to entering the platform.',

    // Gestão de Empresas Page
    'companies.title': 'Company Management',
    'companies.description': 'Create accounts, assign slots, and load sessions',
    'companies.headerTitle': 'Manage Companies',
    'companies.management': 'Company Management',
    'companies.managementDesc': 'Configure initial limits (Slots and Sessions) and generate the activation code. Send this code to the HR manager so they can autonomously register the company.',
    'companies.addCompany': 'Add Company',
    'companies.addNewTitle': 'Add New Company',
    'companies.addNewDesc': 'Fill in the details to create a new company account and generate an access code.',
    'companies.companyName': 'Company Name',
    'companies.companyNamePlaceholder': 'Ex: TechCorp Solutions',
    'companies.email': 'Email',
    'companies.emailPlaceholder': 'Ex: contato@empresa.com',
    'companies.seats': 'Number of Slots',
    'companies.seatsPlaceholder': 'Ex: 50',
    'companies.sessions': 'Number of Sessions',
    'companies.sessionsPlaceholder': 'Ex: 200',
    'companies.cancel': 'Cancel',
    'companies.generate': 'Generate Code and Create',
    'companies.registered': 'Registered Companies',
    'companies.tableCompanyName': 'Company Name',
    'companies.tableEmail': 'Email',
    'companies.tableCode': 'Code',
    'companies.tableSessionsLeft': 'Sessions',
    'companies.tableCreatedDate': 'Creation Date',
    'companies.tableHumorState': 'Mood State',
    'companies.positive': 'Positive',
    'companies.negative': 'Negative',
    'companies.tableActions': 'Actions',
    'companies.deactivate': 'Deactivate',
    'companies.activate': 'Activate',
    'companies.deactivateTitle': 'Deactivate Account?',
    'companies.deactivateDesc': 'This will deactivate the account until you reactivate it again.',
    'companies.confirmDeactivate': 'Deactivate',
    'companies.reactivateTitle': 'Reactivate Account?',
    'companies.reactivateDesc': 'This will reactivate the account and restore access.',
    'companies.confirmReactivate': 'Reactivate',

    // Rede de Especialistas Page
    'specialists.title': 'Specialist Network',
    'specialists.description': 'Manage clinical staff, credentials, and invitations',
    'specialists.management': 'Specialist Network',
    'specialists.managementDesc': 'Generate an exclusive access code. The specialist will use this code to create their profile and configure their schedule.',
    'specialists.headerTitle': 'MANAGE SPECIALISTS',
    'specialists.addSpecialist': 'ADD SPECIALIST',
    'specialists.registered': 'Registered Specialists',
    'specialists.addNewTitle': 'Add New Specialist',
    'specialists.addNewDesc': 'Enter the specialist\'s details and select the pillar they will offer.',
    'specialists.specialistName': 'Specialist Name',
    'specialists.specialistNamePlaceholder': 'e.g. Dr. John Doe',
    'specialists.email': 'Email',
    'specialists.emailPlaceholder': 'specialist@example.com',
    'specialists.phone': 'Phone',
    'specialists.phonePlaceholder': '+1 123 456 7890',
    'specialists.pillar': 'Pillar',
    'specialists.selectPillar': 'Select a pillar...',
    'specialists.generate': 'Generate Code',
    'specialists.cancel': 'Cancel',
    'specialists.tableName': 'Name',
    'specialists.tableEmail': 'Email',
    'specialists.tablePhone': 'Phone',
    'specialists.tablePillar': 'Pillar',
    'specialists.tableSessions': 'Sessions',
    'specialists.tableRating': 'Rating',
    'specialists.tableActions': 'Actions',
    'specialists.deleteTitle': 'Delete Specialist?',
    'specialists.deleteDesc': 'This action will remove the specialist from the platform. It cannot be undone.',
    'specialists.confirmDelete': 'Delete',
    'specialists.pillarLegal': 'Legal',

    // Agenda Global Page
    'schedule.title': 'Global Schedule',
    'schedule.description': 'View scheduled sessions and everyone\'s schedules',
    'schedule.management': 'Global Schedule',
    'schedule.managementDesc': 'Visualize all scheduled sessions on the platform, check specialist availability, and resolve scheduling conflicts.',

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
    'chart.sessions': 'sessions',
    'chart.weeklyActivity': 'Weekly Activity',
    'chart.weeklyDescription': 'Sessions completed per day',
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