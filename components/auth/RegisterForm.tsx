// DISABLED: import from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import type { useRegister } from '@/hooks/useRegister';

interface RegisterFormProps {
    register: ReturnType<typeof useRegister>;
}

export function RegisterForm({ register }: RegisterFormProps) {
    const {
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
    } = register;

    const roleInfo = getRoleInfo();

    return (
        <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto scrollbar-pill">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <span
                        to="/"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar à página inicial
                    </span>
                    <img
                        src="/lovable-uploads/c207c3c2-eab3-483e-93b6-a55cf5e5fdf2.png"
                        alt="Melhor Saúde Logo"
                        className="w-32 h-32 mx-auto object-contain lg:hidden mb-4"
                    />
                    {codeInfo ? (
                        <>
                            <div className="text-4xl mb-3">{roleInfo?.icon}</div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {roleInfo?.title}
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                {roleInfo?.description}
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Criar Conta
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Introduza o seu código de acesso para começar
                            </p>
                        </>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Access Code Field */}
                        <div>
                            <Label htmlFor="accessCode">Código de Acesso</Label>
                            <div className="relative">
                                <Input
                                    id="accessCode"
                                    value={accessCode}
                                    onChange={(e) => {
                                        const rawValue = e.target.value;
                                        const sanitizedValue = rawValue
                                            .toUpperCase()
                                            .replace(/[^A-Z0-9-]/g, '')
                                            .replace(/-{2,}/g, '-');
                                        setAccessCode(sanitizedValue);
                                    }}
                                    placeholder="HR-ABC1234"
                                    maxLength={14}
                                    className={`pr-10 ${codeInfo && codeInfo.isValid ? 'border-green-500' : codeError ? 'border-red-500' : ''}`}
                                    required
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {isCheckingCode && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
                                    {!isCheckingCode && codeInfo && codeInfo.isValid && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                    {!isCheckingCode && codeError && <XCircle className="h-4 w-4 text-red-500" />}
                                </div>
                            </div>
                            {codeError && <p className="text-sm text-red-500 mt-1">{codeError}</p>}
                            {codeInfo && codeInfo.isValid && (
                                <p className="text-sm text-green-600 mt-1">✓ Código válido</p>
                            )}
                        </div>

                        {/* Only show other fields if code is valid */}
                        {codeInfo && codeInfo.isValid && (
                            <>
                                {/* HR/Company Admin Specific Fields */}
                                {codeInfo.roleType === 'company_admin' && (
                                    <>
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                            <h3 className="font-semibold text-blue-900 mb-2">Dados da Empresa</h3>
                                            <p className="text-sm text-blue-700">Preencha os dados da sua empresa</p>
                                        </div>

                                        <div>
                                            <Label htmlFor="companyName">Nome da Empresa</Label>
                                            <Input
                                                id="companyName"
                                                value={formData.companyName}
                                                onChange={(e) => updateFormData('companyName', e.target.value)}
                                                placeholder="Nome da sua empresa"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="taxId">NUIT (Número de Identificação Fiscal)</Label>
                                            <Input
                                                id="taxId"
                                                value={formData.taxId}
                                                onChange={(e) => updateFormData('taxId', e.target.value)}
                                                placeholder="NUIT da empresa"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Specialist Specific Fields */}
                                {codeInfo.roleType === 'specialist' && (
                                    <>
                                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                                            <h3 className="font-semibold text-purple-900 mb-2">Dados Profissionais</h3>
                                            <p className="text-sm text-purple-700">Preencha as suas credenciais profissionais</p>
                                        </div>

                                        <div>
                                            <Label htmlFor="professionalTitle">Título Profissional</Label>
                                            <Input
                                                id="professionalTitle"
                                                value={formData.professionalTitle}
                                                onChange={(e) => updateFormData('professionalTitle', e.target.value)}
                                                placeholder="Ex: Psicólogo Clínico"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="specialization">Especialização</Label>
                                            <Input
                                                id="specialization"
                                                value={formData.specialization}
                                                onChange={(e) => updateFormData('specialization', e.target.value)}
                                                placeholder="Ex: Terapia Cognitivo-Comportamental"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Common Fields for All Roles */}
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Dados Pessoais</h3>
                                </div>

                                <div>
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => updateFormData('name', e.target.value)}
                                        placeholder="O seu nome completo"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateFormData('email', e.target.value)}
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="password">Palavra-passe</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => updateFormData('password', e.target.value)}
                                            placeholder="Mínimo 8 caracteres"
                                            required
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="phone">Telefone (Opcional)</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateFormData('phone', e.target.value)}
                                        placeholder="+351 912 345 678"
                                    />
                                </div>

                                <div className="flex items-start gap-2 pt-2">
                                    <Checkbox
                                        id="terms"
                                        checked={acceptedTerms}
                                        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                                    />
                                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-tight">
                                        Aceito os <span>Termos e Condições</span> e a Política de Privacidade
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            A criar conta...
                                        </>
                                    ) : (
                                        'Criar Conta'
                                    )}
                                </Button>
                            </>
                        )}
                    </div>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Já tem conta?{' '}
                    <span>
                        Entrar
                    </span>
                </div>
            </div>
        </div>
    );
}
