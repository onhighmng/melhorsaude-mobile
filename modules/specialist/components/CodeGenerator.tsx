import { useState } from 'react';
import { Plus, Download, Sparkles } from 'lucide-react';
import { AnimatedActionButton } from './ui/animated-action-button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VerifiedBadge } from './ui/VerifiedBadge';
import melhorSaudeLogo from '../assets/f066e727bc45a7068fb1f989657736b83adf0448.png';

interface Code {
  code: string;
  used: boolean;
}

export function CodeGenerator() {
  const [codes, setCodes] = useState<Code[]>([]);
  const quantity = 50; // Allocated quantity
  const remainingCodes = quantity - codes.length;

  const generateRandomCode = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const generateSingleCode = () => {
    if (codes.length >= quantity) return;
    const newCode = generateRandomCode();
    // Randomly mark some codes as used for demonstration
    setCodes([...codes, { code: newCode, used: Math.random() > 0.7 }]);
  };

  const generateMultipleCodes = () => {
    if (codes.length >= quantity) return;
    const codesToGenerate = Math.min(remainingCodes, quantity);
    const newCodes = Array.from({ length: codesToGenerate }, () => generateRandomCode());
    // Randomly mark some codes as used for demonstration
    setCodes([...codes, ...newCodes.map(code => ({ code, used: Math.random() > 0.7 }))]);
  };

  const exportCodes = () => {
    const codesText = codes.map(c => c.code).join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'codes.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearCodes = () => {
    setCodes([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg text-gray-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
            Gerador de Códigos
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>

            </span>
            <ImageWithFallback
              src={melhorSaudeLogo}
              alt="Melhor Saúde"
              className="h-4 w-auto object-contain"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700" style={{ fontFamily: 'Inter, sans-serif' }}>
            {remainingCodes} códigos disponíveis
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {/* Generate Buttons Row */}
        <div className="flex gap-2">
          <AnimatedActionButton
            onClick={generateSingleCode}
            icon={Plus}
            text="Gerar Um Código"
            confirmationText="Gerado!"
            disabled={remainingCodes === 0}
            className="flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-sm"
          />
          <AnimatedActionButton
            onClick={generateMultipleCodes}
            icon={Sparkles}
            text={`Gerar Todos (${remainingCodes})`}
            confirmationText="Gerados!"
            disabled={remainingCodes === 0}
            className="flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-sm"
          />
        </div>

        {/* Export and Clear Buttons */}
        <div className="flex gap-2">
          <AnimatedActionButton
            onClick={exportCodes}
            icon={Download}
            text="Exportar Códigos"
            confirmationText="Exportado!"
            disabled={codes.length === 0}
            className="flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-sm"
          />
          <button
            onClick={clearCodes}
            disabled={codes.length === 0}
            className="px-6 py-3.5 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 rounded-full transition-colors font-medium"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Codes Display */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Códigos Gerados ({codes.length})
          </h3>
        </div>

        {codes.length > 0 ? (
          <div className="bg-gray-50 rounded-xl p-4 max-h-[400px] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {codes.map((codeObj, index) => (
                <div
                  key={index}
                  className="bg-white px-3 py-2 rounded-lg text-center font-mono text-sm border border-gray-200"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    {codeObj.used && (
                      <VerifiedBadge />
                    )}
                    <span>{codeObj.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400">
            Nenhum código gerado ainda
          </div>
        )}
      </div>
    </div>
  );
}