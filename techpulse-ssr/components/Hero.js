import Link from 'next/link';
import {
  formatArticleDate,
  getArticleAuthor,
  getArticleCategory,
  getArticleDate,
  getArticleExcerpt,
  getArticleImage,
  getArticleSlug,
  getArticleTitle
} from './ArticleCard';

export default function Hero({ article }) {
  if (!article) {
    return (
      <section className="hero hero--empty">
        <div className="container hero__content">
          <p className="eyebrow">TechPulse SSR</p>
          <h1>Technology news rendered on the server.</h1>
          <p>Connect the backend API to publish articles, categories, and images.</p>
        </div>
      </section>
    );
  }

  const title = getArticleTitle(article);
  const slug = getArticleSlug(article);
  const image = getArticleImage(article);
  const category = getArticleCategory(article);
  const date = formatArticleDate(getArticleDate(article));
  const author = getArticleAuthor(article);
  const excerpt = getArticleExcerpt(article);

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Featured Story</p>
          <h1>{title}</h1>
          {excerpt && <p>{excerpt}</p>}
          <div className="hero__meta">
            <Link href={`/category/${encodeURIComponent(category)}`} className="pill pill--large">
              {category}
            </Link>
            {date && <span>{date}</span>}
            <span>{author}</span>
          </div>
          <Link className="button button--primary" href={`/article/${encodeURIComponent(slug)}`}>
            Read featured article
          </Link>
        </div>

        <Link className="hero__media" href={`/article/${encodeURIComponent(slug)}`}>
          {image ? <img src={image} alt={title} /> : <div className="hero__placeholder">TechPulse</div>}
        </Link>
      </div>
    </section>
  );
}
