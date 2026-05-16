
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
        <div className="absolute content-stretch flex h-[102.437px] items-center justify-center left-0 top-[107px] w-[99.476px]" data-name="Badge">
            <Icon />
            <svg className="absolute size-[100px]" viewBox="0 0 100 100" style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%', animation: 'spin-left 10s linear infinite' }}>
                <defs>
                    <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                </defs>
                <text className="text-[12px] font-bold" fill="#1e3a8a" letterSpacing="0.5">
                    <textPath href="#circlePath" startOffset="0%">
                        Cuidar Das Pessoas Transforma Empresas
                    </textPath>
                </text>
            </svg>
            <style>{`
        @keyframes spin-left {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
        </div>
    );
}

function Group() {
    return (
        <div className="absolute contents left-0 top-0">
            <div className="absolute h-[316.629px] left-[49.85px] top-0 w-[337.28px]" data-name="Image">
                {/* Placeholder image due to missing figma assets */}
                <img
                    alt="Nova Oportunidade"
                    className="block max-w-none size-full object-cover rounded-lg"
                    height="316.629"
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    width="337.28"
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg className="size-16" fill="none" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="32" fill="white" opacity="0.9" />
                        <path d="M26 20L44 32L26 44V20Z" fill="#1e3a8a" />
                    </svg>
                </div>
                <div className="absolute bottom-4 right-8">
                    <h3 className="text-white font-bold text-xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        A Nova Oportunidade
                    </h3>
                </div>
            </div>
            <Badge />
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
