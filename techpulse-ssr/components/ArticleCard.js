import Link from 'next/link';

export function getArticleTitle(article) {
  return article?.title || article?.headline || article?.name || 'Untitled article';
}

export function getArticleSlug(article) {
  return article?.slug || article?.id || '';
}

export function getArticleCategory(article) {
  const category = article?.category || article?.topic || article?.section;

  if (typeof category === 'string') return category;
  if (category?.name) return category.name;
  if (Array.isArray(article?.categories) && article.categories.length > 0) {
    const firstCategory = article.categories[0];
    return typeof firstCategory === 'string' ? firstCategory : firstCategory?.name;
  }

  return 'Technology';
}

export function getArticleImage(article) {
  return (
    article?.image ||
    article?.imageUrl ||
    article?.coverImage ||
    article?.thumbnail ||
    article?.urlToImage ||
    ''
  );
}

export function getArticleDate(article) {
  return article?.publishedAt || article?.date || article?.createdAt || article?.updatedAt || '';
}

export function getArticleAuthor(article) {
  return article?.author || article?.writer || article?.source || 'TechPulse Desk';
}

export function getArticleExcerpt(article) {
  const excerpt =
    article?.excerpt ||
    article?.summary ||
    article?.description ||
    article?.subtitle ||
    article?.content ||
    article?.body ||
    '';

  return String(excerpt).replace(/<[^>]+>/g, '').slice(0, 170);
}

export function formatArticleDate(dateValue) {
  if (!dateValue) return '';

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return String(dateValue);

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export default function ArticleCard({ article }) {
  const slug = getArticleSlug(article);
  const title = getArticleTitle(article);
  const image = getArticleImage(article);
  const category = getArticleCategory(article);
  const date = formatArticleDate(getArticleDate(article));
  const author = getArticleAuthor(article);
  const excerpt = getArticleExcerpt(article);

  return (
    <article className="article-card">
      <Link className="article-card__image-link" href={`/article/${encodeURIComponent(slug)}`}>
        {image ? (
          <img className="article-card__image" src={image} alt={title} />
        ) : (
          <div className="article-card__image article-card__image--empty">TechPulse</div>
        )}
      </Link>

      <div className="article-card__body">
        <div className="article-card__meta">
          <Link href={`/category/${encodeURIComponent(category)}`} className="pill">
            {category}
          </Link>
          {date && <span>{date}</span>}
        </div>

        <h2 className="article-card__title">
          <Link href={`/article/${encodeURIComponent(slug)}`}>{title}</Link>
        </h2>

        {excerpt && <p className="article-card__excerpt">{excerpt}</p>}

        <div className="article-card__footer">
          <span>{author}</span>
          <Link className="read-link" href={`/article/${encodeURIComponent(slug)}`}>
            Read article
          </Link>
        </div>
      </div>
    </article>
  );
}
