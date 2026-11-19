/** Stand-in for `@shelley/core/workspace`: no backend, so no workspaces. The
 *  only caller keeps the query disabled while signed out, which is always. */
export function workspaceListOptions() {
  return {
    queryKey: ["workspaces", "list"] as const,
    queryFn: async (): Promise<unknown[]> => [],
  };
}
