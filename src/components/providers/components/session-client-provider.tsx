"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function SessionClientProvider({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
