import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/wordpress";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category && slug !== "latest") {
    return { title: "Category – Longevity Reviewed" };
  }

  const name = category ? category.name : "Latest";
  return {
    title: `${name} – Longevity Reviewed`,
    description: category?.description || "Browse evidence-based reporting and investigative reviews.",
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [categories, category, posts] = await Promise.all([
    getAllCategories(),
    getCategoryBySlug(slug),
    getPostsByCategory(slug),
  ]);

  if (!category && slug !== "latest") {
    notFound();
  }

  const categoryName = category ? category.name : "Latest Reporting";
  const categoryDesc = category?.description || "All continuous medical and lifestyle reporting across our newsroom.";

  return (
    <div className="lr-home">
      <Header categories={categories} />

      <div className="p-hero">
        <div className="wrap">
          <div className="p-eyebrow">Section Desk</div>
          <h1>{categoryName}</h1>
          <p>{categoryDesc}</p>
        </div>
      </div>

      <div className="sec">
        <div className="wrap">
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
                <span className="c-kicker">{post.kicker || post.category?.name}</span>
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
      </div>

      <Footer />
      <a href="#1" className="sticky-cta">
        See Top Pick →
      </a>
    </div>
  );
}
