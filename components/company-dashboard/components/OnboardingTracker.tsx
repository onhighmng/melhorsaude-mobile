import { StatisticsCard5 } from '../ui/statistics-card-5';
import { Tag } from 'lucide-react';
import { InviteCode } from './CodeGenerator';

interface OnboardingTrackerProps {
  invites: InviteCode[];
  totalSeats?: number;
}

export function OnboardingTracker({ invites, totalSeats = 50 }: OnboardingTrackerProps) {
  const usedCount = invites.filter(i => i.status === 'used' || i.status === 'accepted').length;
  const activeCount = invites.filter(i => i.status === 'pending').length;
  // If we don't have a hard totalSeats limit, "Available" is just activeCount.
  // "Por Gerar" (To Generate) only makes sense if there's a quota.
  // Let's assume totalSeats is the quota.

  const generatedCount = invites.length;
  const notGeneratedCount = Math.max(0, totalSeats - generatedCount);

  // Currency data representing code distribution
  const statusDistribution = [
    { code: 'Usados', percent: Math.round((usedCount / totalSeats) * 100), color: 'bg-green-500' },
    { code: 'Disponíveis', percent: Math.round((activeCount / totalSeats) * 100), color: 'bg-blue-500' },
    { code: 'Por Gerar', percent: Math.round((notGeneratedCount / totalSeats) * 100), color: 'bg-gray-400' },
  ].filter(item => item.percent > 0); // Only show items with actual percentage

  const usageRate = ((usedCount / totalSeats) * 100).toFixed(1);

  return (
    <div className="flex items-center justify-center">
      <StatisticsCard5
        title="Estado dos Códigos"
        balance={`${usedCount}/${totalSeats}`}
        delta={parseFloat(usageRate)}
        currencies={statusDistribution}
        buttonText="Ver Códigos"
        buttonIcon={Tag}
        className="max-w-full"
      />
    </div>
  );
}
