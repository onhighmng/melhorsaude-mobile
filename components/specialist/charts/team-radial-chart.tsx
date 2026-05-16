"use client";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export function TeamRadialChart() {
    // Sample calendar data - showing appointments per day
    const calendarData = [
        { day: 1, appointments: 0 },
        { day: 2, appointments: 2 },
        { day: 3, appointments: 0 },
        { day: 4, appointments: 0 },
        { day: 5, appointments: 0 },
        { day: 6, appointments: 1 },
        { day: 7, appointments: 0 },
        { day: 8, appointments: 3 },
        { day: 9, appointments: 0 },
        { day: 10, appointments: 0 },
        { day: 11, appointments: 0 },
        { day: 12, appointments: 0 },
        { day: 13, appointments: 0 },
        { day: 14, appointments: 0 },
        { day: 15, appointments: 1 },
        { day: 16, appointments: 0 },
        { day: 17, appointments: 4 },
        { day: 18, appointments: 0 },
        { day: 19, appointments: 0 },
        { day: 20, appointments: 0 },
        { day: 21, appointments: 5 },
        { day: 22, appointments: 0 },
        { day: 23, appointments: 0 },
        { day: 24, appointments: 0 },
        { day: 25, appointments: 0 },
        { day: 26, appointments: 0 },
        { day: 27, appointments: 0 },
        { day: 28, appointments: 0 },
        { day: 29, appointments: 0 },
        { day: 30, appointments: 1 },
    ];

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    return (
        <div className="w-full h-full flex items-center justify-center min-h-[160px] bg-[#0F1419] p-2 rounded-lg">
            <div className="w-full h-full flex flex-col gap-0.5">
                {/* Header with month */}
                <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-[10px] font-bold">MAI</span>
                </div>

                {/* Week day headers */}
                <div className="grid grid-cols-7 gap-0.5 mb-0.5">
                    {weekDays.map((day, i) => (
                        <div key={i} className="text-center text-white/60 text-[7px] font-semibold">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid - showing full month */}
                <div className="grid grid-cols-7 gap-0.5 flex-1">
                    {/* Empty cells for days before month starts (starting on Wed) */}
                    <div className="bg-white/5 rounded-sm"></div>
                    <div className="bg-white/5 rounded-sm"></div>
                    <div className="bg-white/5 rounded-sm"></div>

                    {/* All 30 days */}
                    {calendarData.map((data) => (
                        <div
                            key={data.day}
                            className="bg-white/10 rounded-sm flex items-center justify-center relative text-white text-[7px] font-semibold min-h-[16px]"
                        >
                            {data.day}
                            {data.appointments > 0 && (
                                <div className="absolute bottom-[1px] right-[1px] bg-white text-black rounded-full w-2 h-2 flex items-center justify-center text-[5px] font-bold">
                                    {data.appointments}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Empty cells to complete the grid */}
                    <div className="bg-white/5 rounded-sm"></div>
                </div>
            </div>
        </div>
    );
}
