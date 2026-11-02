import Link from "next/link";

export default function TopicBands({ bands = [] }) {
  if (!bands || bands.length === 0) return null;

  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="bands" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {bands.map((band) => (
            <div key={band.slug} className="band">
              <div className="b-head">
                {band.title} <Link href={`/category/${band.slug}`}>More →</Link>
              </div>

              {band.featured && (
                <div className="b-top">
                  <Link
                    href={`/article/${band.featured.slug}`}
                    className="img"
                    style={{
                      backgroundImage: `url('${band.featured.featuredImage?.url}')`,
                    }}
                  />
                  <h4>
                    <Link href={`/article/${band.featured.slug}`}>{band.featured.title}</Link>
                  </h4>
                  <div className="li-meta">
                    By {band.featured.author?.name} · {band.featured.date}
                  </div>
                </div>
              )}

              {band.mini?.map((item) => (
                <div key={item.id} className="b-mini">
                  <Link href={`/article/${item.slug}`}>{item.title}</Link>
                  <div className="li-meta">{item.date}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
