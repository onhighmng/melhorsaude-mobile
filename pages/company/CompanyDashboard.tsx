import { useState } from 'react';
import { Sidebar } from '@/components/company/Sidebar';
import { BottomNav } from '@/components/company/BottomNav';
import { DashboardContent } from '@/components/company/DashboardContent';
import { Colaboradores } from '@/components/company/Colaboradores';
import { Recursos } from '@/components/company/Recursos';
import { Relatorios } from '@/components/company/Relatorios';
import { Sessoes } from '@/components/company/Sessoes';
import { Pacotes } from '@/components/company/Pacotes';
import { Suporte } from '@/components/company/Suporte';
import { Termos } from '@/components/company/Termos';

export default function CompanyDashboard() {
    const [currentPage, setCurrentPage] = useState('Dashboard');

    const renderContent = () => {
        switch (currentPage) {
            case 'Dashboard':
                return <DashboardContent onNavigate={setCurrentPage} />;
            case 'Colaboradores':
                return <Colaboradores onNavigate={setCurrentPage} />;
            case 'Recursos':
                return <Recursos onNavigate={setCurrentPage} />;
            case 'Relatórios e Impacto':
                return <Relatorios onNavigate={setCurrentPage} />;
            case 'Sessões':
                return <Sessoes onNavigate={setCurrentPage} />;
            case 'Pacotes':
                return <Pacotes onNavigate={setCurrentPage} />;
            case 'Suporte':
                return <Suporte />;
            case 'Termos':
                return <Termos />;
            default:
                return <DashboardContent onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="flex h-screen bg-[#e8f0f2] overflow-hidden">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto font-sans">
                {renderContent()}
            </main>
        </div>
    );
}
