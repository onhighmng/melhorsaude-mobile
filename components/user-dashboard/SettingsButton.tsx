import svgPaths from "../imports/svg-upw0i539ni";

function UiwSetting() {
  return (
    <div className="relative shrink-0 size-[19px]" data-name="uiw:setting">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g clipPath="url(#clip0_2029_228)" id="uiw:setting">
          <path d={svgPaths.p3647e280} fill="var(--fill-0, #EA8C00)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2029_228">
            <rect fill="white" height="19" width="19" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function SettingsButton({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="backdrop-blur-[4.143px] backdrop-filter bg-[#e2e2e2] content-stretch flex flex-col items-center justify-center overflow-clip px-[8.291px] py-[15.75px] rounded-[199px] size-[42px] transition-transform hover:scale-110"
    >
      <UiwSetting />
    </button>
  );
}