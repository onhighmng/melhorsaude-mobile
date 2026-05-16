import { useState } from 'react';
import { StatisticsCard5 } from './ui/statistics-card-5';
import { Users } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: 'onboarded' | 'pending' | 'missing';
}

export function OnboardingTracker() {
  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Ana Silva', email: 'ana@example.com', status: 'onboarded' },
    { id: '2', name: 'João Santos', email: 'joao@example.com', status: 'onboarded' },
    { id: '3', name: 'Maria Costa', email: 'maria@example.com', status: 'pending' },
    { id: '4', name: 'Pedro Oliveira', email: 'pedro@example.com', status: 'onboarded' },
    { id: '5', name: 'Sofia Pereira', email: 'sofia@example.com', status: 'missing' },
    { id: '6', name: 'Carlos Rodrigues', email: 'carlos@example.com', status: 'pending' },
    { id: '7', name: 'Rita Fernandes', email: 'rita@example.com', status: 'onboarded' },
    { id: '8', name: 'Miguel Alves', email: 'miguel@example.com', status: 'missing' },
    { id: '9', name: 'Beatriz Lima', email: 'beatriz@example.com', status: 'onboarded' },
    { id: '10', name: 'Tiago Martins', email: 'tiago@example.com', status: 'pending' },
  ]);

  const onboardedCount = teamMembers.filter(m => m.status === 'onboarded').length;
  const pendingCount = teamMembers.filter(m => m.status === 'pending').length;
  const missingCount = teamMembers.filter(m => m.status === 'missing').length;

  // Currency data representing onboarding status distribution
  const statusDistribution = [
    { code: 'Integrados', percent: Math.round((onboardedCount / teamMembers.length) * 100), color: 'bg-green-500' },
    { code: 'Pendentes', percent: Math.round((pendingCount / teamMembers.length) * 100), color: 'bg-amber-500' },
    { code: 'Em Falta', percent: Math.round((missingCount / teamMembers.length) * 100), color: 'bg-red-500' },
  ];

  const completionRate = ((onboardedCount / teamMembers.length) * 100).toFixed(1);

  return (
    <div className="flex items-center justify-center">
      <StatisticsCard5
        title="Estado de Integração da Equipa"
        balance={`${onboardedCount}/${teamMembers.length}`}
        delta={parseFloat(completionRate)}
        currencies={statusDistribution}
        buttonText="Ver Equipa"
        buttonIcon={Users}
        className="max-w-full"
      />
    </div>
  );
}