import { X, Star, Mail, Building2, Calendar, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  pilar: string;
  pilarColor: string;
  lastSession: string;
  rating: number;
  notes: string;
  conversationHistory?: {
    progress: number;
    canContact: boolean;
  };
  internalNotes?: {
    specialist: string;
    date: string;
    note: string | null;
    [key: string]: any; // Allow extra fields
  }[];
}

interface UserDetailsModalProps {
  user?: User | null;
  onClose: () => void;
  onViewHistory: () => void;
}

export function UserDetailsModal({ user, onClose, onViewHistory }: UserDetailsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  if (!user) {
    return null;
  }

  const userInitial = user.name?.trim()?.charAt(0)?.toUpperCase() ?? 'U';
  const userRating = typeof user.rating === 'number' ? user.rating : 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : star - 0.5 === rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
              }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${isVisible ? 'bg-black/50' : 'bg-black/0'
        }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full h-full lg:max-w-3xl lg:max-h-[90vh] overflow-y-auto scrollbar-pill transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-gray-900">Detalhes do Utilizador</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* User Header Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl">{userInitial}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{user.name}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${user.pilarColor}`}>
                    {user.pilar}
                  </span>
                  <div className="flex items-center gap-2">
                    {renderStars(userRating > 5 ? userRating / 2 : userRating)}
                    <span className="text-sm text-gray-600">{(userRating > 5 ? userRating / 2 : userRating).toFixed(1)}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-gray-900 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
              Informações de Contato
            </h4>
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <p className="text-gray-900 break-all">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Empresa</p>
                  <p className="text-gray-900">{user.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Última Sessão</p>
                  <p className="text-gray-900">{user.lastSession}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="space-y-3">
            <h4 className="text-gray-900 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
              Notas Internas
            </h4>
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{user.notes}</p>
              </div>
            </div>
          </div>

          {/* Specialist Notes */}
          {user.internalNotes && user.internalNotes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-gray-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                Histórico de Notas do Especialista
              </h4>
              <div className="space-y-3">
                {user.internalNotes.map((note, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <p className="text-sm text-gray-900">{note.specialist}</p>
                      <span className="text-sm text-gray-500">• {note.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={onViewHistory}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Ver Chat Histórico Completo
          </button>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-5 rounded-b-3xl">
          <button
            onClick={handleClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition-colors flex items-center justify-center"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}