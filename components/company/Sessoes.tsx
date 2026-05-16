import { ArrowLeft, ArrowRight, User } from 'lucide-react';
import melhorSaudeLogo from '@/assets/company-dashboard/melhor-saude-logo.png';
import { useLanguage } from '@/contexts/LanguageContext';
import svgPaths from "./imports/svg-sessoes";
import imgMaskGroup from "@/assets/company-dashboard/mask-group.png";

export function Sessoes({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { t } = useLanguage();

    // Sample team data
    const sampleTeam = {
        memberCount: 235,
        members: [
            { id: "1", name: "Olivia Martin", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
            { id: "2", name: "Jackson Lee", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
            { id: "3", name: "Isabella Nguyen", avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
            { id: "4", name: "William Kim", avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
        ],
    };

    // Sessions data with stats
    const sessionsData = {
        available: 120,
        total: 500,
        stats: [
            { label: t('sessions.stats.used'), value: 45, color: "bg-blue-400" },
            { label: t('sessions.stats.available'), value: 30, color: "bg-blue-300" },
            { label: t('sessions.stats.reserved'), value: 25, color: "bg-slate-600" },
        ],
    };

    const cta = {
        title: t('dashboard.cta.title') || 'Recarregar Impacto',
        text: t('dashboard.cta.text') || 'Não deixe a evolução parar. Reforce o saldo para garantir que ninguém fica sem resposta quando mais precisa.',
        buttonText: t('dashboard.cta.button') || 'Adquirir Pacote de Sessões',
        onButtonClick: () => onNavigate('Pacotes'),
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <div className="p-4 flex-shrink-0">
                <button
                    onClick={() => onNavigate('Dashboard')}
                    className="flex items-center gap-2 mb-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>{t('nav.back')}</span>
                </button>

                {/* Top Section with Page Title */}
                <div className="flex items-start justify-between mb-4 gap-8">
                    {/* Left: Page Title */}
                    <h1 className="text-3xl md:text-4xl text-[#1a1a1a]" style={{ fontFamily: 'Pacifico, cursive' }}>
                        {t('sessions.title')}
                    </h1>

                    {/* Right: Description */}
                    <div className="flex items-center gap-1.5 max-w-md text-right">
                        <p className="text-gray-600 font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {t('sessions.pageDescription')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sessions Dashboard - Exact Figma Structure */}
            <div className="flex-1 overflow-y-auto px-4 py-0">
                <div className="relative w-full max-w-[1229px] mx-auto">
                    <div className="content-stretch flex flex-col gap-4 h-[678px] items-start relative shrink-0 w-full">
                        {/* Motor de Evolução Title */}
                        <div className="h-9 relative shrink-0 w-[267.57px]">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                                <p className="absolute font-bold leading-9 left-0 text-[#101828] text-[30px] text-nowrap top-[0.5px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    {t('sessions.headerTitle')}
                                </p>
                            </div>
                        </div>

                        {/* Main Grid */}
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-4 grid grid-cols-2 grid-rows-1 relative size-full">
                                {/* Left Column: Two Cards Stacked */}
                                <div className="flex flex-col gap-3 items-start place-self-stretch relative shrink-0">
                                    {/* Card 1: Sessões Disponíveis */}
                                    <div className="h-[307px] relative rounded-[14px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(151.268deg, rgb(28, 57, 142) 0%, rgb(22, 36, 86) 100%)" }}>
                                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pl-[17px] pr-px py-[17px] relative rounded-[inherit] size-full">
                                            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                                                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                                                    {/* Header */}
                                                    <div className="absolute h-7 left-2 top-2 w-[181.484px]">
                                                        <p className="absolute font-bold leading-7 left-0 text-[#bedbff] text-2xl text-nowrap top-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                                            Sessões Disponíveis
                                                        </p>
                                                    </div>

                                                    {/* Ativo Badge + Clock Icon */}
                                                    <div className="absolute content-stretch flex gap-[10.648px] h-[36.3px] items-center right-4 top-1">
                                                        <div className="bg-[rgba(255,255,255,0.2)] px-4 h-[37.268px] flex items-center justify-center relative rounded-full shrink-0">
                                                            <p className="font-normal leading-[26.62px] text-[#0a0a0a] text-[18.634px] text-nowrap tracking-[-0.2002px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                                Ativo
                                                            </p>
                                                        </div>
                                                        <div className="relative shrink-0 size-[31.944px]">
                                                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.944 31.944">
                                                                <g>
                                                                    <path d={svgPaths.p2a9c100} stroke="#8EC5FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.662" />
                                                                    <path d={svgPaths.p31878700} stroke="#8EC5FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.662" />
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    {/* Big Number */}
                                                    <div className="absolute content-stretch flex h-[91px] items-start left-2 top-[47px]">
                                                        <p className="font-bold leading-[66px] relative shrink-0 text-[66px] text-nowrap text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                                            {sessionsData.available}
                                                        </p>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="absolute h-[27px] left-[7.52px] top-[150.13px] w-[541px]">
                                                        <p className="absolute font-semibold leading-[26.4px] left-0 text-[#bedbff] text-[22px] text-nowrap top-[-0.55px] tracking-[-0.3438px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                            Prontas a usar.
                                                        </p>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="absolute bg-[#1d293d] content-stretch flex h-[15px] items-start left-[-12px] overflow-clip rounded-full top-[206px] w-[549px]">
                                                        <div className="bg-[#51a2ff] h-full" style={{ width: '45%' }} />
                                                        <div className="bg-[#8ec5ff] h-full" style={{ width: '30%' }} />
                                                        <div className="bg-[#45556c] h-full" style={{ width: '25%' }} />
                                                    </div>

                                                    {/* Legend - Usadas */}
                                                    <div className="absolute content-stretch flex gap-[6.6px] h-[17.6px] items-center left-[17px] top-[240px]">
                                                        <div className="bg-[#51a2ff] rounded-full shrink-0 size-[8.8px]" />
                                                        <p className="font-medium leading-[17.6px] text-[#8ec5ff] text-base text-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                            {sessionsData.stats[0].label}
                                                        </p>
                                                    </div>

                                                    {/* Legend - Disponíveis */}
                                                    <div className="absolute content-stretch flex gap-[6.6px] h-[17.6px] items-center left-[204px] top-[240px]">
                                                        <div className="bg-[#8ec5ff] rounded-full shrink-0 size-[8.8px]" />
                                                        <p className="font-medium leading-[17.6px] text-[#8ec5ff] text-base text-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                            {sessionsData.stats[1].label}
                                                        </p>
                                                    </div>

                                                    {/* Legend - Reservadas */}
                                                    <div className="absolute content-stretch flex gap-[6.6px] h-[17.6px] items-center left-[416px] top-[240px]">
                                                        <div className="bg-[#45556c] rounded-full shrink-0 size-[8.8px]" />
                                                        <p className="font-medium leading-[17.6px] text-[#8ec5ff] text-base text-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                            {sessionsData.stats[2].label}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div aria-hidden="true" className="absolute border border-[#193cb8] border-solid inset-0 pointer-events-none rounded-[14px]" />
                                    </div>

                                    {/* Card 2: Total Adquirido */}
                                    <div className="basis-0 grow min-h-px min-w-px relative rounded-[14px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(134.244deg, rgb(29, 41, 61) 0%, rgb(15, 23, 43) 100%)" }}>
                                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pl-[17px] pr-px py-[17px] relative rounded-[inherit] size-full">
                                            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                                                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between h-full relative">
                                                    {/* Header */}
                                                    <div className="h-7 relative shrink-0">
                                                        <p className="font-bold leading-7 text-[#e2e8f0] text-2xl text-nowrap top-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                                            Total Adquirido
                                                        </p>
                                                    </div>

                                                    {/* Package Icon */}
                                                    <div className="absolute right-4 top-2 shrink-0 size-[60px] opacity-40">
                                                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75.6 75.6">
                                                            <g>
                                                                <path d={svgPaths.p16886f00} stroke="#CAD5E2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.3" />
                                                                <path d="M37.7999 69.3V37.8" stroke="#CAD5E2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.3" />
                                                                <path d={svgPaths.p3d280400} stroke="#CAD5E2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.3" />
                                                                <path d={svgPaths.p10a16b80} stroke="#CAD5E2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.3" />
                                                            </g>
                                                        </svg>
                                                    </div>

                                                    {/* Big Number */}
                                                    <div className="h-[82px] relative shrink-0">
                                                        <p className="font-bold leading-[60px] text-[60px] text-nowrap text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                                            {sessionsData.total}
                                                        </p>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="h-6 relative shrink-0">
                                                        <p className="font-normal leading-6 text-[#cad5e2] text-base text-nowrap tracking-[-0.3125px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                            Desde o início do contrato.
                                                        </p>
                                                    </div>

                                                    {/* Avatar Stack */}
                                                    <div className="flex -space-x-3">
                                                        <div className="relative size-10 rounded-full bg-[#45556c] border-2 border-slate-700 flex items-center justify-center">
                                                            <User className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div className="relative size-10 rounded-full bg-[#45556c] border-2 border-slate-700 flex items-center justify-center">
                                                            <User className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div className="relative size-10 rounded-full bg-[#45556c] border-2 border-slate-700 flex items-center justify-center">
                                                            <User className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div className="relative size-10 rounded-full bg-[#45556c] border-2 border-slate-700 flex items-center justify-center">
                                                            <p className="text-white text-xs font-bold">+{sampleTeam.memberCount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div aria-hidden="true" className="absolute border border-[#314158] border-solid inset-0 pointer-events-none rounded-[14px]" />
                                    </div>
                                </div>

                                {/* Right Column: CTA Card */}
                                <div className="bg-gradient-to-r from-[rgba(28,57,142,0.5)] place-self-stretch relative rounded-[14px] shrink-0 to-[rgba(29,41,61,0.5)]">
                                    <div aria-hidden="true" className="absolute border border-[rgba(25,60,184,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />

                                    {/* Icon + Content Container */}
                                    <div className="absolute h-[171.188px] left-[21px] top-[21px] right-4">
                                        {/* Icon Container */}
                                        <div className="bg-[rgba(25,60,184,0.5)] rounded-[14px] size-14 mb-8 flex items-center justify-center">
                                            <svg className="size-8" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                                                <g>
                                                    <path d={svgPaths.p34a6bb00} stroke="#BEDBFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                                                    <path d={svgPaths.p37252580} stroke="#BEDBFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                                                    <path d={svgPaths.p12231520} stroke="#BEDBFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                                                </g>
                                            </svg>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col gap-3">
                                            {/* Heading */}
                                            <p className="font-extrabold leading-9 text-[32px] text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                                {cta.title}
                                            </p>
                                            {/* Paragraph */}
                                            <p className="font-semibold leading-[25.6px] text-[#d0d3d7] text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                {cta.text}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Melhor Saude Logo - Top Right */}
                                    <div className="absolute right-5 top-5 h-8 w-auto z-10">
                                        <img src={melhorSaudeLogo} alt="Melhor Saude" className="h-full w-auto object-contain opacity-80" />
                                    </div>

                                    {/* Button */}
                                    <button
                                        onClick={cta.onButtonClick}
                                        className="absolute bottom-6 left-[21px] h-[47px] px-6 rounded-full bg-white hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-2 border border-gray-200"
                                    >
                                        <p className="font-semibold leading-5 text-[#111] text-sm tracking-[-0.1504px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                            {cta.buttonText}
                                        </p>
                                        <ArrowRight className="w-4 h-4 text-[#111]" />
                                    </button>

                                    {/* Mask Group Image */}
                                    <div className="absolute bottom-4 right-4 h-[240px] w-auto opacity-20 pointer-events-none">
                                        <img alt="" className="h-full w-auto object-contain" src={imgMaskGroup} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
