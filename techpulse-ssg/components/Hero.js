export default function Hero({ articles = [] }) {
  const featured = articles[0];

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Static Site Generation Edition</p>
          <h1>TechPulse SSG</h1>
          <p>
            Build-time rendered coverage of emerging products, engineering trends, startup moves, and platform updates.
          </p>
        </div>

        {featured && (
          <article className="hero-card">
            <img src={featured.image || featured.imageUrl || featured.coverImage || '/placeholder.svg'} alt={featured.title} />
            <div>
              <span className="category-pill">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt || featured.summary}</p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
