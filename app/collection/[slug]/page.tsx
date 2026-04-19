import type { Metadata } from "next";
import { CalendarDays, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";
import SiteHeader from "@/components/site-header";
import PostLove from "@/components/post-love";
import PostShare from "@/components/post-share";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchingPost = getAllPosts().find((post) => post.slug === slug);

  if (!matchingPost) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: matchingPost.title,
    description: matchingPost.title,
  };
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="page">
      <SiteHeader />
      <h1 className="blog-post-title">{post.title}</h1>
      <div className="muted post-meta-line" aria-label="Post date and reading time">
        <span className="post-meta-item">
          <CalendarDays size={16} aria-hidden="true" />
          {formatDate(post.date)}
        </span>
        <span className="post-meta-item" aria-hidden="true">
          •
        </span>
        <span className="post-meta-item">
          <Clock3 size={16} aria-hidden="true" />
          {post.readingTimeMinutes} min read
        </span>
      </div>
      <div className="post-author">
        <Image
          className="post-author-image"
          src="/profile.jpg"
          alt="Payas Vaishnav"
          width={40}
          height={40}
        />
        <Link href="/" className="post-author-link">
          Payas Vaishnav
        </Link>
      </div>
      <hr />
      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <PostLove slug={post.slug} />
      <PostShare slug={post.slug} title={post.title} />
    </main>
  );
}
