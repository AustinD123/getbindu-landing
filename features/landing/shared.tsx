import { useEffect, useState } from "react";

export const githubUrl = "https://github.com/GetBindu/Bindu";

/**
 * What this repo is, so the star badge does not read as proof for the
 * compliance product. The stars belong to the AGENT LAYER (Apache-2.0), which
 * is a different artifact from the proprietary compliance platform this site
 * sells — the same distinction commit 987684f drew across the licence copy.
 * Every GitHub badge uses this to attribute the repo rather than showing a
 * bare count beside trade-compliance copy.
 */
export const githubRepoLabel = "Bindu agent layer on GitHub";

/** Accessible name for a GitHub badge, with the star count when it has loaded. */
export function githubBadgeLabel(stars: string | null): string {
  return stars ? `${githubRepoLabel}, ${stars} stars` : githubRepoLabel;
}

const githubRepoApiUrl = "https://api.github.com/repos/GetBindu/Bindu";

function formatStarCount(count: number) {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  }

  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return count.toLocaleString("en-US");
}

// One request per page load, shared by every consumer (hero pill, footer,
// about prose). A failed fetch settles to null and is not retried.
let starCountPromise: Promise<string | null> | null = null;

function fetchStarCount() {
  starCountPromise ??= fetch(githubRepoApiUrl, {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then(async (response) => {
      if (!response.ok) return null;
      const data = (await response.json()) as { stargazers_count?: unknown };
      return typeof data.stargazers_count === "number"
        ? formatStarCount(data.stargazers_count)
        : null;
    })
    .catch(() => null);
  return starCountPromise;
}

/** Formatted GitHub star count ("5.2k"), or null until loaded / on failure. */
export function useGithubStars() {
  const [stars, setStars] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchStarCount().then((value) => {
      if (!cancelled) setStars(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return stars;
}

export function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.84c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
