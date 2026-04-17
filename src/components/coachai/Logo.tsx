type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * CoachAI mark. Uses the PNG asset from /public/coachai/.
 * Falls back gracefully if the asset isn't present yet.
 */
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
        src="/coachai/logo.png"
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
