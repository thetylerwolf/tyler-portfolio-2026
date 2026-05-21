export const writingSeo = {
  siteUrl: "https://tylernwolf.com",
  author: "Tyler Wolf",
  sectionTitle: "Writing",
  sectionDescription:
    "Essays on platform engineering, infrastructure, and building systems where reliability matters.",
  documentTitle: (title: string) => `${title} | Tyler Wolf`,
  defaultOgImage: "https://tylernwolf.com/favicon@2x.png",
  twitterCard: "summary_large_image" as const,
};

export function writingIndexUrl(): string {
  return `${writingSeo.siteUrl}/writing`;
}

export function writingPostUrl(slug: string): string {
  return `${writingSeo.siteUrl}/writing/${slug}`;
}
