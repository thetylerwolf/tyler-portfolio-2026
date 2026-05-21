import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import Layout from "@/components/layout/Layout";
import Markdown from "@/components/Markdown";
import WritingSeo from "@/components/WritingSeo";
import { getPostBySlug, getWritingFooterMarkdown } from "@/lib/writing";

const WritingPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const footerMarkdown = getWritingFooterMarkdown();

  if (!post) {
    return (
      <Layout>
        <article className="container">
          <h1 className="font-serif text-3xl md:text-4xl font-normal mb-4 tracking-normal">
            Post not found
          </h1>
          <p className="text-body text-muted-foreground font-sans mb-6">
            That post does not exist or is not published.
          </p>
          <Link
            to="/writing"
            className="font-sans text-small text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Writing
          </Link>
        </article>
      </Layout>
    );
  }

  return (
    <Layout>
      <WritingSeo post={post} />
      <article className="container">
        <header className="mb-section">
          <Link
            to="/writing"
            className="font-sans text-small text-muted-foreground hover:text-foreground transition-colors block mb-6"
          >
            ← Writing
          </Link>
          <time
            dateTime={post.date}
            className="font-sans text-small text-muted-foreground block mb-2"
          >
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          <h1 className="font-serif text-3xl md:text-4xl font-normal mb-4 tracking-normal">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="font-sans text-muted-foreground text-body mb-6">
              {post.subtitle}
            </p>
          )}
        </header>
        <section className="prose">
          <Markdown content={post.body} />
        </section>
        {footerMarkdown && (
          <section className="prose writing-post-footer">
            <Markdown content={footerMarkdown} />
          </section>
        )}
      </article>
    </Layout>
  );
};

export default WritingPost;
