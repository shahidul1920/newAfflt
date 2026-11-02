import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllCategories } from "@/lib/wordpress";

export const metadata = {
  title: "Affiliate Disclosure – Longevity Reviewed",
  description: "Transparency statement on affiliate links, commercial relationships, and testing methodologies.",
};

export default async function AffiliateDisclosurePage() {
  const categories = await getAllCategories();

  return (
    <div className="lr-home">
      <Header categories={categories} />

      <div className="p-hero">
        <div className="wrap">
          <div className="p-eyebrow">Compliance &amp; Transparency</div>
          <h1>Affiliate Disclosure</h1>
          <p>
            Longevityreviewed.com is owned and operated independently. In compliance with FTC guidelines, please assume product links may generate commissions.
          </p>
        </div>
      </div>

      <div className="p-article">
        <p className="p-lead">
          Longevityreviewed.com is owned and operated independently. Rankings and product positions on this site are influenced by commercial relationships, including affiliate commissions.
        </p>

        <p>
          As an Amazon Associate, we earn from qualifying purchases. This site constitutes advertising material and should not be construed as independent editorial, news, or consumer protection content.
        </p>

        <h2>How Commissions Work</h2>
        <p>
          When you click on links to third-party merchant sites (such as Amazon or supplement vendors) and complete a purchase, we may receive a commission at no extra cost to you.
        </p>

        <h2>Data Aggregation &amp; Testing Methodology</h2>
        <p>
          Our reviews are based on aggregated external testing data, customer feedback, product specifications, and pricing research — we do not independently test products ourselves. The information on this site is for general informational purposes only and does not constitute medical advice. Consult a qualified healthcare professional before making health-related decisions.
        </p>
      </div>

      <Footer />
      <a href="#1" className="sticky-cta">
        See Top Pick →
      </a>
    </div>
  );
}
