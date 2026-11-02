import Link from "next/link";

export default function HeroGrid({ leadPost, sidePosts = [] }) {
  if (!leadPost) return null;

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          {/* Lead Article */}
          <article className="lead">
            <Link
              href={`/article/${leadPost.slug}`}
              className="img"
              style={{
                backgroundImage: `url('${leadPost.featuredImage?.url}')`,
              }}
            />
            <Link className="kicker" href={`/category/${leadPost.category?.slug || "diet"}`}>
              {leadPost.kicker || leadPost.category?.name}
            </Link>
            <h1>
              <Link href={`/article/${leadPost.slug}`}>{leadPost.title}</Link>
            </h1>
            <p className="dek">{leadPost.dek}</p>
            <div className="byline">
              <b>By {leadPost.author?.name}</b>
              <span className="sep" />
              {leadPost.date}
              <span className="sep" />
              {leadPost.readTime || "2 min read"}
            </div>
          </article>

          {/* Side Articles (4 items) */}
          <div className="side">
            {sidePosts.map((post) => (
              <div key={post.id} className="side-item">
                <Link
                  href={`/article/${post.slug}`}
                  className="thumb"
                  style={{
                    backgroundImage: `url('${post.featuredImage?.url}')`,
                  }}
                />
                <div>
                  <Link className="s-kicker" href={`/category/${post.category?.slug || "diet"}`}>
                    {post.kicker || post.category?.name}
                  </Link>
                  <h3>
                    <Link href={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <div className="s-meta">
                    By {post.author?.name} · {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
