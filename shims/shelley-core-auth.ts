/**
 * Stand-in for `@shelley/core/auth` (mapped in tsconfig.json paths).
 *
 * The landing header reads the signed-in user to swap "Sign in" for "Open
 * app". This repo has no auth, so the store always reports a signed-out
 * visitor. Keeping the import path identical means island-header.tsx stays
 * byte-for-byte the same file as in shelley, so merging back is a copy.
 */
type AuthState = { user: null };

const state: AuthState = { user: null };

export function useAuthStore<T>(selector: (s: AuthState) => T): T {
  return selector(state);
}
