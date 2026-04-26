import Head from 'next/head';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { getCategories } from '../config/api';

export default function AboutPage({ categories = [] }) {
  return (
    <>
      <Head>
        <title>About | TechPulse SSR</title>
        <meta
          name="description"
          content="About TechPulse SSR, a server-rendered mini technology news platform built with Next.js."
        />
      </Head>

      <Navbar categories={categories} />
      <main>
        <section className="about-hero">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">About TechPulse SSR</p>
              <h1>A server-rendered version of the TechPulse research project.</h1>
            </div>
            <p>
              TechPulse SSR uses the Next.js Pages Router and fetches content from the shared backend API on
              each request. Article lists, category pages, and story details are rendered on the server so the
              main content remains available in page source and without client-side JavaScript.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container feature-grid">
            <div className="feature">
              <span>01</span>
              <h2>Server rendered</h2>
              <p>Home, article detail, and category pages use getServerSideProps for request-time data.</p>
            </div>
            <div className="feature">
              <span>02</span>
              <h2>Shared API</h2>
              <p>All article and category data comes from http://localhost:5001/api.</p>
            </div>
            <div className="feature">
              <span>03</span>
              <h2>Research-ready</h2>
              <p>The UI keeps TechPulse focused on readable cards, category browsing, search, and responsive layouts.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const categories = await getCategories();

    return {
      props: {
        categories
      }
    };
  } catch (error) {
    return {
      props: {
        categories: []
      }
    };
  }
}
