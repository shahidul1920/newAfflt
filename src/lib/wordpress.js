import { posts, categories, tickerItems, editorialStandards, siteMetadata } from "@/data/content";

const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://localhost/longevity/graphql";
const IS_HEADLESS_ENABLED = process.env.ENABLE_HEADLESS_WP === "true";

/**
 * Generic GraphQL fetcher for future WPGraphQL integration
 */
export async function fetchGraphQL(query, { variables } = {}) {
  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
    });

    const json = await res.json();
    if (json.errors) {
      console.error("WPGraphQL Error:", json.errors);
      throw new Error("Failed to fetch API from WordPress");
    }
    return json.data;
  } catch (error) {
    console.warn("Fallback to local static data because WPGraphQL endpoint is offline:", error.message);
    return null;
  }
}

/**
 * Get Site Metadata
 */
export function getSiteMetadata() {
  return siteMetadata;
}

/**
 * Get All Categories
 */
export async function getAllCategories() {
  if (IS_HEADLESS_ENABLED) {
    const query = `
      query GetCategories {
        categories(first: 20) {
          nodes {
            name
            slug
            count
            description
          }
        }
      }
    `;
    const data = await fetchGraphQL(query);
    if (data?.categories?.nodes) {
      return [{ name: "Latest", slug: "latest", count: posts.length, isLive: true }, ...data.categories.nodes];
    }
  }
  return categories;
}

/**
 * Get Category by slug
 */
export async function getCategoryBySlug(slug) {
  const all = await getAllCategories();
  return all.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Get Ticker Items
 */
export async function getTickerItems() {
  if (IS_HEADLESS_ENABLED) {
    const query = `
      query GetTickerItems {
        posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            title
            slug
          }
        }
      }
    `;
    const data = await fetchGraphQL(query);
    if (data?.posts?.nodes) return data.posts.nodes;
  }
  return tickerItems;
}

/**
 * Get All Posts
 */
export async function getAllPosts() {
  if (IS_HEADLESS_ENABLED) {
    const query = `
      query GetAllPosts {
        posts(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            databaseId
            slug
            title
            excerpt
            content
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `;
    const data = await fetchGraphQL(query);
    if (data?.posts?.nodes) {
      return data.posts.nodes.map((node) => ({
        id: node.id,
        databaseId: node.databaseId,
        slug: node.slug,
        title: node.title,
        kicker: node.categories?.nodes[0]?.name || "Reporting",
        dek: node.excerpt ? node.excerpt.replace(/<[^>]+>/g, "") : "",
        author: { name: node.author?.node?.name || "Longevity Reviewed" },
        date: new Date(node.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: "3 min read",
        category: node.categories?.nodes[0] || { name: "Reporting", slug: "reporting" },
        featuredImage: { url: node.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80" },
        content: node.content
      }));
    }
  }
  return posts;
}

/**
 * Get Lead Article for Hero
 */
export async function getHeroLeadPost() {
  const all = await getAllPosts();
  return all.find((p) => p.heroRole === "lead") || all[0];
}

/**
 * Get Side Articles for Hero
 */
export async function getHeroSidePosts() {
  const all = await getAllPosts();
  return all.filter((p) => p.heroRole === "side").slice(0, 4);
}

/**
 * Get Latest Reporting Cards (4-column grid)
 */
export async function getLatestReportingPosts() {
  const all = await getAllPosts();
  return all.filter((p) => p.isLatestCard);
}

/**
 * Get Topic Bands for Homepage (Physical, Diet, Emerging)
 */
export async function getTopicBands() {
  const all = await getAllPosts();

  const getBand = (categorySlug, label) => {
    const bandPosts = all.filter((p) => p.category?.slug.toLowerCase() === categorySlug.toLowerCase() || p.topicBand === categorySlug);
    const featured = bandPosts.find((p) => p.topicBandFeatured) || bandPosts[0];
    const mini = bandPosts.filter((p) => p.id !== featured?.id).slice(0, 3);
    return {
      title: label,
      slug: categorySlug,
      featured,
      mini
    };
  };

  return [
    getBand("physical", "Physical"),
    getBand("diet", "Diet"),
    getBand("emerging", "Emerging")
  ];
}

/**
 * Get Single Post By Slug
 */
export async function getPostBySlug(slug) {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) || null;
}

/**
 * Get Posts By Category Slug
 */
export async function getPostsByCategory(categorySlug) {
  const all = await getAllPosts();
  if (categorySlug === "latest") return all;
  return all.filter((p) => p.category?.slug.toLowerCase() === categorySlug.toLowerCase());
}

/**
 * Search Posts
 */
export async function searchPosts(query) {
  if (!query || query.trim() === "") return [];
  const all = await getAllPosts();
  const q = query.toLowerCase();
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.dek.toLowerCase().includes(q) ||
      p.kicker.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q)
  );
}

/**
 * Editorial Standards
 */
export function getEditorialStandards() {
  return editorialStandards;
}
