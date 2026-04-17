"use client";

import { createContext, useContext } from "react";

export type CoachAIState = {
  email: string;
  setEmail: (email: string) => void;
  verified: boolean;
  setVerified: (verified: boolean) => void;
};

export const CoachAIContext = createContext<CoachAIState | null>(null);

export function useCoachAI(): CoachAIState {
  const ctx = useContext(CoachAIContext);
  if (!ctx) {
    throw new Error("useCoachAI must be used inside <CoachAIProvider>");
  }
  return ctx;
}
