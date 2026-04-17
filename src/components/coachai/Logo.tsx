type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

export default function Logo({
  size = 56,
  withWordmark = false,
  className = "",
}: LogoProps) {
  const wordmarkSize = Math.round(size * 0.6);
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/coachai/logo.svg"
        alt="CoachAI"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="object-contain select-none"
        draggable={false}
      />
      {withWordmark && (
        <span
          className="font-extrabold tracking-tight text-[#C3F53C]"
          style={{ fontSize: wordmarkSize, lineHeight: 1 }}
        >
          CoachAI
        </span>
      )}
    </div>
  );
}
