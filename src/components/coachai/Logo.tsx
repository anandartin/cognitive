type LogoProps = {
  size?: number;
  withWordmark?: boolean;
};

export default function Logo({ size = 56, withWordmark = false }: LogoProps) {
  const wordmarkSize = size * 0.6;
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M44 12.5A22 22 0 1 0 54 32"
          stroke="#C3F53C"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M52 6 L54.2 12.4 L60.5 14.6 L54.2 16.8 L52 23.2 L49.8 16.8 L43.5 14.6 L49.8 12.4 Z"
          fill="#C3F53C"
        />
      </svg>
      {withWordmark && (
        <span
          className="font-extrabold tracking-tight text-[#C3F53C]"
          style={{ fontSize: wordmarkSize }}
        >
          CoachAI
        </span>
      )}
    </div>
  );
}
