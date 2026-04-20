import Link from "next/link";
import SiteHeader from "@/components/site-header";

export default function NotFound() {
  return (
    <main className="page">
      <SiteHeader />
      <section className="not-found-shell" aria-labelledby="not-found-title">
        <p className="not-found-code">Error 404</p>
        <h2 id="not-found-title" className="not-found-title">
          Page not found :(
        </h2>
        <Link href="/" className="not-found-cta">
          back home
        </Link>
      </section>
    </main>
  );
}
