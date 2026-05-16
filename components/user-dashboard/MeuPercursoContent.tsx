import { Clock, Calendar, Target, CheckCircle2, TrendingUp } from 'lucide-react';
import { CardStack } from '@/components/ui/card-stack';
import { useState, useMemo } from 'react';
import { NextSessionsModal } from './NextSessionsModal';
import { PastSessionsModal } from './PastSessionsModal';
import { useUserProgress, UserGoal } from '@/hooks/useUserProgress';
import { useBookings } from '@/hooks/useBookings';
import { useMood, MoodEntry } from '@/contexts/MoodContext';
// DISABLED: import from 'sonner';
import { AddGoalModal } from './AddGoalModal';
import { Plus } from 'lucide-react';

function GoalCard({ goals, onUpdateStatus, onAddGoal }: {
  goals: UserGoal[],
  onUpdateStatus: (id: string, updates: Partial<UserGoal>) => Promise<any>,
  onAddGoal: () => void
}) {
  const activeGoals = goals.filter(g => g.status !== 'completed');

  if (activeGoals.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-4 md:p-8 shadow-lg border border-blue-100/50 overflow-hidden flex flex-col items-center justify-center min-h-[300px] gap-4">
        <div className="text-center">
          <p className="text-gray-500 mb-2 text-2xl">🎉</p>
          <p className="text-gray-600">Não tem objetivos ativos no momento.</p>
        </div>
        <button
          onClick={onAddGoal}
          className="flex items-center gap-2 px-4 py-2 bg-[#4A90E2] text-white rounded-xl hover:bg-[#357ABD] transition-colors font-medium shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          Novo Objetivo
        </button>
      </div>
    );
  }

  const cards = activeGoals.map((goal, index) => ({
    id: index,
    name: `Objetivo ${index + 1}`,
    designation: goal.pillar_code === 'mental' ? 'Saúde Mental' :
      goal.pillar_code === 'physical' ? 'Bem-estar Físico' :
        goal.pillar_code === 'financial' ? 'Finanças' : 'Jurídico',
    content: (
      <div className={`space-y-4 bg-gradient-to-br ${goal.pillar_code === 'mental' ? 'from-blue-50 to-blue-100/50' :
        goal.pillar_code === 'physical' ? 'from-orange-50 to-orange-100/50' :
          goal.pillar_code === 'financial' ? 'from-green-50 to-green-100/50' :
            'from-purple-50 to-purple-100/50'
        } p-4 md:p-6 rounded-2xl h-full`}>
        <div className="flex items-start gap-2 md:gap-3">
          <Target className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1 ${goal.pillar_code === 'mental' ? 'text-blue-600' :
            goal.pillar_code === 'physical' ? 'text-orange-600' :
              goal.pillar_code === 'financial' ? 'text-green-600' :
                'text-purple-600'
            }`} />
          <div className="flex-1">
            <p className="text-gray-900 text-sm md:text-base font-medium">
              {goal.goal_description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3 pt-2">
          <button
            onClick={async (e) => {
              e.stopPropagation();
              const result = await onUpdateStatus(goal.id, { status: 'completed' });
              if (result.success) {
                toast.success('Objetivo concluído com sucesso!');
              } else {
                toast.error('Erro ao concluir objetivo.');
              }
            }}
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-sm text-sm md:text-base cursor-pointer"
          >
            <CheckCircle2 className={`w-3.5 h-3.5 md:w-4 md:h-4 ${goal.pillar_code === 'mental' ? 'text-blue-600' :
              goal.pillar_code === 'physical' ? 'text-orange-600' :
                goal.pillar_code === 'financial' ? 'text-green-600' :
                  'text-purple-600'
              }`} />
            <span className="text-gray-700">Marcar como concluído</span>
          </button>
        </div>
      </div>
    ),
  }));

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-4 md:p-8 shadow-lg border border-blue-100/50 overflow-hidden">
      <div className="flex items-center justify-between mb-6 md:mb-8 px-2">
        <h3 className="text-gray-900 text-2xl">
          🎯 Objetivos Ativos
        </h3>
        <button
          onClick={onAddGoal}
          className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
          title="Adicionar Novo Objetivo"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="min-h-[240px] md:min-h-[280px] flex items-center justify-center px-2 md:px-0">
        <div className="w-full max-w-[280px] md:max-w-none scale-90 md:scale-100">
          <CardStack items={cards} offset={15} scaleFactor={0.05} />
        </div>
      </div>
    </div>
  );
}


function StatCard({ icon, title, value, subtitle, bgColor, onClick, showGraph, graphData, barColor }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  onClick?: () => void;
  showGraph?: boolean;
  graphData?: { label: string; height: string; value: number }[];
  barColor?: string;
}) {
  return (
    <div
      className={`${bgColor} rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-gray-600">{title}</p>
          <p className="text-5xl text-gray-900">{value}</p>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        {showGraph && graphData && (
          <div className="pt-2">
            <div className="flex items-end gap-1 h-16">
              {graphData.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full relative" style={{ height: '48px' }}>
                    <div
                      className={`absolute bottom-0 w-full rounded-t transition-all ${barColor || 'bg-blue-400/60 hover:bg-blue-500/70'}`}
                      style={{ height: item.height }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MeuPercursoContent() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPastSessionsModalOpen, setPastSessionsModalOpen] = useState(false);
  const [isAddGoalModalOpen, setAddGoalModalOpen] = useState(false);

  const { goals, updateGoalStatus, addGoal, loading: progressLoading } = useUserProgress();
  const { pastBookings, upcomingBookings, rateSession, loading: bookingsLoading } = useBookings();
  const { moodHistory, loading: moodLoading } = useMood();

  const loading = progressLoading || bookingsLoading || moodLoading;

  // Aggregate Data for Graphs
  const last7DaysData = useMemo(() => {
    const days = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const label = d.toLocaleDateString('pt-BR', { weekday: 'short' }).split('.')[0].toUpperCase();
      const dateStr = d.toISOString().split('T')[0];

      // Calculate Sessions for this day (Past + Upcoming)
      const sessionsCount = [
        ...pastBookings.filter(b => b.booking_date === dateStr),
        ...upcomingBookings.filter(b => b.booking_date === dateStr)
      ].length;

      // Calculate Mood for this day
      const dailyMoods = moodHistory.filter(m => {
        const mDate = new Date(m.timestamp).toISOString().split('T')[0];
        return mDate === dateStr;
      });
      const avgMood = dailyMoods.length > 0
        ? dailyMoods.reduce((sum, m) => sum + (m.selectedMoodIndex + 1), 0) / dailyMoods.length
        : 0;

      days.push({
        label,
        sessions: sessionsCount,
        mood: avgMood
      });
    }
    return days;
  }, [pastBookings, upcomingBookings, moodHistory]);

  const sessionGraphData = useMemo(() => {
    const maxSessions = Math.max(...last7DaysData.map(d => d.sessions), 1);
    return last7DaysData.map(d => ({
      label: d.label[0],
      value: d.sessions,
      height: `${(d.sessions / maxSessions) * 100}%`
    }));
  }, [last7DaysData]);

  const moodGraphData = useMemo(() => {
    return last7DaysData.map(d => ({
      label: d.label[0],
      value: d.mood,
      height: d.mood > 0 ? `${(d.mood / 5) * 100}%` : '0%'
    }));
  }, [last7DaysData]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">A carregar o seu percurso...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 text-4xl font-serif">Meu Percurso</h1>
        <p className="text-gray-600 mt-2">
          Acompanhe as suas sessões, objetivos e progresso
        </p>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6">
        <GoalCard
          goals={goals}
          onUpdateStatus={updateGoalStatus}
          onAddGoal={() => setAddGoalModalOpen(true)}
        />
      </div>

      {/* Progress section */}
      <div>
        <h2 className="text-gray-900">
          Acompanhe o Progresso dos seus <span className="text-[#4A90E2]">Objetivos de Bem-Estar</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Cada sessão concluída aproxima você dos seus objetivos de saúde e bem-estar.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Clock className="w-8 h-8 text-orange-600" />}
          title="Histórico de Sessões"
          value={String(pastBookings.filter(b => b.status === 'completed').length)}
          subtitle="sessões concluídas"
          bgColor="bg-gradient-to-br from-orange-50 to-orange-100/50"
          onClick={() => setPastSessionsModalOpen(true)}
          showGraph={true}
          graphData={sessionGraphData}
          barColor="bg-orange-400/60 hover:bg-orange-500/70"
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
          title="Humor Semanal"
          value={moodHistory.length > 0 ? (moodHistory[0].selectedMoodIndex + 1).toString() : "0"}
          subtitle="último registo (1-5)"
          bgColor="bg-gradient-to-br from-blue-50 to-blue-100/50"
          showGraph={true}
          graphData={moodGraphData}
          barColor="bg-blue-400/60 hover:bg-blue-500/70"
        />
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl p-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
          <div className="space-y-3 text-center">
            <div className="text-4xl">💙</div>
            <p className="text-gray-700 italic leading-relaxed font-serif">
              Pequenos passos, grandes resultados. O seu bem-estar cresce com cada conquista.
            </p>
          </div>
        </div>
      </div>

      {/* Next Sessions Modal */}
      <NextSessionsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      {/* Past Sessions Modal */}
      <PastSessionsModal
        isOpen={isPastSessionsModalOpen}
        onClose={() => setPastSessionsModalOpen(false)}
        pastBookings={pastBookings}
        onRateSession={rateSession}
      />
      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={isAddGoalModalOpen}
        onClose={() => setAddGoalModalOpen(false)}
        onSave={addGoal}
      />
    </div>
  );
}