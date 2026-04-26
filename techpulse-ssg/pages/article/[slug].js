import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { getAllArticles, getAllCategories, getArticleBySlug } from '../../config/api';

function ArticleBody({ article }) {
  const html = article.contentHtml || article.html;
  const body = article.content || article.body || article.text;

  if (html) {
    return <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <div className="article-body">
      {String(body || article.excerpt || '')
        .split('\n')
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </div>
  );
}

export default function ArticlePage({ article, categories }) {
  const image = article.image || article.imageUrl || article.coverImage || '/placeholder.svg';
  const category = article.category || 'Technology';
  const author = article.author || 'TechPulse Desk';
  const date = article.publishedAt || article.date || article.createdAt;

  return (
    <>
      <Head>
        <title>{article.title} | TechPulse SSG</title>
        <meta name="description" content={article.excerpt || article.summary || article.title} />
      </Head>
      <Navbar categories={categories} />
      <main>
        <article className="article-detail container">
          <Link href={`/category/${encodeURIComponent(category)}`} className="category-pill">
            {category}
          </Link>
          <h1>{article.title}</h1>
          <div className="detail-meta">
            <span>{author}</span>
            {date && <span>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>}
          </div>
          <img src={image} alt={article.title} className="detail-image" />
          <ArticleBody article={article} />
        </article>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const articles = await getAllArticles();

  return {
    paths: articles.map((article) => ({
      params: {
        slug: String(article.slug)
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const [article, categories] = await Promise.all([getArticleBySlug(params.slug), getAllCategories()]);

  return {
    props: {
      article,
      categories
    }
  };
}
