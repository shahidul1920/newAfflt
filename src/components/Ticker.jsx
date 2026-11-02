import Link from "next/link";

export default function Ticker({ items = [] }) {
  if (!items || items.length === 0) return null;

  // Duplicate items for continuous marquee
  const displayItems = [...items, ...items];

  return (
    <div className="ticker">
      <div className="cst-ticker-inner">
        <div className="wrap">
          <span className="label">Latest</span>
          <div className="items">
            {displayItems.map((item, index) => (
              <span key={`${item.slug}-${index}`} style={{ display: "inline-flex", alignItems: "center" }}>
                <Link href={`/article/${item.slug}`}>{item.title}</Link>
                <span>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
