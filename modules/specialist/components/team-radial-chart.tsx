"use client";

import { Booking } from "@/hooks/useSpecialistBookings";
import { format, getDay, getDaysInMonth, startOfMonth } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

interface TeamRadialChartProps {
  bookings?: Booking[];
}

export function TeamRadialChart({ bookings = [] }: TeamRadialChartProps) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = getDaysInMonth(now);
  const startDay = getDay(startOfMonth(now)); // 0 = Sunday
  const monthName = format(now, 'MMM', { locale: ptBR }).toUpperCase();

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // Generate grid cells
  const gridCells = [];

  // Empty cells for days before start of month
  for (let i = 0; i < startDay; i++) {
    gridCells.push(<div key={`empty-${i}`} className="bg-white/5 rounded-sm"></div>);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayBookings = bookings.filter(b => {
      const d = new Date(b.booking_date);
      return d.getDate() === i && d.getMonth() === month && d.getFullYear() === year && b.status !== 'cancelled';
    });

    const count = dayBookings.length;

    gridCells.push(
      <div
        key={`day-${i}`}
        className={`rounded-sm flex items-center justify-center relative text-[7px] font-semibold min-h-[16px] ${count > 0 ? 'bg-white text-black font-bold' : 'bg-white/10 text-white'}`}
      >
        {i}
        {count > 0 && (
          <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-2 h-2 flex items-center justify-center text-[5px] font-bold">
            {count}
          </div>
        )}
      </div>
    );
  }

  // Fill remaining to keep grid shape (optional)
  const totalCells = startDay + daysInMonth;
  const remaining = 35 - totalCells > 0 ? 35 - totalCells : 0; // Ensure at least 5 rows
  for (let i = 0; i < remaining; i++) {
    gridCells.push(<div key={`fiil-${i}`} className="bg-white/5 rounded-sm"></div>);
  }


  return (
    <div className="w-full h-full flex items-center justify-center min-h-[160px] bg-[#0F1419] p-2 rounded-lg border border-white/10">
      <div className="w-full h-full flex flex-col gap-0.5">
        {/* Header with month */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-white text-[10px] font-bold">{monthName}</span>
          <span className="text-white/50 text-[8px]">{year}</span>
        </div>

        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-0.5 mb-0.5">
          {weekDays.map((day, i) => (
            <div key={i} className="text-center text-white/60 text-[7px] font-semibold">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0.5 flex-1 content-start">
          {gridCells}
        </div>
      </div>
    </div>
  );
}