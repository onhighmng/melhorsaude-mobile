import imgImage from '@/assets/company-dashboard/ee9f89402425d35545d2048bf2ef854f777b90d3.png';

function Icon() {
  return (
    <div className="absolute left-[calc(50%-0.11px)] size-[44px] top-[calc(50%-0.59px)] translate-x-[-50%] translate-y-[-50%]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
        <g id="Icon">
          <rect fill="var(--fill-0, #EE701F)" height="44" rx="22" width="44" />
          <path d="M16.5 29V15L27.5 22L16.5 29Z" fill="var(--fill-0, white)" id="play_arrow" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute content-stretch flex h-[102.437px] items-center justify-center left-0 top-[107.1px] w-[99.476px]" data-name="Badge">
      <Icon />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <Badge />
      <div className="absolute h-[316.629px] left-[58px] top-0 w-[337.28px]" data-name="Image">
        <img alt="" className="block max-w-none size-full" height="316.629" src={imgImage} width="337.28" />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <Group />
    </div>
  );
}
