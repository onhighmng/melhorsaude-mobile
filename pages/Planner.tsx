import { useState, useEffect, useCallback } from 'react';
// DISABLED: import from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { IncomeCard } from '../components/planner/income-card';
import { ExpensesCard } from '../components/planner/expenses-card';
import { SustainabilityCard } from '../components/planner/sustainability-card';
import { SuggestionsCard } from '../components/planner/suggestions-card';
import { InsightsCard } from '../components/planner/insights-card';
import { HistoryCard } from '../components/planner/history-card';
import { ImageWithFallback } from '../components/planner/figma/ImageWithFallback';
import logo from '../assets/planner/44755e30ac18b81ba772c9e4dc145736cd64cd68.png';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

export interface FinancialData {
  mainSalary: number;
  additionalIncome: number;
  expenses: {
    casa: number;
    alimentacao: number;
    transporte: number;
    educacao: number;
    dividas: number;
    lazer: number;
    saude: number;
    outros: number;
  };
  talents: string[];
}

export default function Planner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [financialData, setFinancialData] = useState<FinancialData>({
    mainSalary: 0,
    additionalIncome: 0,
    expenses: {
      casa: 0,
      alimentacao: 0,
      transporte: 0,
      educacao: 0,
      dividas: 0,
      lazer: 0,
      saude: 0,
      outros: 0
    },
    talents: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Get current month-year key
  const getCurrentMonthKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  // Load financial data from database or localStorage
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadFinancialData();
  }, [user]);

  const loadFinancialData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const monthKey = getCurrentMonthKey();

      // Try to fetch from database first
      const { data: dbData, error } = await (supabase
        .from('financial_planner_data') as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('month_year', monthKey)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (dbData) {
        // Load from database
        setFinancialData({
          mainSalary: dbData.main_salary || 0,
          additionalIncome: dbData.additional_income || 0,
          expenses: dbData.expenses as FinancialData['expenses'],
          talents: dbData.talents || []
        });
      } else {
        // Check for localStorage data and migrate
        const localData = localStorage.getItem('financialData');
        if (localData) {
          const parsedData = JSON.parse(localData);
          setFinancialData(parsedData);

          // Migrate to database
          await saveToDatabase(parsedData, monthKey);

          // Clear localStorage after successful migration
          localStorage.removeItem('financialData');

          toast({
            title: "Dados Migrados",
            description: "Seus dados foram transferidos para o banco de dados com sucesso!"
          });
        }
      }
    } catch (error: any) {
      console.error('Error loading financial data:', error);
      toast({
        title: "Erro ao Carregar",
        description: "Não foi possível carregar seus dados financeiros.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Save to database
  const saveToDatabase = async (data: FinancialData, monthKey?: string) => {
    if (!user) return;

    try {
      const key = monthKey || getCurrentMonthKey();
      const totalIncome = data.mainSalary + data.additionalIncome;
      const totalExpenses = Object.values(data.expenses).reduce((sum, val) => sum + val, 0);
      const balance = totalIncome - totalExpenses;

      const { error } = await (supabase
        .from('financial_planner_data') as any)
        .upsert({
          user_id: user.id,
          month_year: key,
          main_salary: data.mainSalary,
          additional_income: data.additionalIncome,
          expenses: data.expenses,
          talents: data.talents,
          total_income: totalIncome,
          total_expenses: totalExpenses,
          balance: balance
        }, {
          onConflict: 'user_id,month_year'
        });

      if (error) throw error;

      setHasUnsavedChanges(false);
    } catch (error: any) {
      console.error('Error saving financial data:', error);
      throw error;
    }
  };

  // Debounced auto-save
  useEffect(() => {
    if (loading || !hasUnsavedChanges) return;

    const timeoutId = setTimeout(async () => {
      setSaving(true);
      try {
        await saveToDatabase(financialData);
      } catch (error) {
        toast({
          title: "Erro ao Salvar",
          description: "Não foi possível salvar suas alterações.",
          variant: "destructive"
        });
      } finally {
        setSaving(false);
      }
    }, 2000); // Save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [financialData, hasUnsavedChanges, loading]);

  // Update financial data and mark as changed
  const updateFinancialData = useCallback((newData: FinancialData) => {
    setFinancialData(newData);
    setHasUnsavedChanges(true);
  }, []);

  const totalIncome = financialData.mainSalary + financialData.additionalIncome;
  const totalExpenses = Object.values(financialData.expenses).reduce((sum, val) => sum + val, 0);
  const balance = totalIncome - totalExpenses;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9F5] via-[#FEFDFB] to-[#F0F4F1] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#A8C5BD] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2C3E3A]">Carregando planeador financeiro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9F5] via-[#FEFDFB] to-[#F0F4F1]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-[#E8EDE8]/50">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/user/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Voltar para Recursos"
              >
                <ArrowLeft className="w-5 h-5 text-[#2C3E3A]" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-[#A8C5BD] to-[#8BB4A8] rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
                <ImageWithFallback
                  src={logo}
                  alt="Melhor Saúde Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-[#2C3E3A] font-bold">Planeador de Salário Mensal</h1>
                <p className="text-xs text-[rgb(57,90,220)] text-[14px]">Melhor Saúde</p>
              </div>
            </div>
            {saving && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-[#A8C5BD] border-t-transparent rounded-full animate-spin"></div>
                <span>A guardar...</span>
              </div>
            )}
            {!saving && hasUnsavedChanges && (
              <div className="text-sm text-orange-600">
                Não guardado
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-4">
        <IncomeCard data={financialData} onUpdate={updateFinancialData} />

        <ExpensesCard
          data={financialData}
          onUpdate={updateFinancialData}
          totalIncome={totalIncome}
        />

        <SustainabilityCard
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
        />

        {(balance < 0 || totalExpenses > 0) && (
          <SuggestionsCard
            data={financialData}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
            onUpdate={setFinancialData}
          />
        )}

        <InsightsCard />

        <HistoryCard />

        {/* Footer */}
        <div className="text-center py-8 space-y-3">
          <p className="text-xs text-[#6B7D78]">
            Desenvolvido pela Melhor Saúde
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E8F4F8] to-[#FFF9E6] rounded-full border border-[#A8C5BD]/20">
            <div className="w-2 h-2 bg-[#A8C5BD] rounded-full animate-pulse"></div>
            <p className="text-sm text-[#2C3E3A]">
              <span className="font-semibold">90%</span> completam em <span className="font-semibold">&lt;30s</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
