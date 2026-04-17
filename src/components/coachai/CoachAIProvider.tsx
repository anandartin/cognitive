"use client";

import { ReactNode, useMemo, useState } from "react";
import { CoachAIContext } from "@/store/useCoachAI";

export default function CoachAIProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);

  const value = useMemo(
    () => ({ email, setEmail, verified, setVerified }),
    [email, verified],
  );

  return (
    <CoachAIContext.Provider value={value}>{children}</CoachAIContext.Provider>
  );
}
