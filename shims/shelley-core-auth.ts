/** Stand-in for `@shelley/core/auth`: always a signed-out visitor. See README. */
type AuthState = { user: null; isLoading: false };

const state: AuthState = { user: null, isLoading: false };

export function useAuthStore<T>(selector: (s: AuthState) => T): T {
  return selector(state);
}
