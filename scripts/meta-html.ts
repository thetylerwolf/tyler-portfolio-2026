export interface PageMeta {
  title: string;
  ogTitle: string;
  description: string;
  canonical: string;
  ogType: "website" | "article";
  ogImage: string;
  author: string;
  twitterCard: string;
}

/** Remove default SEO tags from the Vite HTML template before injecting page-specific meta. */
export function stripSeoTags(html: string): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta name="description"[^>]*\/?>\s*/gi, "")
    .replace(/<meta name="author"[^>]*\/?>\s*/gi, "")
    .replace(/<link rel="canonical"[^>]*\/?>\s*/gi, "")
    .replace(/<meta property="og:[^"]+"[^>]*\/?>\s*/gi, "")
    .replace(/<meta name="twitter:[^"]+"[^>]*\/?>\s*/gi, "");
}

function buildMetaBlock(meta: PageMeta): string {
  return `    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeAttr(meta.description)}" />
    <meta name="author" content="${escapeAttr(meta.author)}" />
    <link rel="canonical" href="${escapeAttr(meta.canonical)}" />

    <meta property="og:title" content="${escapeAttr(meta.ogTitle)}" />
    <meta property="og:description" content="${escapeAttr(meta.description)}" />
    <meta property="og:type" content="${escapeAttr(meta.ogType)}" />
    <meta property="og:url" content="${escapeAttr(meta.canonical)}" />
    <meta property="og:image" content="${escapeAttr(meta.ogImage)}" />

    <meta name="twitter:card" content="${escapeAttr(meta.twitterCard)}" />
    <meta name="twitter:title" content="${escapeAttr(meta.ogTitle)}" />
    <meta name="twitter:description" content="${escapeAttr(meta.description)}" />
    <meta name="twitter:image" content="${escapeAttr(meta.ogImage)}" />

`;
}

export function applyMeta(template: string, meta: PageMeta): string {
  const stripped = stripSeoTags(template);
  return stripped.replace(
    /(<meta name="viewport"[^>]*\/?>)\s*/i,
    `$1\n\n${buildMetaBlock(meta)}`,
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
