import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllCategories } from "@/lib/wordpress";

export const metadata = {
  title: "Privacy Policy – Longevity Reviewed",
  description: "Privacy policy, data collection disclosures, and cookie management practices for Longevity Reviewed.",
};

export default async function PrivacyPolicyPage() {
  const categories = await getAllCategories();

  return (
    <div className="lr-home">
      <Header categories={categories} />

      <div className="p-hero">
        <div className="wrap">
          <div className="p-eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p>
            Your privacy is paramount to us. Longevity Reviewed is committed to safeguarding any personal data collected.
          </p>
        </div>
      </div>

      <div className="p-article">
        <p className="p-lead">
          Longevity Reviewed operates in compliance with international privacy protocols including GDPR and CCPA.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect non-personally-identifying technical information that web browsers make available, such as browser type, language preference, referring site, and timestamp of requests.
        </p>

        <h2>Cookies &amp; Local Storage</h2>
        <p>
          A cookie is a string of information that a website stores on a visitor&#39;s computer. Visitors who do not wish to have cookies placed on their computers should configure their browsers to refuse cookies.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We utilize privacy-respecting analytics and Cloudflare edge caching. We never sell or rent your personal browsing history to third-party data brokers.
        </p>
      </div>

      <Footer />
      <a href="#1" className="sticky-cta">
        See Top Pick →
      </a>
    </div>
  );
}
