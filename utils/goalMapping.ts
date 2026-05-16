// Goal mapping based on onboarding selections
// Maps user concerns to actionable weekly goals

export interface OnboardingAnswers {
  pillar: 'mental' | 'physical' | 'financial' | 'legal';
  concerns: number[]; // indices of selected concerns (up to 2)
}

export interface Goal {
  goal_title: string;
  goal_description: string;
  pillar_code: string;
  target_value?: number;
  target_unit?: string;
  current_value: number;
  status: 'active' | 'completed' | 'abandoned';
}

// 🧠 Mental Health Goals Mapping
const mentalHealthGoals: Record<number, Goal[]> = {
  0: [ // Tenho sentido muito stress ou ansiedade
    {
      goal_title: 'Sessões de Saúde Mental',
      goal_description: 'Fazer 2 sessões de saúde mental este mês',
      pillar_code: 'psychological',
      target_value: 2,
      target_unit: 'sessões',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Recursos de Relaxamento',
      goal_description: 'Ver 2 conteúdos de relaxamento na página de recursos',
      pillar_code: 'psychological',
      target_value: 2,
      target_unit: 'recursos',
      current_value: 0,
      status: 'active'
    }
  ],
  1: [ // Tenho dormido mal ou acordo cansado(a)
    {
      goal_title: 'Aprender sobre Sono',
      goal_description: 'Assistir a 2 vídeos sobre sono e descanso',
      pillar_code: 'psychological',
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Rotina de Relaxamento',
      goal_description: 'Praticar 1 rotina de relaxamento antes de dormir durante 5 dias',
      pillar_code: 'psychological',
      target_value: 5,
      target_unit: 'dias',
      current_value: 0,
      status: 'active'
    }
  ],
  2: [ // Sinto-me desmotivado(a) ou sem energia
    {
      goal_title: 'Sessão de Apoio',
      goal_description: 'Fazer 1 sessão de saúde mental esta semana',
      pillar_code: 'psychological',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Motivação e Bem-estar',
      goal_description: 'Ver 2 vídeos de motivação e bem-estar emocional',
      pillar_code: 'psychological',
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    }
  ],
  3: [ // Tenho dificuldade em equilibrar trabalho e vida pessoal
    {
      goal_title: 'Equilibrar Vida',
      goal_description: 'Fazer 1 sessão de saúde mental este mês',
      pillar_code: 'psychological',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Gestão de Stress',
      goal_description: 'Ler 2 artigos sobre gestão de stress e prioridades',
      pillar_code: 'psychological',
      target_value: 2,
      target_unit: 'artigos',
      current_value: 0,
      status: 'active'
    }
  ],
  4: [ // Quero falar com alguém sobre o que estou a sentir
    {
      goal_title: 'Marcar Sessão',
      goal_description: 'Marcar uma sessão de saúde mental',
      pillar_code: 'psychological',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Gerir Emoções',
      goal_description: 'Ver 1 vídeo sobre como lidar com emoções e pedir ajuda',
      pillar_code: 'psychological',
      target_value: 1,
      target_unit: 'vídeo',
      current_value: 0,
      status: 'active'
    }
  ]
};

// 🏋️‍♀️ Physical Wellbeing Goals Mapping
const physicalGoals: Record<number, Goal[]> = {
  0: [ // Quero ter mais energia durante o dia
    {
      goal_title: 'Sessão de Bem-estar',
      goal_description: 'Fazer 1 sessão de bem-estar físico esta semana',
      pillar_code: 'physical',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Alimentação e Energia',
      goal_description: 'Ver 2 vídeos sobre alimentação e energia na página de recursos',
      pillar_code: 'physical',
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    }
  ],
  1: [ // Quero dormir melhor e acordar com disposição
    {
      goal_title: 'Sono e Descanso',
      goal_description: 'Fazer 1 sessão de bem-estar físico focada em sono e descanso',
      pillar_code: 'physical',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Rotina de Sono',
      goal_description: 'Assistir a 2 vídeos sobre rotina de sono e relaxamento',
      pillar_code: 'physical',
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    }
  ],
  2: [ // Quero alimentar-me de forma mais saudável
    {
      goal_title: 'Nutrição',
      goal_description: 'Fazer 1 sessão de bem-estar físico com foco em nutrição',
      pillar_code: 'physical',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Alimentação Equilibrada',
      goal_description: 'Ver 2 vídeos com dicas práticas de alimentação equilibrada',
      pillar_code: 'physical',
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    }
  ],
  3: [ // Quero voltar a mexer o corpo com regularidade
    {
      goal_title: 'Movimento Regular',
      goal_description: 'Fazer 2 sessões de bem-estar físico este mês',
      pillar_code: 'physical',
      target_value: 2,
      target_unit: 'sessões',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Desafio de Movimento',
      goal_description: 'Participar num desafio de movimento de 5 dias',
      pillar_code: 'physical',
      target_value: 5,
      target_unit: 'dias',
      current_value: 0,
      status: 'active'
    }
  ],
  4: [ // Quero sentir-me melhor com o meu corpo
    {
      goal_title: 'Bem-estar Corporal',
      goal_description: 'Fazer 1 sessão de bem-estar físico',
      pillar_code: 'physical',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Autoestima',
      goal_description: 'Ver 1 vídeo sobre autoestima e saúde corporal',
      pillar_code: 'physical',
      target_value: 1,
      target_unit: 'vídeo',
      current_value: 0,
      status: 'active'
    }
  ]
};

