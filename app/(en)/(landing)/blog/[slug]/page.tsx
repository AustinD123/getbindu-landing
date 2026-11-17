import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/features/landing/blog/posts";
import {
  BlogArticle,
  blogPostMetadata,
} from "@/features/landing/blog/blog-article";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return post ? blogPostMetadata(post, "en") : {};
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <BlogArticle post={post} locale="en" />;
}
