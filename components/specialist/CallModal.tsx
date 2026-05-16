import { X, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CallModalProps {
  userName: string;
  userPhone: string;
  userCompany: string;
  userEmail: string;
  onClose: () => void;
}

export function CallModal({ userName, userPhone, userCompany, userEmail, onClose }: CallModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
        isVisible ? 'bg-black/50' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-md transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900">{userCompany || 'Empresa não disponível'}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center">
          {/* Phone Icon */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Phone className="w-10 h-10 text-blue-500" />
          </div>

          {/* User Name */}
          <h3 className="text-gray-900 mb-2 text-center">{userName || 'Utilizador sem nome'}</h3>

          {/* Phone Number */}
          {userPhone ? (
            <a
              href={`tel:${userPhone}`}
              className="text-blue-500 hover:text-blue-600 text-center transition-colors"
            >
              {userPhone}
            </a>
          ) : (
            <p className="text-gray-500 text-center">Telefone não disponível</p>
          )}

          {/* User Email */}
          {userEmail ? (
            <a
              href={`mailto:${userEmail}`}
              className="text-blue-500 hover:text-blue-600 text-center transition-colors break-all"
            >
              {userEmail}
            </a>
          ) : (
            <p className="text-gray-500 text-center">Email não disponível</p>
          )}
        </div>
      </div>
    </div>
  );
}