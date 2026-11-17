"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PostCard } from "@/features/landing/blog/posts";
import {
  PHOTO_HOST,
  photoSrc,
  photoSrcSet,
} from "@/features/landing/blog/photo";
import { BLOG_LABELS, categoryLabel } from "@/features/landing/blog/blog-labels";
import { type BlogLocale, blogPostPath } from "@/features/landing/blog/locale";

type SortKey = "newest" | "oldest" | "az";

const PAGE_SIZE = 9;

/**
 * Client-side blog index in the Bindu marketing register: off-white floor,
 * white cards on a stone hairline, cobalt as the only accent (active filter +
 * the "Read article" action). Search + category filter + sort keep the archive
 * scannable as it grows by a few posts a day. Each card leads with the post's
 * editorial photo, falling back to its flow diagram.
 */
export function BlogIndex({
  posts,
  categories,
  locale = "en",
}: {
  posts: PostCard[];
  categories: string[];
  locale?: BlogLocale;
}) {
  // The locale crosses the boundary, not the labels: two of them are functions
  // (plural forms), and functions are not serializable as props.
  const t = BLOG_LABELS[locale];
  const [active, setActive] = useState<string>(BLOG_LABELS[locale].all);
  const [sort, setSort] = useState<SortKey>("newest");
  const [query, setQuery] = useState<string>("");
  const [visible, setVisible] = useState<number>(PAGE_SIZE);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = active === t.all ? posts : posts.filter((p) => p.category === active);
    if (q)
      base = base.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    const sorted = [...base];
    if (sort === "oldest") sorted.reverse();
    else if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    // "newest" keeps the server order (already date-desc).
    return sorted;
  }, [posts, active, sort, query, t.all]);

  const shown = filtered.slice(0, visible);
  const hasMore = shown.length < filtered.length;

  // Infinite scroll: once the "Show more" row scrolls into view, load the next
  // page on its own. The button stays as the keyboard and no-observer fallback.
  const moreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = moreRef.current;
    if (!node || !hasMore || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible((v) => v + PAGE_SIZE);
        }
      },
      { rootMargin: "0px 0px 320px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [hasMore, visible]);
  const chips = [t.all, ...categories];

  function pick(category: string) {
    setActive(category);
    setVisible(PAGE_SIZE);
  }

  return (
    <div className="mt-10">
      {/* Card thumbnails come from a third-party host; warm it once here
          rather than paying the handshake on the first card. */}
      <link rel="preconnect" href={PHOTO_HOST} crossOrigin="" />
      {/* Search */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--stage-fg-faint)]"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchPlaceholder}
          className="w-full rounded-xl border border-[var(--stage-border-strong)] bg-white py-3 pl-11 pr-4 text-[0.9375rem] text-[var(--stage-fg)] outline-none transition-colors placeholder:text-[var(--stage-fg-faint)] focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
        />
      </div>

      {/* Category filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {chips.map((chip) => {
          const isActive = chip === active;
          const count = chip === t.all ? posts.length : (counts.get(chip) ?? 0);
          return (
            <button
              key={chip}
              type="button"
              onClick={() => pick(chip)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                  : "border-[var(--stage-border)] bg-white text-[var(--stage-fg-muted)] hover:border-[var(--stage-border-strong)] hover:text-[var(--stage-fg)]"
              }`}
            >
              {chip === t.all ? chip : categoryLabel(chip, locale)}
              <span
                className={`ml-1.5 ${isActive ? "text-white/70" : "text-[var(--stage-fg-faint)]"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result count + sort */}
      <div className="mt-6 flex items-center justify-between border-b border-[var(--stage-border)] pb-4">
        <p
          className="text-sm text-[var(--stage-fg-subtle)]"
          role="status"
          aria-live="polite"
        >
          {hasMore
            ? t.showingOf(shown.length, filtered.length)
            : t.articleCount(filtered.length)}
        </p>
        <label className="flex items-center gap-2 text-sm text-[var(--stage-fg-subtle)]">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em]">
            {t.sort}
          </span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-md border border-[var(--stage-border-strong)] bg-white px-2.5 py-1.5 text-sm font-medium text-[var(--stage-fg)] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
          >
            <option value="newest">{t.newest}</option>
            <option value="oldest">{t.oldest}</option>
            <option value="az">{t.alphabetical}</option>
          </select>
        </label>
      </div>

      {/* Card grid */}
      {shown.length === 0 ? (
        <p className="mt-16 text-center text-[var(--stage-fg-subtle)]">
          {t.noMatches}
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post, i) => (
            <li key={post.slug} className="flex">
              <Link
                href={blogPostPath(post.slug, locale)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-[var(--stage-border)] bg-white transition-colors hover:border-[var(--brand-tint)]"
              >
                {/* Thumbnail: the editorial photo, falling back to the flow diagram */}
                {post.photo || post.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- hotlinked Unsplash photo / SVG diagram, both bypass the image optimizer
                  <img
                    src={
                      post.photo ? photoSrc(post.photo.url, 600) : post.image
                    }
                    srcSet={
                      post.photo
                        ? photoSrcSet(post.photo.url, [300, 600, 900])
                        : undefined
                    }
                    // Three columns above 64rem, two above 40rem, one below.
                    sizes={post.photo ? "(min-width: 64rem) 18rem, (min-width: 40rem) 45vw, 100vw" : undefined}
                    alt={post.photo ? post.photo.alt : post.imageAlt}
                    // The first row is above the fold, so lazy-loading it only
                    // delays the largest thing the reader sees.
                    loading={i < 3 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : undefined}
                    decoding="async"
                    className="aspect-[16/9] w-full border-b border-[var(--stage-border)] object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/9] w-full items-center justify-center border-b border-[var(--stage-border)] bg-[var(--stage-fill)] text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[var(--stage-fg-subtle)]">
                    {categoryLabel(post.category, locale)}
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]">
                    <span className="text-[var(--stage-fg-muted)]">
                      {categoryLabel(post.category, locale)}
                    </span>
                    <span className="text-[var(--stage-fg-faint)]">·</span>
                    <span className="text-[var(--stage-fg-faint)]">
                      {post.readingMinutes} {t.minRead}
                    </span>
                  </div>
                  <h2 className="text-[1.3125rem] font-normal leading-snug text-[var(--stage-fg)] transition-colors group-hover:text-[var(--brand)]">
                    {post.title}
                  </h2>
                  <p className="line-clamp-3 text-[0.9375rem] leading-6 text-[var(--stage-fg-muted)]">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 text-[0.8125rem]">
                    <span className="text-[var(--stage-fg-faint)]">
                      {post.dateLabel}
                    </span>
                    <span className="font-medium text-[var(--brand)]">
                      {t.readArticle}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {hasMore && (
        <div ref={moreRef} className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-[var(--stage-border-strong)] bg-white px-6 py-2.5 text-sm font-medium text-[var(--stage-fg)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            {t.showMore}
          </button>
        </div>
      )}
    </div>
  );
}
