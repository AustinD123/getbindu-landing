import { getPostCardsByRegulation } from "@/features/landing/blog/posts";
import { RegBlogCarousel } from "./reg-blog-carousel";
import "@/features/landing/story/story.css";
import "./reg-blog-band.css";

/**
 * "From the blog" band — shared by every regulation pillar page. Given a
 * regulation key it pulls the posts tagged with that key (see the
 * `regulations` frontmatter field) and hands them to a scroll-snap carousel
 * whose cards match the EUDR "Go deeper" spoke index, so the two read as
 * siblings.
 *
 * Server component: reads the Markdown corpus at build time, then passes the
 * serializable cards to the client carousel (the posts loader is server-only).
 * Renders nothing when no post carries the tag, so a thin regulation (one post,
 * or none yet) degrades to an absent section instead of an empty heading.
 * Placed just before the FAQ on each page, keeping the locked
 * FAQ -> pricing -> close tail intact.
 */
export function RegBlogBand({
  reg,
  eyebrow = "From the blog",
  heading = "Read more from the blog.",
  limit = 9,
}: {
  /** Regulation key to match against each post's `regulations` frontmatter. */
  reg: string;
  eyebrow?: string;
  /** Literal, per the landing copy rules. */
  heading?: string;
  limit?: number;
}) {
  const posts = getPostCardsByRegulation(reg, limit);
  if (posts.length === 0) return null;

  return (
    <section aria-label="Related articles" className="rbb-wrap">
      <div
        aria-hidden="true"
        className="lp-island-sentinel lp-island-sentinel-abs"
        data-island-mode="light"
      />
      <div className="rbb-slab">
        <div className="st-container">
          <RegBlogCarousel posts={posts} eyebrow={eyebrow} heading={heading} />
        </div>
      </div>
    </section>
  );
}
