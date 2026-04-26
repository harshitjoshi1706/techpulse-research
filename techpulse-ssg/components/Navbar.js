import Link from 'next/link';

export default function Navbar({ categories = [] }) {
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <Link href="/" className="brand">
          <span className="brand-mark">TP</span>
          <span>TechPulse</span>
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          {categories.slice(0, 4).map((category) => (
            <Link key={category.name || category} href={`/category/${encodeURIComponent(category.slug || category.name || category)}`}>
              {category.name || category}
            </Link>
          ))}
          <Link href="/about">About</Link>
        </div>
      </nav>
    </header>
  );
}
