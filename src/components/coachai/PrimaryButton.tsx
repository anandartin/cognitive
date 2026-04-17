"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function PrimaryButton({
  children,
  disabled,
  loading,
  className = "",
  ...rest
}: PrimaryButtonProps) {
  const inactive = disabled || loading;
  return (
    <button
      {...rest}
      disabled={inactive}
      className={[
        "w-full h-[56px] rounded-full flex items-center justify-center gap-2",
        "text-[17px] font-bold tracking-tight",
        "transition-all duration-200 active:scale-[0.985]",
        inactive
          ? "bg-[#4C6618] text-black/70 cursor-not-allowed"
          : "bg-[#C3F53C] text-black shadow-[0_10px_30px_-10px_rgba(195,245,60,0.55)] hover:bg-[#B7EC28]",
        className,
      ].join(" ")}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight size={20} strokeWidth={2.4} />
        </>
      )}
    </button>
  );
}
