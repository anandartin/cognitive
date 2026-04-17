type StatusBarProps = {
  time?: string;
  variant?: "dark" | "light";
};

export default function StatusBar({ time = "9:41", variant = "dark" }: StatusBarProps) {
  const color = variant === "dark" ? "#FFFFFF" : "#000000";
  return (
    <div
      className="flex items-center justify-between px-6 pt-3 pb-1 text-[15px] font-semibold select-none"
      style={{ color }}
    >
      <span className="tabular-nums tracking-tight">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.6" fill={color} />
          <rect x="5" y="5" width="3" height="7" rx="0.6" fill={color} />
          <rect x="10" y="2" width="3" height="10" rx="0.6" fill={color} />
          <rect x="15" y="0" width="3" height="12" rx="0.6" fill={color} />
        </svg>
        {/* Wi-Fi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
          <path
            d="M8 11.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
            fill={color}
          />
          <path
            d="M3.3 7.4a6.7 6.7 0 0 1 9.4 0l1.1-1.2a8.3 8.3 0 0 0-11.6 0l1.1 1.2Z"
            fill={color}
          />
          <path
            d="M.6 4.6a10.5 10.5 0 0 1 14.8 0l1.1-1.2a12.1 12.1 0 0 0-17 0l1.1 1.2Z"
            fill={color}
          />
        </svg>
        {/* Battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="2.8"
            stroke={color}
            strokeOpacity="0.45"
            fill="none"
          />
          <rect x="2" y="2" width="19" height="8" rx="1.6" fill={color} />
          <rect x="23.5" y="4" width="1.8" height="4" rx="0.9" fill={color} opacity="0.45" />
        </svg>
      </div>
    </div>
  );
}
