import Link from "next/link";

export default function Ticker({ items = [] }) {
  if (!items || items.length === 0) return null;

  // Duplicate items for continuous infinite marquee animation
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="ticker" aria-label="Latest headlines ticker">
      <div className="wrap ticker-wrap">
        <span className="ticker-badge">Latest</span>
        <div className="ticker-track-container">
          <div className="ticker-track">
            {displayItems.map((item, index) => (
              <span key={`${item.slug}-${index}`} className="ticker-item">
                <Link href={`/article/${item.slug}`}>{item.title}</Link>
                <span className="ticker-sep">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
