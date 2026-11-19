"use client";

// Route-segment error boundary. Next renders this when a client render throws
// anywhere below the root layout. Without it an uncaught render error showed
// Next's default error screen and nothing structured was logged — the browser
// equivalent of the backend's unlogged 500s. Here we log the error (with its
// digest, the only correlation id Next exposes across server/client) through
// the shared api logger so it lands in the console like every API failure, and
// give the user a Try again / reload path instead of a dead screen.
//
// This boundary sits inside the root layout, so app fonts and globals apply.
// The root layout itself is guarded by app/global-error.tsx.

import { useEffect } from "react";
import { createLogger } from "@shelley/core/logger";

const log = createLogger("ui");

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    log.error("unhandled render error", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div
      role="alert"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
        Something went wrong
      </h2>
      <p style={{ opacity: 0.7, maxWidth: "28rem" }}>
        An unexpected error occurred. You can try again — if it keeps happening,
        reload the page.
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
          border: "1px solid currentColor",
          background: "transparent",
          cursor: "pointer",
          font: "inherit",
        }}
      >
        Try again
      </button>
    </div>
  );
}
