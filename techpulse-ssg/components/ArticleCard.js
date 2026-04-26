import Link from 'next/link';

export default function ArticleCard({ article }) {
  const image = article.image || article.imageUrl || article.coverImage || '/placeholder.svg';
  const category = article.category || 'Technology';
  const author = article.author || 'TechPulse Desk';
  const date = article.publishedAt || article.date || article.createdAt;

  return (
    <article className="article-card">
      <Link href={`/article/${encodeURIComponent(article.slug)}`} className="article-image-link" aria-label={article.title}>
        <img src={image} alt={article.title} className="article-image" />
      </Link>
      <div className="article-content">
        <Link href={`/category/${encodeURIComponent(category)}`} className="category-pill">
          {category}
        </Link>
        <h2>
          <Link href={`/article/${encodeURIComponent(article.slug)}`}>{article.title}</Link>
        </h2>
        <p>{article.excerpt || article.summary || article.description}</p>
        <div className="article-meta">
          <span>{author}</span>
          {date && <span>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
        </div>
      </div>
    </article>
  );
}