// 💰 Financial Assistance Goals Mapping
const financialGoals: Record<number, Goal[]> = {
  0: [ // Quero aprender a gerir melhor o meu dinheiro
    {
      goal_title: 'Planeador Financeiro',
      goal_description: 'Usar o Planeador Financeiro pela primeira vez esta semana',
      pillar_code: 'financial',
      target_value: 1,
      target_unit: 'vez',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Gestão Financeira',
      goal_description: 'Ver 2 vídeos sobre gestão e planeamento financeiro',
      pillar_code: 'financial',
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    }
  ],
  1: [ // Quero poupar com mais consistência
    {
      goal_title: 'Plano de Poupança',
      goal_description: 'Criar um plano de poupança no Planeador Financeiro',
      pillar_code: 'financial',
      target_value: 1,
      target_unit: 'plano',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Sessão sobre Poupança',
      goal_description: 'Fazer 1 sessão de assistência financeira sobre poupança',
      pillar_code: 'financial',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    }
  ],
  2: [ // Quero sair de dívidas ou evitar novos empréstimos
    {
      goal_title: 'Gestão de Dívidas',
      goal_description: 'Fazer 1 sessão de assistência financeira',
      pillar_code: 'financial',
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Plano de Dívidas',
      goal_description: 'Usar o Planeador para rever todas as dívidas e definir um plano mensal',
      pillar_code: 'financial',
      target_value: 1,
      target_unit: 'plano',
      current_value: 0,
      status: 'active'
    }
  ],
  3: [ // Quero planear melhor as minhas despesas mensais
    {
      goal_title: 'Orçamento Completo',
      goal_description: 'Preencher o Planeador Financeiro completo (rendimento + despesas)',
      pillar_code: 'financial',
      target_value: 1,
      target_unit: 'planeador',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Controlo de Gastos',
      goal_description: 'Ver 1 vídeo sobre orçamento e controlo de gastos',
      pillar_code: 'financial',
      target_value: 1,
      target_unit: 'vídeo',
      current_value: 0,
      status: 'active'
    }
  ],
  4: [ // Quero aumentar a minha estabilidade financeira
    {
      goal_title: 'Revisão Semanal',
      goal_description: 'Rever o Planeador Financeiro 1x por semana',
      pillar_code: 'financial',
      target_value: 4,
      target_unit: 'revisões',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Segurança Financeira',
      goal_description: 'Ver 2 vídeos sobre segurança e liberdade financeira',
      pillar_code: 'financial',
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    }
  ]
};

// ⚖️ Legal Assistance Goals Mapping
const LEGAL_PILLAR_CODE = 'legal_social';

const legalGoals: Record<number, Goal[]> = {
  0: [ // Tenho dúvidas sobre contratos ou direitos no trabalho
    {
      goal_title: 'Direitos Laborais',
      goal_description: 'Ver 2 vídeos curtos sobre direitos laborais',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Sessão Jurídica',
      goal_description: 'Fazer 1 sessão de assistência jurídica esta semana',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    }
  ],
  1: [ // Preciso de ajuda com questões familiares
    {
      goal_title: 'Direitos Familiares',
      goal_description: 'Ver 1 vídeo sobre direitos familiares',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 1,
      target_unit: 'vídeo',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Apoio Familiar',
      goal_description: 'Fazer 1 sessão de assistência jurídica este mês',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    }
  ],
  2: [ // Tenho problemas legais pessoais que não sei como resolver
    {
      goal_title: 'Resolução de Conflitos',
      goal_description: 'Fazer 1 sessão de assistência jurídica',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Gestão de Conflitos',
      goal_description: 'Ver 2 vídeos com dicas para resolver conflitos pessoais',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    }
  ],
  3: [ // Quero prevenir problemas jurídicos antes que aconteçam
    {
      goal_title: 'Prevenção Jurídica',
      goal_description: 'Ver 2 vídeos sobre prevenção jurídica',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 2,
      target_unit: 'vídeos',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Sessão Preventiva',
      goal_description: 'Fazer 1 sessão de assistência jurídica preventiva',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    }
  ],
  4: [ // Quero sentir-me mais protegido(a) e confiante nas minhas decisões
    {
      goal_title: 'Check-in Jurídico',
      goal_description: 'Fazer 1 check-in de segurança jurídica no app',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 1,
      target_unit: 'check-in',
      current_value: 0,
      status: 'active'
    },
    {
      goal_title: 'Orientação Geral',
      goal_description: 'Fazer 1 sessão de assistência jurídica para orientação geral',
      pillar_code: LEGAL_PILLAR_CODE,
      target_value: 1,
      target_unit: 'sessão',
      current_value: 0,
      status: 'active'
    }
  ]
};

// Master mapping
const goalMappings = {
  mental: mentalHealthGoals,
  physical: physicalGoals,
  financial: financialGoals,
  legal: legalGoals
};

/**
 * Generate personalized goals based on onboarding answers
 * @param answers - User's onboarding selections
 * @returns Array of goals to be saved in user_goals table
 */
export function generateGoalsFromOnboarding(answers: OnboardingAnswers): Goal[] {
  const pillarGoals = goalMappings[answers.pillar];
  const allGoals: Goal[] = [];

  // Get goals for each selected concern
  answers.concerns.forEach(concernIndex => {
    const concernGoals = pillarGoals[concernIndex];
    if (concernGoals) {
      allGoals.push(...concernGoals);
    }
  });

  return allGoals;
}

