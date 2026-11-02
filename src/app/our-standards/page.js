import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { getAllCategories } from "@/lib/wordpress";

export const metadata = {
  title: "Our Standards – Longevity Reviewed",
  description: "Read our rigorous reporting standards, clinical trial evaluation guidelines, and conflict-of-interest policies.",
};

export default async function OurStandardsPage() {
  const categories = await getAllCategories();

  return (
    <div className="lr-home">
      <Header categories={categories} />

      <div className="p-hero">
        <div className="wrap">
          <div className="p-eyebrow">Editorial Integrity</div>
          <h1>Our Standards &amp; Methodology</h1>
          <p>
            How we investigate scientific claims, audit medical papers, and maintain total independence from industry influence.
          </p>
        </div>
      </div>

      <div className="p-article">
        <p className="p-lead">
          At Longevity Reviewed, our reporting follows one standard: follow the evidence, wherever it leads.
        </p>

        <div className="p-values">
          <div className="p-value">
            <h4>1. Editorially Independent</h4>
            <p>No brand pays for coverage or placement. Editors decide, not advertisers.</p>
          </div>
          <div className="p-value">
            <h4>2. Evidence First</h4>
            <p>We prioritise human trials and peer-reviewed research, and we link our sources directly to PubMed and journals.</p>
          </div>
          <div className="p-value">
            <h4>3. Corrections, Openly</h4>
            <p>When we get something wrong we fix it in the open, with a dated note at the top of the article.</p>
          </div>
          <div className="p-value">
            <h4>4. Clear Labelling</h4>
            <p>Any commercial or affiliate content is clearly labelled and kept strictly separate from our investigative reporting.</p>
          </div>
        </div>

        <h2>Scientific Verification Protocol</h2>
        <p>
          Every report published by Longevity Reviewed undergoes multi-stage verification by science journalists with backgrounds in biochemistry, pharmacology, and physiology.
        </p>

        <div className="p-callout">
          <strong>Key Guideline:</strong> We do not treat rodent or cell culture models as definitive human evidence. All preclinical findings are clearly flagged as exploratory.
        </div>
      </div>

      <Footer />
      <StickyCTA />
    </div>
  );
}
