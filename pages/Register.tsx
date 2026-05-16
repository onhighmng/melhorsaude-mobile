import { useState, useEffect } from 'react';
// DISABLED: import from 'react-router-dom';
import { useRegister } from '@/hooks/useRegister';
import { RegisterAccessCode } from '@/components/auth/RegisterAccessCode';
import { RegisterDetails } from '@/components/auth/RegisterDetails';

export default function Register() {
  const navigate = useNavigate();
  const registerState = useRegister();
  const {
    accessCode,
    setAccessCode,
    codeInfo,
    isCheckingCode,
    codeError,
    formData,
    updateFormData,
    handleSubmit,
    isLoading,
    acceptedTerms,
    setAcceptedTerms
  } = registerState;

  // View state: 'access-code' or 'details'
  const [view, setView] = useState<'access-code' | 'details'>('access-code');

  // Handle validating code and potentially moving to details view
  const handleValidateCode = () => {
    if (codeInfo && codeInfo.isValid) {
      setView('details');
    }
    // If not valid, the UI displays the error from codeError automatically
  };

  // Watch for valid code
  useEffect(() => {
    if (codeInfo && codeInfo.isValid) {
      // Optional: Auto-advance or just let user click validate.
      // For now, we wait for user to click validate as per Figma design.
    }
  }, [codeInfo]);

  // Handle back button from Details view
  const handleBackToCode = () => {
    setView('access-code');
    // Optionally clear code? No, keep it.
  };

  if (view === 'access-code') {
    return (
      <RegisterAccessCode
        accessCode={accessCode}
        setAccessCode={setAccessCode}
        isValid={!!codeInfo?.isValid}
        isChecking={isCheckingCode}
        error={codeError}
        onValidate={handleValidateCode}
        onBack={() => navigate('/')}
        onLogin={() => navigate('/login')}
      />
    );
  }

  return (
    <RegisterDetails
      role={codeInfo?.roleType || 'user'}
      formData={formData}
      updateFormData={updateFormData}
      onSubmit={handleSubmit}
      onBack={handleBackToCode}
      isLoading={isLoading}
      acceptedTerms={acceptedTerms}
      setAcceptedTerms={setAcceptedTerms}
    />
  );
}
