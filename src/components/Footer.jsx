import Link from "next/link";
import { siteMetadata } from "@/data/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
            <div className="name">
              Longevity Reviewed<span className="dot">.</span>
            </div>
            <p>
              Longevityreviewed.com is owned and operated independently. Rankings and product positions on this site are influenced by commercial relationships, including affiliate commissions. As an Amazon Associate, we earn from qualifying purchases. This site constitutes advertising material and should not be construed as independent editorial, news, or consumer protection content. Our reviews are based on aggregated external testing data, customer feedback, product specifications, and pricing research — we do not independently test products ourselves. The information on this site is for general informational purposes only and does not constitute medical advice. Consult a qualified healthcare professional before making health-related decisions.{" "}
              <Link href="/">Longevityreviewed.com</Link> makes no warranties regarding the accuracy or completeness of any information provided and accepts no liability for any loss or damage arising from reliance on this site.
            </p>
          </div>
          <div className="f-col">
            <h5>Sections</h5>
            <Link href="/category/diet">Diet</Link>
            <Link href="/category/emerging">Emerging</Link>
            <Link href="/category/longevity">Longevity</Link>
            <Link href="/category/mental">Mental</Link>
            <Link href="/category/physical">Physical</Link>
            <Link href="/category/sleep">Sleep</Link>
          </div>
          <div className="f-col">
            <h5>The Newsroom</h5>
            <Link href="/about">About Us</Link>
            <Link href="/our-standards">Our Standards</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="f-col">
            <h5>Legal</h5>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
          </div>
        </div>
        <div className="f-bottom">
          <span className="copy">© 2026 Longevity Reviewed. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
