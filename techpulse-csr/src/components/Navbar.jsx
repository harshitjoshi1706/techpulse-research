import React from "react";
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/techpulse-logo.svg';
import { categoryPath } from '../data/api.js';
import { useCategories } from '../data/useArticles.js';

function Navbar() {
  const { categories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <Link className="brand-link" to="/" onClick={closeMenu}>
          <img src={logo} alt="TechPulse CSR" className="brand-logo" />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="primary-menu" className={`nav-menu ${isOpen ? 'is-open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          {categories.slice(0, 4).map((category) => (
            <NavLink key={category} to={categoryPath(category)} onClick={closeMenu}>
              {category}
            </NavLink>
          ))}
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
