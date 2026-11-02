import Link from "next/link";

export default function LatestReporting({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2>Latest Reporting</h2>
          <Link href="/category/latest">View all →</Link>
        </div>
        <div className="latest">
          {posts.map((post) => (
            <article key={post.id} className="card">
              <Link
                href={`/article/${post.slug}`}
                className="img"
                style={{
                  backgroundImage: `url('${post.featuredImage?.url}')`,
                }}
              />
              <Link className="c-kicker" href={`/category/${post.category?.slug || "emerging"}`}>
                {post.kicker || post.category?.name}
              </Link>
              <h3>
                <Link href={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.dek}</p>
              <div className="c-meta">
                By {post.author?.name} · {post.date}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
