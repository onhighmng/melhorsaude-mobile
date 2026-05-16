import { useState, useEffect } from 'react';
// DISABLED: import from 'react-router-dom';
import { ImageWithFallback } from '../components/onboarding/figma/ImageWithFallback';
import { FlowButton } from '../components/admin/FlowButton';
import { OnboardingQuestion } from '../components/onboarding/OnboardingQuestion';
import { MentalWellbeingQuestion } from '../components/onboarding/MentalWellbeingQuestion';
import { EnergyWellbeingQuestion } from '../components/onboarding/EnergyWellbeingQuestion';
import { FinancialWellbeingQuestion } from '../components/onboarding/FinancialWellbeingQuestion';
import { LegalWellbeingQuestion } from '../components/onboarding/LegalWellbeingQuestion';
import { CompletionPage } from '../components/onboarding/CompletionPage';
import logoImage from '../assets/onboarding/82094dd15515759d4b4f7f13895075c1579a6983.png';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { generateGoalsFromOnboarding, OnboardingAnswers } from '@/utils/goalMapping';
import { saveUserGoals } from '@/utils/saveUserGoals';
import { logger } from '@/utils/logger';
import { supabase } from '@/lib/supabase';
import { secureStorage } from '@/lib/secure-storage';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, refreshProfile, loading } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [selectedConcerns, setSelectedConcerns] = useState<number[]>([]);

  // Debug auth state in development
  useEffect(() => {
    logger.debug('Onboarding auth state', {
      loading,
      userId: user?.id,
      userEmail: user?.email,
      currentStep
    });
  }, [user, loading, currentStep]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      logger.warn('User not authenticated, redirecting to login');
      toast({
        title: "Autenticação Necessária",
        description: "Por favor, faça login para continuar",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [user, loading, navigate, toast]);

  // Redirect if onboarding already completed - prevent showing twice
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!loading && user) {
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', user.id)
            .maybeSingle();

          if (error) {
            logger.error('Error checking onboarding status', { error });
            return;
          }

          if (profileData?.onboarding_completed) {
            logger.info('Onboarding already completed, redirecting to dashboard');
            navigate('/user/dashboard', { replace: true });
          }
        } catch (error) {
          logger.error('Error in onboarding check', { error });
        }
      }
    };

    checkOnboardingStatus();
  }, [user, loading, navigate]);

  // Load saved state from Secure Storage
  useEffect(() => {
    const loadSavedState = async () => {
      if (user) {
        try {
          const savedState = await secureStorage.getItem<{
            step: number;
            goal: number | null;
            concerns: number[];
          }>(user.id, 'onboarding_progress');

          if (savedState) {
            logger.debug('Restored onboarding state from secure storage', savedState);
            setCurrentStep(savedState.step);
            setSelectedGoal(savedState.goal);
            setSelectedConcerns(savedState.concerns);
          }
        } catch (error) {
          logger.error('Failed to load secure onboarding state', error);
        }
      }
    };
    loadSavedState();
  }, [user]);

  // Save state to Secure Storage on change
  useEffect(() => {
    if (user) {
      const saveState = async () => {
        try {
          await secureStorage.setItem(user.id, 'onboarding_progress', {
            step: currentStep,
            goal: selectedGoal,
            concerns: selectedConcerns
          });
        } catch (error) {
          logger.error('Failed to save onboarding state securely', error);
        }
      };
      // Debounce slightly to avoid thrashing
      const timeout = setTimeout(saveState, 500);
      return () => clearTimeout(timeout);
    }
  }, [user, currentStep, selectedGoal, selectedConcerns]);

  // Complete onboarding and update database
  const completeOnboarding = async () => {
    if (!user) {
      logger.error('No user found during onboarding completion', { loading });
      toast({
        title: "Erro de Autenticação",
        description: "Sessão expirada. Por favor, faça login novamente.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    logger.info('Starting onboarding completion', { userId: user.id });

    try {
      // Generate goals from onboarding answers
      if (selectedGoal !== null && selectedConcerns.length > 0) {
        const pillarMap: Record<number, 'mental' | 'physical' | 'financial' | 'legal'> = {
          0: 'mental',
          1: 'physical',
          2: 'financial',
          3: 'legal'
        };

        const answers: OnboardingAnswers = {
          pillar: pillarMap[selectedGoal],
          concerns: selectedConcerns
        };

        logger.debug('Generating goals from onboarding answers', { pillar: answers.pillar, concernCount: selectedConcerns.length });
        const goals = generateGoalsFromOnboarding(answers);
        logger.debug('Goals generated successfully', { goalCount: goals.length });

        // Save goals to database
        const result = await saveUserGoals(user.id, goals);
        if (result.success) {
          logger.info('Goals saved successfully', { userId: user.id, goalCount: goals.length });

          // CRITICAL FIX: Update onboarding_completed flag in profile
          const { error: updateError } = await (supabase
            .from('profiles')
            .update({
              onboarding_completed: true,
              onboarding_completed_at: new Date().toISOString()
            } as any)
            .eq('id', user.id));

          if (updateError) {
            logger.error('Failed to update onboarding_completed flag', { error: updateError, userId: user.id });
            toast({
              title: "Aviso",
              description: "Objetivos salvos, mas houve um problema ao atualizar o perfil. Por favor, recarregue a página.",
              variant: "default"
            });
          } else {
            logger.info('Onboarding completion flag updated successfully', { userId: user.id });
          }

          // Remove localStorage backup if it exists
          localStorage.removeItem('onboarding_completed');
          // Clear secure storage progress
          secureStorage.removeItem(user.id, 'onboarding_progress');

          // Refresh profile in auth context and wait for state to update
          logger.debug('Refreshing user profile');
          await refreshProfile();

          // Give extra time for React state to update
          await new Promise(resolve => setTimeout(resolve, 1000));

          logger.info('Onboarding completed, navigating to dashboard', { userId: user.id });

          toast({
            title: "Onboarding Concluído",
            description: "Objetivos personalizados criados! Bem-vindo à plataforma! 🎉"
          });

          // Navigate to dashboard
          navigate('/user/dashboard', { replace: true });
        } else {
          logger.error('Failed to save goals', { error: result.error });
          toast({
            title: "Erro",
            description: "Não foi possível salvar os objetivos. Por favor, tente novamente.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      logger.error('Onboarding completion failed', { error, userId: user.id });
      toast({
        title: "Erro",
        description: "Não foi possível completar o onboarding. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Completion page
  if (currentStep === 3) {
    return (
      <CompletionPage onContinue={completeOnboarding} />
    );
  }

  // Mental wellbeing follow-up (for option 0)
  if (currentStep === 2 && selectedGoal === 0) {
    return (
      <MentalWellbeingQuestion
        onBack={() => setCurrentStep(1)}
        onNext={(concerns) => {
          setSelectedConcerns(concerns);
          setCurrentStep(3);
        }}
      />
    );
  }

  // Energy wellbeing follow-up (for option 1)
  if (currentStep === 2 && selectedGoal === 1) {
    return (
      <EnergyWellbeingQuestion
        onBack={() => setCurrentStep(1)}
        onNext={(concerns) => {
          setSelectedConcerns(concerns);
          setCurrentStep(3);
        }}
      />
    );
  }

  // Financial wellbeing follow-up (for option 2)
  if (currentStep === 2 && selectedGoal === 2) {
    return (
      <FinancialWellbeingQuestion
        onBack={() => setCurrentStep(1)}
        onNext={(concerns) => {
          setSelectedConcerns(concerns);
          setCurrentStep(3);
        }}
      />
    );
  }

  // Legal wellbeing follow-up (for option 3)
  if (currentStep === 2 && selectedGoal === 3) {
    return (
      <LegalWellbeingQuestion
        onBack={() => setCurrentStep(1)}
        onNext={(concerns) => {
          setSelectedConcerns(concerns);
          setCurrentStep(3);
        }}
      />
    );
  }

  if (currentStep === 1) {
    return (
      <OnboardingQuestion
        onBack={() => setCurrentStep(0)}
        onNext={(selectedIndex) => {
          setSelectedGoal(selectedIndex);
          setCurrentStep(2);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6 py-8">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="max-w-2xl w-full text-center space-y-3">
          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl text-[#1D1D1F] tracking-tight font-serif">
              Bem-vindo à Melhor Saúde!
            </h1>

            <p className="text-[#86868B] text-xl md:text-2xl leading-relaxed font-serif">
              Queremos ajudá-lo a alcançar o seu melhor bem-estar{' '}
              <br />
              <span className="text-[#4A90E2]">
                físico, mental, financeiro e jurídico
              </span>
              .
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center py-2">
            <ImageWithFallback
              src={logoImage}
              alt="Logo"
              className="w-40 h-40 md:w-56 md:h-56 object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-[#86868B] text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-serif">
            Para começarmos, diga-nos um pouco mais sobre si e sobre o que gostaria de melhorar.
          </p>
        </div>
      </div>

      {/* CTA Button - Bottom Aligned */}
      <div className="w-full flex justify-center pb-4">
        <div className="w-full flex justify-center pb-4">
          <FlowButton text="Começar" onClick={() => setCurrentStep(1)} />
        </div>
      </div>
    </div>
  );
}

