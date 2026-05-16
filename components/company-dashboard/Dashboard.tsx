import { BottomNav } from './components/BottomNav';
// import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';
import { Colaboradores } from './pages/Colaboradores';
import { Recursos } from './pages/Recursos';
import { Sessoes } from './pages/Sessoes';
import { Relatorios } from './pages/Relatorios';
import { Pacotes } from './pages/Pacotes';
import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'Colaboradores':
        return <Colaboradores onNavigate={setCurrentPage} />;
      case 'Recursos':
        return <Recursos onNavigate={setCurrentPage} />;
      case 'Sessões':
        return <Sessoes onNavigate={setCurrentPage} />;
      case 'Relatórios e Impacto':
        return <Relatorios onNavigate={setCurrentPage} />;
      case 'Pacotes':
        return <Pacotes onNavigate={setCurrentPage} />;
      default:
        return <DashboardContent onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-[#e8f0f2] overflow-hidden">
        {/* Helper Sidebar for Desktop - REMOVED */}
        {/* <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} /> */}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
}
