/** Stand-in for `@shelley/core/paths`: just what the landing imports. The app
 *  routes these point at live in shelley, not here. */
export const paths = {
  workspacesHub: () => "/workspaces",
};

export type PostAuthStep = { kind: "navigate"; to: string };

export function resolvePostAuthStep(
  _workspaces: unknown[],
  nextUrl: string | null,
): PostAuthStep {
  return { kind: "navigate", to: nextUrl ?? "/threads/new" };
}
