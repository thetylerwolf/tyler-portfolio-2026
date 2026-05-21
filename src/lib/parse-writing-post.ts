import matter from "gray-matter";
import type { WritingPost } from "./writing-types";

export function slugFromPath(path: string): string {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(/\.md$/, "");
}

export function parseWritingPost(path: string, raw: string): WritingPost {
  const { data, content } = matter(raw);
  const filenameSlug = slugFromPath(path);

  const title = data.title;
  const description = data.description;
  const date = data.date;
  const published = data.published;

  if (typeof title !== "string" || !title.trim()) {
    throw new Error(`Post ${path}: missing required frontmatter field "title"`);
  }
  if (typeof description !== "string" || !description.trim()) {
    throw new Error(`Post ${path}: missing required frontmatter field "description"`);
  }
  if (date === undefined || date === null || date === "") {
    throw new Error(`Post ${path}: missing required frontmatter field "date"`);
  }
  if (typeof published !== "boolean") {
    throw new Error(`Post ${path}: missing required frontmatter field "published" (boolean)`);
  }

  const slug =
    typeof data.slug === "string" && data.slug.trim() ? data.slug.trim() : filenameSlug;

  const dateStr =
    date instanceof Date ? date.toISOString().slice(0, 10) : String(date);

  return {
    title: title.trim(),
    description: description.trim(),
    date: dateStr,
    slug,
    published,
    ogImage: typeof data.ogImage === "string" ? data.ogImage : undefined,
    body: content.trim(),
  };
}

export function sortPostsByDateDesc(posts: WritingPost[]): WritingPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
