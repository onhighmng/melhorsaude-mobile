import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Building2, Users, X, Check } from 'lucide-react';

interface GenerateCodeModalProps {
  type: 'hr' | 'affiliate' | 'on-duty';
  onClose: () => void;
}

export default function GenerateCodeModal({ type, onClose }: GenerateCodeModalProps) {
  const [seats, setSeats] = useState<string>('');
  const [sessions, setSessions] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleGenerate = () => {
    if (!seats || !sessions) return;

    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const newCode = generateRandomCode();
      setGeneratedCode(newCode);
      setIsGenerating(false);
    }, 800);
  };

  const handleClose = () => {
    setSeats('');
    setSessions('');
    setGeneratedCode(null);
    setIsGenerating(false);
    onClose();
  };

  const isHR = type === 'hr';
  const isAffiliate = type === 'affiliate';
  const isOnDuty = type === 'on-duty';
  
  const primaryColor = isHR ? '#007AFF' : isOnDuty ? '#AF52DE' : '#FF9500';
  const Icon = isHR ? Building2 : Users;
  const title = isHR ? 'Gerar Código HR' : isOnDuty ? 'Gerar Código Profissional de Permanência' : 'Gerar Código Prestador';
  const seatsLabel = isHR ? 'Número de Colaboradores' : 'Número de Profissionais';

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-2xl w-full h-auto max-h-[90vh] overflow-y-auto p-0 gap-0"
        style={{ backgroundColor: '#ffffff' }}
      >
        <DialogTitle className="sr-only">
          {title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {isHR ? 'Configure o acesso para a empresa' : 'Configure o acesso para o prestador'}
        </DialogDescription>
        
        <div className="relative">
          {/* Header */}
          <div 
            className="p-8 pb-12 text-white relative overflow-hidden"
            style={{ backgroundColor: primaryColor }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white mb-1">{title}</h2>
                <p className="text-white/90 text-sm">
                  {isHR ? 'Configure o acesso para a empresa' : 'Configure o acesso para o prestador'}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 pt-6">
            {!generatedCode ? (
              <>
                <div className="mb-8">
                  <p className="text-gray-600 mb-6">
                    {isHR 
                      ? 'Defina quantos colaboradores poderão utilizar a plataforma e o número total de sessões disponíveis para a empresa.'
                      : isOnDuty
                        ? 'Defina o número de profissionais de permanência e sessões que poderão realizar.'
                        : 'Defina o número de profissionais e sessões que este prestador poderá atender.'
                    }
                  </p>

                  <div className="space-y-6">
                    {/* Seats/Collaborators Input */}
                    <div>
                      <Label htmlFor="seats" className="text-gray-900 mb-2 block">
                        {seatsLabel}
                      </Label>
                      <div className="relative">
                        <Input
                          id="seats"
                          type="number"
                          min="1"
                          placeholder="Ex: 50"
                          value={seats}
                          onChange={(e) => setSeats(e.target.value)}
                          className="text-lg h-14 pl-12 bg-gray-50 border-gray-200 rounded-xl"
                        />
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {isHR 
                          ? 'Número máximo de colaboradores que podem se registar'
                          : 'Quantidade de profissionais que podem ser cadastrados'
                        }
                      </p>
                    </div>

                    {/* Sessions Input */}
                    <div>
                      <Label htmlFor="sessions" className="text-gray-900 mb-2 block">
                        Número de Sessões
                      </Label>
                      <div className="relative">
                        <Input
                          id="sessions"
                          type="number"
                          min="1"
                          placeholder="Ex: 500"
                          value={sessions}
                          onChange={(e) => setSessions(e.target.value)}
                          className="text-lg h-14 pl-12 bg-gray-50 border-gray-200 rounded-xl"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 5V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {isHR 
                          ? 'Total de sessões disponíveis para todos os colaboradores'
                          : 'Número de sessões que o prestador poderá realizar'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div 
                  className="rounded-2xl p-4 mb-6"
                  style={{ backgroundColor: isHR ? '#e8f4ff' : isOnDuty ? '#f4e6ff' : '#fff9e6' }}
                >
                  <div className="flex gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-1">Importante</h4>
                      <p className="text-gray-700 text-sm">
                        {isHR 
                          ? 'Após gerar o código, ele será válido por tempo indeterminado até ser usado. O responsável HR da empresa usará este código para registar a empresa.'
                          : 'O código gerado será enviado ao prestador para que ele possa se registar na plataforma e começar a atender.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={!seats || !sessions || isGenerating}
                    className="flex-1 h-12 rounded-xl text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {isGenerating ? 'Gerando...' : 'Gerar Código'}
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center py-8">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Check className="w-10 h-10" style={{ color: primaryColor }} />
                  </div>

                  <h3 className="text-gray-900 mb-2">Código Gerado com Sucesso!</h3>
                  <p className="text-gray-600 mb-8">
                    O código de acesso foi criado e está pronto para uso
                  </p>

                  {/* Generated Code Display */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <Label className="text-gray-600 text-sm mb-3 block">Código de Acesso</Label>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <code 
                        className="text-3xl tracking-wider px-6 py-3 rounded-xl border-2"
                        style={{ 
                          backgroundColor: 'white',
                          borderColor: primaryColor,
                          color: primaryColor
                        }}
                      >
                        {generatedCode}
                      </code>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">{seatsLabel}</p>
                        <p className="text-gray-900">{seats}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm mb-1">Sessões</p>
                        <p className="text-gray-900">{sessions}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleClose}
                    className="w-full h-12 rounded-xl text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Concluir
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
