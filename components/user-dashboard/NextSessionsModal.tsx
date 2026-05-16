import { Calendar, Clock, User, Video, X } from 'lucide-react';

interface NextSessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NextSessionsModal({ isOpen, onClose }: NextSessionsModalProps) {
  if (!isOpen) return null;

  const upcomingSessions = [
    { 
      id: 1, 
      title: 'Assistência Financeira', 
      time: '14:00',
      date: '15/11/2025',
      doctor: 'Dra. Ana Costa',
      type: 'Zoom',
      icon: '💰',
      color: '#9E9E9E'
    },
    { 
      id: 2, 
      title: 'Saúde Mental', 
      time: '10:30',
      date: '20/11/2025',
      doctor: 'Dr. João Silva',
      type: 'Zoom',
      icon: '🧠',
      color: '#9E9E9E'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h2 className="text-gray-900 m-0 text-3xl font-serif">
            Próximas Sessões
          </h2>
          <p className="text-gray-600 mt-2">
            {upcomingSessions.length} {upcomingSessions.length === 1 ? 'sessão agendada' : 'sessões agendadas'}
          </p>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div 
              key={session.id}
              className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0"
                  style={{ backgroundColor: session.color }}
                >
                  <span className="text-2xl">{session.icon}</span>
                </div>

                {/* Session Info */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-gray-900 m-0">{session.title}</h3>
                  
                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 text-sm">{session.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 text-sm">{session.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 text-sm">{session.doctor}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 text-sm">{session.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state (if no sessions) */}
        {upcomingSessions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Nenhuma sessão agendada</p>
            <p className="text-gray-500 text-sm mt-1">Agende uma sessão para começar</p>
          </div>
        )}
      </div>
    </div>
  );
}