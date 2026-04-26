import React from "react";
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard.jsx';
import Pagination from '../components/Pagination.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { ArticleGridSkeleton } from '../components/Skeletons.jsx';
import { usePaginatedCategoryArticles } from '../data/useArticles.js';

const PAGE_SIZE = 6;

function Category() {
  const { name } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    articles,
    totalCount,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore
  } = usePaginatedCategoryArticles(name, { pageSize: PAGE_SIZE, searchTerm });

  const categoryName = useMemo(() => {
    if (articles[0]?.category) {
      return articles[0].category;
    }

    return decodeURIComponent(name)
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [articles, name]);

  const filteredArticles = useMemo(() => {
    const titleQuery = searchTerm.trim().toLowerCase();

    return articles.filter((article) => article.title.toLowerCase().includes(titleQuery));
  }, [articles, searchTerm]);

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-kicker">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{categoryName}</span>
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">Category</p>
            <h1>{categoryName}</h1>
            <p className="section-intro">
              Browse focused analysis and updates from the {categoryName} desk.
            </p>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={`Search ${categoryName} articles`}
          />
        </div>

        {isLoading && <ArticleGridSkeleton count={PAGE_SIZE} />}
        {error && <p className="status-message error-message">{error}</p>}

        {!isLoading && !error && (
          <>
            {filteredArticles.length > 0 ? (
              <div className="article-grid">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="status-message">No articles found in this category.</p>
            )}

            <Pagination
              visibleCount={articles.length}
              totalCount={totalCount}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMore}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Category;
