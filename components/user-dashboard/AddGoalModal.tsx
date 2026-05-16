
import { useState } from 'react';
import { X, Target, Loader2 } from 'lucide-react';
// DISABLED: import from 'sonner';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (goal: {
        goal_description: string;
        pillar_code: string;
    }) => Promise<{ success: boolean; error?: string }>;
}

export function AddGoalModal({ isOpen, onClose, onSave }: AddGoalModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pillar: 'mental', // Default
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            const result = await onSave({
                goal_description: `${formData.title} - ${formData.description}`,
                pillar_code: formData.pillar,
            });

            if (result.success) {
                toast.success('Objetivo criado com sucesso!');
                setFormData({ title: '', description: '', pillar: 'mental' });
                onClose();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Erro ao salvar o objetivo. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-6 md:p-8 overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    disabled={loading}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10 disabled:opacity-50"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-gray-900 m-0 text-2xl font-serif">Novo Objetivo</h2>
                            <p className="text-gray-500 text-sm">Defina uma meta para o seu bem-estar</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Título do Objetivo</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Ex: Dormir 8 horas"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Descrição Detalhada</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Ex: Quero melhorar meu descanso dormindo mais cedo e evitando telas..."
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                            required
                        />
                    </div>

                    {/* Pillar Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Área de Foco</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'mental', label: 'Saúde Mental', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                                { id: 'physical', label: 'Físico', color: 'bg-orange-50 border-orange-200 text-orange-700' },
                                { id: 'financial', label: 'Financeiro', color: 'bg-green-50 border-green-200 text-green-700' },
                                { id: 'legal', label: 'Jurídico', color: 'bg-purple-50 border-purple-200 text-purple-700' },
                            ].map((pillar) => (
                                <button
                                    key={pillar.id}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, pillar: pillar.id }))}
                                    className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${formData.pillar === pillar.id
                                        ? `${pillar.color} border-current ring-1 ring-current`
                                        : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-200'
                                        }`}
                                >
                                    {pillar.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 bg-[#4A90E2] text-white font-medium rounded-xl hover:bg-[#357ABD] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                'Criar Objetivo'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
