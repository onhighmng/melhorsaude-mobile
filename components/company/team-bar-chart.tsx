"use client";

export function TeamBarChart() {
    return (
        <div className="w-full h-[160px] flex items-end justify-center gap-2 px-6 pb-8">
            {/* Bar 1 */}
            <div className="w-8 h-20 bg-white/70 rounded-full"></div>

            {/* Bar 2 */}
            <div className="w-8 h-24 bg-white/80 rounded-full"></div>

            {/* Bar 3 */}
            <div className="w-8 h-16 bg-white/70 rounded-full"></div>

            {/* Bar 4 */}
            <div className="w-8 h-28 bg-white/80 rounded-full"></div>

            {/* Bar 5 */}
            <div className="w-8 h-18 bg-white/70 rounded-full"></div>

            {/* Bar 6 - Highlighted */}
            <div className="w-8 h-32 bg-white rounded-full"></div>

            {/* Bar 7 */}
            <div className="w-8 h-20 bg-white/70 rounded-full"></div>

            {/* Bar 8 */}
            <div className="w-8 h-14 bg-white/80 rounded-full"></div>

            {/* Bar 9 */}
            <div className="w-8 h-24 bg-white/70 rounded-full"></div>

            {/* Bar 10 */}
            <div className="w-8 h-22 bg-white/80 rounded-full"></div>
        </div>
    );
}
