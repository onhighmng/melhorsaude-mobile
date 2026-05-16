import { Package, ShoppingCart, Clock, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SessionsManagerProps {
  onNavigate: (page: string) => void;
}

export function SessionsManager({ onNavigate }: SessionsManagerProps) {
  const availableSessions = 120;
  const totalAcquired = 500;

  return (
    <div className="space-y-6">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Available Sessions Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Clock className="w-8 h-8 text-white/90" />
                <div className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  Ativo
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-emerald-100 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
                  Sessões Disponíveis
                </p>
                <p className="text-5xl" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                  {availableSessions}
                </p>
                <p className="text-emerald-100 text-sm">Prontas a usar.</p>
              </div>
            </div>
          </div>

          {/* Total Acquired Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
                  Total Adquirido
                </p>
                <p className="text-4xl text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                  {totalAcquired}
                </p>
                <p className="text-gray-500 text-sm">Desde o início do contrato.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Action Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200/50 shadow-sm h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 rounded-2xl">
                <ShoppingCart className="w-8 h-8 text-orange-600" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                  Recarregar Impacto
                </h3>
                <p className="text-gray-700 text-lg max-w-xl" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
                  Não deixe a evolução parar.<br />
                  Reforce o saldo para garantir que ninguém fica sem resposta quando mais precisa.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={() => onNavigate('Pacotes')} className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg rounded-full hover:shadow-xl transition-all duration-200 hover:scale-105" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                Adquirir Pacote de Sessões
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}