import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import ArticleCard, {
  getArticleAuthor,
  getArticleCategory,
  getArticleExcerpt,
  getArticleTitle
} from '../../components/ArticleCard';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import { getCategories, getCategoryArticles } from '../../config/api';

const PAGE_SIZE = 6;

function matchesSearch(article, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const searchableText = [
    getArticleTitle(article),
    getArticleExcerpt(article),
    getArticleCategory(article),
    getArticleAuthor(article)
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

export default function CategoryPage({ name, articles = [], categories = [], error = '' }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const filteredArticles = useMemo(
    () => articles.filter((article) => matchesSearch(article, query)),
    [articles, query]
  );
  const visibleArticles = filteredArticles.slice(0, page * PAGE_SIZE);

  return (
    <>
      <Head>
        <title>{name} Articles | TechPulse SSR</title>
        <meta name="description" content={`Server-rendered ${name} articles from TechPulse SSR.`} />
      </Head>

      <Navbar categories={categories} activeCategory={name} />
      <main>
        <section className="category-hero">
          <div className="container">
            <p className="eyebrow">Category</p>
            <h1>{name}</h1>
            <p>Browse the latest server-rendered TechPulse stories in {name}.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Browse</p>
                <h2>{name} coverage</h2>
              </div>
              <SearchBar value={query} onChange={setQuery} resultCount={filteredArticles.length} />
            </div>

            {error && <div className="notice">{error}</div>}

            {visibleArticles.length > 0 ? (
              <div className="article-grid">
                {visibleArticles.map((article) => (
                  <ArticleCard key={article.slug || article.id || article.title} article={article} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No articles found</h3>
                <p>There are no articles in this category yet.</p>
              </div>
            )}

            <Pagination
              visibleCount={visibleArticles.length}
              totalCount={filteredArticles.length}
              onLoadMore={() => setPage((current) => current + 1)}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const name = params.name;

  try {
    const [articles, categories] = await Promise.all([getCategoryArticles(name), getCategories()]);

    return {
      props: {
        name,
        articles,
        categories,
        error: ''
      }
    };
  } catch (error) {
    return {
      props: {
        name,
        articles: [],
        categories: [],
        error: 'Unable to load this category from the backend API.'
      }
    };
  }
}
