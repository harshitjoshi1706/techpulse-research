import Head from 'next/head';
import { useMemo, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { getAllArticles, getAllCategories } from '../config/api';

const PAGE_SIZE = 6;

export default function Home({ articles, categories }) {
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return articles;
    }

    return articles.filter((article) => {
      return [article.title, article.excerpt, article.summary, article.category, article.author]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(search));
    });
  }, [articles, query]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  function handleSearch(value) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <>
      <Head>
        <title>TechPulse SSG | Static Tech News</title>
        <meta
          name="description"
          content="TechPulse SSG is a static Next.js tech news platform built with getStaticProps and getStaticPaths."
        />
      </Head>
      <Navbar categories={categories} />
      <main>
        <Hero articles={articles} />

        <section className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest Coverage</p>
              <h2>Top tech stories</h2>
            </div>
            <SearchBar value={query} onChange={handleSearch} />
          </div>

          {categories.length > 0 && (
            <div className="category-row" aria-label="Browse categories">
              {categories.map((category) => {
                const label = category.name || category;
                const href = `/category/${encodeURIComponent(category.slug || label)}`;

                return (
                  <a key={label} href={href} className="category-chip">
                    {label}
                  </a>
                );
              })}
            </div>
          )}

          {visibleArticles.length > 0 ? (
            <div className="article-grid">
              {visibleArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No articles match your search.</p>
          )}

          <Pagination
            visibleCount={visibleArticles.length}
            totalCount={filteredArticles.length}
            onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const [articles, categories] = await Promise.all([getAllArticles(), getAllCategories()]);

  return {
    props: {
      articles,
      categories
    }
  };
}
