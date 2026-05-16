import { Calendar, Clock, User, Video, X } from 'lucide-react';
import { useState } from 'react';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    title: string;
    date: string;
    time: string;
    doctor: string;
    type: string;
    icon: string;
    color: string;
  };
  onRebook?: () => void;
  onCancel?: () => void;
}

export function SessionModal({ isOpen, onClose, session, onRebook, onCancel }: SessionModalProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  
  if (!isOpen) return null;

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setShowCancelConfirm(false);
    onClose();
  };

  const handleCancelDismiss = () => {
    setShowCancelConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title Section */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0"
            style={{ backgroundColor: session.color }}
          >
            <span className="text-3xl">{session.icon}</span>
          </div>
          <h2 className="text-gray-900 m-0 text-3xl font-serif">
            {session.title}
          </h2>
        </div>

        {/* Session Details - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-3xl">
            <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{session.date}</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-3xl">
            <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{session.time}</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-3xl">
            <User className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{session.doctor}</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-3xl">
            <Video className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{session.type}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="flex-1 py-3 px-4 bg-[#E3F2FD] text-[#1565C0] rounded-3xl hover:bg-[#BBDEFB] transition-colors text-center"
            onClick={onRebook}
          >
            Reagendar
          </button>
          <button className="flex-1 py-3 px-4 bg-[#E8F5E9] text-[#388E3C] rounded-3xl hover:bg-[#C8E6C9] transition-colors text-center">
            Entrar
          </button>
          <button className="flex-1 py-3 px-4 bg-[#FFEBEE] text-[#D32F2F] rounded-3xl hover:bg-[#FFCDD2] transition-colors text-center" onClick={handleCancelClick}>
            Cancelar
          </button>
        </div>

        {/* Cancel Confirmation */}
        {showCancelConfirm && (
          <div className="absolute inset-0 bg-white rounded-3xl flex items-center justify-center p-6">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto">
                <X className="w-8 h-8 text-[#D32F2F]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-gray-900 m-0">Cancelar Sessão</h3>
                <p className="text-gray-600 text-sm">Tem certeza de que deseja cancelar esta sessão?</p>
              </div>
              <div className="flex gap-3">
                <button 
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-3xl hover:bg-gray-200 transition-colors" 
                  onClick={handleCancelDismiss}
                >
                  Não
                </button>
                <button 
                  className="flex-1 py-3 px-4 bg-[#FFEBEE] text-[#D32F2F] rounded-3xl hover:bg-[#FFCDD2] transition-colors" 
                  onClick={handleConfirmCancel}
                >
                  Sim, Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}