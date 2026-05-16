import { useState } from 'react';
// import { Sidebar } from '@/components/admin/Sidebar';
import { BottomNav } from '@/components/admin/BottomNav';
import { DashboardContent } from '@/components/admin/DashboardContent';
import { Colaboradores } from '@/components/admin/pages/Colaboradores';
import { AgendaGlobal } from '@/components/admin/pages/AgendaGlobal';
import { RedeEspecialistas } from '@/components/admin/pages/RedeEspecialistas';
import { GestaoEmpresas } from '@/components/admin/pages/GestaoEmpresas';
import { AuditoriaLogs } from '@/components/admin/pages/AuditoriaLogs';
import { Pacotes } from '@/components/admin/pages/Pacotes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
// import { Navigate } from 'react-router-dom';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { loadingAnimationConfig } from '@/components/LoadingAnimationConfig';

export default function AdminDashboard() {
  const { user, profile, loading } = useAuth();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6">
        <LoadingAnimation
          variant="inline"
          message="A inicializar a área da administração..."
          submessage="Estamos a preparar os seus dados"
          mascotSrc={loadingAnimationConfig.mascot}
          wordmarkSrc={loadingAnimationConfig.wordmark}
          primaryColor={loadingAnimationConfig.primaryColor}
          textColor={loadingAnimationConfig.textColor}
          showProgress
        />
      </div>
    );
  }

  if (!user || profile?.primary_role !== 'admin') {
    // Optional: Add strict check, though layout usually handles redirect
    // return <Navigate to="/login" replace />;
  }

  const pageBackgroundColor = 'bg-white';

  return (
    <LanguageProvider>
      <div className={`flex h-screen ${pageBackgroundColor} overflow-hidden font-sans`}>
        {/* Desktop Sidebar */}
        {/* Desktop Sidebar Removed */}
        {/* <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} /> */}

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto pb-24 md:pb-0 ${pageBackgroundColor}`}>
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
}

