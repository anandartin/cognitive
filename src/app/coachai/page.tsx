"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/coachai/Logo";
import StatusBar from "@/components/coachai/StatusBar";

export default function CoachAISplash() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/coachai/signup");
    const t = window.setTimeout(() => {
      router.push("/coachai/signup");
    }, 1800);
    return () => window.clearTimeout(t);
  }, [router]);

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Background image (AI-free stock-style gradient silhouette) */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 70% at 50% 30%, rgba(195,245,60,0.12) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #1a1f0e 0%, #0a0d05 60%, #000 100%)",
          }}
        />
        {/* Subtle noise / grain via gradient overlays */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            background:
              "radial-gradient(60% 40% at 30% 70%, rgba(0,0,0,0.6), transparent 60%), radial-gradient(50% 35% at 75% 40%, rgba(0,0,0,0.5), transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <StatusBar />

        <div className="flex-1 flex flex-col items-center justify-center gap-3 coachai-fadein">
          <Logo size={64} />
          <span className="text-[#C3F53C] font-extrabold text-[34px] tracking-tight">
            CoachAI
          </span>
        </div>

        <div className="pb-10 flex items-center justify-center">
          <span className="text-white/70 text-[13px] tracking-wide">
            Powered by Infosys
          </span>
        </div>
      </div>
    </div>
  );
}
