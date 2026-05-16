import { useState, useEffect } from 'react';
import { Plus, Download, Sparkles } from 'lucide-react';
import { AnimatedActionButton } from './ui/animated-action-button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VerifiedBadge } from './ui/VerifiedBadge';
import melhorSaudeLogo from '@/assets/company-dashboard/melhor-saude-logo.png';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';

interface Code {
    code: string;
    used: boolean;
}

export function CodeGenerator() {
    const { user } = useAuth();
    const { company } = useCompany();
    const [codes, setCodes] = useState<Code[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(50); // Will be fetched from company
    const remainingCodes = quantity - codes.filter(c => c.used).length;

    useEffect(() => {
        fetchCodes();
    }, [company]);

    const fetchCodes = async () => {
        if (!company) return;

        try {
            const { data, error } = await supabase
                .from('access_codes')
                .select('code, is_used')
                .eq('company_id', company.id as any)
                .eq('role', 'employee');

            if (error) throw error;

            const formattedCodes: Code[] = (data || []).map((c: any) => ({
                code: c.code,
                used: c.is_used || false
            }));

            setCodes(formattedCodes);

            // Get company's allocated quantity (could be from company table)
            setQuantity(company.monthly_total_quota || 50);
        } catch (error) {
            console.error('Error fetching codes:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateRandomCode = (): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

    const generateSingleCode = async () => {
        if (codes.length >= quantity || !company) return;

        const newCode = generateRandomCode();

        try {
            const { error } = await supabase
                .from('access_codes')
                .insert({
                    code: newCode,
                    company_id: company.id,
                    role: 'employee',
                    is_used: false
                } as any);

            if (error) throw error;

            await fetchCodes();
        } catch (error) {
            console.error('Error generating code:', error);
            alert('Erro ao gerar código');
        }
    };

    const generateMultipleCodes = async () => {
        if (codes.length >= quantity || !company) return;

        const codesToGenerate = Math.min(remainingCodes, quantity);
        const newCodes = Array.from({ length: codesToGenerate }, () => generateRandomCode());

        try {
            const codeInserts = newCodes.map(code => ({
                code,
                company_id: company.id,
                role: 'employee',
                is_used: false
            }));

            const { error } = await supabase
                .from('access_codes')
                .insert(codeInserts as any);

            if (error) throw error;

            await fetchCodes();
        } catch (error) {
            console.error('Error generating codes:', error);
            alert('Erro ao gerar códigos');
        }
    };

    const exportCodes = () => {
        const codesText = codes.map(c => c.code).join('\n');
        const blob = new Blob([codesText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'codes.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    const clearCodes = () => {
        setCodes([]);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg text-gray-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                        Gerador de Códigos
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>

                        </span>
                        <ImageWithFallback
                            src={melhorSaudeLogo}
                            alt="Melhor Saúde"
                            className="h-4 w-auto object-contain"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-900" />
                    <span className="text-3xl font-bold text-gray-900 drop-shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {remainingCodes} códigos disponíveis
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
                {/* Generate Buttons Row */}
                <div className="flex gap-2">
                    <AnimatedActionButton
                        onClick={generateSingleCode}
                        icon={Plus}
                        text="Gerar Um Código"
                        confirmationText="Gerado!"
                        disabled={remainingCodes === 0}
                        className="flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-sm"
                    />
                    <AnimatedActionButton
                        onClick={generateMultipleCodes}
                        icon={Sparkles}
                        text={`Gerar Todos (${remainingCodes})`}
                        confirmationText="Gerados!"
                        disabled={remainingCodes === 0}
                        className="flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-sm"
                    />
                </div>

                {/* Export and Clear Buttons */}
                <div className="flex gap-2">
                    <AnimatedActionButton
                        onClick={exportCodes}
                        icon={Download}
                        text="Exportar Códigos"
                        confirmationText="Exportado!"
                        disabled={codes.length === 0}
                        className="flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-sm"
                    />
                    <button
                        onClick={clearCodes}
                        disabled={codes.length === 0}
                        className="px-6 py-3.5 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 rounded-full transition-colors font-medium"
                    >
                        Limpar
                    </button>
                </div>
            </div>

            {/* Codes Display */}
            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Códigos Gerados ({codes.length})
                    </h3>
                </div>

                {codes.length > 0 ? (
                    <div className="bg-gray-50 rounded-xl p-4 max-h-[400px] overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {codes.map((codeObj, index) => (
                                <div
                                    key={index}
                                    className="bg-white px-3 py-2 rounded-lg text-center font-mono text-sm border border-gray-200"
                                >
                                    <div className="flex items-center justify-center gap-1.5">
                                        {codeObj.used && (
                                            <VerifiedBadge />
                                        )}
                                        <span>{codeObj.code}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400">
                        Nenhum código gerado ainda
                    </div>
                )}
            </div>
        </div>
    );
}
