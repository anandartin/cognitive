"use client";

import { Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/coachai/PrimaryButton";
import ScreenHeader from "@/components/coachai/ScreenHeader";
import StatusBar from "@/components/coachai/StatusBar";
import { useCoachAI } from "@/store/useCoachAI";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function SignupScreen() {
  const router = useRouter();
  const { email, setEmail } = useCoachAI();
  const [focused, setFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const trimmed = email.trim();
  const isValid = EMAIL_RE.test(trimmed);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    // Simulate an OTP dispatch — a real app would hit /api/auth/request-otp.
    await new Promise((r) => window.setTimeout(r, 600));
    router.push("/coachai/verify");
  };

  const borderColor =
    isValid || focused ? "border-[#C3F53C]" : "border-white/80";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex-1 flex flex-col bg-black coachai-fadein"
    >
      <StatusBar />

      <div className="flex-1 flex flex-col px-7 pt-8">
        <ScreenHeader
          title="Create your account"
          subtitle="Creating an account will help you securely manage your profile."
        />

        <div className="mt-10 flex flex-col gap-2.5">
          <label
            htmlFor="email"
            className="text-white/80 text-[13px] font-medium tracking-wide"
          >
            Email ID
          </label>
          <div
            className={[
              "relative h-[56px] rounded-[14px] border-[1.5px] bg-transparent",
              "transition-colors duration-150",
              borderColor,
            ].join(" ")}
          >
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="go"
              placeholder="Your email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full h-full bg-transparent outline-none px-4 pr-12 text-white text-[16px] placeholder:text-white/40 caret-[#C3F53C]"
            />
            {isValid && (
              <Check
                size={22}
                strokeWidth={3}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C3F53C]"
              />
            )}
          </div>
        </div>

        <div className="flex-1" />

        <div className="pb-10 pt-6">
          <PrimaryButton disabled={!isValid} loading={submitting} type="submit">
            Proceed
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}
