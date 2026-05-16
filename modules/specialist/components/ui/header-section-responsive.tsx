import { TextShimmer } from './text-shimmer';
import imgProfileImage1 from "../../assets/75e0127bb7b629c38fd07f220eac9d0b9a7716a1.png";
import imgProfileImage2 from "../../assets/6bccb4ec240c4902a2aa5b448c810d434e8aa38b.png";
import imgProfileImage3 from "../../assets/01afb8e7695a1006b9686d11546c37463dcc151f.png";
import { useAuth } from "@/contexts/AuthContext";

export default function HeaderSectionResponsive() {
    const { user } = useAuth();
    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Doutor';

    return (
        <div className="w-full flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 xl:gap-0">

            {/* Left Column: Title & Subtitle */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold font-manrope text-[#0a0a0a] leading-tight">
                    Espaço do Especialista
                </h1>

                <div className="font-inter">
                    Olá, {firstName}. <TextShimmer className="text-blue-900 font-bold inline-block" duration={2}>A sua escuta transforma vidas.</TextShimmer>
                </div>
            </div>

            {/* Right Column: Avatar Stack & CTA Text */}
            <div className="flex flex-col items-start xl:items-end gap-3 mt-4 xl:mt-0">
                <div className="flex items-center">
                    {/* Avatar Stack */}
                    <div className="flex -space-x-4">
                        <img src={imgProfileImage1} alt="Profile 1" className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-sm" />
                        <img src={imgProfileImage2} alt="Profile 2" className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-sm" />
                        <img src={imgProfileImage3} alt="Profile 3" className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-sm" />
                    </div>
                    {/* 24/7 Badge */}
                    <div className="w-14 h-14 rounded-full bg-[#30b0c7] flex items-center justify-center text-white font-bold text-lg -ml-4 z-10 border-2 border-white shadow-sm">
                        24/7
                    </div>
                </div>

                <p className="text-base md:text-lg text-gray-600 font-medium max-w-md text-left xl:text-right leading-snug">
                    Abra a porta a uma nova era de bem-estar, a oportunidade de transformar <TextShimmer className="font-bold text-red-600 inline-block" duration={2.5}>vidas</TextShimmer>.
                </p>
            </div>

        </div >
    );
}
