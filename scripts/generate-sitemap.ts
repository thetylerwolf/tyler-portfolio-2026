import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { writingSeo, writingPostUrl } from "../src/config/writing-seo";
import { loadWritingPostsFromDisk } from "./load-writing-posts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

const staticPaths = ["/", "/experience", "/contact", "/writing"];

const urls = [
  ...staticPaths.map((p) => `${writingSeo.siteUrl}${p === "/" ? "" : p}`),
  ...loadWritingPostsFromDisk().map((post) => writingPostUrl(post.slug)),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
console.log(`Wrote sitemap with ${urls.length} URL(s).`);
