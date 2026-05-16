import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    pt: {
        // Navigation
        'nav.bemEstar': 'Bem-Estar',
        'nav.assistente': 'Assistente Virtual',
        'nav.meuEspaco': 'Meu Espaço',
        'nav.perfil': 'Perfil',
        'nav.logout': 'Sair',
        'nav.recursos': 'Recursos',

        // Perfil Page
        'perfil.title': 'Meu Perfil',
        'perfil.quota': 'Quota de Sessões',
        'perfil.quota.annual': 'Plano anual',
        'perfil.quota.total': 'Total',
        'perfil.quota.used': 'Utilizadas',
        'perfil.quota.available': 'Disponíveis',
        'perfil.personalData': 'Dados Pessoais',
        'perfil.edit': 'Editar',
        'perfil.name': 'Nome',
        'perfil.email': 'Email',
        'perfil.phone': 'Telefone',
        'perfil.save': 'Guardar',
        'perfil.cancel': 'Cancelar',
        'perfil.security': 'Segurança',
        'perfil.changePassword': 'Alterar palavra-passe',
        'perfil.currentPassword': 'Palavra-passe atual',
        'perfil.newPassword': 'Nova palavra-passe',
        'perfil.confirmPassword': 'Confirmar palavra-passe',
        'perfil.language': 'Idioma',
        'perfil.portuguese': 'Português',
        'perfil.english': 'English',
        'perfil.profileUpdated': 'Perfil atualizado com sucesso!',
        'perfil.passwordChanged': 'Palavra-passe alterada com sucesso!',
        'perfil.languageChanged': 'Idioma alterado para Português',
        'perfil.errorSave': 'Erro ao guardar perfil.',
        'perfil.errorChangePassword': 'Erro ao alterar palavra-passe.',
        'perfil.passwordMismatch': 'As palavras-passe não coincidem.',
        'perfil.passwordTooShort': 'A palavra-passe deve ter pelo menos 6 caracteres.',
        'perfil.languageCurrently': 'Idioma atual:',

        // Packages
        'packages.label': 'Pacotes',
        'packages.title': 'Escolha o seu plano',
        'packages.description': 'Selecione o pacote que melhor se adapta às necessidades da sua empresa.',

        // Bem-Estar Page
        'bemEstar.title': 'Bem-Estar',
        'bemEstar.greeting': 'Olá, João!👋',
        'bemEstar.greeting.morning': 'Bom dia',
        'bemEstar.greeting.afternoon': 'Boa tarde',
        'bemEstar.greeting.evening': 'Boa noite',
        'bemEstar.subtitle': 'Como estás a sentir-te hoje?',
        'bemEstar.selectMood': 'Como estás a sentir-te hoje?',
        'bemEstar.mental': 'Saúde Mental',
        'bemEstar.mentalSub': 'Psicológico',
        'bemEstar.physical': 'Bem-estar Físico',
        'bemEstar.physicalSub': 'Bem-estar',
        'bemEstar.financial': 'Assistência Financeira',
        'bemEstar.financialSub': 'Finanças',
        'bemEstar.legal': 'Assistência Jurídica',
        'bemEstar.legalSub': 'Jurídico',
        'bemEstar.schedule': 'Agendar Sessão',
        'bemEstar.scheduleSession': 'Agendar Sessão',
        'bemEstar.scheduleButton': 'Agendar',
        'bemEstar.tagline': 'Cuidar das pessoas, transforma empresas',

        // Assistente Virtual
        'assistant.title': 'Assistente Virtual',
        'assistant.placeholder': 'Como posso ajudar-te hoje?',
        'assistant.send': 'Enviar',
        'assistant.greeting': 'Olá! Como posso ajudar hoje?',
        'assistant.subtitle': 'um espaço seguro, privado e 100% confidencial',
        'assistant.prompt1': 'Não consigo desligar a cabeça',
        'assistant.prompt2': 'Sinto o corpo todo preso',
        'assistant.prompt3': 'Quero organizar-me financeiramente',
        'assistant.prompt4': 'Sinto-me injustiçado no trabalho',
        'assistant.response': 'Obrigado por partilhares isso comigo. Como te posso ajudar?',

        // Meu Espaço
        'meuEspaco.title': 'Meu Espaço',
        'meuEspaco.greeting': 'Olá, João!👋',
        'meuEspaco.upcomingSessions': 'Próximas Sessões',
        'meuEspaco.sessionHistory': 'Histórico de Sessões',
        'meuEspaco.noSessions': 'Nenhuma sessão agendada',
        'meuEspaco.rebook': 'Reagendar',
        'meuEspaco.completed': 'Concluída',
        'meuEspaco.scheduled': 'Agendada',
        'meuEspaco.date': 'Data',
        'meuEspaco.time': 'Hora',
        'meuEspaco.type': 'Tipo',
        'meuEspaco.status': 'Estado',
        'meuEspaco.resources': 'Recursos',
        'meuEspaco.enter': 'Entrar',
        'meuEspaco.emotionDiary': 'Diário de Emoções',
        'meuEspaco.rateSessions': 'Avaliar Sessões',

        // Recursos
        'recursos.title': 'Recursos',
        'recursos.searchPlaceholder': 'Pesquisar recursos...',

        // Mood Selection
        'mood.veryBad': 'Muito Mal',
        'mood.bad': 'Mal',
        'mood.okay': 'Ok',
        'mood.good': 'Bem',
        'mood.veryGood': 'Muito Bem',

        // Session Types
        'session.video': 'Vídeo',
        'session.phone': 'Telefone',
        'session.inPerson': 'Presencial',

        // Common
        'common.next': 'Próximo',
        'common.back': 'Voltar',
        'common.confirm': 'Confirmar',
        'common.cancel': 'Cancelar',
        'common.save': 'Guardar',
        'common.edit': 'Editar',
        'common.delete': 'Eliminar',
        'common.close': 'Fechar',

        // Admin Navigation
        'admin.nav.dashboard': 'Dashboard',
        'admin.nav.collaborators': 'Colaboradores',
        'admin.nav.resources': 'Recursos',
        'admin.nav.reports': 'Relatórios',
        'admin.nav.sessions': 'Sessões',
        'admin.nav.logout': 'Sair',

        // Admin Global Agenda
        'admin.globalAgenda.back': 'Voltar',
        'admin.globalAgenda.title': 'Agenda Global',
        'admin.globalAgenda.subtitle': 'Todas as sessões agendadas',
        'admin.globalAgenda.filters': 'Filtros',
        'admin.globalAgenda.company': 'Empresa',
        'admin.globalAgenda.allCompanies': 'Todas as empresas',
        'admin.globalAgenda.specialist': 'Especialista',
        'admin.globalAgenda.allSpecialists': 'Todos os especialistas',
        'admin.globalAgenda.clearFilters': 'Limpar filtros',
        'admin.globalAgenda.details': 'Detalhes',
        'admin.globalAgenda.status.confirmed': 'Confirmada',
        'admin.globalAgenda.status.completed': 'Concluída',
        'admin.globalAgenda.status.cancelled': 'Cancelada',
        'admin.globalAgenda.errorCancel': 'Erro ao cancelar sessão',

        // Admin Companies
        'admin.companies.title': 'Gestão de Empresas',
        'admin.companies.description': 'Gerencie as empresas parceiras e os seus acessos',
        'admin.companies.headerTitle': 'Empresas',
        'admin.companies.managementDesc': 'Gerencie as empresas e os seus colaboradores',
        'admin.companies.addCompany': 'Adicionar Empresa',
        'admin.companies.addNewTitle': 'Nova Empresa',
        'admin.companies.addNewDesc': 'Crie um convite para uma nova empresa',
        'admin.companies.seats': 'Nº de Lugares',
        'admin.companies.seatsPlaceholder': 'Ex: 50',
        'admin.companies.sessions': 'Sessões Totais',
        'admin.companies.sessionsPlaceholder': 'Ex: 200',
        'admin.companies.cancel': 'Cancelar',
        'admin.companies.generate': 'Gerar Convite',
        'admin.companies.status': 'Estado',
        'admin.companies.tableCode': 'Código',
        'admin.companies.tableEmail': 'Email',
        'admin.companies.tableCompanyName': 'Empresa',
        'admin.companies.tableSessionsLeft': 'Sessões Restantes',
        'admin.companies.tableCreatedDate': 'Data de Criação',
        'admin.companies.tableHumorState': 'Humor',
        'admin.companies.tableActions': 'Ações',
        'admin.companies.registered': 'Registada',
        'admin.companies.invitesTitle': 'Convites Pendentes',
        'admin.companies.deactivateTitle': 'Desativar Empresa',
        'admin.companies.reactivateTitle': 'Reativar Empresa',
        'admin.companies.deactivateDesc': 'Tem a certeza que deseja desativar esta empresa?',
        'admin.companies.reactivateDesc': 'Tem a certeza que deseja reativar esta empresa?',
        'admin.companies.confirmDeactivate': 'Desativar',
        'admin.companies.confirmReactivate': 'Reativar',
        'admin.companies.alert.createInstruction': 'Partilhe este código com a empresa para que se possam registar.',
        'admin.companies.alert.sendingEmail': 'A enviar email...',
        'admin.companies.alert.emailSent': 'Email enviado com sucesso!',
        'admin.companies.alert.emailError': 'Erro ao enviar email.',
        'admin.companies.alert.inviteError': 'Erro ao criar convite.',
        'admin.companies.alert.inviteSuccess': 'Convite criado com sucesso!',
        'admin.companies.alert.updateError': 'Erro ao atualizar empresa.',

        // Admin Specialists
        'admin.specialists.headerTitle': 'Rede de Especialistas',
        'admin.specialists.managementDesc': 'Gerencie os especialistas da plataforma',
        'admin.specialists.addSpecialist': 'Adicionar Especialista',
        'admin.specialists.invitesTitle': 'Convites Pendentes',
        'admin.specialists.code': 'Código',
        'admin.specialists.pillar': 'Pilar',
        'admin.specialists.status': 'Estado',
        'admin.specialists.registered': 'Registado',
        'admin.specialists.tableName': 'Nome',
        'admin.specialists.tableEmail': 'Email',
        'admin.specialists.tablePillar': 'Pilar',
        'admin.specialists.tableSessions': 'Sessões',
        'admin.specialists.tableRating': 'Avaliação',
        'admin.specialists.tableActions': 'Ações',
        'admin.specialists.addNewTitle': 'Novo Especialista',
        'admin.specialists.cancel': 'Cancelar',
        'admin.specialists.copy': 'Copiar',
        'admin.specialists.deleteTitle': 'Eliminar Especialista',
        'admin.specialists.deleteDesc': 'Tem a certeza que deseja eliminar este especialista?',
        'admin.specialists.confirmDelete': 'Eliminar',
        'admin.specialists.alert.inviteError': 'Erro ao criar convite para especialista.',
        'admin.specialists.alert.deleteError': 'Erro ao eliminar especialista.',

        // Admin Resources
        'admin.resources.title': 'Recursos',
        'admin.resources.subtitle': 'Gerencie os recursos disponíveis para os colaboradores',
        'admin.resources.addNew': 'Adicionar Recurso',
        'admin.resources.format': 'Formato',
        'admin.resources.pillar': 'Pilar',
        'admin.resources.selectPillar': 'Selecionar pilar',
        'admin.resources.resourceTitle': 'Título',
        'admin.resources.placeholder': 'Título do recurso',
        'admin.resources.file': 'Ficheiro',
        'admin.resources.publish': 'Publicar',
        'admin.resources.published': 'Publicado',
        'admin.resources.fillAllFields': 'Por favor preencha todos os campos.',
        'admin.resources.success_add': 'Recurso adicionado com sucesso!',
        'admin.resources.success_delete': 'Recurso eliminado com sucesso!',
        'admin.resources.confirmDeleteTitle': 'Eliminar Recurso',
        'admin.resources.confirmDeleteDesc': 'Tem a certeza que deseja eliminar este recurso?',
        'admin.resources.delete': 'Eliminar',
    },
    en: {
        // Navigation
        'nav.bemEstar': 'Wellness',
        'nav.assistente': 'Virtual Assistant',
        'nav.meuEspaco': 'My Space',
        'nav.perfil': 'Profile',
        'nav.logout': 'Logout',
        'nav.recursos': 'Resources',

        // Perfil Page
        'perfil.title': 'My Profile',
        'perfil.quota': 'Session Quota',
        'perfil.quota.annual': 'Annual plan',
        'perfil.quota.total': 'Total',
        'perfil.quota.used': 'Used',
        'perfil.quota.available': 'Available',
        'perfil.personalData': 'Personal Data',
        'perfil.edit': 'Edit',
        'perfil.name': 'Name',
        'perfil.email': 'Email',
        'perfil.phone': 'Phone',
        'perfil.save': 'Save',
        'perfil.cancel': 'Cancel',
        'perfil.security': 'Security',
        'perfil.changePassword': 'Change password',
        'perfil.currentPassword': 'Current password',
        'perfil.newPassword': 'New password',
        'perfil.confirmPassword': 'Confirm password',
        'perfil.language': 'Language',
        'perfil.portuguese': 'Português',
        'perfil.english': 'English',
        'perfil.profileUpdated': 'Profile updated successfully!',
        'perfil.passwordChanged': 'Password changed successfully!',
        'perfil.languageChanged': 'Language changed to English',
        'perfil.errorSave': 'Error saving profile.',
        'perfil.errorChangePassword': 'Error changing password.',
        'perfil.passwordMismatch': 'Passwords do not match.',
        'perfil.passwordTooShort': 'Password must be at least 6 characters.',
        'perfil.languageCurrently': 'Current language:',

        // Packages
        'packages.label': 'Packages',
        'packages.title': 'Choose your plan',
        'packages.description': 'Select the package that best suits your company needs.',

        // Bem-Estar Page
        'bemEstar.title': 'Wellness',
        'bemEstar.greeting': 'Hello, João!👋',
        'bemEstar.greeting.morning': 'Good morning',
        'bemEstar.greeting.afternoon': 'Good afternoon',
        'bemEstar.greeting.evening': 'Good evening',
        'bemEstar.subtitle': 'How are you feeling today?',
        'bemEstar.selectMood': 'How are you feeling today?',
        'bemEstar.mental': 'Mental Health',
        'bemEstar.mentalSub': 'Psychological',
        'bemEstar.physical': 'Physical Wellness',
        'bemEstar.physicalSub': 'Wellness',
        'bemEstar.financial': 'Financial Assistance',
        'bemEstar.financialSub': 'Finance',
        'bemEstar.legal': 'Legal Assistance',
        'bemEstar.legalSub': 'Legal',
        'bemEstar.schedule': 'Schedule Session',
        'bemEstar.scheduleSession': 'Schedule Session',
        'bemEstar.scheduleButton': 'Schedule',
        'bemEstar.tagline': 'Caring for people transforms companies',

        // Assistente Virtual
        'assistant.title': 'Virtual Assistant',
        'assistant.placeholder': 'How can I help you today?',
        'assistant.send': 'Send',
        'assistant.greeting': 'Hello! How can I help you today?',
        'assistant.subtitle': 'a safe, private and 100% confidential space',
        'assistant.prompt1': 'I can\'t turn my mind off',
        'assistant.prompt2': 'I feel my whole body is tense',
        'assistant.prompt3': 'I want to organize myself financially',
        'assistant.prompt4': 'I feel wronged at work',
        'assistant.response': 'Thank you for sharing that with me. How can I help you?',

        // Meu Espaço
        'meuEspaco.title': 'My Space',
        'meuEspaco.greeting': 'Hello, João!👋',
        'meuEspaco.upcomingSessions': 'Upcoming Sessions',
        'meuEspaco.sessionHistory': 'Session History',
        'meuEspaco.noSessions': 'No sessions scheduled',
        'meuEspaco.rebook': 'Reschedule',
        'meuEspaco.completed': 'Completed',
        'meuEspaco.scheduled': 'Scheduled',
        'meuEspaco.date': 'Date',
        'meuEspaco.time': 'Time',
        'meuEspaco.type': 'Type',
        'meuEspaco.status': 'Status',
        'meuEspaco.resources': 'Resources',
        'meuEspaco.enter': 'Enter',
        'meuEspaco.emotionDiary': 'Emotion Diary',
        'meuEspaco.rateSessions': 'Rate Sessions',

        // Recursos
        'recursos.title': 'Resources',
        'recursos.searchPlaceholder': 'Search resources...',

        // Mood Selection
        'mood.veryBad': 'Very Bad',
        'mood.bad': 'Bad',
        'mood.okay': 'Okay',
        'mood.good': 'Good',
        'mood.veryGood': 'Very Good',

        // Session Types
        'session.video': 'Video',
        'session.phone': 'Phone',
        'session.inPerson': 'In Person',

        // Common
        'common.next': 'Next',
        'common.back': 'Back',
        'common.confirm': 'Confirm',
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.close': 'Close',

        // Admin Navigation
        'admin.nav.dashboard': 'Dashboard',
        'admin.nav.collaborators': 'Collaborators',
        'admin.nav.resources': 'Resources',
        'admin.nav.reports': 'Reports',
        'admin.nav.sessions': 'Sessions',
        'admin.nav.logout': 'Logout',

        // Admin Global Agenda
        'admin.globalAgenda.back': 'Back',
        'admin.globalAgenda.title': 'Global Agenda',
        'admin.globalAgenda.subtitle': 'All scheduled sessions',
        'admin.globalAgenda.filters': 'Filters',
        'admin.globalAgenda.company': 'Company',
        'admin.globalAgenda.allCompanies': 'All companies',
        'admin.globalAgenda.specialist': 'Specialist',
        'admin.globalAgenda.allSpecialists': 'All specialists',
        'admin.globalAgenda.clearFilters': 'Clear filters',
        'admin.globalAgenda.details': 'Details',
        'admin.globalAgenda.status.confirmed': 'Confirmed',
        'admin.globalAgenda.status.completed': 'Completed',
        'admin.globalAgenda.status.cancelled': 'Cancelled',
        'admin.globalAgenda.errorCancel': 'Error cancelling session',

        // Admin Companies
        'admin.companies.title': 'Company Management',
        'admin.companies.description': 'Manage partner companies and their access',
        'admin.companies.headerTitle': 'Companies',
        'admin.companies.managementDesc': 'Manage companies and their employees',
        'admin.companies.addCompany': 'Add Company',
        'admin.companies.addNewTitle': 'New Company',
        'admin.companies.addNewDesc': 'Create an invite for a new company',
        'admin.companies.seats': 'Number of Seats',
        'admin.companies.seatsPlaceholder': 'e.g. 50',
        'admin.companies.sessions': 'Total Sessions',
        'admin.companies.sessionsPlaceholder': 'e.g. 200',
        'admin.companies.cancel': 'Cancel',
        'admin.companies.generate': 'Generate Invite',
        'admin.companies.status': 'Status',
        'admin.companies.tableCode': 'Code',
        'admin.companies.tableEmail': 'Email',
        'admin.companies.tableCompanyName': 'Company',
        'admin.companies.tableSessionsLeft': 'Sessions Left',
        'admin.companies.tableCreatedDate': 'Created Date',
        'admin.companies.tableHumorState': 'Mood',
        'admin.companies.tableActions': 'Actions',
        'admin.companies.registered': 'Registered',
        'admin.companies.invitesTitle': 'Pending Invites',
        'admin.companies.deactivateTitle': 'Deactivate Company',
        'admin.companies.reactivateTitle': 'Reactivate Company',
        'admin.companies.deactivateDesc': 'Are you sure you want to deactivate this company?',
        'admin.companies.reactivateDesc': 'Are you sure you want to reactivate this company?',
        'admin.companies.confirmDeactivate': 'Deactivate',
        'admin.companies.confirmReactivate': 'Reactivate',
        'admin.companies.alert.createInstruction': 'Share this code with the company so they can register.',
        'admin.companies.alert.sendingEmail': 'Sending email...',
        'admin.companies.alert.emailSent': 'Email sent successfully!',
        'admin.companies.alert.emailError': 'Error sending email.',
        'admin.companies.alert.inviteError': 'Error creating invite.',
        'admin.companies.alert.inviteSuccess': 'Invite created successfully!',
        'admin.companies.alert.updateError': 'Error updating company.',

        // Admin Specialists
        'admin.specialists.headerTitle': 'Specialist Network',
        'admin.specialists.managementDesc': 'Manage platform specialists',
        'admin.specialists.addSpecialist': 'Add Specialist',
        'admin.specialists.invitesTitle': 'Pending Invites',
        'admin.specialists.code': 'Code',
        'admin.specialists.pillar': 'Pillar',
        'admin.specialists.status': 'Status',
        'admin.specialists.registered': 'Registered',
        'admin.specialists.tableName': 'Name',
        'admin.specialists.tableEmail': 'Email',
        'admin.specialists.tablePillar': 'Pillar',
        'admin.specialists.tableSessions': 'Sessions',
        'admin.specialists.tableRating': 'Rating',
        'admin.specialists.tableActions': 'Actions',
        'admin.specialists.addNewTitle': 'New Specialist',
        'admin.specialists.cancel': 'Cancel',
        'admin.specialists.copy': 'Copy',
        'admin.specialists.deleteTitle': 'Delete Specialist',
        'admin.specialists.deleteDesc': 'Are you sure you want to delete this specialist?',
        'admin.specialists.confirmDelete': 'Delete',
        'admin.specialists.alert.inviteError': 'Error creating specialist invite.',
        'admin.specialists.alert.deleteError': 'Error deleting specialist.',

        // Admin Resources
        'admin.resources.title': 'Resources',
        'admin.resources.subtitle': 'Manage resources available to employees',
        'admin.resources.addNew': 'Add Resource',
        'admin.resources.format': 'Format',
        'admin.resources.pillar': 'Pillar',
        'admin.resources.selectPillar': 'Select pillar',
        'admin.resources.resourceTitle': 'Title',
        'admin.resources.placeholder': 'Resource title',
        'admin.resources.file': 'File',
        'admin.resources.publish': 'Publish',
        'admin.resources.published': 'Published',
        'admin.resources.fillAllFields': 'Please fill in all fields.',
        'admin.resources.success_add': 'Resource added successfully!',
        'admin.resources.success_delete': 'Resource deleted successfully!',
        'admin.resources.confirmDeleteTitle': 'Delete Resource',
        'admin.resources.confirmDeleteDesc': 'Are you sure you want to delete this resource?',
        'admin.resources.delete': 'Delete',
    }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved === 'en' || saved === 'pt') ? saved : 'pt';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['pt']] || key;
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
