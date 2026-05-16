import { ArrowLeft, Check, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCompany } from '@/contexts/CompanyContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PackageOption {
    id: string;
    name: string;
    sessions: number;
    price: number;
    features: string[];
    popular?: boolean;
}

export function Pacotes({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { t } = useLanguage();
    const { company } = useCompany();
    const [currentPlan, setCurrentPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const packages: PackageOption[] = [
        {
            id: 'starter',
            name: 'Starter',
            sessions: 50,
            price: 499,
            features: [
                '50 sessões mensais',
                'Acesso a todos os pilares',
                'Suporte por email',
                'Relatórios básicos'
            ]
        },
        {
            id: 'professional',
            name: 'Professional',
            sessions: 150,
            price: 1299,
            features: [
                '150 sessões mensais',
                'Acesso a todos os pilares',
                'Suporte prioritário',
                'Relatórios avançados',
                'Gestor de conta dedicado'
            ],
            popular: true
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            sessions: 500,
            price: 3999,
            features: [
                '500 sessões mensais',
                'Acesso a todos os pilares',
                'Suporte 24/7',
                'Relatórios personalizados',
                'Gestor de conta dedicado',
                'Sessões ilimitadas sob consulta'
            ]
        }
    ];

    useEffect(() => {
        const fetchCurrentPlan = async () => {
            if (!company?.id) return;

            try {
                setCurrentPlan({
                    sessions: (company as any).monthly_total_quota || 0,
                    name: 'Current Plan'
                });
            } catch (error) {
                console.error('Error fetching plan:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentPlan();
    }, [company]);

    const handleSelectPackage = (pkg: PackageOption) => {
        alert(`Selecionou o pacote ${pkg.name}. Funcionalidade de pagamento em desenvolvimento.`);
    };

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen">
            <button
                onClick={() => onNavigate('Dashboard')}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('nav.back')}</span>
            </button>

            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Pacifico, cursive' }}>
                    Pacotes de Sessões
                </h1>
                <p className="text-gray-600 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Escolha o pacote ideal para a sua empresa
                </p>
            </div>

            {!loading && currentPlan && (
                <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Plano Atual
                        </CardTitle>
                        <CardDescription>
                            {currentPlan.sessions} sessões mensais
                        </CardDescription>
                    </CardHeader>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <Card
                        key={pkg.id}
                        className={`relative ${pkg.popular ? 'border-blue-500 border-2 shadow-lg' : 'border-gray-200'}`}
                    >
                        {pkg.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                Mais Popular
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {pkg.name}
                            </CardTitle>
                            <CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-gray-900">€{pkg.price}</span>
                                    <span className="text-gray-600">/mês</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 mb-6">
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={() => handleSelectPackage(pkg)}
                                className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                            >
                                Selecionar Pacote
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                    <CardTitle>Precisa de um plano personalizado?</CardTitle>
                    <CardDescription>
                        Entre em contacto connosco para discutir as necessidades específicas da sua empresa
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="border-purple-500 text-purple-700 hover:bg-purple-100">
                        Contactar Equipa
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
