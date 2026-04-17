"use client";

import {
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type OtpInputProps = {
  length?: number;
  onChange: (value: string) => void;
  mask?: boolean;
  autoFocus?: boolean;
};

export default function OtpInput({
  length = 6,
  onChange,
  mask = false,
  autoFocus = true,
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (autoFocus) inputs.current[0]?.focus();
  }, [autoFocus]);

  const emitChange = (next: string[]) => {
    setDigits(next);
    onChange(next.join(""));
  };

  const handleInput = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, "");
    if (!value) {
      const next = [...digits];
      next[index] = "";
      emitChange(next);
      return;
    }
    // Support paste / multi-char input
    const chars = value.split("");
    const next = [...digits];
    let cursor = index;
    for (const ch of chars) {
      if (cursor >= length) break;
      next[cursor] = ch;
      cursor += 1;
    }
    emitChange(next);
    const nextFocus = Math.min(cursor, length - 1);
    inputs.current[nextFocus]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = "";
        emitChange(next);
      } else if (index > 0) {
        next[index - 1] = "";
        emitChange(next);
        inputs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    e.preventDefault();
    handleInput(index, text);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {digits.map((d, i) => {
        const filled = Boolean(d);
        const isFocused = focusedIndex === i;
        const active = filled || isFocused;
        return (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={mask && filled ? "*" : d}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={(e) => handlePaste(i, e)}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(-1)}
            className={[
              "w-[46px] h-[54px] rounded-[10px] bg-transparent text-center",
              "text-white text-[22px] font-semibold tabular-nums caret-[#C3F53C]",
              "outline-none transition-colors duration-150",
              "border",
              active ? "border-[#C3F53C]" : "border-white/80",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
