import { useState, useMemo } from 'react';
import { PulseHubPage } from './PulseHubPage';
import { PulseCheckinFlow } from './PulseCheckinFlow';
import { PulseResultsPage } from './PulseResultsPage';
import { useMood } from '@/contexts/MoodContext';
// DISABLED: import from 'sonner';

interface PulseCheckinContentProps {
  onBack: () => void;
  initialFocus?: 'energy' | 'stress' | 'humor' | 'pulse';
}

export function PulseCheckinContent({ onBack, initialFocus }: PulseCheckinContentProps) {
  const [view, setView] = useState<'hub' | 'flow' | 'results'>(
    initialFocus && initialFocus !== 'pulse' ? 'flow' : 'hub'
  );
  const [currentScores, setCurrentScores] = useState<{ energy: number; stress: number; humor: number } | null>(null);
  const { addPulseEntry, moodHistory } = useMood();

  const lastPulseEntry = useMemo(() => {
    return moodHistory.find(m => m.notes && m.notes.includes('"type":"pulse"'));
  }, [moodHistory]);

  const latestScores = useMemo(() => {
    if (currentScores) return currentScores;
    if (lastPulseEntry) {
      return {
        energy: lastPulseEntry.energy || 3,
        stress: lastPulseEntry.stress || 3,
        humor: lastPulseEntry.humor || 3,
      };
    }
    return { energy: 3, stress: 3, humor: 3 };
  }, [currentScores, lastPulseEntry]);

  const handleFlowComplete = async (scores: { energy: number; stress: number; humor: number }) => {
    const toastId = toast.loading('A guardar o teu pulse...');
    try {
      await addPulseEntry(scores);
      setCurrentScores(scores);
      setView('results');
      toast.success('Pulse guardado!', { id: toastId });
    } catch (error) {
      toast.error('Erro ao guardar pulse.', { id: toastId });
      // Still show results if local save failed? Maybe just go back
      setCurrentScores(scores);
      setView('results');
    }
  };

  const calculateOverallScore = (scores: { energy: number; stress: number; humor: number }) => {
    const energyPct = ((scores.energy - 1) / 4) * 100;
    const stressPct = ((scores.stress - 1) / 4) * 100;
    const humorPct  = ((scores.humor - 1) / 4) * 100;
    return Math.round((energyPct + (100 - stressPct) + humorPct) / 3);
  };

  if (view === 'flow') {
    return (
      <PulseCheckinFlow 
        onBack={() => setView('hub')} 
        onComplete={handleFlowComplete} 
      />
    );
  }

  if (view === 'results' && latestScores) {
    return (
      <PulseResultsPage 
        score={calculateOverallScore(latestScores)}
        onBack={() => setView('hub')}
        onAction={(action) => {
          console.log('Action triggered:', action);
          onBack();
        }}
      />
    );
  }

  return (
    <PulseHubPage 
      onBack={onBack}
      onStartCheckin={() => setView('flow')}
      scores={latestScores}
    />
  );
}
