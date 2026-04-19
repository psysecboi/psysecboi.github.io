"use client";

import { useEffect, useState } from "react";

type LoveMap = Record<string, boolean>;

const STORAGE_KEY = "post-love-toggles";

function getLoveMap(): LoveMap {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed as LoveMap;
  } catch {
    return {};
  }
}

function saveLoveMap(map: LoveMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export default function PostLove({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const map = getLoveMap();
    setLiked(Boolean(map[slug]));
    setReady(true);
  }, [slug]);

  const handleLove = () => {
    const map = getLoveMap();
    const nextLiked = !Boolean(map[slug]);
    map[slug] = nextLiked;
    saveLoveMap(map);
    setLiked(nextLiked);
  };

  return (
    <section className="post-love" aria-label="Love this post">
      <button
        type="button"
        className={`post-love-button ${liked ? "liked" : ""}`}
        onClick={handleLove}
        aria-pressed={liked}
      >
        <span className="post-love-heart" aria-hidden="true">
          {liked ? "♥" : "♡"}
        </span>
        <span className="post-love-number">{ready ? (liked ? 1 : 0) : 0}</span>
      </button>
    </section>
  );
}
