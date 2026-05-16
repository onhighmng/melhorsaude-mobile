import { cn } from "./utils";
import { Brain, Users, BookOpen, Calendar } from 'lucide-react';
import Frame from '../imports/Frame2147239078';
import HeaderSection from '../imports/Frame2147239083-109-899';
import { TeamBarChart } from '../../company/team-bar-chart';
import { TeamRadialChart } from '../../company/team-radial-chart';
import specialistsImage from '@/assets/company-dashboard/melhor-saude-logo.png';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

interface BentoCardProps {
  title: string;
  subtitle: string;
  bgColor: string;
  image?: string;
  rotation: string;
  hoverScale: string;
  hoverRotation: string;
  className?: string;
  onClick: () => void;
  showGraph?: boolean;
  showRadialChart?: boolean;
  sessionsData?: { used: number; total?: number };
}

const BentoCard = ({
  title,
  subtitle,
  bgColor,
  image,
  rotation,
  hoverScale,
  hoverRotation,
  className,
  onClick,
  showGraph = false,
  showRadialChart = false,
  sessionsData,
}: BentoCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "overflow-hidden transition-all duration-200 ease-in-out h-[330px] relative rounded-xl flex flex-col items-center justify-center gap-6 px-5 py-6 cursor-pointer",
        bgColor,
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-1 z-10">
        <p className="text-sm text-white text-center leading-tight font-bold">{subtitle}</p>
        <h3
          className="text-2xl font-semibold text-center px-6 py-2 bg-white/90 text-[#0F1419] rounded-full whitespace-nowrap"
        >
          {title}
        </h3>
      </div>

      {showGraph ? (
        <div className="w-full h-40 rounded-xl overflow-hidden flex items-center justify-center" style={{ minHeight: '160px', minWidth: '200px' }}>
          <TeamBarChart />
        </div>
      ) : showRadialChart ? (
        <div className="w-full h-40 rounded-xl overflow-hidden flex items-center justify-center" style={{ minHeight: '160px', minWidth: '200px' }}>
          <TeamRadialChart />
        </div>
      ) : (
        <div className="w-full h-40 rounded-xl overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {sessionsData && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="text-white text-center">
                {sessionsData.total ? (
                  <>
                    <div className="text-5xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {sessionsData.used} / {sessionsData.total}
                    </div>
                    <div className="text-sm mt-1 opacity-90">sessões</div>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {sessionsData.used}
                    </div>
                    <div className="text-sm mt-1 opacity-90">especialistas</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </button>
  );
};

export const ColorfulBentoGrid = ({ onNavigate, className }: { onNavigate: (page: string) => void; className?: string }) => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalSpecialists: 4,
    totalUsers: 0,
    totalSessions: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total companies
        const { count: companiesCount } = await supabase
          .from('companies')
          .select('*', { count: 'exact', head: true });

        // Fetch total specialists
        const { count: specialistsCount } = await supabase
          .from('specialists')
          .select('*', { count: 'exact', head: true });

        // Fetch total users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch total bookings
        const { count: sessionsCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalCompanies: companiesCount || 0,
          totalSpecialists: specialistsCount || 0,
          totalUsers: usersCount || 0,
          totalSessions: sessionsCount || 0
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="bg-white rounded-3xl p-4 xl:p-8 my-16 max-w-6xl xl:max-w-[1200px] mx-auto xl:scale-[1.12] xl:origin-top">
      {/* Header Section */}
      <div className="relative my-12 h-[174px] mb-32">
        <HeaderSection />
        {/* Profile pill positioned top right */}
        <button
          onClick={() => onNavigate('Colaboradores')}
          className="absolute -top-4 right-0 px-5 py-2 bg-blue-900 text-white text-sm font-semibold rounded-full hover:bg-blue-800 transition-colors duration-200"
        >
          O Meu Perfil
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:items-start md:justify-start gap-4">
        <BentoCard
          title="Gestão de Empresas"
          subtitle="Criar contas, atribuir vagas e carregar sessões."
          bgColor="bg-[#0F1419]"
          rotation="-rotate-1"
          hoverScale="md:hover:scale-105"
          hoverRotation="hover:rotate-1"
          className="md:col-span-2"
          onClick={() => onNavigate('GestaoEmpresas')}
          showGraph={true}
        />

        <BentoCard
          title="Rede de Especialistas"
          subtitle="Gerir corpo clínico, credenciais e convites."
          bgColor="bg-[#0F1419]"
          image={specialistsImage}
          rotation="rotate-6"
          hoverScale="md:hover:scale-105"
          hoverRotation="hover:rotate-3"
          onClick={() => onNavigate('RedeEspecialistas')}
          sessionsData={{ used: stats.totalSpecialists }}
        />

        <BentoCard
          title="Agenda Global"
          subtitle="Monitorizar todas as marcações em tempo real."
          bgColor="bg-[#0F1419]"
          rotation="-rotate-3"
          hoverScale="md:hover:scale-105"
          hoverRotation="hover:-rotate-3"
          onClick={() => onNavigate('AgendaGlobal')}
          showRadialChart={true}
        />

        <BentoCard
          title="Biblioteca de Recursos"
          subtitle="Central de gestão de conteúdos pedagógicos e ferramentas de apoio."
          bgColor="bg-[#0F1419]"
          image="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHBsYW5uaW5nfGVufDF8fHx8MTc2NjE3MzM1MXww&ixlib=rb-4.1.0&q=80&w=1080"
          rotation="rotate-6"
          hoverScale="md:hover:scale-105"
          hoverRotation="hover:rotate-4"
          onClick={() => onNavigate('AuditoriaLogs')}
        />

        <div className="h-[330px] relative rounded-xl overflow-hidden">
          <Frame />
        </div>
      </div>
    </section>
  );
};
