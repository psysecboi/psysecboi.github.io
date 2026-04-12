import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="page">
      <h1>{post.title}</h1>
      <p className="muted">{post.date}</p>
      <hr />
      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
