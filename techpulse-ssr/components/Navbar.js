import Link from 'next/link';
import { useState } from 'react';

function getCategoryName(category) {
  if (typeof category === 'string') return category;
  return category?.name || category?.title || category?.slug || '';
}

export default function Navbar({ categories = [], activeCategory = '' }) {
  const [open, setOpen] = useState(false);
  const visibleCategories = categories.map(getCategoryName).filter(Boolean).slice(0, 6);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="TechPulse home">
          <span className="brand__mark">TP</span>
          <span className="brand__text">TechPulse</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? 'nav-links--open' : ''}`}>
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          {visibleCategories.map((category) => (
            <Link
              key={category}
              href={`/category/${encodeURIComponent(category)}`}
              className={activeCategory.toLowerCase() === category.toLowerCase() ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {category}
            </Link>
          ))}
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
