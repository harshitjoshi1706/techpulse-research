import React from "react";
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard.jsx';
import { ArticleDetailSkeleton } from '../components/Skeletons.jsx';
import { categoryPath } from '../data/api.js';
import { useArticle, useCategoryArticles } from '../data/useArticles.js';
import { optimizedImageSrc } from '../utils/images.js';

function ArticleDetail() {
  const { slug } = useParams();
  const { article, isLoading, error } = useArticle(slug);
  const { articles: categoryArticles } = useCategoryArticles(article?.category ?? '');

  const relatedArticles = useMemo(() => {
    if (!article) {
      return [];
    }

    return categoryArticles
      .filter((item) => item.category === article.category && item.slug !== article.slug)
      .slice(0, 3);
  }, [article, categoryArticles]);

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (error) {
    return (
      <section className="section page-section">
        <div className="container">
          <p className="status-message error-message">{error}</p>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="section page-section">
        <div className="container narrow-container">
          <p className="eyebrow">Not found</p>
          <h1>Article unavailable</h1>
          <p className="section-intro">
            The article you requested is not available from the API.
          </p>
          <Link className="button button-primary" to="/">
            Return home
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(article.date));
  const detailImage = optimizedImageSrc(article.image, { width: 1180, quality: 72 });

  return (
    <>
      <article className="article-detail">
        <div className="container narrow-container">
          <div className="page-kicker">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={categoryPath(article.category)}>{article.category}</Link>
          </div>

          <header className="article-header">
            <p className="eyebrow">{article.category}</p>
            <h1>{article.title}</h1>
            <p className="article-lede">{article.excerpt}</p>
            <div className="article-meta article-meta-large">
              <span>{article.author}</span>
              <span>{formattedDate}</span>
            </div>
          </header>
        </div>

        <div className="container">
          <img
            className="detail-image"
            src={detailImage}
            alt=""
            width="1180"
            height="540"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="container narrow-container">
          <div className="article-content">
            {article.content.split('\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="section related-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Keep reading</p>
                <h2>More in {article.category}</h2>
              </div>
            </div>
            <div className="article-grid three-column">
              {relatedArticles.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ArticleDetail;
