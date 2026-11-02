import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { getAllCategories } from "@/lib/wordpress";

export const metadata = {
  title: "About Us – Longevity Reviewed",
  description: "Learn about Longevity Reviewed's mission, scientific methodology, and editorial independence.",
};

export default async function AboutPage() {
  const categories = await getAllCategories();

  return (
    <div className="lr-home">
      <Header categories={categories} />

      <div className="p-hero">
        <div className="wrap">
          <div className="p-eyebrow">The Newsroom</div>
          <h1>About Longevity Reviewed</h1>
          <p>
            Longevity is confusing. We translate complex, peer-reviewed biomedical literature into clear, independent reporting.
          </p>
        </div>
      </div>

      <div className="p-article">
        <p className="p-lead">
          The internet is saturated with aggressive supplement marketing, influencer wellness protocols, and unverified longevity claims. Longevity Reviewed was founded on a simple premise: follow the evidence, wherever it leads.
        </p>

        <p>
          We are an independent, evidence-first health reporting publication. Our mission is to demystify human lifespan and healthspan research by examining actual clinical trials, mechanistic biochemistry, and translational biotechnology.
        </p>

        <div className="p-pull">
          “No brand pays for coverage or placement. Editors decide, not advertisers. Our only allegiance is to the peer-reviewed evidence.”
        </div>

        <div className="p-stats">
          <div className="p-stat">
            <div className="n">100%</div>
            <div className="l">Brand Independent</div>
          </div>
          <div className="p-stat">
            <div className="n">85,000+</div>
            <div className="l">Study Cohort Data</div>
          </div>
          <div className="p-stat">
            <div className="n">Zero</div>
            <div className="l">Sponsored Reviews</div>
          </div>
        </div>

        <h2>Our Reporting Pillars</h2>
        <div className="p-values">
          <div className="p-value">
            <h4>Human Trials First</h4>
            <p>
              We prioritize randomized controlled human trials over in-vitro petri dish assays and rodent experiments, always stating study power and clinical limitations.
            </p>
          </div>
          <div className="p-value">
            <h4>Biochemical Mechanisms</h4>
            <p>
              We unpack why interventions work—from mitochondrial biogenesis and autophagy to mTOR signaling and cellular senescence.
            </p>
          </div>
          <div className="p-value">
            <h4>Open Corrections</h4>
            <p>
              If new data emerges or a correction is warranted, we publish it transparently with a dated notice directly in the reporting.
            </p>
          </div>
          <div className="p-value">
            <h4>Conflict Free</h4>
            <p>
              Our science writers do not accept manufacturer perks or direct brand partnerships. Commercial content is strictly firewalled.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <StickyCTA />
    </div>
  );
}
