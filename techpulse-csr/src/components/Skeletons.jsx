import React from "react";
function ArticleCardSkeleton() {
  return (
    <article className="article-card skeleton-card" aria-hidden="true">
      <div className="skeleton-block skeleton-image" />
      <div className="article-card-body">
        <div className="skeleton-block skeleton-pill" />
        <div className="skeleton-block skeleton-title" />
        <div className="skeleton-block skeleton-line" />
        <div className="skeleton-block skeleton-line short" />
        <div className="skeleton-meta">
          <div className="skeleton-block skeleton-meta-item" />
          <div className="skeleton-block skeleton-meta-item" />
        </div>
      </div>
    </article>
  );
}

function ArticleGridSkeleton({ count = 6 }) {
  return (
    <div className="article-grid" aria-label="Loading articles">
      {Array.from({ length: count }, (_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}

function ArticleDetailSkeleton() {
  return (
    <section className="section page-section">
      <div className="container narrow-container article-detail-skeleton" aria-label="Loading article">
        <div className="skeleton-block skeleton-pill" />
        <div className="skeleton-block skeleton-detail-title" />
        <div className="skeleton-block skeleton-line" />
        <div className="skeleton-block skeleton-line short" />
      </div>
      <div className="container">
        <div className="skeleton-block skeleton-detail-image" />
      </div>
    </section>
  );
}

export { ArticleCardSkeleton, ArticleGridSkeleton, ArticleDetailSkeleton };
