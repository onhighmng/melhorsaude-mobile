import { useState, useEffect } from 'react';
// DISABLED: import from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useAccessCode } from "@/hooks/useAccessCode";
import { logger } from '@/utils/logger';
import { supabase } from '@/lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';
import { sendWelcomeEmail } from '@/lib/emailNotifications';

export interface CodeInfo {
    roleType: string | null;
    metadata: any;
    isValid: boolean;
    isUsed?: boolean;
    isExpired?: boolean;
}

interface CompanyRpcResult {
    success: boolean;
    company_id?: string;
    error?: string;
}

interface RedemptionState {
    success: boolean;
    role?: string | null;
    redirectPath?: string | null;
    companyId?: string | null;
    error?: string;
}

export function useRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        companyName: '',
        taxId: '',
        professionalTitle: '',
        specialization: ''
    });

    const [accessCode, setAccessCode] = useState('');
    const [codeInfo, setCodeInfo] = useState<CodeInfo | null>(null);
    const [isCheckingCode, setIsCheckingCode] = useState(false);
    const [codeError, setCodeError] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { toast } = useToast();
    const { signUp, refreshProfile } = useAuth();
    const { getCodeInfo, redeemCode } = useAccessCode();

    // Validate access code
    useEffect(() => {
        if (accessCode.length >= 7) {
            checkAccessCode();
        } else {
            setCodeInfo(null);
            setCodeError('');
        }
    }, [accessCode]);

    const checkAccessCode = async () => {
        setIsCheckingCode(true);
        setCodeError('');

        try {
            const info = await getCodeInfo(accessCode);

            if (!info) {
                setCodeError('Código inválido');
                setCodeInfo(null);
                return;
            }

            if (!info.isValid) {
                if (info.isUsed) {
                    setCodeError('Este código já foi utilizado');
                } else if (info.isExpired) {
                    setCodeError('Este código expirou');
                } else {
                    setCodeError('Código inválido');
                }
                setCodeInfo(null);
                return;
            }

            // Valid code!
            setCodeInfo(info);
            setCodeError('');
        } catch (error) {
            logger.error('Error checking access code:', error);
            setCodeError('Erro ao validar código');
            setCodeInfo(null);
        } finally {
            setIsCheckingCode(false);
        }
    };

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Get role-specific title and description
    const getRoleInfo = () => {
        if (!codeInfo) return null;

        switch (codeInfo.roleType) {
            case 'company_admin':
                return {
                    title: 'Registo de Responsável de RH',
                    description: 'Preencha os dados da sua empresa e as suas informações pessoais',
                    icon: '🏢'
                };
            case 'specialist':
                return {
                    title: 'Registo de Especialista',
                    description: 'Preencha as suas informações profissionais',
                    icon: '👨‍⚕️'
                };
            case 'user':
                return {
                    title: 'Registo de Colaborador',
                    description: 'Preencha os seus dados pessoais',
                    icon: '👤'
                };
            default:
                return {
                    title: 'Criar Conta',
                    description: 'Preencha os seus dados para criar uma nova conta',
                    icon: '📝'
                };
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate access code
        if (!accessCode || !codeInfo || !codeInfo.isValid) {
            toast({
                title: "Código de Acesso Obrigatório",
                description: "Por favor, introduza um código de acesso válido.",
                variant: "destructive"
            });
            return;
        }

        if (!acceptedTerms) {
            toast({
                title: "Termos e Condições",
                description: "Por favor, aceite os Termos e Condições para continuar.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            logger.info('Starting registration process');

            // Step 1: Create auth account
            const signUpMetadata: Record<string, unknown> = {
                // SECURITY: Role is handled by backend logic, not client
                access_code: accessCode || undefined,
                company_id: codeInfo?.metadata?.company_id ?? undefined,
            };

            if (formData.professionalTitle) {
                signUpMetadata.professional_title = formData.professionalTitle;
            }

            if (formData.specialization) {
                signUpMetadata.specialization = formData.specialization;
            }

            const { error: signUpError } = await signUp(
                formData.email,
                formData.password,
                formData.name,
                formData.phone,
                signUpMetadata
            );

            if (signUpError) {
                // Check if user already exists
                if (signUpError.message?.includes('already registered') ||
                    signUpError.message?.includes('User already registered') ||
                    signUpError.status === 422) {
                    toast({
                        title: "Email Já Registado",
                        description: "Este email já está registado. Por favor, faça login ou use um email diferente.",
                        variant: "destructive"
                    });
                } else {
                    toast({
                        title: "Erro no Registo",
                        description: signUpError.message || "Não foi possível criar a conta. Por favor, tente novamente.",
                        variant: "destructive"
                    });
                }
                setIsLoading(false);
                return;
            }

            logger.info('Auth account created successfully');

            // Step 2: Get the new user's profile ID
            await refreshProfile();

            // Wait longer for profile to be created by trigger
            await new Promise(resolve => setTimeout(resolve, 2500));

            // Get user ID from Supabase auth
            const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

            if (userError || !currentUser) {
                throw new Error('Não foi possível obter o utilizador autenticado');
            }

            logger.debug('Retrieved user ID', { userId: currentUser.id });

            // Verify profile exists before proceeding
            const { data: profileCheck, error: profileError } = await (supabase
                .from('profiles') as any)
                .select('id')
                .eq('id', currentUser.id)
                .maybeSingle();

            if (profileError || !profileCheck) {
                logger.warn('Profile not found, retrying...', { userId: currentUser.id });
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Retry once
                const { data: profileRetry } = await (supabase
                    .from('profiles') as any)
                    .select('id')
                    .eq('id', currentUser.id)
                    .maybeSingle();

                if (!profileRetry) {
                    throw new Error('Perfil não foi criado. Por favor, tente fazer login.');
                }
            }

            logger.debug('Profile verified successfully');

            let redemptionResult: RedemptionState | null = null;
            let companyId: string | null = null;
            let redirectPath = '/user/dashboard';

            if (codeInfo?.roleType === 'company_admin') {
                logger.info('Creating company for admin');
                const rpcResponse = await supabase.rpc(
                    'create_company_for_admin',
                    {
                        p_company_name: formData.companyName,
                        p_tax_id: formData.taxId || null,
                        p_email: formData.email,
                        p_phone: formData.phone,
                        p_employee_seats: codeInfo.metadata?.seats || 50,
                        p_sessions_per_employee: codeInfo.metadata?.sessions
                            ? Math.floor(codeInfo.metadata.sessions / (codeInfo.metadata.seats || 1))
                            : 4,
                        p_user_id: currentUser.id,
                        p_access_code: accessCode
                    }
                );

                const companyResult = (rpcResponse?.data ?? null) as CompanyRpcResult | null;
                const companyRpcError = rpcResponse?.error as PostgrestError | null;

                if (companyRpcError || !companyResult?.success) {
                    logger.error('Failed to create company', { error: companyRpcError || companyResult?.error });
                    toast({
                        title: "Erro ao criar empresa",
                        description:
                            companyRpcError?.message ||
                            companyResult?.error ||
                            "Não foi possível criar a empresa automaticamente. Por favor, contacte suporte.",
                        variant: "destructive"
                    });
                    setIsLoading(false);
                    return;
                }

                logger.info('Company created successfully', { companyId: companyResult?.company_id });
                companyId = companyResult?.company_id ?? null;
                redirectPath = '/company/dashboard';

                if (companyId) {
                    const companyUpdatePayload: Record<string, unknown> = {
                        company_name: formData.companyName,
                        tax_id: formData.taxId || null,
                        email: formData.email,
                        phone: formData.phone,
                        updated_at: new Date().toISOString()
                    };

                    const { error: companyUpdateError } = await (supabase
                        .from('companies') as any)
                        .update(companyUpdatePayload)
                        .eq('id', companyId);

                    if (companyUpdateError) {
                        logger.error('Failed to update company data', { error: companyUpdateError });
                    } else {
                        logger.debug('Company data updated with HR info');
                    }

                    const { error: linkError } = await (supabase
                        .from('company_employees') as any)
                        .upsert(
                            {
                                company_id: companyId,
                                user_id: currentUser.id,
                                role: 'member',
                                is_active: true
                            },
                            { onConflict: 'company_id,user_id' }
                        );

                    if (linkError) {
                        logger.error('Failed to link HR to company employees', { error: linkError });
                    } else {
                        logger.debug('HR linked to company employees successfully');
                    }
                }

                redemptionResult = {
                    success: true,
                    role: 'company_admin',
                    redirectPath,
                    companyId
                };
            } else {
                logger.info('Redeeming access code');
                const redeemResult = await redeemCode(accessCode, currentUser.id);

                if (!redeemResult.success) {
                    toast({
                        title: "Erro ao Resgatar Código",
                        description: redeemResult.error || "Não foi possível resgatar o código de acesso.",
                        variant: "destructive"
                    });
                    setIsLoading(false);
                    return;
                }

                logger.info('Access code redeemed successfully', { role: redeemResult.role });
                redemptionResult = {
                    success: redeemResult.success,
                    role: redeemResult.role ?? null,
                    redirectPath: redeemResult.redirectPath ?? null,
                    companyId: redeemResult.companyId ?? null,
                    error: redeemResult.error
                };

                companyId = redemptionResult.companyId ?? null;
                redirectPath = redemptionResult.redirectPath || redirectPath;
            }

            if (codeInfo?.roleType === 'specialist' && formData.professionalTitle) {
                logger.info('Creating specialist record');

                // Check if specialist record already exists to avoid duplicate key constraint violation
                const { data: existingSpecialist } = await (supabase
                    .from('specialists') as any)
                    .select('id')
                    .eq('user_id', currentUser.id)
                    .maybeSingle();

                if (existingSpecialist) {
                    logger.debug('Specialist record already exists, skipping creation');
                } else {
                    const { error: specialistError } = await (supabase
                        .from('specialists') as any)
                        .insert({
                            user_id: currentUser.id,
                            professional_title: formData.professionalTitle,
                            bio: formData.specialization || null,
                            is_active: true,
                            is_accepting_new_clients: true
                        })
                        .select()
                        .single();

                    if (specialistError) {
                        logger.error('Failed to create specialist record', { error: specialistError });
                    } else {
                        logger.info('Specialist record created successfully');
                    }
                }

                // Update profile role regardless of whether specialist record was just created
                const { error: specialistProfileError } = await (supabase
                    .from('profiles') as any)
                    .update({
                        primary_role: 'specialist',
                        onboarding_completed: true,
                        onboarding_completed_at: new Date().toISOString()
                    })
                    .eq('id', currentUser.id);

                if (specialistProfileError) {
                    logger.error('Failed to update specialist profile', { error: specialistProfileError });
                } else {
                    logger.debug('Specialist profile updated with role and onboarding status');
                }
            }

            // Check if quota was already allocated by redemption process
            const { data: existingQuota, error: quotaCheckError } = await (supabase
                .from('user_personal_quotas') as any)
                .select('user_id, total_sessions, sessions_used')
                .eq('user_id', currentUser.id)
                .maybeSingle();

            if (quotaCheckError) {
                logger.error('Error checking quota', { error: quotaCheckError });
            }

            if (!existingQuota) {
                const { error: quotaError } = await (supabase
                    .from('user_personal_quotas') as any)
                    .insert({
                        user_id: currentUser.id,
                        total_sessions: 0,
                        sessions_used: 0
                    });

                if (quotaError) {
                    logger.error('Failed to initialize quota', { error: quotaError });
                } else {
                    logger.warn('User quota initialized to 0 - no quota allocated during redemption', {
                        userId: currentUser.id,
                        email: currentUser.email
                    });
                }
            } else {
                logger.info('Quota already allocated - preserving allocated sessions', {
                    totalSessions: existingQuota.total_sessions,
                    sessionsUsed: existingQuota.sessions_used,
                    userId: currentUser.id
                });
            }

            // Step 5: Refresh profile to get updated data
            await refreshProfile();

            // Wait a bit for profile to be fully loaded
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Step 5.5: For regular users, check if onboarding is needed
            // Onboarding flow disabled
            if (redemptionResult?.role === 'user' || (!redemptionResult?.role && codeInfo?.roleType === 'user')) {
                // Check skipped, redirectPath remains /user/dashboard
            }

            toast({
                title: "Registo Concluído! 🎉",
                description: `Conta criada como ${getRoleInfo()?.title}. A redirecionar...`
            });

            // Send welcome email (asynchronous)
            sendWelcomeEmail(formData.email, formData.name, redemptionResult?.role || codeInfo?.roleType || 'user')
                .then(result => {
                    if (result.success) {
                        logger.info('Welcome email sent successfully');
                    } else {
                        logger.error('Failed to send welcome email', { error: result.error });
                    }
                })
                .catch(err => logger.error('Error invoking welcome email', { error: err }));

            // Step 6: Route to appropriate dashboard or onboarding
            setTimeout(() => {
                logger.debug('Routing after registration', { path: redirectPath, role: redemptionResult?.role });
                navigate(redirectPath, { replace: true });
            }, 1500);

        } catch (error) {
            logger.error('Registration failed', { error });
            toast({
                title: "Erro no Registo",
                description: "Ocorreu um erro. Por favor, tente novamente.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        updateFormData,
        accessCode,
        setAccessCode,
        codeInfo,
        isCheckingCode,
        codeError,
        acceptedTerms,
        setAcceptedTerms,
        isLoading,
        showPassword,
        setShowPassword,
        handleSubmit,
        getRoleInfo
    };
}
