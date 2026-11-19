# shims

Stand-ins for the shelley monorepo packages that a few landing files import.
`tsconfig.json` maps each `@shelley/...` import path here, so the landing
files themselves stay byte-identical to shelley's and merge back as a copy.

This repo has no backend and no login, so every shim behaves as "signed-out
visitor": no user, no workspaces. Never copy this folder into shelley.

| Import | Used by |
|---|---|
| `@shelley/core/auth` | header (Sign in vs Open app), redirect-if-authenticated |
| `@shelley/core/workspace` | redirect-if-authenticated |
| `@shelley/core/paths` | redirect-if-authenticated |
| `@shelley/core/logger` | app/(en)/error.tsx, app/global-error.tsx |
| `@shelley/ui/lib/utils` | app/document-shell.tsx |
