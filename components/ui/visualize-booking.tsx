import React, { useState } from 'react';
// DISABLED: import from 'motion/react';
import { Columns3, Grid, Video, Phone } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
// Using standard dialog components which should already exist in ui/
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './dialog';

export type AppointmentStatus = 'confirmed' | 'cancelled' | 'completed';

export type PreDiagnosisAnswer = {
    question: string;
    answer: string;
};

export type AppointmentInfo = {
    id: string;
    date: string;
    time: string;
    company: string;
    employee: string;
    specialist: string;
    pillar: string;
    status: AppointmentStatus;
    location: string;
    preDiagnosis?: PreDiagnosisAnswer[];
    meetingLink?: string;
    callType: 'video' | 'phone';
};

export type DayType = {
    day: string;
    classNames: string;
    appointments?: AppointmentInfo[];
};

interface DayProps {
    classNames: string;
    day: DayType;
    onHover: (day: string | null) => void;
    onClick: (appointments: AppointmentInfo[], dayNumber: string) => void;
}

const Day: React.FC<DayProps> = ({ classNames, day, onHover, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getStatusColor = (appointments?: AppointmentInfo[]) => {
        if (!appointments || appointments.length === 0) return classNames;

        // Prioritize showing status: cancelled > confirmed > completed
        const hasCancelled = appointments.some(a => a.status === 'cancelled');
        const hasConfirmed = appointments.some(a => a.status === 'confirmed');

        if (hasCancelled) return 'bg-[rgba(251,44,54,0.8)]';
        if (hasConfirmed) return 'bg-[rgba(0,201,80,0.8)]';
        return 'bg-[rgba(106,114,130,0.8)]';
    };

    return (
        <div
            className={`relative flex items-center justify-center ${getStatusColor(day.appointments)} cursor-pointer hover:ring-2 hover:ring-white/20 transition-all`}
            style={{ height: '96px', borderRadius: 16 }}
            onMouseEnter={() => {
                setIsHovered(true);
                onHover(day.day);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onHover(null);
            }}
            onClick={() => {
                if (day.appointments && day.appointments.length > 0) {
                    onClick(day.appointments, day.day);
                }
            }}
            id={`day-${day.day}`}
        >
            <div className="flex flex-col items-center justify-center">
                {!(day.day[0] === '+' || day.day[0] === '-') && (
                    <span className="text-lg font-medium text-white font-inter">{day.day}</span>
                )}
            </div>
            {day.appointments && day.appointments.length > 0 && (
                <div
                    className="absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-full bg-[#3f3f47] p-1 text-xs font-bold text-white"
 -meeting-count`}
                    style={{
                        borderRadius: 999,
                    }}
                >
                    {day.appointments.length}
                </div>
            )}

            
                {day.appointments && isHovered && (
                    <div className="absolute inset-0 flex size-full items-center justify-center">
                        <div
                            className="flex size-12 items-center justify-center bg-[#3f3f47] p-1 text-sm font-bold text-white"
 -meeting-count`}
                            style={{
                                borderRadius: 999,
                            }}
                        >
                            {day.appointments.length}
                        </div>
                    </div>
                )}
            
        </div>
    );
};

interface CalendarGridProps {
    days: DayType[];
    onHover: (day: string | null) => void;
    onDayClick: (appointments: AppointmentInfo[], dayNumber: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days, onHover, onDayClick }) => {
    return (
        <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
                <Day
                    key={`${day.day}-${index}`}
                    classNames={day.classNames}
                    day={day}
                    onHover={onHover}
                    onClick={onDayClick}
                />
            ))}
        </div>
    );
};

interface InteractiveCalendarProps {
    days: DayType[];
    month: string;
    year: string;
    onAppointmentClick?: (appointment: AppointmentInfo) => void;
    selectedCompany?: string;
    selectedSpecialist?: string;
    onUpdateLink?: (appointmentId: string, link: string) => Promise<void>;
}

