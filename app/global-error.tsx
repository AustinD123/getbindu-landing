"use client";

// Root error boundary. Next renders this only when the ROOT layout itself
// throws — the app/error.tsx boundary can't catch that, because it lives
// inside the layout. global-error replaces the whole document, so it must
// carry its own <html>/<body> and can rely on NOTHING from the app (no
// providers, fonts, or globals). Kept deliberately dependency-free and
// inline-styled so it renders even when the app shell is broken.

import { useEffect } from "react";
import { createLogger } from "@shelley/core/logger";

const log = createLogger("ui");

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    log.error("root layout render error", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "2rem",
          textAlign: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "#111",
          background: "#fff",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ opacity: 0.7, maxWidth: "28rem", margin: 0 }}>
          The application ran into an unexpected error. Please reload the page —
          if it keeps happening, contact support.
        </p>
        {error.digest ? (
          <code style={{ fontSize: "0.75rem", opacity: 0.5 }}>
            ref: {error.digest}
          </code>
        ) : null}
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #111",
            background: "transparent",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
