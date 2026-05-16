import svgPaths from "./svg-6r7iucme2l";
import { createPortal } from 'react-dom';
import { useState } from 'react';

function Play() {
  return (
    <div className="absolute left-[105px] size-[18px] top-[253.5px]" data-name="Play">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Play">
          <path d={svgPaths.p9f9f700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Btn() {
  return <div className="absolute h-[33px] left-[233.91px] top-[290.63px] w-[32.34px]" data-name="Btn" />;
}

function Text({ icon }: { icon: string }) {
  return (
    <div className="h-[27.001px] relative shrink-0 w-[22.436px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic relative shrink-0 text-[#0a0a0a] text-[22.5px] text-nowrap tracking-[0.2966px]">{icon}</p>
      </div>
    </div>
  );
}

function Container({ icon }: { icon: string }) {
  return (
    <div className="bg-[#9e9e9e] relative rounded-[12px] shadow-[0px_0.75px_2.25px_0px_rgba(0,0,0,0.1),0px_0.75px_1.5px_-0.75px_rgba(0,0,0,0.1)] shrink-0 size-[47.997px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.007px] py-0 relative size-full">
        <Text icon={icon} />
      </div>
    </div>
  );
}

function Heading({ title }: { title: string }) {
  return (
    <div className="h-[54.002px] relative shrink-0 w-[160.715px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-[0.01px] not-italic text-[22.5px] text-white top-0 w-[141.75px]">{title}</p>
      </div>
    </div>
  );
}

function Container1({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="absolute content-stretch flex gap-[11.994px] h-[72.477px] items-center left-[34.5px] pb-[0.477px] pt-0 px-0 top-[18px] w-[220.706px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_0.477px] border-solid inset-0 pointer-events-none" />
      <Container icon={icon} />
      <Heading title={title} />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9997 14.9997">
        <g clipPath="url(#clip0_2147_258)" id="Icon">
          <path d="M5 1.24994V3.74988" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
          <path d="M9.99988 1.24994V3.74988" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
          <path d={svgPaths.p33c51772} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
          <path d="M1.87512 6.24982H13.1249" id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
        </g>
        <defs>
          <clipPath id="clip0_2147_258">
            <rect fill="white" height="14.9997" width="14.9997" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1({ date }: { date: string }) {
  return (
    <div className="h-[15px] relative shrink-0 w-[52.145px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[11.25px] text-black text-nowrap top-[0.2px] tracking-[-0.1128px]">{date}</p>
      </div>
    </div>
  );
}

function Container2({ date }: { date: string }) {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex gap-[6px] h-[32.99px] items-center left-0 pl-[6px] pr-0 py-0 rounded-[10.5px] top-0 w-[122px]" data-name="Container">
      <Icon />
      <Text1 date={date} />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9997 14.9997">
        <g clipPath="url(#clip0_2147_247)" id="Icon">
          <path d={svgPaths.p2e5dbd00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
          <path d={svgPaths.p339dc80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
        </g>
        <defs>
          <clipPath id="clip0_2147_247">
            <rect fill="white" height="14.9997" width="14.9997" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2({ time }: { time: string }) {
  return (
    <div className="h-[15px] relative shrink-0 w-[27.404px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[11.25px] text-black text-nowrap top-[0.2px] tracking-[-0.1128px]">{time}</p>
      </div>
    </div>
  );
}

function Container3({ time }: { time: string }) {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex gap-[6px] h-[32.99px] items-center left-[128px] pl-[6px] pr-0 py-0 rounded-[10.5px] top-0 w-[122px]" data-name="Container">
      <Icon1 />
      <Text2 time={time} />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9997 14.9997">
        <g id="Icon">
          <path d={svgPaths.p3bd9f980} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
          <path d={svgPaths.p39210900} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
        </g>
      </svg>
    </div>
  );
}

function Text3({ doctor }: { doctor: string }) {
  return (
    <div className="h-[29.999px] relative shrink-0 flex-1 min-w-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[0.01px] not-italic text-[11.25px] text-black top-[0.3px] tracking-[-0.1128px] w-full truncate">{doctor}</p>
      </div>
    </div>
  );
}

function Container4({ doctor }: { doctor: string }) {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex gap-[6px] h-[47.99px] items-center left-0 pl-[6px] pr-[6px] py-0 rounded-[10.5px] top-[41.99px] w-[122px]" data-name="Container">
      <Icon2 />
      <Text3 doctor={doctor} />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9997 14.9997">
        <g clipPath="url(#clip0_2147_243)" id="Icon">
          <path d={svgPaths.p41bdf00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
          <path d={svgPaths.p357d0d30} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
        </g>
        <defs>
          <clipPath id="clip0_2147_243">
            <rect fill="white" height="14.9997" width="14.9997" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4({ type }: { type: string }) {
  return (
    <div className="h-[15px] relative shrink-0 flex-1 min-w-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[11.25px] text-black whitespace-nowrap top-[0.2px] tracking-[-0.1128px]">{type}</p>
      </div>
    </div>
  );
}

function Container5({ type }: { type: string }) {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex gap-[6px] h-[47.99px] items-center left-[128px] pl-[6px] pr-[6px] py-0 rounded-[10.5px] top-[41.99px] w-[122px]" data-name="Container">
      <Icon3 />
      <Text4 type={type} />
    </div>
  );
}

function Container6({ date, time, doctor, type }: { date: string; time: string; doctor: string; type: string }) {
  return (
    <div className="absolute h-[89.976px] left-[15px] opacity-50 top-[111px] w-[250px]" data-name="Container">
      <Container2 date={date} />
      <Container3 time={time} />
      <Container4 doctor={doctor} />
      <Container5 type={type} />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.7498 8.7498">
            <path d={svgPaths.p28047348} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.7498 8.7498">
            <path d={svgPaths.p2bf33660} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24997" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[217.71px] pb-0 pt-[5.997px] px-[5.997px] size-[26.993px] top-[11.99px] cursor-pointer hover:bg-white/10 rounded-full transition-colors"
      data-name="Button"
      onClick={onClick}
    >
      <Icon4 />
    </div>
  );
}

function Container7({ onClose, session }: { onClose?: () => void; session?: any }) {
  return (
    <div className="absolute bg-[#0b74a5] h-[275.25px] left-0 rounded-[18px] shadow-[0px_18.75px_37.5px_-9px_rgba(0,0,0,0.25)] top-0 w-[279.75px]" data-name="Container">
      <Container1 title={session?.pillar || 'Sessão'} icon={session?.icon || '📅'} />
      <Container6
        date={session?.date || 'Hoje'}
        time={session?.time || '14:00'}
        doctor={session?.doctor || 'Especialista'}
        type={session?.type || 'Sessão'}
      />
      <Button onClick={onClose} />
    </div>
  );
}

function Frame({ onClose, session }: { onClose?: () => void; session?: any }) {
  return (
    <div className="absolute h-[275.25px] left-0 top-0 w-[279.75px]">
      <Container7 onClose={onClose} session={session} />
    </div>
  );
}

function Button1({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={() => {
        if (onClick) onClick();
      }}
      className="absolute bg-[#e3f2fd] h-[42px] left-[3.2px] rounded-[79.883px] top-[6px] w-[87.073px] cursor-pointer hover:bg-[#bbdefb] transition-colors flex items-center justify-center"
      data-name="Button"
    >
      <p className="font-['Nunito:Bold',sans-serif] font-bold text-[#1976d2] text-[13px] tracking-[-0.2496px]">Reagendar</p>
    </div>
  );
}

function Button2({ link }: { link?: string | null }) {
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bg-[#e8f5e9] h-[42px] left-[93.46px] rounded-[79.883px] top-[6px] w-[87.073px] cursor-pointer hover:bg-[#c8e6c9] transition-colors flex items-center justify-center no-underline"
        data-name="Button"
      >
        <p className="font-['Nunito:Bold',sans-serif] font-bold text-[#388e3c] text-[13px]">Entrar</p>
      </a>
    );
  }
  return (
    <div className="absolute bg-[#e8f5e9] h-[42px] left-[93.46px] rounded-[79.883px] top-[6px] w-[87.073px] cursor-not-allowed opacity-60 flex items-center justify-center" data-name="Button">
      <p className="font-['Nunito:Bold',sans-serif] font-bold text-[#388e3c] text-[13px]">Entrar</p>
    </div>
  );
}

function Button3({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="absolute bg-[#ffebee] h-[42px] left-[183.73px] rounded-[79.883px] top-[6px] w-[87.073px] cursor-pointer hover:bg-[#ffcdd2] transition-colors flex items-center justify-center"
      data-name="Button"
    >
      <p className="font-['Nunito:Bold',sans-serif] font-bold text-[#af1010] text-[13px]">Cancelar</p>
    </div>
  );
}

function Menu({ onReschedule, onCancel, link }: { onReschedule?: () => void; onCancel?: () => void; link?: string | null }) {
  return (
    <div className="absolute bg-black h-[54px] left-[3.38px] rounded-[79.883px] top-[214.13px] w-[274px]" data-name="Menu">
      <Button1 onClick={onReschedule} />
      <Button2 link={link} />
      <Button3 onClick={onCancel} />
    </div>
  );
}

// Cancellation Confirmation Modal
function CancelConfirmationModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return createPortal(
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] animate-in fade-in-0 duration-200"
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white rounded-[24px] shadow-[0px_20px_50px_-10px_rgba(0,0,0,0.3)] pointer-events-auto animate-in zoom-in-95 fade-in-0 duration-200 w-[320px] p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#ffebee] rounded-full p-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#af1010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[20px] text-[#1a1a1a] text-center mb-2">
            Cancelar Sessão?
          </h2>

          {/* Message */}
          <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6b7280] text-center mb-6">
            Tem a certeza que deseja cancelar esta sessão? Esta ação não pode ser desfeita.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-[#f3f4f6] text-[#4b5563] rounded-[12px] h-[48px] font-['Nunito:Bold',sans-serif] font-bold text-[14px] hover:bg-[#e5e7eb] transition-colors"
            >
              Não, Voltar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-[#af1010] text-white rounded-[12px] h-[48px] font-['Nunito:Bold',sans-serif] font-bold text-[14px] hover:bg-[#8b0d0d] transition-colors"
            >
              Sim, Cancelar
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default function Frame1({ onClose, onReschedule, onCancel, session }: { onClose?: () => void; onReschedule?: () => void; onCancel?: () => void; session?: any }) {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleCancelClick = () => {
    setShowCancelConfirmation(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelConfirmation(false);
    // Don't close immediately if we want to show loading, but here we assume onCancel handles logic
    // Actually, onCancel passed from parent handles the Async logic and Toast.
    // So we just call it.
    if (onCancel) {
      onCancel();
    }
    // onClose is handled by parent after success usually? 
    // In Frame2147239064 I put setShowFrame...false INSIDE the onCancel succes callback.
    // So I don't need to call onClose() here?
    // Wait, the onCancel passed from Frame2147239064 calls setVisible(false).
    // So we just call onCancel().
  };

  const handleCancelCancel = () => {
    setShowCancelConfirmation(false);
  };

  const modalContent = (
    <>
      {/* Modal Backdrop - Covers entire viewport */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Modal Content - Centered on entire page */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-[279.75px] h-[275.25px] pointer-events-auto animate-in zoom-in-95 fade-in-0 duration-200 scale-[1.4] sm:scale-[1.5]"
          onClick={(e) => e.stopPropagation()}
        >
          <Frame onClose={onClose} session={session} />
          <Menu onReschedule={onReschedule} onCancel={handleCancelClick} link={session?.meetingLink} />
        </div>
      </div>

      {/* Cancellation Confirmation Modal */}
      {showCancelConfirmation && (
        <CancelConfirmationModal
          onConfirm={handleCancelConfirm}
          onCancel={handleCancelCancel}
        />
      )}
    </>
  );

  // Use portal to render at document body level
  return createPortal(modalContent, document.body);
}