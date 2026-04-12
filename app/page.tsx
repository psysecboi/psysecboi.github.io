import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { getAllPosts } from "@/lib/blog";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  const posts = getAllPosts();

  const socials: { label: string; href: string; icon: IconType }[] = [
    { label: "Twitter", href: "https://x.com/psysecboi", icon: FaXTwitter },
    { label: "LinkedIn", href: "https://linkedin.com/in/payasv", icon: FaLinkedin },
    { label: "GitHub", href: "https://github.com/psysecboi", icon: FaGithub },
    { label: "Email", href: "mailto:replypkv@gmail.com", icon: Mail },
  ];

  const recentPosts = posts.slice(0, 10);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

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

      <section className="intro-grid">
        <div className="intro-copy">
          <p className="tagline">Always learning, leading, and solving problems :)</p>
          <p>
            I work on large-scale software, distributed systems and data pipelines, with a focus on
            performance, reliability, security and system design. I am currently
            pursuing Computer Science at Pandit Deendayal Energy
            University.
          </p>
          <p>
            I will be joining <a href="https://www.visa.co.in/" target="_blank" rel="noopener noreferrer">Visa</a> as a System Architect Intern.
          </p>
          <p>
            Previously, I worked at <a href="https://www.jio.com" target="_blank" rel="noopener noreferrer">Jio Platforms</a> as a SDE Intern, on a network instrumentation
            system for processing and analyzing large-scale network traffic. My
            work involved building C++ microservices for packet parsing and
            developing data pipelines using Kafka and Docker.
          </p>
          <p>
            I also build independent systems and explore problems in
            data processing, system design, and quantitative analysis.
          </p>
          <p>
            I am an active competitive programmer (<a href="https://codeforces.com/profile/psysecboi" target="_blank" rel="noopener noreferrer">Codeforces Specialist</a>, Meta hackercup Round-2 Qualifier) and have led
            initiatives to teach and scale problem-solving across a large group
            of students (100+), as a vice-chair of the ACM student chapter at my university.
          </p>
          <p>
            I am interested in designing systems that are simple, efficient,
            and reliable, and in understanding how they behave under real-world
            constraints.
          </p>
          <p>
            Alongside this, I have an active interest in geopolitics, enjoy playing the tabla 
            and ukulele, and follow and play a variety of sports.
          </p>
        </div>

        <div className="profile-wrap">
          <Image
            className="profile-image"
            src="/profile.jpg"
            alt="Payas Vaishnav"
            width={1500}
            height={450}
          />

          <ul className="socials">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon size={16} aria-hidden="true" />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="collection" className="recent-posts">
        <div className="recent-header">
          <h2>
            <Link href="/collection" className="recent-heading-link">
              My collection of blogs and articles
            </Link>
          </h2>
          <Link href="/collection" className="recent-view-all">
            View all →
          </Link>
        </div>
        {/* <p className="muted></p> */}
        {recentPosts.length === 0 ? (
          <p className="muted">Will be added soon :)</p>
        ) : (
          <ul className="post-list">
            {recentPosts.map((post) => (
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
      </section>
    </main>
  );
}
