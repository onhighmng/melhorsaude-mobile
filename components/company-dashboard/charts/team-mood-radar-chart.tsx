import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface TeamMoodRadarChartProps {
    data?: {
        score: number;
        current: number;
        previous: number;
    }[];
    totalEmployees?: number;
    currentScore?: number;
}

export function TeamMoodRadarChart({ data = [], totalEmployees = 0, currentScore = 0 }: TeamMoodRadarChartProps) {
    // We need to map the numeric scores (1-5) to the visual order and emojis
    // DB: 1=Very Sad, 2=Angry, 3=Neutral, 4=Happy, 5=Very Happy

    const moodConfig: Record<number, { emoji: string; label: string }> = {
        1: { emoji: '😡', label: 'Irritado' },
        2: { emoji: '🙁', label: 'Triste' },
        3: { emoji: '😐', label: 'Neutro' },
        4: { emoji: '😊', label: 'Feliz' },
        5: { emoji: '😃', label: 'Muito Feliz' },
    };

    // Sort data to be [5, 4, 3, 2, 1] for visual layout if Recharts starts top
    const processedData = [5, 4, 3, 2, 1].map(score => {
        const found = data.find(d => d.score === score);
        return {
            subject: moodConfig[score].emoji,
            fullLabel: moodConfig[score].label,
            A: found?.current ?? 0, // Current Month
            B: found?.previous ?? 0, // Previous Month
            fullMark: 100
        };
    });

    const CustomTick = ({ payload, x, y, textAnchor }: any) => {
        return (
            <g className="recharts-layer recharts-polar-angle-axis-tick">
                <text
                    x={x}
                    y={y}
                    dy={payload.value === '😃' ? -10 : 5}
                    textAnchor={textAnchor}
                    fill="#666"
                    fontSize="24px"
                >
                    {payload.value}
                </text>
            </g>
        );
    };

    return (
        <div className="bg-[#111111] rounded-3xl p-6 shadow-sm h-full flex flex-col text-white relative overflow-hidden" style={{ minHeight: '400px' }}>
            {/* Header */}
            <div className="flex justify-between items-start mb-2 z-10">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Estado Emocional da Equipa
                    </h2>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {totalEmployees} colaboradores
                    </p>
                </div>

                {/* Score Badge */}
                <div className="bg-[#1C1C1E] rounded-2xl p-3 flex flex-col items-center justify-center min-w-[80px]">
                    <span className="text-gray-400 text-xs mb-1">Atual</span>
                    <span className="text-3xl mb-1">
                        {currentScore >= 4.5 ? '😃' : currentScore >= 3.5 ? '😊' : currentScore >= 2.5 ? '😐' : currentScore >= 1.5 ? '🙁' : '😡'}
                    </span>
                    <span className="text-white font-bold text-lg">{currentScore.toFixed(1)}/5</span>
                </div>
            </div>

            {/* Chart */}
            <div className="flex-1 w-full min-h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={processedData}>
                        <PolarGrid gridType="polygon" stroke="#333" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={<CustomTick />}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 'auto']}
                            tick={false}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* Previous Month - Gray Outline */}
                        <Radar
                            name="Mês Anterior"
                            dataKey="B"
                            stroke="#6B7280"
                            strokeWidth={2}
                            fill="#6B7280"
                            fillOpacity={0.1}
                        />

                        {/* Current Month - Blue Filled */}
                        <Radar
                            name="Mês Atual"
                            dataKey="A"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fill="#3B82F6"
                            fillOpacity={0.5}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-2 text-sm z-10">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                    <span className="text-gray-300">Mês Atual</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#6B7280]"></span>
                    <span className="text-gray-300">Mês Anterior</span>
                </div>
            </div>
        </div>
    );
}
