import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { categories } from "@/data/content";

export const metadata = {
  title: "Contact – Longevity Reviewed",
  description: "Story tips, questions, feedback, or a correction — we read everything. We usually reply within two business days.",
};

export default function ContactPage() {
  return (
    <div className="lr-home">
      <Header categories={categories} />

      <section className="p-hero">
        <div className="wrap">
          <div className="p-eyebrow">Contact</div>
          <h1>Get in touch.</h1>
          <p>
            Story tips, questions, feedback, or a correction — we read everything. We usually reply within two business days.
          </p>
        </div>
      </section>

      <div className="p-clayout">
        {/* Left Column: Direct Desks */}
        <div className="p-col">
          <h2>Reach the right desk</h2>
          <p className="sub">For anything specific, these go straight to the right people.</p>

          <div className="p-card">
            <h3>General &amp; reader questions</h3>
            <p>Feedback, questions about our reporting, or anything else.</p>
            <a href="mailto:hello@longevityreviewed.com">hello@longevityreviewed.com</a>
          </div>

          <div className="p-card">
            <h3>Story tips</h3>
            <p>Seen a study, a claim, or a product worth investigating? Tell us.</p>
            <a href="mailto:tips@longevityreviewed.com">tips@longevityreviewed.com</a>
          </div>

          <div className="p-card">
            <h3>Corrections</h3>
            <p>Think we got something wrong? We want to know and will fix it openly.</p>
            <a href="mailto:corrections@longevityreviewed.com">corrections@longevityreviewed.com</a>
          </div>

          <div className="p-card">
            <h3>Editorial &amp; press</h3>
            <p>Media enquiries and editorial matters.</p>
            <a href="mailto:editor@longevityreviewed.com">editor@longevityreviewed.com</a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="p-col">
          <h2>Send us a message</h2>
          <p className="sub">Prefer a form? Fill this in and we&apos;ll get back to you.</p>
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
