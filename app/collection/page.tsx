import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import SiteHeader from "@/components/site-header";

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

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <main className="page">
      <SiteHeader />
      <h2 className="collection-title">Collection</h2>
      <p className="muted">A collection of thoughts, notes and interesting reads. These are either pieces written by me or interesting things I've come across.</p>

      {posts.length === 0 ? (
        <p className="muted">Will be added soon :)</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="post-date">{formatDate(post.date)}</span>
              {" : "}
              <Link className="post-title" href={`/collection/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}