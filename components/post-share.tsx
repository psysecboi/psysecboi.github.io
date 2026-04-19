"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

type PostShareProps = {
  slug: string;
  title: string;
};

const SHARE_BASE_URL = "https://payasvaishnav.github.io";

export default function PostShare({ slug, title }: PostShareProps) {
  const [copied, setCopied] = useState(false);

  const postUrl = `${SHARE_BASE_URL}/collection/${slug}`;
  const encodedPostUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="post-share" aria-label="Share this post">
      <div className="post-share-row">
        <p className="muted post-share-label">Share it on:</p>
        <div className="post-share-actions">
        <button type="button" className="post-share-action" onClick={handleCopy}>
          <Copy size={14} aria-hidden="true" />
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          className="post-share-action"
          href={`https://twitter.com/intent/tweet?url=${encodedPostUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter size={13} aria-hidden="true" />
          Twitter
        </a>
        <a
          className="post-share-action"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedPostUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={13} aria-hidden="true" />
          LinkedIn
        </a>
        </div>
      </div>
    </section>
  );
}
