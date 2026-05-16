import { useState, memo } from 'react';
// DISABLED: import from 'motion/react';
import { 
  ArrowLeft, Zap, Wind, Smile, TrendingUp, Calendar, 
  ChevronRight, Info, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { showSuccessToast } from '@/utils/toast';

interface MetricCardProps {
  title: string;
  value: number;
  icon: any;
  color: string;
  unit: string;
  desc: string;
  onUpdate: (val: number) => void;
  isFocused?: boolean;
}

const MetricCard = ({ title, value, icon: Icon, color, unit, desc, onUpdate, isFocused }: MetricCardProps) => (
  <div className={`bg-white rounded-[28px] p-5 shadow-sm border transition-all duration-500 flex flex-col gap-4 ${isFocused ? 'ring-2 ring-current scale-[1.02] shadow-md' : 'border-gray-100'}`} style={{ color: isFocused ? color : undefined }}>
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-2xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="font-poppins text-[#474747] text-[12px] font-semibold uppercase tracking-wider">{title}</p>
          <p className="font-poppins text-[#0a0a0a] text-[18px] font-bold">{value}{unit}</p>
        </div>
      </div>
      <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
        <span className="font-poppins text-gray-500 text-[11px] font-medium">{desc}</span>
      </div>
    </div>
    
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={value}
      onChange={(e) => onUpdate(parseInt(e.target.value))}
      className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-current"
      style={{ color }}
    />
    
    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter px-1">
      <span>Baixo</span>
      <span>Médio</span>
      <span>Elevado</span>
    </div>
  </div>
);

interface PulseHubPageProps {
  onBack: () => void;
  focusMetric?: 'energy' | 'stress' | 'humor' | 'pulse';
  scores?: { energy: number; stress: number; humor: number };
}

export function PulseHubPage({ onBack, focusMetric, scores = { energy: 4, stress: 2, humor: 4 } }: PulseHubPageProps) {
  const { t } = useLanguage();
  
  // Convert 1-5 to 0-100% for display
  const energyPct = ((scores.energy - 1) / 4) * 100;
  const stressPct = ((scores.stress - 1) / 4) * 100;
  const humorPct  = ((scores.humor - 1) / 4) * 100;
  
  // Overall score: Energy and Humor are positive, Stress is negative
  // (energy + (100-stress) + humor) / 3
  const overallScore = Math.round((energyPct + (100 - stressPct) + humorPct) / 3);

  const getPulseState = () => {
    if (overallScore > 80) return { label: 'Excelente', color: '#10B981', bg: 'bg-emerald-500' };
    if (overallScore > 60) return { label: 'Equilibrado', color: '#3B82F6', bg: 'bg-blue-500' };
    if (overallScore > 40) return { label: 'Atenção', color: '#F59E0B', bg: 'bg-amber-500' };
    return { label: 'Alerta', color: '#EF4444', bg: 'bg-red-500' };
  };

  const state = getPulseState();

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      {/* Header */}
      <div className="sticky top-0 z-30 px-5 pt-12 pb-5 bg-[#F9F9F9]/80 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="size-10 rounded-full flex items-center justify-center active:scale-90 transition-all bg-white shadow-sm border border-gray-100"
            >
              <ArrowLeft size={20} className="text-[#0a0a0a]" />
            </button>
            <div>
              <p className="font-poppins text-[#474747] text-[12px] font-medium uppercase tracking-wider">Os teus sinais</p>
              <h1 className="font-plus-jakarta text-[#0a0a0a] text-[24px] font-bold tracking-tight">Pulse Hub</h1>
            </div>
          </div>
          <div className="size-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
            <Calendar size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 flex flex-col gap-6">
        
        {/* Immersive Living Core */}
        <div className="relative h-[300px] w-full rounded-[40px] overflow-hidden bg-white shadow-xl shadow-black/5 border border-white p-8 flex flex-col items-center justify-center">
          {/* Breathing Ambient Background */}
          <div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
            }}

            className={`absolute size-[500px] rounded-full blur-[100px] opacity-20 ${state.bg}`}
          />
          
          <div className="relative flex flex-col items-center text-center">
            <div


              className="mb-2"
            >
              <span className={`px-4 py-1.5 rounded-full text-white text-[11px] font-bold uppercase tracking-widest ${state.bg} shadow-lg shadow-current/20`}>
                {state.label}
              </span>
            </div>
            
            <div className="relative">
              <span className="font-plus-jakarta text-[96px] font-extrabold text-[#0a0a0a] leading-none tracking-tighter">
                {overallScore}
              </span>
              <span className="absolute -top-2 -right-6 font-poppins text-[24px] font-bold text-gray-300">%</span>
            </div>
            
            <span className="font-poppins text-[#474747] text-[14px] font-bold uppercase tracking-[0.2em] mt-2">Pulse Score</span>
            
            <div className="flex items-center gap-2 mt-6 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100">
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="font-poppins text-[12px] font-semibold text-gray-600">+5% vs. ontem</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Breakdown */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-end px-1">
            <h2 className="font-plus-jakarta text-[20px] font-bold text-[#0a0a0a]">Análise Detalhada</h2>
            <span className="font-poppins text-[12px] text-gray-400">Escala 1 a 5</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Energia', val: scores.energy, icon: Zap, color: '#3B82F6' },
              { label: 'Stress', val: scores.stress, icon: Wind, color: '#F59E0B' },
              { label: 'Humor', val: scores.humor, icon: Smile, color: '#10B981' },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex flex-col items-center gap-2">
                <div className="size-10 rounded-2xl flex items-center justify-center mb-1" style={{ background: `${m.color}15` }}>
                  <m.icon size={20} style={{ color: m.color }} />
                </div>
                <p className="font-plus-jakarta text-[18px] font-bold text-[#0a0a0a]">{m.val}</p>
                <p className="font-poppins text-[10px] text-gray-400 font-bold uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Insight */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <div className={`size-12 rounded-2xl ${state.bg} opacity-10 flex items-center justify-center`}>
              <Info size={24} className="opacity-100" style={{ color: state.color }} />
            </div>
          </div>
          
          <h3 className="font-plus-jakarta text-[18px] font-bold text-[#0a0a0a] mb-4">Recomendação Pulse</h3>
          <p className="font-poppins text-[15px] text-[#474747] leading-relaxed mb-6">
            O teu score de <strong>{overallScore}%</strong> indica um estado <strong>{state.label.toLowerCase()}</strong>. 
            {overallScore > 70 
              ? " Continua com o bom trabalho! Estás no caminho certo para uma semana produtiva."
              : " O teu stress está um pouco elevado. Recomendamos uma pausa curta para respiração ativa."}
          </p>
          
          <button 
            onClick={() => showSuccessToast('Exercício iniciado', 'A abrir sessão de meditação...')}
            className="w-full bg-[#0a0a0a] text-white py-4 rounded-2xl font-plus-jakarta font-bold text-[15px] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
          >
            Começar Meditação <ChevronRight size={18} />
          </button>
        </div>

        {/* Help Link */}
        <button className="bg-red-50 rounded-[32px] p-6 border border-red-100 flex items-center gap-4 active:scale-[0.98] transition-all">
          <div className="size-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertCircle size={28} className="text-red-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-plus-jakarta text-[16px] font-bold text-[#991b1b]">Sentes-te sobrecarregado?</p>
            <p className="font-poppins text-[13px] text-[#b91c1c]">Fala agora com um especialista (24/7)</p>
          </div>
          <ChevronRight size={20} className="text-red-300" />
        </button>

        <div className="h-8" />
      </div>
    </div>
  );
}
