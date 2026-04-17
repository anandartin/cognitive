"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/coachai/Logo";
import StatusBar from "@/components/coachai/StatusBar";

export default function CoachAISplash() {
  const router = useRouter();
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    router.prefetch("/coachai/signup");
    const t = window.setTimeout(() => {
      router.push("/coachai/signup");
    }, 1800);
    return () => window.clearTimeout(t);
  }, [router]);

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden bg-black">
      <div className="absolute inset-0">
        {/* Warm, yoga-studio-at-sunset fallback — shown whenever the hero photo is missing. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 70% 25%, rgba(255, 214, 140, 0.28) 0%, rgba(0,0,0,0) 60%), radial-gradient(90% 60% at 25% 75%, rgba(75, 105, 35, 0.45) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #2a2618 0%, #141209 50%, #050402 100%)",
          }}
        />

        {/* Optional hero photo — drop the file in /public/coachai/splash-bg.jpg and it will appear. */}
        {!photoFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/coachai/splash-bg.jpg"
            alt=""
            aria-hidden
            onError={() => setPhotoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        )}

        {/* Darken top/bottom edges for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <StatusBar />

        <div className="flex-1 flex flex-col items-center justify-center gap-2 coachai-fadein">
          <Logo size={72} withWordmark />
        </div>

        <div className="pb-10 flex items-center justify-center">
          <span className="text-white/85 text-[13px] tracking-wide">
            Powered by Infosys
          </span>
        </div>
      </div>
    </div>
  );
}
