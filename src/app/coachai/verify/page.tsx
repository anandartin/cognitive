"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/coachai/OtpInput";
import PrimaryButton from "@/components/coachai/PrimaryButton";
import ScreenHeader from "@/components/coachai/ScreenHeader";
import StatusBar from "@/components/coachai/StatusBar";
import { useCoachAI } from "@/store/useCoachAI";

const RESEND_SECONDS = 30;

export default function VerifyScreen() {
  const router = useRouter();
  const { email, setVerified } = useCoachAI();

  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If a user deep-links here without an email, bounce them back.
  useEffect(() => {
    if (!email) router.replace("/coachai/signup");
  }, [email, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => window.clearInterval(id);
  }, [cooldown]);

  const isComplete = code.length === 6;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isComplete || submitting) return;
    setSubmitting(true);
    setError(null);
    // Simulated verification — replace with a real /api/auth/verify call.
    await new Promise((r) => window.setTimeout(r, 700));
    if (code === "000000") {
      setError("That code doesn't match. Please try again.");
      setSubmitting(false);
      return;
    }
    setVerified(true);
    router.push("/coachai/welcome");
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError(null);
    await new Promise((r) => window.setTimeout(r, 500));
    setResending(false);
    setCooldown(RESEND_SECONDS);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex-1 flex flex-col bg-black coachai-fadein"
    >
      <StatusBar />

      <div className="flex-1 flex flex-col px-7 pt-8">
        <ScreenHeader
          title="Verify your account"
          subtitle={
            email
              ? `Please enter the 6-digit code sent to ${email}.`
              : "Please enter the 6-digit code sent to your email address."
          }
        />

        <div className="mt-10 flex flex-col gap-5">
          <label className="text-white/80 text-[13px] font-medium tracking-wide">
            Enter code
          </label>
          <OtpInput length={6} mask={isComplete} onChange={setCode} />

          <div className="flex items-center gap-2 text-[14px]">
            <span className="text-white/60">Didn&rsquo;t receive a code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
              className={[
                "font-semibold underline underline-offset-4 transition-colors",
                cooldown > 0 || resending
                  ? "text-white/30 cursor-not-allowed no-underline"
                  : "text-[#C3F53C] hover:text-[#B7EC28]",
              ].join(" ")}
            >
              {resending
                ? "Resending…"
                : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Resend"}
            </button>
          </div>

          {error && (
            <p className="text-[#ff6b6b] text-[13px] -mt-2">{error}</p>
          )}
        </div>

        <div className="flex-1" />

        <div className="pb-10 pt-6">
          <PrimaryButton
            disabled={!isComplete}
            loading={submitting}
            type="submit"
          >
            Proceed
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}
