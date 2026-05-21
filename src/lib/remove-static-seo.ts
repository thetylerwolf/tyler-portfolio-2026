const STATIC_SEO_SELECTORS = [
  "title",
  'meta[name="description"]',
  'meta[name="author"]',
  'link[rel="canonical"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:type"]',
  'meta[property="og:url"]',
  'meta[property="og:image"]',
  'meta[name="twitter:card"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
  'meta[name="twitter:image"]',
];

/** Remove SEO tags from the HTML shell so react-helmet does not duplicate them. */
export function removeStaticSeoTags(): void {
  for (const selector of STATIC_SEO_SELECTORS) {
    document.head.querySelectorAll(selector).forEach((el) => {
      if (!el.hasAttribute("data-rh")) {
        el.remove();
      }
    });
  }
}
