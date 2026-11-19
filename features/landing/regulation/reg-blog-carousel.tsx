"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PostCard } from "@/features/landing/blog/posts";

/**
 * Horizontal scroll-snap carousel for the "From the blog" band. Native
 * overflow scrolling (swipe on touch, wheel/drag on trackpad) carries the
 * behaviour; the prev/next buttons are a supplementary desktop affordance that
 * only appear when the track actually overflows, and disable at each end. The
 * cards reuse the "Go deeper" spoke-index visuals so the band stays a sibling
 * of it.
 */
export function RegBlogCarousel({
  posts,
  eyebrow,
  heading,
}: {
  posts: PostCard[];
  eyebrow: string;
  heading: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflowing(max > 4);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".rbb-card");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="rbb-head">
        <div className="rbb-headings">
          <span className="st-eyebrow">{eyebrow}</span>
          <h2 className="st-h2 rbb-h2">{heading}</h2>
        </div>
        {overflowing ? (
          <div className="rbb-controls">
            <button
              type="button"
              className="rbb-arrow-btn"
              aria-label="Previous articles"
              disabled={atStart}
              onClick={() => step(-1)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="rbb-arrow-btn"
              aria-label="Next articles"
              disabled={atEnd}
              onClick={() => step(1)}
            >
              <ChevronRight />
            </button>
          </div>
        ) : null}
      </div>

      <div className="rbb-track" ref={trackRef} aria-label="Related articles">
        {posts.map((post) => (
          <Link className="rbb-card" href={`/blog/${post.slug}`} key={post.slug}>
            <span className="rbb-cite">
              {post.category} · {post.readingMinutes} min read
            </span>
            <span className="rbb-main">
              <span className="rbb-name">{post.title}</span>
              <span className="rbb-desc">{post.description}</span>
            </span>
            <span aria-hidden="true" className="rbb-arrow">
              <ArrowUpRight />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
