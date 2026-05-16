// DISABLED: import from 'framer-motion';
import { Shield, Lock, FileText, AlertTriangle, Scale, Mail, ArrowLeft } from 'lucide-react';
// DISABLED: import from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Privacy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-5xl mx-auto px-6 py-8 pb-24 md:pb-12">
                {/* Back Button */}
                <div


                    className="mb-6"
                >
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Voltar
                    </Button>
                </div>

                {/* Header */}
                <div


                    className="text-center space-y-3 mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center transform rotate-3">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h1 className="text-gray-900 text-3xl md:text-5xl font-bold font-dm-sans tracking-tight">
                        Política de Privacidade
                    </h1>
                    <p className="text-gray-500 font-inter text-lg">
                        Última atualização: {new Date().toLocaleDateString('pt-PT')}
                    </p>
                </div>

                {/* Important Notice */}
                <div



                    className="bg-blue-50/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-200/60 mb-8"
                >
                    <div className="flex gap-4 items-start">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Lock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-blue-900 font-semibold text-lg mb-1 font-dm-sans">O seu direito à privacidade é fundamental</h3>
                            <p className="text-blue-800/80 leading-relaxed font-inter">
                                Esta Política de Privacidade explica como a Melhor Saúde, Limitada recolhe, utiliza, partilha e protege os seus dados pessoais, em estrita conformidade com a <strong>Lei n.º 23/2021 (Proteção de Dados Pessoais)</strong> de Moçambique.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div



                    className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl border border-white/40 space-y-10"
                >
                    {/* Section 1 */}
                    <Section title="1. Enquadramento Legal" icon={<Scale className="w-5 h-5 text-gray-400" />}>
                        <p className="text-gray-600 leading-relaxed">
                            Esta política foi elaborada em estrita conformidade com a legislação aplicável em Moçambique e normas internacionais, incluindo:
                        </p>
                        <ul className="space-y-3 mt-4">
                            <ListItem>
                                <strong>Lei n.º 23/2021:</strong> Lei de Proteção de Dados Pessoais de Moçambique.
                            </ListItem>
                            <ListItem>
                                <strong>Constituição da República de Moçambique:</strong> Artigo 71 (Direito à Privacidade).
                            </ListItem>
                            <ListItem>
                                <strong>Regulamento Geral sobre a Proteção de Dados (RGPD):</strong> Como padrão de boas práticas internacionais.
                            </ListItem>
                        </ul>
                    </Section>

                    <Separator />

                    {/* Section 2 */}
                    <Section title="2. Dados que Recolhemos" icon={<FileText className="w-5 h-5 text-gray-400" />}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                                <h3 className="text-gray-900 font-semibold mb-3 font-dm-sans">2.1 Dados Fornecidos Diretamente</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <ListItem>Informações de registo (Nome, Email, Telefone)</ListItem>
                                    <ListItem>Dados de perfil e preferências</ListItem>
                                    <ListItem>Informações de saúde e bem-estar</ListItem>
                                    <ListItem>Dados de pagamento e faturação</ListItem>
                                </ul>
                            </div>
                            <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                                <h3 className="text-gray-900 font-semibold mb-3 font-dm-sans">2.2 Dados Recolhidos Automaticamente</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <ListItem>Endereço IP e identificadores de dispositivo</ListItem>
                                    <ListItem>Dados de navegação e uso da plataforma</ListItem>
                                    <ListItem>Cookies e tecnologias de rastreamento</ListItem>
                                    <ListItem>Logs de sistema e relatórios de erros</ListItem>
                                </ul>
                            </div>
                        </div>
                    </Section>

                    <Separator />

                    {/* Section 3 */}
                    <Section title="3. Finalidades do Tratamento" icon={<div className="w-2 h-2 rounded-full bg-blue-500" />}>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card title="Prestação de Serviços">
                                Para agendar sessões, fornecer acesso a recursos e gerir a sua conta.
                            </Card>
                            <Card title="Melhoria da Plataforma">
                                Para analisar tendências, desenvolver novas funcionalidades e garantir segurança.
                            </Card>
                            <Card title="Cumprimento Legal">
                                Para cumprir obrigações legais, fiscais e regulatórias vigentes em Moçambique.
                            </Card>
                        </div>
                    </Section>

                    <Separator />

                    {/* Section 4 */}
                    <Section title="4. Partilha de Dados" icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}>
                        <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100">
                            <p className="text-amber-900 mb-3 font-medium">A Melhor Saúde não vende os seus dados pessoais.</p>
                            <p className="text-gray-600 mb-3">Partilhamos informações apenas nas seguintes circunstâncias estritas:</p>
                            <ul className="space-y-2">
                                <ListItem color="amber">Com prestadores de serviços (Especialistas) para consultas.</ListItem>
                                <ListItem color="amber">Com fornecedores técnicos essenciais (sob sigilo).</ListItem>
                                <ListItem color="amber">Quando exigido por lei ou ordem judicial.</ListItem>
                            </ul>
                        </div>
                    </Section>

                    <Separator />

                    {/* Section 6 */}
                    <Section title="6. Os Seus Direitos" icon={<Shield className="w-5 h-5 text-gray-400" />}>
                        <p className="text-gray-600 mb-6">
                            Nos termos da Lei de Proteção de Dados de Moçambique, tem direito a:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <ListItem><strong>Acesso:</strong> Solicitar cópia dos seus dados.</ListItem>
                                <ListItem><strong>Retificação:</strong> Corrigir dados imprecisos.</ListItem>
                                <ListItem><strong>Apagamento:</strong> Solicitar eliminação ("Direito a ser esquecido").</ListItem>
                            </div>
                            <div className="space-y-2">
                                <ListItem><strong>Limitação:</strong> Restringir o tratamento.</ListItem>
                                <ListItem><strong>Portabilidade:</strong> Receber os dados em formato estruturado.</ListItem>
                                <ListItem><strong>Oposição:</strong> Opor-se a determinados tratamentos.</ListItem>
                            </div>
                        </div>
                    </Section>

                    <Separator />

                    {/* Contact */}
                    <Section title="9. Contactos" icon={<Mail className="w-5 h-5 text-gray-400" />}>
                        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                            <p className="text-gray-600 mb-4">Para exercer os seus direitos ou esclarecer dúvidas, contacte-nos:</p>
                            <div className="space-y-2">
                                <p className="font-medium text-gray-900">Email: <span className="text-blue-600 font-normal">privacidade@melhorsaude.co.mz</span></p>
                                <p className="font-medium text-gray-900">Endereço: <span className="text-gray-600 font-normal">[Endereço da Sede], Moçambique</span></p>
                            </div>
                        </div>
                    </Section>
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-400">© {new Date().getFullYear()} Melhor Saúde Limitada. Todos os direitos reservados.</p>
                </div>

            </div>
        </div>
    );
}

// Subcomponents for cleaner code
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h2 className="text-2xl font-bold text-gray-900 font-dm-sans">{title}</h2>
            </div>
            <div className="pl-2 font-inter">
                {children}
            </div>
        </section>
    );
}

function ListItem({ children, color = "blue" }: { children: React.ReactNode, color?: "blue" | "amber" }) {
    const bulletColors = {
        blue: "bg-blue-500",
        amber: "bg-amber-500"
    };

    return (
        <li className="flex items-start gap-3">
            <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${bulletColors[color]}`} />
            <span className="text-gray-600 leading-relaxed">{children}</span>
        </li>
    );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2 font-dm-sans">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
        </div>
    );
}

function Separator() {
    return <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />;
}
