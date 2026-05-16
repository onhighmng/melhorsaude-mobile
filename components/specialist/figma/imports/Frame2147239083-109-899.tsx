
import { TextShimmer } from '@/components/ui/text-shimmer';

// Placeholders for images
const imgImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300";
const imgImageMelhorSaude = ""; // Use CSS or text or placeholder for logo overlay if needed
const imgProfileImage1 = "https://i.pravatar.cc/150?u=1";
const imgProfileImage2 = "https://i.pravatar.cc/150?u=2";
const imgProfileImage3 = "https://i.pravatar.cc/150?u=3";

function Heading() {
    return (
        <div className="h-[48px] relative shrink-0 w-[424.125px]" data-name="Heading 2">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['Manrope:Bold',sans-serif] font-bold leading-[48px] left-0 text-[#0a0a0a] text-[48px] text-nowrap top-[5.5px] mb-32">Espaço do Especialista</p>
            </div>
        </div>
    );
}

function Paragraph() {
    return (
        <div className="h-[28px] relative shrink-0 w-[550.969px]" data-name="Paragraph">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <div className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#0a0a0a] text-[18px] flex items-center gap-2 top-0">
                    <span>Bem-vindo. Lembre-se: <TextShimmer className="text-blue-900 font-medium">A sua escuta transforma vidas.</TextShimmer></span>
                </div>
            </div>
        </div>
    );
}

function Image() {
    return (
        <div className="absolute h-[162px] left-[169.76px] top-[75px] w-[159px]" data-name="Image">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full rounded-lg" src={imgImage} />
        </div>
    );
}

function ImageMelhorSaude() {
    //   return (
    //     <div className="absolute h-[36px] left-[-1.25px] top-[30px] w-[339.258px]" data-name="Image (Melhor Saúde)">
    //       <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageMelhorSaude} />
    //     </div>
    //   );
    return null;
}

function Container() {
    return (
        <div className="h-[87px] relative shrink-0 w-[339.258px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <Image />
                <ImageMelhorSaude />
            </div>
        </div>
    );
}

function Container1() {
    return (
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1118px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
                <Paragraph />
                <Container />
            </div>
        </div>
    );
}

function Container2() {
    return (
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1118px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
                <Heading />
                <Container1 />
            </div>
        </div>
    );
}

function Paragraph1() {
    return (
        <div className="h-[230px] relative shrink-0 w-[453.094px]" data-name="Paragraph">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <div className="absolute content-stretch flex items-center left-[128.55px] pl-0 pr-[20px] py-0 top-[70px]" data-name="Image">
                    <div className="mr-[-20px] relative shrink-0 size-[64px]" data-name="Image">
                        <img alt="" className="block max-w-none size-full rounded-full border-2 border-white" height="64" src={imgProfileImage1} width="64" />
                    </div>
                    <div className="mr-[-20px] relative shrink-0 size-[64px]" data-name="Image">
                        <img alt="" className="block max-w-none size-full rounded-full border-2 border-white" height="64" src={imgProfileImage2} width="64" />
                    </div>
                    <div className="mr-[-20px] relative shrink-0 size-[64px]" data-name="Image">
                        <img alt="" className="block max-w-none size-full rounded-full border-2 border-white" height="64" src={imgProfileImage3} width="64" />
                    </div>
                    <div className="bg-[#30b0c7] content-stretch flex items-center justify-center mr-[-20px] overflow-clip px-[12px] py-0 relative rounded-[60px] shrink-0 size-[64px] border-2 border-white z-10">
                        <p className="font-['SF_Pro:Regular',sans-serif] font-bold leading-[25px] relative shrink-0 text-[#fdfdfd] text-[20px] text-center text-nowrap tracking-[-0.45px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                            24/7
                        </p>
                    </div>
                </div>
                <p className="absolute font-['DM_Sans:Regular',sans-serif] font-bold h-[41px] leading-[1.3] left-[226.55px] text-[#575757] text-[16px] text-center top-[162px] translate-x-[-50%] w-[453.094px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <span>{`Abra a porta a uma nova era de bem-estar, a oportunidade de transformar `}</span>
                    <TextShimmer
                        as="span"
                        duration={2.5}
                        spread={3}
                        className="text-[16px] leading-[1.3] font-['DM_Sans:Regular',sans-serif] font-bold [--base-color:#c10c0c] [--base-gradient-color:#ef4444]"
                    >
                        vidas
                    </TextShimmer>.
                </p>
            </div>
        </div>
    );
}

function Container3() {
    return (
        <div className="absolute content-stretch flex flex-col gap-[32px] h-[300px] items-start left-0 top-0 w-[1118px]" data-name="Container">
            <Container2 />
            <Paragraph1 />
        </div>
    );
}

export default function Frame() {
    return (
        <div className="relative size-full">
            <Container3 />
        </div>
    );
}
