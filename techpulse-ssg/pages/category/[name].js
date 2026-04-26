import Head from 'next/head';
import { useMemo, useState } from 'react';
import ArticleCard from '../../components/ArticleCard';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import { getAllCategories, getArticlesByCategory } from '../../config/api';

const PAGE_SIZE = 6;

export default function CategoryPage({ name, articles, categories }) {
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return articles;
    }

    return articles.filter((article) => {
      return [article.title, article.excerpt, article.summary, article.author]
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
        <title>{name} Articles | TechPulse SSG</title>
        <meta name="description" content={`Read static TechPulse coverage in ${name}.`} />
      </Head>
      <Navbar categories={categories} />
      <main className="container section category-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Category</p>
            <h1>{name}</h1>
          </div>
          <SearchBar value={query} onChange={handleSearch} placeholder={`Search ${name}...`} />
        </div>

        {visibleArticles.length > 0 ? (
          <div className="article-grid">
            {visibleArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No articles found in this category.</p>
        )}

        <Pagination
          visibleCount={visibleArticles.length}
          totalCount={filteredArticles.length}
          onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)}
        />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const categories = await getAllCategories();

  return {
    paths: categories.map((category) => ({
      params: {
        name: String(category.slug || category.name || category)
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const [articles, categories] = await Promise.all([getArticlesByCategory(params.name), getAllCategories()]);
  const matchedCategory = categories.find((category) => {
    const label = category.name || category;
    const slug = category.slug || label;

    return String(slug).toLowerCase() === String(params.name).toLowerCase();
  });

  return {
    props: {
      name: matchedCategory?.name || params.name,
      articles,
      categories
    }
  };
}
