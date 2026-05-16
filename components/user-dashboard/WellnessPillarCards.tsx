import imgMentalHealth12 from "@assets/9dc36ad8123a62530b2a2e13ffc8a33348de0fc4.png";
import imgGym1 from "@assets/30b9edc3978891d2565c570978a72dd1c2684f9b.png";
import imgManCarriesHeavyCoins1 from "@assets/ba5518b02f3e5a2a0434d5a6da8f706a86cb63ae.png";
import imgCommercialCourtSentenceAndLegalSystem1 from "@assets/897f25666b2976f6467a21346375bb9753e57911.png";
import { imgMentalHealth011 } from "../imports/svg-y3pt7";

interface WellnessPillarCardsProps {
  onCardClick?: (pillarId: string) => void;
}

function MaskGroup() {
  return (
    <div className="absolute contents left-[0.79px] top-0" data-name="Mask group">
      <div className="absolute h-[133px] left-[4px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.215px_-45px] mask-size-[155.466px_172.522px] top-[45px] w-[153px]" data-name="Mental Health-01 1" style={{ maskImage: `url('${imgMentalHealth011}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMentalHealth12} />
      </div>
    </div>
  );
}

function MentalHealthCard({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="absolute h-[173px] left-0 top-0 w-[157px] transition-transform hover:scale-105">
      <div className="absolute bg-gradient-to-b from-[#9DBFD4] h-[173px] left-0 rounded-[20.248px] to-[rgba(157,191,212,0)] top-0 w-[157px]" />
      <MaskGroup />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[50%] text-[#2e2b29] text-[16px] text-center text-nowrap top-[20.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[14.577px]">Saúde Mental</p>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] left-[50%] text-[#3f3f3f] text-[12px] text-center text-nowrap top-[40.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[14.577px]">Psicológico</p>
      </div>
    </button>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents left-[0.79px] top-0" data-name="Mask group">
      <div className="absolute left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.785px_-24px] mask-size-[155.466px_172.522px] size-[156px] top-[24px]" data-name="Gym 1" style={{ maskImage: `url('${imgMentalHealth011}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgGym1} />
      </div>
    </div>
  );
}

function PhysicalWellnessCard({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="absolute h-[173px] left-[169px] top-px w-[157px] transition-transform hover:scale-105">
      <div className="absolute bg-gradient-to-b from-[#fcc066] h-[173px] left-0 rounded-[20.248px] to-[#f5efe6] top-0 via-[#f4b85d] via-[28.646%] w-[157px]" />
      <MaskGroup1 />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[50%] text-[#2e2b29] text-[16px] text-center text-nowrap top-[20.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[14.577px]">Bem-estar</p>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] left-[50%] text-[#3f3f3f] text-[12px] text-center text-nowrap top-[39.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[14.577px]">Físico</p>
      </div>
    </button>
  );
}

function MaskGroup2() {
  return (
    <div className="absolute contents left-[0.79px] top-0" data-name="Mask group">
      <div className="absolute left-[9px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8.215px_-28px] mask-size-[155.466px_172.522px] size-[144px] top-[28px]" data-name="man carries heavy coins 1" style={{ maskImage: `url('${imgMentalHealth011}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgManCarriesHeavyCoins1} />
      </div>
    </div>
  );
}

function FinancialAssistanceCard({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="absolute h-[173px] left-0 top-[192px] w-[157px] transition-transform hover:scale-105">
      <div className="absolute bg-gradient-to-b from-[#8BBEB8] h-[173px] left-0 rounded-[20.248px] to-[rgba(139,190,184,0)] top-0 w-[157px]" />
      <MaskGroup2 />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[50%] text-[#2e2b29] text-[16px] text-center text-nowrap top-[20.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[14.577px]">Assistência</p>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] left-[50%] text-[#3f3f3f] text-[12px] text-center text-nowrap top-[39.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[14.577px]">Financeira</p>
      </div>
    </button>
  );
}

function MaskGroup3() {
  return (
    <div className="absolute contents left-[0.79px] top-0" data-name="Mask group">
      <div className="absolute left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-19.215px_-29px] mask-size-[155.466px_172.522px] size-[147px] top-[29px]" data-name="commercial court sentence and legal system 1" style={{ maskImage: `url('${imgMentalHealth011}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCommercialCourtSentenceAndLegalSystem1} />
      </div>
    </div>
  );
}

function LegalAssistanceCard({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="absolute h-[173px] left-[169px] top-[192px] w-[157px] transition-transform hover:scale-105">
      <div className="absolute bg-gradient-to-b from-[#D8A4C4] h-[173px] left-0 rounded-[20.248px] to-[rgba(216,164,196,0)] top-0 w-[157px]" />
      <MaskGroup3 />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[50%] text-[#2e2b29] text-[16px] text-center text-nowrap top-[23.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[14.577px]">Assistência</p>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] left-[50%] text-[#3f3f3f] text-[12px] text-center text-nowrap top-[43.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="leading-[14.577px]">Jurídica</p>
      </div>
    </button>
  );
}

export function WellnessPillarCards({ onCardClick }: WellnessPillarCardsProps) {
  return (
    <div className="relative w-[326px] h-[365px] mx-auto">
      <MentalHealthCard onClick={() => onCardClick?.('mental')} />
      <PhysicalWellnessCard onClick={() => onCardClick?.('fisico')} />
      <FinancialAssistanceCard onClick={() => onCardClick?.('financeira')} />
      <LegalAssistanceCard onClick={() => onCardClick?.('juridica')} />
    </div>
  );
}