"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@shelley/core/auth";
import { workspaceListOptions } from "@shelley/core/workspace";
import { paths, resolvePostAuthStep } from "@shelley/core/paths";

/**
 * Client-side fallback redirect for authenticated visitors on the landing page.
 *
 * The primary path for logged-in users hitting `/` is a server-side redirect
 * in the Next.js proxy/middleware, driven by the `last_workspace_slug` cookie.
 * That cookie is set by the workspace layout on every visit. But on *first
 * login* — before the user has ever visited a workspace — the cookie is
 * absent, so the proxy falls through to the landing page. This component
 * covers that gap: once auth is resolved and the workspace list has loaded,
 * send the user to the signed-in home — the threads composer at /threads/new
 * (2026-07-15 decision: pod entry is deliberate, never a landing redirect).
 * Users still mid-onboarding (or with no workspace yet) land on the
 * workspaces hub, which renders registration/onboarding status inline.
 *
 * Renders nothing. Uses `router.replace` so the landing page never enters
 * browser history for authenticated users.
 */
export function RedirectIfAuthenticated() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  const { data: list = [], isFetched } = useQuery({
    ...workspaceListOptions(),
    enabled: !!user,
  });

  useEffect(() => {
    if (isLoading || !user || !isFetched) return;
    const step = resolvePostAuthStep(list, null);
    // "navigate" carries the destination (≥1 workspace past creation →
    // /threads/new). The inline stages ("company", "verify") only exist on
    // /login; from the landing page they resolve to the workspaces hub,
    // which hosts registration and onboarding status.
    router.replace(
      step.kind === "navigate" ? step.to : paths.workspacesHub(),
    );
  }, [isLoading, user, isFetched, list, router]);

  return null;
}
