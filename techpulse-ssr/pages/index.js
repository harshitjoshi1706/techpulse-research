import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import ArticleCard, {
  getArticleAuthor,
  getArticleCategory,
  getArticleExcerpt,
  getArticleTitle
} from '../components/ArticleCard';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { getArticles, getCategories } from '../config/api';

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

export default function HomePage({ articles = [], categories = [], error = '' }) {
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
  const featuredArticle = articles[0];
  const gridArticles = query ? visibleArticles : visibleArticles.slice(featuredArticle ? 1 : 0);

  return (
    <>
      <Head>
        <title>TechPulse SSR | Server-rendered tech news</title>
        <meta
          name="description"
          content="TechPulse SSR is a server-rendered technology news and blog platform built with Next.js Pages Router."
        />
      </Head>

      <Navbar categories={categories} />
      <main>
        <Hero article={featuredArticle} />

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Latest Articles</p>
                <h2>Fresh signals from the technology world</h2>
              </div>
              <SearchBar value={query} onChange={setQuery} resultCount={filteredArticles.length} />
            </div>

            {error && <div className="notice">{error}</div>}

            {gridArticles.length > 0 ? (
              <div className="article-grid">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.slug || article.id || article.title} article={article} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No articles found</h3>
                <p>Try a different search term or check that the backend API is running.</p>
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

export async function getServerSideProps() {
  try {
    const [articles, categories] = await Promise.all([getArticles(), getCategories()]);

    return {
      props: {
        articles,
        categories,
        error: ''
      }
    };
  } catch (error) {
    return {
      props: {
        articles: [],
        categories: [],
        error: 'Unable to load articles from the backend API. Start http://localhost:5001/api and refresh.'
      }
    };
  }
}
