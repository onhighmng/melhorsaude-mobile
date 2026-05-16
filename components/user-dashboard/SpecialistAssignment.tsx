import { ArrowLeft, Star } from 'lucide-react';

interface SpecialistAssignmentProps {
  pillarType: 'mental' | 'fisico' | 'financeira' | 'juridica';
  onBack: () => void;
  onRequestSession: (type: 'video' | 'phone') => void;
}

const specialistData = {
  mental: {
    name: "Dra. Ana Silva",
    title: "Psicologia Clínica",
    rating: 4.8,
    experience: 8
  },
  fisico: {
    name: "Dr. João Santos",
    title: "Medicina Desportiva",
    rating: 4.9,
    experience: 12
  },
  financeira: {
    name: "Dra. Maria Costa",
    title: "Consultoria Financeira",
    rating: 4.7,
    experience: 10
  },
  juridica: {
    name: "Dr. Pedro Alves",
    title: "Direito Civil",
    rating: 4.8,
    experience: 15
  }
};

export function SpecialistAssignment({ 
  pillarType,
  onBack,
  onRequestSession
}: SpecialistAssignmentProps) {
  
  const specialist = specialistData[pillarType];
  
  const handleSessionType = (type: 'video' | 'phone') => {
    console.log('Selected session type:', type);
    // Here you would typically proceed to booking confirmation
    onRequestSession(type);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-gray-900 mb-1 text-4xl font-serif">Especialista Atribuido</h1>
            <p className="text-gray-600">Encontrámos o especialista ideal para si</p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-gray-200 pl-4 pr-2 pt-4 pb-4 md:pl-6 md:pr-3 md:pt-6 md:pb-6 mb-12 max-w-lg mx-auto">
          {/* Success Message */}
          <div className="flex items-start gap-2 mb-4 pb-4 border-b border-gray-100 justify-center text-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-gray-900 mb-0.5">Correspondência encontrada</h2>
              <p className="text-gray-600">Conectamos você com nosso especialista</p>
            </div>
          </div>

          {/* Specialist Card */}
          <div className="flex items-start gap-4 justify-center">
            {/* Logo/Avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 flex flex-col items-center justify-center border border-blue-100">
                <svg className="w-8 h-8 text-blue-600 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs text-blue-600 font-medium">HORSAI</span>
              </div>
            </div>

            {/* Specialist Info */}
            <div className="flex-1 text-left max-w-[200px]">
              <h3 className="text-gray-900 mb-0.5">{specialist.name}</h3>
              <p className="text-blue-500 mb-2">{specialist.title}</p>
              
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{specialist.rating}</span>
                </div>
                <div>
                  <span>{specialist.experience} anos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Type Selection */}
        <div className="text-center">
          <h2 className="text-gray-900 mb-6">Como prefere ter a sua sessão?</h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleSessionType('video')}
              className="group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-gray-300 bg-white px-8 py-3 text-gray-900 cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[28px] active:scale-[0.95] w-full sm:w-auto min-w-[200px]"
            >
              <span className="relative z-[1] transition-all duration-[800ms] ease-out mx-auto">
                Online (vídeo)
              </span>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-[50%] opacity-0 group-hover:w-[280px] group-hover:h-[280px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
            </button>

            <button
              onClick={() => handleSessionType('phone')}
              className="group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-gray-300 bg-white px-8 py-3 text-gray-900 cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[28px] active:scale-[0.95] w-full sm:w-auto min-w-[200px]"
            >
              <span className="relative z-[1] transition-all duration-[800ms] ease-out mx-auto">
                Telefone
              </span>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-[50%] opacity-0 group-hover:w-[280px] group-hover:h-[280px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}