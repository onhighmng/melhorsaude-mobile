import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/specialist/components/ui/table';
import { useSpecialistFeedback } from '@/hooks/useSpecialistFeedback';
import { format } from 'date-fns';
import { Star, Loader2, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SpecialistFeedbackTableProps {
    specialistId?: string;
    isAdmin?: boolean;
    showFilters?: boolean;
}

export function SpecialistFeedbackTable({ specialistId, isAdmin = false, showFilters = false }: SpecialistFeedbackTableProps) {
    const { t } = useLanguage();
    const { feedbacks, loading, refetch } = useSpecialistFeedback();
    const [companyFilter, setCompanyFilter] = useState<string>('all');

    useEffect(() => {
        // If specialistId changed (or initially), refetch
        // If specialistId is undefined, refetch() defaults to current user (ideal for specialist view)
        refetch({ specialistId });
    }, [specialistId, refetch]);

    const uniqueCompanies = Array.from(new Set(feedbacks.map(f => f.booking?.user?.company?.company_name).filter(Boolean))) as string[];

    const filteredFeedbacks = feedbacks.filter(f => {
        if (companyFilter === 'all') return true;
        return f.booking?.user?.company?.company_name === companyFilter;
    });

    const getShortPillarName = (pillar: string | undefined) => {
        if (!pillar) return 'Geral';
        const pillarLower = pillar.toLowerCase();

        if (pillarLower.includes('mind') || pillarLower.includes('mental') || pillarLower.includes('psych')) {
            return t('pillar.mentalShort') || 'Mental';
        } else if (pillarLower.includes('body') || pillarLower.includes('físic') || pillarLower.includes('physical')) {
            return t('pillar.physicalShort') || 'Físico';
        } else if (pillarLower.includes('financial') || pillarLower.includes('financ')) {
            return t('pillar.financialShort') || 'Financeiro';
        } else if (pillarLower.includes('legal') || pillarLower.includes('juríd') || pillarLower.includes('apoio')) {
            return t('pillar.legalShort') || 'Jurídico';
        }
        return pillar;
    };

    const getPillarColor = (pillar: string | undefined) => {
        if (!pillar) return 'bg-gray-100 text-gray-800';
        const pillarLower = pillar.toLowerCase();

        if (pillarLower.includes('mind') || pillarLower.includes('mental') || pillarLower.includes('psych')) {
            return 'bg-blue-100 text-blue-800';
        } else if (pillarLower.includes('body') || pillarLower.includes('físic') || pillarLower.includes('physical')) {
            return 'bg-yellow-100 text-yellow-800';
        } else if (pillarLower.includes('financial') || pillarLower.includes('financ')) {
            return 'bg-green-100 text-green-800';
        } else if (pillarLower.includes('legal') || pillarLower.includes('juríd')) {
            return 'bg-purple-100 text-purple-800';
        }
        return 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (feedbacks.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                Ainda não existem feedbacks registrados.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {showFilters && (
                <div className="flex justify-end">
                    <Select value={companyFilter} onValueChange={setCompanyFilter}>
                        <SelectTrigger className="w-[200px] h-9 text-xs">
                            <Filter className="w-3 h-3 mr-2" />
                            <SelectValue placeholder="Filtrar por empresa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as empresas</SelectItem>
                            {uniqueCompanies.map(company => (
                                <SelectItem key={company} value={company}>
                                    {company}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="text-gray-900 font-manrope font-bold text-xs">Colaborador</TableHead>
                            <TableHead className="text-gray-900 font-manrope font-bold text-xs">Empresa</TableHead>
                            <TableHead className="text-gray-900 font-manrope font-bold text-xs">Pilar</TableHead>
                            <TableHead className="text-gray-900 font-manrope font-bold text-xs">Data & Hora</TableHead>
                            <TableHead className="text-gray-900 font-manrope font-bold text-xs">Classificação</TableHead>
                            {isAdmin && (
                                <TableHead className="text-gray-900 font-manrope font-bold text-xs">Comentário</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredFeedbacks.map((feedback) => (
                            <TableRow key={feedback.id} className="hover:bg-gray-50/50">
                                <TableCell className="font-inter font-semibold text-xs py-3">
                                    {feedback.booking?.user?.full_name || 'Utilizador'}
                                </TableCell>
                                <TableCell className="font-inter text-xs py-3">
                                    {feedback.booking?.user?.company?.company_name || '-'}
                                </TableCell>
                                <TableCell className="font-inter py-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium ${getPillarColor(feedback.booking?.primary_pillar || undefined)}`}>
                                        {getShortPillarName(feedback.booking?.primary_pillar || undefined)}
                                    </span>
                                </TableCell>
                                <TableCell className="font-inter text-[#6b7280] text-xs py-3">
                                    {feedback.booking ? format(new Date(`${feedback.booking.booking_date}T${feedback.booking.start_time}`), "dd/MM/yyyy HH:mm") : '-'}
                                </TableCell>
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-inter font-semibold text-[#374151] text-xs">
                                            {(feedback.rating > 5 ? feedback.rating / 2 : feedback.rating).toFixed(1)}/5
                                        </span>
                                    </div>
                                </TableCell>
                                {isAdmin && (
                                    <TableCell className="font-inter text-[#6b7280] text-xs max-w-[200px] truncate py-3" title={feedback.positive_feedback || ''}>
                                        {feedback.positive_feedback || '-'}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
