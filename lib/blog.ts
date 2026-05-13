import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  published: boolean;
  type?: "Original" | "Curated";
  description?: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
  readingTimeMinutes: number;
};

const CONTENT_DIRECTORY = path.join(process.cwd(), "content");

function getMarkdownBySlug(slug: string): string {
  const fullPath = path.join(CONTENT_DIRECTORY, `${slug}.md`);
  return fs.readFileSync(fullPath, "utf8");
}

export function getAllPosts(): BlogPostMeta[] {
  const fileNames = fs.readdirSync(CONTENT_DIRECTORY);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const markdown = getMarkdownBySlug(slug);
      const { data } = matter(markdown);

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        published: data.published !== false,
        type: data.type ?? "Original",
        description: String(data.description ?? ""),
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(CONTENT_DIRECTORY);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const markdown = getMarkdownBySlug(slug);
  const { data, content } = matter(markdown);
  const processed = await remark().use(html).process(content);
  // Add target and rel attributes to external links so they open in a new tab.
  // We only modify anchors without an existing `target` attribute and
  // whose `href` is protocol-relative or starts with http/https.
  let contentHtml = processed.toString();
  contentHtml = contentHtml.replace(/<a([^>]*?)href="((?:https?:)?\/\/[^"\s]+)"(?![^>]*\btarget=)([^>]*)>/g, '<a$1href="$2"$3 target="_blank" rel="noopener noreferrer">');
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    published: data.published !== false,
    type: data.type ?? "Original",
    description: String(data.description ?? ""),
    contentHtml,
    readingTimeMinutes,
  };
}
