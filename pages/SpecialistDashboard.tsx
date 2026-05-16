import { useState } from 'react';
import { BottomNav } from '../modules/specialist/components/BottomNav';
import { DashboardContent } from '../modules/specialist/components/DashboardContent';
import { Colaboradores } from '../modules/specialist/components/pages/Colaboradores';
import { AgendaGlobal } from '../modules/specialist/components/pages/AgendaGlobal';
import { RedeEspecialistas } from '../modules/specialist/components/pages/RedeEspecialistas';
import { GestaoEmpresas } from '../modules/specialist/components/pages/GestaoEmpresas';
import { AuditoriaLogs } from '../modules/specialist/components/pages/AuditoriaLogs';
import { Pacotes } from '../modules/specialist/components/pages/Pacotes';
import { LanguageProvider } from '../modules/specialist/contexts/LanguageContext';
import { useEffect } from 'react';

export default function SpecialistDashboard() {
  // Inject specialist.css preventing build conflicts (Tailwind v4 vs v3)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = '/css/specialist.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'Colaboradores':
        return <Colaboradores onNavigate={setCurrentPage} />;
      case 'AgendaGlobal':
        return <AgendaGlobal onNavigate={setCurrentPage} />;
      case 'RedeEspecialistas':
        return <RedeEspecialistas onNavigate={setCurrentPage} />;
      case 'GestaoEmpresas':
        return <GestaoEmpresas onNavigate={setCurrentPage} />;
      case 'AuditoriaLogs':
        return <AuditoriaLogs onNavigate={setCurrentPage} />;
      case 'Pacotes':
        return <Pacotes onNavigate={setCurrentPage} />;
      default:
        return <DashboardContent onNavigate={setCurrentPage} />;
    }
  };

  const pageBackgroundColor = currentPage === 'AgendaGlobal'
    ? 'bg-black'
    : currentPage === 'AuditoriaLogs'
      ? 'bg-[#F5F3EE]'
      : 'bg-[#e8f0f2]';

  return (
    <LanguageProvider>
      <div className={`flex h-screen ${pageBackgroundColor} overflow-hidden specialist-dashboard-root`}>
        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto pb-24 ${pageBackgroundColor}`}>
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation - Note: Intentionally hidden on desktop via CSS in BottomNav component itself */}
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
}
