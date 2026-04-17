"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Logo from "@/components/coachai/Logo";
import StatusBar from "@/components/coachai/StatusBar";
import { useCoachAI } from "@/store/useCoachAI";

export default function WelcomeScreen() {
  const router = useRouter();
  const { email, verified } = useCoachAI();

  useEffect(() => {
    if (!verified) router.replace("/coachai/signup");
  }, [verified, router]);

  return (
    <div className="relative flex-1 flex flex-col bg-black coachai-fadein">
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <Logo size={64} />

        <div className="mt-6 flex items-center gap-2 text-[#C3F53C]">
          <CheckCircle2 size={18} strokeWidth={2.4} />
          <span className="text-[13px] font-semibold tracking-wide uppercase">
            Account verified
          </span>
        </div>

        <h1 className="mt-4 text-white text-[28px] font-bold tracking-tight">
          Welcome to CoachAI
        </h1>
        <p className="mt-3 text-white/60 text-[15px] leading-[1.45] max-w-[300px]">
          {email ? (
            <>
              You&rsquo;re signed in as{" "}
              <span className="text-white/90">{email}</span>. Your personalised
              coaching experience is coming next.
            </>
          ) : (
            "Your personalised coaching experience is coming next."
          )}
        </p>
      </div>
    </div>
  );
}
