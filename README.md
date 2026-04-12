# Personal Website (Next.js App Router)

A minimal, text-first personal website with markdown blog posts.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

This project uses static export (`output: "export"`) so the final site is generated in `out/`.

## Folder Structure

```text
.
├─ app/
│  ├─ blog/
│  │  └─ [slug]/
│  │     └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ content/
│  ├─ building-small.md
│  └─ welcome.md
├─ lib/
│  └─ blog.ts
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ next.config.ts
└─ package.json
```

## Writing Blog Posts

Add a markdown file in `content/`:

```md
---
title: Your Post Title
date: 2026-04-12
---

Your post content here.
```

The filename becomes the slug, so `my-note.md` is published at `/blog/my-note`.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Ensure your default branch is `main` (or update `.github/workflows/deploy.yml` if different).
5. Push to `main`; the workflow builds and deploys automatically.
6. Open the deployed URL shown in the workflow summary.

Notes:
- For a project repository (`username/repo`), the workflow sets `NEXT_PUBLIC_BASE_PATH` to `/repo` automatically.
- For a user site repository (`username/username.github.io`), base path is empty automatically.
