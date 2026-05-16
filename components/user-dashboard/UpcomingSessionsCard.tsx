import { Circle, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { SessionModal } from './SessionModal';

interface UpcomingSessionsCardProps {
  onRebook?: (sessionTitle: string) => void;
}

export function UpcomingSessionsCard({ onRebook }: UpcomingSessionsCardProps) {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  
  const [sessions, setSessions] = useState([
    { 
      id: 1, 
      title: 'Assistência Financeira', 
      time: '14:00',
      date: '15/11/2025',
      doctor: 'Dra. Ana Costa',
      type: 'Zoom',
      icon: '💰',
      bgColor: 'bg-gray-100',
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
      bgColor: 'bg-gray-100',
      color: '#9E9E9E'
    },
    { 
      id: 3, 
      title: 'Bem-Estar Físico', 
      time: '16:15',
      date: '07/11/2025',
      doctor: 'Dr. Carlos Santos',
      type: 'Zoom',
      icon: '☂️',
      bgColor: 'bg-yellow-100',
      color: '#F4C430'
    },
  ]);

  const handleCancelSession = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFF5D6] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-6">
          {/* Header */}
          <h3 className="text-gray-900 font-bold">Próximas Sessões</h3>

          {/* Sessions List */}
          <div className="space-y-3">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className="w-full flex items-center justify-between p-3 bg-white/50 rounded-2xl hover:bg-white/80 transition-colors group relative"
              >
                <div 
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => setSelectedSession(session)}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full ${session.bgColor} flex items-center justify-center text-sm`}>
                    {session.icon}
                  </div>
                  
                  {/* Session Info */}
                  <div className="text-gray-900 text-sm font-medium">{session.title}</div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Time Badge */}
                  <div className="text-gray-600 text-xs font-semibold">
                    {session.time}
                  </div>

                  {/* Cancel Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelSession(session.id);
                    }}
                    className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            {sessions.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">Sem sessões agendadas.</p>
            )}
          </div>
        </div>
      </div>

      {/* Session Modal */}
      <SessionModal 
        isOpen={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        session={selectedSession || sessions[0]}
        onRebook={() => {
          if (onRebook && selectedSession) {
            onRebook(selectedSession.title);
            setSelectedSession(null);
          }
        }}
        onCancel={() => handleCancelSession(selectedSession?.id)}
      />
    </>
  );
}