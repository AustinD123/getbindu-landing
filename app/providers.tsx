"use client";

/**
 * Landing-repo stand-in for shelley's platform/providers.tsx. The only
 * provider a landing page needs is TanStack Query, because the home page's
 * redirect-if-authenticated calls useQuery (kept disabled while signed out).
 */
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
