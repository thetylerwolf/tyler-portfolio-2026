import { useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";
import { removeStaticSeoTags } from "@/lib/remove-static-seo";
import {
  writingSeo,
  writingIndexUrl,
  writingPostUrl,
} from "@/config/writing-seo";
import type { WritingPostMeta } from "@/lib/writing-types";

interface WritingSeoProps {
  post?: WritingPostMeta;
}

const WritingSeo = ({ post }: WritingSeoProps) => {
  useLayoutEffect(() => {
    removeStaticSeoTags();
  }, []);

  const isIndex = !post;
  const pageTitle = isIndex ? writingSeo.sectionTitle : post.title;
  const documentTitle = writingSeo.documentTitle(pageTitle);
  const description = isIndex ? writingSeo.sectionDescription : post.description;
  const canonical = isIndex ? writingIndexUrl() : writingPostUrl(post.slug);
  const ogImage = post?.ogImage ?? writingSeo.defaultOgImage;
  const ogType = isIndex ? "website" : "article";

  return (
    <Helmet>
      <title>{documentTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={writingSeo.author} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content={writingSeo.twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default WritingSeo;
