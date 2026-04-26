import Head from 'next/head';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { getAllCategories } from '../config/api';

export default function About({ categories }) {
  return (
    <>
      <Head>
        <title>About | TechPulse SSG</title>
        <meta name="description" content="About the TechPulse SSG research project." />
      </Head>
      <Navbar categories={categories} />
      <main className="container about-page">
        <p className="eyebrow">Version 3 Research Project</p>
        <h1>About TechPulse SSG</h1>
        <p>
          TechPulse SSG is the static generation version of the TechPulse mini tech news platform. It uses the
          Next.js Pages Router, build-time data fetching, and pre-rendered article pages so content is available in
          the initial HTML response.
        </p>
        <div className="about-grid">
          <section>
            <h2>Static rendering</h2>
            <p>
              The home page is generated with getStaticProps, while article and category routes are generated with
              getStaticPaths and getStaticProps.
            </p>
          </section>
          <section>
            <h2>Shared API</h2>
            <p>
              All article and category content comes from the shared backend API at http://localhost:5001/api.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const categories = await getAllCategories();

  return {
    props: {
      categories
    }
  };
}
