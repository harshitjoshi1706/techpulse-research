import React from "react";
import { useMemo, useState } from 'react';
import ArticleCard from '../components/ArticleCard.jsx';
import Hero from '../components/Hero.jsx';
import Pagination from '../components/Pagination.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { ArticleGridSkeleton } from '../components/Skeletons.jsx';
import { useCategories, usePaginatedArticles } from '../data/useArticles.js';

const PAGE_SIZE = 6;

function Home() {
  const { categories: apiCategories, error: categoriesError } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const {
    articles,
    totalCount,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore
  } = usePaginatedArticles({
    pageSize: PAGE_SIZE,
    searchTerm,
    category: selectedCategory === 'All' ? '' : selectedCategory
  });

  const articleCategories = useMemo(
    () => [...new Set(articles.map((article) => article.category))].sort(),
    [articles]
  );
  const categories = apiCategories.length > 0 ? apiCategories : articleCategories;

  const filteredArticles = useMemo(() => {
    const titleQuery = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(titleQuery);
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchTerm, selectedCategory]);

  const featuredArticle = articles[0];

  return (
    <>
      <Hero featuredArticle={featuredArticle} isLoading={isLoading} />

      <section id="article-list" className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest coverage</p>
              <h2>Research-ready tech updates</h2>
            </div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className="filter-row" aria-label="Filter articles by category">
            <button
              className={selectedCategory === 'All' ? 'filter-chip is-active' : 'filter-chip'}
              type="button"
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category ? 'filter-chip is-active' : 'filter-chip'
                }
                type="button"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {isLoading && <ArticleGridSkeleton count={PAGE_SIZE} />}
          {error && <p className="status-message error-message">{error}</p>}
          {!error && categoriesError && (
            <p className="status-message error-message">{categoriesError}</p>
          )}

          {!isLoading && !error && (
            <>
              {filteredArticles.length > 0 ? (
                <div className="article-grid">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <p className="status-message">No articles match this search.</p>
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
    </>
  );
}

export default Home;
