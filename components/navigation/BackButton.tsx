
import React from 'react';
// DISABLED: import from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className = '' }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log('🔙 Navigating back to Minha Saúde');
    navigate('/user/dashboard');
  };

  return (
    <button 
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      Voltar à Minha Saúde
    </button>
  );
};

export default BackButton;
