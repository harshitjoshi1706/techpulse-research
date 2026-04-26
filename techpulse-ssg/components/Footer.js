import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            TechPulse
          </Link>
          <p>
            Static tech news, analysis, and product updates generated with Next.js SSG.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </footer>
  );
}
