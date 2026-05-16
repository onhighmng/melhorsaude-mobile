export function VerifiedBadge({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Flower/gear-like background - Instagram verified style */}
            <circle cx="12" cy="12" r="10" fill="#22c55e" />
            <circle cx="12" cy="3" r="1.5" fill="#22c55e" />
            <circle cx="12" cy="21" r="1.5" fill="#22c55e" />
            <circle cx="3" cy="12" r="1.5" fill="#22c55e" />
            <circle cx="21" cy="12" r="1.5" fill="#22c55e" />
            <circle cx="6.3" cy="6.3" r="1.5" fill="#22c55e" />
            <circle cx="17.7" cy="17.7" r="1.5" fill="#22c55e" />
            <circle cx="17.7" cy="6.3" r="1.5" fill="#22c55e" />
            <circle cx="6.3" cy="17.7" r="1.5" fill="#22c55e" />

            {/* White Checkmark */}
            <path
                d="M7.5 12L10.5 15.5L17 8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}
