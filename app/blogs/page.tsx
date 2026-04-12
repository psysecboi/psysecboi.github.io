import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

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
        <nav>
          <Link href="/blogs" className="top-link">
            Blogs
          </Link>
        </nav>
      </header>

      <h2>Blogs</h2>
      <p className="muted">All writing in one place.</p>

      {posts.length === 0 ? (
        <p className="muted">Blogs will be added soon :)</p>
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