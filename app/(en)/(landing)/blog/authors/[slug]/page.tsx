import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IslandHeader } from "@/features/landing/chrome/island-header";
import { LandingFooter } from "@/features/landing/chrome/landing-footer";
import { TEAM, getTeamMember, SITE_URL } from "@/features/landing/seo/team";
import { getAllPosts, formatPostDate } from "@/features/landing/blog/posts";
import { AuthorAvatar } from "@/features/landing/blog/author-avatar";
import "@/features/landing/blog/blog.css";
import { blogHreflang } from "@/features/landing/blog/hreflang";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return Object.keys(TEAM).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = TEAM[slug];
  if (!member) return {};
  const url = `/blog/authors/${slug}`;
  const title = `${member.name}, ${member.jobTitle} at Bindu`;
  return {
    title,
    description: member.bio,
    alternates: { canonical: url, languages: blogHreflang(url) },
    openGraph: {
      type: "profile",
      siteName: "Bindu",
      title,
      description: member.bio,
      url,
      // The author's portrait (a 240x240 square under /public/images/team)
      // when one exists; the generic site card only for a member without one.
      images: member.avatar
        ? [{ url: member.avatar, width: 240, height: 240, alt: member.name }]
        : [{ url: "/bindu-card.jpg", width: 1200, height: 630, alt: "Bindu" }],
    },
    // Without this the page inherits the root summary_large_image card and
    // its generic site image, so X would show a wide banner while every other
    // network showed the portrait. A square portrait is a summary card.
    twitter: member.avatar
      ? {
          card: "summary",
          site: "@getbindu",
          creator: "@getbindu",
          title,
          description: member.bio,
          images: [member.avatar],
        }
      : {
          card: "summary_large_image",
          site: "@getbindu",
          creator: "@getbindu",
          title,
          description: member.bio,
          images: ["/bindu-card.jpg"],
        },
  };
}

export default async function AuthorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = TEAM[slug];
  if (!member) notFound();
  // Resolve here so an unknown slug 404s above rather than throwing.
  const author = getTeamMember(slug);
  const posts = getAllPosts().filter((p) => p.authorSlug === slug);
  const pageUrl = `${SITE_URL}/blog/authors/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profile`,
    mainEntity: {
      "@type": "Person",
      "@id": `${pageUrl}#person`,
      url: pageUrl,
      name: author.name,
      jobTitle: author.jobTitle,
      description: author.bio,
      knowsAbout: author.knowsAbout,
      email: author.email,
      ...(author.avatar ? { image: `${SITE_URL}${author.avatar}` } : {}),
      worksFor: { "@id": `${SITE_URL}#org` },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IslandHeader active="blog" pinnedMode="light" />
      <main id="main">
        <article className="mx-auto max-w-2xl px-5 pt-24 pb-20">
          <nav className="mb-8 text-sm text-[var(--stage-fg-subtle)]">
            <Link href="/blog" className="hover:text-[var(--brand)]">
              &larr; Blog
            </Link>
          </nav>

          <div className="lp-author-head">
            <AuthorAvatar
              author={author}
              size={72}
              fallbackClassName="lp-author-initials"
              priority
            />
            <div>
              <h1>{author.name}</h1>
              <p>{author.jobTitle}, Bindu</p>
            </div>
          </div>

          <p className="lp-author-bio">{author.bio}</p>

          <h2 className="lp-author-kicker">Areas of expertise</h2>
          <ul className="lp-author-topics">
            {author.knowsAbout.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          {author.email ? (
            <p className="lp-author-meta">
              Contact: <a href={`mailto:${author.email}`}>{author.email}</a>
            </p>
          ) : null}

          <p className="lp-author-meta">
            Editorial standards: every guide is written and maintained from the
            primary regulation text, not third-party summaries.
          </p>

          {posts.length ? (
            <>
              <h2 className="lp-author-kicker">
                Articles by {author.name}
                <span className="ml-2 font-normal">{posts.length}</span>
              </h2>
              <ul className="lp-author-posts">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>
                      <span className="lp-author-post-title">{p.title}</span>
                      <span className="lp-author-post-meta">
                        {formatPostDate(p.date)} &middot; {p.readingMinutes} min
                        read
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </article>
      </main>
      <LandingFooter />
    </div>
  );
}
