import writingFooterMarkdown from "@/content/writing-footer.md?raw";
import { parseWritingPost, sortPostsByDateDesc } from "./parse-writing-post";
import type { WritingPost } from "./writing-types";

export type { WritingPost, WritingPostMeta } from "./writing-types";

export function getWritingFooterMarkdown(): string {
  return writingFooterMarkdown.trim();
}

const postModules = import.meta.glob("/src/content/writing/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const allPostsParsed: WritingPost[] = Object.entries(postModules).map(([path, raw]) =>
  parseWritingPost(path, raw),
);

export function getAllPosts(): WritingPost[] {
  return sortPostsByDateDesc(allPostsParsed.filter((p) => p.published));
}

export function getPostBySlug(slug: string): WritingPost | undefined {
  return allPostsParsed.find((p) => p.slug === slug && p.published);
}
