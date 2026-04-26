import React from "react";
import { Link } from 'react-router-dom';
import { categoryPath } from '../data/api.js';
import { optimizedImageSrc } from '../utils/images.js';

function ArticleCard({ article }) {
  const imageSrc = optimizedImageSrc(article.image, { width: 640, quality: 70 });
  const formattedDate = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(article.date));

  return (
    <article className="article-card">
      <Link to={`/article/${article.slug}`} className="article-image-link" aria-label={article.title}>
        <img
          src={imageSrc}
          alt=""
          className="article-image"
          width="640"
          height="400"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="article-card-body">
        <Link className="category-pill" to={categoryPath(article.category)}>
          {article.category}
        </Link>
        <h2>
          <Link to={`/article/${article.slug}`}>{article.title}</Link>
        </h2>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <span>{article.author}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
