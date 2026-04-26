import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" to="/">
            TechPulse CSR
          </Link>
          <p>
            A client-rendered tech news prototype built for comparing CSR, SSR, and SSG
            implementations with the same reusable UI.
          </p>
        </div>

        <div>
          <h2>Explore</h2>
          <Link to="/">Latest Articles</Link>
          <Link to="/category/ai">AI</Link>
          <Link to="/category/cloud">Cloud</Link>
          <Link to="/about">About</Link>
        </div>

        <div>
          <h2>Version</h2>
          <p>Version 1: Client Side Rendering</p>
          <p>React state and effects load local JSON in the browser.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
