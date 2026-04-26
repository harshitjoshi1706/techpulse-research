import React from "react";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { optimizedImageSrc } from '../utils/images.js';

function Hero({ featuredArticle, isLoading = false }) {
  const heroImage = featuredArticle
    ? optimizedImageSrc(featuredArticle.image, { width: 760, quality: 68 })
    : '';

  useEffect(() => {
    if (!heroImage) {
      return undefined;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage;
    link.fetchPriority = 'high';
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [heroImage]);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Tech research briefings</p>
          <h1>Signals from AI, cloud, security, gadgets, and startup ecosystems.</h1>
          <p className="hero-text">
            Track practical technology trends with concise analysis, clean categories, and
            a reusable UI designed for CSR now and SSR or SSG comparisons later.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#article-list">
              Browse articles
            </a>
            <Link className="button button-secondary" to="/about">
              About project
            </Link>
          </div>
        </div>

        {isLoading && !featuredArticle && (
          <div className="hero-feature hero-feature-skeleton" aria-hidden="true">
            <div className="skeleton-block hero-skeleton-image" />
            <div>
              <div className="skeleton-block skeleton-pill" />
              <div className="skeleton-block skeleton-title" />
              <div className="skeleton-block skeleton-line" />
              <div className="skeleton-block skeleton-line short" />
            </div>
          </div>
        )}

        {featuredArticle && (
          <Link className="hero-feature" to={`/article/${featuredArticle.slug}`}>
            <img
              src={heroImage}
              alt=""
              width="760"
              height="570"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div>
              <span>{featuredArticle.category}</span>
              <h2>{featuredArticle.title}</h2>
              <p>{featuredArticle.excerpt}</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}

export default Hero;
