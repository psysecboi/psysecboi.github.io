#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function toSlug(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTitleFromArgs() {
  const args = process.argv.slice(2).join(" ").trim();

  if (!args) {
    console.error("Usage: npm run post:new -- \"My Post Title\"");
    process.exit(1);
  }

  return args;
}

function buildTemplate({ title, date }) {
  return `---\ntitle: ${title}\ndate: ${date}\npublished: false\nsummary: Add a short 1-2 line summary.\n---\n\nWrite your post here.\n\n## Key points\n\n- Point 1\n- Point 2\n\n## References\n\n- Add links or notes here.\n`;
}

function createPostFile() {
  const title = getTitleFromArgs();
  const date = formatDate();
  const slug = toSlug(title);

  if (!slug) {
    console.error("Could not derive a valid slug from this title.");
    process.exit(1);
  }

  const fileName = `${date}-${slug}.md`;
  const contentDir = path.join(process.cwd(), "content");
  const filePath = path.join(contentDir, fileName);

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    console.error(`Post already exists: content/${fileName}`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, buildTemplate({ title, date }), "utf8");

  console.log("Created draft:");
  console.log(`content/${fileName}`);
  console.log("\nNext steps:");
  console.log("1) Write your post content");
  console.log("2) Set published: true when ready");
}

createPostFile();
