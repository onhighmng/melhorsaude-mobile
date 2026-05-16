import { cn } from "./utils";
import Frame from '../../imports/Frame2147239078';
import HeaderSection from './header-section-responsive';
import { TeamBarChart } from '../team-bar-chart';
import { TeamRadialChart } from '../team-radial-chart';
import { useSpecialistBookings, Booking } from '@/hooks/useSpecialistBookings';

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
  sessionsData?: { used: number; total: number };
  textColor?: string;
  bookings?: Booking[];
}

const BentoCard = (props: BentoCardProps) => {
  const {
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
    textColor = 'text-white',
  } = props;
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
        <p className={cn("text-sm text-center leading-tight font-bold", textColor)}>{subtitle}</p>
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
          <TeamRadialChart bookings={props.bookings} />
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
                    <div className="text-5xl font-bold font-manrope">
                      {sessionsData.used} / {sessionsData.total}
                    </div>
                    <div className="text-sm mt-1 opacity-90">sessões</div>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-bold font-manrope">
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

export const ColorfulBentoGrid = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { bookings, loading } = useSpecialistBookings();

  return (
    <section className="bg-white rounded-3xl p-4 xl:p-8 my-16 max-w-6xl xl:max-w-[1200px] mx-auto xl:scale-[1.12] xl:origin-top">
      {/* Header Section */}
      <div className="relative my-12 h-[174px] mb-8">
        <HeaderSection />
        {/* Profile pill positioned top right */}
        <button
          onClick={() => onNavigate('Colaboradores')}
          className="absolute -top-4 right-0 px-5 py-2 bg-blue-900 text-white text-sm font-semibold rounded-full hover:bg-blue-800 transition-colors duration-200 z-50"
        >
          O Meu Perfil
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:items-start md:justify-start gap-4">
        <BentoCard
          title="Linha de Apoio"
          subtitle="Atenda pedidos de voz em tempo real."
          bgColor="bg-[#A01C1C]"
          rotation="-rotate-1"
          hoverScale="md:hover:scale-105"
          hoverRotation="hover:rotate-1"
          className="md:col-span-2"
          onClick={() => onNavigate('GestaoEmpresas')}
          showGraph={true}
        />



        <BentoCard
          title="Histórico e Clima"
          subtitle="Registo de consultas, notas e o 'mood' das empresas."
          bgColor="bg-[#EAE8DC]"
          textColor="text-gray-800"
          image="https://images.unsplash.com/photo-1633613286991-611fe299c4be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXZlJTIwc3RhciUyMHJhdGluZyUyMHJldmlld3xlbnwxfHx8fDE3NjYzMjk0Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          rotation="rotate-6"
          hoverScale="md:hover:scale-105"
          hoverRotation="hover:rotate-3"
          onClick={() => onNavigate('RedeEspecialistas')}
        />

        <BentoCard
          title="Próximas Sessões"
          subtitle="Prepare e inicie as suas consultas agendadas."
          bgColor="bg-[#EAE8DC]"
          textColor="text-gray-800"
          rotation="-rotate-3"
          hoverScale="md:hover:scale-105"
          hoverRotation="hover:-rotate-3"
          onClick={() => onNavigate('AgendaGlobal')}
          showRadialChart={true}
          bookings={bookings}
        />

        <BentoCard
          title="O Meu Estado"
          subtitle="Defina quando está disponível para receber chamadas."
          bgColor="bg-[#EAE8DC]"
          textColor="text-gray-800"
          image="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHBsYW5uaW5nfGVufDF8fHx8MTc2NjE3MzM1MXww&ixlib=rb-4.1.0&q=80&w=1080"
          rotation="rotate-6"
          hoverScale="md:hover:scale-105"
          hoverRotation="hover:rotate-4"
          onClick={() => onNavigate('AuditoriaLogs')}
        />

        <div className="h-[330px] relative rounded-xl">
          <Frame />
        </div>
      </div>
    </section>
  );
};