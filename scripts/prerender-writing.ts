import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  writingSeo,
  writingIndexUrl,
  writingPostUrl,
} from "../src/config/writing-seo";
import { applyMeta, type PageMeta } from "./meta-html";
import { loadWritingPostsFromDisk } from "./load-writing-posts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");

function writePrerenderedHtml(relativeDir: string, meta: PageMeta): void {
  const outDir = path.join(distDir, relativeDir);
  fs.mkdirSync(outDir, { recursive: true });
  const template = fs.readFileSync(templatePath, "utf-8");
  const html = applyMeta(template, meta);
  fs.writeFileSync(path.join(outDir, "index.html"), html);
}

function baseMeta(overrides: Partial<PageMeta> & Pick<PageMeta, "title" | "ogTitle" | "description" | "canonical" | "ogType">): PageMeta {
  return {
    author: writingSeo.author,
    ogImage: writingSeo.defaultOgImage,
    twitterCard: writingSeo.twitterCard,
    ...overrides,
  };
}

const template = fs.readFileSync(templatePath, "utf-8");
if (!template.includes("<div id=\"root\">")) {
  throw new Error("dist/index.html missing — run vite build first");
}

writePrerenderedHtml(
  "writing",
  baseMeta({
    title: writingSeo.documentTitle(writingSeo.sectionTitle),
    ogTitle: writingSeo.sectionTitle,
    description: writingSeo.sectionDescription,
    canonical: writingIndexUrl(),
    ogType: "website",
  }),
);

const posts = loadWritingPostsFromDisk();
for (const post of posts) {
  writePrerenderedHtml(
    path.join("writing", post.slug),
    baseMeta({
      title: writingSeo.documentTitle(post.title),
      ogTitle: post.title,
      description: post.description,
      canonical: writingPostUrl(post.slug),
      ogType: "article",
      ogImage: post.ogImage ?? writingSeo.defaultOgImage,
    }),
  );
}

console.log(`Prerendered /writing and ${posts.length} post(s).`);
