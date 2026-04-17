import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import CoachAIProvider from "@/components/coachai/CoachAIProvider";
import "./coachai.css";

export const metadata: Metadata = {
  title: "CoachAI – Your AI-powered fitness coach",
  description: "Create your CoachAI account and start training smarter.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function CoachAILayout({ children }: { children: ReactNode }) {
  return (
    <div className="coachai-root">
      <div className="coachai-viewport">
        <CoachAIProvider>{children}</CoachAIProvider>
      </div>
    </div>
  );
}
