import { X } from 'lucide-react';
// DISABLED: import from 'framer-motion';
import { Button } from "@/components/ui/button";

interface RequestCallModalProps {
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export function RequestCallModal({ onClose, onConfirm, isLoading = false }: RequestCallModalProps) {
    return (
        
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                {/* Backdrop */}
                <div



                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <div



                    className="relative w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>

                    <div className="p-6 pt-8 text-center space-y-4">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 font-dm-sans">
                            Solicitar Apoio Imediato
                        </h3>

                        <p className="text-gray-500 font-inter leading-relaxed">
                            Deseja solicitar uma chamada urgente com um dos nossos especialistas? Alguém entrará em contacto consigo o mais brevemente possível.
                        </p>

                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="flex-1 h-12 rounded-xl text-gray-600 font-medium"
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={onConfirm}
                                className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-200"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Solicitando...
                                    </div>
                                ) : (
                                    "Solicitar Agora"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        
    );
}
