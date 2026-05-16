import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function HistoryPage({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { user } = useAuth();
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0, companies: 0, mood: '😊' });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                // Get specialist ID
                const { data: specialistData } = await supabase
                    .from('specialists')
                    .select('id')
                    .eq('user_id', user.id)
                    .single();

                if (!specialistData) return;

                const { data, error } = await supabase
                    .from('bookings')
                    .select(`
                        id,
                        booking_date,
                        start_time,
                        topic,
                        user_notes,
                        status,
                        profile:profiles!bookings_user_id_fkey (
                            full_name,
                            company:companies (
                                company_name
                            )
                        )
                    `)
                    .eq('specialist_id', specialistData.id)
                    .eq('status', 'completed')
                    .order('booking_date', { ascending: false });

                if (error) throw error;

                const mapped = (data || []).map((booking: any) => ({
                    id: booking.id,
                    colaborador: booking.profile?.full_name || 'Utilizador',
                    empresa: booking.profile?.company?.company_name || 'Particular',
                    data: booking.booking_date,
                    hora: booking.start_time.slice(0, 5),
                    tema: booking.topic || 'Geral',
                    mood: '😊',
                    notas: booking.user_notes || 'Sem notas.'
                }));

                setHistoryData(mapped);

                // Calculate Stats
                const uniqueCompanies = new Set(mapped.map((d: any) => d.empresa)).size;
                setStats({
                    total: mapped.length,
                    companies: uniqueCompanies,
                    mood: '😊'
                });

            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, [user]);

    const filteredData = historyData.filter(item =>
        item.colaborador.toLowerCase().includes(filter.toLowerCase()) ||
        item.empresa.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen bg-white md:bg-transparent">
            <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
            </button>

            <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4 md:gap-8">
                <div>
                    <h1 className="text-3xl md:text-4xl text-[#1a1a1a] font-pacifico">
                        Histórico e Clima
                    </h1>
                    <p className="text-gray-600 mt-2 font-inter">
                        Consulte as suas sessões passadas e o 'mood' reportado.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-md">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Sessões</h3>
                        <p className="text-4xl font-bold text-green-600">{stats.total}</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-md">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Empresas Atendidas</h3>
                        <p className="text-4xl font-bold text-blue-600">{stats.companies}</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-none shadow-md">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Mood Médio</h3>
                        <p className="text-4xl font-bold text-orange-600">{stats.mood}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Registo de Sessões</h2>
                    <input
                        type="text"
                        placeholder="Filtrar por nome ou empresa..."
                        className="px-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Colaborador</TableHead>
                                <TableHead>Empresa</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Tema</TableHead>
                                <TableHead>Mood</TableHead>
                                <TableHead>Notas</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((session) => (
                                <TableRow key={session.id} className="hover:bg-gray-50/50">
                                    <TableCell className="font-medium text-gray-900">{session.colaborador}</TableCell>
                                    <TableCell>{session.empresa}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{session.data}</span>
                                            <span className="text-xs text-gray-500">{session.hora}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                                            {session.tema}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-lg">{session.mood}</TableCell>
                                    <TableCell className="max-w-[300px] truncate text-gray-500 italic">
                                        "{session.notas}"
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
