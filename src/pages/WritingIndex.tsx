import { Link } from "react-router-dom";
import { format } from "date-fns";
import Layout from "@/components/layout/Layout";
import WritingSeo from "@/components/WritingSeo";
import { writingSeo } from "@/config/writing-seo";
import { getAllPosts } from "@/lib/writing";

const WritingIndex = () => {
  const posts = getAllPosts();

  return (
    <Layout>
      <WritingSeo />
      <article className="container">
        <header className="mb-section">
          <h1 className="font-serif text-3xl md:text-4xl font-normal mb-4 tracking-normal">
            {writingSeo.sectionTitle}
          </h1>
          <p className="prose text-body text-muted-foreground font-sans">
            {writingSeo.sectionDescription}
          </p>
        </header>

        <section>
          {posts.length === 0 ? (
            <p className="text-body text-muted-foreground font-sans">No posts yet.</p>
          ) : (
            <ul className="space-y-10">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article>
                    <time
                      dateTime={post.date}
                      className="font-sans text-small text-muted-foreground block mb-2"
                    >
                      {format(new Date(post.date), "MMMM d, yyyy")}
                    </time>
                    <h2 className="font-serif text-xl font-normal mb-2">
                      <Link
                        to={`/writing/${post.slug}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="prose text-body text-muted-foreground font-sans mb-2">
                      {post.description}
                    </p>
                    <Link
                      to={`/writing/${post.slug}`}
                      className="font-sans text-small text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Read more
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
    </Layout>
  );
};

export default WritingIndex;