const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
    days,
    month,
    year,
    onAppointmentClick,
    selectedCompany,
    selectedSpecialist,
    onUpdateLink,
}) => {
    const [moreView, setMoreView] = useState(false);
    const [hoveredDay, setHoveredDay] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [meetingLinks, setMeetingLinks] = useState<Record<string, string>>({});
    const [isPreDiagnosisOpen, setIsPreDiagnosisOpen] = useState(false);
    const [selectedPreDiagnosis, setSelectedPreDiagnosis] = useState<PreDiagnosisAnswer[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<string>('');

    const handleDayHover = (day: string | null) => {
        setHoveredDay(day);
    };

    const handleDayClick = (appointments: AppointmentInfo[], dayNumber: string) => {
        setMoreView(true);
        setSelectedDay(dayNumber);
        // Scroll to the clicked day's appointments after a short delay
        setTimeout(() => {
            const element = document.getElementById(`appointment-day-${dayNumber}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 350);

        // Clear highlight after 3 seconds
        setTimeout(() => {
            setSelectedDay(null);
        }, 4000);
    };

    const handleSaveLink = async (appointmentId: string, link: string) => {
        if (onUpdateLink) {
            console.log('Saving link via onUpdateLink:', appointmentId, link);
            await onUpdateLink(appointmentId, link);
        } else {
            console.warn('onUpdateLink prop not provided, saving locally only');
        }

        setMeetingLinks(prev => ({
            ...prev,
            [appointmentId]: link
        }));
    };

    const handleOpenPreDiagnosis = (preDiagnosis: PreDiagnosisAnswer[], employeeName: string) => {
        setSelectedPreDiagnosis(preDiagnosis);
        setSelectedEmployee(employeeName);
        setIsPreDiagnosisOpen(true);
    };

    const getPillarEmoji = (pillar: string) => {
        const pillarLower = pillar.toLowerCase();
        if (pillarLower.includes('mental')) return '🧠';
        if (pillarLower.includes('físic')) return '💪';
        if (pillarLower.includes('financ')) return '💰';
        if (pillarLower.includes('juríd') || pillarLower.includes('legal')) return '⚖️';
        return '🧠';
    };

    const filteredDays = React.useMemo(() => {
        if (!selectedCompany && !selectedSpecialist) return days;

        return days.map(day => {
            if (!day.appointments) return day;

            const filteredAppointments = day.appointments.filter(apt => {
                const matchesCompany = !selectedCompany || apt.company === selectedCompany;
                const matchesSpecialist = !selectedSpecialist || apt.specialist === selectedSpecialist;
                return matchesCompany && matchesSpecialist;
            });

            return {
                ...day,
                appointments: filteredAppointments.length > 0 ? filteredAppointments : undefined
            };
        });
    }, [days, selectedCompany, selectedSpecialist]);

    const getStatusBadge = (status: AppointmentStatus) => {
        switch (status) {
            case 'confirmed':
                return <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">Confirmada</span>;
            case 'cancelled':
                return <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">Cancelada</span>;
            case 'completed':
                return <span className="rounded-full bg-gray-500/20 px-2 py-0.5 text-xs font-medium text-gray-400">Concluída</span>;
        }
    };

    return (
        <>
            <div className="relative flex w-full flex-col lg:flex-row items-start justify-start gap-6">
                {/* Calendar Section */}
                <div className={`${moreView ? 'w-full lg:w-[48%]' : 'w-full'} transition-all duration-300 ease-in-out flex-shrink-0`}>
                    <div className="flex w-full flex-col gap-4">
                        <div className="flex w-full items-center justify-between">
                            <h2 className="text-3xl font-bold tracking-wider text-[#d4d4d8] font-inter">
                                {month} <span className="opacity-50">{year}</span>
                            </h2>
                            <button
                                className="relative flex items-center gap-3 rounded-lg border border-[#52525c] px-1.5 py-1.5 bg-[rgba(39,39,42,0.5)] hover:bg-[rgba(39,39,42,0.8)] transition-colors"
                                onClick={() => setMoreView(!moreView)}
                            >
                                <Grid className={`z-[2] w-5 h-5 ${!moreView ? 'text-zinc-800' : 'text-[#9f9fa9]'}`} />
                                <Columns3 className={`z-[2] w-5 h-5 ${moreView ? 'text-zinc-800' : 'text-[#9f9fa9]'}`} />
                                <div
                                    className="absolute left-0 top-0 h-full w-10 rounded-md bg-white/90 transition-transform duration-300"
                                    style={{
                                        top: '50%',
                                        transform: moreView
                                            ? 'translateY(-50%) translateX(46px)'
                                            : 'translateY(-50%) translateX(2px)',
                                    }}
                                ></div>
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {daysOfWeek.map((day) => (
                                <div
                                    key={day}
                                    className="rounded-xl bg-[#323232] py-2 text-center text-sm font-medium text-white font-inter"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                        <CalendarGrid days={filteredDays} onHover={handleDayHover} onDayClick={handleDayClick} />
                    </div>
                </div>

                {/* Bookings Panel */}
                {moreView && (
                    <div className="w-full lg:w-[48%] flex-shrink-0 flex flex-col">
                        <div className="flex w-full flex-col gap-4">
                            <div className="flex w-full flex-col items-start justify-between">
                                <h2 className="text-3xl font-bold tracking-wider text-[#d4d4d8] font-inter">
                                    Marcações
                                </h2>
                                <p className="text-sm font-medium text-zinc-400 mt-1 font-inter">
                                    Veja todas as consultas agendadas na plataforma
                                </p>
                            </div>
                            <div
                                className="flex flex-col items-start justify-start overflow-y-auto rounded-xl border-2 border-[#323232] shadow-lg bg-[#1a1a1a]"
                                style={{ maxHeight: '700px' }}
                            >
                                {filteredDays
                                    .filter((day) => day.appointments && day.appointments.length > 0)
                                    .map((day) => (
                                        <div
                                            key={day.day}
                                            id={`appointment-day-${day.day}`}
                                            className={`w-full border-b-2 last:border-b-0 transition-all duration-500 relative ${selectedDay === day.day
                                                ? 'border-[#00c950] bg-gradient-to-r from-[#00c950]/20 to-transparent'
                                                : 'border-[#323232]'
                                                }`}
                                        >
                                            {/* Highlight Indicator - Animated Pulse */}
                                            {selectedDay === day.day && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00c950] animate-pulse"></div>
                                            )}

                                            {/* Day Header */}
                                            <div className={`px-4 py-3 sticky top-0 z-10 transition-colors duration-300 ${selectedDay === day.day
                                                ? 'bg-[#00c950]/10 border-b-2 border-[#00c950]'
                                                : 'bg-[#262626] border-b border-[#323232]'
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    {selectedDay === day.day && (
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-2 h-2 rounded-full bg-[#00c950] animate-pulse"></div>
                                                            <div className="w-2 h-2 rounded-full bg-[#00c950] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                            <div className="w-2 h-2 rounded-full bg-[#00c950] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                                        </div>
                                                    )}
                                                    <span className={`text-sm font-bold transition-colors font-inter ${selectedDay === day.day ? 'text-[#00c950]' : 'text-white'
                                                        }`} >
                                                        Dia {day.day}
                                                    </span>
                                                    {selectedDay === day.day && (
                                                        <span className="text-xs text-[#00c950] font-bold ml-2 animate-pulse font-inter">
                                                            ← Aqui
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {day.appointments &&
                                                day.appointments.map((appointment, idx) => (
                                                    <AppointmentCard
                                                        key={appointment.id}
                                                        appointment={appointment}
                                                        selectedDay={selectedDay}
                                                        dayDay={day.day}
                                                        idx={idx}
                                                        meetingLinks={meetingLinks}
                                                        handleSaveLink={handleSaveLink}
                                                        handleOpenPreDiagnosis={handleOpenPreDiagnosis}
                                                        getPillarEmoji={getPillarEmoji}
                                                        getStatusBadge={getStatusBadge}
                                                    />
                                                ))}
                                        </div>
                                    ))}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Pre-Diagnosis Dialog */}
            <Dialog open={isPreDiagnosisOpen} onOpenChange={setIsPreDiagnosisOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="font-manrope font-bold">
                            Pré-Diagnóstico
                        </DialogTitle>
                        <DialogDescription className="font-inter">
                            Respostas de {selectedEmployee}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        {selectedPreDiagnosis.map((item, index) => (
                            <div key={index} className="border-b pb-3 last:border-b-0">
                                <p className="font-bold text-gray-700 mb-2 font-manrope">
                                    {item.question}
                                </p>
                                <p className="text-sm text-gray-600 font-inter">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsPreDiagnosisOpen(false)}>
                            Fechar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

InteractiveCalendar.displayName = 'InteractiveCalendar';

export default InteractiveCalendar;

const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

interface AppointmentCardProps {
    appointment: AppointmentInfo;
    selectedDay: string | null;
    dayDay: string;
    idx: number;
    meetingLinks: Record<string, string>;
    handleSaveLink: (appointmentId: string, link: string) => void;
    handleOpenPreDiagnosis: (preDiagnosis: PreDiagnosisAnswer[], employeeName: string) => void;
    getPillarEmoji: (pillar: string) => string;
    getStatusBadge: (status: AppointmentStatus) => JSX.Element;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
    appointment,
    selectedDay,
    dayDay,
    idx,
    meetingLinks,
    handleSaveLink,
    handleOpenPreDiagnosis,
    getPillarEmoji,
    getStatusBadge,
}) => {
    const [linkValue, setLinkValue] = useState(meetingLinks[appointment.id] || appointment.meetingLink || '');

    return (
        <div
            className={`border-b border-[#323232] p-4 last:border-b-0 transition-all duration-300 ${selectedDay === dayDay
                ? 'bg-[#00c950]/5'
                : ''
                }`}
            style={{
                animation: selectedDay === dayDay ? `slideIn 0.3s ease-out ${idx * 0.1}s both` : 'none'
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Horário */}
            <div className="mb-3">
                <p className="text-xs text-zinc-500 mb-1 font-inter">
                    Horário:
                </p>
                <p className="text-white font-medium font-inter">
                    {appointment.time}
                </p>
            </div>

            {/* Nome */}
            <div className="mb-3">
                <p className="text-xs text-zinc-500 mb-1 font-inter">
                    Nome:
                </p>
                <p className="text-white font-medium font-inter">
                    {appointment.employee}
                </p>
            </div>

            {/* Pilar de Apoio */}
            <div className="mb-3">
                <p className="text-xs text-zinc-500 mb-1 font-inter">
                    Pilar de Apoio:
                </p>
                <p className="text-white font-medium font-inter">
                    {getPillarEmoji(appointment.pillar)} {appointment.pillar}
                </p>
            </div>

            {/* Video/Phone Call Type */}
            <div className="mb-3">
                <div className="flex items-center gap-2">
                    {appointment.callType === 'video' ? (
                        <>
                            <Video className="h-5 w-5 text-blue-400" />
                            <span className="text-white text-sm font-inter">Videochamada</span>
                        </>
                    ) : (
                        <>
                            <Phone className="h-5 w-5 text-green-400" />
                            <span className="text-white text-sm font-inter">Chamada</span>
                        </>
                    )}
                </div>
            </div>

            {/* Pré-Diagnóstico Button */}
            {appointment.preDiagnosis && appointment.preDiagnosis.length > 0 && (
                <div className="mb-3">
                    <Button
                        onClick={() => handleOpenPreDiagnosis(appointment.preDiagnosis!, appointment.employee)}
                        variant="outline"
                        size="sm"
                        className="w-full text-sm font-inter"
                    >
                        Ler Pré-Diagnóstico
                    </Button>
                </div>
            )}

            {/* Link Input & Save Button */}
            <div className="space-y-2">
                <Input
                    placeholder="Cole aqui o link (Zoom/Teams/Meet)"
                    value={linkValue}
                    onChange={(e) => setLinkValue(e.target.value)}
                    className="text-sm bg-zinc-800 border-zinc-700 text-white font-inter"
                />
                <Button
                    onClick={() => handleSaveLink(appointment.id, linkValue)}
                    className="w-full text-sm font-inter font-semibold"
                >
                    Salvar
                </Button>
            </div>

            {/* Status Badge at Bottom */}
            <div className="mt-3 flex justify-end">
                {getStatusBadge(appointment.status)}
            </div>
        </div>
    );
};
