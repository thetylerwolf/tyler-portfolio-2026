import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseWritingPost, sortPostsByDateDesc } from "../src/lib/parse-writing-post";
import type { WritingPost } from "../src/lib/writing-types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const writingDir = path.resolve(__dirname, "../src/content/writing");

export function loadWritingPostsFromDisk(): WritingPost[] {
  if (!fs.existsSync(writingDir)) {
    return [];
  }

  const files = fs.readdirSync(writingDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const filePath = path.join(writingDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    return parseWritingPost(`/src/content/writing/${file}`, raw);
  });

  return sortPostsByDateDesc(posts.filter((p) => p.published));
}
