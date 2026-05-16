export interface Question {
    question: string;
    options: string[];
}

export interface PillarQuestionnaire {
    id: string;
    title: string;
    color: string;
    questions: Question[];
}

export const questionnaireData: Record<string, PillarQuestionnaire> = {
    mental: {
        id: 'mental',
        title: 'Saúde Mental',
        color: '#06ABDD',
        questions: [
            {
                question: 'Na última semana, sentiu que teve controlo sobre como e quando realiza as suas tarefas?',
                options: [
                    'Sim',
                    'Às vezes',
                    'Não, sinto-me microgerido',
                ],
            },
            {
                question: 'Sente que o esforço que coloca no trabalho é proporcional ao reconhecimento ou recompensa que recebe?',
                options: [
                    'Sim, é justo',
                    'Às vezes',
                    'Não, sinto desequilíbrio',
                ],
            },
            {
                question: 'Com que frequência sente que o seu trabalho não tem propósito ou que se sente distante da sua equipa?',
                options: [
                    'Raramente',
                    'Frequentemente',
                    'Todos os dias',
                ],
            },
        ],
    },
    fisico: {
        id: 'fisico',
        title: 'Bem-estar Físico',
        color: '#FF8C42',
        questions: [
            {
                question: 'Qual é habitualmente o intervalo de tempo entre a sua última refeição do dia e o pequeno-almoço do dia seguinte?',
                options: [
                    'Menos de 10 horas (ex: Janta às 22h, come às 07h)',
                    'Cerca de 12 horas',
                    'Mais de 12 horas',
                ],
            },
            {
                question: 'Sente que tem \'permissão implícita\' do seu chefe e equipa para se levantar e caminhar durante 5 minutos a meio da tarde?',
                options: [
                    'Sim, é normal na nossa cultura',
                    'Não, sentir-me-ia julgado ou visto como preguiçoso',
                ],
            },
            {
                question: 'Sente uma quebra súbita de energia ou sonolência forte a meio da tarde (por volta das 15h00)?',
                options: [
                    'Raramente',
                    'Quase todos os dias',
                ],
            },
            {
                question: 'Passa mais de 6 horas por dia sentado e sente dores lombares (fundo das costas) ou nos joelhos ao fim do dia?',
                options: [
                    'Sim, sinto rigidez/dor frequente',
                    'Passo tempo sentado, mas sem dores',
                ],
            },
            {
                question: 'O seu ambiente de trabalho atual (escritório ou casa) facilita ou dificulta beber água e comer saudável?',
                options: [
                    'Facilita (tenho água/fruta à mão)',
                    'Dificulta (só tenho acesso a vending machines/café e estou longe da água)',
                ],
            },
        ],
    },
    financeira: {
        id: 'financeira',
        title: 'Assistência Financeira',
        color: '#4ECDC4',
        questions: [
            {
                question: 'Quando pensa nas suas finanças, qual é a emoção predominante?',
                options: [
                    'Confiança',
                    'Indiferença',
                    'Ansiedade ou Medo',
                ],
            },
            {
                question: 'Costuma abrir os seus extratos bancários e faturas imediatamente, ou evita olhar para eles?',
                options: [
                    'Imediatamente',
                    'Adio alguns dias',
                    'Evito ao máximo',
                ],
            },
            {
                question: 'O stress financeiro afetou o seu sono ou produtividade no trabalho na última semana?',
                options: [
                    'Não',
                    'Um pouco',
                    'Significativamente',
                ],
            },
        ],
    },
    juridica: {
        id: 'juridica',
        title: 'Assistência Jurídica',
        color: '#D8A4C4',
        questions: [
            {
                question: 'O assunto que quer tratar é um conflito com uma pessoa específica ou uma discordância com uma regra da empresa?',
                options: [
                    'Conflito com Pessoa',
                    'Regra da Empresa',
                    'Assédio ou Ética',
                ],
            },
            {
                question: 'Numa escala de 1 a 5, quão preparado se sente para ter uma conversa difícil sobre este tema hoje?',
                options: [
                    '1 - Não sei o que dizer',
                    '2',
                    '3',
                    '4',
                    '5 - Sei o que dizer, mas tenho receio das consequências',
                ],
            },
            {
                question: 'Qual é o seu maior receio se levantar esta questão?',
                options: [
                    'Retaliação do chefe',
                    'Ser visto como problemático',
                    'Não mudar nada',
                ],
            },
        ],
    },
};
