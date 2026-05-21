import type { WritingPost } from "./writing-types";

export function slugFromPath(path: string): string {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(/\.md$/, "");
}

function splitFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }

  const end = trimmed.indexOf("\n---", 4);
  if (end === -1) {
    return { data: {}, content: raw.trim() };
  }

  const yamlBlock = trimmed.slice(4, end).trim();
  const content = trimmed.slice(end + 4).replace(/^\r?\n/, "").trim();
  return { data: parseSimpleYaml(yamlBlock), content };
}

function parseSimpleYaml(yaml: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  for (const line of yaml.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;

    const key = trimmed.slice(0, colon).trim();
    let value = trimmed.slice(colon + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value === "true") data[key] = true;
    else if (value === "false") data[key] = false;
    else data[key] = value;
  }

  return data;
}

export function parseWritingPost(path: string, raw: string): WritingPost {
  const { data, content } = splitFrontmatter(raw);
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

  const subtitle =
    typeof data.subtitle === "string" && data.subtitle.trim()
      ? data.subtitle.trim()
      : undefined;

  return {
    title: title.trim(),
    subtitle,
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
