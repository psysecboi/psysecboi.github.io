import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import ThemeToggle from "@/components/theme-toggle";

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <main className="page">
      <header className="topbar">
        <h1>
          <Link href="/" className="site-name">
            Payas Vaishnav
          </Link>
        </h1>
        <div className="topbar-right">
          <nav>
            <Link href="/collection" className="top-link">
              Collection
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <h2 className="collection-title">Collection</h2>
      <p className="muted">A collection of thoughts, notes and interesting reads. These are pieces written by me or interesting things I've come across.</p>

      {posts.length === 0 ? (
        <p className="muted">Will be added soon :)</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="post-date">{formatDate(post.date)}</span>
              {" : "}
              <Link className="post-title" href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}