# Headless WordPress & WPGraphQL Integration Plan for Longevity

This document outlines the architecture, roadmap, and step-by-step procedures to connect this **Next.js frontend** (`longevity`) to **Headless WordPress** running on XAMPP using the **WPGraphQL** plugin.

---

## 1. Project Overview & Current Architecture

### Frontend (Next.js)
- **Directory**: `/home/potato/Documents/GitHub/longevity`
- **Tech Stack**: Next.js 16 (App Router), React 19, Vanilla CSS design tokens + Tailwind CSS, pure JavaScript (no TypeScript).
- **Typography & Theme**: Google Fonts *Source Serif 4* and *DM Sans*, matching the exact editorial layout of `longevityreviewed.com`.
- **Data Layer**: Modular data abstraction in `src/lib/wordpress.js`. It currently uses structured static data in `src/data/content.js` that exactly mirrors the WPGraphQL post/category node schema.

### Backend (WordPress on XAMPP)
- **Staging / Source Directory**: `/home/potato/.gemini/antigravity-ide/scratch/longevity`
- **Target XAMPP Webroot**: `/opt/lampp/htdocs/longevity`
- **Database**: `longevity_db` (MySQL on port 3306, user: `root`, no password by default)
- **Local WordPress URL**: `http://localhost/longevity`
- **WPGraphQL Endpoint**: `http://localhost/longevity/graphql`

---

## 2. Phase-by-Phase Roadmap

### Phase 1: Launch Local WordPress on XAMPP
1. Start XAMPP services:
   ```bash
   sudo /opt/lampp/lampp start
   ```
2. Deploy the prepared WordPress files into XAMPP:
   ```bash
   sudo /home/potato/.gemini/antigravity-ide/scratch/longevity/setup_longevity.sh
   ```
3. Open `http://localhost/longevity` in your browser.
4. Complete the 1-minute WordPress initial install:
   - Site Title: `Longevity Reviewed`
   - Admin Username & Password

---

### Phase 2: Install & Configure WPGraphQL Plugin
1. In WordPress Admin (`http://localhost/longevity/wp-admin`):
   - Navigate to **Plugins** → **Add New**.
   - Search for **WPGraphQL** (by Jason Bahl).
   - Click **Install Now** and **Activate**.
2. Recommended Companion Plugins:
   - **WPGraphQL CORS**: Enables Cross-Origin Resource Sharing for local development.
   - **WPGraphQL Smart Cache**: For query caching.
3. Test the GraphQL IDE in WordPress:
   - Navigate to **GraphQL** → **GraphiQL IDE** in the WordPress sidebar.
   - Test a query:
     ```graphql
     query GetSamplePosts {
       posts(first: 5) {
         nodes {
           id
           title
           slug
         }
       }
     }
     ```
4. Verify the public endpoint:
   - Access `http://localhost/longevity/graphql` via browser or Postman.

---

### Phase 3: Enable Live GraphQL in Next.js
1. Open `.env.local` in `/home/potato/Documents/GitHub/longevity`:
   ```env
   NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost/longevity/graphql
   ENABLE_HEADLESS_WP=true
   ```
2. The data layer in `src/lib/wordpress.js` will immediately switch from `src/data/content.js` to live GraphQL requests!
3. If the WordPress server is ever stopped or unreachable, `src/lib/wordpress.js` gracefully falls back to local cached content.

---

## 3. Production GraphQL Queries Reference

### A. Homepage Data Query (`GET_HOMEPAGE_POSTS`)
```graphql
query GetHomepagePosts {
  posts(first: 30, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      id
      databaseId
      slug
      title
      excerpt
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
  categories(first: 20) {
    nodes {
      name
      slug
      count
      description
    }
  }
}
```

### B. Single Article Query by Slug (`GET_POST_BY_SLUG`)
```graphql
query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    databaseId
    title
    content
    excerpt
    date
    modified
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    author {
      node {
        name
        description
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
```

### C. Posts by Category (`GET_POSTS_BY_CATEGORY`)
```graphql
query GetPostsByCategory($categorySlug: String!) {
  posts(first: 20, where: { categoryName: $categorySlug }) {
    nodes {
      id
      slug
      title
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
}
```

---

## 4. Performance & Caching Strategy (ISR)

In Next.js App Router, all GraphQL calls in `src/lib/wordpress.js` utilize Next.js fetch caching:
```javascript
fetch(WP_GRAPHQL_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables }),
  next: { revalidate: 60 } // Revalidates every 60 seconds
});
```

### On-Demand Revalidation via Webhook
When you publish an article in WordPress:
1. Create a Next.js revalidation route: `src/app/api/revalidate/route.js`.
2. Configure a WordPress webhook plugin (or a custom hook in `functions.php`) to ping `http://localhost:3000/api/revalidate?secret=YOUR_TOKEN&slug=article-slug` on post publish.

---

## 5. Quick Verification Commands

```bash
# Start Next.js Development Server
cd /home/potato/Documents/GitHub/longevity
npm run dev

# Test WordPress WPGraphQL Endpoint
curl -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ generalSettings { title } }"}' \
  http://localhost/longevity/graphql
```

---
*Created for Longevity Reviewed. Stored in project root for future reference.*

### Post Content Archive Status
- **Articles Scraped & Verified**: 14 full-length articles (5–7 paragraphs each) mirroring `https://longevityreviewed.com/`.
- **Location**: `src/data/content.js` under `export const posts`.
- **WordPress Ingestion Ready**: All articles match standard WP post schemas (`title`, `slug`, `content`, `excerpt/dek`, `date`, `categories`, `author`, `featuredImage`).
