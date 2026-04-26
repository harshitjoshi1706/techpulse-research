import Head from 'next/head';
import Link from 'next/link';
import {
  formatArticleDate,
  getArticleAuthor,
  getArticleCategory,
  getArticleDate,
  getArticleExcerpt,
  getArticleImage,
  getArticleTitle
} from '../../components/ArticleCard';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { getArticle, getCategories } from '../../config/api';

function getArticleBody(article) {
  return article?.content || article?.body || article?.text || article?.description || article?.summary || '';
}

export default function ArticleDetailPage({ article, categories = [] }) {
  const title = getArticleTitle(article);
  const image = getArticleImage(article);
  const category = getArticleCategory(article);
  const date = formatArticleDate(getArticleDate(article));
  const author = getArticleAuthor(article);
  const excerpt = getArticleExcerpt(article);
  const body = getArticleBody(article);

  return (
    <>
      <Head>
        <title>{title} | TechPulse SSR</title>
        <meta name="description" content={excerpt || title} />
      </Head>

      <Navbar categories={categories} activeCategory={category} />
      <main>
        <article className="article-page">
          <header className="article-page__header container">
            <Link href={`/category/${encodeURIComponent(category)}`} className="pill pill--large">
              {category}
            </Link>
            <h1>{title}</h1>
            {excerpt && <p className="article-page__dek">{excerpt}</p>}
            <div className="article-page__meta">
              <span>{author}</span>
              {date && <span>{date}</span>}
            </div>
          </header>

          {image && (
            <div className="article-page__image container">
              <img src={image} alt={title} />
            </div>
          )}

          <div className="article-page__content container">
            {body ? (
              String(body)
                .split(/\n{2,}/)
                .map((paragraph, index) => <p key={index}>{paragraph.replace(/<[^>]+>/g, '')}</p>)
            ) : (
              <p>No article body was returned by the API.</p>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const [article, categories] = await Promise.all([getArticle(params.slug), getCategories()]);

    if (!article) {
      return { notFound: true };
    }

    return {
      props: {
        article,
        categories
      }
    };
  } catch (error) {
    if (error.status === 404) {
      return { notFound: true };
    }

    return { notFound: true };
  }
}
