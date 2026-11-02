import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllCategories } from "@/lib/wordpress";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found – Longevity Reviewed" };
  }

  return {
    title: `${post.title} – Longevity Reviewed`,
    description: post.dek,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categories = await getAllCategories();

  return (
    <div className="lr-home">
      <Header categories={categories} />

      <div className="p-hero">
        <div className="wrap">
          <div className="p-eyebrow">{post.kicker || post.category?.name}</div>
          <h1>{post.title}</h1>
          <p>{post.dek}</p>
          <div className="byline" style={{ marginTop: "20px" }}>
            <b>By {post.author?.name}</b>
            <span className="sep" />
            {post.date}
            <span className="sep" />
            {post.readTime || "2 min read"}
          </div>
        </div>
      </div>

      <div className="p-article">
        {post.featuredImage?.url && (
          <div style={{ marginBottom: "32px" }}>
            <img
              src={post.featuredImage.url}
              alt={post.title}
              style={{ width: "100%", height: "auto", borderRadius: "6px", display: "block" }}
            />
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="p-disclaimer">
          <strong>Medical Disclaimer:</strong> The articles on Longevity Reviewed are for general informational purposes only and do not constitute medical advice. Consult a qualified healthcare professional before making health-related decisions.
        </div>
      </div>

      <Footer />
      <a href="#1" className="sticky-cta">
        See Top Pick →
      </a>
    </div>
  );
}
